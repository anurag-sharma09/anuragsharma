import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  ExternalLink, Mail, MapPin, Briefcase, Calendar, 
  BookOpen, Trophy, ShieldAlert, Cpu, CheckCircle2, Clock, Smartphone, 
  FileText, ChevronRight, Sparkles
} from 'lucide-react';

// Define static fallback data in case backend is not running or seeds fail
const FALLBACK_PROFILE = {
  name: 'Anurag Sharma',
  typedStrings: ['Full Stack Developer', 'UI/UX Designer', 'Data Scientist', 'Problem Solver', 'Creative Thinker'],
  bio: 'Crafting immersive digital experiences at the intersection of code, design, and data.',
  aboutText1: "I'm Anurag Sharma — a passionate technologist who thrives at the crossroads of creativity and engineering. I build full-stack web applications, craft pixel-perfect user interfaces, and derive meaningful insights from data.",
  aboutText2: "My approach is simple: understand deeply, design thoughtfully, build precisely. Whether it's architecting scalable backends, designing intuitive UIs, or training machine learning models — I bring the same obsessive attention to detail.",
  aboutTags: ['🚀 Problem Solver', '🎨 Creative Thinker', '📊 Data Driven', '🤝 Team Player', '💡 Lifelong Learner'],
  email: 'anuragsharmabtcs23@mitindore.co.in',
  location: 'India 🇮🇳',
  availability: 'Open to opportunities',
  githubUrl: 'https://github.com/anurag-sharma09',
  linkedinUrl: 'https://www.linkedin.com/in/anurag-sharma-01155633a/',
  twitterUrl: 'https://x.com/AnuragS74286279',
  resumeUrl: '#'
};

const FALLBACK_PROJECTS = [
  {
    _id: 'sih_advisor_2025',
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
    isFeatured: true
  },
  {
    _id: '1',
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
    isFeatured: true
  },
  {
    _id: '2',
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
    isFeatured: true
  },
  {
    _id: '3',
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
    isFeatured: true
  }
];

const FALLBACK_SKILLS = [
  { _id: 's1', name: 'React.js', category: 'frontend', percentage: 90, icon: '⚛️', subSkills: ['React Hooks', 'Context API', 'Zustand State Manager', 'Next.js Routing', 'Performance Optimization'], level: 'Expert', experience: '3+ Years', description: 'Building performant single-page applications (SPAs) and Server-Side Rendered (SSR) sites using React.js and Next.js.' },
  { _id: 's2', name: 'JavaScript', category: 'frontend', percentage: 92, icon: '🟨', subSkills: ['ES6+ Syntaxes', 'Promises & Async/Await', 'DOM Manipulation', 'Event Loop & Closures', 'Design Patterns'], level: 'Expert', experience: '4 Years', description: 'Writing clean, asynchronous, modular scripting code. Solid understanding of browser execution engines and DOM paradigms.' },
  { _id: 's3', name: 'TypeScript', category: 'frontend', percentage: 80, icon: '🔷', subSkills: ['Generics & Utility Types', 'Interfaces & Custom Types', 'TypeScript Compiler Configs', 'Strict Type Guards'], level: 'Advanced', experience: '2 Years', description: 'Enforcing codebase predictability and reducing runtime crash exceptions using strict static typing configurations.' },
  { _id: 's4', name: 'CSS / Tailwind', category: 'frontend', percentage: 88, icon: '🎨', subSkills: ['Flexbox & CSS Grid', 'Responsive Media Queries', 'Custom Variables & Themes', 'CSS-in-JS & Animations'], level: 'Expert', experience: '3+ Years', description: 'Developing highly customized responsive layouts, complex keyframe animations, and consistent utility styling matrices.' },
  { _id: 's5', name: 'Node.js', category: 'backend', percentage: 85, icon: '🟢', subSkills: ['Express Middleware', 'RESTful API Architectures', 'JWT Token Security', 'WebSocket Integration', 'EventEmitters'], level: 'Advanced', experience: '3 Years', description: 'Developing secure REST APIs, real-time channels, and event-driven backend microservices with Node.js and Express.' },
  { _id: 's6', name: 'Python', category: 'backend', percentage: 88, icon: '🐍', subSkills: ['FastAPI/Flask Frameworks', 'Async Asyncio Scripts', 'Data Extraction & Crawlers', 'Backend Task Schedulers'], level: 'Advanced', experience: '3 Years', description: 'Developing automation tasks, async task queues, machine learning scripts, and backend APIs using FastAPI and Flask.' },
  { _id: 's7', name: 'MongoDB', category: 'backend', percentage: 82, icon: '🍃', subSkills: ['Mongoose Schemas', 'Aggregation Frameworks', 'Index Optimizations', 'Database Transactions'], level: 'Advanced', experience: '2+ Years', description: 'Designing NoSQL schemas, structuring documents, and optimizing indexes to improve data pipeline performance.' },
  { _id: 's8', name: 'PostgreSQL', category: 'backend', percentage: 75, icon: '🐘', subSkills: ['SQL Query Writing', 'Table Joins & Integrity Constraints', 'Index Design & Optimization', 'Database Migrations'], level: 'Intermediate', experience: '2 Years', description: 'Structuring relational schemas, writing transactional queries, and creating performance-focused database indices.' },
  { _id: 's9', name: 'Figma', category: 'design_data', percentage: 86, icon: '🖼️', subSkills: ['User Flow Design', 'Responsive UI Mockups', 'Component Design Systems', 'Interactive Prototypes'], level: 'Advanced', experience: '3 Years', description: 'Designing user experience paths, layout wireframes, high-fidelity responsive mockups, and centralized component libraries.' },
  { _id: 's10', name: 'Machine Learning', category: 'design_data', percentage: 78, icon: '🤖', subSkills: ['TensorFlow Models', 'Scikit-Learn Algorithms', 'Data Preprocessing Pipelines', 'Model Validation Checkpoints'], level: 'Intermediate', experience: '2 Years', description: 'Modeling, training, and deploying neural networks and classical machine learning algorithms.' },
  { _id: 's11', name: 'Data Analysis', category: 'design_data', percentage: 83, icon: '📊', subSkills: ['Pandas & NumPy Arrays', 'Matplotlib & Seaborn Visuals', 'Statistical Evaluation', 'SQL Data Extraction'], level: 'Advanced', experience: '2 Years', description: 'Processing datasets, cleansing data structures, and outputting telemetry summaries to drive decisions.' },
  { _id: 's12', name: 'Docker / DevOps', category: 'design_data', percentage: 70, icon: '🐋', subSkills: ['Dockerfile Setup', 'Docker-Compose Networks', 'GitHub Actions CI/CD', 'AWS Deployment & Hosting'], level: 'Intermediate', experience: '2 Years', description: 'Containerizing local environments, creating multi-service clusters, and scripting CI/CD automation pipelines.' }
];

