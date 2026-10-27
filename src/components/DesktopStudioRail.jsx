import React, { useState } from 'react';
import {
  Flame,
  Calendar,
  ArrowRight,
  Bookmark,
  Sparkles,
  TrendingUp,
  Award,
  ExternalLink,
  ChevronRight,
  Clock,
  PlusCircle,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudentAvatar } from './StudentAvatar';

export const DesktopStudioRail = () => {
  const { currentUser, navigateTo, bookmarks, resources, openNoteDetail, setIsProfileDrawerOpen, showToast } = useApp();

  // Weekly study hours goal state
  const [studyHours, setStudyHours] = useState(() => {
    try {
      const saved = localStorage.getItem('nif_study_hours');
      return saved ? parseInt(saved, 10) : 14;
    } catch (e) {
      return 14;
    }
  });

  const TARGET_HOURS = 20;
  const progressPercent = Math.min(100, Math.round((studyHours / TARGET_HOURS) * 100));

  const handleLogHour = () => {
    const nextHours = studyHours + 1;
    setStudyHours(nextHours);
    try {
      localStorage.setItem('nif_study_hours', String(nextHours));
    } catch (e) {}

    showToast({
      title: 'Study Session Logged! ⏱️',
      description: `+1 Hour recorded. You've completed ${nextHours} of ${TARGET_HOURS} hours this week.`,
      type: 'success'
    });
  };

  // Bookmarked resource items for quick access
  const bookmarkedItems = resources.filter(r => bookmarks.includes(r.id)).slice(0, 3);

  return (
    <aside className="desktop-studio-rail" aria-label="Student Studio Sidebar">
      {/* 1. Student Identity & Streak Card */}
      <div className="studio-card studio-profile-card">
        <div className="studio-profile-header">
          <StudentAvatar size={50} showStatus={true} />
          <div className="studio-profile-info">
            <div className="studio-profile-name-row">
              <h3 className="studio-student-name">{currentUser?.name || 'Khushi Roongta'}</h3>
              <span className="studio-badge-tier">{currentUser?.tier || 'Lead Contributor'}</span>
            </div>
            <p className="studio-student-sub">IT Engineering • 3rd Year • MIT Alandi</p>
          </div>
        </div>

        {/* Tactile Streak & Download Metrics */}
        <div className="studio-metrics-row">
          <div className="studio-metric-pill streak-pill" title="12 consecutive days of campus study activity">
            <Flame size={18} className="flame-icon-pulse" />
            <div className="metric-text-wrap">
              <span className="metric-val">12 Days</span>
              <span className="metric-lbl">Active Streak</span>
            </div>
          </div>

          <div className="studio-metric-pill stats-pill" title="Community downloads of your shared notes">
            <TrendingUp size={17} color="#407ADD" />
            <div className="metric-text-wrap">
              <span className="metric-val">1,280</span>
              <span className="metric-lbl">Downloads</span>
            </div>
          </div>
        </div>

        <button
          className="studio-btn-view-profile tactile-btn"
          onClick={() => setIsProfileDrawerOpen(true)}
          title="Open full student profile & settings"
        >
          <span>View Student Profile & Settings</span>
          <ArrowRight size={15} strokeWidth={2.4} />
        </button>
      </div>

      {/* 2. Active Exam Rescue Countdown Widget */}
      <div className="studio-card studio-exam-widget">
        <div className="studio-card-top-tape tape-blue" />
        <div className="studio-widget-title-row">
          <div className="widget-icon-box blue-box">
            <Calendar size={18} color="#407ADD" />
          </div>
          <div>
            <h4 className="studio-widget-title">Exam Rescue Mode</h4>
            <span className="studio-widget-sub">Mid-Semester Sprint</span>
          </div>
          <span className="exam-countdown-chip">20d left</span>
        </div>

        <div className="exam-widget-content">
          <div className="exam-subject-meta">
            <span className="exam-subject-name">Machine Learning (CS401)</span>
            <span className="exam-progress-pct">40% Prepared</span>
          </div>
          
          <div className="exam-mini-progress-bar">
            <div className="progress-fill" style={{ width: '40%' }} />
          </div>

          <div className="exam-next-task">
            <span className="task-bullet">✓</span>
            <span className="task-desc">Next: Practise PYQs (2021–2024)</span>
          </div>
        </div>

        <button
          className="studio-btn-action-blue tactile-btn"
          onClick={() => navigateTo('exam-rescue')}
        >
          <span>Resume Revision Plan</span>
          <ArrowRight size={15} strokeWidth={2.4} />
        </button>
      </div>

      {/* 3. Weekly Study Goal Progress Widget */}
      <div className="studio-card studio-goal-card">
        <div className="studio-card-top-tape tape-green" />
        <div className="studio-widget-title-row">
          <div className="widget-icon-box green-box">
            <Clock size={17} color="#89BC62" />
          </div>
          <div>
            <h4 className="studio-widget-title">Weekly Study Goal</h4>
            <span className="studio-widget-sub">Semester 4 Target</span>
          </div>
          <span className="goal-pct-chip">{progressPercent}%</span>
        </div>

        <div className="goal-progress-wrap">
          <div className="goal-stats-row">
            <span className="goal-hours-bold">{studyHours} hrs</span>
            <span className="goal-target-sub">of {TARGET_HOURS} hrs target</span>
          </div>

          <div className="goal-progress-bar">
            <div
              className="goal-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <button
          className="btn-log-session tactile-btn"
          onClick={handleLogHour}
          title="Log 1 hour of study time"
        >
          <PlusCircle size={15} />
          <span>Log 1h Study Session</span>
        </button>
      </div>

      {/* 4. Quick-Access Pinned Bookmarks Dock */}
      <div className="studio-card studio-bookmarks-widget">
        <div className="studio-card-top-tape tape-pink" />
        <div className="studio-widget-title-row">
          <div className="widget-icon-box pink-box">
            <Bookmark size={17} color="#DD88C1" />
          </div>
          <div>
            <h4 className="studio-widget-title">Quick Bookmarks</h4>
            <span className="studio-widget-sub">{bookmarks.length} saved resources</span>
          </div>
          <button
            className="btn-text-link tactile-btn"
            onClick={() => navigateTo('collections')}
          >
            All
          </button>
        </div>

        <div className="studio-bookmarks-list">
          {bookmarkedItems.length > 0 ? (
            bookmarkedItems.map((note) => (
              <div
                key={note.id}
                className="studio-bookmark-item tactile-btn"
                onClick={() => openNoteDetail(note.id)}
                role="button"
                tabIndex={0}
              >
                <div className="bookmark-item-left">
                  <span className="bookmark-item-type">{note.resourceType}</span>
                  <h5 className="bookmark-item-title">{note.title}</h5>
                </div>
                <ChevronRight size={16} className="bookmark-arrow" />
              </div>
            ))
          ) : (
            <p className="studio-empty-hint">No bookmarks yet. Save notes with the ribbon icon!</p>
          )}
        </div>
      </div>

      {/* 5. Live Campus Community Pulse */}
      <div className="studio-card studio-pulse-card">
        <div className="studio-widget-title-row">
          <div className="widget-icon-box green-box">
            <Sparkles size={16} color="#89BC62" />
          </div>
          <div>
            <h4 className="studio-widget-title">Campus Pulse</h4>
            <span className="studio-widget-sub">Live Peer Activity</span>
          </div>
        </div>

        <ul className="studio-pulse-list">
          <li className="pulse-item">
            <span className="pulse-dot green" />
            <span className="pulse-text"><strong>Aarav Mehta</strong> saved your DBMS PYQs to Semester 4 deck</span>
          </li>
          <li className="pulse-item">
            <span className="pulse-dot blue" />
            <span className="pulse-text"><strong>42 students</strong> revising Operating Systems right now</span>
          </li>
          <li className="pulse-item">
            <span className="pulse-dot pink" />
            <span className="pulse-text"><strong>Unit 1 ML Notes</strong> trending #1 across CSE Department</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};