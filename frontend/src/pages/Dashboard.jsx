import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, User, Briefcase, Award, Calendar, Mail, LogOut, 
  Plus, Trash2, Edit, Check, Eye, Save, X, ExternalLink, RefreshCw, Trophy
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview'); // overview, profile, projects, skills, experience, messages
  const [profile, setProfile] = useState({});
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [messages, setMessages] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' }); // type: success, error

  const getApiPath = (type) => {
    switch (type) {
      case 'project': return 'projects';
      case 'skill': return 'skills';
      case 'experience': return 'experience';
      case 'hackathon': return 'hackathons';
      case 'contact': return 'contact';
      default: return type;
    }
  };

  // Modals / Editor States
  const [editingItem, setEditingItem] = useState(null); // stores object currently being edited
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // project, skill, experience, message-view
  const [viewingMessage, setViewingMessage] = useState(null);

  const navigate = useNavigate();

  // Get Auth Token Helper
  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // Verify Auth on Mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          headers: getAuthHeaders()
        });
        const data = await res.json();
        if (data.success) {
          setAuthorized(true);
          loadAllData();
        } else {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }
      } catch (err) {
        console.error('Auth check error:', err);
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    };
    checkAuth();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [profileRes, projectsRes, skillsRes, expRes, msgRes, hackathonsRes] = await Promise.all([
        fetch('/api/profile').then(res => res.json()),
        fetch('/api/projects').then(res => res.json()),
        fetch('/api/skills').then(res => res.json()),
        fetch('/api/experience').then(res => res.json()),
        fetch('/api/contact', { headers: getAuthHeaders() }).then(res => res.json()),
        fetch('/api/hackathons').then(res => res.json()).catch(() => ({ success: false, data: [] }))
      ]);

      if (profileRes.success) setProfile(profileRes.data);
      if (projectsRes.success) setProjects(projectsRes.data);
      if (skillsRes.success) setSkills(skillsRes.data);
      if (expRes.success) setExperience(expRes.data);
      if (msgRes.success) setMessages(msgRes.data);
      if (hackathonsRes.success) setHackathons(hackathonsRes.data);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      showStatus('Failed to load dashboard data from API backend.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showStatus = (text, type = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage({ text: '', type: '' }), 5000);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.warn('Logout server request failed:', err);
    }
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Profile Action
  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      if (data.success) {
        setProfile(data.data);
        showStatus('Profile updated successfully!', 'success');
      } else {
        showStatus(data.message || 'Error updating profile.', 'error');
      }
    } catch (err) {
      showStatus('Network error while updating profile.', 'error');
    }
  };

  // CRUD Helper: Save or Create Item
  const handleSaveItem = async (e) => {
    e.preventDefault();
    const isEdit = !!editingItem._id;
    const path = getApiPath(modalType);
    let url = `/api/${path}`;
    let method = 'POST';

    if (isEdit) {
      url = `${url}/${editingItem._id}`;
      method = 'PUT';
    }

    try {
      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(editingItem)
      });
      const data = await res.json();
      
      if (data.success) {
        showStatus(`${modalType.toUpperCase()} ${isEdit ? 'updated' : 'created'} successfully!`, 'success');
        setIsModalOpen(false);
        setEditingItem(null);
        loadAllData(); // Refresh everything
      } else {
        showStatus(data.message || 'Validation error while saving.', 'error');
      }
    } catch (err) {
      showStatus('Network error while saving item.', 'error');
    }
  };

  // CRUD Helper: Delete Item
  const handleDeleteItem = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      const path = getApiPath(type);
      const res = await fetch(`/api/${path}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) {
        showStatus(`${type.toUpperCase()} removed successfully!`, 'success');
        loadAllData();
      } else {
        showStatus(data.message || 'Error deleting item.', 'error');
      }
    } catch (err) {
      showStatus('Network error while deleting item.', 'error');
    }
  };

  // Contact Message Management
  const handleToggleRead = async (id) => {
    try {
      const res = await fetch(`/api/contact/${id}/read`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) {
        setMessages(messages.map(m => m._id === id ? { ...m, isRead: data.data.isRead } : m));
        if (viewingMessage && viewingMessage._id === id) {
          setViewingMessage({ ...viewingMessage, isRead: data.data.isRead });
        }
      }
    } catch (err) {
      showStatus('Error changing read status.', 'error');
    }
  };

  const openEditModal = (item, type) => {
    setModalType(type);
    setEditingItem(item || getEmptyItem(type));
    setIsModalOpen(true);
  };

  const getEmptyItem = (type) => {
    switch (type) {
      case 'project':
        return { 
          title: '', description: '', tags: [], githubLink: '', liveLink: '', 
          visualType: 'chat', imageUrl: '', features: [], challenges: '', 
          solutions: '', results: '', duration: '', status: 'Completed', 
          isFeatured: false, order: 0 
        };
      case 'skill':
        return { 
          name: '', category: 'frontend', percentage: 80, icon: '⚡', 
          level: 'Advanced', experience: '2+ Years', description: '', 
          subSkills: [], order: 0 
        };
      case 'experience':
        return { role: '', company: '', period: '', type: 'work', desc: '', tags: [], order: 0 };
      case 'hackathon':
        return { 
          title: '', organizer: '', period: '', achievement: '', 
          problemStatement: '', solution: '', technologies: [], projectLink: '', order: 0 
        };
      default:
        return {};
    }
  };

  if (!authorized) {
    return null; // Will redirect in useEffect
  }

  const unreadMessagesCount = messages.filter(m => !m.isRead).length;

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#070714',
      color: '#e8e8f0',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* SIDEBAR NAVIGATION */}
      <aside style={{
        width: '260px',
        background: 'rgba(255, 255, 255, 0.02)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0'
      }}>
        {/* Brand */}
        <div style={{ padding: '0 24px', marginBottom: '32px' }}>
          <div style={{
            fontSize: '1.6rem',
            fontWeight: 'bold',
            fontFamily: "'Space Grotesk', sans-serif"
          }}>
            AS<span style={{ color: '#6c63ff' }}>.</span>
            <span style={{ fontSize: '0.75rem', color: '#9090a8', marginLeft: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>CMS</span>
          </div>
        </div>

        {/* Links */}
        <nav style={{ flex: 1, padding: '0 12px' }}>
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'profile', label: 'Profile Settings', icon: User },
            { id: 'projects', label: 'Manage Projects', icon: Briefcase },
            { id: 'skills', label: 'Manage Skills', icon: Award },
            { id: 'experience', label: 'Manage Timeline', icon: Calendar },
            { id: 'hackathons', label: 'Manage Hackathons', icon: Trophy },
            { 
              id: 'messages', 
              label: 'Messages Inbox', 
              icon: Mail, 
              badge: unreadMessagesCount > 0 ? unreadMessagesCount : null 
            }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 16px',
                  margin: '4px 0',
                  background: isActive ? 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(0,212,255,0.05))' : 'transparent',
                  color: isActive ? '#00d4ff' : '#9090a8',
                  border: 'none',
                  borderLeft: isActive ? '3px solid #6c63ff' : '3px solid transparent',
                  borderRadius: '0 8px 8px 0',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
              >
                <Icon size={18} style={{ marginRight: '12px' }} />
                <span style={{ flex: 1 }}>{tab.label}</span>
                {tab.badge && (
                  <span style={{
                    background: '#ff6b9d',
                    color: '#fff',
                    borderRadius: '50px',
                    padding: '2px 8px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>{tab.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer info & Logout */}
        <div style={{ padding: '0 24px' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              background: 'transparent',
              color: '#ff6b9d',
              border: '1px solid rgba(255, 107, 157, 0.2)',
              borderRadius: '8px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 107, 157, 0.05)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <LogOut size={16} style={{ marginRight: '8px' }} />
            Log Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{
        flex: 1,
        padding: '40px',
        overflowY: 'auto',
        height: '100vh',
        boxSizing: 'border-box'
      }}>
        {/* Header bar */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div>
            <h1 style={{
              fontSize: '1.8rem',
              margin: 0,
              fontFamily: "'Space Grotesk', sans-serif"
            }}>
              {activeTab.toUpperCase()}
            </h1>
            <p style={{ color: '#9090a8', fontSize: '0.9rem', margin: '4px 0 0' }}>
              Welcome Anurag Sharma. Control portfolio dynamics below.
            </p>
          </div>

          <button
            onClick={loadAllData}
            title="Refresh Data"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px',
              color: '#e8e8f0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <RefreshCw size={16} className={loading ? 'spin' : ''} />
          </button>
        </header>

        {/* Global Action Notifications */}
        {statusMessage.text && (
          <div style={{
            background: statusMessage.type === 'error' ? 'rgba(255, 107, 157, 0.1)' : 'rgba(0, 255, 170, 0.1)',
            border: `1px solid ${statusMessage.type === 'error' ? 'rgba(255, 107, 157, 0.3)' : 'rgba(0, 255, 170, 0.3)'}`,
            color: statusMessage.type === 'error' ? '#ff6b9d' : '#00ffaa',
            padding: '14px 20px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            marginBottom: '24px'
          }}>
            {statusMessage.text}
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
            <div style={{
              width: '40px', height: '40px', border: '3px solid #6c63ff',
              borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite'
            }}></div>
          </div>
        )}

        {!loading && (
          <>
            {/* 1) OVERVIEW PANEL */}
            {activeTab === 'overview' && (
              <div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '20px',
                  marginBottom: '40px'
                }}>
                  {[
                    { title: 'Inquiries Inbox', count: messages.length, desc: `${unreadMessagesCount} unread messages`, icon: Mail, color: '#6c63ff' },
                    { title: 'Dynamic Projects', count: projects.length, desc: 'Portfolio cards', icon: Briefcase, color: '#00d4ff' },
                    { title: 'Tech Skills', count: skills.length, desc: 'Skills database', icon: Award, color: '#00ffaa' },
                    { title: 'Timeline Entries', count: experience.length, desc: 'Work & study records', icon: Calendar, color: '#ff6b9d' }
                  ].map((card, idx) => {
                    const CardIcon = card.icon;
                    return (
                      <div key={idx} style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '12px',
                        padding: '24px',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <div style={{
                          background: `${card.color}20`,
                          color: card.color,
                          borderRadius: '10px',
                          padding: '12px',
                          marginRight: '20px'
                        }}>
                          <CardIcon size={24} />
                        </div>
                        <div>
                          <h4 style={{ margin: 0, color: '#9090a8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{card.title}</h4>
                          <h2 style={{ margin: '8px 0 2px 0', fontSize: '2rem', fontWeight: 'bold' }}>{card.count}</h2>
                          <p style={{ margin: 0, color: '#9090a8', fontSize: '0.8rem' }}>{card.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  padding: '30px'
                }}>
                  <h3 style={{ margin: '0 0 16px 0', fontFamily: "'Space Grotesk', sans-serif" }}>Quick System Check</h3>
                  <p style={{ margin: 0, color: '#9090a8', lineHeight: '1.6' }}>
                    All portfolio assets are dynamically fetched from the database. Click on links in the sidebar to configure the items displayed on your live site. Changes made here will update the public frontend immediately.
                  </p>
                  <div style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
                    <a href="/" target="_blank" rel="noreferrer" className="btn-primary-sm" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                      View Live Website <ExternalLink size={14} style={{ marginLeft: '8px' }} />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* 2) PROFILE SETTINGS PANEL */}
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSave} style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '30px',
                maxWidth: '800px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#9090a8', marginBottom: '8px' }}>Your Name</label>
                    <input type="text" value={profile.name || ''} onChange={(e) => setProfile({ ...profile, name: e.target.value })} style={inputStyle} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#9090a8', marginBottom: '8px' }}>Contact Email</label>
                    <input type="email" value={profile.email || ''} onChange={(e) => setProfile({ ...profile, email: e.target.value })} style={inputStyle} required />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9090a8', marginBottom: '8px' }}>Typewriter Role Strings (comma-separated)</label>
                  <input 
                    type="text" 
                    value={profile.typedStrings ? profile.typedStrings.join(', ') : ''} 
                    onChange={(e) => setProfile({ ...profile, typedStrings: e.target.value.split(',').map(s => s.trim()) })} 
                    style={inputStyle} 
                    required 
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9090a8', marginBottom: '8px' }}>Hero Intro Bio (Short)</label>
                  <input type="text" value={profile.bio || ''} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} style={inputStyle} required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#9090a8', marginBottom: '8px' }}>Location</label>
                    <input type="text" value={profile.location || ''} onChange={(e) => setProfile({ ...profile, location: e.target.value })} style={inputStyle} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#9090a8', marginBottom: '8px' }}>Availability Status</label>
                    <input type="text" value={profile.availability || ''} onChange={(e) => setProfile({ ...profile, availability: e.target.value })} style={inputStyle} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#9090a8', marginBottom: '8px' }}>Resume Link</label>
                    <input type="text" value={profile.resumeUrl || ''} onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })} style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#9090a8', marginBottom: '8px' }}>GitHub Profile Link</label>
                    <input type="text" value={profile.githubUrl || ''} onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#9090a8', marginBottom: '8px' }}>LinkedIn Profile Link</label>
                    <input type="text" value={profile.linkedinUrl || ''} onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#9090a8', marginBottom: '8px' }}>Twitter / X Profile Link</label>
                    <input type="text" value={profile.twitterUrl || ''} onChange={(e) => setProfile({ ...profile, twitterUrl: e.target.value })} style={inputStyle} />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9090a8', marginBottom: '8px' }}>About Me Text Block 1</label>
                  <textarea rows="4" value={profile.aboutText1 || ''} onChange={(e) => setProfile({ ...profile, aboutText1: e.target.value })} style={textareaStyle} required></textarea>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9090a8', marginBottom: '8px' }}>About Me Text Block 2</label>
                  <textarea rows="4" value={profile.aboutText2 || ''} onChange={(e) => setProfile({ ...profile, aboutText2: e.target.value })} style={textareaStyle} required></textarea>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9090a8', marginBottom: '8px' }}>About Tags (comma-separated)</label>
                  <input 
                    type="text" 
                    value={profile.aboutTags ? profile.aboutTags.join(', ') : ''} 
                    onChange={(e) => setProfile({ ...profile, aboutTags: e.target.value.split(',').map(s => s.trim()) })} 
                    style={inputStyle} 
                  />
                </div>

                <button type="submit" className="btn-primary-sm" style={{ border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <Save size={16} style={{ marginRight: '8px' }} /> Save Changes
                </button>
              </form>
            )}

            {/* 3) PROJECTS PANEL */}
            {activeTab === 'projects' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                  <button onClick={() => openEditModal(null, 'project')} className="btn-primary-sm" style={{ border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <Plus size={16} style={{ marginRight: '8px' }} /> Add New Project
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                  {projects.map(proj => (
                    <div key={proj._id} style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '12px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <span style={{ fontSize: '0.75rem', background: 'rgba(108, 99, 255, 0.15)', color: '#6c63ff', padding: '3px 8px', borderRadius: '50px', textTransform: 'uppercase' }}>
                            {proj.visualType}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: '#9090a8' }}>Sort Order: {proj.order}</span>
                        </div>
                        <h3 style={{ margin: '12px 0 8px 0', fontFamily: "'Space Grotesk', sans-serif" }}>{proj.title}</h3>
                        <p style={{ margin: 0, color: '#9090a8', fontSize: '0.85rem', lineHeight: '1.5', height: '90px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{proj.description}</p>
                        <div style={{ margin: '12px 0', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {proj.tags.map((t, idx) => (
                            <span key={idx} style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)', color: '#e8e8f0', padding: '2px 6px', borderRadius: '4px' }}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '8px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        paddingTop: '12px',
                        marginTop: '12px'
                      }}>
                        <button onClick={() => openEditModal(proj, 'project')} style={iconBtnStyle} title="Edit"><Edit size={14} /></button>
                        <button onClick={() => handleDeleteItem(proj._id, 'project')} style={{ ...iconBtnStyle, color: '#ff6b9d' }} title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4) SKILLS PANEL */}
            {activeTab === 'skills' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                  <button onClick={() => openEditModal(null, 'skill')} className="btn-primary-sm" style={{ border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <Plus size={16} style={{ marginRight: '8px' }} /> Add New Skill
                  </button>
                </div>

                {['frontend', 'backend', 'design_data'].map(category => {
                  const filtered = skills.filter(s => s.category === category);
                  return (
                    <div key={category} style={{ marginBottom: '32px' }}>
                      <h3 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        paddingBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: '#00d4ff'
                      }}>{category.replace('_', ' & ')}</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px', marginTop: '16px' }}>
                        {filtered.map(skill => (
                          <div key={skill._id} style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span style={{ fontSize: '1.2rem', marginRight: '10px' }}>{skill.icon}</span>
                              <div>
                                <div style={{ fontWeight: '500' }}>{skill.name}</div>
                                <div style={{ fontSize: '0.75rem', color: '#9090a8' }}>{skill.percentage}%</div>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <button onClick={() => openEditModal(skill, 'skill')} style={smallIconBtnStyle}><Edit size={12} /></button>
                              <button onClick={() => handleDeleteItem(skill._id, 'skill')} style={{ ...smallIconBtnStyle, color: '#ff6b9d' }}><Trash2 size={12} /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 5) EXPERIENCE TIMELINE PANEL */}
            {activeTab === 'experience' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                  <button onClick={() => openEditModal(null, 'experience')} className="btn-primary-sm" style={{ border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <Plus size={16} style={{ marginRight: '8px' }} /> Add Timeline Entry
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {experience.map(item => (
                    <div key={item._id} style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '12px',
                      padding: '24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start'
                    }}>
                      <div style={{ flex: 1, paddingRight: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                          <span style={{ 
                            fontSize: '0.75rem', 
                            background: item.type === 'work' ? 'rgba(0, 255, 170, 0.1)' : item.type === 'edu' ? 'rgba(108, 99, 255, 0.1)' : 'rgba(255, 107, 157, 0.1)', 
                            color: item.type === 'work' ? '#00ffaa' : item.type === 'edu' ? '#6c63ff' : '#ff6b9d',
                            padding: '3px 8px', 
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase'
                          }}>
                            {item.type}
                          </span>
                          <span style={{ color: '#9090a8', fontSize: '0.85rem' }}>{item.period}</span>
                        </div>
                        <h3 style={{ margin: '0 0 4px 0', fontFamily: "'Space Grotesk', sans-serif" }}>{item.role}</h3>
                        <div style={{ color: '#00d4ff', fontSize: '0.9rem', marginBottom: '12px', fontWeight: '500' }}>{item.company}</div>
                        <p style={{ margin: '0 0 12px 0', color: '#9090a8', fontSize: '0.85rem', lineHeight: '1.6' }}>{item.desc}</p>
                        {item.tags && item.tags.length > 0 && (
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {item.tags.map((t, idx) => (
                              <span key={idx} style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px' }}>{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => openEditModal(item, 'experience')} style={iconBtnStyle}><Edit size={14} /></button>
                        <button onClick={() => handleDeleteItem(item._id, 'experience')} style={{ ...iconBtnStyle, color: '#ff6b9d' }}><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6) MESSAGES INBOX PANEL */}
            {activeTab === 'messages' && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <th style={{ padding: '16px 24px' }}>Status</th>
                      <th style={{ padding: '16px 24px' }}>Name</th>
                      <th style={{ padding: '16px 24px' }}>Email</th>
                      <th style={{ padding: '16px 24px' }}>Subject</th>
                      <th style={{ padding: '16px 24px' }}>Date</th>
                      <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#9090a8' }}>
                          Inbox is empty. No messages received yet.
                        </td>
                      </tr>
                    )}
                    {messages.map(msg => (
                      <tr key={msg._id} style={{ 
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        background: msg.isRead ? 'transparent' : 'rgba(108, 99, 255, 0.02)',
                        transition: 'background 0.2s ease'
                      }}>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{
                            display: 'inline-block',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: msg.isRead ? 'transparent' : '#6c63ff'
                          }}></span>
                        </td>
                        <td style={{ padding: '16px 24px', fontWeight: msg.isRead ? 'normal' : '600' }}>{msg.name}</td>
                        <td style={{ padding: '16px 24px', color: '#9090a8' }}>{msg.email}</td>
                        <td style={{ padding: '16px 24px', fontWeight: msg.isRead ? 'normal' : '600' }}>{msg.subject}</td>
                        <td style={{ padding: '16px 24px', color: '#9090a8' }}>
                          {new Date(msg.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <button onClick={() => { setViewingMessage(msg); if(!msg.isRead) handleToggleRead(msg._id); }} style={iconBtnStyle} title="Read Message">
                              <Eye size={14} />
                            </button>
                            <button onClick={() => handleToggleRead(msg._id)} style={{ ...iconBtnStyle, color: msg.isRead ? '#9090a8' : '#00ffaa' }} title={msg.isRead ? 'Mark Unread' : 'Mark Read'}>
                              <Check size={14} />
                            </button>
                            <button onClick={() => handleDeleteItem(msg._id, 'contact')} style={{ ...iconBtnStyle, color: '#ff6b9d' }} title="Delete">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Hackathons CRUD Tab */}
            {activeTab === 'hackathons' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                  <button onClick={() => openEditModal(null, 'hackathon')} className="btn-primary-sm" style={{ border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <Plus size={16} style={{ marginRight: '8px' }} /> Add New Hackathon
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                  {hackathons.map(hack => (
                    <div key={hack._id} style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '12px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <span style={{ fontSize: '0.75rem', background: 'rgba(255, 107, 157, 0.15)', color: '#ff6b9d', padding: '3px 8px', borderRadius: '50px', fontWeight: 'bold' }}>
                            {hack.achievement}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: '#9090a8' }}>Sort Order: {hack.order}</span>
                        </div>
                        <h3 style={{ margin: '12px 0 4px 0', fontFamily: "'Space Grotesk', sans-serif" }}>{hack.title}</h3>
                        <div style={{ color: '#00d4ff', fontSize: '0.85rem', marginBottom: '12px' }}>{hack.organizer} • {hack.period}</div>
                        <p style={{ margin: '0 0 10px 0', color: '#9090a8', fontSize: '0.85rem', lineHeight: '1.5' }}><strong>Problem:</strong> {hack.problemStatement}</p>
                        <p style={{ margin: '0 0 12px 0', color: '#9090a8', fontSize: '0.85rem', lineHeight: '1.5' }}><strong>Solution:</strong> {hack.solution}</p>
                        <div style={{ margin: '12px 0', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {hack.technologies.map((t, idx) => (
                            <span key={idx} style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)', color: '#e8e8f0', padding: '2px 6px', borderRadius: '4px' }}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '8px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        paddingTop: '12px',
                        marginTop: '12px'
                      }}>
                        <button onClick={() => openEditModal(hack, 'hackathon')} style={iconBtnStyle} title="Edit"><Edit size={14} /></button>
                        <button onClick={() => handleDeleteItem(hack._id, 'hackathon')} style={{ ...iconBtnStyle, color: '#ff6b9d' }} title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* DYNAMIC CRUD EDITOR MODAL */}
      {isModalOpen && editingItem && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            background: '#0c0c1e',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '30px',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
                {editingItem._id ? 'Edit' : 'Create'} {modalType.toUpperCase()}
              </h2>
              <button onClick={() => { setIsModalOpen(false); setEditingItem(null); }} style={{ background: 'transparent', border: 'none', color: '#9090a8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveItem}>
              {/* Project Modal Form */}
              {modalType === 'project' && (
                <div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Project Title</label>
                    <input type="text" value={editingItem.title || ''} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} style={inputStyle} required />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Description</label>
                    <textarea rows="3" value={editingItem.description || ''} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} style={textareaStyle} required></textarea>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={labelStyle}>Visual Mockup Type</label>
                      <select value={editingItem.visualType || 'chat'} onChange={(e) => setEditingItem({ ...editingItem, visualType: e.target.value })} style={selectStyle}>
                        <option value="chat">Chat Mockup UI (React + Node.js style)</option>
                        <option value="ecom">Product Grid Mockup (E-Commerce style)</option>
                        <option value="dashboard">KPI Charts Mockup (Analytics style)</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Display Order Rank</label>
                      <input type="number" value={editingItem.order ?? 0} onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value) || 0 })} style={inputStyle} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={labelStyle}>Duration / Timeframe</label>
                      <input type="text" value={editingItem.duration || ''} onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })} style={inputStyle} placeholder="3 Months" />
                    </div>
                    <div>
                      <label style={labelStyle}>Project Status</label>
                      <input type="text" value={editingItem.status || ''} onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })} style={inputStyle} placeholder="Production Ready" />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.5fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={labelStyle}>Image / Screenshot URL</label>
                      <input type="text" value={editingItem.imageUrl || ''} onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })} style={inputStyle} placeholder="https://example.com/mock.png" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <label style={{ ...labelStyle, marginBottom: '8px' }}>Featured Project?</label>
                      <input type="checkbox" checked={editingItem.isFeatured || false} onChange={(e) => setEditingItem({ ...editingItem, isFeatured: e.target.checked })} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={labelStyle}>GitHub Repository Link</label>
                      <input type="text" value={editingItem.githubLink || ''} onChange={(e) => setEditingItem({ ...editingItem, githubLink: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Live Demo Link</label>
                      <input type="text" value={editingItem.liveLink || ''} onChange={(e) => setEditingItem({ ...editingItem, liveLink: e.target.value })} style={inputStyle} />
                    </div>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Technologies (comma-separated)</label>
                    <input 
                      type="text" 
                      value={editingItem.tags ? editingItem.tags.join(', ') : ''} 
                      onChange={(e) => setEditingItem({ ...editingItem, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} 
                      style={inputStyle} 
                      placeholder="React, Express, Stripe"
                    />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Key Features (comma-separated)</label>
                    <textarea rows="2" value={editingItem.features ? editingItem.features.join(', ') : ''} onChange={(e) => setEditingItem({ ...editingItem, features: e.target.value.split(',').map(f => f.trim()).filter(Boolean) })} style={textareaStyle} placeholder="Real-time streaming, Redis caching, Stripe integration"></textarea>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Technical Challenges</label>
                    <textarea rows="2" value={editingItem.challenges || ''} onChange={(e) => setEditingItem({ ...editingItem, challenges: e.target.value })} style={textareaStyle} placeholder="Race conditions on high-concurrency checkouts..."></textarea>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Applied Solutions</label>
                    <textarea rows="2" value={editingItem.solutions || ''} onChange={(e) => setEditingItem({ ...editingItem, solutions: e.target.value })} style={textareaStyle} placeholder="Implemented optimistic locking structures using Redis..."></textarea>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Core Performance / Metrics Results</label>
                    <textarea rows="2" value={editingItem.results || ''} onChange={(e) => setEditingItem({ ...editingItem, results: e.target.value })} style={textareaStyle} placeholder="Reduced database query latencies by 68%..."></textarea>
                  </div>
                </div>
              )}

              {/* Skill Modal Form */}
              {modalType === 'skill' && (
                <div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Skill Name</label>
                    <input type="text" value={editingItem.name || ''} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} style={inputStyle} required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={labelStyle}>Skill Category</label>
                      <select value={editingItem.category || 'frontend'} onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })} style={selectStyle}>
                        <option value="frontend">⚡ Frontend</option>
                        <option value="backend">🔧 Backend</option>
                        <option value="design_data">🎯 Design & Data</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Skill Icon (Emoji or Char)</label>
                      <input type="text" value={editingItem.icon || '⚡'} onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })} style={inputStyle} required />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={labelStyle}>Proficiency Level</label>
                      <input type="text" value={editingItem.level || ''} onChange={(e) => setEditingItem({ ...editingItem, level: e.target.value })} style={inputStyle} placeholder="Expert" />
                    </div>
                    <div>
                      <label style={labelStyle}>Hands-on Experience</label>
                      <input type="text" value={editingItem.experience || ''} onChange={(e) => setEditingItem({ ...editingItem, experience: e.target.value })} style={inputStyle} placeholder="3+ Years" />
                    </div>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Skill Telemetry Description</label>
                    <textarea rows="2" value={editingItem.description || ''} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} style={textareaStyle} placeholder="Describe how you utilize this skill..." required></textarea>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px', marginBottom: '24px' }}>
                    <div>
                      <label style={labelStyle}>Percentage (0-100)</label>
                      <input type="number" min="0" max="100" value={editingItem.percentage ?? 80} onChange={(e) => setEditingItem({ ...editingItem, percentage: parseInt(e.target.value) || 0 })} style={inputStyle} required />
                    </div>
                    <div>
                      <label style={labelStyle}>Display Order Rank</label>
                      <input type="number" value={editingItem.order ?? 0} onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value) || 0 })} style={inputStyle} />
                    </div>
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={labelStyle}>Sub-Skills (comma-separated)</label>
                    <input 
                      type="text" 
                      value={editingItem.subSkills ? editingItem.subSkills.join(', ') : ''} 
                      onChange={(e) => setEditingItem({ ...editingItem, subSkills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} 
                      style={inputStyle} 
                      placeholder="React Hooks, Zustand, Context API"
                    />
                  </div>
                </div>
              )}

              {/* Experience Modal Form */}
              {modalType === 'experience' && (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={labelStyle}>Entry Type</label>
                      <select value={editingItem.type || 'work'} onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })} style={selectStyle}>
                        <option value="work">Work Experience</option>
                        <option value="edu">Education</option>
                        <option value="cert">Certification</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Duration / Period</label>
                      <input type="text" placeholder="2023 — Present" value={editingItem.period || ''} onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })} style={inputStyle} required />
                    </div>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Role / Degree Title</label>
                    <input type="text" placeholder="Full Stack Developer" value={editingItem.role || ''} onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })} style={inputStyle} required />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Company / Institution</label>
                    <input type="text" placeholder="Freelance" value={editingItem.company || ''} onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })} style={inputStyle} required />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Description Details</label>
                    <textarea rows="4" value={editingItem.desc || ''} onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })} style={textareaStyle} required></textarea>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.5fr', gap: '16px', marginBottom: '24px' }}>
                    <div>
                      <label style={labelStyle}>Timeline Tags (comma-separated)</label>
                      <input 
                        type="text" 
                        value={editingItem.tags ? editingItem.tags.join(', ') : ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} 
                        style={inputStyle} 
                        placeholder="AWS, Deep Learning"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Order Rank</label>
                      <input type="number" value={editingItem.order ?? 0} onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value) || 0 })} style={inputStyle} />
                    </div>
                  </div>
                </div>
              )}

              {/* Hackathon Modal Form */}
              {modalType === 'hackathon' && (
                <div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Hackathon Title</label>
                    <input type="text" value={editingItem.title || ''} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} style={inputStyle} required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={labelStyle}>Organizer / Host</label>
                      <input type="text" value={editingItem.organizer || ''} onChange={(e) => setEditingItem({ ...editingItem, organizer: e.target.value })} style={inputStyle} required />
                    </div>
                    <div>
                      <label style={labelStyle}>Period / Year</label>
                      <input type="text" value={editingItem.period || ''} onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })} style={inputStyle} placeholder="2023" required />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.5fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={labelStyle}>Achievement / Award Rank</label>
                      <input type="text" value={editingItem.achievement || ''} onChange={(e) => setEditingItem({ ...editingItem, achievement: e.target.value })} style={inputStyle} placeholder="Winner / 1st Place" required />
                    </div>
                    <div>
                      <label style={labelStyle}>Display Order</label>
                      <input type="number" value={editingItem.order ?? 0} onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value) || 0 })} style={inputStyle} />
                    </div>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Problem Statement</label>
                    <textarea rows="3" value={editingItem.problemStatement || ''} onChange={(e) => setEditingItem({ ...editingItem, problemStatement: e.target.value })} style={textareaStyle}></textarea>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Technical Solution Build</label>
                    <textarea rows="3" value={editingItem.solution || ''} onChange={(e) => setEditingItem({ ...editingItem, solution: e.target.value })} style={textareaStyle}></textarea>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                    <div>
                      <label style={labelStyle}>Technologies Used (comma-separated)</label>
                      <input 
                        type="text" 
                        value={editingItem.technologies ? editingItem.technologies.join(', ') : ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} 
                        style={inputStyle} 
                        placeholder="React, Flask, Socket.io"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Project Link (GitHub / Devpost)</label>
                      <input type="text" value={editingItem.projectLink || ''} onChange={(e) => setEditingItem({ ...editingItem, projectLink: e.target.value })} style={inputStyle} />
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" onClick={() => { setIsModalOpen(false); setEditingItem(null); }} style={{
                  background: 'rgba(255,255,255,0.04)',
                  color: '#e8e8f0',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 18px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}>Cancel</button>
                <button type="submit" className="btn-primary-sm" style={{ border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW CONTACT MESSAGE MODAL */}
      {viewingMessage && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            background: '#0c0c1e',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '30px',
            width: '100%',
            maxWidth: '550px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>Inquiry Details</h3>
                <span style={{ fontSize: '0.75rem', color: '#9090a8' }}>
                  {new Date(viewingMessage.createdAt).toLocaleString()}
                </span>
              </div>
              <button onClick={() => setViewingMessage(null)} style={{ background: 'transparent', border: 'none', color: '#9090a8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.75rem', color: '#9090a8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Sender</div>
              <div style={{ fontWeight: '600', fontSize: '1rem' }}>{viewingMessage.name}</div>
              <a href={`mailto:${viewingMessage.email}`} style={{ color: '#00d4ff', fontSize: '0.85rem', textDecoration: 'none' }}>{viewingMessage.email}</a>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.75rem', color: '#9090a8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Subject</div>
              <div style={{ fontWeight: '500' }}>{viewingMessage.subject}</div>
            </div>

            <div style={{ 
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
              color: '#e8e8f0'
            }}>
              {viewingMessage.message}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                type="button" 
                onClick={() => { handleToggleRead(viewingMessage._id); setViewingMessage(null); }} 
                style={{
                  background: viewingMessage.isRead ? 'rgba(255,255,255,0.04)' : 'rgba(0, 255, 170, 0.1)',
                  color: viewingMessage.isRead ? '#e8e8f0' : '#00ffaa',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 18px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Mark as {viewingMessage.isRead ? 'Unread' : 'Read'}
              </button>
              <button 
                type="button" 
                onClick={() => { handleDeleteItem(viewingMessage._id, 'contact'); setViewingMessage(null); }} 
                style={{
                  background: 'rgba(255, 107, 157, 0.1)',
                  color: '#ff6b9d',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 18px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Delete Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Styling Constants for Dashboard Inputs
const labelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  color: '#9090a8',
  marginBottom: '6px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const inputStyle = {
  width: '100%',
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  padding: '10px 14px',
  color: '#e8e8f0',
  fontSize: '0.9rem',
  outline: 'none',
  boxSizing: 'border-box'
};

const textareaStyle = {
  width: '100%',
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  padding: '12px 14px',
  color: '#e8e8f0',
  fontSize: '0.9rem',
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  resize: 'vertical'
};

const selectStyle = {
  width: '100%',
  background: '#0c0c1e',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  padding: '10px 14px',
  color: '#e8e8f0',
  fontSize: '0.9rem',
  outline: 'none',
  boxSizing: 'border-box'
};

const iconBtnStyle = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.06)',
  color: '#9090a8',
  borderRadius: '6px',
  padding: '6px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease'
};

const smallIconBtnStyle = {
  background: 'transparent',
  border: 'none',
  color: '#9090a8',
  padding: '4px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease'
};
