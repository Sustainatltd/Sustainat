import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = ({ onUpload }) => {
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // 📸 Save selected image to state
  };

  const handleUpload = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append('image', imageFile); // 🏷️ 'image' is the key expected by backend

    setUploading(true);
    try {
      const res = await axios.post('/api/upload', formData); // 📤 Send to backend
      onUpload(res.data.url); // 🔗 Pass image URL back to parent
    } catch (err) {
      console.error('Upload failed', err);
    }
    setUploading(false);
  };

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
    </div>
  );
};

export default ImageUploader;
