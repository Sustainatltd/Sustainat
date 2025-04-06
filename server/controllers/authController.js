// 📦 Import the things we need
const User = require('../models/User');    // 👤 User model from MongoDB
const bcrypt = require('bcryptjs');        // 🔐 To safely compare passwords
const jwt = require('jsonwebtoken');       // 🪪 To create login tokens

// ----------------------------------------
// ✅ REGISTER controller
// ----------------------------------------
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body; // 🧠 Get user details from form

    // 🔍 Check if user already exists (we don’t allow duplicates!)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 🔐 Encrypt the password before saving (for security)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Create and save the new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // ✅ Tell the user they're registered
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (err) {
    // ❌ Oops! Something went wrong
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ----------------------------------------
// ✅ LOGIN controller
// ----------------------------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; // 📥 Get login info

    // 🔍 Look for the user in MongoDB
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 🔐 Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // 🪪 Create a JWT token with _id instead of id to match your middleware
    const token = jwt.sign(
      { _id: user._id }, // 👈 Use "_id" to match requireAuth.js
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // ✅ Successful login! Send token + user info
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    // ❌ Something broke
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
