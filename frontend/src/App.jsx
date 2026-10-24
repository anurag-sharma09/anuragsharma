import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Cursor from './components/Cursor';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Portfolio Route */}
        <Route 
          path="/" 
          element={
            <>
              <Cursor />
              <Portfolio />
            </>
          } 
        />
        
        {/* Admin Login Route */}
        <Route path="/admin/login" element={<Login />} />
        
        {/* Admin Dashboard Protected Route */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        
        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
