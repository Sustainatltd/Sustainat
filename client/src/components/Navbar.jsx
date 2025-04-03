// 🧠 React tools to help us build components and use navigation
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ✅ This is the navigation bar at the top of the website
function Navbar() {
  const navigate = useNavigate(); // 🎯 Used to navigate when logging out

  // ✅ Check if the user is logged in by reading from browser storage
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // ✅ Try to get the user’s info (like name) from localStorage safely
  let user = {};
  try {
    const storedUser = localStorage.getItem('user');
    user = storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : {};
  } catch (err) {
    console.error('❌ Failed to parse user from localStorage:', err);
    user = {};
  }

  // ✅ Handle logout — clears the saved data and sends user to login page
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // 🔽 Track if the "Employment" dropdown is open
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // 📦 Used to close dropdown when clicking outside

  // 🧼 Closes dropdown if you click anywhere outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    // ✅ Add listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // ❌ Remove it when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* 🌍 Logo and text — clicking takes you to home */}
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
        <img src="/images/logo.png" alt="Sustainat Logo" className="h-10 w-10" />
        <span className="text-2xl font-bold text-green-700">Sustainat</span>
      </div>

      {/* 🧭 All page links */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="hover:text-green-700 transition">Home</Link>
        <Link to="/products" className="hover:text-green-700 transition">Products</Link>

        {/* 🔐 Show Knowledge only if logged in */}
        {isLoggedIn && (
          <Link to="/knowledge" className="hover:text-green-700 transition">Knowledge</Link>
        )}

        {/* 🔽 Employment dropdown menu (only if logged in) */}
        {isLoggedIn && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="hover:text-green-700 transition"
            >
              Employment ⌄
            </button>

            {/* 📂 Dropdown items appear when open */}
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-md z-10">
                <Link
                  to="/employment"
                  className="block px-4 py-2 hover:bg-green-100"
                >
                  Job Seekers
                </Link>
                <Link
                  to="/employment" // ✅ This is the Sustainat Employment Portal
                  className="block px-4 py-2 hover:bg-green-100"
                >
                  Employers/Organisations
                </Link>
              </div>
            )}
          </div>
        )}

        {/* 🔐 Show Network only if logged in */}
        {isLoggedIn && (
          <Link to="/network" className="hover:text-green-700 transition">Network</Link>
        )}

        <Link to="/accounting" className="hover:text-green-700 transition">Accounting</Link>
        <Link to="/contact" className="hover:text-green-700 transition">Contact</Link>

        {/* 👤 If not logged in, show login/register */}
        {!isLoggedIn && (
          <>
            <Link to="/login" className="hover:text-green-700 transition">Login</Link>
            <Link to="/register" className="hover:text-green-700 transition">Register</Link>
          </>
        )}

        {/* 👋 If logged in, show user name and logout */}
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
