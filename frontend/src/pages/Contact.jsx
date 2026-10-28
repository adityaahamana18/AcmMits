import React, { useState } from 'react';
import { api } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await api.submitContact(formData);
      if (res.success) {
        setSuccessMsg(res.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMsg(res.message || 'Failed to submit contact message.');
      }
    } catch (err) {
      setErrorMsg('Network error. Unable to reach backend server.');
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'Who can participate in MITS ACM Student Chapter events?',
      a: 'All students of Madhav Institute of Technology & Science, Gwalior (as well as students from other colleges for national hackathons) are eligible to participate.'
    },
    {
      q: 'Is there a membership fee for joining the student chapter?',
      a: 'Local participation in the student chapter workshops, talks, and community discussions is completely free of charge.'
    },
    {
      q: 'How can I propose a workshop or speak at an ACM event?',
      a: 'Feel free to submit your proposal via the contact form or reach out directly to the chapter executive board.'
    }
  ];

  return (
    <div className="container py-5">
      {/* Title Header */}
      <div className="text-center mx-auto mb-5" style={{ maxWidth: '720px' }}>
        <span className="badge-acm mb-3 d-inline-block">Connect With Us</span>
        <h1 className="display-4 fw-bolder text-white font-heading mb-3">
          Contact <span className="text-gradient-acm">Our Chapter</span>
        </h1>
        <p className="text-secondary lead fs-6">
          Reach out for collaborations, hackathon inquiries, workshop proposals, or community partnerships.
        </p>
      </div>

      <div className="row g-5 mb-5">
        {/* Left Column: Campus Coordinates & Info */}
        <div className="col-12 col-lg-6">
          <div className="acm-card p-4 p-md-5 h-100 d-flex flex-column justify-content-between">
            <div>
              <h4 className="text-white font-heading fw-bold mb-4">Official Chapter Headquarters</h4>
              
              <div className="d-flex flex-column gap-3 small text-secondary mb-4">
                <div className="d-flex align-items-start gap-3">
                  <i className="bi bi-geo-alt-fill text-info fs-5 mt-n1"></i>
                  <div>
                    <strong className="text-white d-block">Campus Location</strong>
                    <span>Madhav Institute of Technology & Science (MITS)<br />Race Course Road, Gola ka Mandir, Gwalior, Madhya Pradesh 474005</span>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3 pt-3 border-top border-secondary border-opacity-25">
                  <i className="bi bi-envelope-at-fill text-info fs-5 mt-n1"></i>
                  <div>
                    <strong className="text-white d-block">Official Email</strong>
                    <a href="mailto:acm@mitsgwalior.in" className="text-info text-decoration-none">acm@mitsgwalior.in</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Link Box */}
            <div className="p-4 rounded-3 bg-dark border border-secondary border-opacity-50 text-center">
              <i className="bi bi-map display-6 text-info mb-2 d-block"></i>
              <span className="small text-secondary d-block mb-3">Visit us on the historic MITS Gwalior campus</span>
              <a
                href="https://maps.google.com/?q=Madhav+Institute+of+Technology+and+Science+Gwalior"
                target="_blank"
                rel="noreferrer"
                className="btn btn-acm-outline btn-sm"
              >
                Open in Google Maps <i className="bi bi-box-arrow-up-right ms-1"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="col-12 col-lg-6">
          <div className="acm-card p-4 p-md-5">
            <h4 className="text-white font-heading fw-bold mb-1">Send a Message</h4>
            <p className="text-secondary small mb-4">Inquiries are reviewed by chapter faculty and executive officers.</p>

            {successMsg ? (
              <div className="alert alert-success text-center p-4">
                <i className="bi bi-check-circle-fill display-5 text-success d-block mb-3"></i>
                <h5 className="fw-bold">Message Dispatched!</h5>
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
                  <label className="form-label text-secondary small mb-1">Your Full Name *</label>
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
                  <label className="form-label text-secondary small mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="form-control form-control-sm bg-dark border-secondary border-opacity-50 text-light"
                  />
                </div>

                <div>
                  <label className="form-label text-secondary small mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Hackathon Mentorship / Partnership Proposal"
                    className="form-control form-control-sm bg-dark border-secondary border-opacity-50 text-light"
                  />
                </div>

                <div>
                  <label className="form-label text-secondary small mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type your message here..."
                    className="form-control form-control-sm bg-dark border-secondary border-opacity-50 text-light"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-acm-primary w-100 btn-sm mt-2"
                >
                  {submitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="py-4 border-top border-secondary border-opacity-25">
        <h4 className="text-center text-white font-heading fw-bold mb-4">Frequently Asked Questions</h4>
        <div className="row g-3 justify-content-center">
          {faqs.map((f, idx) => (
            <div key={idx} className="col-12 col-md-10">
              <div className="acm-card p-4">
                <h6 className="text-white font-heading fw-bold mb-2">
                  <i className="bi bi-question-circle text-info me-2"></i> {f.q}
                </h6>
                <p className="text-secondary small mb-0 ps-4 lh-base">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
