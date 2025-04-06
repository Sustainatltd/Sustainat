// 📦 Import mongoose to connect with MongoDB
const mongoose = require('mongoose');

// Create a new product schema (a blueprint for each product)
const productSchema = new mongoose.Schema(
  {
    // The name/title of the product
    name: {
      type: String, // It should be text
      required: true, // This field is required (cannot be empty)
    },
    // Description of what the product is about
    description: {
      type: String,
      required: true, // This field cannot be empty
    },
    // How much the product costs
    price: {
      type: Number,
      required: true, // This field cannot be empty
    },
    // The image URL or path (can be a link or local path)
    image: {
      type: String,
      required: true, // This field is required
    },
    // Who added this product (linked to a User)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, // It's a reference to another model (User)
      ref: 'User', // Reference to the User model
      required: true, // This is required to store who created the product
    },
  },
  {
    timestamps: true, // This will add "createdAt" and "updatedAt" automatically
  }
);

// 📤 Export the model so we can use it in other files
module.exports = mongoose.model('Product', productSchema);
