import React from 'react';
import { Link } from 'react-router-dom';
import { RECRUITMENT_FORM_URL } from '../constants';
import './DiwaliHero.css';

const DiwaliHero = () => {
  return (
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
                  <a href={RECRUITMENT_FORM_URL} target="_blank" rel="noreferrer" className="btn btn-acm-outline btn-sm px-3 py-2 text-info">
                    Join Community <i className="bi bi-box-arrow-up-right small ms-1" style={{ fontSize: '0.7rem' }}></i>
                  </a>
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
  );
};

export default DiwaliHero;
