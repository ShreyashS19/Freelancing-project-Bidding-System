const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Freelancer = require('../models/Freelancer');

// Helper to convert MongoDB document to frontend-compatible format
const toFrontendProject = (doc) => ({
  id: doc._id.toString(),
  name: doc.name,
  status: doc.status,
  dueDate: doc.dueDate,
  budget: doc.budget,
  clientId: doc.clientId,
  freelancerId: doc.freelancerId,
  description: doc.description,
  createdAt: doc.createdAt,
});

// Create a new project
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json(toFrontendProject(savedProject));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all projects (for New Job Offers)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ freelancerId: null });
    res.json(projects.map(toFrontendProject));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get projects by clientId (for Client Dashboard)
router.get('/client/:clientId', async (req, res) => {
  try {
    const projects = await Project.find({ clientId: req.params.clientId });
    res.json(projects.map(toFrontendProject));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get active projects by freelancerId (for My Jobs, exclude completed)
router.get('/freelancer/:freelancerId', async (req, res) => {
  try {
    const projects = await Project.find({
      freelancerId: req.params.freelancerId,
      status: { $ne: 'completed' },
    });
    res.json(projects.map(toFrontendProject));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get earnings for the current month
router.get('/freelancer/:freelancerId/earnings', async (req, res) => {
  try {
    const { freelancerId } = req.params;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

    const freelancer = await Freelancer.findOne({ freelancerId });
    if (!freelancer) {
      return res.json({ totalEarnings: 0 });
    }

    const totalEarnings = freelancer.earnings
      .filter((earning) => earning.earnedAt >= startOfMonth && earning.earnedAt <= endOfMonth)
      .reduce((sum, earning) => sum + earning.amount, 0);

    res.json({ totalEarnings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Accept a job offer (assign freelancerId and set status to in-progress)
router.put('/:id/accept', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    project.freelancerId = req.body.freelancerId;
    project.status = 'in-progress';
    const updatedProject = await project.save();
    res.json(toFrontendProject(updatedProject));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Submit work (mark project as completed and record earnings)
router.put('/:id/submit', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    if (project.status === 'completed') {
      return res.status(400).json({ message: 'Project already completed' });
    }
    project.status = 'completed';
    const updatedProject = await project.save();

    // Record earnings in Freelancer collection
    const freelancer = await Freelancer.findOne({ freelancerId: project.freelancerId });
    if (freelancer) {
      freelancer.earnings.push({
        projectId: project._id,
        amount: project.budget,
      });
      await freelancer.save();
    } else {
      await Freelancer.create({
        freelancerId: project.freelancerId,
        earnings: [{ projectId: project._id, amount: project.budget }],
      });
    }

    res.json(toFrontendProject(updatedProject));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;