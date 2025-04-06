// -----------------------------------------
// ✅ User Model (for registration & login)
// -----------------------------------------

const mongoose = require('mongoose');

// 🧱 Define schema for each user
const userSchema = new mongoose.Schema({
  // 👤 Full Name
  name: {
    type: String,
    required: true
  },

  // 📧 Email (must be unique)
  email: {
    type: String,
    required: true,
    unique: true
  },

  // 🔐 Hashed password
  password: {
    type: String,
    required: true
  },

  // 🛡️ NEW: Is this user an admin?
  isAdmin: {
    type: Boolean,
    default: false // 🧍 Normal users are not admins by default
  }

}, {
  timestamps: true // ⏱ Adds createdAt and updatedAt fields
});

// 🛠 Export the model
module.exports = mongoose.model('User', userSchema);
