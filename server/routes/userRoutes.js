// ---------------------------------------------------
// 🕤 userRoutes.js — User Management (Admin Panel)
// ---------------------------------------------------

const express = require('express');
const router = express.Router(); // 🕣️ Create route group for users
const User = require('../models/User'); // 👤 MongoDB User model
const authMiddleware = require('../middleware/authMiddleware'); // 🔐 Token checker

// ---------------------------------------------------
// ✅ 1. View All Users — Admin Only
// ---------------------------------------------------
router.get('/', authMiddleware, async (req, res) => {
  try {
    // ❌ Check if user is not an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // 📦 Get all users, don't return passwords
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    console.error('❌ Failed to fetch users:', err.message);
    res.status(500).json({ message: 'Server error while fetching users.' });
  }
});

// ---------------------------------------------------
// 🔁 2. Toggle Admin Role — Admin Only
// ---------------------------------------------------
router.patch('/:id/toggle-admin', authMiddleware, async (req, res) => {
  try {
    // 🚩 Allow only admins to toggle roles
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admins only can change roles' });
    }

    // 🔍 Get user by ID
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isAdmin = !user.isAdmin; // 🔁 Flip admin status
    await user.save();

    res.status(200).json({
      message: `User is now ${user.isAdmin ? 'an admin' : 'a regular user'}`,
      updatedUser: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error('❌ Failed to toggle admin:', err.message);
    res.status(500).json({ message: 'Error toggling admin role' });
  }
});

// ---------------------------------------------------
// 🗑️ 3. Delete a User — Admin Only
// ---------------------------------------------------
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // ❌ Check if the logged-in user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can delete users' });
    }

    // 🗑️ Find and remove the user
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('❌ Failed to delete user:', err.message);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;
