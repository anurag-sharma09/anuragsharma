import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  period: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['work', 'edu', 'cert'],
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;
