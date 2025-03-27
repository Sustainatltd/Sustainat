const express = require('express');
const router = express.Router();

// ✅ Import auth controller functions
const { register, login } = require('../controllers/authController');

// ✅ Register route - POST /api/register
router.post('/register', register);

// ✅ Login route - POST /api/login
router.post('/login', login);

// 🧪 TEMP: Get all users (for testing only, remove in production)
const User = require('../models/User');
router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // ✅ MongoDB query
    res.json(users); // ✅ Send list of users
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

module.exports = router;
