import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  const [navExpanded, setNavExpanded] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Our Team', path: '/team' },
    { name: 'Events', path: '/events' },
    { name: 'Learning Hub', path: '/learning-hub' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Join Us', path: '/join-us' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="navbar navbar-expand-lg acm-navbar sticky-top py-3">
      <div className="container">
        
        {/* Brand Logo & Official Chapter Name */}
        <Link to="/" className="navbar-brand d-flex items-center gap-2 text-decoration-none me-4">
          <div 
            className="p-1 rounded-3 d-flex align-items-center justify-content-center"
            style={{
              background: 'linear-gradient(135deg, #2563eb, #38bdf8, #7c3aed)',
              width: '42px',
              height: '42px'
            }}
          >
            <div className="bg-dark rounded-2 w-100 h-100 d-flex align-items-center justify-content-center">
              <img src="/acm-logo.svg" alt="ACM Logo" width="26" height="26" />
            </div>
          </div>
          <div className="d-flex flex-column">
            <span className="fw-bolder text-white font-heading lh-1" style={{ fontSize: '1.05rem', letterSpacing: '0.04em' }}>
              MITS ACM STUDENT CHAPTER
            </span>
            <span className="text-secondary" style={{ fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Madhav Institute of Technology & Science
            </span>
          </div>
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          className="navbar-toggler border-0 text-white p-2"
          type="button"
          onClick={() => setNavExpanded(!navExpanded)}
          aria-controls="acmNavbarNav"
          aria-expanded={navExpanded}
          aria-label="Toggle navigation"
          style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '0.5rem' }}
        >
          <i className={`bi ${navExpanded ? 'bi-x-lg' : 'bi-list'} fs-4 text-info`}></i>
        </button>

        {/* Collapsible Nav Links */}
        <div className={`collapse navbar-collapse ${navExpanded ? 'show mt-3 mt-lg-0' : ''}`} id="acmNavbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1 mb-2 mb-lg-0">
            {navLinks.map((link) => (
              <li key={link.name} className="nav-item">
                <NavLink
                  to={link.path}
                  onClick={() => setNavExpanded(false)}
                  className={({ isActive }) =>
                    `nav-link acm-nav-link ${isActive ? 'active fw-bold' : ''}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-2 ms-lg-3 mt-3 mt-lg-0">
            <Link
              to="/join-us"
              onClick={() => setNavExpanded(false)}
              className="btn btn-acm-primary btn-sm px-3 py-2 w-100 w-lg-auto text-center"
            >
              <i className="bi bi-person-plus me-1"></i> Join Us
            </Link>

            <Link
              to="/admin"
              onClick={() => setNavExpanded(false)}
              className="btn btn-dark border-secondary btn-sm p-2 d-none d-lg-inline-flex"
              title="Admin Portal"
            >
              <i className="bi bi-shield-lock text-info"></i>
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
