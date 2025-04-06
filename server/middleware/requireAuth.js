const jwt = require('jsonwebtoken'); // 📦 To read tokens
const User = require('../models/User'); // 👤 To fetch users from MongoDB

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    console.log('❌ No token provided');
    return res.status(401).json({ error: '🚫 No token provided' });
  }

  try {
    // 🪪 Remove "Bearer " from the beginning if present
    const token = authorization.startsWith('Bearer ')
      ? authorization.split(' ')[1]
      : authorization;

    console.log('Token received in backend:', token);

    // ✅ Decode the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🧠 GET the correct field — "_id", not "id"
    const userId = decoded._id;
    console.log('✅ Decoded user ID:', userId);

    // 🔍 Find user in DB using the ID we got from the token
    const user = await User.findById(userId).select('_id email');

    if (!user) {
      console.log(`❌ User with ID ${userId} not found`);
      return res.status(404).json({ error: '❌ User not found' });
    }

    // 🧵 Attach the user info to the request so routes can use it
    req.user = {
      _id: user._id.toString(),
      email: user.email,
    };

    console.log(`✅ User authenticated: ${req.user.email}`);
    next(); // 🎯 Continue to the next step
  } catch (error) {
    console.error('❌ Token error:', error.message);
    return res.status(401).json({ error: '🚫 Token invalid or expired' });
  }
};

module.exports = requireAuth;
