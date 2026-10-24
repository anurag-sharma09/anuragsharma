import express from 'express';
import Message from '../models/Message.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, and message' });
  }

  try {
    const newMessage = await Message.create({ name, email, subject, message });
    res.status(201).json({ success: true, data: newMessage, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error submitting message:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Protected
router.get('/', protect, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @desc    Toggle message read status
// @route   PUT /api/contact/:id/read
// @access  Protected
router.put('/:id/read', protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    message.isRead = !message.isRead;
    await message.save();
    res.json({ success: true, data: message });
  } catch (error) {
    console.error('Error toggling message read status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @desc    Delete a message
// @route   DELETE /api/contact/:id
// @access  Protected
router.delete('/:id', protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    await message.deleteOne();
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
