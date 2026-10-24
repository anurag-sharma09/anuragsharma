import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import models
import User from '../models/User.js';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Message from '../models/Message.js';
import Hackathon from '../models/Hackathon.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.join(__dirname, '../.env') });

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';

const seedData = async () => {
  try {
    console.log('Connecting to MongoDB at:', mongoURI);
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2000
    });
    console.log('Connected successfully. Cleaning database...');

    // Clear existing data
    await User.deleteMany();
    await Profile.deleteMany();
    await Project.deleteMany();
    await Skill.deleteMany();
    await Experience.deleteMany();
    await Message.deleteMany();
    await Hackathon.deleteMany();

    console.log('Database cleaned. Seeding data...');

    // 1. Create Default Admin User
    const adminUser = new User({
      email: 'admin@portfolio.com',
      password: 'Admin@123456' // Will be hashed via pre-save hook
    });
    await adminUser.save();
    console.log('Admin user seeded. (Email: admin@portfolio.com, Password: Admin@123456)');

    // 2. Create Profile Info
    const profile = new Profile({
      name: 'Anurag Sharma',
      typedStrings: [
        'Full Stack Developer',
        'AI/ML Engineer',
        'Systems Architect',
        'Problem Solver'
      ],
      bio: 'Architecting scalable web applications, distributed systems, and premium digital experiences at the intersection of robust code and modern engineering.',
      aboutText1: "I am Anurag Sharma — a Full Stack Software Engineer with a deep passion for building high-performance web systems and creative interfaces. I specialize in designing responsive React clients, engineering robust Express and Node.js backends, and modeling scalable database architectures.",
      aboutText2: "My engineering philosophy is rooted in clean code, modular design patterns, and obsessive attention to detail. Whether it is containerizing MERN microservices, tuning SQL and NoSQL databases, or training neural network pipelines, I focus on performance, scalability, and seamless user experiences.",
      aboutTags: [
        '🚀 Systems Architect',
        '📊 Data Driven',
        '🔒 Security Focused',
        '🐳 DevOps Practitioner',
        '💡 Problem Solver'
      ],
      email: 'anuragsharmabtcs23@mitindore.co.in',
      location: 'Indore, India 🇮🇳',
      availability: 'Open to core opportunities',
      githubUrl: 'https://github.com/anurag-sharma09',
      linkedinUrl: 'https://www.linkedin.com/in/anurag-sharma-01155633a/',
      twitterUrl: 'https://x.com/AnuragS74286279',
      resumeUrl: '#'
    });
    await profile.save();
    console.log('Profile details seeded.');

    // 3. Create Projects
    const projects = [
      {
        title: 'One-Stop Personalized Career & Education Advisor',
        description: 'Developed a One-Stop Personalized Career & Education Advisor platform to help students make informed academic and career decisions. The platform provides personalized career guidance, education recommendations, scholarship information, learning roadmaps, and skill development suggestions based on student profiles, interests, aptitude, and academic performance.',
        tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'REST API', 'JWT Authentication'],
        githubLink: '',
        liveLink: '',
        visualType: 'sih2025',
        imageUrl: '',
        features: [
          'Personalized career recommendation based on student profiles and assessment.',
          'Education roadmap generator mapping academic milestones and paths.',
          'Centralized scholarship recommendation engine matching eligible student profiles.',
          'Skill gap analysis aligning aptitude and academic records with industry standards.',
          'Interactive student dashboard monitoring progress and recommended tasks.',
          'Responsive design optimizing layouts across mobile, tablet, and desktop viewports.'
        ],
        challenges: 'Build a scalable platform capable of providing personalized education and career guidance for students using intelligent recommendations while maintaining a clean and responsive user experience.',
        solutions: 'Designed a modular MERN architecture with reusable React components, secure backend APIs, responsive layouts, and a recommendation-based workflow for career and education planning.',
        results: 'Smart India Hackathon Submission providing a production-viable personalized advisory platform.',
        duration: '3 Months',
        status: 'Smart India Hackathon Submission',
        isFeatured: true,
        order: 0
      },
      {
        title: 'Malwa Institute of Technology – Official Website',
        description: 'Designed and developed the official website for Malwa Institute of Technology, Indore. Built a responsive, SEO-optimized platform featuring admissions, departments, placements, academics, and campus information.',
        tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JavaScript', 'REST API'],
        githubLink: '',
        liveLink: 'https://mitindore.co.in/',
        visualType: 'dashboard',
        imageUrl: '/images/mit_screenshot.png',
        features: [
          'Responsive navigation and layout optimized across mobile and desktop devices.',
          'Optimized web routing with fast page response times (<200ms).',
          'Robust SEO integration, increasing visibility on search engine result pages.',
          'Centralized database schema for administrative portals (placements, announcements, departments).'
        ],
        challenges: 'Compiling legacy institute records and rendering dynamic media assets without hurting page load performance.',
        solutions: 'Implemented custom lazy-loading image components, compressed assets to Modern WebP formats, and built dynamic pagination for directory maps.',
        results: 'Achieved 95+ performance scores, reducing total initial loading times by 50% while serving thousands of monthly visitors.',
        duration: '3 Months',
        status: 'Live Production',
        isFeatured: true,
        order: 1
      },
      {
        title: 'Auto Spectra',
        description: 'The ultimate interactive 3D platform for mechanical engineers. Interact with high-fidelity 3D models and visualize complex mechanical systems in a true 360° environment.',
        tags: ['React', 'Three.js', 'Vite', 'Tailwind CSS', 'WebGL', '3D Graphics'],
        githubLink: '',
        liveLink: 'https://auto-spectra-alpha.vercel.app/',
        visualType: 'dashboard',
        imageUrl: '/images/autospectra_screenshot.png',
        features: [
          'Interactive 360° 3D model visualization and real-time mechanical system inspection.',
          'High-fidelity mesh rendering with custom lighting, orbit controls, and 4K mesh fidelity.',
          'Modular engineering sections including Showcase, SpectraLab, Inventory, and Academy.',
          'SpectraVoice integration for voice-assisted navigation and platform operations.',
          'Ultra-responsive modern UI designed for mechanical analysis and workflow demonstration.'
        ],
        challenges: 'Rendering complex multi-part 3D mechanical assemblies and gear systems smoothly across devices without sacrificing frame rates.',
        solutions: 'Optimized WebGL geometries, implemented dynamic level-of-detail (LOD) mesh rendering, and leveraged hardware acceleration.',
        results: 'Maintained smooth 60 FPS performance during real-time 360° manipulation of complex 3D engineering meshes.',
        duration: '3 Months',
        status: 'Live Production',
        isFeatured: true,
        order: 2
      },
      {
        title: 'SpeedType — Typing Race',
        description: 'An interactive typing speed and racing platform featuring car and rocket race modes. Type fast to accelerate your vehicle, trigger nitro boosts with clean streaks, and track real-time WPM performance analytics.',
        tags: ['React', 'Vite', 'Tailwind CSS', 'Recharts', 'Web Audio API', 'Game Mechanics'],
        githubLink: '',
        liveLink: 'https://typing-race-09.vercel.app/',
        visualType: 'dashboard',
        imageUrl: '/images/speedtype_screenshot.png',
        features: [
          'Multi-vehicle racing simulation featuring Car Track and Rocket Rush modes.',
          'Real-time keystroke tracking computing instant WPM, accuracy %, and combo multipliers.',
          'High-octane nitro boost mechanics rewarded for error-free keystroke streaks.',
          'Interactive performance dashboards with detailed velocity progression graphs via Recharts.',
          'Multiple difficulty levels, practice challenges, and global leaderboard integration.'
        ],
        challenges: 'Synchronizing high-frequency keystroke event listeners with smooth 60 FPS vehicle racing animations without input lag or jitter.',
        solutions: 'Decoupled keystroke validation from the main animation loop using requestAnimationFrame and optimized React state updates.',
        results: 'Delivered an engaging typing game with instantaneous sub-10ms input response and smooth particle-rich race animations.',
        duration: '2 Months',
        status: 'Live Production',
        isFeatured: true,
        order: 3
      }
    ];
    await Project.insertMany(projects);
    console.log('Projects seeded.');

    // 4. Create Skills
    const skills = [
      // Frontend
      { 
        name: 'React.js', 
        category: 'frontend', 
        percentage: 90, 
        icon: '⚛️', 
        level: 'Expert',
        experience: '3+ Years',
        description: 'Building performant single-page applications (SPAs) and Server-Side Rendered (SSR) sites using React.js and Next.js.',
        subSkills: ['React Hooks', 'Context API', 'Zustand State Manager', 'Next.js Routing', 'Performance Optimization'],
        order: 0 
      },
      { 
        name: 'JavaScript', 
        category: 'frontend', 
        percentage: 92, 
        icon: '🟨', 
        level: 'Expert',
        experience: '4 Years',
        description: 'Writing clean, asynchronous, modular scripting code. Solid understanding of browser execution engines and DOM paradigms.',
        subSkills: ['ES6+ Syntaxes', 'Promises & Async/Await', 'DOM Manipulation', 'Event Loop & Closures', 'Design Patterns'],
        order: 1 
      },
      { 
        name: 'TypeScript', 
        category: 'frontend', 
        percentage: 80, 
        icon: '🔷', 
        level: 'Advanced',
        experience: '2 Years',
        description: 'Enforcing codebase predictability and reducing runtime crash exceptions using strict static typing configurations.',
        subSkills: ['Generics & Utility Types', 'Interfaces & Custom Types', 'TypeScript Compiler Configs', 'Strict Type Guards'],
        order: 2 
      },
      { 
        name: 'CSS / Tailwind', 
        category: 'frontend', 
        percentage: 88, 
        icon: '🎨', 
        level: 'Expert',
        experience: '3+ Years',
        description: 'Developing highly customized responsive layouts, complex keyframe animations, and consistent utility styling matrices.',
        subSkills: ['Flexbox & CSS Grid', 'Responsive Media Queries', 'Custom Variables & Themes', 'CSS-in-JS & Animations'],
        order: 3 
      },
      
      // Backend
      { 
        name: 'Node.js', 
        category: 'backend', 
        percentage: 85, 
        icon: '🟢', 
        level: 'Advanced',
        experience: '3 Years',
        description: 'Developing secure REST APIs, real-time channels, and event-driven backend microservices with Node.js and Express.',
        subSkills: ['Express Middleware', 'RESTful API Architectures', 'JWT Token Security', 'WebSocket Integration', 'EventEmitters'],
        order: 0 
      },
      { 
        name: 'Python', 
        category: 'backend', 
        percentage: 88, 
        icon: '🐍', 
        level: 'Advanced',
        experience: '3 Years',
        description: 'Developing automation tasks, async task queues, machine learning scripts, and backend APIs using FastAPI and Flask.',
        subSkills: ['FastAPI/Flask Frameworks', 'Async Asyncio Scripts', 'Data Extraction & Crawlers', 'Backend Task Schedulers'],
        order: 1 
      },
      { 
        name: 'MongoDB', 
        category: 'backend', 
        percentage: 82, 
        icon: '🍃', 
        level: 'Advanced',
        experience: '2+ Years',
        description: 'Designing NoSQL schemas, structuring documents, and optimizing indexes to improve data pipeline performance.',
        subSkills: ['Mongoose Schemas', 'Aggregation Frameworks', 'Index Optimizations', 'Database Transactions'],
        order: 2 
      },
      { 
        name: 'PostgreSQL', 
        category: 'backend', 
        percentage: 75, 
        icon: '🐘', 
        level: 'Intermediate',
        experience: '2 Years',
        description: 'Structuring relational schemas, writing transactional queries, and creating performance-focused database indices.',
        subSkills: ['SQL Query Writing', 'Table Joins & Integrity Constraints', 'Index Design & Optimization', 'Database Migrations'],
        order: 3 
      },

      // Design & Data
      { 
        name: 'Figma', 
        category: 'design_data', 
        percentage: 86, 
        icon: '🖼️', 
        level: 'Advanced',
        experience: '3 Years',
        description: 'Designing user experience paths, layout wireframes, high-fidelity responsive mockups, and centralized component libraries.',
        subSkills: ['User Flow Design', 'Responsive UI Mockups', 'Component Design Systems', 'Interactive Prototypes'],
        order: 0 
      },
      { 
        name: 'Machine Learning', 
        category: 'design_data', 
        percentage: 78, 
        icon: '🤖', 
        level: 'Intermediate',
        experience: '2 Years',
        description: 'Modeling, training, and deploying neural networks and classical machine learning algorithms.',
        subSkills: ['TensorFlow Models', 'Scikit-Learn Algorithms', 'Data Preprocessing Pipelines', 'Model Validation Checkpoints'],
        order: 1 
      },
      { 
        name: 'Data Analysis', 
        category: 'design_data', 
        percentage: 83, 
        icon: '📊', 
        level: 'Advanced',
        experience: '2 Years',
        description: 'Processing datasets, cleansing data structures, and outputting telemetry summaries to drive decisions.',
        subSkills: ['Pandas & NumPy Arrays', 'Matplotlib & Seaborn Visuals', 'Statistical Evaluation', 'SQL Data Extraction'],
        order: 2 
      },
      { 
        name: 'Docker / DevOps', 
        category: 'design_data', 
        percentage: 70, 
        icon: '🐋', 
        level: 'Intermediate',
        experience: '2 Years',
        description: 'Containerizing local environments, creating multi-service clusters, and scripting CI/CD automation pipelines.',
        subSkills: ['Dockerfile Setup', 'Docker-Compose Networks', 'GitHub Actions CI/CD', 'AWS Deployment & Hosting'],
        order: 3 
      }
    ];
    await Skill.insertMany(skills);
    console.log('Skills seeded.');

    // 5. Create Experience/Timeline items
    const experiences = [
      {
        role: 'Full Stack Developer',
        company: 'Freelance / Self-Employed',
        period: '2025 — Present',
        type: 'work',
        desc: 'Building responsive MERN/Next.js web applications, official college websites, and real-time analytical systems. Designing secure systems, integrating cloud assets, and engineering database layers.',
        tags: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB'],
        order: 0
      },
      {
        role: 'B.Tech — Computer Science',
        company: 'Malwa Institute of Technology, Indore',
        period: '2023 — 2027',
        type: 'edu',
        desc: 'Studied algorithms, data structures, database management, and software engineering. Built multiple academic projects in web development, AI, and distributed systems.',
        tags: ['DSA', 'DBMS', 'OS', 'Software Engineering'],
        order: 1
      }
    ];
    await Experience.insertMany(experiences);
    console.log('Timeline experiences seeded.');

    // 6. Create Hackathons
    const hackathons = [
      {
        title: 'One-Stop Personalized Career & Education Advisor Software',
        organizer: 'Government of India',
        period: '2025',
        achievement: '🏆 SIH 2025',
        problemStatement: 'Develop a One-Stop Personalized Career & Education Advisor Software that helps students make informed educational and career decisions by providing personalized recommendations based on their interests, skills, aptitude, academic performance, and career aspirations.',
        solution: 'Designed and developed a scalable MERN-based platform that delivers personalized career guidance, education roadmaps, scholarship information, skill recommendations, and learning resources through an intuitive and responsive interface.',
        technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'REST API', 'JWT Authentication'],
        projectLink: '',
        order: 0
      }
    ];
    await Hackathon.insertMany(hackathons);
    console.log('Hackathons seeded.');

    // 7. Seed a sample message in contacts
    const sampleMessage = new Message({
      name: 'Jane Doe',
      email: 'jane@example.com',
      subject: 'Collaboration Opportunity',
      message: 'Hello Anurag, I really liked your portfolio and would love to discuss a project with you.'
    });
    await sampleMessage.save();
    console.log('Sample contact message seeded.');

    console.log('Database seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
