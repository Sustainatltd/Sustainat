// -------------------------------------------
// 📦 React imports
// -------------------------------------------
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  // 🧠 These store what the user types into the boxes
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // 🧠 To show messages (success or error)

  const navigate = useNavigate(); // 🚀 To move to another page

  // -------------------------------------------
  // 🚪 Function runs when you click Login
  // -------------------------------------------
  const onSubmit = async (e) => {
    e.preventDefault(); // ❌ Don't let the page refresh

    try {
      // 🧠 Send login info to backend
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }) // 📤 Send email + password
      });

      const data = await response.json(); // 📥 Convert backend reply to JSON

      if (response.ok && data.token) {
        // ✅ Login success!
        setMessage('✅ Login successful!');

        // 💾 Save the JWT token (very important for protected routes)
        localStorage.setItem('token', data.token);

        // 💾 Save user info & logged-in flag
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isLoggedIn', 'true');

        // ✅ If this is the admin, give special powers!
        if (data.user?.email === 'sumanth@sustainat.co.uk') {
          localStorage.setItem('isAdmin', 'true');
        } else {
          localStorage.setItem('isAdmin', 'false');
        }

        // 💼 Optional HR role support
        if (data.user?.email && data.user.email.includes('hr@')) {
          localStorage.setItem('hrEmail', data.user.email);
        }

        // 🏠 Go to homepage
        navigate('/');
      } else {
        // ❌ Show backend error (e.g., wrong password)
        setMessage(`❌ ${data.message || 'Login failed'}`);
      }
    } catch (err) {
      // ❌ Catch network or other errors
      console.error('❌ Login error:', err);
      setMessage('❌ Something went wrong while logging in');
    }
  };

  // -------------------------------------------
  // 🎨 Return JSX (HTML on screen)
  // -------------------------------------------
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h2>🔐 Login</h2>
      <form onSubmit={onSubmit} style={{ maxWidth: '400px' }}>
        {/* 📥 Email Input */}
        <input
          type="email"
          placeholder="Email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        {/* 🔑 Password Input */}
        <input
          type="password"
          placeholder="Password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        {/* ✅ Login Button */}
        <button type="submit" style={submitBtn}>Login</button>
      </form>

      {/* 🧠 Show any message */}
      <p>{message}</p>
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

// 📤 Export for use in App.js
export default Login;
