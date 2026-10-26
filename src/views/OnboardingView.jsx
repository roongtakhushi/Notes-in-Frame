import React from 'react';
import { ChevronLeft, ArrowRight, Camera } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FilmStripDecoration } from '../components/PhotographicPreviews';

export const OnboardingView = () => {
  const { navigateTo } = useApp();

  const handleFinishOnboarding = () => {
    try {
      localStorage.setItem('nif_onboarding_seen', 'true');
    } catch (e) {}
    navigateTo('home');
  };

  const handleBackToLanding = () => {
    navigateTo('landing');
  };

  return (
    <div className="onboarding-screen-container">
      {/* Top Header Bar */}
      <div className="onboarding-top-bar">
        <button
          className="btn-back-round"
          onClick={handleBackToLanding}
          aria-label="Back to Welcome"
        >
          <ChevronLeft size={22} strokeWidth={2.4} />
        </button>
        <button
          className="btn-skip-onboarding"
          onClick={handleFinishOnboarding}
          aria-label="Skip onboarding"
        >
          Skip
        </button>
      </div>

      {/* Main Collage Hero: Polaroid + Post-it + Filmstrip */}
      <div className="onboarding-collage-stage">
        {/* Filmstrip Accent in Background */}
        <div className="onboarding-filmstrip-bg">
          <FilmStripDecoration vertical style={{ height: '240px', width: '28px' }} />
        </div>

        {/* Central Polaroid of Handwritten Notes + Pen */}
        <div className="onboarding-polaroid-card">
          <div className="onboarding-washi-tape-pink" />
          
          <div className="onboarding-photo-frame">
            {/* Lined notebook paper with handwritten derivation */}
            <div className="onboarding-notes-paper">
              <div className="onboarding-red-margin" />
              <div className="onboarding-handwritten-lines">
                <span className="line-highlight">Unit 1 • Core Principles</span>
                <span>1. Gradient Descent: θ = θ - α∇J</span>
                <span>2. Loss minimization: min ∑(y - ŷ)²</span>
                <span className="line-math">✓ Exam PYQ Repeated (2022-24)</span>
                <span>3. Backpropagation chain rule</span>
              </div>
              {/* Stylized Pen lying beside notes */}
              <div className="onboarding-pen-prop" aria-hidden="true">
                <div className="pen-body" />
                <div className="pen-nib" />
              </div>
            </div>
          </div>
        </div>

        {/* Yellow/Pastel Sticky Note pinned to left */}
        <div className="onboarding-sticky-note">
          <span className="sticky-pin" />
          <div className="sticky-text">
            Study<br />
            Share<br />
            Grow ☺
          </div>
        </div>

        {/* Vintage Camera Icon Sticker Bottom-Right */}
        <div className="onboarding-camera-sticker" aria-hidden="true">
          <div className="camera-sticker-lens">
            <Camera size={22} color="#1E293B" strokeWidth={2.2} />
          </div>
        </div>
      </div>

      {/* Typography Content */}
      <div className="onboarding-text-content">
        <h2 className="onboarding-title">
          All Your <br />
          Study Resources <br />
          in One Place
        </h2>
        <p className="onboarding-subtitle">
          Notes, PYQs, revision guides and more — organized for you.
        </p>
      </div>

      {/* Footer Navigation Bar */}
      <div className="onboarding-footer-bar">
        {/* Mini camera icon on left */}
        <div className="onboarding-footer-cam-icon" aria-hidden="true">
          <Camera size={20} color="#407ADD" />
        </div>

        {/* Carousel Dots */}
        <div className="onboarding-carousel-dots" aria-label="Step 2 of 4">
          <span className="dot" />
          <span className="dot active" />
          <span className="dot" />
          <span className="dot" />
        </div>

        {/* Blue Circular Next Button */}
        <button
          className="btn-circle-next"
          onClick={handleFinishOnboarding}
          aria-label="Enter Campus Hub"
        >
          <ArrowRight size={22} color="#FFFFFF" strokeWidth={2.6} />
        </button>
      </div>
    </div>
  );
};
