import React from 'react';
import { Home, Compass, Plus, BookmarkCheck, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileBottomNav = () => {
  const { currentView, navigateTo } = useApp();

  // Hide bottom nav on splash/landing and onboarding (Screens 1 and 2), and on detail/upload
  if (['landing', 'onboarding', 'detail', 'upload'].includes(currentView)) {
    return null;
  }

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
      {/* Slot 1: Home */}
      <button
        className={`bottom-nav-item ${currentView === 'home' ? 'active' : ''}`}
        onClick={() => navigateTo('home')}
        aria-label="Home"
        title="Home Feed"
      >
        <div className="nav-icon-wrap">
          <Home size={22} strokeWidth={2.2} />
        </div>
      </button>

      {/* Slot 2: Explore */}
      <button
        className={`bottom-nav-item ${currentView === 'explore' ? 'active' : ''}`}
        onClick={() => navigateTo('explore')}
        aria-label="Explore Notes"
        title="Explore Notes & PYQs"
      >
        <div className="nav-icon-wrap">
          <Compass size={22} strokeWidth={2.2} />
        </div>
      </button>

      {/* Slot 3: Exact Center Upload Action (+) */}
      <div className="bottom-nav-center-action">
        <button
          className="btn-center-upload"
          onClick={() => navigateTo('upload')}
          aria-label="Share and Upload Notes"
          title="Share Your Notes"
        >
          <Plus size={28} strokeWidth={2.8} />
        </button>
      </div>

      {/* Slot 4: Collections */}
      <button
        className={`bottom-nav-item ${currentView === 'collections' ? 'active' : ''}`}
        onClick={() => navigateTo('collections')}
        aria-label="Collections"
        title="My Collections"
      >
        <div className="nav-icon-wrap">
          <BookmarkCheck size={22} strokeWidth={2.2} />
        </div>
      </button>

      {/* Slot 5: Exam Rescue (Signature Innovation - replaces duplicate profile button) */}
      <button
        className={`bottom-nav-item ${currentView === 'exam-rescue' ? 'active' : ''}`}
        onClick={() => navigateTo('exam-rescue')}
        aria-label="Exam Rescue Planner"
        title="Exam Rescue Planner"
      >
        <div className="nav-icon-wrap">
          <Zap size={22} strokeWidth={2.2} />
        </div>
      </button>
    </nav>
  );
};
