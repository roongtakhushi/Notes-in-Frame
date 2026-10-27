import React, { useState } from 'react';
import {
  X,
  User,
  Home,
  Compass,
  Zap,
  Folder,
  UploadCloud,
  Bookmark,
  Layers,
  Settings,
  LogOut,
  Info,
  Award,
  Flame,
  Download
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FilmStripDecoration } from './PhotographicPreviews';
import { StudentAvatar } from './StudentAvatar';

export const ProfileDrawer = () => {
  const {
    currentUser,
    isProfileDrawerOpen,
    setIsProfileDrawerOpen,
    navigateTo,
    showToast,
    isLoggedOut,
    logoutUser,
    loginUser
  } = useApp();

  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  if (!isProfileDrawerOpen) return null;

  const handleMenuClick = (view) => {
    setIsProfileDrawerOpen(false);
    if (view === 'flashcards') {
      showToast('Flashcards: 24 active high-yield exam cards ready!', 'pink');
      return;
    }
    navigateTo(view);
  };

  const handleClose = () => {
    setIsProfileDrawerOpen(false);
  };

  return (
    <div className="profile-modal-overlay" onClick={handleClose} role="dialog" aria-modal="true">
      <div className="profile-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Pinned Top Header (Never clips, always in view) */}
        <div className="profile-card-header-pinned">
          {/* Avatar & Close Button Row */}
          <div className="profile-modal-top">
            <StudentAvatar size={54} showStatus={!isLoggedOut} />

            <button
              className="btn-close-modal tactile-btn"
              onClick={handleClose}
              aria-label="Close menu"
            >
              <X size={18} strokeWidth={2.4} color="#6B7280" />
            </button>
          </div>

          {/* Student Name & Academic Identity */}
          <div
            className="profile-name-area tactile-btn"
            onClick={() => handleMenuClick('profile')}
            title="View Full Student Profile"
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h2 className="profile-student-name">
                {currentUser?.name || 'Khushi Roongta'}
              </h2>
              <span className="badge-verified-contributor" title="Verified Campus Contributor">
                <Award size={11} color="#FFFFFF" />
              </span>
            </div>
            <p className="profile-student-branch">
              B.Tech IT • 3rd Year • MIT Alandi, Pune
            </p>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-blue)', display: 'inline-block', marginTop: '2px' }}>
              View Full Student Profile →
            </span>
          </div>

          {/* Student Contribution & Study Stats Strip */}
          <div className="profile-stats-strip">
            <div className="profile-stat-box">
              <span className="stat-num">14</span>
              <span className="stat-lbl">Notes</span>
            </div>
            <div className="profile-stat-box">
              <span className="stat-num" style={{ color: 'var(--color-blue)' }}>1.2k</span>
              <span className="stat-lbl">Downloads</span>
            </div>
            <div className="profile-stat-box">
              <span className="stat-num" style={{ color: '#F59E0B' }}>4.9★</span>
              <span className="stat-lbl">Rating</span>
            </div>
            <div className="profile-stat-box">
              <span className="stat-num" style={{ color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                <Flame size={13} fill="#EF4444" /> 12d
              </span>
              <span className="stat-lbl">Streak</span>
            </div>
          </div>
        </div>

        {/* Scrollable Center Body with Smooth Momentum Touch Scrolling */}
        <div className="profile-modal-scroll-body">
          {/* Navigation List */}
          <nav className="profile-nav-list">
            <button
              className="profile-nav-row tactile-btn"
              onClick={() => handleMenuClick('profile')}
            >
              <User size={17} color="#407ADD" strokeWidth={2.2} />
              <span style={{ fontWeight: 800, color: '#407ADD' }}>My Student Profile</span>
            </button>

            <button
              className="profile-nav-row tactile-btn"
              onClick={() => handleMenuClick('home')}
            >
              <Home size={17} color="#1E293B" strokeWidth={2} />
              <span>Home Feed</span>
            </button>

            <button
              className="profile-nav-row tactile-btn"
              onClick={() => handleMenuClick('explore')}
            >
              <Compass size={17} color="#1E293B" strokeWidth={2} />
              <span>Explore Notes</span>
            </button>

            <button
              className="profile-nav-row tactile-btn"
              onClick={() => handleMenuClick('exam-rescue')}
            >
              <Zap size={17} color="#407ADD" strokeWidth={2.2} />
              <span style={{ fontWeight: 800, color: '#407ADD' }}>Exam Rescue Planner ⚡</span>
            </button>

            <button
              className="profile-nav-row tactile-btn"
              onClick={() => handleMenuClick('collections')}
            >
              <Folder size={17} color="#1E293B" strokeWidth={2} />
              <span>My Collections</span>
            </button>

            <button
              className="profile-nav-row tactile-btn"
              onClick={() => handleMenuClick('my-uploads')}
            >
              <UploadCloud size={17} color="#1E293B" strokeWidth={2} />
              <span>My Uploaded Notes</span>
            </button>

            <button
              className="profile-nav-row tactile-btn"
              onClick={() => handleMenuClick('bookmarks')}
            >
              <Bookmark size={17} color="#1E293B" strokeWidth={2} />
              <span>Saved Bookmarks</span>
            </button>

            <button
              className="profile-nav-row tactile-btn"
              onClick={() => handleMenuClick('flashcards')}
            >
              <Layers size={17} color="#1E293B" strokeWidth={2} />
              <span>Quick Flashcards</span>
            </button>

            <button
              className="profile-nav-row tactile-btn"
              onClick={() => handleMenuClick('settings')}
            >
              <Settings size={17} color="#1E293B" strokeWidth={2} />
              <span>App Settings</span>
            </button>
          </nav>

          {/* Special Section: About Project / Notes in Frame Info */}
          <div className="profile-project-info-card">
            <div
              className="project-info-header tactile-btn"
              onClick={() => setIsAboutExpanded(!isAboutExpanded)}
              role="button"
              tabIndex={0}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Info size={14} color="#407ADD" />
                <span className="project-info-title">About Notes in Frame</span>
              </div>
              <span className="project-version-badge">v1.2 Campus</span>
            </div>

            {isAboutExpanded && (
              <div className="project-info-body">
                <p className="project-info-desc">
                  Your campus knowledge, captured one frame at a time. Designed with a photography & Polaroid aesthetic to make lecture notes and solved PYQs delightful to discover and revise.
                </p>
                <div className="project-tags">
                  <span className="project-pill">Knowledge Wall</span>
                  <span className="project-pill">Exam Rescue</span>
                  <span className="project-pill">SASC PixelRush</span>
                </div>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <div style={{ margin: '0.75rem 0 0.5rem' }}>
            <button
              className="btn-profile-logout tactile-btn"
              onClick={logoutUser}
              title="End session and return to landing page"
            >
              <LogOut size={15} strokeWidth={2.2} />
              <span>Log Out</span>
            </button>
          </div>

          {/* Bottom Decorative Pink Note & Film Strip */}
          <div className="profile-modal-footer">
            <div className="profile-footer-film" aria-hidden="true">
              <FilmStripDecoration vertical style={{ height: '54px', width: '18px' }} />
            </div>

            <div className="profile-pink-sticky-note" style={{ fontSize: '0.875rem', padding: '6px 10px' }}>
              good notes<br />brighter days ♡
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
