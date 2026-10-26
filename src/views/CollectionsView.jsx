import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Plus,
  MoreVertical,
  Heart,
  FolderPlus,
  X,
  Bookmark,
  Globe,
  Lock,
  Palette,
  Tag,
  Check,
  Sparkles,
  Layers,
  HardDriveDownload,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PolaroidCard } from '../components/PolaroidCard';
import {
  FilmStripDecoration,
  CampusBuildingPreview,
  HandwrittenNotesPreview,
  CollectionsFilmStripRunner
} from '../components/PhotographicPreviews';

export const CollectionsView = () => {
  const {
    resources,
    collections,
    createCollection,
    toggleResourceInCollection,
    navigateBack,
    bookmarks,
    openNoteDetail,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('collections'); // 'collections' | 'bookmarked'
  const [selectedColId, setSelectedColId] = useState(null);
  const [isNewColModalOpen, setIsNewColModalOpen] = useState(false);

  // New Collection Form State
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');
  const [newColPinColor, setNewColPinColor] = useState('blue');
  const [newColCoverStyle, setNewColCoverStyle] = useState('ivory');
  const [newColDept, setNewColDept] = useState('CSE');
  const [newColTerm, setNewColTerm] = useState('Semester 4');
  const [newColIsPublic, setNewColIsPublic] = useState(true);

  // 5 rich 3D Pushpin color configurations
  const PIN_COLOR_OPTIONS = [
    { id: 'blue', label: 'Sky Blue', hex: '#3B82F6', theme: 'Core Notes' },
    { id: 'pink', label: 'Blossom Pink', hex: '#EC4899', theme: 'High-Yield' },
    { id: 'green', label: 'Emerald Green', hex: '#10B981', theme: 'Formulas' },
    { id: 'amber', label: 'Sunset Amber', hex: '#F59E0B', theme: '5-Year PYQs' },
    { id: 'purple', label: 'Royal Violet', hex: '#8B5CF6', theme: 'Reference' }
  ];

  const COVER_STYLE_OPTIONS = [
    { id: 'ivory', label: 'Classic Ivory', bg: '#FAFAF9', border: '#E7E5E4' },
    { id: 'blueprint', label: 'Blueprint Grid', bg: '#EFF6FF', border: '#BFDBFE' },
    { id: 'kraft', label: 'Kraft Album', bg: '#FEF3C7', border: '#FDE68A' },
    { id: 'sunset', label: 'Sunset Glow', bg: '#FDF2F8', border: '#FBCFE8' }
  ];

  const DEPT_OPTIONS = ['CSE', 'ECE', 'Mechanical', 'Civil', 'IT', 'General'];
  const TERM_OPTIONS = ['Semester 4', 'Finals Sprint', 'Mid-Terms', 'GATE Prep'];

  // Keyboard shortcut listener: Escape closes modal, Enter creates
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isNewColModalOpen) {
        setIsNewColModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isNewColModalOpen]);

  const activeCollection = collections.find(c => c.id === selectedColId);
  const activeColResources = activeCollection
    ? resources.filter(r => activeCollection.resourceIds?.includes(r.id))
    : [];

  const bookmarkedResources = resources.filter(r => bookmarks.includes(r.id));

  const handleCreateCollection = (e) => {
    e.preventDefault();
    if (!newColName.trim()) {
      showToast({
        title: 'Collection Name Required',
        description: 'Please give your study collection a title.',
        type: 'error'
      });
      return;
    }

    const created = createCollection(newColName.trim(), newColDesc.trim(), newColPinColor, {
      coverStyle: newColCoverStyle,
      department: newColDept,
      semester: newColTerm,
      isPublic: newColIsPublic
    });

    // Reset form
    setNewColName('');
    setNewColDesc('');
    setNewColPinColor('blue');
    setNewColCoverStyle('ivory');
    setIsNewColModalOpen(false);
    setSelectedColId(created.id);
  };

  // Base list of curated albums merged with user's custom collections
  const defaultAlbums = [
    {
      id: 'col-1',
      title: 'Semester 3',
      count: '12 notes',
      pinColor: 'blue',
      coverStyle: 'ivory',
      department: 'CSE',
      hasHeart: false,
      previewType: 'campus'
    },
    {
      id: 'col-2',
      title: "Tomorrow's Exam",
      count: '8 notes',
      pinColor: 'pink',
      coverStyle: 'sunset',
      department: 'CSE',
      hasHeart: true,
      previewType: 'notes'
    },
    {
      id: 'col-3',
      title: 'Important PYQs',
      count: '15 notes',
      pinColor: 'blue',
      coverStyle: 'blueprint',
      department: 'ECE',
      hasHeart: false,
      previewType: 'notes'
    },
    {
      id: 'col-4',
      title: 'Machine Learning',
      count: '7 notes',
      pinColor: 'green',
      coverStyle: 'kraft',
      department: 'CSE',
      hasHeart: false,
      previewType: 'notes'
    }
  ];

  // Merge custom collections created by the user with the default albums
  const customAlbums = collections
    .filter(c => !defaultAlbums.some(d => d.id === c.id))
    .map(c => ({
      id: c.id,
      title: c.name,
      count: `${c.resourceIds?.length || 0} notes`,
      pinColor: c.tapeColor || 'blue',
      coverStyle: c.coverStyle || 'ivory',
      department: c.department || 'General',
      hasHeart: false,
      previewType: 'notes'
    }));

  const allDisplayAlbums = [...defaultAlbums, ...customAlbums];

  return (
    <div className="collections-screen-container">
      {/* Desktop Corkboard Hero Header (Visible on >= 1024px) */}
      <section className="collections-desktop-banner" aria-label="Collections Scrapbook Overview">
        <div className="banner-corkboard-info">
          <div className="banner-tag-pill">
            <Layers size={14} color="#407ADD" />
            <span>Campus Scrapbook • Study Decks</span>
          </div>
          <h1 className="banner-corkboard-title">My Study Collections</h1>
          <p className="banner-corkboard-desc">
            Organize handwritten notes, repeat PYQ decks, and syllabus derivations with tactile pushpins and offline bookmarks.
          </p>
        </div>

        <div className="banner-corkboard-metrics">
          <div className="banner-film-badge" aria-label="35mm Film Archive">
            <span className="film-badge-reel">🎞️</span>
            <div className="film-badge-text">
              <span className="film-badge-title">35mm Roll #04</span>
              <span className="film-badge-sub">{allDisplayAlbums.length} Decks Mounted</span>
            </div>
          </div>
          <div className="corkboard-metric-card">
            <span className="metric-num">{allDisplayAlbums.length}</span>
            <span className="metric-label">Active Albums</span>
          </div>
          <div className="corkboard-metric-card">
            <span className="metric-num">{bookmarkedResources.length}</span>
            <span className="metric-label">Saved Frames</span>
          </div>
          <button
            className="btn-banner-new-collection tactile-btn"
            onClick={() => setIsNewColModalOpen(true)}
          >
            <Plus size={16} strokeWidth={2.8} />
            <span>New Collection</span>
          </button>
        </div>
      </section>

      {/* Top Header Bar (Mobile Navigation & Context Title) */}
      <div className="collections-top-bar">
        <button
          className="btn-back-round tactile-btn"
          onClick={() => selectedColId ? setSelectedColId(null) : navigateBack()}
          aria-label="Back"
        >
          <ArrowLeft size={20} strokeWidth={2.4} />
        </button>

        <h2 className="collections-header-title">
          {selectedColId ? (activeCollection?.name || 'Collection') : 'My Collections'}
        </h2>

        {!selectedColId && (
          <button
            className="btn-new-collection tactile-btn"
            onClick={() => setIsNewColModalOpen(true)}
            aria-label="Create New Collection"
          >
            <Plus size={16} strokeWidth={2.6} />
            <span>New</span>
          </button>
        )}
      </div>

      {/* When viewing a specific collection */}
      {selectedColId ? (
        <div className="collection-detail-wrap">
          <div className="collection-meta-banner">
            <div>
              <h3 className="collection-detail-heading">{activeCollection?.name}</h3>
              <p className="collection-desc">
                {activeCollection?.description || 'Custom peer study collection resources'}
              </p>
            </div>
            <div className="collection-badge-group">
              <span className="collection-count-badge">
                {activeColResources.length} items pinned
              </span>
              <button
                className="btn-share-collection tactile-btn"
                onClick={() => {
                  navigator.clipboard?.writeText?.(window.location.href);
                  showToast({
                    title: 'Deck Link Copied 📋',
                    description: `Shareable link for "${activeCollection?.name}" ready.`,
                    type: 'success'
                  });
                }}
              >
                Share Deck
              </button>
            </div>
          </div>

          {activeColResources.length > 0 ? (
            <div className="polaroid-explore-grid">
              {activeColResources.map(resource => (
                <PolaroidCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="empty-collection-state">
              <p>No notes in this collection yet. Browse Explore Notes to pin resources!</p>
              <button
                className="btn btn-secondary tactile-btn"
                onClick={() => setSelectedColId(null)}
              >
                Back to All Collections
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Segmented Control: [My Collections] | [Bookmarked] */}
          <div className="segmented-control-wrap">
            <button
              className={`segmented-btn ${activeTab === 'collections' ? 'active' : ''}`}
              onClick={() => setActiveTab('collections')}
            >
              My Collections ({allDisplayAlbums.length})
            </button>
            <button
              className={`segmented-btn ${activeTab === 'bookmarked' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookmarked')}
            >
              Bookmarked ({bookmarkedResources.length})
            </button>
          </div>

          {activeTab === 'collections' ? (
            <div className="collections-stage">
              {/* Neatly Placed 35mm Negative Contact Runner Framing the Albums */}
              <CollectionsFilmStripRunner
                albums={allDisplayAlbums}
                selectedColId={selectedColId}
                onSelectAlbum={(album) => {
                  const matchCol = collections.find(c => c.id === album.id || c.name.toLowerCase().includes(album.title.toLowerCase())) || collections[0];
                  setSelectedColId(matchCol?.id || album.id);
                }}
              />

              {/* Responsive Corkboard Albums Grid (2 cols mobile, 3-4 cols desktop) */}
              <div className="corkboard-responsive-grid">
                {allDisplayAlbums.map((album) => {
                  const matchCol = collections.find(c => c.id === album.id || c.name.toLowerCase().includes(album.title.toLowerCase())) || collections[0];
                  return (
                    <article
                      key={album.id}
                      className={`pushpin-polaroid-album cover-${album.coverStyle || 'ivory'} tactile-btn`}
                      onClick={() => setSelectedColId(matchCol?.id || album.id)}
                      role="button"
                      tabIndex={0}
                    >
                      {/* Realistic 3D Pushpin on Top Center */}
                      <div className={`pushpin-head pin-${album.pinColor}`} aria-hidden="true">
                        <span className="pin-highlight" />
                        <span className="pin-shadow" />
                      </div>

                      {/* Heart Sticker on Tomorrow's Exam card */}
                      {album.hasHeart && (
                        <div className="album-heart-sticker" aria-hidden="true">
                          <Heart size={14} fill="#DD88C1" color="#DD88C1" />
                        </div>
                      )}

                      {/* Photo / Sketch Preview Inside Frame */}
                      <div className="album-photo-canvas">
                        {album.previewType === 'campus' ? (
                          <CampusBuildingPreview />
                        ) : (
                          <HandwrittenNotesPreview title={album.title} />
                        )}
                      </div>

                      {/* Card Caption Row */}
                      <div className="album-caption-row">
                        <div>
                          <div className="album-tag-row">
                            <span className="album-dept-pill">{album.department}</span>
                          </div>
                          <h3 className="album-title">{album.title}</h3>
                          <span className="album-count">{album.count}</span>
                        </div>
                        <button
                          className="album-menu-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            showToast({
                              title: `"${album.title}" Options`,
                              description: 'Deck settings and export options ready.',
                              type: 'info'
                            });
                          }}
                          aria-label="Options"
                        >
                          <MoreVertical size={16} color="#6B7280" />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Bookmarked Tab */
            <div className="bookmarks-tab-view">
              <div className="bookmarks-meta-bar">
                <span className="bookmarks-count-tag">
                  {bookmarkedResources.length} saved study frames ready for offline revision
                </span>
              </div>
              {bookmarkedResources.length > 0 ? (
                <div className="polaroid-explore-grid">
                  {bookmarkedResources.map(resource => (
                    <PolaroidCard key={resource.id} resource={resource} />
                  ))}
                </div>
              ) : (
                <div className="empty-collection-state">
                  <Bookmark size={36} color="#DD88C1" />
                  <p>No bookmarked frames yet. Star any note in Explore to pin it here!</p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Complete Production "New Collection" Modal */}
      {isNewColModalOpen && (
        <div className="modal-overlay" onClick={() => setIsNewColModalOpen(false)}>
          <div className="modal-container modal-collection-pro" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <FolderPlus size={20} color="#407ADD" strokeWidth={2.4} />
                <h2 className="modal-title">Create New Collection</h2>
              </div>
              <button
                className="btn-icon tactile-btn"
                onClick={() => setIsNewColModalOpen(false)}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateCollection} className="new-col-modal-form">
              {/* Top: Two-Column split inside modal (Form on Left, Live Card Preview on Right) */}
              <div className="modal-split-body">
                {/* Left Controls Column */}
                <div className="modal-form-fields">
                  {/* Collection Name */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="col-name-input">
                      Collection Name <span className="req-star">*</span>
                    </label>
                    <input
                      id="col-name-input"
                      type="text"
                      className="form-input"
                      placeholder="E.g. Final Semester Revision, GATE PYQs"
                      value={newColName}
                      onChange={(e) => setNewColName(e.target.value)}
                      autoFocus
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="col-desc-input">
                      Description <span className="opt-label">(Optional)</span>
                    </label>
                    <input
                      id="col-desc-input"
                      type="text"
                      className="form-input"
                      placeholder="E.g. High-yield derivations & 5-year repeat questions"
                      value={newColDesc}
                      onChange={(e) => setNewColDesc(e.target.value)}
                    />
                  </div>

                  {/* 1. Tactile 3D Pushpin Color Picker */}
                  <div className="form-group">
                    <div className="form-label-row">
                      <label className="form-label">Tactile Pushpin Pinhead</label>
                      <span className="form-sub-hint">
                        Selected: <strong>{PIN_COLOR_OPTIONS.find(p => p.id === newColPinColor)?.label}</strong>
                      </span>
                    </div>
                    <div className="pushpin-palette-grid" role="radiogroup" aria-label="Pushpin color options">
                      {PIN_COLOR_OPTIONS.map((pin) => {
                        const isSelected = newColPinColor === pin.id;
                        return (
                          <button
                            key={pin.id}
                            type="button"
                            className={`pushpin-choice-btn ${isSelected ? 'selected' : ''}`}
                            onClick={() => setNewColPinColor(pin.id)}
                            role="radio"
                            aria-checked={isSelected}
                            title={`${pin.label} (${pin.theme})`}
                          >
                            <div className={`modal-3d-pin-head pin-${pin.id}`}>
                              <span className="pin-highlight" />
                              <span className="pin-shadow" />
                            </div>
                            <div className="pin-btn-text">
                              <span className="pin-btn-title">{pin.label}</span>
                              <span className="pin-btn-theme">{pin.theme}</span>
                            </div>
                            {isSelected && <Check size={14} className="pin-check-icon" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Cover Texture Style */}
                  <div className="form-group">
                    <label className="form-label">Album Cover Style</label>
                    <div className="cover-preset-grid">
                      {COVER_STYLE_OPTIONS.map((cov) => (
                        <button
                          key={cov.id}
                          type="button"
                          className={`cover-preset-chip ${newColCoverStyle === cov.id ? 'active' : ''}`}
                          style={{ backgroundColor: cov.bg, borderColor: cov.border }}
                          onClick={() => setNewColCoverStyle(cov.id)}
                        >
                          <span className="cover-chip-label">{cov.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Department & Academic Sprint */}
                  <div className="form-row-two-col">
                    <div className="form-group">
                      <label className="form-label">Department</label>
                      <select
                        className="form-select"
                        value={newColDept}
                        onChange={(e) => setNewColDept(e.target.value)}
                      >
                        {DEPT_OPTIONS.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Academic Sprint</label>
                      <select
                        className="form-select"
                        value={newColTerm}
                        onChange={(e) => setNewColTerm(e.target.value)}
                      >
                        {TERM_OPTIONS.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 4. Visibility Tier Toggle */}
                  <div className="form-group">
                    <label className="form-label">Deck Privacy & Sharing</label>
                    <div className="visibility-toggle-group">
                      <button
                        type="button"
                        className={`vis-btn ${newColIsPublic ? 'active' : ''}`}
                        onClick={() => setNewColIsPublic(true)}
                      >
                        <Globe size={15} />
                        <div>
                          <span className="vis-title">Campus Public</span>
                          <span className="vis-sub">Discoverable by batchmates</span>
                        </div>
                      </button>
                      <button
                        type="button"
                        className={`vis-btn ${!newColIsPublic ? 'active' : ''}`}
                        onClick={() => setNewColIsPublic(false)}
                      >
                        <Lock size={15} />
                        <div>
                          <span className="vis-title">Private Scrapbook</span>
                          <span className="vis-sub">Only visible to you</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Real-time Live Album Card Preview */}
                <div className="modal-live-preview-dock" aria-label="Live collection preview">
                  <span className="preview-dock-title">Live Corkboard Preview</span>
                  <div className={`pushpin-polaroid-album cover-${newColCoverStyle} preview-card-shadow`}>
                    <div className={`pushpin-head pin-${newColPinColor}`} aria-hidden="true">
                      <span className="pin-highlight" />
                      <span className="pin-shadow" />
                    </div>
                    <div className="album-photo-canvas">
                      <HandwrittenNotesPreview title={newColName.trim() || 'Study Notes Deck'} />
                    </div>
                    <div className="album-caption-row">
                      <div>
                        <div className="album-tag-row">
                          <span className="album-dept-pill">{newColDept}</span>
                          <span className="album-dept-pill term-pill">{newColTerm}</span>
                        </div>
                        <h4 className="album-title">
                          {newColName.trim() || 'Untitled Collection'}
                        </h4>
                        <span className="album-count">0 study notes pinned</span>
                      </div>
                    </div>
                  </div>
                  <span className="preview-tip-text">
                    💡 Tip: Once created, you can pin any note from the Explore tab directly into this album!
                  </span>
                </div>
              </div>

              {/* Modal Actions Footer */}
              <div className="modal-action-footer">
                <button
                  type="button"
                  className="btn btn-secondary tactile-btn"
                  onClick={() => setIsNewColModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary tactile-btn"
                  disabled={!newColName.trim()}
                >
                  <FolderPlus size={16} strokeWidth={2.4} />
                  <span>Create Collection</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};