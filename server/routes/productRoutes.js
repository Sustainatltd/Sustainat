// -----------------------------------------
// ✅ IMPORTS
// -----------------------------------------

const express = require('express'); // 📦 Express lets us create API routes
const router = express.Router();    // 🛣️ Router helps us group related routes together

// 📥 Import all product-related controller functions
const {
  getAllProducts,   // Function to get all products
  getProductById,   // Function to get a single product by its ID
  createProduct,    // Function to add a new product
  deleteProduct,    // Function to delete a product
  updateProduct,    // Function to update a product
} = require('../controllers/productController');

// 🔐 Import the middleware that checks if a user is logged in and gives us `req.user`
const requireAuth = require('../middleware/requireAuth');

// ✅ Mini middleware to check if a user is an admin
const isAdmin = (req, res, next) => {
  // 👮‍♂️ You can add more admin emails here in the future if needed
  const adminEmails = ['sumanth@sustainat.co.uk'];

  // 🚫 If no user is attached or their email is not in the admin list — block them
  if (!req.user || !adminEmails.includes(req.user.email)) {
    return res.status(403).json({ error: '🚫 You are not an admin' });
  }

  // ✅ If user is an admin, continue to the next function (like create, update, delete)
  next();
};

// -----------------------------------------
// 🌍 PUBLIC ROUTES — open to everyone
// -----------------------------------------

// 🧾 GET /api/products
// 👉 This shows ALL products to anyone (even if not logged in)
router.get('/', getAllProducts);

// 🔍 GET /api/products/:id
// 👉 This shows ONE product's detail to anyone
router.get('/:id', getProductById);

// -----------------------------------------
// 🔐 ADMIN ROUTES — only for logged-in admins
// -----------------------------------------

// ➕ POST /api/products
// 👉 Admins can add a new product
router.post('/', requireAuth, isAdmin, createProduct);

// ✏️ PATCH /api/products/:id
// 👉 Admins can update a product
router.patch('/:id', requireAuth, isAdmin, updateProduct);

// 🗑️ DELETE /api/products/:id
// 👉 Admins can delete a product
router.delete('/:id', requireAuth, isAdmin, deleteProduct);

// -----------------------------------------
// 📤 Export the router so we can use it in server.js
// -----------------------------------------
module.exports = router;
