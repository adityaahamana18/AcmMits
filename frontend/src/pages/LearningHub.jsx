import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const LearningHub = () => {
  const [resources, setResources] = useState([]);
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'DSA and Competitive Programming',
    'Web Development',
    'Artificial Intelligence and Machine Learning',
    'Cybersecurity',
    'Interview Preparation'
  ];

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await api.getLearningResources({ category, difficulty, search });
        if (res.success) {
          setResources(res.data);
        }
      } catch (err) {
        console.error('Failed to load resources', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, [category, difficulty, search]);

  return (
    <div className="container py-5">
      {/* Title Header */}
      <div className="text-center mx-auto mb-5" style={{ maxWidth: '720px' }}>
        <span className="badge-acm mb-3 d-inline-block">Curated Roadmaps</span>
        <h1 className="display-4 fw-bolder text-white font-heading mb-3">
          Learning <span className="text-gradient-acm">Hub</span>
        </h1>
        <p className="text-secondary lead fs-6">
          Educational resources, roadmaps, and programming reference repositories maintained by <strong className="text-white">MITS ACM STUDENT CHAPTER</strong>.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="acm-card p-4 mb-5">
        <div className="row g-3 align-items-center mb-3">
          <div className="col-12 col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary border-opacity-50 text-secondary">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search topics, tutorials, or tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control bg-dark border-secondary border-opacity-50 text-light small shadow-none"
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="d-flex flex-wrap gap-2 justify-content-md-end align-items-center">
              <span className="text-secondary small fw-bold text-uppercase me-2">Level:</span>
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`btn btn-sm ${difficulty === diff ? 'btn-acm-primary' : 'btn-acm-outline'}`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-3 border-top border-secondary border-opacity-25 d-flex flex-wrap gap-2 align-items-center">
          <span className="text-secondary small fw-bold text-uppercase me-2">Track:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`btn btn-sm ${category === cat ? 'btn-acm-primary' : 'btn-acm-outline'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards */}
      {loading ? (
        <div className="text-center py-5 text-secondary">
          <div className="spinner-border text-info" role="status"></div>
          <p className="small mt-2">Loading tutorials and roadmaps...</p>
        </div>
      ) : resources.length === 0 ? (
        <div className="acm-card text-center p-5">
          <p className="text-secondary mb-3">No learning materials found matching your filters.</p>
          <button
            onClick={() => { setCategory('All'); setDifficulty('All'); setSearch(''); }}
            className="btn btn-acm-primary btn-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {resources.map((res) => (
            <div key={res.id} className="col-12 col-lg-6">
              <div className="acm-card p-4 p-md-5 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-25">
                      {res.category}
                    </span>
                    <span className={`badge ${
                      res.difficulty === 'Beginner' ? 'bg-success' : res.difficulty === 'Intermediate' ? 'bg-warning text-dark' : 'bg-danger'
                    }`}>
                      {res.difficulty}
                    </span>
                  </div>

                  <h4 className="text-white font-heading fw-bold mb-3">{res.title}</h4>
                  <p className="text-secondary small mb-4 lh-base">{res.description}</p>

                  {res.tags && res.tags.length > 0 && (
                    <div className="d-flex flex-wrap gap-1 mb-4">
                      {res.tags.map((tag, idx) => (
                        <span key={idx} className="badge bg-dark border border-secondary border-opacity-50 text-secondary" style={{ fontSize: '0.7rem' }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-top border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
                  <span className="text-secondary small" style={{ fontSize: '0.75rem' }}>Verified Resource</span>
                  <a
                    href={res.resource_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-acm-primary btn-sm"
                  >
                    Open Resource <i className="bi bi-box-arrow-up-right ms-1"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningHub;
