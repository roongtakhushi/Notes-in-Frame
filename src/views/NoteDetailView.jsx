import React, { useState } from 'react';
import { ArrowLeft, Camera, Bell, Share2, Star, Heart, Download, FileText, CheckCircle2, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
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
  const [currentPage, setCurrentPage] = useState(1);

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
          className="btn-back-round tactile-btn"
          onClick={navigateBack}
          aria-label="Back"
          title="Return to previous screen"
        >
          <ArrowLeft size={20} strokeWidth={2.4} />
        </button>

        <div className="detail-top-actions">
          <button className="detail-icon-btn tactile-btn" aria-label="Camera snapshots" title="Snapshot view">
            <Camera size={19} color="#407ADD" />
          </button>
          <button className="detail-icon-btn tactile-btn" aria-label="Notifications" title="Alerts for this note">
            <Bell size={19} color="#407ADD" />
          </button>
          <button className="detail-icon-btn tactile-btn" onClick={handleShare} aria-label="Share note" title="Share frame link">
            <Share2 size={19} color="#1E293B" />
          </button>
        </div>
      </div>

      {/* Dual Column Workspace for Desktop (Left = Canvas & Tabs, Right = Sticky Action Panel) */}
      <div className="detail-desktop-split-layout">
        {/* Left Column: Interactive Study Notebook Canvas */}
        <div className="detail-main-canvas-col">
          {/* Main Hero Polaroid Card with Stickers & Film Accent */}
          <div className="detail-polaroid-stage">
            {/* Film Negative Strip Peeking on Top Right */}
            <div className="detail-film-strip-peeking" aria-hidden="true">
              <FilmStripDecoration vertical style={{ height: '140px', width: '24px' }} />
            </div>

            <div className="detail-hero-polaroid">
              {/* Pink Washi Tape at Top Center */}
              <div className="detail-washi-tape-pink" aria-hidden="true" />

              {/* Note Photo Preview Box */}
              <div className="detail-photo-frame">
                <HandwrittenNotesPreview
                  title={resource.title}
                  accentColor="#DD88C1"
                />

                {/* Pink Angled Tag: "Unit 1" */}
                <div className="sticker-unit-tag" aria-hidden="true">
                  {resource.unitOrTopic?.slice(0, 8) || 'Unit 1'}
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

          {/* Interactive Document Page Navigation Bar (Desktop Studio feature) */}
          <div className="detail-page-nav-bar">
            <button
              className="page-nav-arrow tactile-btn"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              title="Previous page"
            >
              <ChevronLeft size={16} />
              <span>Prev</span>
            </button>
            <span className="page-counter-label">
              Page <strong>{currentPage}</strong> of <strong>{resource.pages?.replace(/\D/g, '') || 42}</strong>
            </span>
            <button
              className="page-nav-arrow tactile-btn"
              disabled={currentPage >= 42}
              onClick={() => setCurrentPage(p => p + 1)}
              title="Next page"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Title & Metadata (Mobile & Desktop Unified) */}
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
              <span className="detail-badge badge-blue">{resource.subject || 'CSE'}</span>
              <span className="detail-badge badge-pink">{resource.unitOrTopic?.slice(0, 8) || 'Unit 1'}</span>
              <span className="detail-badge badge-green">{resource.resourceType || 'Lecture Notes'}</span>
              <span className="detail-badge">{resource.academicYear || '2024'}</span>
            </div>
          </div>

          {/* Tabs: Overview, Preview, Reviews, Related */}
          <div className="detail-tabs-bar">
            {['overview', 'preview', 'reviews', 'related'].map(tab => (
              <button
                key={tab}
                className={`detail-tab-btn tactile-btn ${activeTab === tab ? 'active' : ''}`}
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
                <h3 className="section-label">Description & Syllabus Coverage</h3>
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
                    <div className="uploader-branch">Final Year CSE • Top 1% Contributor</div>
                  </div>
                </div>

                <button
                  className={`btn-follow-uploader tactile-btn ${isFollowing ? 'following' : ''}`}
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
                  <div className="reviews-sub">Verified peer campus reviews from CSE & ECE batches</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Related */}
          {activeTab === 'related' && (
            <div className="detail-related-tab">
              <div className="polaroid-explore-grid">
                {resources.slice(1, 4).map(r => (
                  <PolaroidCard key={r.id} resource={r} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Desktop Sticky Action & Metadata Dock */}
        <aside className="detail-desktop-action-sidebar" aria-label="Study Actions & Downloads">
          <div className="detail-action-card">
            <div className="action-card-header">
              <span className="action-doc-badge">
                <FileText size={15} color="#407ADD" />
                <span>Verified Handwritten Scan</span>
              </span>
              <span className="action-rating-badge">★ {resource.rating || 4.8}</span>
            </div>

            <div className="action-card-meta-list">
              <div className="action-meta-item">
                <span className="meta-k">Format</span>
                <span className="meta-v">PDF (High-Resolution)</span>
              </div>
              <div className="action-meta-item">
                <span className="meta-k">Total Pages</span>
                <span className="meta-v">{resource.pages || '42 pages'}</span>
              </div>
              <div className="action-meta-item">
                <span className="meta-k">File Size</span>
                <span className="meta-v">{resource.fileSize || '4.8 MB'}</span>
              </div>
              <div className="action-meta-item">
                <span className="meta-k">License</span>
                <span className="meta-v">Campus Open Study CC</span>
              </div>
            </div>

            {/* Desktop Primary Download CTA */}
            <button
              className="btn-download-desktop-action tactile-btn"
              onClick={() => downloadResource(resource)}
            >
              <Download size={19} strokeWidth={2.4} />
              <span>Download PDF ({resource.fileSize || '4.8 MB'})</span>
            </button>

            <button
              className="btn-share-desktop-action tactile-btn"
              onClick={handleShare}
            >
              <Share2 size={16} strokeWidth={2.2} />
              <span>Share Frame Link</span>
            </button>

            <div className="action-security-note">
              <CheckCircle2 size={15} color="#89BC62" />
              <span>Cleaned and verified for Semester 4 examinations</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Sticky Download Bar (Hidden on Desktop >= 1024px) */}
      <div className="detail-bottom-sticky-bar mobile-only-sticky-bar">
        <button
          className="btn-download-sticky tactile-btn"
          onClick={() => downloadResource(resource)}
        >
          <Download size={18} strokeWidth={2.5} />
          <span>Download ({resource.pages || '12 pages'}, {resource.fileSize || '2.4 MB'})</span>
        </button>
      </div>
    </div>
  );
};
