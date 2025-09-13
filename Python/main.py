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
    # Initialize MongoDB client with timeout and retry options
    client = pymongo.MongoClient(
        MONGO_URI,
        serverSelectionTimeoutMS=5000,
        connectTimeoutMS=5000,
        retryWrites=True
    )
    
    # Test connection
    client.admin.command('ping')
    print("Successfully connected to MongoDB")
    
    # Initialize database and collection
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
    claimant_name: Optional[str] = None
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
        # Initialize EasyOCR for Hindi and English
        print("Loading EasyOCR model...")
        ocr_reader = easyocr.Reader(['hi', 'en'], gpu=torch.cuda.is_available())
        
        # Initialize IndicNER model
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
        # Convert bytes to PIL Image
        image = Image.open(io.BytesIO(file_content))
        
        # Convert PIL Image to a NumPy array
        image_np = np.array(image)
        
        # Perform OCR on the NumPy array
        results = ocr_reader.readtext(image_np)
        
        # Combine all text
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

def extract_fra_fields(text: str, entities: list) -> FRAFields:
    """Extract FRA-specific fields from text and entities"""
    fra_fields = FRAFields()
    
    # Convert text to lowercase for pattern matching
    text_lower = text.lower()
    
    # Extract Claimant Name
    # Look for patterns like "Name:", "नाम:", "Applicant:", etc.
    name_patterns = [
        r'(?:name|नाम|applicant|आवेदक|claimant|दावेदार)[\s:]*([^\n\r,]+)',
        r'(?:name|नाम)[\s:]*([A-Za-z\u0900-\u097F\s]+)',
    ]
    
    for pattern in name_patterns:
        match = re.search(pattern, text_lower, re.IGNORECASE)
        if match:
            fra_fields.claimant_name = match.group(1).strip()
            break
    
    # Extract Village
    village_patterns = [
        r'(?:village|गाँव|ग्राम|village name|ग्राम का नाम)[\s:]*([^\n\r,]+)',
        r'(?:village|गाँव|ग्राम)[\s:]*([A-Za-z\u0900-\u097F\s]+)',
    ]
    
    for pattern in village_patterns:
        match = re.search(pattern, text_lower, re.IGNORECASE)
        if match:
            fra_fields.village = match.group(1).strip()
            break
    
    # Extract Area and Units
    area_patterns = [
        r'(?:area|क्षेत्रफल|जमीन|land)[\s:]*([0-9.,\s]+)\s*(hectare|acre|हेक्टेयर|एकड़|sq\.?\s*m|sq\.?\s*ft)',
        r'([0-9.,\s]+)\s*(hectare|acre|हेक्टेयर|एकड़|sq\.?\s*m|sq\.?\s*ft)',
    ]
    
    for pattern in area_patterns:
        match = re.search(pattern, text_lower, re.IGNORECASE)
        if match:
            fra_fields.area = match.group(1).strip()
            fra_fields.area_units = match.group(2).strip()
            break
    
    # Extract Claim Status
    status_patterns = [
        r'(?:status|स्थिति|claim status|दावा स्थिति)[\s:]*([^\n\r,]+)',
        r'(?:approved|स्वीकृत|rejected|अस्वीकृत|pending|लंबित)',
    ]
    
    for pattern in status_patterns:
        match = re.search(pattern, text_lower, re.IGNORECASE)
        if match:
            status_text = match.group(1) if len(match.groups()) > 0 else match.group(0)
            if any(word in status_text.lower() for word in ['approved', 'स्वीकृत', 'accepted']):
                fra_fields.claim_status = 'approved'
            elif any(word in status_text.lower() for word in ['rejected', 'अस्वीकृत', 'denied']):
                fra_fields.claim_status = 'rejected'
            elif any(word in status_text.lower() for word in ['pending', 'लंबित', 'under review']):
                fra_fields.claim_status = 'pending'
            break
    
    # If no status found, try to infer from context
    if not fra_fields.claim_status:
        if any(word in text_lower for word in ['approved', 'स्वीकृत', 'accepted']):
            fra_fields.claim_status = 'approved'
        elif any(word in text_lower for word in ['rejected', 'अस्वीकृत', 'denied']):
            fra_fields.claim_status = 'rejected'
        elif any(word in text_lower for word in ['pending', 'लंबित', 'under review']):
            fra_fields.claim_status = 'pending'
    
    return fra_fields

def get_text_excerpt(text: str, max_length: int = 200) -> str:
    """Get a short excerpt from the text"""
    if len(text) <= max_length:
        return text
    return text[:max_length] + "..."

@app.on_event("startup")
async def startup_event():
    """Initialize models on startup"""
    success = initialize_models()
    if not success:
        print("Warning: Some models failed to load. API may not function properly.")

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy" if ocr_reader and ner_pipeline else "degraded",
        timestamp=datetime.now().isoformat(),
        models_loaded=bool(ocr_reader and ner_pipeline)
    )

@app.post("/upload", response_model=ProcessingResponse)
async def upload_file(file: UploadFile = File(...)):
    """Upload and process PDF or image file"""
    
    # Check if models are loaded
    if not ocr_reader or not ner_pipeline:
        raise HTTPException(status_code=503, detail="Models not loaded. Please try again later.")
    
    # Validate file type
    if not file.content_type.startswith(('image/', 'application/pdf')):
        raise HTTPException(status_code=400, detail="File must be an image or PDF")
    
    try:
        # Read file content
        file_content = await file.read()
        
        # For now, we'll only handle images. PDF support would require additional libraries like PyPDF2
        if file.content_type.startswith('image/'):
            # Extract text using OCR
            text = extract_text_from_image(file_content)
        else:
            raise HTTPException(status_code=400, detail="PDF support not implemented yet. Please upload an image file.")
        
        if not text.strip():
            raise HTTPException(status_code=400, detail="No text found in the uploaded file")
        
        # Extract entities using NER
        entities = extract_entities(text)
        
        # Extract FRA-specific fields
        fra_fields = extract_fra_fields(text, entities)
        
        # Create document record
        document_record = {
            "filename": file.filename,
            "content_type": file.content_type,
            "upload_time": datetime.now(),
            "full_text": text,
            "entities": entities,
            "fra_fields": fra_fields.dict(),
            "text_excerpt": get_text_excerpt(text)
        }
        
        # Store in MongoDB
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
    """Root endpoint"""
    return {"message": "FRA Document Processing API", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)