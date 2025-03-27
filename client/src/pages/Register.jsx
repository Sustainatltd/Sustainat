// 📦 React imports
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  // 🧠 State to hold form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  // 🚀 To programmatically redirect user after registration
  const navigate = useNavigate();

  // 📝 Function that runs when user clicks Register
  const handleRegister = async (e) => {
    e.preventDefault(); // 🛑 Prevent default page reload on form submit

    // ❌ Check if passwords match
    if (password !== confirm) {
      alert('❌ Passwords do not match');
      return;
    }

    try {
      // 📤 Send POST request to backend register API
      const res = await fetch("http://192.168.49.2:30001/api/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }) // 🧾 Send user info
      });

      const data = await res.json(); // 📥 Convert response to JS object

      // ❌ If backend returns an error
      if (!res.ok) {
        alert(data.message || 'Registration failed');
        return;
      }

      // ✅ Save user info locally so they stay logged in
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('isLoggedIn', 'true');

      // 🏢 If this is an HR user (based on email), store it separately
      if (data.user?.email && data.user.email.includes('hr@')) {
        localStorage.setItem('hrEmail', data.user.email);
      }

      alert('✅ Registered successfully!');
      navigate('/'); // 🔁 Redirect to homepage

    } catch (err) {
      console.error('❌ Registration error:', err);
      alert('Something went wrong while registering');
    }
  };

  // 🖼️ What appears on the screen
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h2>📝 Register</h2>
      
      {/* 📋 Registration Form */}
      <form onSubmit={handleRegister} style={{ maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="Full Name"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          required
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={submitBtn}>Register</button>
      </form>
    </div>
  );
}

// 🎨 Style applied to all input fields
const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  fontSize: '16px'
};

// 🎨 Style for the submit button
const submitBtn = {
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer'
};

// 📤 Export the Register component to be used in the app
export default Register;
