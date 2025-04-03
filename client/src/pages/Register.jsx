// 📦 React imports
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  // 📥 Form input fields (what the user types)
  const [name, setName] = useState('');         // 👤 Full name
  const [email, setEmail] = useState('');       // 📧 Email
  const [password, setPassword] = useState(''); // 🔐 Password
  const [confirm, setConfirm] = useState('');   // 🔐 Confirm password

  // 🚀 Used to send user to another page after success
  const navigate = useNavigate();

  // 🧠 This function runs when the user clicks the Register button
  const handleRegister = async (e) => {
    e.preventDefault(); // 🛑 Stop the page from reloading

    // ❌ If passwords don't match, show an alert and stop here
    if (password !== confirm) {
      alert('❌ Passwords do not match');
      return;
    }

    try {
      // ✅ Send registration request to the backend (updated URL!)
      const res = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // 📦 We're sending JSON
        body: JSON.stringify({ name, email, password })  // 📤 Send user data
      });

      const data = await res.json(); // 📥 Convert backend response to JSON

      if (!res.ok) {
        // ❌ If backend sends an error
        alert(data.message || 'Registration failed');
        return;
      }

      // ✅ Save user info to localStorage so they stay logged in
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('isLoggedIn', 'true');

      // 📧 If the user is an HR person (email includes "hr@")
      if (data.user?.email && data.user.email.includes('hr@')) {
        localStorage.setItem('hrEmail', data.user.email);
      }

      alert('✅ Registered successfully!');
      navigate('/'); // 🏠 Go back to homepage

    } catch (err) {
      console.error('❌ Registration error:', err);
      alert('Something went wrong while registering');
    }
  };

  // 🎨 UI - What appears on the screen
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h2>📝 Register</h2>
      
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

// ✨ Style for input boxes
const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  fontSize: '16px'
};

// ✨ Style for the green "Register" button
const submitBtn = {
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer'
};

// 📤 Export this component so App.js can use it
export default Register;
