// ---------------------------------------------
// ✅ 1. Imports and Setup
// ---------------------------------------------
const express = require('express'); // 🛠️ Express helps us build our server
const cors = require('cors');       // 🌐 Allows frontend to talk to backend
const client = require('prom-client'); // 📊 For Prometheus metrics

require('dotenv').config(); // 🔒 Load secret variables from .env file

const connectDB = require('./config/db'); // 🔌 MongoDB connection
const app = express(); // 🚀 Create our app

// ---------------------------------------------
// 🔐 SAFETY CHECK: Make sure JWT_SECRET is defined
// ---------------------------------------------
if (!process.env.JWT_SECRET) {
  console.error('❌ Missing JWT_SECRET in your .env file!');
  process.exit(1); // ❌ Stop server from starting
}

// ---------------------------------------------
// 🧠 2. Middleware
// ---------------------------------------------
app.use(express.json()); // 📦 Allow JSON in requests (like login, register)
app.use(cors());         // 🌐 Allow frontend on another port (like React on 3000)

// ---------------------------------------------
// 📈 3. Prometheus Monitoring Route
// ---------------------------------------------
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // 📊 Start collecting metrics

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

// ---------------------------------------------
// 🍃 4. Connect to MongoDB
// ---------------------------------------------
connectDB(); // ✅ Connect to database

// ---------------------------------------------
// 🚏 5. API Routes
// ---------------------------------------------
app.get('/', (req, res) => {
  console.log("Home route accessed"); // 🧠 Debug log
  res.send('✅ Sustainat Backend is running');
});

// 👤 Auth routes (register, login)
app.use('/api', require('./routes/authRoutes'));

// 💼 Jobs (view/post)
app.use('/api', require('./routes/jobRoutes'));

// 📩 Applications
app.use('/api', require('./routes/applicationRoutes'));

// 🛍️ Products (admin can manage)
app.use('/api/products', (req, res, next) => {
  console.log(`Product route accessed: ${req.method} ${req.originalUrl}`); // 🧠 Debug log
  next();
}, require('./routes/productRoutes'));

// 📦 Orders (users placing orders)
app.use('/api/orders', require('./routes/orderRoutes'));

// ---------------------------------------------
// 🚀 6. Start the Server
// ---------------------------------------------
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
