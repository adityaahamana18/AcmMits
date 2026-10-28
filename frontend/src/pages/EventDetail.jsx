import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Registration Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: 'Madhav Institute of Technology & Science, Gwalior',
    course_year: '',
    phone: '',
    team_name: '',
    team_members_info: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [regSuccess, setRegSuccess] = useState(null);
  const [regError, setRegError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.getEventDetail(id);
        if (res.success) {
          setEvent(res.data);
        }
      } catch (err) {
        console.error('Failed to load event details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setRegSuccess(null);
    setRegError(null);

    try {
      const res = await api.registerEvent(id, formData);
      if (res.success) {
        setRegSuccess(res.message);
        setFormData({
          name: '',
          email: '',
          college: 'Madhav Institute of Technology & Science, Gwalior',
          course_year: '',
          phone: '',
          team_name: '',
          team_members_info: ''
        });
      } else {
        setRegError(res.message || 'Registration failed');
      }
    } catch (err) {
      setRegError('Network error or server unavailable.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center text-secondary">
        <div className="spinner-border text-info" role="status"></div>
        <p className="mt-2 small">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container py-5 text-center">
        <h3 className="text-white">Event Not Found</h3>
        <Link to="/events" className="btn btn-acm-outline mt-3 btn-sm">Return to Events</Link>
      </div>
    );
  }

  const isRegistrationClosed = ['Completed', 'Registration Closed', 'Cancelled'].includes(event.status);

  return (
    <div className="container py-5">
      <Link to="/events" className="btn btn-acm-outline btn-sm mb-4">
        <i className="bi bi-arrow-left me-1"></i> Back to Events Catalog
      </Link>

      <div className="row g-5">
        {/* Left Column: Event Poster, Agenda, Rules */}
        <div className="col-12 col-lg-8">
          <div className="acm-card overflow-hidden mb-4">
            <div className="position-relative" style={{ height: '360px' }}>
              <img
                src={event.poster_url || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80'}
                alt={event.title}
                className="w-100 h-100 object-fit-cover"
              />
              <span className="position-absolute top-0 start-0 m-3 badge bg-primary">
                {event.category}
              </span>
              <span className="position-absolute top-0 end-0 m-3 badge bg-dark border border-secondary">
                Status: {event.status}
              </span>
            </div>

            <div className="p-4 p-md-5">
              <h1 className="display-6 fw-bold text-white font-heading mb-3">{event.title}</h1>
              <p className="text-light lead fs-6 lh-lg mb-4" style={{ whiteSpace: 'pre-line' }}>
                {event.full_description || event.short_description}
              </p>

              {event.schedule_agenda && (
                <div className="p-4 rounded-3 bg-dark border border-secondary border-opacity-50 mb-4">
                  <h5 className="text-info font-heading fw-bold mb-3">Schedule & Agenda</h5>
                  <div className="text-secondary small lh-lg" style={{ whiteSpace: 'pre-line' }}>
                    {event.schedule_agenda}
                  </div>
                </div>
              )}

              {event.eligibility_rules && (
                <div className="p-4 rounded-3 bg-dark border border-secondary border-opacity-50 mb-4">
                  <h5 className="text-info font-heading fw-bold mb-3">Eligibility & Rules</h5>
                  <div className="text-secondary small lh-lg" style={{ whiteSpace: 'pre-line' }}>
                    {event.eligibility_rules}
                  </div>
                </div>
              )}

              {event.results_summary && (
                <div className="p-4 rounded-3 bg-success bg-opacity-10 border border-success border-opacity-25 mb-4">
                  <h5 className="text-success font-heading fw-bold mb-3">Winners & Official Results</h5>
                  <div className="text-light small lh-lg" style={{ whiteSpace: 'pre-line' }}>
                    {event.results_summary}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Overview Box & Registration Form */}
        <div className="col-12 col-lg-4">
          <div className="acm-card p-4 mb-4">
            <h5 className="text-white font-heading fw-bold pb-3 border-bottom border-secondary border-opacity-25 mb-3">
              Event Overview
            </h5>
            <div className="d-flex flex-column gap-3 small text-secondary">
              <div className="d-flex align-items-start gap-3">
                <i className="bi bi-calendar-check text-info fs-5 mt-n1"></i>
                <div>
                  <strong className="text-white d-block">Date & Time</strong>
                  <span>{event.event_date}</span>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3">
                <i className="bi bi-geo-alt text-info fs-5 mt-n1"></i>
                <div>
                  <strong className="text-white d-block">Venue</strong>
                  <span>{event.venue}</span>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3">
                <i className="bi bi-people text-info fs-5 mt-n1"></i>
                <div>
                  <strong className="text-white d-block">Team Size</strong>
                  <span>{event.team_size || 'Individual'}</span>
                </div>
              </div>

              {event.registration_deadline && (
                <div className="d-flex align-items-start gap-3">
                  <i className="bi bi-alarm text-info fs-5 mt-n1"></i>
                  <div>
                    <strong className="text-white d-block">Registration Deadline</strong>
                    <span>{event.registration_deadline}</span>
                  </div>
                </div>
              )}
            </div>

            {event.external_registration_url && (
              <div className="pt-4 mt-3 border-top border-secondary border-opacity-25">
                <a
                  href={event.external_registration_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-acm-primary w-100 btn-sm"
                >
                  Register via Portal <i className="bi bi-box-arrow-up-right ms-1"></i>
                </a>
              </div>
            )}
          </div>

          {/* Internal Registration Form */}
          {(!event.external_registration_url || event.registration_type === 'internal') && (
            <div className="acm-card p-4">
              <h5 className="text-white font-heading fw-bold mb-1">Registration</h5>
              <p className="text-secondary small mb-3">MITS ACM Student Chapter participant submission.</p>

              {isRegistrationClosed ? (
                <div className="alert alert-secondary small text-center mb-0">
                  Registrations for this event are currently <strong>{event.status}</strong>.
                </div>
              ) : regSuccess ? (
                <div className="alert alert-success small mb-0 d-flex align-items-start gap-2">
                  <i className="bi bi-check-circle-fill fs-5"></i>
                  <div>{regSuccess}</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 small">
                  {regError && (
                    <div className="alert alert-danger small py-2 mb-0">
                      {regError}
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
                    <label className="form-label text-secondary small mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@mitsgwalior.in"
                      className="form-control form-control-sm bg-dark border-secondary border-opacity-50 text-light"
                    />
                  </div>

                  <div>
                    <label className="form-label text-secondary small mb-1">College *</label>
                    <input
                      type="text"
                      required
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      className="form-control form-control-sm bg-dark border-secondary border-opacity-50 text-light"
                    />
                  </div>

                  <div className="row g-2">
                    <div className="col-7">
                      <label className="form-label text-secondary small mb-1">Course & Year *</label>
                      <input
                        type="text"
                        required
                        value={formData.course_year}
                        onChange={(e) => setFormData({ ...formData, course_year: e.target.value })}
                        placeholder="B.Tech CSE 2nd Yr"
                        className="form-control form-control-sm bg-dark border-secondary border-opacity-50 text-light"
                      />
                    </div>
                    <div className="col-5">
                      <label className="form-label text-secondary small mb-1">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91..."
                        className="form-control form-control-sm bg-dark border-secondary border-opacity-50 text-light"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label text-secondary small mb-1">Team Name (Optional)</label>
                    <input
                      type="text"
                      value={formData.team_name}
                      onChange={(e) => setFormData({ ...formData, team_name: e.target.value })}
                      placeholder="If participating with teammates"
                      className="form-control form-control-sm bg-dark border-secondary border-opacity-50 text-light"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-acm-primary w-100 btn-sm mt-2"
                  >
                    {submitting ? 'Submitting Registration...' : 'Complete Free Registration'}
                  </button>
                  <span className="text-secondary opacity-75 text-center" style={{ fontSize: '0.72rem' }}>
                    Participant data is confidential & accessible only to chapter coordinators.
                  </span>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
