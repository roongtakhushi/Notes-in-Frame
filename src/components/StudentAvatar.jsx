import React from 'react';

export const StudentAvatar = ({ size = 44, showBadge = true, showStatus = true }) => {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}
    >
      {/* Outer Verified Contributor Ring */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          padding: size > 60 ? '3px' : '2px',
          background: 'linear-gradient(135deg, #DD88C1 0%, #89BC62 50%, #407ADD 100%)',
          boxShadow: size > 60 ? '0 6px 18px rgba(221, 136, 193, 0.35)' : 'none',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundColor: '#FDF2F8',
            position: 'relative'
          }}
        >
          {/* Enhanced Vector Illustration of Khushi with Camera Strap */}
          <svg viewBox="0 0 80 80" width="100%" height="100%" fill="none">
            {/* Background Pastel Canvas */}
            <rect width="80" height="80" fill="#FDF2F8" />

            {/* Dark Curly Hair (Back layer) */}
            <circle cx="40" cy="36" r="23" fill="#2E1B10" />

            {/* Shoulders & College Hoodie */}
            <path d="M 14 78 C 14 62 26 55 40 55 C 54 55 66 62 66 78 Z" fill="#DD88C1" />

            {/* Slanted Camera Strap Slung Across Shoulder */}
            <path
              d="M 18 56 L 62 80"
              stroke="#407ADD"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Camera Strap Woven Pattern */}
            <path
              d="M 22 58 L 58 78"
              stroke="#89BC62"
              strokeWidth="1.5"
              strokeDasharray="2 3"
            />

            {/* Face */}
            <circle cx="40" cy="40" r="16.5" fill="#FCD34D" />

            {/* Hair Front Bangs / Locks */}
            <path d="M 24 32 C 28 22 52 22 56 32 C 50 28 30 28 24 32 Z" fill="#2E1B10" />
            <path d="M 23 34 Q 28 42 27 50 Q 23 42 23 34 Z" fill="#2E1B10" />
            <path d="M 57 34 Q 52 42 53 50 Q 57 42 57 34 Z" fill="#2E1B10" />

            {/* Cheerful Eyes with Reflective Highlights */}
            <circle cx="34.5" cy="38.5" r="2.2" fill="#1E293B" />
            <circle cx="34" cy="37.8" r="0.8" fill="#FFFFFF" />
            <circle cx="45.5" cy="38.5" r="2.2" fill="#1E293B" />
            <circle cx="45" cy="37.8" r="0.8" fill="#FFFFFF" />

            {/* Soft Rosy Cheeks */}
            <circle cx="31" cy="42" r="2.5" fill="#F472B6" opacity="0.6" />
            <circle cx="49" cy="42" r="2.5" fill="#F472B6" opacity="0.6" />

            {/* Happy Smile */}
            <path
              d="M 36.5 44 Q 40 47.5 43.5 44"
              stroke="#B45309"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Online Study Mode Green Indicator Dot */}
      {showStatus && (
        <span
          style={{
            position: 'absolute',
            bottom: size > 60 ? '3px' : '1px',
            right: size > 60 ? '3px' : '1px',
            width: size > 60 ? '14px' : '10px',
            height: size > 60 ? '14px' : '10px',
            borderRadius: '50%',
            backgroundColor: '#89BC62',
            border: '2px solid #FFFFFF',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            zIndex: 2
          }}
          title="Online studying"
          aria-hidden="true"
        />
      )}
    </div>
  );
};
