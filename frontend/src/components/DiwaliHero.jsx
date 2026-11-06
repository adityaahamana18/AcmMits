import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import FestiveLoadingCrackers from './FestiveLoadingCrackers';
import './DiwaliHero.css';

const INTRO_SEEN_KEY = 'acm-diwali-intro-seen';
const INTRO_DURATION_MS = 3200;

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
                aria-label="Festive celebration with golden glowing diyas and mandala"
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

      {/* 3D-STYLED ULTRA FESTIVE DIWALI LOADING SCREEN (WITH BURSTING CRACKERS & 3D FLOATING PERSPECTIVE) */}
      {introPlaying && createPortal(
        <div
          className="festive-diwali-loader"
          role="dialog"
          aria-modal="true"
          aria-label="Happy Diwali Greetings"
          onClick={finishIntro}
        >
          {/* Crackers explosion background on loading screen only */}
          <FestiveLoadingCrackers />

          {/* 3D Glowing Festive Greeting Container */}
          <div className="festive-diwali-3d-wrapper">
            <div className="festive-diwali-card festive-3d-card">
              {/* 3D Golden Gyroscope Rings */}
              <div className="festive-gold-ring ring-outer festive-gyro-3d" />
              <div className="festive-gold-ring ring-inner festive-gyro-3d-reverse" />

              {/* Glowing 3D Lantern Icon */}
              <div className="festive-3d-icon-bubble">
                <i className="bi bi-stars fs-2 text-warning animate-pulse"></i>
              </div>

              <div className="festive-badge">
                ✨ MITS ACM GREETINGS ✨
              </div>

              <h1 className="festive-diwali-title">
                Happy <span className="festive-glow-text">Diwali!</span>
              </h1>

              <p className="festive-diwali-tagline">
                May the divine radiance of the festival illuminate your ambitions, bring peace, joy & infinite success.
              </p>

              {/* Animated Progress bar */}
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
                  Enter Site <i className="bi bi-arrow-right ms-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default DiwaliHero;
