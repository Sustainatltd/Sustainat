// --------------------------------------------
// 🍃 MongoDB Connection Setup (db.js)
// --------------------------------------------

// We use mongoose to talk to MongoDB
const mongoose = require("mongoose");

// Load secret keys from .env file (like magic 🪄)
require("dotenv").config();

// This is your MongoDB cloud URL stored safely in .env
const MONGO_URI = process.env.MONGO_URI;

// This function will connect our app to the MongoDB cloud
const connectDB = async () => {
  try {
    // Try to connect to MongoDB Atlas
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,        // Makes connection string easier to understand
      useUnifiedTopology: true,     // Helps connect more reliably
    });

    // If connection works, show this message
    console.log("✅ Connected to MongoDB Atlas!");
  } catch (error) {
    // If something goes wrong, show error and stop app
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Stop the app so we can fix the problem
  }
};

// Export this function so we can use it in other files (like server.js)
module.exports = connectDB;
