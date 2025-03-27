// 📦 React imports
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  // 📥 Track email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 🧠 Save a message to show login success or error
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // 🚀 For redirection

  // 🧠 This function runs when you click Login
  const onSubmit = async (e) => {
    e.preventDefault(); // 🚫 Don't refresh the page

    try {
      // ✅ Make the API call to the backend to log in
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // 📦 Sending JSON
        },
        body: JSON.stringify({ email, password }) // 📤 Send email & password
      });

      const data = await response.json(); // 📥 Convert response to JS object

      if (response.ok) {
        // ✅ Login worked!
        setMessage('✅ Login successful!');
        localStorage.setItem('user', JSON.stringify(data.user)); // 💾 Save user data
        localStorage.setItem('isLoggedIn', 'true');

        if (data.user?.email && data.user.email.includes('hr@')) {
          localStorage.setItem('hrEmail', data.user.email); // 💼 For HR dashboard
        }

        navigate('/'); // 🏠 Redirect to homepage
      } else {
        // ❌ Something wrong with login
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      setMessage('❌ Something went wrong while logging in');
    }
  };

  // 🎨 Render form on screen
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h2>🔐 Login</h2>
      <form onSubmit={onSubmit} style={{ maxWidth: '400px' }}>
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
      <p>{message}</p> {/* 🧠 Show messages here */}
    </div>
  );
}

// ✨ Style for input fields
const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  fontSize: '16px'
};

// ✨ Style for Login button
const submitBtn = {
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer'
};

// 📤 Export so App.js can use it
export default Login;
