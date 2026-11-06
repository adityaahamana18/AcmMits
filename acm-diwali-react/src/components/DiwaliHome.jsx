import { useEffect, useState } from "react";
import "./DiwaliHome.css";

const MITS_LOGO = "/assets/mits-logo.png";

export default function DiwaliHome() {
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    // Let the gift-box animation play once when the seasonal page mounts.
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reducedMotion) {
      setIntroFinished(true);
      return;
    }

    const timer = window.setTimeout(() => setIntroFinished(true), 1650);
    return () => window.clearTimeout(timer);
  }, []);

  const revealPage = () => setIntroFinished(true);

  return (
    <main className={`diwali-page ${introFinished ? "intro-complete" : ""}`}>
      {/* Opening gift animation. The button also makes the intro skippable. */}
      {!introFinished && (
        <button
          type="button"
          className="gift-intro"
          onClick={revealPage}
          aria-label="Open the Diwali greeting"
        >
          <span className="gift-intro__eyebrow">A little festive surprise</span>
          <span className="gift-box" aria-hidden="true">
            <span className="gift-box__lid">
              <span className="gift-box__bow gift-box__bow--left" />
              <span className="gift-box__bow gift-box__bow--right" />
              <span className="gift-box__knot" />
            </span>
            <span className="gift-box__body">
              <span className="gift-box__ribbon" />
            </span>
          </span>
          <span className="gift-intro__hint">Tap to unwrap</span>
        </button>
      )}

      <div className="diwali-noise" aria-hidden="true" />
      <div className="diwali-orbit diwali-orbit--one" aria-hidden="true" />
      <div className="diwali-orbit diwali-orbit--two" aria-hidden="true" />
      <div className="diwali-sparkles" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => (
          <i className={`sparkle sparkle-${index + 1}`} key={index} />
        ))}
      </div>

      <header className="diwali-header container-fluid">
        <a className="chapter-brand" href="#home" aria-label="ACM Student Chapter home">
          <span className="chapter-brand__mark">ACM</span>
          <span className="chapter-brand__copy">
            <strong>Student Chapter</strong>
            <small>MITS-DU · GWALIOR</small>
          </span>
        </a>
        <div className="header-festival-tag">
          <span className="header-festival-tag__dot" />
          Festival edition
        </div>
      </header>

      <section className="diwali-hero container" id="home">
        <div className="row align-items-center justify-content-center min-vh-75">
          <div className="col-12 col-lg-7 hero-copy text-center text-lg-start">
            <div className="hero-kicker">
              <span className="hero-kicker__line" />
              LIGHT · JOY · NEW BEGINNINGS
              <span className="hero-kicker__line" />
            </div>

            <p className="hero-pretitle">Wishing you a</p>
            <h1 className="hero-title">
              Happy <span>Diwali</span>
              <span className="hero-title__period">.</span>
            </h1>
            <p className="hero-subtitle">
              May your ideas shine bright, your days be filled with joy,
              and every new beginning lead to something extraordinary.
            </p>

            <div className="hero-actions">
              <a className="btn diwali-primary-btn" href="#wishes">
                Explore the wishes <span aria-hidden="true">↗</span>
              </a>
              <span className="hero-signoff">With warm wishes from your ACM family</span>
            </div>
          </div>

          <div className="col-10 col-sm-8 col-lg-5 hero-art-column">
            <div className="hero-art" aria-label="Illustration of glowing Diwali lamps">
              <div className="art-halo art-halo--outer" />
              <div className="art-halo art-halo--inner" />
              <div className="mandala" aria-hidden="true">
                <span /><span /><span /><span /><span /><span /><span /><span />
              </div>
              <div className="diya diya--back">
                <span className="diya-flame" />
                <span className="diya-wick" />
                <span className="diya-bowl"><i /></span>
                <span className="diya-glow" />
              </div>
              <div className="diya diya--front">
                <span className="diya-flame" />
                <span className="diya-wick" />
                <span className="diya-bowl"><i /></span>
                <span className="diya-glow" />
              </div>
              <div className="floating-petal petal-one" />
              <div className="floating-petal petal-two" />
              <div className="floating-petal petal-three" />
            </div>
          </div>
        </div>
        <div className="hero-bottom-note">
          <span>01</span>
          <span className="hero-bottom-note__rule" />
          <span>A season of light & possibility</span>
        </div>
      </section>

      <section className="wish-strip container" id="wishes">
        <div className="wish-strip__ornament" aria-hidden="true">✦</div>
        <p className="wish-strip__label">A festival of light</p>
        <h2>Let your brightest ideas <em>glow.</em></h2>
        <p className="wish-strip__text">
          This Diwali, may curiosity spark innovation, kindness bring us closer,
          and every challenge become an opportunity to create something meaningful.
        </p>
        <div className="wish-strip__footer">
          <img src={MITS_LOGO} alt="Madhav Institute of Technology and Science" />
          <span>ACM Student Chapter · MITS-DU</span>
        </div>
      </section>

      <footer className="diwali-footer container-fluid">
        <span>© {new Date().getFullYear()} ACM Student Chapter – MITS-DU</span>
        <span>Celebrating light, learning & community <b>✦</b></span>
      </footer>
    </main>
  );
}
