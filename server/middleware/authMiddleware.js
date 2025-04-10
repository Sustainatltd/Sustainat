// ---------------------------------------------
// 🔐 Middleware: Check JWT token and attach user info
// ---------------------------------------------

const jwt = require('jsonwebtoken');       // 📦 To decode and verify tokens
const User = require('../models/User');    // 👤 To get user info from DB

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    console.log('❌ No token provided');
    return res.status(401).json({ error: '🚫 No token provided' });
  }

  try {
    // 🪪 Extract token from "Bearer <token>"
    const token = authorization.startsWith('Bearer ')
      ? authorization.split(' ')[1]
      : authorization;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id).select('_id email isAdmin');

    if (!user) {
      console.log(`❌ User not found: ${decoded._id}`);
      return res.status(404).json({ error: '❌ User not found' });
    }

    req.user = {
      _id: user._id.toString(),
      email: user.email,
      isAdmin: user.isAdmin,
    };

    console.log(`✅ Authenticated as ${user.email} | Admin: ${user.isAdmin}`);
    next();
  } catch (error) {
    console.error('❌ JWT Error:', error.message);
    return res.status(401).json({ error: '🚫 Invalid or expired token' });
  }
};

module.exports = requireAuth;
