import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import hackathonRoutes from './routes/hackathonRoutes.js';

// Load environmental variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve path details
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration - support cookies in cross-origin requests
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? false // Same-origin in production since we serve both from one domain
    : 'http://localhost:5173', // Vite dev server
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Disable buffering so queries fail instantly if DB is offline, avoiding hanging API requests
mongoose.set('bufferCommands', false);

// Database Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';
mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 1500 // Fail database connection attempts after 1.5 seconds
})
  .then(() => console.log('Successfully connected to MongoDB Database.'))
  .catch((err) => {
    console.error('\n⚠️ WARNING: Failed to connect to MongoDB database.');
    console.error('Make sure MongoDB is installed and running, or configure a valid MONGO_URI in backend/.env.');
    console.error('Original Connection Error:', err.message);
    console.error('API routes will not function, but the dev server remains running.\n');
  });

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/hackathons', hackathonRoutes);

// Root Route check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Production Setup: Serve static React assets
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // Direct all other paths to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API Server is running in development mode...');
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An internal server error occurred'
  });
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
