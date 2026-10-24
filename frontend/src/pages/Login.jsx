import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (data.success) {
        // Save token in localStorage just in case we need it for Bearer header, 
        // though HTTP-only cookie will also be set automatically by Express
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      console.error('Login request error:', err);
      setError('Connection failed. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: '#070714',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
      color: '#e8e8f0',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Background Glows */}
      <div className="orb orb-1" style={{ top: '10%', left: '10%', width: '300px', height: '300px', opacity: 0.2 }}></div>
      <div className="orb orb-2" style={{ bottom: '10%', right: '10%', width: '350px', height: '350px', opacity: 0.15 }}></div>
      <div className="noise-overlay"></div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '40px 30px',
        width: '100%',
        maxWidth: '420px',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '1px'
          }}>
            AS<span style={{ color: '#6c63ff' }}>.</span>
          </div>
          <p style={{ color: '#9090a8', fontSize: '0.9rem', marginTop: '5px' }}>
            Portfolio Administration Portal
          </p>
        </div>

        <form onSubmit={handleLogin}>
          {error && (
            <div style={{
              background: 'rgba(255, 107, 157, 0.1)',
              border: '1px solid rgba(255, 107, 157, 0.3)',
              color: '#ff6b9d',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '0.85rem',
              marginBottom: '20px',
              lineHeight: '1.4'
            }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '0.85rem',
              color: '#9090a8',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@portfolio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '12px 16px',
                color: '#e8e8f0',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#6c63ff'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              required
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              fontSize: '0.85rem',
              color: '#9090a8',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '12px 16px',
                color: '#e8e8f0',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#6c63ff'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #6c63ff, #00d4ff)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '14px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(108, 99, 255, 0.3)',
              transition: 'opacity 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <a
            href="/"
            style={{
              color: '#9090a8',
              textDecoration: 'none',
              fontSize: '0.85rem',
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.color = '#00d4ff'}
            onMouseOut={(e) => e.target.style.color = '#9090a8'}
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
