import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FIXED_TEAM_CATEGORIES } from '../teamData';

const Team = () => {
  const [categories, setCategories] = useState(FIXED_TEAM_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModalMember, setActiveModalMember] = useState(null);

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

  const getInitials = (name) => {
    return name
      .replace('Dr. ', '')
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
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
          The esteemed faculty advisor, executive officers, and wing leads driving <strong className="text-white">MITS ACM STUDENT CHAPTER</strong>.
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
              {category.members.map((member) => (
                <div key={member.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="acm-card h-100 d-flex flex-column p-4 justify-content-between">
                    <div>
                      {/* Clean Initials Monogram Badge (No Photos) */}
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div 
                          className="rounded-3 d-flex align-items-center justify-content-center fw-bold shadow-md"
                          style={{
                            width: '54px',
                            height: '54px',
                            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(56, 189, 248, 0.15))',
                            border: '1px solid rgba(56, 189, 248, 0.35)',
                            color: '#38bdf8',
                            fontSize: '1.25rem',
                            letterSpacing: '0.04em'
                          }}
                        >
                          {getInitials(member.name)}
                        </div>

                        <span className="badge bg-dark border border-secondary border-opacity-50 text-secondary" style={{ fontSize: '0.68rem' }}>
                          MITS ACM
                        </span>
                      </div>

                      {/* Name & Title */}
                      <h5 
                        className="text-white font-heading fw-bold mb-1 cursor-pointer text-hover-info"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setActiveModalMember(member)}
                      >
                        {member.name}
                      </h5>
                      <div className="text-info small fw-semibold mb-3">{member.designation}</div>
                      
                      <p className="text-secondary small mb-4 lh-base" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {member.bio}
                      </p>
                    </div>

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
                        onClick={() => setActiveModalMember(member)}
                        className="btn btn-acm-outline btn-sm ms-auto text-info py-1 px-2"
                        style={{ fontSize: '0.74rem' }}
                      >
                        View Details <i className="bi bi-box-arrow-up-right ms-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* MEMBER DETAILS MODAL (WITHOUT IMAGES) */}
      {activeModalMember && createPortal(
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(12px)', zIndex: 10000 }}
          onClick={() => setActiveModalMember(null)}
        >
          <div 
            className="acm-card p-4 p-md-5 position-relative shadow-2xl border-info border-opacity-50"
            style={{ maxWidth: '460px', width: '100%', background: 'rgba(11, 19, 38, 0.95)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalMember(null)}
              className="btn btn-dark position-absolute top-0 end-0 m-3 rounded-circle p-2 d-flex align-items-center justify-content-center border-secondary border-opacity-50"
              style={{ width: '36px', height: '36px' }}
              aria-label="Close"
            >
              <i className="bi bi-x-lg text-secondary"></i>
            </button>

            {/* Profile Monogram */}
            <div className="text-center mb-4">
              <div 
                className="rounded-circle d-inline-flex align-items-center justify-content-center fw-bold shadow-lg mb-3"
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.35), rgba(56, 189, 248, 0.2))',
                  border: '2px solid rgba(56, 189, 248, 0.5)',
                  color: '#38bdf8',
                  fontSize: '1.8rem'
                }}
              >
                {getInitials(activeModalMember.name)}
              </div>
              <h4 className="text-white font-heading fw-bold mb-1">{activeModalMember.name}</h4>
              <div className="text-gradient-acm small fw-bold mb-1">{activeModalMember.designation}</div>
              <div className="text-secondary small" style={{ fontSize: '0.78rem' }}>MITS ACM STUDENT CHAPTER</div>
            </div>

            <p className="text-light small text-center leading-relaxed mb-4" style={{ fontSize: '0.88rem' }}>
              {activeModalMember.bio}
            </p>

            {/* Social Links */}
            <div className="d-flex gap-2 justify-content-center pt-3 border-top border-secondary border-opacity-25">
              {activeModalMember.linkedin_url && (
                <a
                  href={activeModalMember.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-acm-primary btn-sm px-3 d-flex align-items-center gap-2"
                >
                  <i className="bi bi-linkedin"></i> LinkedIn Profile
                </a>
              )}
              {activeModalMember.github_url && (
                <a
                  href={activeModalMember.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-acm-outline btn-sm px-3 d-flex align-items-center gap-2 text-light"
                >
                  <i className="bi bi-github"></i> GitHub Profile
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
