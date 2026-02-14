import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Update active section based on scroll
      const sections = ['home', 'problem', 'solution', 'how-it-works', 'features', 'tech-stack', 'use-cases'];
      for (let id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  const navLinks = [
    { id: 'problem',      label: 'Problem'  },
    { id: 'solution',     label: 'Solution' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'features',     label: 'Features' },
    { id: 'use-cases',    label: 'Use Cases' },
  ];

  return (
    <nav className={`navbar${scrolled ? ' small' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          {/* Brand */}
          <a href="#home" className="navbar-brand" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>
            <div className="brand-logo">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            Briefly<span className="brand-ai">AI</span>
          </a>

          {/* Desktop Nav */}
          <ul className="navbar-nav">
            {navLinks.map(link => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`nav-link${activeSection === link.id ? ' active' : ''}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/login" className="nav-link nav-cta">Login</Link>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <i className={`fa fa-${mobileOpen ? 'times' : 'bars'}`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="nav-link"
              onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
            >
              {link.label}
            </a>
          ))}
          <Link to="/login" className="nav-link" onClick={() => setMobileOpen(false)}>Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
