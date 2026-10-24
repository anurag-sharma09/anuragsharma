import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  githubLink: {
    type: String,
    default: ''
  },
  liveLink: {
    type: String,
    default: ''
  },
  visualType: {
    type: String,
    enum: ['chat', 'ecom', 'dashboard', 'sih2025'],
    default: 'chat',
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  features: {
    type: [String],
    default: []
  },
  challenges: {
    type: String,
    default: ''
  },
  solutions: {
    type: String,
    default: ''
  },
  results: {
    type: String,
    default: ''
  },
  duration: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'Completed'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
