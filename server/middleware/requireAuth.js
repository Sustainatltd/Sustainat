// ---------------------------------------------
// 🔐 requireAuth.js — Verifies JWT & Attaches User Info
// ---------------------------------------------

const jwt = require('jsonwebtoken');          // 📦 For decoding tokens
const User = require('../models/User');       // 👤 User model to fetch user from DB

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  // 🚫 1. Block if there's no token at all
  if (!authorization) {
    console.log('❌ No Authorization header found');
    return res.status(401).json({ error: '🚫 No token provided' });
  }

  try {
    // 🔐 2. Extract token from header — remove "Bearer " if present
    const token = authorization.startsWith('Bearer ')
      ? authorization.split(' ')[1]
      : authorization;

    console.log('🔍 Token received:', token);

    // ✅ 3. Decode and verify the token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔎 4. Use decoded token to fetch user from DB
    const user = await User.findById(decoded._id).select('_id email isAdmin');

    // 🛑 5. If user is not found in DB
    if (!user) {
      console.log(`❌ User with ID ${decoded._id} not found in database`);
      return res.status(404).json({ error: '❌ User not found' });
    }

    // 🧠 6. Attach user info to request object
    req.user = {
      _id: user._id.toString(),     // 🆔 User ID
      email: user.email,            // 📧 Email
      isAdmin: user.isAdmin         // 🛡️ Admin status (used in admin-only routes)
    };

    console.log(`✅ Authenticated: ${user.email} | Admin: ${user.isAdmin}`);
    next(); // ✅ Go to next middleware or route handler

  } catch (err) {
    console.error('❌ Token verification failed:', err.message);
    return res.status(401).json({ error: '🚫 Token invalid or expired' });
  }
};

module.exports = requireAuth;
