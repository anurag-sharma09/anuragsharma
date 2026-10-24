import express from 'express';
import Experience from '../models/Experience.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all experience timeline items
// @route   GET /api/experience
// @access  Public
router.get('/', async (req, res) => {
  try {
    const items = await Experience.find().sort({ order: 1, period: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    console.error('Error fetching experience list:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @desc    Create an experience item
// @route   POST /api/experience
// @access  Protected
router.post('/', protect, async (req, res) => {
  try {
    const item = await Experience.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    console.error('Error creating experience item:', error);
    res.status(400).json({ success: false, message: error.message || 'Validation error' });
  }
});

// @desc    Update an experience item
// @route   PUT /api/experience/:id
// @access  Protected
router.put('/:id', protect, async (req, res) => {
  try {
    const item = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Experience item not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating experience item:', error);
    res.status(400).json({ success: false, message: error.message || 'Validation error' });
  }
});

// @desc    Delete an experience item
// @route   DELETE /api/experience/:id
// @access  Protected
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Experience.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Experience item not found' });
    }
    await item.deleteOne();
    res.json({ success: true, message: 'Experience item removed successfully' });
  } catch (error) {
    console.error('Error deleting experience item:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
