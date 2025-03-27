// 📦 React + Router imports
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  // 📋 State to track form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 🧭 Hook to navigate programmatically
  const navigate = useNavigate();

  // 🔐 Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // 🛑 Stop default form refresh

    try {
      // 📤 Send login credentials to backend
      const res = await fetch('http://localhost:30001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }) // 🧾 Send data
      });

      const data = await res.json(); // 📥 Parse response

      // ❌ Show error if login fails (wrong email or password)
      if (!res.ok) {
        alert(data.message || 'Login failed');
        return;
      }

      // ✅ Store user info in localStorage to stay logged in
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('isLoggedIn', 'true');

      // ✅ If email is HR, also store separately
      if (data.user.email.includes('hr@')) {
        localStorage.setItem('hrEmail', data.user.email);
      }

      alert('✅ Logged in successfully!');
      navigate('/'); // 🏠 Redirect to homepage

    } catch (err) {
      console.error('❌ Login error:', err);
      alert('Something went wrong while logging in');
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h2>🔐 Login to Sustainat</h2>

      {/* 🔑 Login Form */}
      <form onSubmit={handleLogin} style={{ maxWidth: '400px' }}>
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
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={submitBtn}>Login</button>
      </form>
    </div>
  );
}

// 🎨 Reusable input styling
const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  fontSize: '16px'
};

// 🎨 Style for the login button
const submitBtn = {
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer'
};

// 📤 Export the Login component
export default Login;
