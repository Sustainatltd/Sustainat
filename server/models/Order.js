const mongoose = require('mongoose'); 
// 🧠 Mongoose = tool to talk to MongoDB in JavaScript

// 📦 Define what an "Order" looks like
const orderSchema = new mongoose.Schema(
  {
    // 👤 Person placing the order
    name: {
      type: String,
      required: true, // 🚫 Cannot be empty
    },
    address: {
      type: String,
      required: true, // 🏡 Needed to deliver
    },
    phone: {
      type: String,
      required: true, // ☎️ We need to call if issues
    },

    // 🧺 Product details
    productId: {
      type: mongoose.Schema.Types.ObjectId, // 🆔 Exact product id
      ref: 'Product',                       // 🔗 Link to Product model
    },
    productName: {
      type: String,
      required: true, // 👶 Friendly name for display
    },
    productPrice: {
      type: Number,
      required: true, // 💷 Price when ordered
    },

    // 🔐 Who ordered
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // 👶 tie order to user always
    },
  },
  {
    timestamps: true, // 🕒 Auto add createdAt + updatedAt
  }
);

// 🚀 Export model
module.exports = mongoose.model('Order', orderSchema);
