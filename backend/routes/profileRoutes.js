import express from 'express';
import Profile from '../models/Profile.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get profile data
// @route   GET /api/profile
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile data not found. Please run seed script.' });
    }
    res.json({ success: true, data: profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @desc    Update profile data
// @route   PUT /api/profile
// @access  Protected
router.put('/', protect, async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
      await profile.save();
    } else {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, {
        new: true,
        runValidators: true
      });
    }
    res.json({ success: true, data: profile });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(400).json({ success: false, message: error.message || 'Validation error' });
  }
});

export default router;
