// ----------------------------------------
// 🎟️ Auth Controller (register + login)
// 👶 Kid comment: This is the ticket booth. We make a safe ticket (JWT)
// when someone signs up or logs in, so the security guard can let them in.
// ----------------------------------------

const User = require('../models/User');     // 👤 Users in MongoDB
const bcrypt = require('bcryptjs');         // 🔐 Password hashing/checking
const jwt = require('jsonwebtoken');        // 🪪 Make/verify tokens

// 🧰 helper: make a JWT that our guard understands
function makeToken(userId) {
  // 👶 We put "_id" inside the ticket because the guard looks for "_id"
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

// ----------------------------------------
// ✅ REGISTER  (POST /api/register)
// 👶 Kid: Make a new user, give them a ticket immediately.
// ----------------------------------------
exports.register = async (req, res) => {
  try {
    // 🧼 Clean the inputs a bit
    const name = (req.body.name || '').trim();
    const email = (req.body.email || '').toLowerCase().trim();
    const password = req.body.password || '';

    // 🧪 Quick checks
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // 🔍 No duplicates
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 🔐 Hash password and save
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    // 🎟️ Make a token so they are logged-in right away
    const token = makeToken(user._id);

    // 📤 Send back safe user info + token
    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { name: user.name, email: user.email, isAdmin: user.isAdmin || false },
    });
  } catch (err) {
    console.error('register error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ----------------------------------------
// ✅ LOGIN  (POST /api/login)
// 👶 Kid: Check email+password, then give a fresh ticket.
// ----------------------------------------
exports.login = async (req, res) => {
  try {
    // 🧼 Clean inputs
    const email = (req.body.email || '').toLowerCase().trim();
    const password = req.body.password || '';

    // 🔎 Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 🔐 Check password
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    // 🎟️ Make token
    const token = makeToken(user._id);

    // 📤 Send token + basic user info
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { name: user.name, email: user.email, isAdmin: user.isAdmin || false },
    });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
