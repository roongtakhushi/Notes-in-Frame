import React, { useState } from 'react';
import { ArrowRight, Camera, Sparkles, X } from 'lucide-react';
import { CampusBuildingPreview, HandwrittenNotesPreview, FilmStripDecoration } from './PhotographicPreviews';

export const OnboardingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ alignItems: 'center', padding: '1rem', zIndex: 120 }}>
      <div
        className="modal-container"
        style={{
          maxWidth: '420px',
          borderRadius: '24px',
          padding: '1.75rem 1.5rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 25px 60px -15px rgba(0,0,0,0.3)',
          border: '1px solid var(--border-light)'
        }}
      >
        {/* Top Header Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-script)', fontSize: '1.35rem', fontWeight: 700 }}>
            <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'var(--color-blue-light)', color: 'var(--color-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Camera size={15} />
            </div>
            <span>notes in frame<span style={{ color: 'var(--color-pink)' }}>.</span></span>
          </div>

          <button
            onClick={onClose}
            style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', padding: '4px 8px' }}
          >
            {step === 1 ? 'Skip' : <X size={20} />}
          </button>
        </div>

        {step === 1 ? (
          /* Step 1: Welcome & Campus Frame */
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.4 }}>
              Your campus knowledge,<br />
              <strong style={{ color: 'var(--text-primary)' }}>captured one frame at a time.</strong>
            </p>

            {/* Polaroid with Campus Photo & Film Strips */}
            <div style={{ position: 'relative', width: '240px', margin: '0 auto 1.75rem' }}>
              {/* Film Strip Behind */}
              <FilmStripDecoration
                vertical={true}
                style={{
                  position: 'absolute',
                  left: '-24px',
                  top: '20px',
                  height: '160px',
                  width: '28px',
                  transform: 'rotate(-10deg)',
                  zIndex: 1
                }}
              />
              <FilmStripDecoration
                vertical={true}
                style={{
                  position: 'absolute',
                  right: '-24px',
                  bottom: '10px',
                  height: '140px',
                  width: '28px',
                  transform: 'rotate(12deg)',
                  zIndex: 1
                }}
              />

              {/* Main Polaroid */}
              <div
                style={{
                  background: '#FFFFFF',
                  padding: '10px 10px 18px 10px',
                  borderRadius: '4px',
                  boxShadow: 'var(--shadow-lifted)',
                  border: '1px solid #E5E7EB',
                  transform: 'rotate(-2deg)',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {/* Pink Washi Tape */}
                <div className="washi-tape pink" style={{ top: '-11px', left: '50%' }}>
                  WELCOME
                </div>

                {/* Campus Image Frame */}
                <div style={{ width: '100%', height: '170px', borderRadius: '2px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                  <CampusBuildingPreview />
                </div>

                <div style={{ fontFamily: 'var(--font-script)', fontSize: '1.15rem', color: 'var(--color-pink-dark)', marginTop: '8px', fontWeight: 700 }}>
                  good notes brighter days ♡
                </div>
              </div>
            </div>

            {/* Get Started Button */}
            <button
              className="btn btn-primary"
              style={{ width: '100%', borderRadius: '9999px', padding: '0.8rem', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}
              onClick={() => setStep(2)}
            >
              <span>Get Started</span>
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          /* Step 2: All Your Study Resources */
          <div style={{ textAlign: 'center' }}>
            {/* Polaroid with Handwritten Note & Sticky Note */}
            <div style={{ position: 'relative', width: '240px', margin: '0 auto 1.5rem' }}>
              {/* Sticky Note Badge */}
              <div
                style={{
                  position: 'absolute',
                  left: '-28px',
                  top: '15px',
                  background: '#FEF08A',
                  color: '#854D0E',
                  padding: '6px 10px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-script)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  transform: 'rotate(-12deg)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  zIndex: 10
                }}
              >
                Study<br />Share<br />Grow :)
              </div>

              {/* Main Polaroid */}
              <div
                style={{
                  background: '#FFFFFF',
                  padding: '10px 10px 16px 10px',
                  borderRadius: '4px',
                  boxShadow: 'var(--shadow-lifted)',
                  border: '1px solid #E5E7EB',
                  transform: 'rotate(2deg)',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <div className="washi-tape pink" style={{ top: '-11px', left: '50%' }}>
                  NOTES
                </div>

                <div style={{ width: '100%', height: '160px', borderRadius: '2px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                  <HandwrittenNotesPreview title="Machine Learning & Algorithms" />
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  EXP 01 • CAMPUS ARCHIVE
                </div>
              </div>
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.25, marginBottom: '0.5rem' }}>
              All Your Study Resources in One Place
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.45 }}>
              Notes, PYQs, revision guides and more — organized for you.
            </p>

            <button
              className="btn btn-blue"
              style={{ width: '56px', height: '56px', borderRadius: '50%', margin: '0 auto 1rem', padding: 0 }}
              onClick={onClose}
              aria-label="Enter application"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        )}

        {/* Carousel Indicator Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
          <span style={{ width: step === 1 ? '18px' : '6px', height: '6px', borderRadius: '9999px', background: step === 1 ? 'var(--color-green)' : '#D1D5DB', transition: 'all 0.2s' }} />
          <span style={{ width: step === 2 ? '18px' : '6px', height: '6px', borderRadius: '9999px', background: step === 2 ? 'var(--color-blue)' : '#D1D5DB', transition: 'all 0.2s' }} />
        </div>
      </div>
    </div>
  );
};
