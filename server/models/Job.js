const mongoose = require('mongoose');

/*
  Job Schema for MongoDB
  - title: job title
  - company: who is hiring
  - location: job location
  - timestamps: auto-create createdAt and updatedAt
*/
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },   
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
