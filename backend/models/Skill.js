import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'design_data'],
    required: true
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  icon: {
    type: String,
    required: true,
    default: '⚡'
  },
  level: {
    type: String,
    default: 'Advanced'
  },
  experience: {
    type: String,
    default: '2+ Years'
  },
  description: {
    type: String,
    default: ''
  },
  subSkills: {
    type: [String],
    default: []
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
