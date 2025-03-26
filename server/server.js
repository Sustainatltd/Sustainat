// ------------------------------
// ✅ 1. Imports and Configs
// ------------------------------
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const client = require('prom-client'); // 📊 Prometheus client
require('dotenv').config(); // Loads environment variables from .env

const app = express();
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables Cross-Origin requests

// ------------------------------
// 📈 2. Prometheus Metrics Setup
// ------------------------------
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // 🛠️ Collect Node.js default system metrics (CPU, memory, etc.)

// ✅ Custom /metrics endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType); // Set response header
    res.end(await client.register.metrics()); // Return all collected metrics
  } catch (err) {
    res.status(500).end(err);
  }
});

// ------------------------------
// ✅ 3. MongoDB Connection
// ------------------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ------------------------------
// ✅ 4. Routes
// ------------------------------

// ✅ Test route (basic health check)
app.get('/', (req, res) => {
  res.send('Sustainat Backend is running');
});

// ✅ Auth Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// ✅ Job Routes
const jobRoutes = require('./routes/jobRoutes');
app.use('/api', jobRoutes);

// ✉️ Application Route
const applicationRoutes = require('./routes/applicationRoutes');
app.use('/api', applicationRoutes);

// ------------------------------
// ✅ 5. Start Server
// ------------------------------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
