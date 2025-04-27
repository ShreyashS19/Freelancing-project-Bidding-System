const mongoose = require('mongoose');

const earningSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  amount: { type: Number, required: true },
  earnedAt: { type: String, default: () => new Date().toISOString() },
});

const freelancerSchema = new mongoose.Schema({
  freelancerId: { type: String, required: true, unique: true },
  earnings: [earningSchema],
});

module.exports = mongoose.model('Freelancer', freelancerSchema);