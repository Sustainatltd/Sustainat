// ---------------------------------------------
// ✅ Imports & Initial Setup
// ---------------------------------------------
const express = require('express');
const cors = require('cors');
const client = require('prom-client');
require('dotenv').config(); // 🔒 Load environment variables from .env

const connectDB = require('./config/db'); // 🍃 MongoDB connection
const app = express();                    // 🚀 Create Express app

// ---------------------------------------------
// 🔐 Secret Check
// ---------------------------------------------
if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET is missing in .env');
  process.exit(1);
}

// ---------------------------------------------
// ⚙️ Middleware Setup
// ---------------------------------------------
app.use(express.json()); // 🧠 Allow JSON body parsing

// 🌍 CORS configuration — allow all methods + headers
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ⚙️ Handle preflight CORS (OPTIONS) requests globally
app.options('*', cors()); // ✅ Needed for Ingress to forward PATCH/DELETE safely

// ---------------------------------------------
// 📈 Prometheus Metrics
// ---------------------------------------------
client.collectDefaultMetrics(); // 📊 Collect default system metrics

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    console.error('❌ Metrics error:', err);
    res.status(500).end(err);
  }
});

// ---------------------------------------------
// 🍃 Connect MongoDB
// ---------------------------------------------
connectDB(); // 🔌 Establish DB connection

// ---------------------------------------------
// 🛣️ API Routes
// ---------------------------------------------
app.get('/', (req, res) => {
  console.log('🏠 Home route accessed');
  res.send('✅ Sustainat Backend is running');
});

// 👤 User Management
app.use('/api/users', require('./routes/userRoutes'));

// 🔐 Auth (login/register)
app.use('/api', require('./routes/authRoutes'));

// ☁️ Cloudinary Uploads
app.use('/api/upload', require('./routes/uploadRoutes'));

// 💼 Jobs
app.use('/api', require('./routes/jobRoutes'));

// 📩 Job Applications
app.use('/api', require('./routes/applicationRoutes'));

// 🛍️ Products
app.use('/api/products', (req, res, next) => {
  console.log(`🛍️ Product route hit: ${req.method} ${req.originalUrl}`);
  next();
}, require('./routes/productRoutes'));

// 📦 Orders
app.use('/api/orders', require('./routes/orderRoutes'));

// ---------------------------------------------
// 🚀 Start Server
// ---------------------------------------------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Sustainat backend running on port ${PORT}`);
});
