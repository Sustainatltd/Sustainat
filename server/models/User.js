// -----------------------------------------
// ✅ User Model (for registration & login)
// 👶 Kid comment: This is the "ID card" for each user.
// It has their name, email, password, and whether they are an admin.
// -----------------------------------------

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // 👤 Full Name of the user
    name: {
      type: String,
      required: true,
      trim: true, // 🧽 Clean up spaces
    },

    // 📧 Email must be unique (like a unique ID)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // 🧽 Always store as lowercase
    },

    // 🔐 Hashed password (never store plain text!)
    password: {
      type: String,
      required: true,
    },

    // 🛡️ Admin flag
    isAdmin: {
      type: Boolean,
      default: false, // 🧍 Everyone is a normal user unless marked admin
    },
  },
  {
    timestamps: true, // ⏱ Auto-add createdAt & updatedAt
  }
);

// 🚀 Export model so we can use it elsewhere
module.exports = mongoose.model('User', userSchema);
