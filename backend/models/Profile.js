import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Anurag Sharma'
  },
  typedStrings: {
    type: [String],
    default: ['Full Stack Developer', 'UI/UX Designer', 'Data Scientist']
  },
  bio: {
    type: String,
    required: true,
    default: 'Crafting immersive digital experiences at the intersection of code, design, and data.'
  },
  aboutText1: {
    type: String,
    required: true
  },
  aboutText2: {
    type: String,
    required: true
  },
  aboutTags: {
    type: [String],
    default: []
  },
  email: {
    type: String,
    required: true,
    default: 'anuragsharmabtcs23@mitindore.co.in'
  },
  location: {
    type: String,
    required: true,
    default: 'India 🇮🇳'
  },
  availability: {
    type: String,
    required: true,
    default: 'Open to opportunities'
  },
  githubUrl: {
    type: String,
    default: ''
  },
  linkedinUrl: {
    type: String,
    default: ''
  },
  twitterUrl: {
    type: String,
    default: ''
  },
  resumeUrl: {
    type: String,
    default: ''
  }
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
