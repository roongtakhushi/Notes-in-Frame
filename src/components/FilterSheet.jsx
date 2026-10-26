import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const FilterSheet = ({ isOpen, onClose, filters, onApply }) => {
  if (!isOpen) return null;

  const [localFilters, setLocalFilters] = useState({ ...filters });

  const ACADEMIC_YEARS_MOCK = ['All', '2025', '2024', '2023', '2022'];
  const SUBJECTS_MOCK = [
    'All', 'CSE', 'ECE', 'Mechanical', 'Civil', 
    'IT', 'Mathematics', 'Management', 'Humanities'
  ];
  const RESOURCE_TYPES_MOCK = [
    'All', 'Notes', 'PYQs', 'Revision Guide', 'Handwritten', 'Video'
  ];

  const handleReset = () => {
    setLocalFilters({
      query: localFilters.query,
      subject: 'All',
      year: 'All',
      type: 'All',
      sort: 'relevant'
    });
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  return (
    <div className="filter-sheet-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="filter-sheet-container" onClick={(e) => e.stopPropagation()}>
        {/* Drag handle bar at top center */}
        <div className="sheet-drag-handle" aria-hidden="true" />

        {/* Header */}
        <div className="sheet-header-row">
          <h2 className="sheet-title">Filters</h2>
          <button
            type="button"
            className="sheet-btn-reset"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        {/* Filter Sections */}
        <div className="sheet-body-content">
          {/* 1. Academic Year */}
          <div className="sheet-section">
            <h3 className="sheet-section-label">Academic Year</h3>
            <div className="sheet-pills-row">
              {ACADEMIC_YEARS_MOCK.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  className={`sheet-pill ${localFilters.year === yr ? 'active' : ''}`}
                  onClick={() => setLocalFilters(prev => ({ ...prev, year: yr }))}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Subject */}
          <div className="sheet-section">
            <h3 className="sheet-section-label">Subject</h3>
            <div className="sheet-pills-wrap">
              {SUBJECTS_MOCK.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  className={`sheet-pill ${localFilters.subject === sub ? 'active' : ''}`}
                  onClick={() => setLocalFilters(prev => ({ ...prev, subject: sub }))}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Resource Type */}
          <div className="sheet-section">
            <h3 className="sheet-section-label">Resource Type</h3>
            <div className="sheet-pills-wrap">
              {RESOURCE_TYPES_MOCK.map((tp) => (
                <button
                  key={tp}
                  type="button"
                  className={`sheet-pill ${localFilters.type === tp ? 'active' : ''}`}
                  onClick={() => setLocalFilters(prev => ({ ...prev, type: tp }))}
                >
                  {tp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Apply Button */}
        <div className="sheet-footer-area">
          <button
            type="button"
            className="btn-sheet-apply"
            onClick={handleApply}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
