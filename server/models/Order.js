const mongoose = require('mongoose'); // 🧠 Mongoose lets us talk to MongoDB using JavaScript

// 📦 Define what an "Order" looks like
const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // 👈 Name is required
    },
    address: {
      type: String,
      required: true, // 🏡 Delivery address is required
    },
    phone: {
      type: String,
      required: true, // ☎️ Contact phone is required
    },
    productName: {
      type: String,
      required: true, // 🧺 The product that was bought
    },
    productPrice: {
      type: Number,
      required: true, // 💷 Price at the time of order
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // 🔐 Link to User (optional)
      ref: 'User',
    },
  },
  {
    timestamps: true, // 🕒 Adds createdAt and updatedAt automatically
  }
);

// 🚀 Export the model so we can use it in routes
module.exports = mongoose.model('Order', orderSchema);
