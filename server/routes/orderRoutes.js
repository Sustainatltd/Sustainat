// ----------------------------------------
// 📦 ORDER ROUTES (User & Admin)
// 👶 Kid comment: These are the "delivery counter" routes.
// Users can place an order, see their own orders, and the admin can see all orders.
// ----------------------------------------
const express = require('express');
const router = express.Router();

// 📦 Import models
const Order = require('../models/Order'); // 🧾 Order "box"
const User = require('../models/User');   // 👤 To fetch email

// 🔐 Import middleware
const requireAuth = require('../middleware/requireAuth');

// 🛡️ All routes below require login first
router.use(requireAuth);

// ✅ Route 1: POST /api/orders
// 👶 Kid: Save a new order for the logged-in user
router.post('/', async (req, res) => {
  try {
    const { name, address, phone, productName, productPrice, productId } = req.body;

    // 🧾 Create order
    const order = new Order({
      name,
      address,
      phone,
      productName,
      productPrice,
      productId,          // 🆔 store id too (helps later)
      userId: req.user._id, // 🔐 who placed it
    });

    const saved = await order.save(); // 💾 Save in DB
    res.status(201).json(saved);      // 📤 Return saved order
  } catch (err) {
    console.error('❌ Error saving order:', err);
    res.status(500).json({ error: 'Something went wrong saving the order' });
  }
});

// ✅ Route 2: GET /api/orders/my
// 👶 Kid: Show the orders of the current logged-in user
router.get('/my', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error('❌ Error fetching user orders:', err);
    res.status(500).json({ error: 'Failed to fetch your orders' });
  }
});

// ✅ Route 3: GET /api/orders
// 👶 Kid: Admin can see all orders (with user email)
router.get('/', async (req, res) => {
  try {
    // 🛑 Stop if not admin
    if (req.user.email !== 'sumanth@sustainat.co.uk') {
      return res.status(403).json({ error: '🚫 Not authorized' });
    }

    // 📦 Get all orders
    const orders = await Order.find().sort({ createdAt: -1 });

    // 📧 Attach user email to each order
    const ordersWithUser = await Promise.all(
      orders.map(async (order) => {
        const user = await User.findById(order.userId).select('email');
        return {
          ...order._doc,
          userEmail: user?.email || 'Unknown',
        };
      })
    );

    res.status(200).json(ordersWithUser);
  } catch (err) {
    console.error('❌ Error fetching all orders:', err);
    res.status(500).json({ error: 'Failed to fetch all orders' });
  }
});

module.exports = router;
