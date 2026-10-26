import React, { useState } from 'react';
import { ArrowLeft, Plus, MoreVertical, Heart, FolderPlus, X, Bookmark } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PolaroidCard } from '../components/PolaroidCard';
import { FilmStripDecoration, CampusBuildingPreview, HandwrittenNotesPreview } from '../components/PhotographicPreviews';

export const CollectionsView = () => {
  const {
    resources,
    collections,
    createCollection,
    toggleResourceInCollection,
    navigateBack,
    bookmarks,
    openNoteDetail
  } = useApp();

  const [activeTab, setActiveTab] = useState('collections'); // 'collections' | 'bookmarked'
  const [selectedColId, setSelectedColId] = useState(null);
  const [isNewColModalOpen, setIsNewColModalOpen] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');
  const [newColPinColor, setNewColPinColor] = useState('blue');

  const activeCollection = collections.find(c => c.id === selectedColId);
  const activeColResources = activeCollection
    ? resources.filter(r => activeCollection.resourceIds?.includes(r.id))
    : [];

  const bookmarkedResources = resources.filter(r => bookmarks.includes(r.id));

  const handleCreateCollection = (e) => {
    e.preventDefault();
    if (!newColName.trim()) return;
    const created = createCollection(newColName.trim(), newColDesc.trim(), newColPinColor);
    setNewColName('');
    setNewColDesc('');
    setIsNewColModalOpen(false);
    setSelectedColId(created.id);
  };

  // Preset 4 album cards matching Screen 8
  const defaultAlbums = [
    {
      id: 'col-1',
      title: 'Semester 3',
      count: '12 notes',
      pinColor: 'blue',
      hasHeart: false,
      previewType: 'campus'
    },
    {
      id: 'col-2',
      title: "Tomorrow's Exam",
      count: '8 notes',
      pinColor: 'pink',
      hasHeart: true,
      previewType: 'notes'
    },
    {
      id: 'col-3',
      title: 'Important PYQs',
      count: '15 notes',
      pinColor: 'blue',
      hasHeart: false,
      previewType: 'notes'
    },
    {
      id: 'col-4',
      title: 'Machine Learning',
      count: '7 notes',
      pinColor: 'green',
      hasHeart: false,
      previewType: 'notes'
    }
  ];

  return (
    <div className="collections-screen-container">
      {/* Top Header Bar (Screen 8) */}
      <div className="collections-top-bar">
        <button
          className="btn-back-round"
          onClick={() => selectedColId ? setSelectedColId(null) : navigateBack()}
          aria-label="Back"
        >
          <ArrowLeft size={20} strokeWidth={2.4} />
        </button>

        <h1 className="collections-header-title">
          {selectedColId ? (activeCollection?.name || 'Collection') : 'My Collections'}
        </h1>

        {!selectedColId && (
          <button
            className="btn-new-collection"
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
            <p className="collection-desc">
              {activeCollection?.description || 'Study collection resources'}
            </p>
            <span className="collection-count-badge">
              {activeColResources.length} items pinned
            </span>
          </div>

          {activeColResources.length > 0 ? (
            <div className="polaroid-grid">
              {activeColResources.map(resource => (
                <PolaroidCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="empty-collection-state">
              <p>No notes in this collection yet.</p>
              <button
                className="btn btn-secondary"
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
              My Collections
            </button>
            <button
              className={`segmented-btn ${activeTab === 'bookmarked' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookmarked')}
            >
              Bookmarked
            </button>
          </div>

          {activeTab === 'collections' ? (
            <div className="collections-stage">
              {/* Decorative Film Strip on the left/background */}
              <div className="collections-film-accent" aria-hidden="true">
                <FilmStripDecoration vertical style={{ height: '280px', width: '26px' }} />
              </div>

              {/* 2x2 Grid of Pushpin Pinned Polaroid Albums (Screen 8) */}
              <div className="albums-2x2-grid">
                {defaultAlbums.map((album) => {
                  const matchCol = collections.find(c => c.name.toLowerCase().includes(album.title.toLowerCase())) || collections[0];
                  return (
                    <div
                      key={album.id}
                      className="pushpin-polaroid-album"
                      onClick={() => setSelectedColId(matchCol?.id || 'col-1')}
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
                          <Heart size={16} fill="#DD88C1" color="#DD88C1" />
                        </div>
                      )}

                      {/* Polaroid Photo Box */}
                      <div className="album-photo-box">
                        {album.previewType === 'campus' ? (
                          <CampusBuildingPreview />
                        ) : (
                          <HandwrittenNotesPreview
                            title={album.title}
                            accentColor={album.pinColor === 'pink' ? '#DD88C1' : '#407ADD'}
                          />
                        )}
                      </div>

                      {/* Caption & 3 Dots Menu */}
                      <div className="album-caption-row">
                        <div>
                          <h3 className="album-title">{album.title}</h3>
                          <span className="album-count">{album.count}</span>
                        </div>
                        <button
                          className="album-menu-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          aria-label="Options"
                        >
                          <MoreVertical size={16} color="#6B7280" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Bookmarked Tab */
            <div className="bookmarks-tab-view">
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                {bookmarkedResources.length} saved study frames
              </p>
              {bookmarkedResources.length > 0 ? (
                <div className="polaroid-grid">
                  {bookmarkedResources.map(resource => (
                    <PolaroidCard key={resource.id} resource={resource} />
                  ))}
                </div>
              ) : (
                <div className="empty-collection-state">
                  <Bookmark size={32} color="#DD88C1" />
                  <p>No bookmarked frames yet. Star any note to find it here!</p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Modal to Create New Collection */}
      {isNewColModalOpen && (
        <div className="modal-overlay" onClick={() => setIsNewColModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">New Collection</h2>
              <button className="btn-icon" onClick={() => setIsNewColModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateCollection} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Collection Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="E.g. Final Semester Revision"
                  value={newColName}
                  onChange={(e) => setNewColName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="E.g. High-yield solved notes and papers"
                  value={newColDesc}
                  onChange={(e) => setNewColDesc(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Pushpin Color</label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {['blue', 'pink', 'green'].map(c => (
                    <button
                      key={c}
                      type="button"
                      className={`pushpin-color-pick pin-${c} ${newColPinColor === c ? 'selected' : ''}`}
                      onClick={() => setNewColPinColor(c)}
                    />
                  ))}
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                Create Collection
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
