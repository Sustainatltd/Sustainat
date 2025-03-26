const Job = require('../models/Job');

// ✅ POST /api/jobs → Add new job to MongoDB
const createJob = async (req, res) => {
  try {
    const { title, company, location, type, createdBy } = req.body;

    // 🧠 Validation
    if (!title || !company || !location || !createdBy) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 💾 Save new job
    const job = new Job({ title, company, location, type, createdBy });
    await job.save();

    res.status(201).json({ message: 'Job created successfully', job });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ✅ GET /api/jobs → Fetch all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json({ jobs });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: err.message });
  }
};

// ✅ DELETE /api/jobs/:id → Remove job
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await Job.findByIdAndDelete(id);
    res.status(200).json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting job', error: err.message });
  }
};

module.exports = { createJob, getJobs, deleteJob };
