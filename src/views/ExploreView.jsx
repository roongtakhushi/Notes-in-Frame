import React from 'react';
import { Search, ChevronDown, X, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PolaroidCard } from '../components/PolaroidCard';
import { FilterSheet } from '../components/FilterSheet';
import { DesktopFilterRail } from '../components/DesktopFilterRail';
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
      const matchTitle = resource.title?.toLowerCase().includes(q);
      const matchSubject = resource.subject?.toLowerCase().includes(q);
      const matchTopic = resource.unitOrTopic?.toLowerCase().includes(q);
      const matchCode = resource.subjectCode?.toLowerCase().includes(q);
      const matchTags = resource.tags?.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchSubject && !matchTopic && !matchCode && !matchTags) return false;
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

  // Sorting
  if (exploreFilters.sort === 'rating') {
    filteredResources.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (exploreFilters.sort === 'downloads') {
    filteredResources.sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0));
  }

  const hasActiveFilters = exploreFilters.subject !== 'All' || exploreFilters.year !== 'All' || exploreFilters.type !== 'All' || exploreFilters.query !== '';

  const handleResetFilters = () => {
    setExploreFilters({
      query: '',
      subject: 'All',
      year: 'All',
      type: 'All',
      sort: 'relevant'
    });
  };

  return (
    <div className="explore-screen-container">
      {/* Dual Column Layout on Desktop (Filter Rail on Left, Grid on Right) */}
      <div className="explore-desktop-two-col-layout">
        {/* Left Column: Persistent Faceted Filter Sidebar on Desktop */}
        <DesktopFilterRail
          filters={exploreFilters}
          onFilterChange={(newFilters) => setExploreFilters(prev => ({ ...prev, ...newFilters }))}
          onReset={handleResetFilters}
          totalCount={filteredResources.length}
        />

        {/* Right Column: Search + Grid */}
        <div className="explore-main-content-col">
          {/* 1. Search Bar with Green Action Button (Screen 4) */}
          <div className="explore-search-wrap">
            <div className="home-search-input-wrap">
              <Search className="home-search-icon" size={19} color="#9CA3AF" />
              <input
                type="text"
                className="home-search-input"
                placeholder="Search notes, subjects, topics... (Press ⌘K)"
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
                className="home-search-submit-btn tactile-btn"
                aria-label="Search"
              >
                <Search size={18} strokeWidth={2.6} color="#FFFFFF" />
              </button>
            </div>
          </div>

          {/* 2. Mobile Dropdown Filter Pills Row (Hidden on Desktop >= 1024px) */}
          <div className="explore-dropdown-pills-row mobile-only-filter-row" aria-label="Filter dropdowns">
            <button
              type="button"
              className="dropdown-pill-btn tactile-btn"
              onClick={() => setIsFilterSheetOpen(true)}
            >
              <span>{exploreFilters.year !== 'All' ? `Year: ${exploreFilters.year}` : 'Year'}</span>
              <ChevronDown size={14} strokeWidth={2.4} />
            </button>

            <button
              type="button"
              className="dropdown-pill-btn tactile-btn"
              onClick={() => setIsFilterSheetOpen(true)}
            >
              <span>{exploreFilters.subject !== 'All' ? exploreFilters.subject : 'Subject'}</span>
              <ChevronDown size={14} strokeWidth={2.4} />
            </button>

            <button
              type="button"
              className="dropdown-pill-btn tactile-btn"
              onClick={() => setIsFilterSheetOpen(true)}
            >
              <span>{exploreFilters.type !== 'All' ? exploreFilters.type : 'Type'}</span>
              <ChevronDown size={14} strokeWidth={2.4} />
            </button>

            <button
              type="button"
              className="dropdown-pill-btn tactile-btn"
              onClick={() => setIsFilterSheetOpen(true)}
            >
              <span>Sort</span>
              <ChevronDown size={14} strokeWidth={2.4} />
            </button>
          </div>

          {/* 3. Resource Counter & Active Filter Pills */}
          <div className="explore-meta-counter-row">
            <div className="meta-left-group">
              <span className="resources-count-label">
                <strong>{filteredResources.length}</strong> resources in frame
              </span>
              {hasActiveFilters && (
                <button className="btn-inline-clear-filters" onClick={handleResetFilters}>
                  Clear all
                </button>
              )}
            </div>

            <div className="explore-film-accent" aria-hidden="true">
              <FilmStripDecoration style={{ width: '80px', height: '16px' }} />
            </div>
          </div>

          {/* Active Filter Chips Row */}
          {hasActiveFilters && (
            <div className="active-filter-chips-row">
              {exploreFilters.subject !== 'All' && (
                <span className="active-facet-tag">
                  Subject: {exploreFilters.subject}
                  <button onClick={() => setExploreFilters(p => ({ ...p, subject: 'All' }))}>×</button>
                </span>
              )}
              {exploreFilters.year !== 'All' && (
                <span className="active-facet-tag">
                  Year: {exploreFilters.year}
                  <button onClick={() => setExploreFilters(p => ({ ...p, year: 'All' }))}>×</button>
                </span>
              )}
              {exploreFilters.type !== 'All' && (
                <span className="active-facet-tag">
                  Type: {exploreFilters.type}
                  <button onClick={() => setExploreFilters(p => ({ ...p, type: 'All' }))}>×</button>
                </span>
              )}
              {exploreFilters.query && (
                <span className="active-facet-tag">
                  Query: "{exploreFilters.query}"
                  <button onClick={() => setExploreFilters(p => ({ ...p, query: '' }))}>×</button>
                </span>
              )}
            </div>
          )}

          {/* 4. Responsive Polaroid Grid (2-cols on mobile, 3-4 cols on desktop) */}
          <div className="polaroid-explore-grid">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <PolaroidCard key={resource.id} resource={resource} />
              ))
            ) : (
              <div className="explore-empty-state">
                <div className="empty-state-badge">No notes found</div>
                <h3>No study resources match this filter</h3>
                <p>Try resetting the subject or year filter to see all notes.</p>
                <button className="btn-primary tactile-btn" onClick={handleResetFilters}>
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Filter Bottom Sheet (for Mobile users) */}
      <FilterSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        filters={exploreFilters}
        onApply={(updated) => setExploreFilters(updated)}
      />
    </div>
  );
};
