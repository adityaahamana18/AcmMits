import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

const AdminDashboard = () => {
  const { admin, token, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Overview stats & records
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tab Data States
  const [events, setEvents] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [settings, setSettings] = useState({});

  // Modals / Forms
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '', category: 'Hackathons', short_description: '', full_description: '',
    event_date: '', venue: '', registration_deadline: '', status: 'Upcoming',
    team_size: '1-4 Members', poster_url: '', external_registration_url: ''
  });

  const [showTeamModal, setShowTeamModal] = useState(false);
  const [teamForm, setTeamForm] = useState({
    name: '', designation: '', category_id: 1, bio: '',
    photo_url: '', linkedin_url: '', github_url: '', email: ''
  });

  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const loadOverview = async () => {
    setLoading(true);
    try {
      const res = await api.adminGetOverview(token);
      if (res.success) setOverview(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }
    loadOverview();
  }, [token]);

  const loadTabContent = async (tab) => {
    setActiveTab(tab);
    try {
      if (tab === 'events') {
        const res = await api.adminGetEvents(token);
        if (res.success) setEvents(res.data);
      } else if (tab === 'team') {
        const [memRes, catRes] = await Promise.all([
          api.adminGetTeamMembers(token),
          api.adminGetCategories(token)
        ]);
        if (memRes.success) setTeamMembers(memRes.data);
        if (catRes.success) setCategories(catRes.data);
      } else if (tab === 'registrations') {
        const res = await api.adminGetRegistrations(token);
        if (res.success) setRegistrations(res.data);
      } else if (tab === 'applications') {
        const res = await api.adminGetApplications(token);
        if (res.success) setApplications(res.data);
      } else if (tab === 'messages') {
        const res = await api.adminGetMessages(token);
        if (res.success) setMessages(res.data);
      } else if (tab === 'settings') {
        const res = await api.adminGetSettings(token);
        if (res.success) setSettings(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const res = await api.adminCreateEvent(token, eventForm);
    if (res.success) {
      showToast('Event published successfully!');
      setShowEventModal(false);
      loadTabContent('events');
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    const res = await api.adminDeleteEvent(token, id);
    if (res.success) {
      showToast('Event removed.');
      loadTabContent('events');
    }
  };

  const handleCreateTeamMember = async (e) => {
    e.preventDefault();
    const res = await api.adminCreateTeamMember(token, teamForm);
    if (res.success) {
      showToast('Member added!');
      setShowTeamModal(false);
      loadTabContent('team');
    }
  };

  const handleDeleteTeamMember = async (id) => {
    if (!window.confirm('Remove member profile?')) return;
    const res = await api.adminDeleteTeamMember(token, id);
    if (res.success) {
      showToast('Member removed.');
      loadTabContent('team');
    }
  };

  const handleUpdateAppStatus = async (id, status) => {
    const res = await api.adminUpdateApplicationStatus(token, id, status);
    if (res.success) {
      showToast(`Application updated to ${status}`);
      loadTabContent('applications');
    }
  };

  const handleMarkMessageRead = async (id) => {
    const res = await api.adminMarkMessageRead(token, id);
    if (res.success) {
      showToast('Message marked as read');
      loadTabContent('messages');
    }
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    const res = await api.adminUpdateSettings(token, settings);
    if (res.success) {
      showToast('Settings saved!');
    }
  };

  return (
    <div className="container-fluid min-vh-100 p-0 d-flex flex-column flex-md-row bg-dark">
      {/* Toast */}
      {toastMsg && (
        <div 
          className="position-fixed top-0 end-0 m-3 alert alert-info py-2 px-3 small shadow-lg z-3"
          style={{ zIndex: 1070 }}
        >
          <i className="bi bi-info-circle me-1"></i> {toastMsg}
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside 
        className="p-4 d-flex flex-column justify-content-between border-end border-secondary border-opacity-25"
        style={{ width: '100%', maxWidth: '280px', background: '#030712' }}
      >
        <div>
          <div className="d-flex align-items-center gap-2 mb-4">
            <div className="p-1 rounded-2 bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
              <i className="bi bi-shield-fill"></i>
            </div>
            <div>
              <strong className="text-white font-heading d-block lh-1">MITS ACM</strong>
              <span className="text-info opacity-75" style={{ fontSize: '0.65rem', textTransform: 'uppercase' }}>Admin Center</span>
            </div>
          </div>

          <nav className="nav flex-column gap-1">
            {[
              { id: 'overview', label: 'Overview', icon: 'bi-grid' },
              { id: 'events', label: 'Events & Contests', icon: 'bi-calendar-event' },
              { id: 'team', label: 'Team Directory', icon: 'bi-people' },
              { id: 'registrations', label: 'Registrations', icon: 'bi-file-earmark-spreadsheet' },
              { id: 'applications', label: 'Recruitment Apps', icon: 'bi-person-check' },
              { id: 'messages', label: 'Messages', icon: 'bi-chat-left-dots' },
              { id: 'settings', label: 'Site Settings', icon: 'bi-sliders' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => loadTabContent(tab.id)}
                className={`btn btn-sm text-start py-2 px-3 d-flex align-items-center gap-2 ${
                  activeTab === tab.id ? 'btn-acm-primary' : 'btn-dark border-0 text-secondary'
                }`}
              >
                <i className={`bi ${tab.icon}`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-top border-secondary border-opacity-25 mt-4">
          <div className="small text-secondary mb-3">
            Logged in as: <strong className="text-white">{admin?.username || 'admin'}</strong>
          </div>
          <div className="d-flex gap-2">
            <Link to="/" className="btn btn-dark border-secondary border-opacity-50 btn-sm w-100">
              Public Site
            </Link>
            <button
              onClick={() => { logout(); navigate('/admin'); }}
              className="btn btn-danger btn-sm"
              title="Sign Out"
            >
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-grow-1 p-4 p-md-5 overflow-auto" style={{ background: '#02050e' }}>
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h2 className="text-white font-heading fw-bold mb-1">System Overview</h2>
                <p className="text-secondary small mb-0">Live records from database for MITS ACM STUDENT CHAPTER.</p>
              </div>
              <button onClick={loadOverview} className="btn btn-dark border-secondary border-opacity-50 btn-sm">
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>

            {loading || !overview ? (
              <div className="text-center py-5 text-secondary">
                <div className="spinner-border text-info" role="status"></div>
              </div>
            ) : (
              <>
                <div className="row g-3 mb-5">
                  <div className="col-6 col-lg-3">
                    <div className="acm-card p-4">
                      <span className="text-secondary small fw-bold">Published Events</span>
                      <h2 className="display-6 fw-bold text-white font-heading mt-2 mb-0">{overview.stats.total_events}</h2>
                      <span className="small text-info">{overview.stats.upcoming_events} upcoming</span>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3">
                    <div className="acm-card p-4">
                      <span className="text-secondary small fw-bold">Team Members</span>
                      <h2 className="display-6 fw-bold text-white font-heading mt-2 mb-0">{overview.stats.total_team}</h2>
                      <span className="small text-success">Profiles listed</span>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3">
                    <div className="acm-card p-4">
                      <span className="text-secondary small fw-bold">Event Registrations</span>
                      <h2 className="display-6 fw-bold text-white font-heading mt-2 mb-0">{overview.stats.total_registrations}</h2>
                      <span className="small text-info">Total attendees</span>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3">
                    <div className="acm-card p-4">
                      <span className="text-secondary small fw-bold">Pending Apps</span>
                      <h2 className="display-6 fw-bold text-white font-heading mt-2 mb-0">{overview.stats.pending_applications}</h2>
                      <span className="small text-warning">{overview.stats.unread_messages} unread msgs</span>
                    </div>
                  </div>
                </div>

                <div className="row g-4">
                  <div className="col-12 col-lg-6">
                    <div className="acm-card p-4">
                      <h5 className="text-white font-heading fw-bold mb-3">Recent Registrations</h5>
                      <div className="d-flex flex-column gap-2 small">
                        {overview.recent_registrations.map(r => (
                          <div key={r.id} className="p-3 bg-dark rounded-3 border border-secondary border-opacity-25 d-flex justify-content-between">
                            <div>
                              <strong className="text-white d-block">{r.name}</strong>
                              <span className="text-secondary">{r.email} • {r.event_title}</span>
                            </div>
                            <span className="text-info">{r.course_year}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-6">
                    <div className="acm-card p-4">
                      <h5 className="text-white font-heading fw-bold mb-3">Recent Applications</h5>
                      <div className="d-flex flex-column gap-2 small">
                        {overview.recent_applications.map(a => (
                          <div key={a.id} className="p-3 bg-dark rounded-3 border border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
                            <div>
                              <strong className="text-white d-block">{a.name}</strong>
                              <span className="text-secondary">{a.college_email} • {a.preferred_team}</span>
                            </div>
                            <span className="badge bg-warning text-dark">{a.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === 'events' && (
          <div>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h2 className="text-white font-heading fw-bold mb-1">Event Management</h2>
                <p className="text-secondary small mb-0">Publish and manage chapter competitions.</p>
              </div>
              <button onClick={() => setShowEventModal(true)} className="btn btn-acm-primary btn-sm">
                <i className="bi bi-plus-lg me-1"></i> Add Event
              </button>
            </div>

            <div className="acm-card overflow-hidden">
              <div className="table-responsive">
                <table className="table table-dark table-hover mb-0 small">
                  <thead>
                    <tr className="border-secondary border-opacity-50">
                      <th>Title</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Registrations</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map(ev => (
                      <tr key={ev.id} className="align-middle">
                        <td className="fw-semibold text-white">{ev.title}</td>
                        <td className="text-secondary">{ev.category}</td>
                        <td className="text-secondary">{ev.event_date}</td>
                        <td><span className="badge bg-primary">{ev.status}</span></td>
                        <td className="text-info">{ev.registration_count} registered</td>
                        <td className="text-end">
                          <button onClick={() => handleDeleteEvent(ev.id)} className="btn btn-danger btn-sm p-1">
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal */}
            {showEventModal && (
              <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3" style={{ background: 'rgba(0,0,0,0.85)', zIndex: 1060 }}>
                <div className="acm-card p-4 p-md-5 w-100" style={{ maxWidth: '580px' }}>
                  <h4 className="text-white font-heading fw-bold mb-3">Create New Event</h4>
                  <form onSubmit={handleCreateEvent} className="d-flex flex-column gap-3 small">
                    <div>
                      <label className="text-secondary mb-1">Title *</label>
                      <input type="text" required value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} className="form-control form-control-sm bg-dark border-secondary text-light" />
                    </div>
                    <div className="row g-2">
                      <div className="col-6">
                        <label className="text-secondary mb-1">Category</label>
                        <select value={eventForm.category} onChange={e => setEventForm({...eventForm, category: e.target.value})} className="form-select form-select-sm bg-dark border-secondary text-light">
                          {['Hackathons', 'Workshops', 'Coding Competitions', 'Seminars', 'Community Meetups'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="col-6">
                        <label className="text-secondary mb-1">Status</label>
                        <select value={eventForm.status} onChange={e => setEventForm({...eventForm, status: e.target.value})} className="form-select form-select-sm bg-dark border-secondary text-light">
                          {['Upcoming', 'Ongoing', 'Completed', 'Registration Closed', 'Cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-secondary mb-1">Short Description *</label>
                      <textarea rows={2} required value={eventForm.short_description} onChange={e => setEventForm({...eventForm, short_description: e.target.value})} className="form-control form-control-sm bg-dark border-secondary text-light" />
                    </div>
                    <div className="row g-2">
                      <div className="col-6">
                        <label className="text-secondary mb-1">Date *</label>
                        <input type="text" required value={eventForm.event_date} onChange={e => setEventForm({...eventForm, event_date: e.target.value})} className="form-control form-control-sm bg-dark border-secondary text-light" placeholder="e.g. Nov 20, 2026" />
                      </div>
                      <div className="col-6">
                        <label className="text-secondary mb-1">Venue *</label>
                        <input type="text" required value={eventForm.venue} onChange={e => setEventForm({...eventForm, venue: e.target.value})} className="form-control form-control-sm bg-dark border-secondary text-light" placeholder="e.g. SAC Auditorium" />
                      </div>
                    </div>
                    <div>
                      <label className="text-secondary mb-1">Poster URL</label>
                      <input type="url" value={eventForm.poster_url} onChange={e => setEventForm({...eventForm, poster_url: e.target.value})} className="form-control form-control-sm bg-dark border-secondary text-light" placeholder="https://..." />
                    </div>
                    <div className="d-flex justify-content-end gap-2 pt-2">
                      <button type="button" onClick={() => setShowEventModal(false)} className="btn btn-dark btn-sm">Cancel</button>
                      <button type="submit" className="btn btn-acm-primary btn-sm">Publish Event</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TEAM TAB */}
        {activeTab === 'team' && (
          <div>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h2 className="text-white font-heading fw-bold mb-1">Team Directory</h2>
                <p className="text-secondary small mb-0">Add and manage faculty mentors and leads.</p>
              </div>
              <button onClick={() => setShowTeamModal(true)} className="btn btn-acm-primary btn-sm">
                <i className="bi bi-person-plus me-1"></i> Add Member
              </button>
            </div>

            <div className="row g-3">
              {teamMembers.map(m => (
                <div key={m.id} className="col-12 col-md-6 col-lg-4">
                  <div className="acm-card p-3 d-flex align-items-center gap-3">
                    <img src={m.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'} alt={m.name} className="rounded-3 object-fit-cover" style={{ width: '50px', height: '50px' }} />
                    <div className="flex-grow-1 overflow-hidden small">
                      <strong className="text-white d-block text-truncate">{m.name}</strong>
                      <span className="text-info d-block text-truncate">{m.designation}</span>
                      <span className="text-secondary" style={{ fontSize: '0.7rem' }}>{m.category_name}</span>
                    </div>
                    <button onClick={() => handleDeleteTeamMember(m.id)} className="btn btn-danger btn-sm p-1">
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal */}
            {showTeamModal && (
              <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3" style={{ background: 'rgba(0,0,0,0.85)', zIndex: 1060 }}>
                <div className="acm-card p-4 p-md-5 w-100" style={{ maxWidth: '500px' }}>
                  <h4 className="text-white font-heading fw-bold mb-3">Add Team Member</h4>
                  <form onSubmit={handleCreateTeamMember} className="d-flex flex-column gap-3 small">
                    <div>
                      <label className="text-secondary mb-1">Name *</label>
                      <input type="text" required value={teamForm.name} onChange={e => setTeamForm({...teamForm, name: e.target.value})} className="form-control form-control-sm bg-dark border-secondary text-light" />
                    </div>
                    <div>
                      <label className="text-secondary mb-1">Designation *</label>
                      <input type="text" required value={teamForm.designation} onChange={e => setTeamForm({...teamForm, designation: e.target.value})} placeholder="e.g. President / Web Dev Lead" className="form-control form-control-sm bg-dark border-secondary text-light" />
                    </div>
                    <div>
                      <label className="text-secondary mb-1">Wing Category</label>
                      <select value={teamForm.category_id} onChange={e => setTeamForm({...teamForm, category_id: e.target.value})} className="form-select form-select-sm bg-dark border-secondary text-light">
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-secondary mb-1">Photo URL</label>
                      <input type="url" value={teamForm.photo_url} onChange={e => setTeamForm({...teamForm, photo_url: e.target.value})} className="form-control form-control-sm bg-dark border-secondary text-light" placeholder="https://..." />
                    </div>
                    <div className="d-flex justify-content-end gap-2 pt-2">
                      <button type="button" onClick={() => setShowTeamModal(false)} className="btn btn-dark btn-sm">Cancel</button>
                      <button type="submit" className="btn btn-acm-primary btn-sm">Save Profile</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* REGISTRATIONS TAB */}
        {activeTab === 'registrations' && (
          <div>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h2 className="text-white font-heading fw-bold mb-1">Event Registrations</h2>
                <p className="text-secondary small mb-0">List of student attendees.</p>
              </div>
              <a href="/api/admin/registrations/export-csv" target="_blank" rel="noreferrer" className="btn btn-success btn-sm">
                <i className="bi bi-file-earmark-arrow-down me-1"></i> Export CSV
              </a>
            </div>

            <div className="acm-card overflow-hidden">
              <div className="table-responsive">
                <table className="table table-dark table-hover mb-0 small">
                  <thead>
                    <tr className="border-secondary border-opacity-50">
                      <th>Participant</th>
                      <th>Event</th>
                      <th>College</th>
                      <th>Course/Year</th>
                      <th>Team</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map(r => (
                      <tr key={r.id}>
                        <td>
                          <strong className="text-white d-block">{r.name}</strong>
                          <span className="text-secondary">{r.email}</span>
                        </td>
                        <td className="text-info">{r.event_title}</td>
                        <td className="text-secondary">{r.college}</td>
                        <td className="text-secondary">{r.course_year}</td>
                        <td className="text-secondary">{r.team_name || 'Individual'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* RECRUITMENT APPLICATIONS */}
        {activeTab === 'applications' && (
          <div>
            <h2 className="text-white font-heading fw-bold mb-1">Recruitment Applications</h2>
            <p className="text-secondary small mb-4">Review incoming student membership submissions.</p>

            <div className="d-flex flex-column gap-3">
              {applications.map(app => (
                <div key={app.id} className="acm-card p-4">
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                    <div>
                      <h5 className="text-white font-heading fw-bold mb-0">{app.name}</h5>
                      <span className="text-secondary small">{app.college_email} • {app.course_year}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge bg-primary">{app.preferred_team}</span>
                      <select
                        value={app.status}
                        onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                        className="form-select form-select-sm bg-dark border-secondary text-light w-auto"
                      >
                        {['Pending', 'Shortlisted', 'Accepted', 'Rejected'].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="row g-2 small border-top border-secondary border-opacity-25 pt-3 mb-2">
                    <div className="col-6">
                      <span className="text-secondary d-block">Skills:</span>
                      <span className="text-light">{app.technical_skills || 'N/A'}</span>
                    </div>
                    <div className="col-6">
                      <span className="text-secondary d-block">Areas of Interest:</span>
                      <span className="text-light">{app.areas_of_interest || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="small border-top border-secondary border-opacity-25 pt-2">
                    <span className="text-secondary d-block">Statement:</span>
                    <p className="text-light fst-italic mb-0">{app.intro_statement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div>
            <h2 className="text-white font-heading fw-bold mb-1">Contact Messages</h2>
            <p className="text-secondary small mb-4">Direct student and sponsor inquiries.</p>

            <div className="d-flex flex-column gap-3">
              {messages.map(m => (
                <div key={m.id} className="acm-card p-4 d-flex justify-content-between align-items-start gap-3">
                  <div className="small">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <strong className="text-white">{m.name}</strong>
                      <span className="text-secondary">({m.email})</span>
                      {m.is_read ? <span className="badge bg-secondary">Read</span> : <span className="badge bg-success">New</span>}
                    </div>
                    <div className="text-info fw-semibold mb-2">{m.subject}</div>
                    <p className="text-light mb-0">{m.message}</p>
                  </div>
                  {!m.is_read && (
                    <button onClick={() => handleMarkMessageRead(m.id)} className="btn btn-dark btn-sm">
                      Mark Read
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '600px' }}>
            <h2 className="text-white font-heading fw-bold mb-1">Site Settings</h2>
            <p className="text-secondary small mb-4">Live customizable homepage attributes.</p>

            <form onSubmit={handleUpdateSettings} className="acm-card p-4 d-flex flex-column gap-3 small">
              <div>
                <label className="text-secondary mb-1">Tagline</label>
                <input type="text" value={settings.tagline || ''} onChange={e => setSettings({...settings, tagline: e.target.value})} className="form-control form-control-sm bg-dark border-secondary text-light" />
              </div>
              <div>
                <label className="text-secondary mb-1">Supporting Text</label>
                <input type="text" value={settings.hero_supporting_text || ''} onChange={e => setSettings({...settings, hero_supporting_text: e.target.value})} className="form-control form-control-sm bg-dark border-secondary text-light" />
              </div>
              <div className="row g-2">
                <div className="col-6">
                  <label className="text-secondary mb-1">Stat: Active Members</label>
                  <input type="text" value={settings.stat_members || ''} onChange={e => setSettings({...settings, stat_members: e.target.value})} className="form-control form-control-sm bg-dark border-secondary text-light" />
                </div>
                <div className="col-6">
                  <label className="text-secondary mb-1">Stat: Events</label>
                  <input type="text" value={settings.stat_events || ''} onChange={e => setSettings({...settings, stat_events: e.target.value})} className="form-control form-control-sm bg-dark border-secondary text-light" />
                </div>
              </div>
              <button type="submit" className="btn btn-acm-primary btn-sm mt-2">
                Save Site Settings
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
