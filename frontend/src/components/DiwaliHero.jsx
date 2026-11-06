import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import './DiwaliHero.css';

const INTRO_SEEN_KEY = 'acm-diwali-intro-seen';
const INTRO_DURATION_MS = 2600;

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
  const finishIntro = useCallback(() => {
    setIntroPlaying(false);
    try {
      window.sessionStorage.setItem(INTRO_SEEN_KEY, 'true');
    } catch {
      // The intro still completes normally when session storage is unavailable.
    }
  }, []);

  useEffect(() => {
    if (!introPlaying) return undefined;

    const timer = window.setTimeout(finishIntro, INTRO_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [finishIntro, introPlaying]);

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
          {Array.from({ length: 14 }, (_, index) => (
            <i className={`diwali-seasonal-hero__sparkle diwali-seasonal-hero__sparkle--${index + 1}`} key={index} />
          ))}
        </div>

        <div className="container diwali-seasonal-hero__content">
          <div className="row align-items-center">
            <div className="col-12 col-md-7">
              <div className="diwali-seasonal-hero__copy">
                <p className="diwali-seasonal-hero__kicker">
                  <span aria-hidden="true" />
                  Light · Joy · New Beginnings
                  <span aria-hidden="true" />
                </p>
                <p className="diwali-seasonal-hero__pretitle">Wishing you a</p>
                <h1 className="diwali-seasonal-hero__title">
                  Happy <span>Diwali<span className="diwali-seasonal-hero__period">.</span></span>
                </h1>
                <p className="diwali-seasonal-hero__subtitle">
                  May your ideas shine bright, your days be filled with joy, and every new beginning
                  lead to something extraordinary.
                </p>
                <div className="diwali-seasonal-hero__actions">
                  <Link to="/events" className="diwali-seasonal-hero__button">
                    Explore chapter events <span aria-hidden="true">↗</span>
                  </Link>
                  <span className="diwali-seasonal-hero__signoff">With warm wishes from your ACM family</span>
                </div>
              </div>
            </div>

            <div className="diwali-seasonal-hero__art-column col-10 col-sm-8 col-md-5 mx-auto">
              <div
                className="diwali-seasonal-hero__art"
                role="img"
                aria-label="Two glowing traditional lamps surrounded by a festive mandala"
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
            <span>A season of light and possibility</span>
          </div>
        </div>
      </section>
      {introPlaying && createPortal(
        <div
          className="diwali-loading"
          role="dialog"
          aria-modal="true"
          aria-labelledby="diwali-loading-message"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              finishIntro();
            } else if (event.key === 'Tab') {
              event.preventDefault();
              document.querySelector('.diwali-loading__skip')?.focus();
            }
          }}
        >
          <div className="diwali-loading__light" aria-hidden="true" />
          <div className="diwali-loading__scene" aria-hidden="true">
            <div className="diwali-seasonal-hero__halo diwali-seasonal-hero__halo--outer" />
            <div className="diwali-seasonal-hero__halo diwali-seasonal-hero__halo--inner" />
            <div className="diwali-seasonal-hero__mandala">
              {Array.from({ length: 8 }, (_, index) => <span key={index} />)}
            </div>
            <div className="diwali-seasonal-hero__diya diwali-seasonal-hero__diya--front diwali-loading__diya">
              <span className="diwali-seasonal-hero__flame" />
              <span className="diwali-seasonal-hero__wick" />
              <span className="diwali-seasonal-hero__bowl"><i /></span>
              <span className="diwali-seasonal-hero__glow" />
            </div>
          </div>
          <p className="diwali-loading__message" id="diwali-loading-message">Lighting a diya</p>
          <button type="button" className="diwali-loading__skip" onClick={finishIntro} autoFocus>
            Skip animation
          </button>
        </div>,
        document.body
      )}
    </>
  );
};

export default DiwaliHero;
