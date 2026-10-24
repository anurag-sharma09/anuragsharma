import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav id="navbar" className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">
        <span className="logo-text">AS<span class="logo-dot">.</span></span>
      </div>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`} id="nav-links">
        <li>
          <a href="#hero" className="nav-link" onClick={(e) => handleLinkClick(e, 'hero')}>Home</a>
        </li>
        <li>
          <a href="#about" className="nav-link" onClick={(e) => handleLinkClick(e, 'about')}>About</a>
        </li>
        <li>
          <a href="#skills" className="nav-link" onClick={(e) => handleLinkClick(e, 'skills')}>Skills</a>
        </li>
        <li>
          <a href="#projects" className="nav-link" onClick={(e) => handleLinkClick(e, 'projects')}>Projects</a>
        </li>
        <li>
          <a href="#experience" className="nav-link" onClick={(e) => handleLinkClick(e, 'experience')}>Experience</a>
        </li>
        <li>
          <a href="#contact" className="nav-link" onClick={(e) => handleLinkClick(e, 'contact')}>Contact</a>
        </li>
      </ul>
      <a href="#contact" className="nav-cta btn-primary" onClick={(e) => handleLinkClick(e, 'contact')}>Hire Me</a>
      <button 
        className={`hamburger ${isOpen ? 'open' : ''}`} 
        id="hamburger" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
}
