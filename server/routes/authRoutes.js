const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// ✅ Actual Register Route (with MongoDB)
router.post('/register', register);

// ✅ Actual Login Route (with MongoDB)
router.post('/login', login);

// 🧪 TEMPORARY: List all users (for testing only)
const User = require('../models/User');
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

module.exports = router;
