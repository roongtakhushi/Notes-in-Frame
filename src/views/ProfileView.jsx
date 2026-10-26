import React, { useState } from 'react';
import {
  Bookmark,
  UploadCloud,
  Settings,
  Zap,
  Award,
  ChevronRight,
  LogOut,
  LogIn,
  Info,
  Flame,
  Star,
  Users,
  Camera,
  Layers,
  Heart,
  FileCheck,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudentAvatar } from '../components/StudentAvatar';

export const ProfileView = () => {
  const {
    bookmarks,
    myUploads,
    navigateTo,
    isLoggedOut,
    logoutUser,
    loginUser,
    studySettings
  } = useApp();

  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  return (
    <div className="profile-view page-enter" style={{ maxWidth: '780px', margin: '0 auto', paddingBottom: '3.5rem' }}>
      {/* Student Badge Card */}
      <div style={{
        background: '#FFFFFF',
        border: '1.5px solid var(--border-light)',
        borderRadius: '20px',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-card)',
        position: 'relative',
        marginBottom: '1.75rem',
        overflow: 'hidden'
      }}>
        {/* Decorative Washi Tape */}
        <div className="washi-tape green" style={{ top: '-11px', left: '36px' }}>
          CAMPUS ID · 2026
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
          {/* Enhanced Student Avatar */}
          <StudentAvatar size={76} showBadge={true} showStatus={true} />

          <div style={{ flex: 1, minWidth: '220px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Khushi Sharma
              </h1>
              <span className="exposure-tag" style={{ background: 'var(--color-pink-light)', color: 'var(--color-pink-dark)', fontWeight: 700 }}>
                Top Contributor ★
              </span>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {studySettings.branch || 'B.Tech CSE'} • {studySettings.semester || 'Final Year'}
            </p>

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
              <span className="exposure-tag">ID: DTU-2026-CS88</span>
              <span className="exposure-tag" style={{ background: 'var(--color-green-light)', color: 'var(--color-green-dark)' }}>
                Online · Active Study
              </span>
            </div>
          </div>

          {/* Quick Sign Out Button */}
          <div>
            <button
              type="button"
              className="btn btn-secondary tactile-btn"
              onClick={logoutUser}
              title="Log out and return to landing page"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8125rem',
                borderColor: '#FCA5A5',
                color: '#DC2626'
              }}
            >
              <LogOut size={14} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Real Campus Notes Hub Impact Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.5rem',
          marginTop: '1.5rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-light)',
          textAlign: 'center'
        }}>
          {/* Stat 1: Peer Downloads */}
          <div style={{ padding: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: 'var(--color-blue)', marginBottom: '2px' }}>
              <Users size={16} />
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>1,280</span>
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Peer Downloads
            </div>
          </div>

          {/* Stat 2: Contributor Rating */}
          <div style={{ padding: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#F59E0B', marginBottom: '2px' }}>
              <Star size={16} fill="#F59E0B" />
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>4.9</span>
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Rating (84 reviews)
            </div>
          </div>

          {/* Stat 3: Study Streak */}
          <div style={{ padding: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#EF4444', marginBottom: '2px' }}>
              <Flame size={16} fill="#EF4444" />
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>12d</span>
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Revision Streak
            </div>
          </div>

          {/* Stat 4: Saved Notes */}
          <div
            onClick={() => navigateTo('bookmarks')}
            style={{ cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', transition: 'background 0.15s' }}
            role="button"
            tabIndex={0}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: 'var(--color-pink-dark)', marginBottom: '2px' }}>
              <Bookmark size={16} fill="var(--color-pink-dark)" />
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>{bookmarks.length}</span>
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Saved Frames
            </div>
          </div>
        </div>
      </div>

      {/* Campus Hub Navigation Links */}
      <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
        Campus Hub Features
      </h2>

      <div style={{
        background: '#FFFFFF',
        border: '1.5px solid var(--border-light)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '1.75rem'
      }}>
        {/* 1. Bookmarks */}
        <div
          onClick={() => navigateTo('bookmarks')}
          className="profile-nav-card-item tactile-btn"
          role="button"
          tabIndex={0}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-pink-light)', color: 'var(--color-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bookmark size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                Bookmarks & Saved Frames
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                {bookmarks.length} study resources pinned for quick recall
              </div>
            </div>
          </div>
          <ChevronRight size={18} color="var(--text-muted)" />
        </div>

        {/* 2. My Uploads */}
        <div
          onClick={() => navigateTo('my-uploads')}
          className="profile-nav-card-item tactile-btn"
          role="button"
          tabIndex={0}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-green-light)', color: 'var(--color-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UploadCloud size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                My Uploads
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                {myUploads.length} community study notes shared by you
              </div>
            </div>
          </div>
          <ChevronRight size={18} color="var(--text-muted)" />
        </div>

        {/* 3. Exam Rescue Revision Planner */}
        <div
          onClick={() => navigateTo('exam-rescue')}
          className="profile-nav-card-item tactile-btn"
          role="button"
          tabIndex={0}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-blue-light)', color: 'var(--color-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                Exam Rescue Revision Planner ⚡
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Generate deterministic 48-hour exam checklists and track completion
              </div>
            </div>
          </div>
          <ChevronRight size={18} color="var(--text-muted)" />
        </div>

        {/* 4. Settings */}
        <div
          onClick={() => navigateTo('settings')}
          className="profile-nav-card-item tactile-btn"
          style={{ borderBottom: 'none' }}
          role="button"
          tabIndex={0}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F3F4F6', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Settings size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                App Settings & Preferences
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Reading contrast, offline storage cache, notifications & university setup
              </div>
            </div>
          </div>
          <ChevronRight size={18} color="var(--text-muted)" />
        </div>
      </div>

      {/* Special Dedicated Project Information Section (Requested by User) */}
      <div style={{
        background: '#FFFFFF',
        border: '1.5px solid var(--border-light)',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden'
      }}>
        <div
          onClick={() => setIsAboutExpanded(!isAboutExpanded)}
          style={{
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            background: isAboutExpanded ? 'var(--color-blue-light)' : '#FFFFFF',
            transition: 'background 0.2s ease'
          }}
          role="button"
          tabIndex={0}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--color-blue)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Info size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                About "Notes in Frame" Campus Project
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Project vision, SASC PixelRush competition architecture & specifications
              </div>
            </div>
          </div>

          <span style={{
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: 'var(--color-blue)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {isAboutExpanded ? 'Collapse' : 'Learn More'}
            <ChevronRight
              size={16}
              style={{
                transform: isAboutExpanded ? 'rotate(90deg)' : 'none',
                transition: 'transform 0.2s ease'
              }}
            />
          </span>
        </div>

        {isAboutExpanded && (
          <div style={{ padding: '1.25rem', borderTop: '1px solid var(--border-light)', background: '#FAFAFA' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                📸 Concept & Visual Metaphor
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                "Notes in Frame" re-imagines campus study notes as photographic Polaroids pinned to a collaborative student darkroom board. Instead of dense, intimidating PDF directories, resources are treated as visually memorable "Frames" with handwritten captions, washi-tape tags, exposure metadata, and peer contributor accolades.
              </p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                🎨 Strict Brand Identity Constraints
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Engineered under strict competition guidelines with a curated 4-color palette: Canvas White (<code>#FFFFFF</code>), Brand Grass Green (<code>#89BC62</code>), Daisy Pink (<code>#DD88C1</code>), and Sky Blue (<code>#407ADD</code>). Absolutely zero botanical or floral slop — authentic photography motifs only (35mm sprocket strips, contact sheet grids, focus reticles, washi tape).
              </p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                ⚡ Production Benchmarks & Technical Architecture
              </div>
              <ul style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6, paddingLeft: '1.25rem' }}>
                <li><strong>Deterministic Exam Rescue:</strong> Turn saved notes into prioritized 48-hour revision schedules with real checkbox state persistence.</li>
                <li><strong>Offline Reliability:</strong> All notes, collections, uploads, and study settings operate flawlessly with zero cloud dependencies or backend outages.</li>
                <li><strong>Emil Kowalski Tactile Feedback:</strong> Native-feeling physical micro-interactions (<code>:active scale(0.96)</code>, gentle spring dampening).</li>
                <li><strong>Dual-Screen Fluidity:</strong> Handcrafted responsive ergonomics for mobile thumb zones and laptop study widescreen monitors.</li>
              </ul>
            </div>

            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-light)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}>
              <span>SASC PixelRush 2026 Submission</span>
              <span style={{ fontWeight: 700, color: 'var(--color-blue)' }}>Version 2.4.0 · Production Ready</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
