// 🧠 Connect to MongoDB and fix products with no createdBy

const mongoose = require('mongoose');
require('dotenv').config(); // 🧪 Load env vars like MONGO_URI

const Product = require('./models/Product'); // 🛍️ Your product schema
const User = require('./models/User');       // 👤 Your user schema

// 1️⃣ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// 2️⃣ Main function
const fixProducts = async () => {
  try {
    // 🔍 Find your admin user by email
    const admin = await User.findOne({ email: 'sumanth@sustainat.co.uk' });
    if (!admin) {
      console.error('❌ Admin user not found!');
      process.exit(1);
    }

    // 🔍 Find all products that are missing createdBy
    const productsToFix = await Product.find({ createdBy: { $exists: false } });

    console.log(`🧹 Found ${productsToFix.length} products without createdBy.`);

    // 🛠️ Fix each one
    for (let product of productsToFix) {
      product.createdBy = admin._id; // ✏️ Set it to your user ID
      await product.save();
      console.log(`✅ Fixed product: ${product.name}`);
    }

    console.log('🎉 All missing createdBy fields are fixed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Repair script error:', error);
    process.exit(1);
  }
};

// 🚀 Run it!
fixProducts();
