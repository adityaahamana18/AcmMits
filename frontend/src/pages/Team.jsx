import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const Team = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await api.getTeam();
        if (res.success) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error('Failed to load team data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const filteredCategories = categories.map(cat => {
    const matchedMembers = cat.members.filter(m => {
      return m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
             m.designation.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return { ...cat, members: matchedMembers };
  }).filter(cat => {
    if (selectedCategory !== 'All' && cat.name !== selectedCategory) return false;
    return cat.members.length > 0;
  });

  return (
    <div className="container py-5">
      {/* Title Header */}
      <div className="text-center mx-auto mb-5" style={{ maxWidth: '720px' }}>
        <span className="badge-acm mb-3 d-inline-block">Leadership & Mentors</span>
        <h1 className="display-4 fw-bolder text-white font-heading mb-3">
          Meet Our <span className="text-gradient-acm">Team</span>
        </h1>
        <p className="text-secondary lead fs-6">
          The faculty advisors, student officers, and domain leads driving <strong className="text-white">MITS ACM STUDENT CHAPTER</strong>.
        </p>
      </div>

      {/* Filter Toolbar (Mobile Responsive) */}
      <div className="acm-card p-4 mb-5">
        <div className="row g-3 align-items-center justify-content-between">
          <div className="col-12 col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary border-opacity-50 text-secondary">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search by name or designation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control bg-dark border-secondary border-opacity-50 text-light small shadow-none"
              />
            </div>
          </div>

          <div className="col-12 col-md-7">
            <div className="d-flex flex-wrap gap-2 justify-content-md-end">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`btn btn-sm ${selectedCategory === 'All' ? 'btn-acm-primary' : 'btn-acm-outline'}`}
              >
                All Wings
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`btn btn-sm ${selectedCategory === cat.name ? 'btn-acm-primary' : 'btn-acm-outline'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Listings */}
      {loading ? (
        <div className="text-center py-5 text-secondary">
          <div className="spinner-border text-info" role="status"></div>
          <p className="small mt-2">Loading chapter directory...</p>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="acm-card text-center p-5">
          <p className="text-secondary mb-3">No members found matching your search criteria.</p>
          <button 
            onClick={() => { setSelectedCategory('All'); setSearchTerm(''); }}
            className="btn btn-acm-primary btn-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        filteredCategories.map((category) => (
          <div key={category.id} className="mb-5">
            <div className="d-flex align-items-center gap-3 pb-3 mb-4 border-bottom border-secondary border-opacity-25">
              <h3 className="text-white font-heading fw-bold mb-0">{category.name}</h3>
              <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-25">
                {category.members.length} {category.members.length === 1 ? 'Leader' : 'Members'}
              </span>
            </div>

            <div className="row g-4">
              {category.members.map((member) => (
                <div key={member.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="acm-card h-100 d-flex flex-column">
                    <div className="position-relative overflow-hidden" style={{ height: '260px' }}>
                      <img 
                        src={member.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'} 
                        alt={member.name}
                        className="w-100 h-100 object-fit-cover"
                      />
                      <div 
                        className="position-absolute bottom-0 start-0 end-0 p-3"
                        style={{ background: 'linear-gradient(to top, rgba(3,7,18,0.95), transparent)' }}
                      ></div>
                    </div>

                    <div className="p-4 d-flex flex-column flex-grow-1">
                      <h5 className="text-white font-heading fw-bold mb-1">{member.name}</h5>
                      <div className="text-info small fw-semibold mb-3">{member.designation}</div>
                      
                      <p className="text-secondary small mb-4 flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {member.bio || 'Active technical lead in MITS ACM Student Chapter operations.'}
                      </p>

                      <div className="pt-3 border-top border-secondary border-opacity-25 d-flex gap-2">
                        {member.linkedin_url && (
                          <a 
                            href={member.linkedin_url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="btn btn-dark border-secondary border-opacity-50 btn-sm text-info"
                            title="LinkedIn"
                          >
                            <i className="bi bi-linkedin"></i>
                          </a>
                        )}
                        {member.github_url && (
                          <a 
                            href={member.github_url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="btn btn-dark border-secondary border-opacity-50 btn-sm text-light"
                            title="GitHub"
                          >
                            <i className="bi bi-github"></i>
                          </a>
                        )}
                        {member.email && (
                          <a 
                            href={`mailto:${member.email}`}
                            className="btn btn-dark border-secondary border-opacity-50 btn-sm text-info ms-auto"
                            title="Email"
                          >
                            <i className="bi bi-envelope"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Team;
