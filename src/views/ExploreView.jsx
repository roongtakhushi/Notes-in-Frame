import React from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PolaroidCard } from '../components/PolaroidCard';
import { FilterSheet } from '../components/FilterSheet';
import { FilmStripDecoration } from '../components/PhotographicPreviews';

export const ExploreView = () => {
  const {
    resources,
    exploreFilters,
    setExploreFilters,
    isFilterSheetOpen,
    setIsFilterSheetOpen
  } = useApp();

  // Search filtering
  const filteredResources = resources.filter(resource => {
    if (exploreFilters.query) {
      const q = exploreFilters.query.toLowerCase().trim();
      const matchTitle = resource.title.toLowerCase().includes(q);
      const matchSubject = resource.subject.toLowerCase().includes(q);
      const matchTopic = resource.unitOrTopic?.toLowerCase().includes(q);
      if (!matchTitle && !matchSubject && !matchTopic) return false;
    }
    if (exploreFilters.subject !== 'All' && resource.subject !== exploreFilters.subject) {
      return false;
    }
    if (exploreFilters.year !== 'All' && resource.academicYear !== exploreFilters.year) {
      return false;
    }
    if (exploreFilters.type !== 'All' && resource.resourceType !== exploreFilters.type) {
      return false;
    }
    return true;
  });

  return (
    <div className="explore-screen-container">
      {/* 1. Search Bar with Green Action Button (Screen 4) */}
      <div className="explore-search-wrap">
        <div className="home-search-input-wrap">
          <Search className="home-search-icon" size={19} color="#9CA3AF" />
          <input
            type="text"
            className="home-search-input"
            placeholder="Search notes, subjects, topics..."
            value={exploreFilters.query}
            onChange={(e) => setExploreFilters(prev => ({ ...prev, query: e.target.value }))}
            aria-label="Search notes"
          />
          {exploreFilters.query && (
            <button
              type="button"
              className="btn-clear-query"
              onClick={() => setExploreFilters(prev => ({ ...prev, query: '' }))}
              aria-label="Clear query"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            className="home-search-submit-btn"
            onClick={() => {}}
            aria-label="Search"
          >
            <Search size={18} strokeWidth={2.6} color="#FFFFFF" />
          </button>
        </div>
      </div>

      {/* 2. Dropdown Filter Pills Row (Screen 4: Year ⌄, Subject ⌄, Type ⌄, Sort ⌄) */}
      <div className="explore-dropdown-pills-row" aria-label="Filter dropdowns">
        <button
          type="button"
          className="dropdown-pill-btn"
          onClick={() => setIsFilterSheetOpen(true)}
        >
          <span>Year</span>
          <ChevronDown size={14} strokeWidth={2.4} />
        </button>

        <button
          type="button"
          className="dropdown-pill-btn"
          onClick={() => setIsFilterSheetOpen(true)}
        >
          <span>Subject</span>
          <ChevronDown size={14} strokeWidth={2.4} />
        </button>

        <button
          type="button"
          className="dropdown-pill-btn"
          onClick={() => setIsFilterSheetOpen(true)}
        >
          <span>Type</span>
          <ChevronDown size={14} strokeWidth={2.4} />
        </button>

        <button
          type="button"
          className="dropdown-pill-btn"
          onClick={() => setIsFilterSheetOpen(true)}
        >
          <span>Sort</span>
          <ChevronDown size={14} strokeWidth={2.4} />
        </button>
      </div>

      {/* 3. Resource Counter & Film Strip Accent (Screen 4) */}
      <div className="explore-meta-counter-row">
        <span className="resources-count-label">
          {filteredResources.length > 0 ? `${filteredResources.length}+ resources` : '0 resources'}
        </span>

        <div className="explore-film-accent" aria-hidden="true">
          <FilmStripDecoration style={{ width: '60px', height: '14px' }} />
        </div>
      </div>

      {/* 4. 2-Column Grid of Polaroid Cards (Screen 4) */}
      <div className="polaroid-2col-grid">
        {filteredResources.map((resource) => (
          <PolaroidCard key={resource.id} resource={resource} />
        ))}
      </div>

      {/* 5. Filter Bottom Sheet (Screen 5) */}
      <FilterSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        filters={exploreFilters}
        onApply={(updated) => setExploreFilters(updated)}
      />
    </div>
  );
};
