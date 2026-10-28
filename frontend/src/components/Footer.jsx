import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
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
              <li><Link to="/" className="text-decoration-none text-secondary text-hover-info">Home</Link></li>
              <li><Link to="/about" className="text-decoration-none text-secondary text-hover-info">About Chapter</Link></li>
              <li><Link to="/team" className="text-decoration-none text-secondary text-hover-info">Our Team</Link></li>
              <li><Link to="/events" className="text-decoration-none text-secondary text-hover-info">Events & Hackathons</Link></li>
              <li><Link to="/learning-hub" className="text-decoration-none text-secondary text-hover-info">Learning Hub</Link></li>
              <li><Link to="/achievements" className="text-decoration-none text-secondary text-hover-info">Achievements</Link></li>
            </ul>
          </div>

          {/* Col 3: Community & Gallery */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="text-white text-uppercase font-heading fw-bold mb-3 small" style={{ letterSpacing: '0.08em' }}>
              Community
            </h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 text-secondary">
              <li><Link to="/gallery" className="text-decoration-none text-secondary">Photo Gallery</Link></li>
              <li><Link to="/join-us" className="text-decoration-none text-secondary">Join Us / Volunteer</Link></li>
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

        {/* BOTTOM SECTION: Mandatory Developer Credits & Copyright */}
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
              <span className="text-info fw-semibold">Aditya Ahamana</span>
              <span className="text-secondary opacity-50">•</span>
              <span className="text-info fw-semibold">Mritunjay Dubey</span>
              <span className="text-secondary opacity-50">•</span>
              <span className="text-info fw-semibold">Ronak Gupta</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
