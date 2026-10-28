import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await api.getAchievements();
        if (res.success) {
          setAchievements(res.data);
        }
      } catch (err) {
        console.error('Failed to load achievements', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  return (
    <div className="container py-5">
      {/* Title Header */}
      <div className="text-center mx-auto mb-5" style={{ maxWidth: '720px' }}>
        <span className="badge-acm mb-3 d-inline-block">Milestones & Honors</span>
        <h1 className="display-4 fw-bolder text-white font-heading mb-3">
          Chapter & Student <span className="text-gradient-acm">Achievements</span>
        </h1>
        <p className="text-secondary lead fs-6">
          Honoring national hackathon wins, research paper publications, and verified competitive programming honors achieved by <strong className="text-white">MITS ACM STUDENT CHAPTER</strong>.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-5 text-secondary">
          <div className="spinner-border text-info" role="status"></div>
          <p className="small mt-2">Loading verified achievements...</p>
        </div>
      ) : achievements.length === 0 ? (
        <div className="acm-card text-center p-5">
          <p className="text-secondary">No achievements published yet.</p>
        </div>
      ) : (
        <div className="row g-4">
          {achievements.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4">
              <div className="acm-card h-100 d-flex flex-column">
                <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
                  <img
                    src={item.image_url || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80'}
                    alt={item.title}
                    className="w-100 h-100 object-fit-cover"
                  />
                  <span className="position-absolute top-0 start-0 m-3 badge bg-warning text-dark fw-bold d-flex align-items-center gap-1 shadow-sm">
                    <i className="bi bi-trophy-fill"></i> {item.badge_label || 'Honor'}
                  </span>
                </div>

                <div className="p-4 d-flex flex-column flex-grow-1">
                  <h5 className="text-white font-heading fw-bold mb-2">{item.title}</h5>
                  <p className="text-secondary small mb-4 flex-grow-1 lh-base">
                    {item.description}
                  </p>

                  <div className="pt-3 border-top border-secondary border-opacity-25 small text-secondary d-flex flex-column gap-2 mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-people-fill text-info"></i>
                      <span className="text-light fw-medium">{item.participant_names}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-calendar-event text-info"></i>
                      <span>{item.achievement_date}</span>
                    </div>
                  </div>

                  {item.external_link && (
                    <a
                      href={item.external_link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-acm-outline btn-sm w-100"
                    >
                      Official Proof / Announcement <i className="bi bi-box-arrow-up-right ms-1"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Achievements;
