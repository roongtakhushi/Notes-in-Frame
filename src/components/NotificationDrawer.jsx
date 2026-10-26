import React from 'react';
import { Bell, X, Bookmark, UploadCloud, Calendar, Award, CheckCheck, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationDrawer = () => {
  const {
    isNotificationOpen,
    setIsNotificationOpen,
    notifications,
    unreadNotificationsCount,
    markAllNotificationsAsRead,
    navigateTo,
    openNoteDetail
  } = useApp();

  if (!isNotificationOpen) return null;

  const handleClose = () => {
    setIsNotificationOpen(false);
  };

  const handleNotificationClick = (notif) => {
    setIsNotificationOpen(false);
    if (notif.targetView === 'detail' && notif.targetId) {
      openNoteDetail(notif.targetId);
    } else if (notif.targetView) {
      navigateTo(notif.targetView);
    }
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case 'bookmark':
        return <Bookmark size={18} color="#DD88C1" fill="#DD88C1" />;
      case 'upload':
        return <UploadCloud size={18} color="#89BC62" />;
      case 'exam':
        return <Calendar size={18} color="#407ADD" />;
      case 'award':
        return <Award size={18} color="#F59E0B" />;
      default:
        return <Bell size={18} color="#407ADD" />;
    }
  };

  return (
    <div className="profile-modal-overlay" onClick={handleClose} role="dialog" aria-modal="true">
      <div
        className="profile-modal-card notification-drawer-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '380px' }}
      >
        {/* Header Row */}
        <div className="notif-drawer-header">
          <div className="notif-header-title-wrap">
            <div className="notif-icon-circle">
              <Bell size={18} color="#407ADD" />
            </div>
            <div>
              <h2 className="notif-drawer-title">Notifications</h2>
              <span className="notif-unread-count">
                {unreadNotificationsCount} unread updates
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {unreadNotificationsCount > 0 && (
              <button
                className="btn-mark-all-read"
                onClick={markAllNotificationsAsRead}
                title="Mark all as read"
              >
                <CheckCheck size={16} />
                <span>Mark read</span>
              </button>
            )}
            <button
              className="btn-close-modal"
              onClick={handleClose}
              aria-label="Close notifications"
            >
              <X size={18} color="#6B7280" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="notif-list-container">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`notif-item-row ${!notif.read ? 'unread' : ''}`}
              onClick={() => handleNotificationClick(notif)}
              role="button"
              tabIndex={0}
            >
              <div className="notif-type-icon-box">
                {getNotifIcon(notif.type)}
              </div>

              <div className="notif-content-area">
                <div className="notif-title-row">
                  <h3 className="notif-item-title">{notif.title}</h3>
                  <span className="notif-time-stamp">{notif.time}</span>
                </div>
                <p className="notif-item-desc">{notif.description}</p>
              </div>

              <ChevronRight size={14} color="#9CA3AF" style={{ flexShrink: 0 }} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="notif-drawer-footer">
          <span className="notif-footer-text">
            ⚡ All campus alerts are synchronized in real-time
          </span>
        </div>
      </div>
    </div>
  );
};
