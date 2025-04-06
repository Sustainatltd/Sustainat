// 🧱 Load the Product model (MongoDB schema)
// This model defines how a product is structured in the database
const Product = require('../models/Product');

// ✅ 1. Get all products (Public — everyone can see)
const getAllProducts = async (req, res) => {
  try {
    // 📦 Get all products from DB
    const products = await Product.find();  // Fetches all products from MongoDB
    console.log("Fetched all products:", products);  // Log the fetched products for debugging
    res.status(200).json(products);  // 🎉 Send the list of products as a JSON response
  } catch (error) {
    console.error('Error fetching products:', error.message);  // If something goes wrong, log it
    res.status(500).json({ error: '❌ Failed to fetch products' });  // Return a 500 error if something fails
  }
};

// ✅ 2. Get a product by ID (Public — everyone can view one)
const getProductById = async (req, res) => {
  try {
    // 🔍 Find product by ID using the parameter from the request URL
    const product = await Product.findById(req.params.id);  // Get product by its unique ID

    if (!product) {
      return res.status(404).json({ error: '❌ Product not found' });  // If no product is found, send an error
    }

    console.log("Fetched product:", product);  // Log the fetched product details for debugging
    res.status(200).json(product);  // 🎯 Return the found product as a JSON response
  } catch (error) {
    console.error('Error fetching product by ID:', error.message);  // Log error
    res.status(500).json({ error: '❌ Failed to fetch the product' });  // Return error message if something fails
  }
};

// ✅ 3. Create a product (Admin only)
const createProduct = async (req, res) => {
  try {
    // 📝 Extract product data from the request body (sent by the frontend)
    const { name, description, price, image } = req.body;

    // 🛑 Check if all fields are provided (name, description, price, image)
    if (!name || !description || !price || !image) {
      return res.status(400).json({ error: '⚠️ All fields are required' });  // If any field is missing, send an error
    }

    // 🧠 Check if the user is authenticated (check if we have a `req.user`)
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: '🚫 Not authenticated' });  // If not authenticated, block the action
    }

    // ✅ Save the product to MongoDB
    const product = await Product.create({
      name,
      description,
      price,
      image,
      createdBy: req.user._id,  // Store the user ID who created the product
    });

    console.log("Product created:", product);  // Log the created product for debugging
    res.status(201).json(product);  // 🎉 Send the newly created product back as JSON response
  } catch (error) {
    console.error('Error creating product:', error.message);  // Log error
    res.status(500).json({ error: '❌ Failed to create product' });  // Return error if something goes wrong
  }
};

// ✅ 4. Delete product (Admin can delete ANY product, Owner can delete their own)
const deleteProduct = async (req, res) => {
  try {
    // 🔍 Find product by its ID to delete
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: '❌ Product not found' });  // If product doesn't exist, return error
    }

    // ✨ Check if user is an admin or the product owner
    const isAdmin = req.user?.email === 'sumanth@sustainat.co.uk';  // Admin check (hardcoded for 'sumanth')
    const isOwner = product.createdBy?.toString() === req.user._id.toString();  // Check if the logged-in user owns the product

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ error: '🚫 Not authorized to delete this product' });  // If not authorized, block action
    }

    // 🗑️ Delete the product if the user is either admin or owner
    await Product.findByIdAndDelete(req.params.id);
    console.log("Product deleted:", product);  // Log the deleted product for debugging
    res.status(200).json({ message: '✅ Product deleted successfully' });  // 🎉 Send success message
  } catch (error) {
    console.error('Error deleting product:', error.message);  // Log error
    res.status(500).json({ error: '❌ Failed to delete product' });  // Return error if something fails
  }
};

// ✅ 5. Update product (Admin can update ANY product, Owner can update their own)
const updateProduct = async (req, res) => {
  try {
    // 📝 Get updated product data from the request body
    const { name, description, price, image } = req.body;

    // 🔍 Find the product by its ID
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: '❌ Product not found' });  // If product is not found, return error
    }

    // 🧑‍💼 Admin can update any product, owner can update their own
    const isAdmin = req.user?.email === 'sumanth@sustainat.co.uk';  // Admin check
    const isOwner = product.createdBy?.toString() === req.user._id.toString();  // Owner check

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ error: '🚫 Not authorized to update this product' });  // If not authorized, block action
    }

    // ✏️ Update the fields that are provided in the request body
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (image) product.image = image;

    // 💾 Save the updated product to the database
    const updated = await product.save();
    console.log("Product updated:", updated);  // Log the updated product for debugging
    res.status(200).json(updated);  // 🎉 Return the updated product as response
  } catch (error) {
    console.error('Error updating product:', error.message);  // Log error
    res.status(500).json({ error: '❌ Failed to update product' });  // If error occurs, send error response
  }
};

// ✅ Export all the functions so they can be used in routes
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
};
