import React from 'react';
import {
  SlidersHorizontal,
  RotateCcw,
  Check,
  Upload,
  ArrowUpDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DesktopFilterRail = ({ filters, onFilterChange, onReset, totalCount }) => {
  const { navigateTo } = useApp();

  const years = ['All', '2025', '2024', '2023', '2022'];
  const subjects = ['All', 'CSE', 'IT', 'ECE', 'Mechanical', 'Civil', 'Applied Maths'];
  const resourceTypes = [
    { id: 'All', label: 'All' },
    { id: 'Notes', label: 'Notes' },
    { id: 'PYQs', label: 'PYQs' },
    { id: 'Cheatsheets', label: 'Cheatsheets' }
  ];
  
  const sortOptions = [
    { id: 'relevant', label: 'Most Relevant' },
    { id: 'rating', label: 'Highest Rated ★' },
    { id: 'downloads', label: 'Most Downloaded 📥' },
    { id: 'newest', label: 'Recently Added ⚡' }
  ];


  const hasActiveFilters =
    filters.subject !== 'All' ||
    filters.type !== 'All' ||
    filters.year !== 'All' ||
    filters.sort !== 'relevant' ||
    Boolean(filters.query);

  return (
    <aside className="desktop-filter-rail" aria-label="Desktop Search Filters">
      {/* 1. Filter Header & Reset */}
      <div className="filter-rail-header">
        <div className="filter-rail-title-wrap">
          <SlidersHorizontal size={16} color="#407ADD" strokeWidth={2.4} />
          <h3 className="filter-rail-heading">Filter Notes</h3>
        </div>
        {hasActiveFilters && (
          <button
            className="btn-filter-reset tactile-btn"
            onClick={onReset}
            title="Reset all search filters"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 2. Academic Year Selector */}
      <div className="filter-rail-section">
        <h4 className="filter-section-title">Academic Year</h4>
        <div className="filter-chip-grid">
          {years.map((y) => (
            <button
              key={y}
              className={`filter-facet-chip ${filters.year === y ? 'active' : ''}`}
              onClick={() => onFilterChange({ year: y })}
              type="button"
            >
              {filters.year === y && <Check size={11} strokeWidth={3} className="chip-check" />}
              <span>{y}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Department / Subject Selector */}
      <div className="filter-rail-section">
        <h4 className="filter-section-title">Department</h4>
        <div className="filter-tags-grid">
          {subjects.map((sub) => (
            <button
              key={sub}
              className={`filter-facet-pill ${filters.subject === sub ? 'active' : ''}`}
              onClick={() => onFilterChange({ subject: sub })}
              type="button"
            >
              <span>{sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Resource Type Selector */}
      <div className="filter-rail-section">
        <h4 className="filter-section-title">Resource Type</h4>
        <div className="filter-chip-grid">
          {resourceTypes.map((t) => (
            <button
              key={t.id}
              className={`filter-facet-chip ${filters.type === t.id ? 'active' : ''}`}
              onClick={() => onFilterChange({ type: t.id })}
              type="button"
            >
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Sort By Selector */}
      <div className="filter-rail-section">
        <div className="filter-section-title-row">
          <h4 className="filter-section-title">Sort By</h4>
          <ArrowUpDown size={13} color="#6B7280" />
        </div>
        <select
          className="filter-sort-select"
          value={filters.sort || 'relevant'}
          onChange={(e) => onFilterChange({ sort: e.target.value })}
          aria-label="Sort study resources"
        >
          {sortOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* 6. Action CTA: Contribute Notes (Routes directly to Upload screen) */}
      <div className="filter-rail-contribute-card">
        <button
          type="button"
          className="btn-rail-contribute tactile-btn"
          onClick={() => navigateTo('upload')}
          title="Contribute your study notes to the campus frame"
        >
          <Upload size={15} strokeWidth={2.4} />
          <span>Contribute Notes</span>
        </button>
      </div>
    </aside>
  );
};
