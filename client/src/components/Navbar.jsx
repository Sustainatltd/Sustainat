// 🧠 React tools to help us build components and use navigation
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ✅ This is the navigation bar at the top of the website
function Navbar() {
  const navigate = useNavigate(); // 🎯 Used to navigate when logging out

  // ✅ Get whether the user is logged in and is admin from localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // ✅ Try to safely get the logged-in user’s info
  let user = {};
  try {
    const storedUser = localStorage.getItem('user');
    user = storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : {};
  } catch (err) {
    console.error('❌ Failed to parse user from localStorage:', err);
    user = {};
  }

  // ✅ Handle logout — clears saved data and sends user to login
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // 🔽 Dropdown menu for "Employment"
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 🔁 Close dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* 🌍 Logo on the left */}
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
        <img src="/images/logo.png" alt="Sustainat Logo" className="h-10 w-10" />
        <span className="text-2xl font-bold text-green-700">Sustainat</span>
      </div>

      {/* 🧭 Page links */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="hover:text-green-700 transition">Home</Link>
        <Link to="/products" className="hover:text-green-700 transition">Products</Link>

        {/* 📚 Show Knowledge only if logged in */}
        {isLoggedIn && (
          <Link to="/knowledge" className="hover:text-green-700 transition">Knowledge</Link>
        )}

        {/* 🔽 Employment dropdown (only if logged in) */}
        {isLoggedIn && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="hover:text-green-700 transition"
            >
              Employment ⌄
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-md z-10">
                <Link
                  to="/employment"
                  className="block px-4 py-2 hover:bg-green-100"
                >
                  Job Seekers
                </Link>
                <Link
                  to="/employment"
                  className="block px-4 py-2 hover:bg-green-100"
                >
                  Employers/Organisations
                </Link>
              </div>
            )}
          </div>
        )}

        {/* 🧑‍🤝‍🧑 Network for logged-in users */}
        {isLoggedIn && (
          <Link to="/network" className="hover:text-green-700 transition">Network</Link>
        )}

        {/* 📊 Admin Orders - Only for admin */}
        {isLoggedIn && isAdmin && (
          <Link to="/admin-orders" className="hover:text-blue-600 transition font-semibold">
            📊 Admin Orders
          </Link>
        )}

        {/* 📗 Accounting and 📬 Contact - Always visible */}
        <Link to="/accounting" className="hover:text-green-700 transition">Accounting</Link>
        <Link to="/contact" className="hover:text-green-700 transition">Contact</Link>

        {/* 🔐 Login/Register - Only if not logged in */}
        {!isLoggedIn && (
          <>
            <Link to="/login" className="hover:text-green-700 transition">Login</Link>
            <Link to="/register" className="hover:text-green-700 transition">Register</Link>
          </>
        )}

        {/* 👤 Logged-in user section with name + logout */}
        {isLoggedIn && (
          <div className="flex items-center space-x-3">
            <span className="text-sm">👤 {user?.name || 'User'}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded bg-gray-100 hover:bg-green-100 text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
