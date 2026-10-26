import React, { useState } from 'react';
import { ArrowLeft, Camera, Bell, Share2, Star, Heart, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HandwrittenNotesPreview, FilmStripDecoration } from '../components/PhotographicPreviews';
import { PolaroidCard } from '../components/PolaroidCard';

export const NoteDetailView = () => {
  const {
    resources,
    selectedResourceId,
    navigateBack,
    downloadResource,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview');
  const [isFollowing, setIsFollowing] = useState(false);

  const resource = resources.find(r => r.id === selectedResourceId) || resources[0];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: resource.title,
          text: `Check out ${resource.title} on Notes in Frame`,
          url: window.location.href
        });
      } catch (err) {}
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast({
          title: 'Frame Link Copied! 🔗',
          description: 'Shareable study note URL copied to clipboard.',
          type: 'pink'
        });
      } catch (err) {
        showToast({
          title: 'Share Link Ready',
          description: 'Note frame URL ready for campus study groups.',
          type: 'info'
        });
      }
    }
  };

  const handleFollowToggle = () => {
    const nextFollowing = !isFollowing;
    setIsFollowing(nextFollowing);
    showToast({
      title: nextFollowing ? `Following ${resource.uploadedBy || 'Contributor'}! ⭐` : `Unfollowed ${resource.uploadedBy || 'Contributor'}`,
      description: nextFollowing
        ? 'You will receive notifications whenever they upload new study notes.'
        : 'Removed from your followed campus curators.',
      type: nextFollowing ? 'success' : 'info'
    });
  };

  return (
    <div className="note-detail-screen-container">
      {/* Top Header Bar (Screen 6) */}
      <div className="detail-top-bar">
        <button
          className="btn-back-round"
          onClick={navigateBack}
          aria-label="Back"
        >
          <ArrowLeft size={20} strokeWidth={2.4} />
        </button>

        <div className="detail-top-actions">
          <button className="detail-icon-btn" aria-label="Camera snapshots">
            <Camera size={19} color="#407ADD" />
          </button>
          <button className="detail-icon-btn" aria-label="Notifications">
            <Bell size={19} color="#407ADD" />
          </button>
          <button className="detail-icon-btn" onClick={handleShare} aria-label="Share note">
            <Share2 size={19} color="#1E293B" />
          </button>
        </div>
      </div>

      {/* Main Hero Polaroid Card with Stickers & Film Accent */}
      <div className="detail-polaroid-stage">
        {/* Film Negative Strip Peeking on Top Right */}
        <div className="detail-film-strip-peeking" aria-hidden="true">
          <FilmStripDecoration vertical style={{ height: '140px', width: '24px' }} />
        </div>

        <div className="detail-hero-polaroid">
          {/* Pink Washi Tape at Top Center/Left */}
          <div className="detail-washi-tape-pink" />

          {/* Note Photo Preview Box */}
          <div className="detail-photo-frame">
            <HandwrittenNotesPreview
              title={resource.title}
              accentColor="#DD88C1"
            />

            {/* Pink Angled Tag: "Unit 1" */}
            <div className="sticker-unit-tag" aria-hidden="true">
              Unit 1
            </div>

            {/* Pink Heart Sticker */}
            <div className="sticker-heart" aria-hidden="true">
              <Heart size={18} fill="#DD88C1" color="#DD88C1" />
            </div>

            {/* Vintage Camera Sticker in Corner */}
            <div className="sticker-vintage-camera" aria-hidden="true">
              <Camera size={18} color="#1E293B" strokeWidth={2.2} />
            </div>
          </div>
        </div>
      </div>

      {/* Title & Ratings */}
      <div className="detail-meta-header">
        <h1 className="detail-note-title">
          {resource.title || 'Machine Learning Unit 1 Notes'}
        </h1>

        <div className="detail-rating-row">
          <Star size={16} fill="#F59E0B" stroke="#F59E0B" />
          <span className="rating-score">{resource.rating || 4.8}</span>
          <span className="rating-count">({resource.reviewCount || 124} reviews)</span>
        </div>

        {/* Tag Badges Row */}
        <div className="detail-tags-row">
          <span className="detail-badge">{resource.subject || 'CSE'}</span>
          <span className="detail-badge">{resource.unitOrTopic?.slice(0, 8) || 'Unit 1'}</span>
          <span className="detail-badge">{resource.resourceType || 'Lecture Notes'}</span>
        </div>
      </div>

      {/* Tabs: Overview, Preview, Reviews, Related */}
      <div className="detail-tabs-bar">
        {['overview', 'preview', 'reviews', 'related'].map(tab => (
          <button
            key={tab}
            className={`detail-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="detail-overview-content">
          <div className="detail-description-section">
            <h3 className="section-label">Description</h3>
            <p className="description-text">
              {resource.description ||
                'Detailed handwritten notes for Machine Learning Unit 1 covering introduction, types of learning, linear regression and more.'}
            </p>
          </div>

          {/* Uploaded By Section */}
          <div className="uploader-profile-card">
            <div className="uploader-info-left">
              <div className="uploader-avatar-ring">
                <svg viewBox="0 0 40 40" style={{ width: '100%', height: '100%' }}>
                  <circle cx="20" cy="18" r="11" fill="#3B2314" />
                  <circle cx="20" cy="20" r="8" fill="#FCD34D" />
                  <circle cx="17.5" cy="19" r="1" fill="#1E293B" />
                  <circle cx="22.5" cy="19" r="1" fill="#1E293B" />
                  <path d="M 8 38 C 8 31 13 28 20 28 C 27 28 32 31 32 38 Z" fill="#DD88C1" />
                </svg>
              </div>
              <div className="uploader-names">
                <div className="uploader-label">Uploaded by</div>
                <div className="uploader-name">{resource.uploadedBy?.split(' (')[0] || 'Aditi Sharma'}</div>
                <div className="uploader-branch">Final Year CSE</div>
              </div>
            </div>

            <button
              className={`btn-follow-uploader ${isFollowing ? 'following' : ''}`}
              onClick={handleFollowToggle}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Preview */}
      {activeTab === 'preview' && (
        <div className="detail-preview-tab">
          <div className="preview-chalkboard">
            <div className="preview-heading">{resource.svgContent?.diagramTitle || resource.title}</div>
            <div className="preview-sub">{resource.svgContent?.subtitle || 'High-Yield Exam Proof'}</div>
            <pre className="preview-code-box">
              {resource.svgContent?.codeSnippet || 'J(θ) = 1/2m ∑ (h(x) - y)²\nθ := θ - α ∇J(θ)'}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 3: Reviews */}
      {activeTab === 'reviews' && (
        <div className="detail-reviews-tab">
          <div className="review-stat-banner">
            <div className="score-big">{resource.rating}</div>
            <div>
              <div className="stars-row">★★★★★</div>
              <div className="reviews-sub">Verified peer campus reviews</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Related */}
      {activeTab === 'related' && (
        <div className="detail-related-tab">
          <div className="polaroid-grid">
            {resources.slice(1, 3).map(r => (
              <PolaroidCard key={r.id} resource={r} />
            ))}
          </div>
        </div>
      )}

      {/* Bottom Sticky Action Button: Download (Screen 6) */}
      <div className="detail-bottom-sticky-bar">
        <button
          className="btn-download-sticky"
          onClick={() => downloadResource(resource)}
        >
          <Download size={18} strokeWidth={2.5} />
          <span>Download ({resource.pages || '12 pages'}, {resource.fileSize || '2.4 MB'})</span>
        </button>
      </div>
    </div>
  );
};
