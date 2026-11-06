import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import DiwaliHero from '../components/DiwaliHero';

const Home = () => {
  const [settings, setSettings] = useState({});
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, eventsRes, annRes] = await Promise.all([
          api.getSettings(),
          api.getEvents({ featured: 'true' }),
          api.getAnnouncements()
        ]);
        if (settingsRes.success) setSettings(settingsRes.data);
        if (eventsRes.success) setFeaturedEvents(eventsRes.data);
        if (annRes.success) setAnnouncements(annRes.data);
      } catch (err) {
        console.error('Failed to load home data', err);
      }
    };
    fetchData();
  }, []);

  const focusAreas = [
    { title: 'Data Structures & Algorithms', icon: 'bi-code-slash', desc: 'Master competitive programming, algorithms, complexity analysis, and coding interviews.', color: '#38bdf8', gradient: 'linear-gradient(135deg, rgba(56,189,248,0.15), rgba(37,99,235,0.05))' },
    { title: 'AI & Machine Learning', icon: 'bi-cpu', desc: 'Explore neural networks, computer vision, deep learning frameworks, and generative AI.', color: '#c084fc', gradient: 'linear-gradient(135deg, rgba(192,132,252,0.15), rgba(124,58,237,0.05))' },
    { title: 'Full Stack & Cloud Systems', icon: 'bi-globe2', desc: 'Build reactive, cloud-native applications using React, Python Flask, and PostgreSQL.', color: '#60a5fa', gradient: 'linear-gradient(135deg, rgba(96,165,250,0.15), rgba(2,132,199,0.05))' },
    { title: 'Cybersecurity & Defense', icon: 'bi-shield-check', desc: 'Delve into ethical hacking, cryptography, security audits, and defensive programming.', color: '#34d399', gradient: 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(16,185,129,0.05))' },
    { title: 'Hackathons & Innovation', icon: 'bi-lightning-charge', desc: 'Prototype disruptive solutions under 36-hour sprint challenges and win national honors.', color: '#fbbf24', gradient: 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(245,158,11,0.05))' },
    { title: 'Research & Open Source', icon: 'bi-journal-code', desc: 'Publish computing papers and contribute to high-impact open source repositories.', color: '#f472b6', gradient: 'linear-gradient(135deg, rgba(244,114,182,0.15), rgba(219,39,119,0.05))' }
  ];

  return (
    <div className="position-relative overflow-hidden cyber-grid-bg">
      {/* Background Animated Gradient Orbs */}
      <div className="radial-glow-top animate-pulse-glow"></div>
      <div className="radial-glow-accent top-50 start-0 animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      <div className="radial-glow-accent bottom-0 end-0" style={{ width: '450px', height: '450px', opacity: 0.15 }}></div>

      {/* Announcements Ribbon with Glowing Badge */}
      {announcements.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-2 border-bottom border-secondary border-opacity-25"
          style={{ background: 'linear-gradient(90deg, rgba(30, 58, 138, 0.4), rgba(59, 130, 246, 0.2), rgba(30, 58, 138, 0.4))' }}
        >
          <div className="container text-center">
            <span className="badge bg-primary text-uppercase me-2 py-1 px-2 shadow-sm" style={{ fontSize: '0.65rem' }}>
              <i className="bi bi-bell-fill me-1"></i> Update
            </span>
            <span className="small text-light me-2">{announcements[0].title}</span>
            <Link to={announcements[0].link_url || '/events'} className="text-info text-decoration-none small fw-semibold">
              Check details <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </motion.div>
      )}

      {/* FESTIVE HERO SECTION */}
      <DiwaliHero />

      {/* ANIMATED REALISTIC STATS SECTION */}
      <section className="border-top border-bottom border-secondary border-opacity-25 py-5 my-5 position-relative" style={{ background: 'rgba(3, 7, 18, 0.85)' }}>
        <div className="container">
          <div className="row text-center gy-4">
            {[
              { num: settings.stat_members || '250+', label: 'Active Members', icon: 'bi-people-fill', color: '#38bdf8' },
              { num: settings.stat_events || '30+', label: 'Events Conducted', icon: 'bi-calendar-check-fill', color: '#60a5fa' },
              { num: settings.stat_workshops || '18+', label: 'Workshops Hosted', icon: 'bi-laptop-fill', color: '#a855f7' },
              { num: settings.stat_projects || '45+', label: 'Projects & Awards', icon: 'bi-trophy-fill', color: '#f59e0b' }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                className="col-6 col-md-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="p-3 rounded-4 acm-stat-box h-100 d-flex flex-column justify-content-center align-items-center">
                  <div className="p-2 rounded-circle mb-2" style={{ background: 'rgba(255,255,255,0.05)', color: stat.color }}>
                    <i className={`bi ${stat.icon} fs-4`}></i>
                  </div>
                  <h2 className="display-5 fw-bold text-gradient-acm font-heading mb-1">{stat.num}</h2>
                  <span className="small text-secondary text-uppercase fw-semibold" style={{ letterSpacing: '0.08em', fontSize: '0.75rem' }}>
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CHAPTER OVERVIEW / REALISTIC INTERACTIVE TERMINAL */}
      <section className="container py-5 my-3">
        <div className="row align-items-center gy-5">
          <motion.div 
            className="col-12 col-lg-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-acm mb-3 d-inline-block">
              <i className="bi bi-shield-check me-1"></i> Core Foundation
            </span>
            <h2 className="display-6 fw-bold text-white font-heading mb-4">
              Cultivating Engineering Rigor, Code Mastery & Community
            </h2>
            <p className="text-secondary leading-relaxed mb-4">
              {settings.about_summary || 'MITS ACM STUDENT CHAPTER provides an open, collaborative ecosystem for computing students at Madhav Institute of Technology & Science, Gwalior. From first-year beginners to competitive programmers and researchers, our chapter unlocks opportunities for exponential technical growth.'}
            </p>

            <div className="d-flex flex-column gap-3 mb-4">
              {[
                { title: 'Weekly Coding Sprints', desc: 'Curated LeetCode & Codeforces algorithmic problem discussions.' },
                { title: 'Masterclass Workshops', desc: 'Hands-on tracks covering React, Python Flask, Cloud native & GenAI.' },
                { title: 'National Hackathon Delegation', desc: 'Direct chapter sponsorship, team incubation & mentor feedback.' }
              ].map((item, idx) => (
                <div key={idx} className="d-flex align-items-start gap-3 p-2 rounded-3 acm-list-hover">
                  <i className="bi bi-check2-circle text-info fs-5 mt-n1"></i>
                  <div>
                    <strong className="text-white small d-block">{item.title}</strong>
                    <span className="text-secondary small">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/about" className="btn btn-acm-outline btn-sm">
              Read Chapter Charter & Governance <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </motion.div>

          <motion.div 
            className="col-12 col-lg-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="acm-card p-4 shadow-2xl border-secondary border-opacity-50 position-relative animate-float">
              <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom border-secondary border-opacity-25">
                <div className="d-flex gap-2">
                  <span className="rounded-circle bg-danger" style={{ width: '12px', height: '12px' }}></span>
                  <span className="rounded-circle bg-warning" style={{ width: '12px', height: '12px' }}></span>
                  <span className="rounded-circle bg-success" style={{ width: '12px', height: '12px' }}></span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-dark border border-secondary text-info font-monospace py-1" style={{ fontSize: '0.7rem' }}>
                    Python 3.13
                  </span>
                  <span className="text-secondary small font-monospace">mits_acm_chapter.py</span>
                </div>
              </div>
              <pre className="text-light mb-0" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
                <code>{`class MITSACMChapter:
    def __init__(self):
        self.chapter = "MITS ACM STUDENT CHAPTER"
        self.institution = "MITS Gwalior"
        self.motto = "Code. Create. Connect."
        self.wings = ["Technical", "DSA", "Design", "PR", "Events"]

    def build_future(self):
        while True:
            self.solve_problems()
            self.build_applications()
            self.collaborate_with_peers()

# Welcome to MITS ACM Community!
chapter = MITSACMChapter()
chapter.build_future()`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED EVENTS SECTION WITH CARDS */}
      <section className="py-5" style={{ background: 'rgba(3, 7, 18, 0.6)' }}>
        <div className="container">
          <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between mb-4">
            <div>
              <span className="badge-acm mb-2 d-inline-block">Flagship & Contests</span>
              <h2 className="h1 fw-bold text-white font-heading mb-0">Featured Events</h2>
            </div>
            <Link to="/events" className="text-info text-decoration-none fw-semibold mt-3 mt-md-0 small">
              View All Events ({featuredEvents.length}) <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          <div className="row g-4">
            {featuredEvents.map((ev, idx) => (
              <motion.div 
                key={ev.id} 
                className="col-12 col-md-6 col-lg-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <div className="acm-card h-100 d-flex flex-column">
                  <div className="position-relative overflow-hidden" style={{ height: '210px' }}>
                    <img 
                      src={ev.poster_url || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80'} 
                      alt={ev.title}
                      className="w-100 h-100 object-fit-cover acm-zoom-img"
                    />
                    <div className="position-absolute top-0 start-0 m-3">
                      <span className="badge bg-primary shadow-sm">{ev.category}</span>
                    </div>
                    <div className="position-absolute top-0 end-0 m-3">
                      <span className={`badge ${ev.status === 'Upcoming' ? 'bg-success' : 'bg-secondary'} shadow-sm`}>
                        {ev.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <h5 className="text-white font-heading fw-bold mb-2">{ev.title}</h5>
                    <p className="text-secondary small mb-4 flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {ev.short_description}
                    </p>

                    <div className="small text-secondary mb-4 d-flex flex-column gap-2 p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-calendar3 text-info"></i>
                        <span>{ev.event_date}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-geo-alt text-info"></i>
                        <span className="text-truncate">{ev.venue}</span>
                      </div>
                    </div>

                    <Link to={`/events/${ev.id}`} className="btn btn-acm-primary w-100 btn-sm">
                      Details & Registration <i className="bi bi-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOCUS DOMAINS WITH INTERACTIVE GLOW */}
      <section className="container py-5 my-4">
        <div className="text-center mb-5">
          <span className="badge-acm mb-2 d-inline-block">Specializations</span>
          <h2 className="display-6 fw-bold text-white font-heading">
            Technical Wings & Mastery Tracks
          </h2>
          <p className="text-secondary small mx-auto" style={{ maxWidth: '540px' }}>
            Structured learning groups and hands-on tracks maintained by chapter leads at MITS Gwalior.
          </p>
        </div>

        <div className="row g-4">
          {focusAreas.map((area, idx) => (
            <motion.div 
              key={idx} 
              className="col-12 col-md-6 col-lg-4"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <div 
                className="acm-card p-4 h-100 d-flex flex-column justify-content-between"
                style={{ background: area.gradient }}
              >
                <div>
                  <div 
                    className="p-3 rounded-3 d-inline-flex align-items-center justify-content-center mb-3 shadow-sm"
                    style={{ background: 'rgba(255, 255, 255, 0.08)', color: area.color, fontSize: '1.6rem' }}
                  >
                    <i className={`bi ${area.icon}`}></i>
                  </div>
                  <h5 className="text-white font-heading fw-bold mb-2">{area.title}</h5>
                  <p className="text-secondary small mb-3 lh-base">{area.desc}</p>
                </div>
                <div className="pt-2 border-top border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
                  <span className="text-secondary" style={{ fontSize: '0.72rem' }}>Domain Wing #0{idx + 1}</span>
                  <i className="bi bi-chevron-right text-info small"></i>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA CARD */}
      <section className="container py-5 my-md-4">
        <motion.div 
          className="acm-card p-5 text-center position-relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(30,58,138,0.6), rgba(15,23,42,0.9), rgba(76,29,149,0.6))' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="radial-glow-accent top-50 start-50 translate-middle" style={{ width: '350px', height: '350px' }}></div>
          <h2 className="display-6 fw-bold text-white font-heading mb-3 position-relative z-1">
            Ready to Accelerate Your Engineering Career?
          </h2>
          <p className="lead text-light mb-4 mx-auto position-relative z-1" style={{ maxWidth: '620px', fontSize: '1.05rem' }}>
            Join MITS ACM STUDENT CHAPTER to connect with brilliant peers, participate in hackathons, and build projects that stand out globally.
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 position-relative z-1">
            <Link to="/join-us" className="btn btn-acm-primary px-4 py-2">
              Apply For Membership <i className="bi bi-person-plus ms-1"></i>
            </Link>
            <Link to="/contact" className="btn btn-acm-outline px-4 py-2">
              Get In Touch <i className="bi bi-envelope ms-1"></i>
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;
