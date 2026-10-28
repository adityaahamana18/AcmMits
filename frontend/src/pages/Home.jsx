import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../services/api';

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
    { title: 'Data Structures & Algorithms', icon: 'bi-code-slash', desc: 'Master competitive programming, algorithms, complexity analysis, and coding interviews.', color: '#38bdf8' },
    { title: 'AI & Machine Learning', icon: 'bi-cpu', desc: 'Explore neural networks, computer vision, deep learning frameworks, and generative AI.', color: '#c084fc' },
    { title: 'Full Stack & Cloud Systems', icon: 'bi-globe2', desc: 'Build reactive, cloud-native applications using React, Python Flask, and PostgreSQL.', color: '#60a5fa' },
    { title: 'Cybersecurity & Defense', icon: 'bi-shield-check', desc: 'Delve into ethical hacking, cryptography, security audits, and defensive programming.', color: '#34d399' },
    { title: 'Hackathons & Innovation', icon: 'bi-lightning-charge', desc: 'Prototype disruptive solutions under 36-hour sprint challenges and win national honors.', color: '#fbbf24' },
    { title: 'Research & Open Source', icon: 'bi-journal-code', desc: 'Publish computing papers and contribute to high-impact open source repositories.', color: '#f472b6' }
  ];

  return (
    <div className="position-relative overflow-hidden cyber-grid-bg">
      {/* Background Radial Lights */}
      <div className="radial-glow-top"></div>
      <div className="radial-glow-accent top-50 start-0"></div>

      {/* Announcements Ribbon */}
      {announcements.length > 0 && (
        <div 
          className="py-2 border-bottom border-secondary border-opacity-25"
          style={{ background: 'linear-gradient(90deg, rgba(30, 58, 138, 0.4), rgba(59, 130, 246, 0.2), rgba(30, 58, 138, 0.4))' }}
        >
          <div className="container text-center">
            <span className="badge bg-primary text-uppercase me-2 py-1 px-2" style={{ fontSize: '0.65rem' }}>Announcement</span>
            <span className="small text-light me-2">{announcements[0].title}</span>
            <Link to={announcements[0].link_url || '/events'} className="text-info text-decoration-none small fw-semibold">
              Check details <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="container py-5 my-md-4 text-center position-relative z-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-acm mb-4 d-inline-flex align-items-center gap-2">
            <i className="bi bi-stars text-info"></i> Affiliated with ACM (Association for Computing Machinery)
          </span>

          <h1 className="display-3 fw-bolder font-heading text-white hero-heading mb-3">
            MITS ACM <br />
            <span className="text-gradient-acm">STUDENT CHAPTER</span>
          </h1>

          <p className="fs-4 fw-semibold text-light mb-2 font-heading" style={{ letterSpacing: '0.05em' }}>
            {settings.tagline || 'Code. Create. Connect.'}
          </p>

          <p className="lead text-secondary mx-auto mb-5" style={{ maxWidth: '640px', fontSize: '1.15rem' }}>
            {settings.hero_supporting_text || 'Empowering the next generation of computing professionals at MITS Gwalior.'}
          </p>

          {/* CTA Buttons - fully responsive */}
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <Link to="/events" className="btn btn-acm-primary px-4 py-3 d-flex align-items-center justify-content-center gap-2">
              <span>Explore Events</span>
              <i className="bi bi-calendar-event"></i>
            </Link>
            <Link to="/team" className="btn btn-acm-outline px-4 py-3 d-flex align-items-center justify-content-center gap-2">
              <span>Meet Our Team</span>
              <i className="bi bi-people"></i>
            </Link>
            <Link to="/join-us" className="btn btn-acm-outline px-4 py-3 text-info border-info border-opacity-25 d-flex align-items-center justify-content-center gap-2">
              <span>Join Chapter</span>
              <i className="bi bi-send-check"></i>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="border-top border-bottom border-secondary border-opacity-25 py-4 my-5" style={{ background: 'rgba(3, 7, 18, 0.7)' }}>
        <div className="container">
          <div className="row text-center gy-4">
            <div className="col-6 col-md-3">
              <h2 className="display-5 fw-bold text-gradient-acm font-heading mb-1">{settings.stat_members || '250+'}</h2>
              <span className="small text-secondary text-uppercase fw-semibold" style={{ letterSpacing: '0.08em' }}>Active Members</span>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="display-5 fw-bold text-gradient-acm font-heading mb-1">{settings.stat_events || '30+'}</h2>
              <span className="small text-secondary text-uppercase fw-semibold" style={{ letterSpacing: '0.08em' }}>Events Conducted</span>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="display-5 fw-bold text-gradient-acm font-heading mb-1">{settings.stat_workshops || '18+'}</h2>
              <span className="small text-secondary text-uppercase fw-semibold" style={{ letterSpacing: '0.08em' }}>Workshops Hosted</span>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="display-5 fw-bold text-gradient-acm font-heading mb-1">{settings.stat_projects || '45+'}</h2>
              <span className="small text-secondary text-uppercase fw-semibold" style={{ letterSpacing: '0.08em' }}>Projects & Awards</span>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER OVERVIEW / TERMINAL DISPLAY */}
      <section className="container py-5">
        <div className="row align-items-center gy-5">
          <div className="col-12 col-lg-6">
            <span className="badge-acm mb-3 d-inline-block">About The Community</span>
            <h2 className="display-6 fw-bold text-white font-heading mb-4">
              Cultivating Engineering Rigor, Code Mastery, and Peer Leadership
            </h2>
            <p className="text-secondary leading-relaxed mb-4">
              {settings.about_summary || 'MITS ACM STUDENT CHAPTER provides an open, collaborative ecosystem for computing students at Madhav Institute of Technology & Science, Gwalior. From first-year beginners to competitive programmers and researchers, our chapter unlocks opportunities for exponential technical growth.'}
            </p>

            <div className="d-flex flex-column gap-3 mb-4">
              <div className="d-flex align-items-start gap-3">
                <i className="bi bi-check2-circle text-info fs-5 mt-n1"></i>
                <span className="text-light small">Weekly algorithmic sprint sessions and Codeforces practice meetups</span>
              </div>
              <div className="d-flex align-items-start gap-3">
                <i className="bi bi-check2-circle text-info fs-5 mt-n1"></i>
                <span className="text-light small">Intensive workshops covering modern Full Stack, AI/ML, and Cloud architecture</span>
              </div>
              <div className="d-flex align-items-start gap-3">
                <i className="bi bi-check2-circle text-info fs-5 mt-n1"></i>
                <span className="text-light small">National hackathons and sponsored technical events with industry mentors</span>
              </div>
            </div>

            <Link to="/about" className="btn btn-acm-outline btn-sm">
              Read Our Charter & Faculty Governance <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="col-12 col-lg-6">
            <div className="acm-card p-4 shadow-lg border-secondary border-opacity-50 position-relative">
              <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom border-secondary border-opacity-25">
                <div className="d-flex gap-2">
                  <span className="rounded-circle bg-danger" style={{ width: '12px', height: '12px' }}></span>
                  <span className="rounded-circle bg-warning" style={{ width: '12px', height: '12px' }}></span>
                  <span className="rounded-circle bg-success" style={{ width: '12px', height: '12px' }}></span>
                </div>
                <span className="text-secondary small font-monospace">mits_acm_chapter.py</span>
              </div>
              <pre className="text-light mb-0" style={{ fontSize: '0.85rem' }}>
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

mits_acm = MITSACMChapter()
mits_acm.build_future()`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED EVENTS SECTION */}
      <section className="py-5" style={{ background: 'rgba(3, 7, 18, 0.5)' }}>
        <div className="container">
          <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between mb-4">
            <div>
              <span className="badge-acm mb-2 d-inline-block">Flagship & Contests</span>
              <h2 className="h1 fw-bold text-white font-heading mb-0">Featured Events</h2>
            </div>
            <Link to="/events" className="text-info text-decoration-none fw-semibold mt-3 mt-md-0 small">
              View All Events <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          <div className="row g-4">
            {featuredEvents.map((ev) => (
              <div key={ev.id} className="col-12 col-md-6 col-lg-4">
                <div className="acm-card h-100 d-flex flex-column">
                  <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
                    <img 
                      src={ev.poster_url || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80'} 
                      alt={ev.title}
                      className="w-100 h-100 object-fit-cover"
                    />
                    <span className="position-absolute top-0 start-0 m-3 badge bg-primary">
                      {ev.category}
                    </span>
                    <span className={`position-absolute top-0 end-0 m-3 badge ${ev.status === 'Upcoming' ? 'bg-success' : 'bg-secondary'}`}>
                      {ev.status}
                    </span>
                  </div>

                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <h5 className="text-white font-heading fw-bold mb-2">{ev.title}</h5>
                    <p className="text-secondary small mb-4 flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {ev.short_description}
                    </p>

                    <div className="small text-secondary mb-4 d-flex flex-column gap-2">
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
                      Details & Registration
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="container py-5 my-4">
        <div className="text-center mb-5">
          <span className="badge-acm mb-2 d-inline-block">Our Focus</span>
          <h2 className="display-6 fw-bold text-white font-heading">
            Specialized Technical Domains
          </h2>
          <p className="text-secondary small mx-auto" style={{ maxWidth: '540px' }}>
            Structured learning groups and hands-on tracks maintained by chapter leads at MITS Gwalior.
          </p>
        </div>

        <div className="row g-4">
          {focusAreas.map((area, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-4">
              <div className="acm-card p-4 h-100">
                <div 
                  className="p-3 rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ background: 'rgba(255, 255, 255, 0.05)', color: area.color, fontSize: '1.5rem' }}
                >
                  <i className={`bi ${area.icon}`}></i>
                </div>
                <h5 className="text-white font-heading fw-bold mb-2">{area.title}</h5>
                <p className="text-secondary small mb-0 lh-base">{area.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="container py-5 my-md-4">
        <div 
          className="acm-card p-5 text-center position-relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(30,58,138,0.5), rgba(15,23,42,0.8), rgba(76,29,149,0.5))' }}
        >
          <h2 className="display-6 fw-bold text-white font-heading mb-3">
            Ready to Accelerate Your Engineering Career?
          </h2>
          <p className="lead text-light mb-4 mx-auto" style={{ maxWidth: '600px', fontSize: '1.05rem' }}>
            Join MITS ACM STUDENT CHAPTER to connect with brilliant peers, participate in hackathons, and build projects that stand out globally.
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <Link to="/join-us" className="btn btn-acm-primary px-4 py-2">
              Apply For Membership
            </Link>
            <Link to="/contact" className="btn btn-acm-outline px-4 py-2">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
