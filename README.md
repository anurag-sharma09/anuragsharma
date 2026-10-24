# Anurag Sharma — Full Stack Developer Portfolio & CMS

A modern, high-performance portfolio website built with the **MERN** stack and **React + Vite**, featuring dynamic CMS controls, 3D interactive visualizations, and responsive modern UI.

🌐 **Live Demo:** [Deploy with Vercel](#deployment)

---

## 🚀 Features

- **Frontend (React 19 + Vite):**
  - Interactive Project Showcase (Auto Spectra, SpeedType, MIT Indore, SIH 2025).
  - 3D Interactive Canvas & Glassmorphic HUD elements.
  - Interactive Skills Matrix with category filtering.
  - Interactive Contact Form connected to Express API.
  - Fully responsive design across desktop, tablet, and mobile.
- **Backend (Node.js & Express):**
  - RESTful API endpoints for Profile, Projects, Skills, Experience, Hackathons, and Contact Messages.
  - MongoDB integration via Mongoose with offline graceful fallback.
  - JWT Authentication for CMS Admin Dashboard.
  - Seed scripts to pre-populate database collections.
- **Admin CMS Dashboard (`/dashboard`):**
  - Add, edit, or remove projects, skills, timeline items, and view incoming contact inquiries.

---

## 🛠️ Tech Stack

- **Client:** React 19, Vite, Tailwind CSS, Lucide React, Three.js
- **Server:** Node.js, Express.js, CORS, Cookie-Parser, Dotenv
- **Database:** MongoDB & Mongoose
- **Deployment:** Vercel (Frontend), Render / Railway (Backend / Full Stack)

---

## 📦 Project Structure

```
portfolio/
├── backend/                  # Express REST API Server
│   ├── models/               # Mongoose schemas (Project, Skill, User, etc.)
│   ├── routes/               # Express API routes
│   ├── scripts/              # Database seed scripts
│   └── server.js             # Express entry point
├── frontend/                 # React + Vite Single Page Application
│   ├── public/               # Public assets & screenshots
│   ├── src/                  # React components, pages, styles
│   └── vite.config.js        # Vite config with API proxy
├── images/                   # Static portfolio screenshots & assets
├── css/ & js/                # Standalone static portfolio assets
├── index.html                # Static portfolio entry
├── package.json              # Monorepo / workspace script orchestration
└── vercel.json               # Vercel deployment configuration
```

---

## ⚡ Getting Started Locally

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Optional: works with built-in fallbacks if offline)

### 2. Installation
Install all dependencies (root, backend, and frontend):
```bash
npm run install-all
```

### 3. Environment Configuration
Create a `.env` file in the `backend/` directory:
```bash
cp backend/.env.example backend/.env
```
Default configuration:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=24h
NODE_ENV=development
```

### 4. Seed Database (Optional)
```bash
npm run seed
```

### 5. Run Development Servers
Start both backend API (port 5000) and frontend Vite server (port 5173) concurrently:
```bash
npm run dev
```

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🌐 Deployment

### Deploying Frontend to Vercel
1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com/):
   - Import the repository `Portfolio`.
   - The included `vercel.json` will automatically configure:
     - **Build Command:** `npm run build --prefix frontend`
     - **Output Directory:** `frontend/dist`
   - Click **Deploy**!

### Deploying Backend to Render / Railway
1. Create a new Web Service pointing to this repository.
2. Set **Root Directory** to `backend` (or run from root with `npm start`).
3. Set Environment Variables:
   - `MONGO_URI` (your MongoDB Atlas connection string)
   - `JWT_SECRET`
   - `NODE_ENV=production`

---

## 📄 License

This project is licensed under the MIT License.
