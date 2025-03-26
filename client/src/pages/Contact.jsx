import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // 🔄 Update form data as user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📩 Simulate form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.email && formData.subject) {
      setSubmitted(true);
      console.log('Form submitted:', formData);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1 style={{ color: 'green', marginBottom: '20px' }}>📬 Contact Sustainat</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            style={{ display: 'block', marginBottom: '10px', padding: '10px', width: '100%' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email *"
            value={formData.email}
            onChange={handleChange}
            style={{ display: 'block', marginBottom: '10px', padding: '10px', width: '100%' }}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject *"
            value={formData.subject}
            onChange={handleChange}
            style={{ display: 'block', marginBottom: '10px', padding: '10px', width: '100%' }}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            style={{ display: 'block', marginBottom: '10px', padding: '10px', width: '100%' }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: 'green',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Send Message
          </button>
        </form>
      ) : (
        <div style={{ backgroundColor: '#e0ffe0', padding: '20px', borderRadius: '10px', maxWidth: '400px' }}>
          ✅ Thank you for contacting us! We’ll get back to you shortly.
        </div>
      )}
    </div>
  );
}

export default Contact;
