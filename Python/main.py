from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any
import easyocr
import torch
from transformers import AutoTokenizer, AutoModelForTokenClassification, pipeline
import pymongo
from datetime import datetime
import os
from dotenv import load_dotenv
import re
import io
from PIL import Image
import numpy as np

# Pillow>=10 removed Image.ANTIALIAS; map it for libraries expecting it
if not hasattr(Image, "ANTIALIAS"):
    try:
        Image.ANTIALIAS = Image.Resampling.LANCZOS  # type: ignore[attr-defined]
    except Exception:
        pass

def to_bson_safe(value):
    """Recursively convert NumPy types/arrays to native Python types for MongoDB."""
    if isinstance(value, dict):
        return {k: to_bson_safe(v) for k, v in value.items()}
    if isinstance(value, list):
        return [to_bson_safe(v) for v in value]
    if isinstance(value, tuple):
        return tuple(to_bson_safe(v) for v in value)
    if isinstance(value, (np.integer,)):
        return int(value)
    if isinstance(value, (np.floating,)):
        return float(value)
    if isinstance(value, (np.ndarray,)):
        return value.tolist()
    return value

# Load environment variables
load_dotenv()

app = FastAPI(title="FRA Document Processing API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection setup
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    MONGO_URI = "mongodb://localhost:27017/fra_documents"

try:
    client = pymongo.MongoClient(
        MONGO_URI,
        serverSelectionTimeoutMS=5000,
        connectTimeoutMS=5000,
        retryWrites=True
    )
    client.admin.command('ping')
    print("Successfully connected to MongoDB")
    db = client.fra_documents
    collection = db.processed_documents
except Exception as e:
    print(f"Failed to connect to MongoDB: {str(e)}")
    raise HTTPException(
        status_code=500,
        detail="Database connection failed. Please ensure MongoDB is running."
    )

# Global variables for models
ocr_reader = None
ner_pipeline = None

class FRAFields(BaseModel):
    name: Optional[str] = None
    father_name: Optional[str] = None
    claimant_name: Optional[str] = None
    state: Optional[str] = None
    village: Optional[str] = None
    area: Optional[str] = None
    area_units: Optional[str] = None
    claim_status: Optional[str] = None


class ProcessingResponse(BaseModel):
    success: bool
    fra_fields: FRAFields
    text_excerpt: str
    full_text: str
    document_id: str

class HealthResponse(BaseModel):
    status: str
    timestamp: str
    models_loaded: bool

def initialize_models():
    """Initialize OCR and NER models"""
    global ocr_reader, ner_pipeline
    
    try:
        print("Loading EasyOCR model...")
        ocr_reader = easyocr.Reader(['hi', 'en'], gpu=torch.cuda.is_available())
        
        print("Loading IndicNER model...")
        model_name = "ai4bharat/IndicNER"
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForTokenClassification.from_pretrained(model_name)
        ner_pipeline = pipeline("ner", model=model, tokenizer=tokenizer, aggregation_strategy="simple")
        
        print("Models loaded successfully!")
        return True
    except Exception as e:
        print(f"Error loading models: {e}")
        return False

def extract_text_from_image(file_content: bytes) -> str:
    """Extract text from image using EasyOCR"""
    try:
        image = Image.open(io.BytesIO(file_content))
        image_np = np.array(image)
        results = ocr_reader.readtext(image_np)
        text = " ".join([result[1] for result in results])
        return text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR processing failed: {str(e)}")

def extract_entities(text: str) -> Dict[str, Any]:
    """Extract named entities using IndicNER"""
    try:
        entities = ner_pipeline(text)
        return entities
    except Exception as e:
        print(f"NER processing failed: {e}")
        return []

# --- Text Cleaner ---
def clean_text(text: str) -> str:
    """Normalize OCR text before regex extraction"""
    text = re.sub(r"\bs name\b", "father name", text, flags=re.IGNORECASE)
    text = re.sub(r"\bname:\s*name\b", "name:", text, flags=re.IGNORECASE)
    return text

def extract_fra_fields(text: str, entities: list) -> FRAFields:
    fra_fields = FRAFields()

    # Clean OCR text
    text_clean = clean_text(text)
    text_lower = text_clean.lower()

    NAME_REGEX = r'([A-Za-z\u0900-\u097F]+(?:\s+[A-Za-z\u0900-\u097F]+){0,2})'

    # Extract Claimant Name
    name_patterns = [
        rf'(?:claimant name|name|नाम|applicant|आवेदक|दावेदार)[:\s]*{NAME_REGEX}',
    ]
    for pattern in name_patterns:
        match = re.search(pattern, text_clean, re.IGNORECASE)
        if match and match.group(1).lower() not in ["name", "s name"]:
            fra_fields.name = match.group(1).strip()
            fra_fields.claimant_name = fra_fields.name
            break

    # Extract Father Name
    father_patterns = [
        rf'(?:father name|पिता का नाम)[:\s]*{NAME_REGEX}',
    ]
    for pattern in father_patterns:
        match = re.search(pattern, text_clean, re.IGNORECASE)
        if match and match.group(1).lower() not in ["name", "s name"]:
            fra_fields.father_name = match.group(1).strip()
            break

    # Extract Village
    village_patterns = [
        rf'(?:village|गाँव|ग्राम|village name|ग्राम का नाम)[:\s]*{NAME_REGEX}',
    ]
    for pattern in village_patterns:
        match = re.search(pattern, text_clean, re.IGNORECASE)
        if match:
            fra_fields.village = match.group(1).strip()
            break

    # Extract Area
    area_patterns = [
        r'([0-9.,\s]+)\s*(hectare|acre|हेक्टेयर|एकड़)',
    ]
    for pattern in area_patterns:
        match = re.search(pattern, text_clean, re.IGNORECASE)
        if match:
            fra_fields.area = match.group(1).strip()
            fra_fields.area_units = match.group(2).strip()
            break

    # Extract Claim Status
    if "approved" in text_lower or "स्वीकृत" in text_lower:
        fra_fields.claim_status = "approved"
    elif "rejected" in text_lower or "अस्वीकृत" in text_lower:
        fra_fields.claim_status = "rejected"
    elif "pending" in text_lower or "लंबित" in text_lower:
        fra_fields.claim_status = "pending"

    return fra_fields

def get_text_excerpt(text: str, max_length: int = 200) -> str:
    if len(text) <= max_length:
        return text
    return text[:max_length] + "..."

@app.on_event("startup")
async def startup_event():
    success = initialize_models()
    if not success:
        print("Warning: Some models failed to load. API may not function properly.")

@app.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(
        status="healthy" if ocr_reader and ner_pipeline else "degraded",
        timestamp=datetime.now().isoformat(),
        models_loaded=bool(ocr_reader and ner_pipeline)
    )

@app.post("/upload", response_model=ProcessingResponse)
async def upload_file(file: UploadFile = File(...)):
    if not ocr_reader or not ner_pipeline:
        raise HTTPException(status_code=503, detail="Models not loaded. Please try again later.")
    
    if not file.content_type.startswith(('image/', 'application/pdf')):
        raise HTTPException(status_code=400, detail="File must be an image or PDF")
    
    try:
        file_content = await file.read()
        if file.content_type.startswith('image/'):
            text = extract_text_from_image(file_content)
        else:
            raise HTTPException(status_code=400, detail="PDF support not implemented yet. Please upload an image file.")
        
        if not text.strip():
            raise HTTPException(status_code=400, detail="No text found in the uploaded file")
        
        entities = extract_entities(text)
        fra_fields = extract_fra_fields(text, entities)
        
        document_record = {
            "filename": file.filename,
            "content_type": file.content_type,
            "upload_time": datetime.now(),
            "full_text": text,
            "entities": entities,
            "fra_fields": fra_fields.dict(),
            "text_excerpt": get_text_excerpt(text)
        }
        
        result = collection.insert_one(to_bson_safe(document_record))
        document_id = str(result.inserted_id)
        
        return ProcessingResponse(
            success=True,
            fra_fields=fra_fields,
            text_excerpt=get_text_excerpt(text),
            full_text=text,
            document_id=document_id
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")

@app.get("/")
async def root():
    return {"message": "FRA Document Processing API", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
