import React, { useState } from "react";
import axios from "axios";

function Upload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
    setResult(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setError(null);
      setResult(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select or drag a file first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const response = await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data);
    } catch (err) {
      console.error("Upload Error:", err);
      setError(err.response?.data?.detail || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload FRA Document</h2>

      {/* Drag & Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-xl p-6 mb-4 text-center cursor-pointer transition-all duration-200 ${
          dragActive ? "border-blue-500 bg-blue-50 scale-105" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput").click()}
      >
        {file ? (
          <p className="text-gray-700 font-medium">
            📄 <span className="font-semibold">{file.name}</span>
          </p>
        ) : (
          <p className="text-gray-500">Drag & Drop a file here or click to browse</p>
        )}
        <input
          id="fileInput"
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleUpload}
          disabled={loading}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Upload"}
        </button>

        {file && (
          <button
            onClick={resetUpload}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
          >
            Reset
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Result */}
      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-3 text-lg">📑 Extracted Info</h3>
          <ul className="space-y-1 text-sm">
            <li><b>Claimant Name:</b> {result.fra_fields?.claimant_name || "N/A"}</li>
            <li><b>Village:</b> {result.fra_fields?.village || "N/A"}</li>
            <li><b>Area:</b> {result.fra_fields?.area || "N/A"} {result.fra_fields?.area_units || ""}</li>
            <li><b>Status:</b> {result.fra_fields?.claim_status || "N/A"}</li>
            <li><b>Text Excerpt:</b> {result.text_excerpt || "N/A"}</li>
            <li><b>Document ID:</b> {result.document_id || "N/A"}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Upload;