const FALLBACK_EXPERIENCE = [
  {
    _id: 'e1',
    role: 'Full Stack Developer',
    company: 'Freelance / Self-Employed',
    period: '2025 — Present',
    type: 'work',
    desc: 'Building responsive MERN/Next.js web applications, official college websites, and real-time analytical systems. Designing secure systems, integrating cloud assets, and engineering database layers.',
    tags: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB']
  },
  {
    _id: 'e2',
    role: 'B.Tech — Computer Science',
    company: 'Malwa Institute of Technology, Indore',
    period: '2023 — 2027',
    type: 'edu',
    desc: 'Studied algorithms, data structures, database management, and software engineering. Built multiple academic projects in web development, AI, and distributed systems.',
    tags: ['DSA', 'DBMS', 'OS', 'Software Engineering']
  }
];

const FALLBACK_HACKATHONS = [
  {
    _id: 'h1',
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

// Enrich skills with fallback metadata client-side
const enrichSkills = (skillsList) => {
  return skillsList.map(skill => {
    const enriched = FALLBACK_SKILLS.find(fs => fs.name.toLowerCase() === skill.name.toLowerCase()) || {};
    return {
      ...skill,
      subSkills: skill.subSkills || enriched.subSkills || ['Development', 'Optimization'],
      level: skill.level || enriched.level || 'Advanced',
      experience: skill.experience || enriched.experience || '2+ Years',
      description: skill.description || enriched.description || `Proficient in building systems and interfaces using ${skill.name}.`
    };
  });
};

export default function Portfolio() {
  const [profile, setProfile] = useState(FALLBACK_PROFILE);
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [skills, setSkills] = useState(() => enrichSkills(FALLBACK_SKILLS));
  const [experience, setExperience] = useState(FALLBACK_EXPERIENCE);
  const [hackathons, setHackathons] = useState(FALLBACK_HACKATHONS);
  const [loading, setLoading] = useState(true);

  // Force scroll to top on initial page load/refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Redesigned Skills section state
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTelemetrySkill, setActiveTelemetrySkill] = useState(null);
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  // Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error
  const [formFeedback, setFormFeedback] = useState('');

  // Refs for 3D Cards
  const tiltCardRef = useRef(null);
  const projectCardsRef = useRef([]);

  // Fetch Data from MERN API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes, skillsRes, experienceRes, hackathonsRes] = await Promise.all([
          fetch('/api/profile').then(res => res.ok ? res.json() : null),
          fetch('/api/projects').then(res => res.ok ? res.json() : null),
          fetch('/api/skills').then(res => res.ok ? res.json() : null),
          fetch('/api/experience').then(res => res.ok ? res.json() : null),
          fetch('/api/hackathons').then(res => res.ok ? res.json() : null)
        ]);

        if (profileRes?.success) setProfile(profileRes.data);
        if (projectsRes?.success) setProjects(projectsRes.data);
        if (skillsRes?.success) setSkills(enrichSkills(skillsRes.data));
        if (experienceRes?.success) setExperience(experienceRes.data);
        if (hackathonsRes?.success) setHackathons(hackathonsRes.data);
      } catch (err) {
        console.warn('API connection failed. Using developer fallback data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 1) Typewriter Effect
  useEffect(() => {
    if (loading) return;
    if (window.Typed && document.getElementById('typed-text')) {
      const typed = new window.Typed('#typed-text', {
        strings: profile.typedStrings || FALLBACK_PROFILE.typedStrings,
        typeSpeed: 70,
        backSpeed: 40,
        backDelay: 1800,
        startDelay: 600,
        loop: true,
        showCursor: false
      });
      return () => typed.destroy();
    }
  }, [loading, profile.typedStrings]);

  // Set default telemetry skill once skills load
  useEffect(() => {
    if (skills && skills.length > 0 && !activeTelemetrySkill) {
      setActiveTelemetrySkill(skills[0]);
    }
  }, [skills, activeTelemetrySkill]);

  // GSAP Category switch animation
  useEffect(() => {
    if (loading) return;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (gsap) {
      gsap.fromTo('.skill-category:not(.hidden)',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.1, ease: 'power2.out' }
      );
      if (ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    }
  }, [activeCategory, loading]);

  // 2) Custom Particle Trail Effect
  useEffect(() => {
    if (loading) return;
    const trailCanvas = document.createElement('canvas');
    trailCanvas.style.cssText = `
      position: fixed; inset: 0; pointer-events: none;
      z-index: 9995; width: 100%; height: 100%;
    `;
    document.body.appendChild(trailCanvas);
    const tCtx = trailCanvas.getContext('2d');
    
    const handleResize = () => {
      trailCanvas.width = window.innerWidth;
      trailCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const particles = [];
    let mx = 0, my = 0;

    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: mx,
          y: my,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          alpha: 0.8,
          r: Math.random() * 3 + 1,
          color: Math.random() > 0.5 ? '#6c63ff' : '#00d4ff'
        });
      }
    };
    document.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const loopTrail = () => {
      tCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.04;
        p.r *= 0.96;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        tCtx.beginPath();
        tCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        tCtx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2, '0');
        tCtx.fill();
      }
      animationFrameId = requestAnimationFrame(loopTrail);
    };
    loopTrail();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      trailCanvas.remove();
    };
  }, [loading]);

  // 3) Three.js Hero Scene: Neural Network Node Mesh
  useEffect(() => {
    if (loading) return;
    const canvas = document.getElementById('hero-canvas');
    const THREE = window.THREE;
    if (!canvas || !THREE) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 8;

    // Create Nodes
    const NODE_COUNT = 90;
    const nodes = [];
    const positions = new Float32Array(NODE_COUNT * 3);
    const velocities = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 8;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      nodes.push({ x, y, z });
      velocities.push({
        x: (Math.random() - 0.5) * 0.012,
        y: (Math.random() - 0.5) * 0.012,
        z: (Math.random() - 0.5) * 0.012
      });
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const pointsMat = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.18,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const points = new THREE.Points(pointsGeo, pointsMat);
    scene.add(points);

    // Line segments connecting nodes
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6c63ff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const maxConnections = 150;
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineSegments = new THREE.LineSegments(lineGeo, lineMaterial);
    scene.add(lineSegments);

    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    document.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    let frameId;

    const animate = () => {
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      const positionsArr = pointsGeo.attributes.position.array;
      const linePositionsArr = lineGeo.attributes.position.array;
      let lineIdx = 0;

      for (let i = 0; i < NODE_COUNT; i++) {
        nodes[i].x += velocities[i].x;
        nodes[i].y += velocities[i].y;
        nodes[i].z += velocities[i].z;

        if (Math.abs(nodes[i].x) > 7) velocities[i].x *= -1;
        if (Math.abs(nodes[i].y) > 5) velocities[i].y *= -1;
        if (Math.abs(nodes[i].z) > 5) velocities[i].z *= -1;

        // Pull slightly towards mouse
        const dx = targetX * 3.5 - nodes[i].x;
        const dy = -targetY * 2.5 - nodes[i].y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        if (distToMouse < 4) {
          nodes[i].x += dx * 0.003;
          nodes[i].y += dy * 0.003;
        }

        positionsArr[i * 3] = nodes[i].x;
        positionsArr[i * 3 + 1] = nodes[i].y;
        positionsArr[i * 3 + 2] = nodes[i].z;
      }
      pointsGeo.attributes.position.needsUpdate = true;

      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dz = nodes[i].z - nodes[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 2.5 && lineIdx < maxConnections) {
            linePositionsArr[lineIdx * 6] = nodes[i].x;
            linePositionsArr[lineIdx * 6 + 1] = nodes[i].y;
            linePositionsArr[lineIdx * 6 + 2] = nodes[i].z;

            linePositionsArr[lineIdx * 6 + 3] = nodes[j].x;
            linePositionsArr[lineIdx * 6 + 4] = nodes[j].y;
            linePositionsArr[lineIdx * 6 + 5] = nodes[j].z;
            lineIdx++;
          }
        }
      }

      for (let k = lineIdx; k < maxConnections; k++) {
        linePositionsArr[k * 6] = 0;
        linePositionsArr[k * 6 + 1] = 0;
        linePositionsArr[k * 6 + 2] = 0;
        linePositionsArr[k * 6 + 3] = 0;
        linePositionsArr[k * 6 + 4] = 0;
        linePositionsArr[k * 6 + 5] = 0;
      }
      lineGeo.attributes.position.needsUpdate = true;

      points.rotation.y += 0.0015;
      lineSegments.rotation.y += 0.0015;

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      scene.remove(points);
      scene.remove(lineSegments);
      renderer.dispose();
    };
  }, [loading]);

  // 4) Skills floating 3D Sphere Tag Cloud
  useEffect(() => {
    if (loading) return;
    const canvas = document.getElementById('skills-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      if (canvas.offsetWidth) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight || 380;
      }
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Filter skills based on activeCategory
    const activeSkills = skills.filter(skill => {
      if (activeCategory === 'all') return true;
      return skill.category === activeCategory;
    });

    // Map skills to 3D Sphere points (using Fibonacci distribution)
    const count = activeSkills.length;
    const colors = ['#6c63ff', '#00d4ff', '#ff6b9d', '#00ffaa'];
    
    let orbs = activeSkills.map((skill, i) => {
      const k = -1 + (2 * i + 1) / count;
      const theta = Math.acos(k);
      const phi = Math.sqrt(count * Math.PI) * theta;

      // Sphere radius (fits inside canvas)
      const R = Math.min(canvas.width, canvas.height) * 0.38;

      return {
        label: skill.name,
        skill,
        color: colors[i % colors.length],
        x3d: R * Math.sin(theta) * Math.cos(phi),
        y3d: R * Math.sin(theta) * Math.sin(phi),
        z3d: R * Math.cos(theta),
        x: 0,
        y: 0,
        scale: 1,
        alpha: 1,
        radius: 45 // Collision base radius
      };
    });

    let angleX = 0.002;
    let angleY = 0.002;
    let targetAngleX = 0.002;
    let targetAngleY = 0.002;
    let hoveredOrb = null;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      // Center coordinates
      const cx = mouseX - canvas.width / 2;
      const cy = mouseY - canvas.height / 2;

      targetAngleY = cx * 0.00002;
      targetAngleX = -cy * 0.00002;

      // Detect hover
      let hit = null;
      const sortedOrbs = [...orbs].sort((a, b) => b.z3d - a.z3d);
      for (let orb of sortedOrbs) {
        const dx = mouseX - orb.x;
        const dy = mouseY - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < orb.radius * orb.scale) {
          hit = orb;
          break;
        }
      }
      hoveredOrb = hit;
      canvas.style.cursor = hit ? 'pointer' : 'grab';
    };

    const handleMouseLeave = () => {
      targetAngleX = 0.002;
      targetAngleY = 0.002;
      hoveredOrb = null;
      canvas.style.cursor = 'grab';
    };

    const handleCanvasClick = () => {
      if (hoveredOrb) {
        setActiveTelemetrySkill(hoveredOrb.skill);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleCanvasClick);

    let frameId;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Rotate points based on mouse speeds
      angleX += (targetAngleX - angleX) * 0.08;
      angleY += (targetAngleY - angleY) * 0.08;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      orbs.forEach(orb => {
        let y1 = orb.y3d * cosX - orb.z3d * sinX;
        let z1 = orb.z3d * cosX + orb.y3d * sinX;
        let x2 = orb.x3d * cosY - z1 * sinY;
        let z2 = z1 * cosY + orb.x3d * sinY;

        orb.x3d = x2;
        orb.y3d = y1;
        orb.z3d = z2;

        const focalLength = 350;
        const scale = focalLength / (focalLength - orb.z3d);
        orb.scale = scale;
        
        orb.alpha = Math.max(0.15, Math.min(1.0, (orb.z3d + 200) / 360 * 0.8 + 0.2));

        orb.x = orb.x3d * scale + canvas.width / 2;
        orb.y = orb.y3d * scale + canvas.height / 2;
      });

      const drawOrder = [...orbs].sort((a, b) => a.z3d - b.z3d);

      drawOrder.forEach(orb => {
        ctx.save();
        ctx.globalAlpha = orb.alpha;

        const isHovered = hoveredOrb && hoveredOrb.label === orb.label;

        // 1. Glowing aura
        const glowRad = orb.scale * (isHovered ? 40 : 25);
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, glowRad);
        grad.addColorStop(0, orb.color + (isHovered ? '55' : '33'));
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, glowRad, 0, Math.PI * 2);
        ctx.fill();

        // 2. Glassmorphic capsule tag
        const pillWidth = orb.scale * 88;
        const pillHeight = orb.scale * 24;
        const radius = pillHeight / 2;

        ctx.beginPath();
        ctx.roundRect(orb.x - pillWidth / 2, orb.y - pillHeight / 2, pillWidth, pillHeight, radius);
        
        ctx.fillStyle = isHovered ? 'rgba(20, 26, 48, 0.9)' : 'rgba(8, 12, 28, 0.65)';
        ctx.fill();

        ctx.strokeStyle = isHovered ? '#00d4ff' : orb.color + '88';
        ctx.lineWidth = isHovered ? 1.8 : 1;
        ctx.stroke();

        // 3. Text label
        ctx.fillStyle = isHovered ? '#00d4ff' : '#e8e8f0';
        const fontSize = Math.max(9, Math.round(orb.scale * 9));
        ctx.font = `500 ${fontSize}px 'Fira Code', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const labelText = (orb.skill.icon ? orb.skill.icon + ' ' : '') + orb.label;
        ctx.fillText(labelText, orb.x, orb.y);

        ctx.restore();
      });

      frameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(frameId);
    };
  }, [loading, skills, activeCategory]);

  // 5) Interactive Tilt Effects (About Profile + Project Cards)
  useEffect(() => {
    if (loading) return;

    // About tilt
    const card = tiltCardRef.current;
    if (card) {
      const INTENSITY = 15;
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `
          perspective(800px)
          rotateY(${x * INTENSITY}deg)
          rotateX(${-y * INTENSITY}deg)
          scale3d(1.03, 1.03, 1.03)
          translateY(-8px)
        `;
      };
      const handleMouseLeave = () => {
        card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1) translateY(0px)';
        card.style.transition = 'transform 0.5s ease';
      };
      const handleMouseEnter = () => {
        card.style.transition = 'transform 0.1s ease';
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      card.addEventListener('mouseenter', handleMouseEnter);

      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
        card.removeEventListener('mouseenter', handleMouseEnter);
      };
    }
  }, [loading]);

  // Project Cards Magnetic Effect
  useEffect(() => {
    if (loading) return;
    const cards = projectCardsRef.current.filter(Boolean);

    const listeners = cards.map((card) => {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
        card.style.transform = `perspective(600px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-6px)`;
      };
      const handleMouseLeave = () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s ease';
      };
      const handleMouseEnter = () => {
        card.style.transition = 'transform 0.15s ease';
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      card.addEventListener('mouseenter', handleMouseEnter);

      return { card, handleMouseMove, handleMouseLeave, handleMouseEnter };
    });

    return () => {
      listeners.forEach(({ card, handleMouseMove, handleMouseLeave, handleMouseEnter }) => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
        card.removeEventListener('mouseenter', handleMouseEnter);
      });
    };
  }, [loading, projects]);

  // 6) GSAP & AOS Animations
  useEffect(() => {
    if (loading) return;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    // [AOS] Intersection Observer Custom Implementation
    const aosEls = document.querySelectorAll('[data-aos]');
    const aosObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            aosObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    aosEls.forEach(el => aosObserver.observe(el));

    // HERO stagger in
    gsap.from('.hero-name', {
      duration: 1.2,
      y: 80,
      opacity: 0,
      ease: 'power4.out',
      delay: 0.5
    });

    // Section Titles
    document.querySelectorAll('.section-title').forEach(title => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    // Skill Bars
    const skillFills = document.querySelectorAll('.skill-fill');
    skillFills.forEach(fill => {
      const targetWidth = fill.dataset.width + '%';
      ScrollTrigger.create({
        trigger: fill,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(fill, {
            width: targetWidth,
            duration: 1.5,
            ease: 'power2.out',
            delay: Math.random() * 0.3
          });
        }
      });
    });

    // Project Cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        delay: i * 0.12,
        ease: 'power3.out'
      });
    });

    // Timeline Line Drawing
    const timelineLine = document.querySelector('.timeline-line');
    if (timelineLine) {
      gsap.from(timelineLine, {
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1
        },
        scaleY: 0,
        transformOrigin: 'top center'
      });
    }

    // Timeline Items
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
      const isRight = item.classList.contains('right');
      const cardEl = item.querySelector('.timeline-card');
      const dotEl = item.querySelector('.timeline-dot');
      if (cardEl) {
        gsap.from(cardEl, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          x: isRight ? 60 : -60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out'
        });
      }
      if (dotEl) {
        gsap.from(dotEl, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(2)'
        });
      }
    });

    // About Stats
    const statVals = document.querySelectorAll('.stat-val');
    statVals.forEach(stat => {
      const text = stat.textContent.trim();
      const num = parseInt(text) || 0;
      const suffix = text.replace(/\d/g, '');

      ScrollTrigger.create({
        trigger: stat,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          let current = 0;
          const step = num / 40;
          const timer = setInterval(() => {
            current = Math.min(current + step, num);
            stat.textContent = Math.round(current) + suffix;
            if (current >= num) clearInterval(timer);
          }, 30);
        }
      });
    });

    // Tech Pills
    gsap.from('.tech-pill', {
      scrollTrigger: {
        trigger: '.tech-stack-row',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      scale: 0.5,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'back.out(1.7)'
    });

    // Skill categories
    gsap.from('.skill-category', {
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });

    // Contact Form
    gsap.from('.contact-form-wrap', {
      scrollTrigger: {
        trigger: '.contact-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.2
    });

    // Footer
    gsap.from('.footer', {
      scrollTrigger: {
        trigger: '.footer',
        start: 'top 95%',
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Orbs parallax
    gsap.to('.orb-1', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: -100
    });
    gsap.to('.orb-2', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      },
      y: -60
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      aosObserver.disconnect();
    };
  }, [loading, projects, skills, experience]);

  // Contact Form Submission Handler (Web3Forms API)
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      shakeButton();
      return;
    }

    setFormStatus('sending');
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus('success');
        setFormFeedback('Message sent successfully! Thank you for contacting me.');
        setContactName('');
        setContactEmail('');
        setContactSubject('');
        setContactMessage('');
        form.reset();

        setTimeout(() => {
          setFormStatus('idle');
          setFormFeedback('');
        }, 5000);
      } else {
        setFormStatus('error');
        setFormFeedback(result.message || 'Unable to send your message. Please try again.');
        setTimeout(() => {
          setFormStatus('idle');
          setFormFeedback('');
        }, 5000);
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setFormStatus('error');
      setFormFeedback('Unable to send your message. Please try again.');
      setTimeout(() => {
        setFormStatus('idle');
        setFormFeedback('');
      }, 5000);
    }
  };

  const shakeButton = () => {
    const btn = document.getElementById('submit-btn');
    if (btn) {
      btn.style.animation = 'none';
      btn.offsetHeight; // reflow
      btn.style.animation = 'shake 0.4s ease';
      if (!document.getElementById('shake-style')) {
        const style = document.createElement('style');
        style.id = 'shake-style';
        style.textContent = `
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%       { transform: translateX(-8px); }
            40%       { transform: translateX(8px); }
            60%       { transform: translateX(-5px); }
            80%       { transform: translateX(5px); }
          }
        `;
        document.head.appendChild(style);
      }
    }
  };

  // Group skills by category
  const frontendSkills = skills.filter(s => s.category === 'frontend');
  const backendSkills = skills.filter(s => s.category === 'backend');
  const designDataSkills = skills.filter(s => s.category === 'design_data');

  // Filter experiences
  const workTimeline = experience.filter(item => item.type === 'work');
  const eduTimeline = experience.filter(item => item.type === 'edu');
  const certifications = experience.filter(item => item.type === 'cert');

  if (loading) {
    return (
      <div className="premium-loader-screen">
        <div className="loader-blueprint">
          <div className="loader-blueprint-ring ring-1"></div>
          <div className="loader-blueprint-ring ring-2"></div>
          <div className="loader-blueprint-ring ring-3"></div>
          <div className="loader-core">
            <Cpu size={32} className="loader-icon text-accent-cyan animate-pulse" />
          </div>
          <h2 className="loader-title">ANURAG.SHARMA // CORE SYSTEM INITIALIZING</h2>
          <div className="loader-progress-bar">
            <div className="loader-progress-fill"></div>
          </div>
          <span className="loader-telemetry-text">[CONNECTING SECURE DATABASE NETWORK...]</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {/* Noise Overlay */}
      <div className="noise-overlay"></div>

      {/* ─────────────── HERO SECTION ─────────────── */}
      <section id="hero" className="section hero-section">
        <canvas id="hero-canvas"></canvas>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>

        <div className="container hero-container-split">
          <div className="hero-left-col" data-aos="fade-right">
            <div className="hero-status-badges">
              <div className="hero-badge">
                <span className="badge-dot"></span>
                <span>{profile.availability || 'Available for Work'}</span>
              </div>
              <div className="hero-badge-location">
                <MapPin size={12} className="mr-1 inline text-accent-cyan" />
                <span>{profile.location || 'Indore, India 🇮🇳'}</span>
              </div>
            </div>
            
            <h1 className="hero-title-premium">
              <span className="hero-greeting-premium">Hello, I'm</span>
              <span className="hero-name-premium gradient-text">{profile.name}</span>
            </h1>
            
            <div className="hero-subtitle-premium">
              <span className="typed-prefix">I am a&nbsp;</span>
              <span id="typed-text" className="typed-text"></span>
              <span className="typed-cursor">|</span>
            </div>
            
            <p className="hero-bio-premium">{profile.bio}</p>
            
            <div className="hero-actions-premium">
              <a href="#projects" className="btn-primary" onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <span>Explore Projects</span>
                <ChevronRight size={16} />
              </a>
              <a href="#contact" className="btn-secondary" onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <span>Hire Me</span>
              </a>
              {profile.resumeUrl && (
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-resume">
                  <FileText size={15} />
                  <span>Resume</span>
                </a>
              )}
            </div>

            <div className="hero-socials-premium">
              {profile.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px' }}><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                </a>
              )}
              {profile.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                  <span style={{ fontSize: '16px', fontWeight: 'bold' }}>in</span>
                </a>
              )}
              {profile.twitterUrl && (
                <a href={profile.twitterUrl} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                  <span style={{ fontSize: '15px', fontWeight: 'bold' }}>𝕏</span>
                </a>
              )}
            </div>
          </div>

          <div className="hero-right-col" data-aos="fade-left">
            <div className="avatar-portal-frame">
              <div className="avatar-portal-ring ring-outer"></div>
              <div className="avatar-portal-ring ring-inner"></div>
              <div className="avatar-portal-core">
                <Cpu size={64} className="avatar-svg-placeholder animate-pulse text-accent-cyan" />
                <div className="portal-glow-effect"></div>
              </div>
              <div className="floating-tech-badge tech-react">⚛️</div>
              <div className="floating-tech-badge tech-node">🟢</div>
              <div className="floating-tech-badge tech-python">🐍</div>
              <div className="floating-tech-badge tech-mongo">🍃</div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ─────────────── ABOUT Me SECTION ─────────────── */}
      <section id="about" className="section about-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Who I Am</span>
            <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
            <span className="hud-sec-tag">[SEC_NODE: 02_ABOUT] // STATUS: READY</span>
          </div>

          <div className="about-grid">
            <div className="about-visual" data-aos="fade-right">
              <div className="tilt-card" id="tilt-card" ref={tiltCardRef}>
                <div className="tilt-card-inner">
                  <div className="profile-image-wrap">
                    <div className="profile-image-placeholder">
                      <img 
                        src="/images/profile.png" 
                        alt={profile.name} 
                        loading="lazy" 
                        className="profile-avatar-img"
                      />
                    </div>
                    <div className="profile-ring ring-1"></div>
                    <div className="profile-ring ring-2"></div>
                    <div className="profile-glow"></div>
                  </div>
                  <div className="stat-badge stat-badge-1">
                    <span className="stat-number">4</span>
                    <span className="stat-label">Core Projects</span>
                  </div>
                  <div className="stat-badge stat-badge-2">
                    <span className="stat-number">1</span>
                    <span className="stat-label">SIH Finalist</span>
                  </div>
                  <div className="stat-badge stat-badge-3">
                    <span className="stat-number">B.Tech</span>
                    <span className="stat-label">CS Graduate</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-content" data-aos="fade-left">
              <p className="about-text" dangerouslySetInnerHTML={{ __html: profile.aboutText1 }}></p>
              <p className="about-text" dangerouslySetInnerHTML={{ __html: profile.aboutText2 }}></p>

              <div className="about-tags">
                {profile.aboutTags && profile.aboutTags.map((tag, idx) => (
                  <span className="tag" key={idx}>{tag}</span>
                ))}
              </div>

              <div className="about-stats-row">
                <div className="about-stat">
                  <span className="stat-val gradient-text">4</span>
                  <span className="stat-desc">Core Projects</span>
                </div>
                <div className="about-stat">
                  <span className="stat-val gradient-text">1</span>
                  <span className="stat-desc">SIH Finalist Team</span>
                </div>
                <div className="about-stat">
                  <span className="stat-val gradient-text">100%</span>
                  <span className="stat-desc">Dedicated &amp; Verified</span>
                </div>
              </div>

              <a href="#contact" className="btn-primary" onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <span>Let's Build Together</span>
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── SKILLS SECTION ─────────────── */}
      <section id="skills" className="section skills-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">What I Know</span>
            <h2 className="section-title">My <span className="gradient-text">Skills</span></h2>
            <span className="hud-sec-tag">[SEC_NODE: 03_SKILLS] // DATA: COMPILED</span>
          </div>

          <div className="skills-filter-row" data-aos="fade-up">
            {['all', 'frontend', 'backend', 'design_data'].map((cat) => (
              <button 
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                [ {cat.toUpperCase().replace('_', ' & ')} ]
              </button>
            ))}
          </div>

          <div className="skills-dashboard" data-aos="fade-up">
            <div className="skills-canvas-wrap">
              <canvas id="skills-canvas" className="skills-canvas"></canvas>
            </div>

            <div className="telemetry-card">
              {activeTelemetrySkill ? (
                <div className="telemetry-inner-glowing">
                  <div className="telemetry-header">
                    <div className="telemetry-title-wrap">
                      <span className="telemetry-icon">{activeTelemetrySkill.icon}</span>
                      <div className="telemetry-title-inner">
                        <span className="telemetry-title">{activeTelemetrySkill.name}</span>
                        <span className="telemetry-category">{activeTelemetrySkill.category.replace('_', ' & ')}</span>
                      </div>
                    </div>
                    <div className="telemetry-meta">
                      <div className="telemetry-level">{activeTelemetrySkill.level}</div>
                      <div className="telemetry-exp">{activeTelemetrySkill.experience}</div>
                    </div>
                  </div>
                  <div className="telemetry-body">
                    <p className="telemetry-desc">{activeTelemetrySkill.description}</p>
                    <div className="telemetry-subskills-container">
                      <h4 className="telemetry-subskills-title">Core Sub-Skills</h4>
                      <div className="telemetry-tags">
                        {activeTelemetrySkill.subSkills && activeTelemetrySkill.subSkills.map((sub, idx) => (
                          <span className="telemetry-tag" key={idx}>{sub}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="telemetry-placeholder">
                  <span className="telemetry-placeholder-icon">📡</span>
                  <span className="telemetry-placeholder-text">
                    SELECT A SKILL ORB FROM THE SPHERE TO STREAM TELEMETRY INFO
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="tech-marquee-section" data-aos="fade-up">
            <div className="marquee-container">
              <div className="marquee-track">
                {[...skills, ...skills].map((skill, idx) => (
                  <div className="marquee-pill" key={`mq-r1-${skill._id}-${idx}`}>
                    <span className="pill-icon">{skill.icon}</span>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
              <div className="marquee-track reverse">
                {[...skills, ...skills].reverse().map((skill, idx) => (
                  <div className="marquee-pill" key={`mq-r2-${skill._id}-${idx}`}>
                    <span className="pill-icon">{skill.icon}</span>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── PROJECTS SECTION ─────────────── */}
      <section id="projects" className="section projects-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">What I've Built</span>
            <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
            <span className="hud-sec-tag">[SEC_NODE: 04_PROJECTS] // MODULES: ACTIVE</span>
          </div>

          <div className="projects-grid-premium">
            {projects.map((project, index) => {
              const isExpanded = expandedProjectId === project._id;
              return (
                <div 
                  className={`project-card-premium ${project.isFeatured ? 'featured' : ''}`}
                  key={project._id}
                  data-aos="fade-up"
                  ref={el => projectCardsRef.current[index] = el}
                >
                  <div className="project-card-premium-inner">
                    {/* Visual Interface Panel */}
                    <div className="project-visual-premium">
                      <div className="browser-mockup-bar">
                        <div className="browser-dots"><span></span><span></span><span></span></div>
                        <div className="browser-url-bar">anurag.sharma/{project.liveLink && project.liveLink !== '#' ? project.liveLink : project.title.toLowerCase().replace(/\s/g, '-')}</div>
                      </div>
                      
                      <div className="browser-viewport">
                        {project.imageUrl ? (
                          <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="project-screenshot-img" 
                            loading="lazy"
                          />
                        ) : (
                          <>
                            {project.visualType === 'chat' && (
                              <div className="mock-chat-ui">
                                <div className="mock-chat-sidebar"></div>
                                <div className="mock-chat-body">
                                  <div className="mock-bubble receiver">Hello! How does this work?</div>
                                  <div className="mock-bubble sender">Streaming responses instantly!</div>
                                </div>
                              </div>
                            )}
                            {project.visualType === 'ecom' && (
                              <div className="mock-ecom-ui">
                                <div className="mock-ecom-header"></div>
                                <div className="mock-ecom-grid">
                                  <div></div><div></div><div></div><div></div>
                                </div>
                              </div>
                            )}
                            {project.visualType === 'dashboard' && (
                              <div className="mock-dashboard-ui">
                                <div className="mock-dash-sidebar"></div>
                                <div className="mock-dash-main">
                                  <div className="mock-dash-kpis"><div></div><div></div></div>
                                  <div className="mock-dash-chart"></div>
                                </div>
                              </div>
                            )}
                            {project.visualType === 'sih2025' && (
                              <div className="sih2025-placeholder-ui">
                                <div className="sih-placeholder-glow"></div>
                                <div className="sih-placeholder-content">
                                  <div className="sih-placeholder-header">
                                    <span className="sih-trophy-icon">🏆</span>
                                    <span className="sih-event-title">Smart India Hackathon</span>
                                  </div>
                                  <div className="sih-placeholder-org">
                                    <span className="sih-org-badge">🏛 Government of Jammu & Kashmir</span>
                                  </div>
                                  <div className="sih-placeholder-meta">
                                    <span className="sih-meta-tag">SIH25094</span>
                                    <span className="sih-meta-tag">Smart Education</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <div className="visual-gradient-fill"></div>
                    </div>

                    {/* Content Details */}
                    <div className="project-detail-premium">
                      <div className="project-meta-row">
                        {project.isFeatured && (
                          <span className="project-featured-badge">
                            <Sparkles size={12} className="inline mr-1" /> Featured
                          </span>
                        )}
                        <span className="project-duration-badge">{project.duration || 'Dynamic build'}</span>
                        <span className="project-status-badge">{project.status || 'Active'}</span>
                      </div>

                      <h3 className="project-title-premium">{project.title}</h3>
                      <p className="project-desc-premium">{project.description}</p>
                      
                      <div className="project-tags-premium">
                        {project.tags.map((tag, idx) => (
                          <span className="project-tag-pill" key={idx}>{tag}</span>
                        ))}
                      </div>

                      {/* Expanded telemetry metrics */}
                      {isExpanded && (
                        <div className="project-telemetry-expand" data-aos="fade-down">
                          {project.features && project.features.length > 0 && (
                            <div className="telemetry-expand-block">
                              <h4 className="expand-block-title">Key Architectural Features</h4>
                              <ul>
                                {project.features.map((feat, idx) => (
                                  <li key={idx}><CheckCircle2 size={12} className="inline mr-2 text-accent-green" />{feat}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {project.challenges && (
                            <div className="telemetry-expand-block">
                              <h4 className="expand-block-title">Technical Challenges</h4>
                              <p><ShieldAlert size={12} className="inline mr-2 text-accent-pink" />{project.challenges}</p>
                            </div>
                          )}
                          {project.solutions && (
                            <div className="telemetry-expand-block">
                              <h4 className="expand-block-title">Applied Solutions</h4>
                              <p><Cpu size={12} className="inline mr-2 text-accent-cyan" />{project.solutions}</p>
                            </div>
                          )}
                          {project.results && (
                            <div className="telemetry-expand-block">
                              <h4 className="expand-block-title">Core Performance Metrics</h4>
                              <p><CheckCircle2 size={12} className="inline mr-2 text-accent-green" />{project.results}</p>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="project-actions-row">
                        <button 
                          className="btn-secondary-xs"
                          onClick={() => setExpandedProjectId(isExpanded ? null : project._id)}
                        >
                          {project.visualType === 'sih2025' ? (isExpanded ? 'Hide Details' : 'View Details') : (isExpanded ? 'Hide Specs' : 'View Specs')}
                        </button>
                        
                        <div className="project-links-wrap" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                          {project.visualType === 'sih2025' ? (
                            <a 
                              href="https://www.google.com/search?q=Smart+India+Hackathon+SIH25094" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="project-link-icon-text" 
                              title="Problem Statement SIH25094"
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(255, 255, 255, 0.03)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', textDecoration: 'none' }}
                            >
                              Problem Statement SIH25094 <ExternalLink size={10} />
                            </a>
                          ) : (
                            <>
                              {project.githubLink ? (
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link-icon" title="GitHub Source">
                                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px' }}><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                                </a>
                              ) : (
                                <span className="project-private-repo-tag" title="Private Repository" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(255, 255, 255, 0.03)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                  🔒 Private Repo
                                </span>
                              )}
                              {project.liveLink && project.liveLink !== '#' && (
                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link-icon" title="Live Website">
                                  <ExternalLink size={15} />
                                </a>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="project-beam-glow"></div>
                </div>
              );
            })}
          </div>

          <div className="projects-cta" data-aos="fade-up">
            <a href={profile.githubUrl || '#'} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Explore All Repositories on GitHub
              <ExternalLink size={16} style={{ marginLeft: '8px' }} />
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────── EXPERIENCE TIMELINE SECTION ─────────────── */}
      <section id="experience" className="section experience-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">My Journey</span>
            <h2 className="section-title">Experience &amp; <span className="gradient-text">Education</span></h2>
            <span className="hud-sec-tag">[SEC_NODE: 05_JOURNEY] // INDEX: CACHED</span>
          </div>

          <div className="timeline-container-premium">
            {/* Work Timeline */}
            <div className="timeline-block" data-aos="fade-right">
              <h3 className="timeline-block-title"><Briefcase size={18} className="inline mr-2 text-accent-cyan" />Work History</h3>
              <div className="timeline-sub-container">
                <div className="timeline-track-bar"></div>
                {workTimeline.map((item) => (
                  <div className="timeline-item-premium" key={item._id}>
                    <div className="timeline-node text-accent-cyan"></div>
                    <div className="timeline-card-premium">
                      <span className="timeline-card-period">{item.period}</span>
                      <h4 className="timeline-card-role">{item.role}</h4>
                      <span className="timeline-card-company">{item.company}</span>
                      <p className="timeline-card-desc">{item.desc}</p>
                      <div className="timeline-card-tags">
                        {item.tags && item.tags.map((tag, idx) => (
                          <span key={idx}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Timeline */}
            <div className="timeline-block" data-aos="fade-left">
              <h3 className="timeline-block-title"><BookOpen size={18} className="inline mr-2 text-accent-pink" />Academic Record</h3>
              <div className="timeline-sub-container">
                <div className="timeline-track-bar"></div>
                {eduTimeline.map((item) => (
                  <div className="timeline-item-premium" key={item._id}>
                    <div className="timeline-node text-accent-pink"></div>
                    <div className="timeline-card-premium">
                      <span className="timeline-card-period">{item.period}</span>
                      <h4 className="timeline-card-role">{item.role}</h4>
                      <span className="timeline-card-company">{item.company}</span>
                      <p className="timeline-card-desc">{item.desc}</p>
                      <div className="timeline-card-tags">
                        {item.tags && item.tags.map((tag, idx) => (
                          <span key={idx}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ─────────────── HACKATHONS SECTION ─────────────── */}
      <section id="hackathons" className="section hackathons-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Competitions</span>
            <h2 className="section-title">Hackathon <span className="gradient-text">Subroutines</span></h2>
            <span className="hud-sec-tag">[SEC_NODE: 05_HACKATHONS] // SYSTEMS: SEEDED</span>
          </div>

          <div className="hackathons-grid" data-aos="fade-up">
            {hackathons.map((hack) => (
              <div className="hackathon-card-premium" key={hack._id}>
                <div className="hackathon-card-premium-inner">
                  <div className="hack-header-premium">
                    <div>
                      <h3 className="hack-title-premium">{hack.title}</h3>
                      <span className="hack-organizer-premium">{hack.organizer}</span>
                    </div>
                    <div className="hack-period-achievement">
                      <span className="hack-period-premium">{hack.period}</span>
                      <span className="hack-achievement-badge"><Trophy size={11} className="inline mr-1" />{hack.achievement}</span>
                    </div>
                  </div>

                  <div className="hack-body-premium">
                    <div className="hack-detail-row">
                      <span className="detail-row-label">Problem Statement</span>
                      <p className="detail-row-content">{hack.problemStatement}</p>
                    </div>
                    <div className="hack-detail-row">
                      <span className="detail-row-label">Technical Solution</span>
                      <p className="detail-row-content">{hack.solution}</p>
                    </div>
                  </div>

                  <div className="hack-footer-premium">
                    <div className="hack-techs-row">
                      {hack.technologies.map((t, idx) => (
                        <span key={idx}>{t}</span>
                      ))}
                    </div>
                    {hack.projectLink && (
                      <a href={hack.projectLink} target="_blank" rel="noopener noreferrer" className="hack-source-link">
                        Source Code <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '12px', height: '12px', display: 'inline-block', marginLeft: '4px', verticalAlign: 'middle' }}><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                      </a>
                    )}
                  </div>
                </div>
                <div className="hack-neon-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CONTACT SECTION ─────────────── */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Let's Connect</span>
            <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
            <p className="section-subtitle">Have a project in mind? Let's build something amazing together.</p>
            <span className="hud-sec-tag">[SEC_NODE: 06_CONTACT] // SOCKET: OPEN</span>
          </div>

          <div className="contact-grid-premium" data-aos="fade-up">
            {/* Info Cards */}
            <div className="contact-info-panel-premium">
              <div className="contact-stats-pane-premium">
                <div className="contact-stat-item-premium">
                  <div className="stat-icon-wrap text-accent-green"><Clock size={16} /></div>
                  <div>
                    <span className="stat-label-premium">Average Response Time</span>
                    <span className="stat-val-premium text-accent-green">Under 2 Hours</span>
                  </div>
                </div>
                <div className="contact-stat-item-premium">
                  <div className="stat-icon-wrap text-accent-cyan"><CheckCircle2 size={16} /></div>
                  <div>
                    <span className="stat-label-premium">Freelance Availability</span>
                    <span className="stat-val-premium text-accent-cyan">Open to Projects</span>
                  </div>
                </div>
              </div>

              <div className="contact-details-box-premium">
                <div className="contact-detail-line">
                  <Mail size={16} className="text-accent-violet" />
                  <div>
                    <span>Email Address</span>
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  </div>
                </div>
                <div className="contact-detail-line">
                  <MapPin size={16} className="text-accent-cyan" />
                  <div>
                    <span>Office Location</span>
                    <span>{profile.location}</span>
                  </div>
                </div>
                <div className="contact-detail-line">
                  <Smartphone size={16} className="text-accent-pink" />
                  <div>
                    <span>Direct Call Connection</span>
                    <span>+91 75838 53638</span>
                  </div>
                </div>
              </div>

              <div className="contact-socials-row-premium">
                {profile.githubUrl && (
                  <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="social-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '14px', height: '14px', marginRight: '8px' }}><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> GitHub
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-btn linkedin">
                    LinkedIn
                  </a>
                )}
                {profile.twitterUrl && (
                  <a href={profile.twitterUrl} target="_blank" rel="noopener noreferrer" className="social-btn twitter">
                    Twitter / X
                  </a>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrap-premium">
              <form id="contact-form" className="contact-form" onSubmit={handleContactSubmit} noValidate>
                {/* Web3Forms Hidden Configuration Fields */}
                <input
                  type="hidden"
                  name="access_key"
                  value={import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "e0ffdc5d-5979-4b3e-b0a5-d9828a75c310"}
                />
                <input
                  type="hidden"
                  name="subject"
                  value="New Portfolio Contact Message"
                />
                <input
                  type="checkbox"
                  name="botcheck"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                />

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="form-name">Full Name</label>
                    <input 
                      type="text" 
                      id="form-name" 
                      name="name"
                      placeholder="Your Name" 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-email">Email Address</label>
                    <input 
                      type="email" 
                      id="form-email" 
                      name="email"
                      placeholder="Your Email" 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="form-subject">Subject</label>
                  <input 
                    type="text" 
                    id="form-subject" 
                    name="subject_line"
                    placeholder="Subject" 
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="form-message">Message</label>
                  <textarea 
                    id="form-message" 
                    name="message"
                    rows="5" 
                    placeholder="Your Message" 
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary btn-submit" id="submit-btn" disabled={formStatus === 'sending'}>
                  <span className="btn-text">
                    {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                  </span>
                  {formStatus !== 'sending' && (
                    <span className="btn-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </span>
                  )}
                  {formStatus === 'sending' && (
                    <span className="btn-loader">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spin"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeDasharray="40" strokeDashoffset="40"><animate attributeName="stroke-dashoffset" values="40;0;40" dur="1.5s" repeatCount="indefinite"/></path></svg>
                    </span>
                  )}
                </button>
                {formStatus === 'success' && (
                  <p className="form-success" style={{ display: 'block', marginTop: '1.2rem', color: '#00ffaa' }}>
                    Message sent successfully! Thank you for contacting me.
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className="form-success error-text" style={{ display: 'block', marginTop: '1.2rem', color: '#ff6b9d' }}>
                    {formFeedback || 'Unable to send your message. Please try again.'}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
