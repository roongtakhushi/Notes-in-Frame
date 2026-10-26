import React, { useState } from 'react';
import { Search, ArrowRight, Calendar, Sparkles, Monitor, Cpu, Settings, Landmark } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PolaroidCard } from '../components/PolaroidCard';

export const HomeView = () => {
  const { resources, navigateTo, setExploreFilters } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');

  const SUBJECT_PILLS = ['All', 'CSE', 'ECE', 'Mechanical', 'Civil'];

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

  // Get the 2 popular cards for Screen 3
  const mlResource = resources.find(r => r.title.includes('Machine Learning')) || resources[0];
  const dbmsResource = resources.find(r => r.title.includes('DBMS')) || resources[1];
  const popularCards = [mlResource, dbmsResource];

  return (
    <div className="home-screen-container">
      {/* 1. Search Bar with Green Action Button (Screen 3) */}
      <form onSubmit={handleSearchSubmit} className="home-search-form">
        <div className="home-search-input-wrap">
          <Search className="home-search-icon" size={19} color="#9CA3AF" />
          <input
            type="text"
            className="home-search-input"
            placeholder="Search subjects, topics, PYQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search campus notes and PYQs"
          />
          <button
            type="submit"
            className="home-search-submit-btn"
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
        className="home-rescue-card"
        onClick={() => navigateTo('exam-rescue')}
        role="button"
        tabIndex={0}
      >
        <div className="rescue-card-left">
          <div className="rescue-calendar-icon-wrap">
            <Calendar size={22} color="#407ADD" strokeWidth={2.4} />
          </div>
          <div className="rescue-card-text">
            <h2 className="rescue-card-title">Exam Rescue Mode</h2>
            <p className="rescue-card-subtitle">Get a personalised revision plan</p>
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

      {/* 4. Popular Notes Section with 2-Column Polaroids (Screen 3) */}
      <section className="home-section-popular">
        <div className="home-section-header">
          <div className="home-section-title-wrap">
            <h2 className="home-section-title">Popular Notes</h2>
            <Sparkles size={16} color="#DD88C1" />
          </div>
          <button
            className="home-see-all-link"
            onClick={() => handleSeeAll({ sort: 'rating' })}
          >
            See all
          </button>
        </div>

        <div className="polaroid-2col-grid">
          {popularCards.map((res) => (
            <PolaroidCard key={res.id} resource={res} />
          ))}
        </div>
      </section>

      {/* 5. Subjects Section with 4 Pastel Cards (Screen 3) */}
      <section className="home-section-subjects">
        <div className="home-section-header">
          <h2 className="home-section-title">Subjects</h2>
          <button
            className="home-see-all-link"
            onClick={() => handleSeeAll()}
          >
            See all
          </button>
        </div>

        <div className="home-subjects-4grid">
          {/* CSE */}
          <div
            className="subject-card card-cse"
            onClick={() => handleSeeAll({ subject: 'Machine Learning' })}
            role="button"
            tabIndex={0}
          >
            <div className="subject-icon-box">
              <Monitor size={22} strokeWidth={2.2} />
            </div>
            <span className="subject-name">CSE</span>
          </div>

          {/* ECE */}
          <div
            className="subject-card card-ece"
            onClick={() => handleSeeAll({ subject: 'Signals & Systems' })}
            role="button"
            tabIndex={0}
          >
            <div className="subject-icon-box">
              <Cpu size={22} strokeWidth={2.2} />
            </div>
            <span className="subject-name">ECE</span>
          </div>

          {/* Mech */}
          <div
            className="subject-card card-mech"
            onClick={() => handleSeeAll({ subject: 'Thermodynamics' })}
            role="button"
            tabIndex={0}
          >
            <div className="subject-icon-box">
              <Settings size={22} strokeWidth={2.2} />
            </div>
            <span className="subject-name">Mech</span>
          </div>

          {/* Civil */}
          <div
            className="subject-card card-civil"
            onClick={() => handleSeeAll({ subject: 'Engineering Maths' })}
            role="button"
            tabIndex={0}
          >
            <div className="subject-icon-box">
              <Landmark size={22} strokeWidth={2.2} />
            </div>
            <span className="subject-name">Civil</span>
          </div>
        </div>
      </section>
    </div>
  );
};
