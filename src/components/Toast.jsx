import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Info,
  Bookmark,
  Zap,
  UploadCloud,
  DownloadCloud,
  AlertTriangle,
  Sparkles,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const ToastItem = ({ toast, onDismiss }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isExiting, setIsExiting] = useState(false);

  const duration = toast.duration || (toast.action ? 3500 : 2400);

  const handleDismiss = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 160);
  };

  useEffect(() => {
    if (isPaused || isExiting) return;

    const interval = 30;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - step));
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, isExiting, duration]);

  useEffect(() => {
    if (progress <= 0 && !isExiting) {
      handleDismiss();
    }
  }, [progress, isExiting]);

  const getIconAndStyle = () => {
    switch (toast.type) {
      case 'success':
        return {
          icon: <CheckCircle2 size={18} strokeWidth={2.4} color="#89BC62" />,
          bgColor: '#EEF6E8',
          borderColor: '#89BC62',
          progressColor: 'var(--color-green)'
        };
      case 'pink':
      case 'bookmark':
        return {
          icon: <Bookmark size={18} strokeWidth={2.4} color="#DD88C1" fill="#DD88C1" />,
          bgColor: '#FBEFF7',
          borderColor: '#DD88C1',
          progressColor: 'var(--color-pink)'
        };
      case 'exam':
        return {
          icon: <Zap size={18} strokeWidth={2.4} color="#407ADD" fill="#407ADD" />,
          bgColor: '#EBF2FC',
          borderColor: '#407ADD',
          progressColor: 'var(--color-blue)'
        };
      case 'upload':
        return {
          icon: <UploadCloud size={18} strokeWidth={2.4} color="#89BC62" />,
          bgColor: '#EEF6E8',
          borderColor: '#89BC62',
          progressColor: 'var(--color-green)'
        };
      case 'download':
        return {
          icon: <DownloadCloud size={18} strokeWidth={2.4} color="#407ADD" />,
          bgColor: '#EBF2FC',
          borderColor: '#407ADD',
          progressColor: 'var(--color-blue)'
        };
      case 'warning':
        return {
          icon: <AlertTriangle size={18} strokeWidth={2.4} color="#F59E0B" />,
          bgColor: '#FEF3C7',
          borderColor: '#F59E0B',
          progressColor: '#F59E0B'
        };
      default:
        return {
          icon: <Info size={18} strokeWidth={2.4} color="#407ADD" />,
          bgColor: '#EBF2FC',
          borderColor: '#407ADD',
          progressColor: 'var(--color-blue)'
        };
    }
  };

  const { icon, bgColor, borderColor, progressColor } = getIconAndStyle();

  return (
    <div
      className={`production-toast ${toast.type || 'info'} ${isExiting ? 'toast-exiting' : ''}`}
      onClick={handleDismiss}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="alert"
      title="Click to dismiss"
    >
      <div className="toast-body-row">
        {/* Leading Icon Badge */}
        <div
          className="toast-icon-badge"
          style={{ background: bgColor, borderColor: `${borderColor}33` }}
        >
          {icon}
        </div>

        {/* Content Typography Hierarchy */}
        <div className="toast-text-wrap">
          <div className="toast-title">{toast.title}</div>
          {toast.description && (
            <div className="toast-description">{toast.description}</div>
          )}

          {/* Action Button (e.g. Undo / View / Open) */}
          {toast.action && (
            <button
              type="button"
              className="toast-action-btn tactile-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (toast.action.onClick) toast.action.onClick();
                handleDismiss();
              }}
            >
              <span>{toast.action.label}</span>
            </button>
          )}
        </div>

        {/* Manual Dismiss Button */}
        <button
          type="button"
          className="toast-dismiss-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          aria-label="Dismiss toast"
        >
          <X size={15} strokeWidth={2.2} />
        </button>
      </div>

      {/* Modern Countdown Progress Bar */}
      <div className="toast-timer-track">
        <div
          className="toast-timer-bar"
          style={{
            width: `${progress}%`,
            background: progressColor
          }}
        />
      </div>
    </div>
  );
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={removeToast}
        />
      ))}
    </div>
  );
};
