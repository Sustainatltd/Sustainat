const Application = require('../models/Application');
const Job = require('../models/Job'); // 🧱 Required to find jobs posted by HR

// ✅ POST /api/apply → Save a new job application
const submitApplication = async (req, res) => {
  try {
    const { jobId, name, email, message } = req.body;

    // 🛡️ Validate required fields
    if (!jobId || !name || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 💾 Create and save new application
    const newApp = new Application({ jobId, name, email, message });
    await newApp.save();

    res.status(201).json({ message: 'Application submitted successfully', application: newApp });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ✅ GET /api/applications/:email → View all applications received by this HR
const getApplicationsByHR = async (req, res) => {
  try {
    const { email } = req.params;

    // 🔍 Step 1: Find all jobs posted by the HR
    const hrJobs = await Job.find({ createdBy: email });
    const jobIds = hrJobs.map((job) => job._id);

    // 🔍 Step 2: Find all applications linked to those jobs
    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate('jobId') // 🧠 Include job title/company info
      .sort({ createdAt: -1 }); // 📅 Newest first

    res.status(200).json({ applications });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching applications', error: err.message });
  }
};

// ✅ DELETE /api/applications/:id → Delete an application by its ID
const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Application.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting application', error: err.message });
  }
};

// ✅ Export all functions
module.exports = {
  submitApplication,
  getApplicationsByHR,
  deleteApplication
};
