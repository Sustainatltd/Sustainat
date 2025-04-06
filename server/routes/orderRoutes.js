// ----------------------------------------
// 📦 ORDER ROUTES (User & Admin)
// ----------------------------------------
const express = require('express');
const router = express.Router();

// 🧾 Import the Order model
const Order = require('../models/Order');
// 👤 Import the User model (to get email)
const User = require('../models/User');

// 🔐 Middleware to make sure the user is logged in
const requireAuth = require('../middleware/requireAuth');

// 🛡️ All routes below require login
router.use(requireAuth);

// ✅ Route 1: Save a new order (for logged-in user)
router.post('/', async (req, res) => {
  try {
    const { name, address, phone, productName, productPrice } = req.body;

    const order = new Order({
      name,
      address,
      phone,
      productName,
      productPrice,
      userId: req.user._id, // 💾 Save who placed it
    });

    const saved = await order.save(); // 💾 Save to DB
    res.status(201).json(saved);      // 📤 Return saved order
  } catch (err) {
    console.error('❌ Error saving order:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// ✅ Route 2: Get orders of the logged-in user
router.get('/my', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error('❌ Error fetching user orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// ✅ Route 3: Admin — Get ALL user orders
router.get('/', async (req, res) => {
  try {
    // 🔐 Only allow if user is admin
    if (req.user.email !== 'sumanth@sustainat.co.uk') {
      return res.status(403).json({ error: '🚫 Not authorized' });
    }

    // 📦 Get all orders and populate user email
    const orders = await Order.find().sort({ createdAt: -1 });

    // 📧 For each order, get user email
    const ordersWithUser = await Promise.all(
      orders.map(async (order) => {
        const user = await User.findById(order.userId).select('email');
        return {
          ...order._doc,
          userEmail: user?.email || 'Unknown',
        };
      })
    );

    res.status(200).json(ordersWithUser); // 📤 Send enriched data
  } catch (err) {
    console.error('❌ Error fetching all orders:', err);
    res.status(500).json({ error: 'Failed to fetch all orders' });
  }
});

module.exports = router;
