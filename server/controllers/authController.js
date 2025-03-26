// 📦 Import required modules
const User = require('../models/User');        // MongoDB model for User
const bcrypt = require('bcryptjs');            // For password hashing
const jwt = require('jsonwebtoken');           // For generating login tokens

// ✅ REGISTER Controller
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body; // 📥 Get input from user

    // 🔍 Check if user already exists in database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 🔐 Encrypt the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Create and save the user to MongoDB
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // ✅ Send back the newly registered user's basic info
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (err) {
    // ❌ Send error response if something goes wrong
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ✅ LOGIN Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; // 📥 Get login credentials

    // 🔍 Check if the user exists in the DB
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 🔐 Compare input password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // 🪪 Generate a secure JWT token (optional but good for future features)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d' // token valid for 1 day
    });

    // ✅ Successful login response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    // ❌ Server or DB error
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
