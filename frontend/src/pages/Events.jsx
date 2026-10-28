import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Hackathons', 'Workshops', 'Coding Competitions', 'Seminars', 'Community Meetups'];
  const statuses = ['All', 'Upcoming', 'Ongoing', 'Completed'];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.getEvents();
        if (res.success) {
          setEvents(res.data);
        }
      } catch (err) {
        console.error('Failed to load events', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((ev) => {
    const matchesCat = selectedCategory === 'All' || ev.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || ev.status === selectedStatus;
    return matchesCat && matchesStatus;
  });

  return (
    <div className="container py-5">
      {/* Title Header */}
      <div className="text-center mx-auto mb-5" style={{ maxWidth: '720px' }}>
        <span className="badge-acm mb-3 d-inline-block">Technical Sprints</span>
        <h1 className="display-4 fw-bolder text-white font-heading mb-3">
          Events & <span className="text-gradient-acm">Hackathons</span>
        </h1>
        <p className="text-secondary lead fs-6">
          Explore upcoming coding contests, workshops, and flagship competitions by <strong className="text-white">MITS ACM STUDENT CHAPTER</strong>.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="acm-card p-4 mb-5">
        <div className="row g-3 align-items-center justify-content-between">
          <div className="col-12 col-lg-8">
            <div className="d-flex flex-wrap gap-2 align-items-center">
              <span className="text-secondary small fw-bold text-uppercase me-2">Category:</span>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`btn btn-sm ${selectedCategory === c ? 'btn-acm-primary' : 'btn-acm-outline'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="d-flex flex-wrap gap-2 justify-content-lg-end align-items-center">
              <span className="text-secondary small fw-bold text-uppercase me-2">Status:</span>
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedStatus(s)}
                  className={`btn btn-sm ${selectedStatus === s ? 'btn-acm-primary' : 'btn-acm-outline'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="text-center py-5 text-secondary">
          <div className="spinner-border text-info" role="status"></div>
          <p className="small mt-2">Loading events...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="acm-card text-center p-5">
          <p className="text-secondary mb-3">No events found matching your filter selection.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedStatus('All'); }}
            className="btn btn-acm-primary btn-sm"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="col-12 col-md-6 col-lg-4">
              <div className="acm-card h-100 d-flex flex-column">
                <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
                  <img
                    src={event.poster_url || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80'}
                    alt={event.title}
                    className="w-100 h-100 object-fit-cover"
                  />
                  <span className="position-absolute top-0 start-0 m-3 badge bg-primary">
                    {event.category}
                  </span>
                  <span className={`position-absolute top-0 end-0 m-3 badge ${
                    event.status === 'Upcoming' ? 'bg-success' : event.status === 'Ongoing' ? 'bg-warning text-dark' : 'bg-secondary'
                  }`}>
                    {event.status}
                  </span>
                </div>

                <div className="p-4 d-flex flex-column flex-grow-1">
                  <h5 className="text-white font-heading fw-bold mb-2">{event.title}</h5>
                  <p className="text-secondary small mb-4 flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {event.short_description}
                  </p>

                  <div className="small text-secondary mb-4 d-flex flex-column gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-calendar3 text-info"></i>
                      <span>{event.event_date}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-geo-alt text-info"></i>
                      <span className="text-truncate">{event.venue}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-people text-info"></i>
                      <span>Team: {event.team_size || 'Individual / Team'}</span>
                    </div>
                  </div>

                  <Link to={`/events/${event.id}`} className="btn btn-acm-primary w-100 btn-sm">
                    View Details & Register
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
