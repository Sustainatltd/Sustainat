// ---------------------------------------------
// ✅ 1. Imports and Setup
// ---------------------------------------------
const express = require('express');          // 🛠️ Express helps us build our server
const cors = require('cors');                // 🌐 Allows frontend to talk to backend (React)
const client = require('prom-client');       // 📊 Prometheus metrics collection
require('dotenv').config();                  // 🔒 Load secret keys from .env file

const connectDB = require('./config/db');    // 🔌 Connect to MongoDB
const app = express();                       // 🚀 Initialize our app

// ---------------------------------------------
// 🔐 2. Safety Check for JWT Secret
// ---------------------------------------------
if (!process.env.JWT_SECRET) {
  console.error('❌ Missing JWT_SECRET in your .env file!');
  process.exit(1); // ❌ Stop the server from running if secret is missing
}

// ---------------------------------------------
// 🧠 3. Middleware Setup
// ---------------------------------------------
app.use(express.json()); // 📦 Parse JSON in request body
app.use(cors());         // 🌐 Allow cross-origin requests (e.g., from frontend)

// ---------------------------------------------
// 📈 4. Prometheus Monitoring Route
// ---------------------------------------------
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // 🧪 Start collecting system metrics

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

// ---------------------------------------------
// 🍃 5. Connect to MongoDB Atlas or Local
// ---------------------------------------------
connectDB(); // ✅ Establish DB connection using MONGO_URI

// ---------------------------------------------
// 🚏 6. API Routes
// ---------------------------------------------

// 🏠 Home route - just to check if server is up
app.get('/', (req, res) => {
  console.log("Home route accessed"); // 🧠 For debugging
  res.send('✅ Sustainat Backend is running');
});

// 📤 Image Upload Route (NEW) - for Cloudinary
app.use('/api/upload', require('./routes/uploadRoutes'));

// 👤 User Authentication Routes
app.use('/api', require('./routes/authRoutes'));

// 💼 Jobs - Post and View Job Listings
app.use('/api', require('./routes/jobRoutes'));

// 📩 Job Applications - Send and Track
app.use('/api', require('./routes/applicationRoutes'));

// 🛍️ Products - Admin can manage products
app.use('/api/products', (req, res, next) => {
  console.log(`Product route accessed: ${req.method} ${req.originalUrl}`); // 🧠 For debugging
  next();
}, require('./routes/productRoutes'));

// 📦 Orders - User checkout and order history
app.use('/api/orders', require('./routes/orderRoutes'));

// ---------------------------------------------
// 🚀 7. Start the Server
// ---------------------------------------------
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
