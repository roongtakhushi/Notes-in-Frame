import React from 'react';
import { Bookmark, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HandwrittenNotesPreview } from './PhotographicPreviews';

export const PolaroidCard = ({ resource }) => {
  const { bookmarks, toggleBookmark, openNoteDetail } = useApp();
  const isBookmarked = bookmarks.includes(resource.id);

  const tapeColor = resource.tapeColor || 'blue';

  return (
    <article
      className="wireframe-polaroid-card"
      onClick={() => openNoteDetail(resource.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          openNoteDetail(resource.id);
        }
      }}
      aria-label={`Open note details: ${resource.title}`}
    >
      {/* Washi Tape Header Accent */}
      <div className={`wireframe-washi-tape tape-${tapeColor}`} />

      {/* Polaroid Photo Frame Area */}
      <div className="card-photo-box">
        <HandwrittenNotesPreview
          title={resource.title}
          type={resource.resourceType}
          accentColor={tapeColor === 'pink' ? '#DD88C1' : '#407ADD'}
        />
      </div>

      {/* Polaroid Bottom Caption Area */}
      <div className="card-caption-box">
        <h3 className="card-note-title" title={resource.title}>
          {resource.title}
        </h3>

        <div className="card-meta-row">
          <div className="card-rating-wrap">
            <Star size={13} fill="#F59E0B" stroke="#F59E0B" />
            <span className="card-rating-num">{resource.rating}</span>
            <span className="card-reviews-count">({resource.reviewCount})</span>
          </div>

          <button
            className={`card-btn-bookmark ${isBookmarked ? 'saved' : ''}`}
            onClick={(e) => toggleBookmark(resource.id, e)}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark note'}
            aria-label="Bookmark"
          >
            <Bookmark
              size={17}
              fill={isBookmarked ? '#DD88C1' : 'none'}
              stroke={isBookmarked ? '#DD88C1' : '#6B7280'}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </article>
  );
};
