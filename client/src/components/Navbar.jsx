import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  // ✅ Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // ✅ Safely get and parse user from localStorage
  let user = {}; // fallback
  try {
    const storedUser = localStorage.getItem('user');

    // Check it's not the string "undefined" and not null
    user = storedUser && storedUser !== 'undefined'
      ? JSON.parse(storedUser)
      : {};
  } catch (err) {
    console.error('❌ Failed to parse user from localStorage:', err);
    user = {}; // fallback
  }

  // 🔒 Check if HR is logged in
  const hrEmail = localStorage.getItem('hrEmail');

  // 🚪 Log out the user and clear everything
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: '#dfffe0',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {/* 🌱 App name / logo */}
      <h2 style={{ color: 'green' }}>Sustainat 🌱</h2>

      {/* 🔗 Navigation links section */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {/* 🌍 Always-visible public links */}
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/knowledge">Knowledge</Link>
        <Link to="/accounting">Accounting</Link>
        <Link to="/contact">Contact</Link>

        {/* 🧑‍💼 Logged-in user routes */}
        {isLoggedIn && <Link to="/employment">Employment</Link>}
        {isLoggedIn && <Link to="/network">Network</Link>}

        {/* 📬 Show Applications only if HR is logged in */}
        {isLoggedIn && hrEmail && (
          <Link to="/applications">Applications</Link>
        )}

        {/* 🔐 Show Login/Register if user not logged in */}
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {!isLoggedIn && <Link to="/register">Register</Link>}

        {/* 👋 Show logout + user name if logged in */}
        {isLoggedIn && (
          <>
            <span>👤 {user?.name || 'User'}</span>
            <button
              onClick={handleLogout}
              style={{
                padding: '5px 10px',
                borderRadius: '5px',
                backgroundColor: '#eee',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
