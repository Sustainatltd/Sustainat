// ---------------------------------------------
// ✅ 1. Imports and Configs
// ---------------------------------------------
const express = require('express');           // 💬 Express = lets us build APIs easily
const cors = require('cors');                 // 🌐 Allows frontend & backend to talk (Cross-Origin)
const client = require('prom-client');        // 📊 For Prometheus monitoring
require('dotenv').config();                   // 🔒 Loads our secret keys from the .env file

const connectDB = require('./config/db');     // 🧠 Our MongoDB connection helper function

const app = express();
app.use(express.json());                      // 📦 Parse JSON in incoming requests
app.use(cors());                              // 🌍 Allow different origins to connect

// ---------------------------------------------
// 📈 2. Prometheus Metrics Setup
// ---------------------------------------------
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // 📊 Collect CPU, memory, event loop metrics

// 📍 Endpoint for Prometheus to collect stats
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

// ---------------------------------------------
// 🍃 3. Connect to MongoDB Atlas
// ---------------------------------------------
connectDB(); // 🔌 We connect to MongoDB using our external helper

// ---------------------------------------------
// 🚏 4. Routes
// ---------------------------------------------

// 🌱 Health check route to test if server is running
app.get('/', (req, res) => {
  res.send('Sustainat Backend is running');
});

// 🔐 Auth Routes (register/login)
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// 💼 Job Routes (post/view jobs)
const jobRoutes = require('./routes/jobRoutes');
app.use('/api', jobRoutes);

// ✉️ Application Routes (apply for jobs)
const applicationRoutes = require('./routes/applicationRoutes');
app.use('/api', applicationRoutes);

// ---------------------------------------------
// 🚀 5. Start the Server
// ---------------------------------------------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
