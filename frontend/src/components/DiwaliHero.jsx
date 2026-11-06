import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import './DiwaliHero.css';

const INTRO_SEEN_KEY = 'acm-diwali-intro-seen';
const INTRO_DURATION_MS = 2900;

const shouldPlayIntro = () => {
  if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }
  try {
    return window.sessionStorage.getItem(INTRO_SEEN_KEY) !== 'true';
  } catch {
    return true;
  }
};

const DiwaliHero = () => {
  const [introPlaying, setIntroPlaying] = useState(shouldPlayIntro);

  const finishIntro = () => {
    setIntroPlaying(false);
    try {
      window.sessionStorage.setItem(INTRO_SEEN_KEY, 'true');
    } catch {
      // safe fallback
    }
  };

  useEffect(() => {
    if (!introPlaying) return undefined;
    const timer = window.setTimeout(finishIntro, INTRO_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [introPlaying]);

  useEffect(() => {
    if (!introPlaying) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [introPlaying]);

  return (
    <>
      <section className="diwali-seasonal-hero">
        <div className="diwali-seasonal-hero__orbit diwali-seasonal-hero__orbit--outer" aria-hidden="true" />
        <div className="diwali-seasonal-hero__orbit diwali-seasonal-hero__orbit--inner" aria-hidden="true" />
        <div className="diwali-seasonal-hero__sparkles" aria-hidden="true">
          {Array.from({ length: 18 }, (_, index) => (
            <i className={`diwali-seasonal-hero__sparkle diwali-seasonal-hero__sparkle--${(index % 14) + 1}`} key={index} />
          ))}
        </div>

        <div className="container diwali-seasonal-hero__content">
          <div className="row align-items-center">
            <div className="col-12 col-md-7">
              <div className="diwali-seasonal-hero__copy">
                <p className="diwali-seasonal-hero__kicker">
                  <span aria-hidden="true" />
                  ✨ Light · Innovation · Celebration ✨
                  <span aria-hidden="true" />
                </p>
                <p className="diwali-seasonal-hero__pretitle">MITS ACM Chapter wishes you a</p>
                <h1 className="diwali-seasonal-hero__title">
                  Happy <span>Diwali<span className="diwali-seasonal-hero__period">.</span></span>
                </h1>
                <p className="diwali-seasonal-hero__subtitle">
                  May your code compile without bugs, your algorithms illuminate new heights,
                  and every innovation brighten the path to an extraordinary future.
                </p>
                <div className="diwali-seasonal-hero__actions">
                  <Link to="/events" className="diwali-seasonal-hero__button">
                    Explore Chapter Events <span aria-hidden="true">↗</span>
                  </Link>
                  <Link to="/join-us" className="btn btn-acm-outline btn-sm px-3 py-2 text-info">
                    Join Community
                  </Link>
                </div>
              </div>
            </div>

            <div className="diwali-seasonal-hero__art-column col-10 col-sm-8 col-md-5 mx-auto">
              <div
                className="diwali-seasonal-hero__art"
                role="img"
                aria-label="Festive festive celebration with golden glowing diyas and mandala"
              >
                <div className="diwali-seasonal-hero__halo diwali-seasonal-hero__halo--outer" />
                <div className="diwali-seasonal-hero__halo diwali-seasonal-hero__halo--inner" />
                <div className="diwali-seasonal-hero__mandala" aria-hidden="true">
                  {Array.from({ length: 8 }, (_, index) => <span key={index} />)}
                </div>
                {[['back', 'diwali-seasonal-hero__diya--back'], ['front', 'diwali-seasonal-hero__diya--front']].map(([key, className]) => (
                  <div className={`diwali-seasonal-hero__diya ${className}`} key={key} aria-hidden="true">
                    <span className="diwali-seasonal-hero__flame" />
                    <span className="diwali-seasonal-hero__wick" />
                    <span className="diwali-seasonal-hero__bowl"><i /></span>
                    <span className="diwali-seasonal-hero__glow" />
                  </div>
                ))}
                <span className="diwali-seasonal-hero__petal diwali-seasonal-hero__petal--one" aria-hidden="true" />
                <span className="diwali-seasonal-hero__petal diwali-seasonal-hero__petal--two" aria-hidden="true" />
                <span className="diwali-seasonal-hero__petal diwali-seasonal-hero__petal--three" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="diwali-seasonal-hero__signature">
            <span>01</span>
            <span className="diwali-seasonal-hero__signature-rule" aria-hidden="true" />
            <img src="/assets/mits-logo.png" alt="Madhav Institute of Technology and Science" />
            <span>MITS ACM STUDENT CHAPTER • Festival of Lights</span>
          </div>
        </div>
      </section>

      {/* SPECTACULAR HAPPY DIWALI LOADING SCREEN (REPLACED SINGLE DIYA WITH FESTIVE CELEBRATION) */}
      {introPlaying && createPortal(
        <div
          className="festive-diwali-loader"
          role="dialog"
          aria-modal="true"
          aria-label="Happy Diwali Greetings"
          onClick={finishIntro}
        >
          {/* Background particle galaxy */}
          <div className="festive-diwali-loader__particles" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} className={`festive-diwali-star star-${(i % 6) + 1}`} />
            ))}
          </div>

          <div className="festive-diwali-card">
            {/* Spinning decorative golden rings */}
            <div className="festive-gold-ring ring-outer" />
            <div className="festive-gold-ring ring-inner" />

            <div className="festive-badge">
              <i className="bi bi-sparkles text-warning me-1"></i> MITS ACM GREETINGS <i className="bi bi-sparkles text-warning ms-1"></i>
            </div>

            <h1 className="festive-diwali-title">
              Happy <span className="festive-glow-text">Diwali!</span>
            </h1>

            <p className="festive-diwali-tagline">
              ✨ Wishing you endless light, happiness, prosperity & innovative breakthroughs ✨
            </p>

            {/* Glowing progress line */}
            <div className="festive-loader-bar">
              <div className="festive-loader-progress" />
            </div>

            <div className="festive-action-row">
              <span className="festive-chapter-label">MITS ACM STUDENT CHAPTER</span>
              <button 
                type="button" 
                className="festive-skip-btn" 
                onClick={(e) => { e.stopPropagation(); finishIntro(); }}
              >
                Enter Chapter <i className="bi bi-arrow-right ms-1"></i>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default DiwaliHero;
