import React, { useState } from 'react';

// 🟢 Simple popup modal for job application
function ApplyModal({ job, isOpen, onClose }) {
  // ✅ Always declare hooks at the top
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // ❗ Don't render the modal if not open or no job selected
  if (!isOpen || !job) return null;

  // ✅ Handle form submission
  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      alert('⚠️ Please fill in your name and email');
      return;
    }

    try {
      const res = await fetch('http://localhost:5001/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job._id,
          ...formData
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert('❌ Error: ' + data.message);
        return;
      }

      alert('✅ Application submitted!');
      setFormData({ name: '', email: '', message: '' });
      onClose();
    } catch (err) {
      console.error('Application error:', err);
      alert('Something went wrong');
    }
  };

  return (
    <div style={modalOverlay}>
      <div style={modalContent}>
        <h3>📋 Apply for: {job.title}</h3>

        <input
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={inputStyle}
        />
        <textarea
          placeholder="Your Message (Optional)"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          style={inputStyle}
        />

        <button style={submitBtn} onClick={handleSubmit}>Submit</button>
        <button style={closeBtn} onClick={onClose}>❌ Close</button>
      </div>
    </div>
  );
}

// 🎨 Modal styling
const modalOverlay = {
  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
};

const modalContent = {
  background: '#fff', padding: '20px', borderRadius: '10px', width: '400px', boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
};

const inputStyle = {
  width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'
};

const submitBtn = {
  backgroundColor: 'green', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', width: '100%'
};

const closeBtn = {
  marginTop: '10px', backgroundColor: '#ccc', color: 'black', padding: '8px', border: 'none', borderRadius: '5px', width: '100%'
};

export default ApplyModal;
