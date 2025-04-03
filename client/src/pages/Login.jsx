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
      // 🧠 We're sending login info to the backend
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // 📦 We're sending JSON data
        },
        body: JSON.stringify({ email, password }) // 📤 Send email + password
      });

      const data = await response.json(); // 📥 Convert the response into usable data

      if (response.ok) {
        // ✅ Login worked!
        setMessage('✅ Login successful!');

        // 💾 Save user info in browser memory
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isLoggedIn', 'true');

        // 💼 If email is an HR email, save it for HR dashboard
        if (data.user?.email && data.user.email.includes('hr@')) {
          localStorage.setItem('hrEmail', data.user.email);
        }

        navigate('/'); // 🏃‍♂️ Go to home page
      } else {
        // ❌ Login failed, show the message
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      // ❌ Something went wrong with the request
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

// -------------------------------------------
// ✨ Style for input fields
// -------------------------------------------
const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  fontSize: '16px'
};

// -------------------------------------------
// ✨ Style for Login button
// -------------------------------------------
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
export default Login;
