// ---------------------------------------------
// 🔐 requireAuth.js — Verifies JWT & Attaches User Info
// 👶 Kid comment: This is the "security guard" 🚧.
// It checks the token, finds the user, and writes their ID/email on the request.
// ---------------------------------------------

const jwt = require('jsonwebtoken');   // 📦 For decoding/verifying tokens
const User = require('../models/User'); // 👤 User model to fetch from DB

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  // 🚫 1. No token → blocked
  if (!authorization) {
    console.log('❌ No Authorization header found');
    return res.status(401).json({ error: '🚫 No token provided' });
  }

  try {
    // 🔐 2. Extract token → remove "Bearer " if present
    const token = authorization.startsWith('Bearer ')
      ? authorization.split(' ')[1]
      : authorization;

    console.log('🔍 Token received:', token);

    // ✅ 3. Decode + verify using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔎 4. Find user in DB (select only safe fields)
    const user = await User.findById(decoded._id).select('_id email isAdmin');

    if (!user) {
      console.log(`❌ User with ID ${decoded._id} not found in DB`);
      return res.status(404).json({ error: '❌ User not found' });
    }

    // 🧠 5. Attach user info to request
    req.user = {
      _id: user._id.toString(), // 🆔 ID
      email: user.email,        // 📧 Email
      isAdmin: user.isAdmin,    // 🛡️ Admin flag
    };

    console.log(`✅ Authenticated: ${user.email} | Admin: ${user.isAdmin}`);
    next(); // ✅ Continue to next step
  } catch (err) {
    console.error('❌ Token verification failed:', err.message);
    return res.status(401).json({ error: '🚫 Token invalid or expired' });
  }
};

module.exports = requireAuth;
