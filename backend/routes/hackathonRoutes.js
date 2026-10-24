import express from 'express';
import Hackathon from '../models/Hackathon.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all hackathons
// @route   GET /api/hackathons
// @access  Public
router.get('/', async (req, res) => {
  try {
    const hackathons = await Hackathon.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: hackathons.length, data: hackathons });
  } catch (error) {
    console.error('Error fetching hackathons:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @desc    Create a hackathon
// @route   POST /api/hackathons
// @access  Protected
router.post('/', protect, async (req, res) => {
  try {
    const hackathon = await Hackathon.create(req.body);
    res.status(201).json({ success: true, data: hackathon });
  } catch (error) {
    console.error('Error creating hackathon:', error);
    res.status(400).json({ success: false, message: error.message || 'Validation error' });
  }
});

// @desc    Update a hackathon
// @route   PUT /api/hackathons/:id
// @access  Protected
router.put('/:id', protect, async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!hackathon) {
      return res.status(404).json({ success: false, message: 'Hackathon not found' });
    }
    res.json({ success: true, data: hackathon });
  } catch (error) {
    console.error('Error updating hackathon:', error);
    res.status(400).json({ success: false, message: error.message || 'Validation error' });
  }
});

// @desc    Delete a hackathon
// @route   DELETE /api/hackathons/:id
// @access  Protected
router.delete('/:id', protect, async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) {
      return res.status(404).json({ success: false, message: 'Hackathon not found' });
    }
    await hackathon.deleteOne();
    res.json({ success: true, message: 'Hackathon removed successfully' });
  } catch (error) {
    console.error('Error deleting hackathon:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
