import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  Calendar,
  Sparkles,
  Monitor,
  Cpu,
  Settings,
  Landmark,
  Database,
  Calculator,
  Flame,
  Clock,
  PlusCircle,
  Bookmark,
  ChevronRight,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PolaroidCard } from '../components/PolaroidCard';
import { StudentAvatar } from '../components/StudentAvatar';
import { Pagination } from '../components/Pagination';

const DEPARTMENTS = [
  {
    id: 'cse',
    name: 'Computer Science',
    shortName: 'CSE',
    code: 'CS-01',
    notesCount: 14,
    icon: Monitor,
    tapeColor: 'green',
    filterQuery: 'CS'
  },
  {
    id: 'ece',
    name: 'Electronics',
    shortName: 'ECE',
    code: 'EC-02',
    notesCount: 8,
    icon: Cpu,
    tapeColor: 'pink',
    filterQuery: 'Signals'
  },
  {
    id: 'mech',
    name: 'Mechanical',
    shortName: 'MECH',
    code: 'ME-03',
    notesCount: 6,
    icon: Settings,
    tapeColor: 'blue',
    filterQuery: 'Thermodynamics'
  },
  {
    id: 'civil',
    name: 'Civil Engineering',
    shortName: 'CIVIL',
    code: 'CE-04',
    notesCount: 5,
    icon: Landmark,
    tapeColor: 'purple',
    filterQuery: 'Civil'
  },
  {
    id: 'it',
    name: 'Information Tech',
    shortName: 'IT',
    code: 'IT-05',
    notesCount: 9,
    icon: Database,
    tapeColor: 'orange',
    filterQuery: 'DBMS'
  },
  {
    id: 'math',
    name: 'Applied Maths',
    shortName: 'MATH',
    code: 'AM-06',
    notesCount: 11,
    icon: Calculator,
    tapeColor: 'amber',
    filterQuery: 'Maths'
  }
];

