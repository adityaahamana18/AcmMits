import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const milestones = [
    { year: '2023', title: 'Chapter Inception', desc: 'MITS ACM STUDENT CHAPTER was founded under the Department of Computer Science & Engineering at MITS Gwalior.' },
    { year: '2024', title: 'First Flagship Hackathon', desc: 'Organized national coding sprint engaging over 350+ passionate students across engineering institutes.' },
    { year: '2025', title: 'Learning Hub & Mentorship', desc: 'Rolled out specialized technical tracks for DSA, AI/ML, Cloud Infrastructure, and Open-Source contributions.' },
    { year: '2026', title: 'Innovation Ecosystem', desc: 'Expanding industry collaborations, alumni talks, research papers, and national hackathon representation.' },
  ];

  return (
    <div className="container py-5">
      {/* Title Header */}
      <div className="text-center mx-auto mb-5" style={{ maxWidth: '720px' }}>
        <span className="badge-acm mb-3 d-inline-block">About Us</span>
        <h1 className="display-4 fw-bolder text-white font-heading mb-3">
          About <span className="text-gradient-acm">MITS ACM STUDENT CHAPTER</span>
        </h1>
        <p className="text-secondary lead fs-6">
          Building a vibrant, inclusive technical community at Madhav Institute of Technology & Science, Gwalior.
        </p>
      </div>

      {/* Distinction Alert - Mandatory */}
      <div className="acm-card p-4 mb-5 border-info border-opacity-25" style={{ background: 'rgba(14, 165, 233, 0.08)' }}>
        <div className="d-flex align-items-start gap-3">
          <i className="bi bi-shield-exclamation text-info fs-4 mt-n1"></i>
          <div className="small text-light">
            <strong className="text-info d-block mb-1">Official Clarification:</strong>
            Participation and membership in <strong>MITS ACM STUDENT CHAPTER</strong> represent involvement in the local university student chapter at Madhav Institute of Technology & Science (MITS), Gwalior. This is distinct from, and independent of, obtaining individual professional membership from ACM International (Association for Computing Machinery).
          </div>
        </div>
      </div>

      {/* ACM International vs MITS Chapter */}
      <div className="row g-4 mb-5">
        <div className="col-12 col-md-6">
          <div className="acm-card p-4 p-lg-5 h-100">
            <div className="p-3 rounded-3 bg-primary bg-opacity-10 text-primary d-inline-block fs-3 mb-3">
              <i className="bi bi-globe"></i>
            </div>
            <h3 className="text-white font-heading fw-bold mb-3">ACM International</h3>
            <p className="text-secondary small leading-relaxed mb-4">
              The Association for Computing Machinery is the world's largest educational and scientific computing society, uniting educators, researchers, and professionals to inspire dialogue, share resources, and address computing challenges.
            </p>
            <a href="https://www.acm.org" target="_blank" rel="noreferrer" className="btn btn-acm-outline btn-sm">
              Visit ACM.org <i className="bi bi-box-arrow-up-right ms-1"></i>
            </a>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="acm-card p-4 p-lg-5 h-100">
            <div className="p-3 rounded-3 bg-info bg-opacity-10 text-info d-inline-block fs-3 mb-3">
              <i className="bi bi-mortarboard"></i>
            </div>
            <h3 className="text-white font-heading fw-bold mb-3">MITS ACM STUDENT CHAPTER</h3>
            <p className="text-secondary small leading-relaxed mb-4">
              Established at Madhav Institute of Technology & Science, Gwalior (M.P.), our student chapter provides undergraduate engineers with workshops, technical mentoring, hackathons, and research guidance to bridge academia with modern industry demands.
            </p>
            <Link to="/team" className="btn btn-acm-primary btn-sm">
              Meet Chapter Coordinators <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="row g-4 mb-5">
        <div className="col-12 col-md-6">
          <div className="acm-card p-4 p-lg-5 h-100 border-primary border-opacity-25">
            <h4 className="text-info font-heading fw-bold mb-3">Our Mission</h4>
            <p className="text-secondary small mb-0 lh-lg">
              To empower students with premier computing education, hands-on software development experience, and competitive coding training, fostering an environment where innovation and technical inquiry can flourish without limits.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="acm-card p-4 p-lg-5 h-100 border-info border-opacity-25">
            <h4 className="text-gradient-acm font-heading fw-bold mb-3">Our Vision</h4>
            <p className="text-secondary small mb-0 lh-lg">
              To establish MITS Gwalior as a recognized hub of engineering leadership, producing computer scientists, developers, and founders capable of solving global challenges through ethical, sustainable technology.
            </p>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="py-4">
        <h3 className="text-center text-white font-heading fw-bold mb-5">
          Chapter Timeline & Milestones
        </h3>
        <div className="row g-4">
          {milestones.map((item, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-lg-3">
              <div className="acm-card p-4 h-100">
                <span className="badge bg-primary text-white py-1 px-2 mb-3" style={{ fontSize: '0.75rem' }}>{item.year}</span>
                <h5 className="text-white font-heading fw-bold mb-2">{item.title}</h5>
                <p className="text-secondary small mb-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
