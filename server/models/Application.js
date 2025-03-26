const mongoose = require('mongoose');

// 📄 Define schema for job applications
const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String },
}, { timestamps: true });

// 📦 Export the model
module.exports = mongoose.model('Application', applicationSchema);
