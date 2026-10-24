import mongoose from 'mongoose';

const hackathonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  organizer: {
    type: String,
    required: true,
    trim: true
  },
  period: {
    type: String,
    required: true,
    trim: true
  },
  achievement: {
    type: String,
    required: true,
    trim: true
  },
  problemStatement: {
    type: String,
    default: ''
  },
  solution: {
    type: String,
    default: ''
  },
  technologies: {
    type: [String],
    default: []
  },
  projectLink: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Hackathon = mongoose.model('Hackathon', hackathonSchema);
export default Hackathon;
