const express = require('express');
const router = express.Router();

// ✅ Import controller functions
const { createJob, getJobs, deleteJob } = require('../controllers/jobController');

// ✅ POST /api/jobs → Create new job
router.post('/jobs', createJob);

// ✅ GET /api/jobs → Get all jobs
router.get('/jobs', getJobs);

// ✅ DELETE /api/jobs/:id → Delete job by ID
router.delete('/jobs/:id', deleteJob);

module.exports = router;
