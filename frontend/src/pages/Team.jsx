import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FIXED_TEAM_CATEGORIES } from '../teamData';
import { DEVELOPERS_DATA } from '../constants';
import { api } from '../services/api';

const Team = () => {
  const [categories, setCategories] = useState(FIXED_TEAM_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDevModal, setActiveDevModal] = useState(null);

  useEffect(() => {
    // Attempt to merge or fetch dynamic records while keeping Dr. Neha Bharadwaj & core structure stable
    const fetchTeam = async () => {
      try {
        const res = await api.getTeam();
        if (res.success && res.data && res.data.length > 0) {
          // If backend has categories, ensure Dr. Neha Bharadwaj is set in faculty
          const updated = res.data.map(cat => {
            if (cat.name.toLowerCase().includes('faculty')) {
              return {
                ...cat,
                members: cat.members.map(m => ({
                  ...m,
                  name: 'Dr. Neha Bharadwaj',
                  designation: 'Faculty Sponsor & Branch Counselor'
                }))
              };
            }
            return cat;
          });
          setCategories(updated);
        }
      } catch (err) {
        // Fallback to FIXED_TEAM_CATEGORIES
        setCategories(FIXED_TEAM_CATEGORIES);
      }
    };
    fetchTeam();
  }, []);

  // Filter categories and members
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

  // Handle clicking on developer name or member card
  const handleMemberClick = (member) => {
    // Check if the member is one of our 3 developers
    const matchedDev = DEVELOPERS_DATA.find(d => 
      d.name.toLowerCase() === member.name.toLowerCase() ||
      member.name.toLowerCase().includes(d.name.toLowerCase())
    );

    if (matchedDev) {
      setActiveDevModal(matchedDev);
    } else {
      // General member modal
      setActiveDevModal({
        name: member.name,
        role: member.designation,
        branch: 'MITS ACM Student Chapter',
        bio: member.bio || 'Active contributor to MITS ACM Student Chapter operations, workshops, and engineering initiatives.',
        linkedin: member.linkedin_url || 'https://www.linkedin.com/',
        github: member.github_url || '',
        avatar: member.photo_url,
        skills: ['Leadership', 'Computing', 'Community']
      });
    }
  };

  return (
    <div className="container py-5">
      {/* Title Header */}
      <div className="text-center mx-auto mb-5" style={{ maxWidth: '720px' }}>
        <span className="badge-acm mb-3 d-inline-block">Leadership & Mentors</span>
        <h1 className="display-4 fw-bolder text-white font-heading mb-3">
          Meet Our <span className="text-gradient-acm">Team</span>
        </h1>
        <p className="text-secondary lead fs-6">
          The esteemed faculty advisor, executive officers, and core developers driving <strong className="text-white">MITS ACM STUDENT CHAPTER</strong>.
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
      {filteredCategories.length === 0 ? (
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
              {category.members.map((member) => {
                const isDev = DEVELOPERS_DATA.some(d => d.name.toLowerCase() === member.name.toLowerCase());

                return (
                  <div key={member.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="acm-card h-100 d-flex flex-column position-relative">
                      {isDev && (
                        <span 
                          className="position-absolute top-0 end-0 m-2 badge bg-primary border border-info border-opacity-50 shadow-sm"
                          style={{ zIndex: 2, fontSize: '0.65rem' }}
                        >
                          <i className="bi bi-star-fill text-warning me-1"></i> Developer
                        </span>
                      )}

                      <div 
                        className="position-relative overflow-hidden cursor-pointer" 
                        style={{ height: '260px', cursor: 'pointer' }}
                        onClick={() => handleMemberClick(member)}
                      >
                        <img 
                          src={member.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'} 
                          alt={member.name}
                          className="w-100 h-100 object-fit-cover acm-zoom-img"
                        />
                        <div 
                          className="position-absolute bottom-0 start-0 end-0 p-3"
                          style={{ background: 'linear-gradient(to top, rgba(3,7,18,0.95), transparent)' }}
                        ></div>
                      </div>

                      <div className="p-4 d-flex flex-column flex-grow-1">
                        <button
                          type="button"
                          onClick={() => handleMemberClick(member)}
                          className="btn btn-link text-start p-0 text-white font-heading fw-bold fs-5 mb-1 text-decoration-none text-hover-info"
                          title="Click to view interactive profile card"
                        >
                          {member.name}
                          <i className="bi bi-arrow-up-right small ms-1 text-info opacity-75" style={{ fontSize: '0.75rem' }}></i>
                        </button>
                        
                        <div className="text-info small fw-semibold mb-3">{member.designation}</div>
                        
                        <p className="text-secondary small mb-4 flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {member.bio || 'Active technical lead in MITS ACM Student Chapter operations.'}
                        </p>

                        <div className="pt-3 border-top border-secondary border-opacity-25 d-flex gap-2 align-items-center">
                          {member.linkedin_url && (
                            <a 
                              href={member.linkedin_url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="btn btn-dark border-secondary border-opacity-50 btn-sm text-info"
                              title="LinkedIn Profile"
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
                              title="GitHub Profile"
                            >
                              <i className="bi bi-github"></i>
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={() => handleMemberClick(member)}
                            className="btn btn-acm-outline btn-sm ms-auto text-info py-1 px-2"
                            style={{ fontSize: '0.72rem' }}
                          >
                            View Card <i className="bi bi-box-arrow-up-right ms-1"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}

      {/* INTERACTIVE MEMBER / DEVELOPER PROFILE MODAL POPUP */}
      {activeDevModal && createPortal(
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(12px)', zIndex: 10000 }}
          onClick={() => setActiveDevModal(null)}
        >
          <div 
            className="acm-card p-4 p-md-5 position-relative shadow-2xl border-info border-opacity-50"
            style={{ maxWidth: '480px', width: '100%', background: 'rgba(11, 19, 38, 0.95)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveDevModal(null)}
              className="btn btn-dark position-absolute top-0 end-0 m-3 rounded-circle p-2 d-flex align-items-center justify-content-center border-secondary border-opacity-50"
              style={{ width: '36px', height: '36px' }}
              aria-label="Close"
            >
              <i className="bi bi-x-lg text-secondary"></i>
            </button>

            {/* Profile Avatar & Info */}
            <div className="text-center mb-4">
              <div className="position-relative d-inline-block mb-3">
                <img 
                  src={activeDevModal.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'} 
                  alt={activeDevModal.name} 
                  className="rounded-circle object-fit-cover border border-info border-2 shadow-lg"
                  style={{ width: '92px', height: '92px' }}
                />
                <span className="position-absolute bottom-0 end-0 badge bg-primary rounded-circle p-2 border border-dark">
                  <i className="bi bi-person-badge text-white" style={{ fontSize: '0.8rem' }}></i>
                </span>
              </div>
              <h4 className="text-white font-heading fw-bold mb-1">{activeDevModal.name}</h4>
              <div className="text-gradient-acm small fw-bold mb-1">{activeDevModal.role}</div>
              <div className="text-secondary small" style={{ fontSize: '0.78rem' }}>{activeDevModal.branch}</div>
            </div>

            <p className="text-light small text-center leading-relaxed mb-4" style={{ fontSize: '0.86rem' }}>
              {activeDevModal.bio}
            </p>

            {/* Skills */}
            {activeDevModal.skills && (
              <div className="d-flex flex-wrap justify-content-center gap-1 mb-4">
                {activeDevModal.skills.map((skill, i) => (
                  <span key={i} className="badge bg-dark border border-secondary border-opacity-50 text-info" style={{ fontSize: '0.72rem' }}>
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* Social Links */}
            <div className="d-flex gap-2 justify-content-center pt-3 border-top border-secondary border-opacity-25">
              {activeDevModal.linkedin && (
                <a
                  href={activeDevModal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-acm-primary btn-sm px-3 d-flex align-items-center gap-2"
                >
                  <i className="bi bi-linkedin"></i> LinkedIn
                </a>
              )}
              {activeDevModal.github && (
                <a
                  href={activeDevModal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-acm-outline btn-sm px-3 d-flex align-items-center gap-2 text-light"
                >
                  <i className="bi bi-github"></i> GitHub
                </a>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Team;
