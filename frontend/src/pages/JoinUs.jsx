import React, { useState } from 'react';
import { api } from '../services/api';

const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    college_email: '',
    course_year: '',
    technical_skills: '',
    areas_of_interest: '',
    preferred_team: 'Technical & Dev Team',
    intro_statement: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const teamWings = [
    'Technical & Dev Team',
    'DSA & Competitive Programming Team',
    'AI/ML & Data Science Team',
    'Creative & Design Team',
    'PR & Social Media Marketing Team',
    'Event Management & Logistics Team'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await api.submitJoinApplication(formData);
      if (res.success) {
        setSuccessMsg(res.message);
        setFormData({
          name: '',
          college_email: '',
          course_year: '',
          technical_skills: '',
          areas_of_interest: '',
          preferred_team: 'Technical & Dev Team',
          intro_statement: ''
        });
      } else {
        setErrorMsg(res.message || 'Application submission failed.');
      }
    } catch (err) {
      setErrorMsg('Network error. Unable to connect to backend server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      {/* Title Header */}
      <div className="text-center mx-auto mb-5" style={{ maxWidth: '720px' }}>
        <span className="badge-acm mb-3 d-inline-block">Recruitment & Volunteer Wing</span>
        <h1 className="display-4 fw-bolder text-white font-heading mb-3">
          Join <span className="text-gradient-acm">MITS ACM STUDENT CHAPTER</span>
        </h1>
        <p className="text-secondary lead fs-6">
          Be a part of student leadership, organize technical masterclasses, and build innovative platforms at MITS Gwalior.
        </p>
      </div>

      {/* Distinction Alert - Mandatory */}
      <div className="acm-card p-4 mb-5 border-info border-opacity-25" style={{ background: 'rgba(14, 165, 233, 0.08)' }}>
        <div className="d-flex align-items-start gap-3">
          <i className="bi bi-shield-lock-fill text-info fs-4 mt-n1"></i>
          <div className="small text-light">
            <strong className="text-info d-block mb-1">Membership Distinction Notice:</strong>
            This application registers your interest in volunteering, leadership, or membership within the <strong>MITS ACM STUDENT CHAPTER</strong> at Madhav Institute of Technology & Science, Gwalior. It does not automatically grant official paid international ACM membership.
          </div>
        </div>
      </div>

      <div className="row g-5">
        {/* Left Column: Why Join Us */}
        <div className="col-12 col-lg-6">
          <h3 className="text-white font-heading fw-bold mb-4">Why Join Our Chapter?</h3>
          <p className="text-secondary small leading-relaxed mb-4">
            MITS ACM Student Chapter offers a peer-powered learning ecosystem where you gain hands-on experience, learn modern tech stacks, and make lifelong engineering connections.
          </p>

          <div className="d-flex flex-column gap-3 mb-4">
            <div className="acm-card p-4 d-flex align-items-start gap-3">
              <div className="p-2 rounded-3 bg-primary bg-opacity-10 text-primary fs-4 mt-n1">
                <i className="bi bi-code-square"></i>
              </div>
              <div>
                <h5 className="text-white font-heading fw-bold mb-1">Technical Projects & Mentorship</h5>
                <p className="text-secondary small mb-0">Build full-stack applications, AI models, and contribute to chapter projects under senior guidance.</p>
              </div>
            </div>

            <div className="acm-card p-4 d-flex align-items-start gap-3">
              <div className="p-2 rounded-3 bg-info bg-opacity-10 text-info fs-4 mt-n1">
                <i className="bi bi-trophy"></i>
              </div>
              <div>
                <h5 className="text-white font-heading fw-bold mb-1">Hackathons & National Showcases</h5>
                <p className="text-secondary small mb-0">Represent MITS Gwalior in regional and national hackathons with chapter support and team collaboration.</p>
              </div>
            </div>

            <div className="acm-card p-4 d-flex align-items-start gap-3">
              <div className="p-2 rounded-3 bg-purple bg-opacity-10 text-warning fs-4 mt-n1">
                <i className="bi bi-people"></i>
              </div>
              <div>
                <h5 className="text-white font-heading fw-bold mb-1">Event Management & Leadership</h5>
                <p className="text-secondary small mb-0">Gain invaluable experience leading logistics, sponsorships, UI/UX design, and social media campaigns.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Application Form */}
        <div className="col-12 col-lg-6">
          <div className="acm-card p-4 p-md-5">
            <h4 className="text-white font-heading fw-bold mb-1">Recruitment Application</h4>
            <p className="text-secondary small mb-4">Please submit your institutional details below.</p>

            {successMsg ? (
              <div className="alert alert-success text-center p-4">
                <i className="bi bi-check-circle-fill display-5 text-success d-block mb-3"></i>
                <h5 className="fw-bold">Application Received!</h5>
                <p className="small mb-0">{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 small">
                {errorMsg && (
                  <div className="alert alert-danger py-2 small mb-0">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="form-label text-secondary small mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aditya Sharma"
                    className="form-control form-control-sm bg-dark border-secondary border-opacity-50 text-light"
                  />
                </div>

                <div>
                  <label className="form-label text-secondary small mb-1">College Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.college_email}
                    onChange={(e) => setFormData({ ...formData, college_email: e.target.value })}
                    placeholder="enrollment@mitsgwalior.in"
                    className="form-control form-control-sm bg-dark border-secondary border-opacity-50 text-light"
                  />
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label text-secondary small mb-1">Course & Year *</label>
                    <input
                      type="text"
                      required
                      value={formData.course_year}
                      onChange={(e) => setFormData({ ...formData, course_year: e.target.value })}
                      placeholder="B.Tech CSE - 2nd Year"
                      className="form-control form-control-sm bg-dark border-secondary border-opacity-50 text-light"
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label text-secondary small mb-1">Preferred Team *</label>
                    <select
                      value={formData.preferred_team}
                      onChange={(e) => setFormData({ ...formData, preferred_team: e.target.value })}
                      className="form-select form-select-sm bg-dark border-secondary border-opacity-50 text-light"
                    >
                      {teamWings.map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label text-secondary small mb-1">Technical Skills & Tools</label>
                  <input
                    type="text"
                    value={formData.technical_skills}
                    onChange={(e) => setFormData({ ...formData, technical_skills: e.target.value })}
                    placeholder="e.g. C++, Python, React, Figma, SQL"
                    className="form-control form-control-sm bg-dark border-secondary border-opacity-50 text-light"
                  />
                </div>

                <div>
                  <label className="form-label text-secondary small mb-1">Areas of Interest</label>
                  <input
                    type="text"
                    value={formData.areas_of_interest}
                    onChange={(e) => setFormData({ ...formData, areas_of_interest: e.target.value })}
                    placeholder="e.g. Competitive Programming, App Dev, UI Design"
                    className="form-control form-control-sm bg-dark border-secondary border-opacity-50 text-light"
                  />
                </div>

                <div>
                  <label className="form-label text-secondary small mb-1">Short Statement / Why Join? *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.intro_statement}
                    onChange={(e) => setFormData({ ...formData, intro_statement: e.target.value })}
                    placeholder="Tell us what excites you about contributing to MITS ACM..."
                    className="form-control form-control-sm bg-dark border-secondary border-opacity-50 text-light"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-acm-primary w-100 btn-sm mt-2"
                >
                  {submitting ? 'Submitting Application...' : 'Submit Membership Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