export const HomeView = () => {
  const {
    resources,
    navigateTo,
    setExploreFilters,
    currentUser,
    bookmarks,
    openNoteDetail,
    setIsProfileDrawerOpen,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [popularPage, setPopularPage] = useState(1);

  // Weekly study hours goal state
  const [studyHours, setStudyHours] = useState(() => {
    try {
      const saved = localStorage.getItem('nif_study_hours');
      return saved ? parseInt(saved, 10) : 14;
    } catch (e) {
      return 14;
    }
  });

  const TARGET_HOURS = 20;
  const progressPercent = Math.min(100, Math.round((studyHours / TARGET_HOURS) * 100));

  const handleLogHour = () => {
    const nextHours = studyHours + 1;
    setStudyHours(nextHours);
    try {
      localStorage.setItem('nif_study_hours', String(nextHours));
    } catch (e) {}

    showToast({
      title: 'Study Session Logged! ⏱️',
      description: `+1 Hour recorded. You've completed ${nextHours} of ${TARGET_HOURS} hours this week.`,
      type: 'success'
    });
  };

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
    setPopularPage(1);
  };

  const handleSeeAll = (filterObj = {}) => {
    setExploreFilters(prev => ({
      ...prev,
      ...filterObj
    }));
    navigateTo('explore');
  };

  // Filter popular notes based on selectedSubject
  const filteredPopular = selectedSubject === 'All'
    ? resources
    : resources.filter(r => {
        const s = selectedSubject.toLowerCase();
        const resSub = (r.subject || '').toLowerCase();
        const resCode = (r.subjectCode || '').toLowerCase();
        return resSub.includes(s) || resCode.includes(s);
      });

  const POPULAR_PAGE_SIZE = 6;
  const popularTotalPages = Math.ceil(filteredPopular.length / POPULAR_PAGE_SIZE);
  const displayedPopular = filteredPopular.slice(
    (popularPage - 1) * POPULAR_PAGE_SIZE,
    popularPage * POPULAR_PAGE_SIZE
  );

  const bookmarkedItems = resources.filter(r => bookmarks.includes(r.id)).slice(0, 3);

  return (
    <div className="home-screen-container">
      {/* 1. Desktop Studio Welcome Hero Banner (Visible >= 1024px) */}
      <section className="desktop-home-hero-banner" aria-label="Campus Welcome Banner">
        <div className="hero-banner-left">
          <div className="hero-pill-badge">
            <span className="dot-live-green" />
            <span>Semester 4 • Finals In 20 Days</span>
          </div>
          <h1 className="hero-desktop-title">
            Welcome back, <span className="highlight-ink">{currentUser?.name || 'Khushi'}</span> 📸
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

      {/* 2. Studio Bento Cockpit Dock (Spotify/Linear Standard - 3-Card Responsive Grid) */}
      <section className="home-studio-bento-dock" aria-label="Student Studio Cockpit">
        {/* Cockpit Card 1: Student Identity & Focus Hours */}
        <div className="cockpit-card cockpit-profile-card">
          <div className="cockpit-tape tape-blue" aria-hidden="true" />
          <div className="cockpit-header-row">
            <div className="cockpit-avatar-info">
              <StudentAvatar size={42} showStatus={true} />
              <div>
                <h3 className="cockpit-student-name">{currentUser?.name || 'Khushi Roongta'}</h3>
                <span className="cockpit-student-badge">IT • 3rd Year • MIT Alandi</span>
              </div>
            </div>
            <button
              className="cockpit-profile-link tactile-btn"
              onClick={() => setIsProfileDrawerOpen(true)}
              title="Open Profile & Settings"
            >
              Profile →
            </button>
          </div>

          <div className="cockpit-streak-row">
            <div className="cockpit-pill flame-pill">
              <Flame size={16} className="flame-icon-pulse" />
              <span><strong>12 Days</strong> Active Streak</span>
            </div>
            <div className="cockpit-pill downloads-pill">
              <TrendingUp size={15} color="#407ADD" />
              <span><strong>1,280</strong> Downloads</span>
            </div>
          </div>

          <div className="cockpit-goal-box">
            <div className="goal-box-meta">
              <span className="goal-label">Weekly Sprint: <strong>{studyHours}h</strong> / {TARGET_HOURS}h</span>
              <span className="goal-pct">{progressPercent}%</span>
            </div>
            <div className="goal-bar-track">
              <div className="goal-bar-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <button
              className="btn-cockpit-log tactile-btn"
              onClick={handleLogHour}
              title="Log 1 hour study session"
            >
              <PlusCircle size={14} />
              <span>Log +1h Study Session</span>
            </button>
          </div>
        </div>

        {/* Cockpit Card 2: Active Exam Rescue Sprint */}
        <div className="cockpit-card cockpit-exam-card">
          <div className="cockpit-tape tape-pink" aria-hidden="true" />
          <div className="cockpit-header-row">
            <div className="cockpit-title-left">
              <div className="cockpit-icon-wrap blue-wrap">
                <Calendar size={18} color="#407ADD" strokeWidth={2.4} />
              </div>
              <div>
                <h4 className="cockpit-card-title">Exam Rescue Mode</h4>
                <span className="cockpit-card-sub">CS401 · Machine Learning</span>
              </div>
            </div>
            <span className="cockpit-badge-chip">20d left</span>
          </div>

          <div className="cockpit-exam-body">
            <div className="exam-status-row">
              <span className="exam-subj-title">Supervised Algorithms & Loss Derivations</span>
              <span className="exam-pct-badge">40% Ready</span>
            </div>
            <div className="exam-mini-track">
              <div className="exam-mini-fill" style={{ width: '40%' }} />
            </div>
            <div className="exam-next-step">
              <CheckCircle2 size={14} color="#89BC62" />
              <span>Next: Practise 5-Year Repeat PYQs (2020–2024)</span>
            </div>
          </div>

          <button
            className="btn-cockpit-resume tactile-btn"
            onClick={() => navigateTo('exam-rescue')}
            title="Open Exam Rescue Revision Roadmap"
          >
            <span>Resume Revision Roadmap</span>
            <ArrowRight size={15} strokeWidth={2.4} />
          </button>
        </div>

        {/* Cockpit Card 3: Quick Bookmarks & Campus Decks */}
        <div className="cockpit-card cockpit-bookmarks-card">
          <div className="cockpit-tape tape-green" aria-hidden="true" />
          <div className="cockpit-header-row">
            <div className="cockpit-title-left">
              <div className="cockpit-icon-wrap pink-wrap">
                <Bookmark size={17} color="#DD88C1" />
              </div>
              <div>
                <h4 className="cockpit-card-title">Quick Bookmarks</h4>
                <span className="cockpit-card-sub">{bookmarks.length} saved resources</span>
              </div>
            </div>
            <button
              className="btn-cockpit-all tactile-btn"
              onClick={() => navigateTo('collections')}
              title="View all collections"
            >
              <span>All</span>
              <ChevronRight size={13} strokeWidth={2.4} />
            </button>
          </div>

          <div className="cockpit-bookmarks-list">
            {bookmarkedItems.length > 0 ? (
              bookmarkedItems.map((note) => (
                <div
                  key={note.id}
                  className="cockpit-bookmark-row tactile-btn"
                  onClick={() => openNoteDetail(note.id)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="bookmark-row-left">
                    <span className="bookmark-type-tag">{note.resourceType}</span>
                    <h5 className="bookmark-row-title">{note.title}</h5>
                  </div>
                  <ChevronRight size={14} className="row-arrow" />
                </div>
              ))
            ) : (
              <p className="cockpit-empty-hint">Save handwritten notes or PYQs to see them here.</p>
            )}
          </div>

          <div className="cockpit-pulse-footer">
            <span className="pulse-dot green" />
            <span className="pulse-live-text">
              <strong>42 peers</strong> revising right now · Aarav saved DBMS PYQs
            </span>
          </div>
        </div>
      </section>

      {/* 3. Global Campus Search Bar & Subject Pills */}
      <section className="home-search-section">
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
      </section>

      {/* 4. Popular Notes Section: Full-Width 3-Column Polaroid Grid with Pagination */}
      <section className="home-section-popular">
        <div className="home-section-header">
          <div className="home-section-title-wrap">
            <h2 className="home-section-title">Popular Study Notes</h2>
            <span className="home-notes-counter">
              Showing <strong>{displayedPopular.length}</strong> of <strong>{filteredPopular.length}</strong> resources
            </span>
          </div>
          <button
            className="section-see-all-link tactile-btn"
            onClick={() => handleSeeAll({ subject: selectedSubject === 'All' ? 'All' : selectedSubject })}
          >
            <span>Explore All Archive</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="polaroid-home-grid">
          {displayedPopular.map((resource) => (
            <PolaroidCard key={resource.id} resource={resource} />
          ))}
        </div>

        {/* Home Popular Notes Pagination */}
        <Pagination
          currentPage={popularPage}
          totalPages={popularTotalPages}
          totalItems={filteredPopular.length}
          pageSize={POPULAR_PAGE_SIZE}
          onPageChange={(p) => setPopularPage(p)}
        />
      </section>

      {/* 5. Explore by Department: Full-Width 6-Column 35mm Slide Mounts */}
      <section className="home-section-subjects" aria-label="Explore by Department">
        <div className="home-section-header">
          <div className="section-title-wrap">
            <span className="section-film-badge" aria-hidden="true">🎞️ ARCHIVE</span>
            <h2 className="home-section-title">Explore by Department</h2>
          </div>
          <button
            className="section-see-all-link tactile-btn"
            onClick={() => handleSeeAll()}
          >
            <span>All Departments</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="home-subjects-bento-grid">
          {DEPARTMENTS.map((dept) => {
            const IconComponent = dept.icon;
            return (
              <article
                key={dept.id}
                className={`department-slide-mount mount-${dept.tapeColor} tactile-btn`}
                onClick={() => handleSeeAll({ subject: dept.shortName })}
                role="button"
                tabIndex={0}
                aria-label={`Department: ${dept.name}, ${dept.notesCount} verified notes available`}
              >
                <div className={`slide-tape-tab tape-${dept.tapeColor}`} aria-hidden="true" />
                <span className="slide-reg-mark" aria-hidden="true">+</span>

                <div className="slide-card-top">
                  <div className={`slide-lens-aperture aperture-${dept.tapeColor}`}>
                    <IconComponent size={19} strokeWidth={2.2} />
                  </div>
                  <span className="slide-dept-code">{dept.code}</span>
                </div>

                <div className="slide-card-body">
                  <h3 className="slide-dept-name">{dept.name}</h3>
                </div>

                <div className="slide-card-foot">
                  <span className="slide-count-pill">
                    <span className="count-dot" aria-hidden="true" />
                    {dept.notesCount} Notes
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 6. Campus PYQ & Exam Revision Spotlight */}
      <section className="home-section-pyq-spotlight" aria-label="Exam Revision Spotlight">
        <div className="home-section-header">
          <div className="section-title-wrap">
            <span className="section-film-badge" aria-hidden="true">🎞️ HIGH-YIELD SPRINTS</span>
            <h2 className="home-section-title">Exam Revision Fast-Track</h2>
          </div>
          <button
            className="section-see-all-link tactile-btn"
            onClick={() => navigateTo('exam-rescue')}
          >
            <span>Launch Exam Mode</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="home-pyq-spotlight-grid">
          <div
            className="pyq-spotlight-card tactile-btn"
            onClick={() => navigateTo('exam-rescue')}
            role="button"
            tabIndex={0}
          >
            <div className="spotlight-tape tape-blue" aria-hidden="true" />
            <div className="spotlight-badge-row">
              <span className="spotlight-tag">SEMESTER 4 PYQS</span>
              <span className="spotlight-solved-count">🔥 5 Years Solved</span>
            </div>
            <h4 className="spotlight-title">Machine Learning & Neural Networks</h4>
            <p className="spotlight-desc">Loss functions, gradient descent derivations & repeat university question blueprints.</p>
            <div className="spotlight-foot">
              <span className="spotlight-status">Ready in Exam Rescue</span>
              <ArrowRight size={13} color="#407ADD" />
            </div>
          </div>

          <div
            className="pyq-spotlight-card tactile-btn"
            onClick={() => navigateTo('exam-rescue')}
            role="button"
            tabIndex={0}
          >
            <div className="spotlight-tape tape-pink" aria-hidden="true" />
            <div className="spotlight-badge-row">
              <span className="spotlight-tag">HIGH-YIELD CHEATSHEET</span>
              <span className="spotlight-solved-count">⚡ 45 Min Revision</span>
            </div>
            <h4 className="spotlight-title">Operating Systems & Paging</h4>
            <p className="spotlight-desc">Virtual memory, page replacement algorithms, semaphores and deadlock prevention proofs.</p>
            <div className="spotlight-foot">
              <span className="spotlight-status">Ready in Exam Rescue</span>
              <ArrowRight size={13} color="#407ADD" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
