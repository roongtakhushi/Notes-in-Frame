import React, { useState, useEffect } from 'react';
import {
  Search,
  ChevronDown,
  X,
  SlidersHorizontal,
  RotateCcw,
  Upload,
  ArrowUpDown,
  Check,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PolaroidCard } from '../components/PolaroidCard';
import { FilterSheet } from '../components/FilterSheet';
import { Pagination } from '../components/Pagination';
import { FilmStripDecoration } from '../components/PhotographicPreviews';

export const ExploreView = () => {
  const {
    resources,
    exploreFilters,
    setExploreFilters,
    isFilterSheetOpen,
    setIsFilterSheetOpen,
    navigateTo
  } = useApp();

  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const years = ['All', '2025', '2024', '2023', '2022'];
  const subjects = ['All', 'CSE', 'IT', 'ECE', 'Mechanical', 'Civil', 'Applied Maths'];
  const resourceTypes = [
    { id: 'All', label: 'All Types' },
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

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [exploreFilters]);

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

    // Flexible Department / Subject matching
    if (exploreFilters.subject !== 'All') {
      const s = exploreFilters.subject.toLowerCase();
      const resSubject = (resource.subject || '').toLowerCase();
      const resCode = (resource.subjectCode || '').toLowerCase();
      const matchSub = resSubject.includes(s) || resCode.includes(s) ||
        (s === 'cse' && (resSubject.includes('computer') || resSubject.includes('machine learning') || resSubject.includes('data structures') || resSubject.includes('operating systems'))) ||
        (s === 'it' && (resSubject.includes('information') || resSubject.includes('dbms') || resSubject.includes('cloud') || resSubject.includes('network'))) ||
        (s === 'ece' && (resSubject.includes('electronics') || resSubject.includes('signal') || resSubject.includes('vlsi'))) ||
        (s === 'mechanical' && (resSubject.includes('thermodynamics') || resSubject.includes('mech'))) ||
        (s === 'civil' && (resSubject.includes('civil') || resSubject.includes('structure') || resSubject.includes('rcc'))) ||
        (s === 'applied maths' && (resSubject.includes('math') || resSubject.includes('calculus') || resSubject.includes('physics')));
      if (!matchSub) return false;
    }

    // Flexible Academic Year matching
    if (exploreFilters.year !== 'All') {
      const filterY = exploreFilters.year.toLowerCase().trim();
      const resY = (resource.academicYear || '').toLowerCase();
      const resLabel = (resource.yearLabel || '').toLowerCase();
      
      const isYearMatch = resY.includes(filterY) || resLabel.includes(filterY) ||
        (filterY === '2025' && (resLabel.includes('4th') || resLabel.includes('final') || resY === '2025')) ||
        (filterY === '2024' && (resLabel.includes('3rd') || resY === '2024')) ||
        (filterY === '2023' && (resLabel.includes('2nd') || resY === '2023')) ||
        (filterY === '2022' && (resLabel.includes('1st') || resY === '2022'));
        
      if (!isYearMatch) return false;
    }

    // Flexible Resource Type matching
    if (exploreFilters.type !== 'All') {
      const t = exploreFilters.type.toLowerCase();
      const resType = (resource.resourceType || '').toLowerCase();
      const matchType = resType.includes(t) ||
        (t === 'notes' && (resType.includes('note') || resType.includes('handwritten'))) ||
        (t === 'pyqs' && (resType.includes('pyq') || resType.includes('question'))) ||
        (t === 'cheatsheets' && (resType.includes('revision') || resType.includes('cheat') || resType.includes('formula')));
      if (!matchType) return false;
    }
    return true;
  });

  // Sorting
  if (exploreFilters.sort === 'rating') {
    filteredResources.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (exploreFilters.sort === 'downloads') {
    filteredResources.sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0));
  } else if (exploreFilters.sort === 'newest') {
    filteredResources.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }

  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);
  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const hasActiveFilters = exploreFilters.subject !== 'All' || exploreFilters.year !== 'All' || exploreFilters.type !== 'All' || exploreFilters.query !== '' || exploreFilters.sort !== 'relevant';

  const handleResetFilters = () => {
    setExploreFilters({
      query: '',
      subject: 'All',
      year: 'All',
      type: 'All',
      sort: 'relevant'
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 60, behavior: 'smooth' });
  };

  return (
    <div className="explore-screen-container">
      {/* 1. Global Search Bar */}
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

      {/* 2. Desktop Horizontal Studio Filter Dock (Visible >= 1024px) */}
      <div className="explore-desktop-filter-dock" aria-label="Desktop Studio Filters">
        <div className="dock-top-row">
          <div className="dock-group-left">
            <span className="dock-label">Academic Year:</span>
            <div className="dock-pills-flex">
              {years.map((y) => (
                <button
                  key={y}
                  type="button"
                  className={`dock-pill-btn tactile-btn ${exploreFilters.year === y ? 'active' : ''}`}
                  onClick={() => setExploreFilters(prev => ({ ...prev, year: y }))}
                >
                  {exploreFilters.year === y && <Check size={11} strokeWidth={3} className="pill-check" />}
                  <span>{y}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="dock-group-right">
            {hasActiveFilters && (
              <button
                type="button"
                className="btn-dock-reset tactile-btn"
                onClick={handleResetFilters}
                title="Reset all filters"
              >
                <RotateCcw size={12} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        <div className="dock-middle-row">
          <span className="dock-label">Department:</span>
          <div className="dock-pills-flex">
            {subjects.map((sub) => (
              <button
                key={sub}
                type="button"
                className={`dock-pill-btn tactile-btn ${exploreFilters.subject === sub ? 'active' : ''}`}
                onClick={() => setExploreFilters(prev => ({ ...prev, subject: sub }))}
              >
                <span>{sub}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="dock-action-bar">
          <div className="dock-type-group">
            <span className="dock-label">Type:</span>
            <div className="dock-pills-flex">
              {resourceTypes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`dock-pill-btn tactile-btn ${exploreFilters.type === t.id ? 'active' : ''}`}
                  onClick={() => setExploreFilters(prev => ({ ...prev, type: t.id }))}
                >
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="dock-sort-and-cta">
            <div className="dock-sort-wrap">
              <ArrowUpDown size={13} color="#6B7280" />
              <select
                className="dock-sort-select"
                value={exploreFilters.sort || 'relevant'}
                onChange={(e) => setExploreFilters(prev => ({ ...prev, sort: e.target.value }))}
                aria-label="Sort study resources"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="btn-dock-contribute tactile-btn"
              onClick={() => navigateTo('upload')}
              title="Contribute notes to campus archive"
            >
              <Upload size={14} strokeWidth={2.4} />
              <span>Contribute Notes</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Dropdown Filter Pills Row (Untouched for mobile users < 1024px) */}
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

      {/* 4. Live Counter & Active Filter Chips */}
      <div className="explore-meta-counter-row">
        <div className="meta-left-group">
          <span className="resources-count-label">
            Showing <strong>{filteredResources.length}</strong> resources in frame
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

      {/* 5. Responsive Full-Width Polaroid Grid (3-4 cols desktop, 2-cols mobile) */}
      <div className="polaroid-explore-grid">
        {paginatedResources.length > 0 ? (
          paginatedResources.map((resource) => (
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

      {/* 6. Production-Level Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredResources.length}
        pageSize={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />

      {/* 7. Filter Bottom Sheet (for Mobile users) */}
      <FilterSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        filters={exploreFilters}
        onApply={(updated) => setExploreFilters(updated)}
      />
    </div>
  );
};

export default ExploreView;
