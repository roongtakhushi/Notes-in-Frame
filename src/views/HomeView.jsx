import React, { useState } from 'react';
import { Search, ArrowRight, Calendar, Sparkles, Monitor, Cpu, Settings, Landmark, Database, Calculator } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PolaroidCard } from '../components/PolaroidCard';
import { DesktopStudioRail } from '../components/DesktopStudioRail';

export const HomeView = () => {
  const { resources, navigateTo, setExploreFilters } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');

  const SUBJECT_PILLS = ['All', 'CSE', 'ECE', 'Mechanical', 'Civil', 'IT'];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setExploreFilters(prev => ({
      ...prev,
      query: searchQuery,
      subject: selectedSubject === 'All' ? 'All' : selectedSubject
    }));
    navigateTo('explore');
  };

  const handleSubjectClick = (sub) => {
    setSelectedSubject(sub);
  };

  const handleSeeAll = (filterObj = {}) => {
    setExploreFilters(prev => ({
      ...prev,
      ...filterObj
    }));
    navigateTo('explore');
  };

  // 3 high-yield popular cards for desktop / top 2 for mobile
  const mlResource = resources.find(r => r.title.includes('Machine Learning')) || resources[0];
  const dbmsResource = resources.find(r => r.title.includes('DBMS')) || resources[1];
  const dsaResource = resources.find(r => r.title.includes('Data Structures')) || resources[2];
  const popularCards = [mlResource, dbmsResource, dsaResource];

  return (
    <div className="home-screen-container">
      {/* Desktop Studio Welcome Banner (Visible on >= 1024px) */}
      <section className="desktop-home-hero-banner" aria-label="Campus Welcome Banner">
        <div className="hero-banner-left">
          <div className="hero-pill-badge">
            <span className="dot-live-green" />
            <span>Semester 4 • Finals In 20 Days</span>
          </div>
          <h1 className="hero-desktop-title">
            Welcome back, <span className="highlight-ink">Khushi</span> 📸
          </h1>
          <p className="hero-desktop-desc">
            Your photographic campus study hub. Access peer-verified handwritten derivations, 5-year solved PYQs, and dynamic exam revision sprints.
          </p>
        </div>
        <div className="hero-banner-right">
          <div className="hero-stat-card">
            <span className="stat-card-val">1,280</span>
            <span className="stat-card-lbl">Notes Downloaded</span>
          </div>
          <div className="hero-stat-card streak-highlight">
            <span className="stat-card-val">12 Days</span>
            <span className="stat-card-lbl">Study Streak 🔥</span>
          </div>
        </div>
      </section>

      {/* Two-Column Responsive Workspace: Feed on Left + Studio Rail on Right */}
      <div className="home-desktop-two-col-layout">
        <div className="home-main-feed-col">
          {/* 1. Search Bar with Green Action Button (Screen 3) */}
          <form onSubmit={handleSearchSubmit} className="home-search-form">
            <div className="home-search-input-wrap">
              <Search className="home-search-icon" size={19} color="#9CA3AF" />
              <input
                type="text"
                className="home-search-input"
                placeholder="Search subjects, topics, PYQs... (Press ⌘K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search campus notes and PYQs"
              />
              <button
                type="submit"
                className="home-search-submit-btn tactile-btn"
                aria-label="Search"
              >
                <Search size={18} strokeWidth={2.6} color="#FFFFFF" />
              </button>
            </div>
          </form>

          {/* 2. Horizontal Subject Pills Filter Bar (Screen 3) */}
          <div className="home-subject-pills-row" aria-label="Subject quick filters">
            {SUBJECT_PILLS.map((sub) => (
              <button
                key={sub}
                type="button"
                className={`home-subject-pill ${selectedSubject === sub ? 'active' : ''}`}
                onClick={() => handleSubjectClick(sub)}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* 3. Exam Rescue Mode Spotlight Banner (Screen 3) */}
          <div
            className="home-rescue-card tactile-btn"
            onClick={() => navigateTo('exam-rescue')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') navigateTo('exam-rescue');
            }}
          >
            <div className="rescue-card-left">
              <div className="rescue-calendar-icon-wrap">
                <Calendar size={22} color="#407ADD" strokeWidth={2.4} />
              </div>
              <div className="rescue-card-text">
                <div className="rescue-badge-row">
                  <h2 className="rescue-card-title">Exam Rescue Mode</h2>
                  <span className="rescue-tag-live">Sprint Ready</span>
                </div>
                <p className="rescue-card-subtitle">Generate a custom revision plan based on your exam dates & syllabus</p>
              </div>
            </div>

            <button
              className="btn-rescue-arrow"
              onClick={(e) => {
                e.stopPropagation();
                navigateTo('exam-rescue');
              }}
              aria-label="Go to Exam Rescue"
            >
              <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.6} />
            </button>
          </div>

          {/* 4. Popular Notes Section with Responsive Polaroid Grid (Screen 3) */}
          <section className="home-section-popular">
            <div className="home-section-header">
              <div className="home-section-title-wrap">
                <h2 className="home-section-title">Popular Notes</h2>
                <Sparkles size={16} color="#DD88C1" />
              </div>
              <button
                className="home-see-all-link tactile-btn"
                onClick={() => handleSeeAll({ sort: 'rating' })}
              >
                See all
              </button>
            </div>

            <div className="polaroid-home-grid">
              {popularCards.map((res) => (
                <PolaroidCard key={res.id} resource={res} />
              ))}
            </div>
          </section>

          {/* 5. Subjects Bento Section (Screen 3) */}
          <section className="home-section-subjects">
            <div className="home-section-header">
              <h2 className="home-section-title">Explore by Department</h2>
              <button
                className="home-see-all-link tactile-btn"
                onClick={() => handleSeeAll()}
              >
                See all
              </button>
            </div>

            <div className="home-subjects-bento-grid">
              {/* CSE */}
              <div
                className="subject-card card-cse tactile-btn"
                onClick={() => handleSeeAll({ subject: 'Machine Learning' })}
                role="button"
                tabIndex={0}
              >
                <div className="subject-icon-box">
                  <Monitor size={22} strokeWidth={2.2} />
                </div>
                <span className="subject-name">Computer Science</span>
                <span className="subject-count-tag">14 Notes</span>
              </div>

              {/* ECE */}
              <div
                className="subject-card card-ece tactile-btn"
                onClick={() => handleSeeAll({ subject: 'Signals & Systems' })}
                role="button"
                tabIndex={0}
              >
                <div className="subject-icon-box">
                  <Cpu size={22} strokeWidth={2.2} />
                </div>
                <span className="subject-name">Electronics</span>
                <span className="subject-count-tag">8 Notes</span>
              </div>

              {/* Mech */}
              <div
                className="subject-card card-mech tactile-btn"
                onClick={() => handleSeeAll({ subject: 'Thermodynamics' })}
                role="button"
                tabIndex={0}
              >
                <div className="subject-icon-box">
                  <Settings size={22} strokeWidth={2.2} />
                </div>
                <span className="subject-name">Mechanical</span>
                <span className="subject-count-tag">6 Notes</span>
              </div>

              {/* Civil */}
              <div
                className="subject-card card-civil tactile-btn"
                onClick={() => handleSeeAll({ subject: 'Engineering Maths' })}
                role="button"
                tabIndex={0}
              >
                <div className="subject-icon-box">
                  <Landmark size={22} strokeWidth={2.2} />
                </div>
                <span className="subject-name">Civil Engineering</span>
                <span className="subject-count-tag">5 Notes</span>
              </div>

              {/* Information Tech */}
              <div
                className="subject-card card-it tactile-btn"
                onClick={() => handleSeeAll({ subject: 'Database Management Systems (DBMS)' })}
                role="button"
                tabIndex={0}
              >
                <div className="subject-icon-box">
                  <Database size={22} strokeWidth={2.2} />
                </div>
                <span className="subject-name">Information Tech</span>
                <span className="subject-count-tag">9 Notes</span>
              </div>

              {/* Applied Maths */}
              <div
                className="subject-card card-math tactile-btn"
                onClick={() => handleSeeAll({ subject: 'Engineering Mathematics' })}
                role="button"
                tabIndex={0}
              >
                <div className="subject-icon-box">
                  <Calculator size={22} strokeWidth={2.2} />
                </div>
                <span className="subject-name">Applied Maths</span>
                <span className="subject-count-tag">11 Notes</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Desktop Studio Sidebar Rail */}
        <DesktopStudioRail />
      </div>
    </div>
  );
};
