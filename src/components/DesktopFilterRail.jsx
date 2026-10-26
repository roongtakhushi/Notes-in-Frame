import React from 'react';
import { Filter, RotateCcw, Check, Sparkles, SlidersHorizontal } from 'lucide-react';

export const DesktopFilterRail = ({ filters, onFilterChange, onReset, totalCount }) => {
  const years = ['All', '2025', '2024', '2023', '2022'];
  const subjects = ['All', 'CSE', 'ECE', 'Mechanical', 'Civil', 'IT'];
  const resourceTypes = ['All', 'Lecture Notes', 'PYQs', 'Revision Guides'];
  const sortOptions = [
    { id: 'relevant', label: 'Most Relevant' },
    { id: 'rating', label: 'Highest Rated (★ 4.8+)' },
    { id: 'downloads', label: 'Most Downloaded' },
    { id: 'newest', label: 'Recently Added' }
  ];

  return (
    <aside className="desktop-filter-rail" aria-label="Desktop Faceted Search Filters">
      <div className="filter-rail-header">
        <div className="filter-rail-title-wrap">
          <SlidersHorizontal size={18} color="#407ADD" strokeWidth={2.4} />
          <h3 className="filter-rail-heading">Faceted Filters</h3>
        </div>
        <button
          className="btn-filter-reset tactile-btn"
          onClick={onReset}
          title="Reset all search filters"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Academic Year Section */}
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

      {/* 2. Department & Subject Section */}
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

      {/* 3. Resource Type Section */}
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

      {/* 4. Sort Options */}
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

      {/* Filter Result Counter Pill */}
      <div className="filter-rail-footer">
        <span className="filter-total-badge">
          <Sparkles size={13} color="#89BC62" />
          <span>Showing <strong>{totalCount}</strong> verified study resources</span>
        </span>
      </div>
    </aside>
  );
};
