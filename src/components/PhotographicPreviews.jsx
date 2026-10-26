import React from 'react';

// Photographic previews that look like real physical study notes & campus photos
// Complies with strict rules: Photography motifs only, ZERO botanical elements.

export const HandwrittenNotesPreview = ({ title = 'Campus Study Notes', type = 'notes', accentColor = '#407ADD' }) => {
  const safeTitle = (title || 'Campus Study Notes').slice(0, 22);
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#FAF8F5',
      backgroundImage: `
        repeating-linear-gradient(transparent, transparent 17px, #E5E7EB 18px)
      `,
      position: 'relative',
      overflow: 'hidden',
      padding: '8px 10px',
      fontFamily: "'Caveat', cursive",
      color: '#1E293B',
      userSelect: 'none',
      boxSizing: 'border-box'
    }}>
      {/* Red vertical margin line on notebook paper */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '18px',
        width: '1px',
        backgroundColor: '#FCA5A5',
        opacity: 0.7
      }} />

      {/* Note Heading */}
      <div style={{
        marginLeft: '14px',
        fontSize: '0.875rem',
        fontWeight: 700,
        color: '#1E3A8A',
        lineHeight: '17px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {safeTitle}
      </div>

      {/* Handwritten Equations & Text lines */}
      <div style={{
        marginLeft: '14px',
        fontSize: '0.78rem',
        lineHeight: '17px',
        color: '#1F2937',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', whiteSpace: 'nowrap', overflow: 'hidden' }}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>1. Core Axioms</span>
          <span style={{ fontSize: '0.7rem', color: '#6B7280' }}>p.04</span>
        </div>
        <div style={{ color: '#2563EB', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          f(x) = ∑ w_i x_i + b
        </div>
        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          • Gradient: ∇J(θ)
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
          <span style={{ border: '1px solid #93C5FD', background: 'rgba(219, 234, 254, 0.4)', padding: '0 3px', borderRadius: '2px', fontSize: '0.68rem' }}>
            O(log N)
          </span>
          <span style={{ color: '#059669', fontSize: '0.7rem' }}>✓ Exam '24</span>
        </div>
      </div>

      {/* Small Hand-drawn sketch in corner */}
      <svg
        style={{
          position: 'absolute',
          right: '4px',
          bottom: '4px',
          width: '36px',
          height: '26px',
          opacity: 0.75
        }}
        viewBox="0 0 64 46"
        fill="none"
        stroke="#1E3A8A"
        strokeWidth="1.5"
      >
        <rect x="4" y="6" width="22" height="18" rx="2" strokeDasharray="2 2" stroke="#2563EB" />
        <line x1="26" y1="15" x2="38" y2="15" />
        <circle cx="48" cy="15" r="9" stroke="#DC2626" />
      </svg>
    </div>
  );
};

export const CampusBuildingPreview = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(180deg, #60A5FA 0%, #BAE6FD 45%, #FDE047 85%, #D97706 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center'
    }}>
      {/* Sun glow */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '24px',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: '#FEF08A',
        boxShadow: '0 0 16px #FDE047'
      }} />

      {/* University Heritage Building Illustration */}
      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '80%' }} fill="none">
        {/* Triangular Pediment */}
        <polygon points="100,10 40,40 160,40" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
        <circle cx="100" cy="28" r="6" fill="#F59E0B" />
        {/* Entablature */}
        <rect x="36" y="40" width="128" height="8" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.5" />
        {/* Classical Columns */}
        <rect x="46" y="48" width="8" height="52" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
        <rect x="66" y="48" width="8" height="52" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
        <rect x="86" y="48" width="8" height="52" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
        <rect x="106" y="48" width="8" height="52" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
        <rect x="126" y="48" width="8" height="52" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
        <rect x="146" y="48" width="8" height="52" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
        {/* Main Base & Steps */}
        <rect x="28" y="100" width="144" height="6" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" />
        <rect x="20" y="106" width="160" height="6" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
        <rect x="12" y="112" width="176" height="8" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
        {/* Archway Entrance */}
        <path d="M 90 100 L 90 75 A 10 10 0 0 1 110 75 L 110 100 Z" fill="#334155" />
      </svg>
    </div>
  );
};

export const FilmStripDecoration = ({ vertical = false, style = {} }) => {
  return (
    <div
      style={{
        background: '#1E293B',
        borderRadius: '3px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: vertical ? '6px 2px' : '2px 6px',
        flexDirection: vertical ? 'column' : 'row',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        pointerEvents: 'none',
        ...style
      }}
      aria-hidden="true"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: '6px',
            height: '6px',
            backgroundColor: '#FFFFFF',
            borderRadius: '1px',
            opacity: 0.9,
            margin: vertical ? '4px 0' : '0 4px'
          }}
        />
      ))}
    </div>
  );
};
