import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CampusBuildingPreview, FilmStripDecoration } from '../components/PhotographicPreviews';

// Four-point geometric star sparkle matching Screen 1 wireframe aesthetic
const FourPointStar = ({ size = 16, color = '#DD88C1', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    color={color}
    className={`landing-sparkle-star ${className}`}
    aria-hidden="true"
  >
    <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
  </svg>
);

export const LandingView = () => {
  const { navigateTo, isLoggedOut, loginUser } = useApp();

  const handleGetStarted = () => {
    if (isLoggedOut) {
      loginUser();
    } else {
      navigateTo('onboarding');
    }
  };

  const line1 = "notes";
  const line2 = "in frame";

  return (
    <div className="landing-screen-container">
      {/* Background Decorative Sparkles matching Screen 1 wireframe */}
      <FourPointStar size={16} color="#407ADD" className="landing-sparkle-star-1" />
      <FourPointStar size={18} color="#DD88C1" className="landing-sparkle-star-2" />
      <FourPointStar size={15} color="#89BC62" className="landing-sparkle-star-3" />
      <FourPointStar size={14} color="#407ADD" className="landing-sparkle-star-4" />

      {/* Top Brand Header */}
      <div className="landing-brand-header">
        <div className="landing-wordmark-wrap">
          <h1 className="landing-wordmark" aria-label="notes in frame.">
            {/* Line 1: "notes" with letter-by-letter handwriting animation */}
            <span className="wordmark-line" aria-hidden="true">
              {line1.split('').map((char, index) => (
                <span
                  key={`l1-${index}`}
                  className="handwriting-glyph"
                  style={{ animationDelay: `${index * 42}ms` }}
                >
                  {char}
                </span>
              ))}
            </span>

            {/* Mascot camera badge positioned beside line 1 */}
            <span
              className="landing-camera-badge"
              style={{ animationDelay: `${line1.length * 42 + 400}ms` }}
              aria-hidden="true"
            >
              <img
                src="/favicon.svg"
                alt="Snap Campus Mascot"
                className="landing-mascot-img"
              />
              <span className="camera-flash-sparkle">
                <Sparkles size={14} color="#DD88C1" />
              </span>
            </span>

            <br />

            {/* Line 2: "in frame" + pink dot "." */}
            <span className="wordmark-line" aria-hidden="true">
              {line2.split('').map((char, index) => (
                <span
                  key={`l2-${index}`}
                  className="handwriting-glyph"
                  style={{
                    animationDelay: `${240 + index * 42}ms`,
                    marginRight: char === ' ' ? '0.32em' : '0'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
              {/* Playful spring dot in daisy pink */}
              <span
                className="brand-dot handwriting-dot"
                style={{ animationDelay: `${240 + line2.length * 42 + 60}ms` }}
              >
                .
              </span>
            </span>
          </h1>
        </div>

        <p className="landing-tagline">
          Your campus knowledge,<br />captured one frame at a time.
        </p>
      </div>

      {/* Central Visual Stage: Tilted Polaroid flanked by film strips */}
      <div className="landing-polaroid-stage">
        {/* Filmstrip Left Flank */}
        <div className="landing-film-flank-left" aria-hidden="true">
          <FilmStripDecoration vertical style={{ height: 'clamp(140px, 24vh, 210px)', width: '28px' }} />
        </div>

        {/* The Star Polaroid Card */}
        <div className="landing-hero-polaroid">
          {/* Authentic Pink Washi Tape holding card */}
          <div className="landing-washi-tape-top" aria-hidden="true" />

          {/* Photo Frame with Classical Campus Building */}
          <div className="landing-photo-box">
            <CampusBuildingPreview />
          </div>

          {/* Handwritten Polaroid Caption */}
          <div className="landing-polaroid-caption">
            <span>good notes</span>
            <span>brighter days ♡</span>
          </div>
        </div>

        {/* Filmstrip Right Flank */}
        <div className="landing-film-flank-right" aria-hidden="true">
          <FilmStripDecoration vertical style={{ height: 'clamp(140px, 24vh, 210px)', width: '28px' }} />
        </div>
      </div>

      {/* Footer Navigation & CTA: Button FIRST, Dots directly below (Screen 1 wireframe layout) */}
      <div className="landing-footer-area">
        {/* Main CTA Button */}
        <button
          className="btn-landing-cta tactile-btn"
          onClick={handleGetStarted}
          aria-label={isLoggedOut ? "Sign In to Campus Hub" : "Get Started"}
        >
          <span>{isLoggedOut ? "Sign In to Campus Hub" : "Get Started"}</span>
          <ArrowRight size={18} strokeWidth={2.4} />
        </button>

        {/* Carousel / Progress Dots beneath CTA */}
        <div className="landing-carousel-dots" aria-label="Progress step 1 of 4">
          <span className="dot active" />
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
      </div>
    </div>
  );
};
