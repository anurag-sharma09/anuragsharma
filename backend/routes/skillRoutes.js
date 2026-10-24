import express from 'express';
import Skill from '../models/Skill.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1, name: 1 });
    res.json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @desc    Create a skill
// @route   POST /api/skills
// @access  Protected
router.post('/', protect, async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    console.error('Error creating skill:', error);
    res.status(400).json({ success: false, message: error.message || 'Validation error' });
  }
});

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Protected
router.put('/:id', protect, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.json({ success: true, data: skill });
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(400).json({ success: false, message: error.message || 'Validation error' });
  }
});

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Protected
router.delete('/:id', protect, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    await skill.deleteOne();
    res.json({ success: true, message: 'Skill removed successfully' });
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
