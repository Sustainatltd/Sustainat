const express = require('express');
const router = express.Router();

// ✅ Import controller functions
const {
  submitApplication,        // 📨 Submit a job application
  getApplicationsByHR,      // 📥 Fetch applications for jobs posted by HR
  deleteApplication          // 🗑️ Delete an application by ID
} = require('../controllers/applicationController');

// ✅ POST /api/apply → Save a job application to MongoDB
router.post('/apply', submitApplication);

// ✅ GET /api/applications/:email → Get all applications linked to HR's jobs
router.get('/applications/:email', getApplicationsByHR);

// ✅ DELETE /api/applications/:id → Remove an application
router.delete('/applications/:id', deleteApplication);

// ✅ Export the router so it can be used in server.js
module.exports = router;