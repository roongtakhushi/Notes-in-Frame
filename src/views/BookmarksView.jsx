import React from 'react';
import { Bookmark, ArrowLeft, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PolaroidCard } from '../components/PolaroidCard';

export const BookmarksView = () => {
  const { resources, bookmarks, navigateBack, navigateTo } = useApp();

  const bookmarkedResources = resources.filter(r => bookmarks.includes(r.id));

  return (
    <div className="bookmarks-view">
      {/* Header with Back button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button
          className="btn btn-secondary"
          onClick={navigateBack}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className="exposure-tag" style={{ background: 'var(--color-pink-light)', color: 'var(--color-pink-dark)', borderColor: 'var(--color-pink)' }}>
            {bookmarkedResources.length} Saved Frames
          </span>
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bookmark size={26} color="var(--color-pink)" fill="var(--color-pink)" />
          <span>Bookmarks & Saved Frames</span>
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
          High-yield lecture notes and PYQs pinned for rapid exam review
        </p>
      </div>

      {bookmarkedResources.length > 0 ? (
        <div className="polaroid-grid">
          {bookmarkedResources.map(resource => (
            <PolaroidCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon" style={{ background: 'var(--color-pink-light)', color: 'var(--color-pink)' }}>
            <Bookmark size={32} />
          </div>
          <h2 className="empty-state-title">No bookmarks saved yet</h2>
          <p className="empty-state-desc">
            Whenever you see a Polaroid note card you want to keep for exams, tap the bookmark icon to save it here.
          </p>
          <button className="btn btn-primary" onClick={() => navigateTo('explore')}>
            <Compass size={16} />
            <span>Explore Campus Notes</span>
          </button>
        </div>
      )}
    </div>
  );
};
