// -----------------------------------------
// ✅ User Model (for registration & login)
// -----------------------------------------

const mongoose = require('mongoose');

// 🧱 Define schema for each user
const userSchema = new mongoose.Schema({
  // 👤 Full Name (required)
  name: {
    type: String,
    required: true
  },

  // 📧 Email (required + must be unique)
  email: {
    type: String,
    required: true,
    unique: true // Prevents duplicate emails
  },

  // 🔐 Hashed password (required)
  password: {
    type: String,
    required: true
  }

}, {
  timestamps: true // ⏱ Adds createdAt and updatedAt fields automatically
});

// 🛠 Export the model for use in controllers
module.exports = mongoose.model('User', userSchema);
