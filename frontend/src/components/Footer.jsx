import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { DEVELOPERS_DATA, RECRUITMENT_FORM_URL } from '../constants';

const Footer = () => {
  const [activeDev, setActiveDev] = useState(null);

  return (
    <footer className="border-top border-secondary border-opacity-25 pt-5 pb-4 mt-5 position-relative overflow-hidden" style={{ background: '#02050e' }}>
      
      {/* Subtle Glow */}
      <div 
        className="position-absolute top-0 start-50 translate-middle-x" 
        style={{
          width: '500px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      ></div>

      <div className="container position-relative z-1">
        <div className="row g-4 pb-5 border-bottom border-secondary border-opacity-25">
          
          {/* Col 1: Brand & Bio */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div 
                className="p-1 rounded-2 d-flex align-items-center justify-content-center"
                style={{
                  background: 'linear-gradient(135deg, #2563eb, #38bdf8)',
                  width: '36px',
                  height: '36px'
                }}
              >
                <img src="/acm-logo.svg" alt="ACM Logo" width="22" height="22" />
              </div>
              <span className="fw-bold text-white font-heading" style={{ fontSize: '1rem', letterSpacing: '0.03em' }}>
                MITS ACM STUDENT CHAPTER
              </span>
            </div>
            
            <p className="text-secondary small mb-4 lh-base" style={{ maxWidth: '340px' }}>
              Empowering the next generation of computing professionals at Madhav Institute of Technology & Science, Gwalior. Code. Create. Connect.
            </p>

            <div className="d-flex gap-2">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-dark border-secondary border-opacity-50 btn-sm rounded-circle d-flex align-items-center justify-content-center text-info"
                style={{ width: '36px', height: '36px' }}
                aria-label="LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-dark border-secondary border-opacity-50 btn-sm rounded-circle d-flex align-items-center justify-content-center text-light"
                style={{ width: '36px', height: '36px' }}
                aria-label="GitHub"
              >
                <i className="bi bi-github"></i>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-dark border-secondary border-opacity-50 btn-sm rounded-circle d-flex align-items-center justify-content-center text-danger"
                style={{ width: '36px', height: '36px' }}
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-dark border-secondary border-opacity-50 btn-sm rounded-circle d-flex align-items-center justify-content-center text-info"
                style={{ width: '36px', height: '36px' }}
                aria-label="Twitter"
              >
                <i className="bi bi-twitter-x"></i>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="text-white text-uppercase font-heading fw-bold mb-3 small" style={{ letterSpacing: '0.08em' }}>
              Quick Links
            </h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 text-secondary">
              <li><Link to="/" className="text-decoration-none text-secondary">Home</Link></li>
              <li><Link to="/about" className="text-decoration-none text-secondary">About Chapter</Link></li>
              <li><Link to="/team" className="text-decoration-none text-secondary">Our Team</Link></li>
              <li><Link to="/events" className="text-decoration-none text-secondary">Events & Hackathons</Link></li>
              <li><Link to="/learning-hub" className="text-decoration-none text-secondary">Learning Hub</Link></li>
              <li><Link to="/achievements" className="text-decoration-none text-secondary">Achievements</Link></li>
            </ul>
          </div>

          {/* Col 3: Community & Official Form */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="text-white text-uppercase font-heading fw-bold mb-3 small" style={{ letterSpacing: '0.08em' }}>
              Community
            </h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 text-secondary">
              <li><Link to="/gallery" className="text-decoration-none text-secondary">Photo Gallery</Link></li>
              <li>
                <a 
                  href={RECRUITMENT_FORM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none text-info fw-semibold"
                >
                  Join Us (Form) <i className="bi bi-box-arrow-up-right small ms-1" style={{ fontSize: '0.7rem' }}></i>
                </a>
              </li>
              <li><Link to="/contact" className="text-decoration-none text-secondary">Contact & FAQs</Link></li>
              <li>
                <a href="https://www.acm.org" target="_blank" rel="noreferrer" className="text-decoration-none text-secondary">
                  ACM International <i className="bi bi-box-arrow-up-right small ms-1"></i>
                </a>
              </li>
              <li>
                <a href="https://india.acm.org" target="_blank" rel="noreferrer" className="text-decoration-none text-secondary">
                  ACM India <i className="bi bi-box-arrow-up-right small ms-1"></i>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Coordinates */}
          <div className="col-12 col-md-6 col-lg-4">
            <h6 className="text-white text-uppercase font-heading fw-bold mb-3 small" style={{ letterSpacing: '0.08em' }}>
              Institute Campus
            </h6>
            <div className="small text-secondary mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-geo-alt-fill text-info mt-1"></i>
              <span>Madhav Institute of Technology & Science, Race Course Road, Gola ka Mandir, Gwalior, M.P. 474005</span>
            </div>
            <div className="small text-secondary d-flex align-items-center gap-2">
              <i className="bi bi-envelope-at text-info"></i>
              <a href="mailto:acm@mitsgwalior.in" className="text-secondary text-decoration-none">acm@mitsgwalior.in</a>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Mandatory Developer Credits with Interactive Popups */}
        <div className="row align-items-center justify-content-between pt-4 gy-3">
          
          {/* Copyright */}
          <div className="col-12 col-md-auto text-center text-md-start text-secondary small">
            &copy; {new Date().getFullYear()} <strong className="text-light">MITS ACM STUDENT CHAPTER</strong>. All rights reserved.
          </div>

          {/* MANDATORY DEVELOPER CREDITS: Exactly "Aditya Ahamana, Mritunjay Dubey, Ronak Gupta" in exact order */}
          <div className="col-12 col-md-auto text-center text-md-end">
            <div 
              className="d-inline-flex flex-wrap align-items-center justify-content-center gap-2 small px-3 py-2 rounded-3 border border-secondary border-opacity-25"
              style={{ background: 'rgba(15, 23, 42, 0.7)' }}
            >
              <span className="text-secondary small">Developed by</span>
              {DEVELOPERS_DATA.map((dev, idx) => (
                <React.Fragment key={dev.name}>
                  <button
                    type="button"
                    onClick={() => setActiveDev(dev)}
                    className="btn btn-link p-0 text-info fw-semibold text-decoration-none dev-name-btn"
                    title={`View ${dev.name}'s Profile Card`}
                  >
                    {dev.name}
                  </button>
                  {idx < DEVELOPERS_DATA.length - 1 && (
                    <span className="text-secondary opacity-50">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* DEVELOPER PROFILE POPUP MODAL */}
      {activeDev && createPortal(
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(10px)', zIndex: 10000 }}
          onClick={() => setActiveDev(null)}
        >
          <div 
            className="acm-card p-4 p-md-5 position-relative shadow-2xl border-info border-opacity-50"
            style={{ maxWidth: '480px', width: '100%', background: 'rgba(11, 19, 38, 0.95)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveDev(null)}
              className="btn btn-dark position-absolute top-0 end-0 m-3 rounded-circle p-2 d-flex align-items-center justify-content-center border-secondary border-opacity-50"
              style={{ width: '36px', height: '36px' }}
              aria-label="Close Profile"
            >
              <i className="bi bi-x-lg text-secondary"></i>
            </button>

            {/* Profile Content */}
            <div className="text-center mb-4">
              <div className="position-relative d-inline-block mb-3">
                <img 
                  src={activeDev.avatar} 
                  alt={activeDev.name} 
                  className="rounded-circle object-fit-cover border border-info border-2 shadow-lg"
                  style={{ width: '90px', height: '90px' }}
                />
                <span className="position-absolute bottom-0 end-0 badge bg-primary rounded-circle p-2 border border-dark">
                  <i className="bi bi-code-slash text-white" style={{ fontSize: '0.8rem' }}></i>
                </span>
              </div>
              <h4 className="text-white font-heading fw-bold mb-1">{activeDev.name}</h4>
              <div className="text-gradient-acm small fw-bold mb-1">{activeDev.role}</div>
              <div className="text-secondary small" style={{ fontSize: '0.78rem' }}>{activeDev.branch}</div>
            </div>

            <p className="text-light small text-center leading-relaxed mb-4" style={{ fontSize: '0.86rem' }}>
              {activeDev.bio}
            </p>

            {/* Skills Pills */}
            <div className="d-flex flex-wrap justify-content-center gap-1 mb-4">
              {activeDev.skills.map((skill, i) => (
                <span key={i} className="badge bg-dark border border-secondary border-opacity-50 text-info" style={{ fontSize: '0.72rem' }}>
                  {skill}
                </span>
              ))}
            </div>

            {/* Social Buttons */}
            <div className="d-flex gap-2 justify-content-center pt-3 border-top border-secondary border-opacity-25">
              {activeDev.linkedin && (
                <a
                  href={activeDev.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-acm-primary btn-sm px-3 d-flex align-items-center gap-2"
                >
                  <i className="bi bi-linkedin"></i> LinkedIn Profile
                </a>
              )}
              {activeDev.github && (
                <a
                  href={activeDev.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-acm-outline btn-sm px-3 d-flex align-items-center gap-2 text-light"
                >
                  <i className="bi bi-github"></i> GitHub Profile
                </a>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </footer>
  );
};

export default Footer;
