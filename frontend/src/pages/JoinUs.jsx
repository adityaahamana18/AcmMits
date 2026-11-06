import React, { useState } from 'react';
import { RECRUITMENT_FORM_URL } from '../constants';

const JoinUs = () => {
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

      <div className="row g-5 align-items-center">
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

        {/* Right Column: Google Form Card */}
        <div className="col-12 col-lg-6">
          <div className="acm-card p-5 text-center shadow-2xl border-info border-opacity-40">
            <div 
              className="p-3 rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
              style={{ background: 'rgba(37, 99, 235, 0.15)', color: '#38bdf8', width: '70px', height: '70px' }}
            >
              <i className="bi bi-file-earmark-text-fill fs-2"></i>
            </div>

            <h4 className="text-white font-heading fw-bold mb-2">Official Recruitment Form</h4>
            <p className="text-secondary small mb-4" style={{ maxWidth: '420px', margin: '0 auto' }}>
              We are actively accepting applications for Technical, Creative, Marketing, and Event Management teams for the current session.
            </p>

            <div className="p-3 rounded-3 bg-dark border border-secondary border-opacity-25 small text-light text-start mb-4">
              <div className="d-flex align-items-center gap-2 mb-2">
                <i className="bi bi-check-circle-fill text-success"></i>
                <span>Open for all undergraduate engineering batches</span>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <i className="bi bi-check-circle-fill text-success"></i>
                <span>Direct review by Executive Board & Faculty Coordinators</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-success"></i>
                <span>Takes less than 3 minutes to complete</span>
              </div>
            </div>

            <a
              href={RECRUITMENT_FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-acm-primary px-5 py-3 w-100 fs-6 fw-bold d-inline-flex align-items-center justify-content-center gap-2 shadow-lg"
            >
              <span>Open Official Google Form</span>
              <i className="bi bi-box-arrow-up-right"></i>
            </a>

            <span className="text-secondary opacity-75 d-block mt-3" style={{ fontSize: '0.75rem' }}>
              Forms are powered securely via Google Forms • Official MITS ACM Registration
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
