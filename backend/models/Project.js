const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed', 'cancelled'],
    default: 'not-started',
  },
  dueDate: { type: String, required: true },
  budget: { type: Number, required: true },
  clientId: { type: String, required: true },
  freelancerId: { type: String },
  description: { type: String },
  createdAt: { type: String, default: () => new Date().toISOString() },
});

module.exports = mongoose.model('Project', projectSchema);