import React, { useState } from 'react';

function Accounting() {
  const [clientName, setClientName] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (clientName && service) {
      alert(`Thank you ${clientName}! We’ll contact you soon about "${service}".`);
      setClientName('');
      setService('');
      setMessage('');
    } else {
      alert('Please fill in your name and selected service.');
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1 style={{ color: 'green', marginBottom: '20px' }}>📊 Sustainat Accounting Services</h1>

      {/* Description */}
      <p style={{ maxWidth: '600px', marginBottom: '30px' }}>
        We offer a range of sustainability-related accounting services:
        <ul>
          <li>✔️ Whole Life Carbon Assessments</li>
          <li>✔️ Embodied Carbon Audits</li>
          <li>✔️ Net Zero Pathway Planning</li>
        </ul>
        Fill in the form below and our team will get in touch.
      </p>

      {/* Contact Form */}
      <div style={{ maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="Your Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          style={{ display: 'block', marginBottom: '10px', padding: '10px', width: '100%' }}
        />
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          style={{ display: 'block', marginBottom: '10px', padding: '10px', width: '100%' }}
        >
          <option value="">Select a Service</option>
          <option value="Whole Life Carbon Assessment">Whole Life Carbon Assessment</option>
          <option value="Embodied Carbon Audit">Embodied Carbon Audit</option>
          <option value="Net Zero Planning">Net Zero Planning</option>
        </select>
        <textarea
          placeholder="Optional message..."
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ display: 'block', marginBottom: '10px', padding: '10px', width: '100%' }}
        />
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Accounting;
