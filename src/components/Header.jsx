import React, { useEffect } from 'react';
import { Camera, Plus, Bell, Flame, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudentAvatar } from './StudentAvatar';

export const Header = () => {
  const {
    currentView,
    navigateTo,
    setExploreFilters,
    setIsProfileDrawerOpen,
    setIsNotificationOpen,
    unreadNotificationsCount
  } = useApp();

  // Global Ctrl+K / Cmd+K Search Shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (currentView !== 'home' && currentView !== 'explore') {
          navigateTo('explore');
        }
        setTimeout(() => {
          const input = document.querySelector('.search-input');
          input?.focus();
        }, 60);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView, navigateTo]);

  // Hide top header on landing and onboarding to match Screens 1 & 2
  if (['landing', 'onboarding'].includes(currentView)) {
    return null;
  }

  const handleNavClick = (view, extraFilter = null) => {
    if (extraFilter) {
      setExploreFilters(prev => ({ ...prev, ...extraFilter }));
    }
    navigateTo(view);
  };

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand Wordmark with Camera Mascot Motif */}
        <div 
          className="brand-logo"
          onClick={() => handleNavClick('home')}
          title="Return to Home"
          role="button"
          tabIndex={0}
        >
          <img
            src="/favicon.svg"
            alt="Snap Mascot"
            style={{ width: '28px', height: '28px', borderRadius: '7px', flexShrink: 0 }}
          />
          <span>notes in frame<span className="brand-logo-dot">.</span></span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="header-nav-desktop">
          <button
            className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button
            className={`nav-link ${currentView === 'explore' ? 'active' : ''}`}
            onClick={() => handleNavClick('explore')}
          >
            Explore Notes
          </button>
          <button
            className={`nav-link ${currentView === 'exam-rescue' ? 'active' : ''}`}
            onClick={() => handleNavClick('exam-rescue')}
          >
            Exam Rescue
          </button>
          <button
            className={`nav-link ${currentView === 'collections' ? 'active' : ''}`}
            onClick={() => handleNavClick('collections')}
          >
            My Collections
          </button>
        </nav>

        {/* Desktop Header Quick Search Trigger */}
        <button
          className="header-search-trigger tactile-btn"
          onClick={() => {
            if (currentView !== 'home' && currentView !== 'explore') {
              navigateTo('explore');
            }
            setTimeout(() => {
              const input = document.querySelector('.search-input');
              input?.focus();
            }, 60);
          }}
          title="Search study materials (⌘K / Ctrl+K)"
        >
          <Search size={14} className="search-icon-dim" />
          <span className="search-placeholder-text">Quick search...</span>
          <span className="kbd-shortcut-hint">⌘K</span>
        </button>

        {/* Header Action Controls */}
        <div className="header-actions">
          {/* Active 12-Day Streak Pill */}
          <div
            className="header-streak-pill tactile-btn"
            onClick={() => setIsProfileDrawerOpen(true)}
            title="12-Day Active Study Streak 🔥 Click to open profile"
          >
            <Flame size={15} color="#EA580C" />
            <span className="streak-num">12d</span>
          </div>

          {/* Upload Button */}
          <button
            className="btn-upload-desktop"
            onClick={() => navigateTo('upload')}
            title="Upload notes"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span>Upload Notes</span>
          </button>

          {/* Notification Bell with Dynamic Unread Badge */}
          <button
            className="btn-icon header-bell-btn tactile-btn"
            onClick={() => setIsNotificationOpen(true)}
            title="Campus Notifications & Alerts"
            aria-label="Notifications"
          >
            <Bell size={19} color="#407ADD" />
            {unreadNotificationsCount > 0 && (
              <span className="header-bell-badge">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Profile Header Avatar (Khushi) with Camera Strap & Online Dot */}
          <button
            className="btn-profile-header-wrap tactile-btn"
            onClick={() => setIsProfileDrawerOpen(true)}
            title="Open Student Profile & Settings"
            aria-label="Student Profile"
          >
            <StudentAvatar size={36} showStatus={true} />
          </button>
        </div>
      </div>
    </header>
  );
};
