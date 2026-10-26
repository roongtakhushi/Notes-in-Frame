import React from 'react';
import {
  SlidersHorizontal,
  RotateCcw,
  Check,
  Sparkles,
  Hash,
  Award,
  ShieldCheck,
  Upload,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DesktopFilterRail = ({ filters, onFilterChange, onReset, totalCount }) => {
  const { setIsUploadOpen } = useApp();

  const years = ['All', '2025', '2024', '2023', '2022'];
  const subjects = ['All', 'CSE', 'ECE', 'Mechanical', 'Civil', 'IT'];
  const resourceTypes = ['All', 'Lecture Notes', 'PYQs', 'Revision Guides'];
  const sortOptions = [
    { id: 'relevant', label: 'Most Relevant' },
    { id: 'rating', label: 'Highest Rated (★ 4.8+)' },
    { id: 'downloads', label: 'Most Downloaded' },
    { id: 'newest', label: 'Recently Added' }
  ];

  // High-yield trending topic tags across campus syllabus
  const trendingTags = [
    { tag: 'Loss Functions', query: 'loss functions' },
    { tag: 'SQL Joins & Relational', query: 'DBMS' },
    { tag: 'Binary Trees & Graphs', query: 'Data Structures' },
    { tag: 'Fourier & Laplace', query: 'Signals' },
    { tag: 'Paging & Memory', query: 'Operating Systems' },
    { tag: 'Thermodynamics Heat', query: 'Thermodynamics' }
  ];

  const hasActiveFilters =
    filters.subject !== 'All' ||
    filters.type !== 'All' ||
    filters.year !== 'All' ||
    filters.sort !== 'relevant' ||
    Boolean(filters.query);

  return (
    <aside className="desktop-filter-rail" aria-label="Desktop Faceted Search Filters">
      {/* 1. Header with Active Filter Count & Reset */}
      <div className="filter-rail-header">
        <div className="filter-rail-title-wrap">
          <SlidersHorizontal size={18} color="#407ADD" strokeWidth={2.4} />
          <h3 className="filter-rail-heading">Faceted Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            className="btn-filter-reset tactile-btn"
            onClick={onReset}
            title="Reset all search filters"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Live Result Counter Pill */}
      <div className="filter-live-metrics-banner">
        <span className="live-metrics-dot" />
        <span className="live-metrics-text">
          Showing <strong>{totalCount}</strong> verified notes
        </span>
      </div>

      {/* 2. Academic Year Section */}
      <div className="filter-rail-section">
        <h4 className="filter-section-title">Academic Year</h4>
        <div className="filter-chip-grid">
          {years.map((y) => (
            <button
              key={y}
              className={`filter-facet-chip ${filters.year === y ? 'active' : ''}`}
              onClick={() => onFilterChange({ year: y })}
            >
              {filters.year === y && <Check size={12} strokeWidth={3} className="chip-check" />}
              <span>{y}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Department & Subject Section */}
      <div className="filter-rail-section">
        <h4 className="filter-section-title">Department / Subject</h4>
        <div className="filter-vertical-list">
          {subjects.map((sub) => (
            <button
              key={sub}
              className={`filter-facet-row ${filters.subject === sub ? 'active' : ''}`}
              onClick={() => onFilterChange({ subject: sub })}
            >
              <span className={`facet-radio-dot ${filters.subject === sub ? 'active' : ''}`} />
              <span className="facet-row-label">{sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Resource Type Section */}
      <div className="filter-rail-section">
        <h4 className="filter-section-title">Resource Type</h4>
        <div className="filter-vertical-list">
          {resourceTypes.map((type) => (
            <button
              key={type}
              className={`filter-facet-row ${filters.type === type ? 'active' : ''}`}
              onClick={() => onFilterChange({ type })}
            >
              <span className={`facet-radio-dot ${filters.type === type ? 'active' : ''}`} />
              <span className="facet-row-label">{type}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Sort Options */}
      <div className="filter-rail-section">
        <h4 className="filter-section-title">Sort By</h4>
        <div className="filter-vertical-list">
          {sortOptions.map((opt) => (
            <button
              key={opt.id}
              className={`filter-facet-row ${filters.sort === opt.id ? 'active' : ''}`}
              onClick={() => onFilterChange({ sort: opt.id })}
            >
              <span className={`facet-radio-dot ${filters.sort === opt.id ? 'active' : ''}`} />
              <span className="facet-row-label">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 6. Trending Syllabus Hashtags Cloud */}
      <div className="filter-rail-section">
        <div className="filter-section-title-row">
          <h4 className="filter-section-title">Trending Topics</h4>
          <Sparkles size={13} color="#DD88C1" />
        </div>
        <div className="trending-tags-flex">
          {trendingTags.map((item) => (
            <button
              key={item.tag}
              type="button"
              className="trending-tag-pill tactile-btn"
              onClick={() => onFilterChange({ query: item.query })}
              title={`Filter by ${item.tag}`}
            >
              <Hash size={12} className="tag-hash-icon" />
              <span>{item.tag}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 7. Contributor Spotlight Mini-Card */}
      <div className="rail-contributor-spotlight">
        <div className="spotlight-badge-row">
          <Award size={14} color="#89BC62" />
          <span className="spotlight-label">Curator Spotlight</span>
        </div>
        <div className="spotlight-user-row">
          <div className="spotlight-avatar">AM</div>
          <div>
            <h5 className="spotlight-name">Aarav Mehta</h5>
            <span className="spotlight-sub">Final Year CSE • 4.9★</span>
          </div>
        </div>
        <p className="spotlight-text">
          Uploaded 18 verified handwritten notes covering CSE Semester 4.
        </p>
        <button
          className="btn-spotlight-upload tactile-btn"
          onClick={() => setIsUploadOpen(true)}
        >
          <Upload size={13} />
          <span>Contribute Notes</span>
        </button>
      </div>

      {/* 8. Study Quality Guarantee Shield */}
      <div className="rail-quality-shield">
        <ShieldCheck size={18} color="#407ADD" />
        <div className="shield-text">
          <span className="shield-title">100% Peer-Verified</span>
          <span className="shield-desc">Legible scans, clean margins, and SASC syllabus checked.</span>
        </div>
      </div>
    </aside>
  );
};