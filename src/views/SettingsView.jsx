import React from 'react';
import {
  Settings,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Sliders,
  Bell,
  Eye,
  Database,
  DownloadCloud,
  Trash2,
  LogOut,
  GraduationCap,
  Sparkles,
  Wifi,
  Sun,
  Layers,
  BookOpen,
  Code2,
  Mail,
  ExternalLink,
  Copy
} from 'lucide-react';

const GithubIcon = ({ size = 16, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
import { useApp } from '../context/AppContext';

export const SettingsView = () => {
  const {
    navigateBack,
    studySettings,
    updateStudySetting,
    clearCache,
    downloadAllOfflineArchive,
    logoutUser,
    showToast
  } = useApp();

  const handleResetData = () => {
    try {
      localStorage.removeItem('nif_resources');
      localStorage.removeItem('nif_bookmarks');
      localStorage.removeItem('nif_collections');
      localStorage.removeItem('nif_my_uploads');
      localStorage.removeItem('nif_exam_state');
      localStorage.removeItem('nif_study_settings');
      showToast('Prototype data reset to defaults. Reloading...', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 700);
    } catch (e) {
      showToast('Error resetting local data', 'info');
    }
  };

  const cachedSizeMb = (studySettings.cachedBytes / (1024 * 1024)).toFixed(1);

  return (
    <div className="settings-view page-enter" style={{ maxWidth: '780px', margin: '0 auto', paddingBottom: '3rem' }}>
      {/* Header with Back button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <button
          className="btn btn-secondary tactile-btn"
          onClick={navigateBack}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>

      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'var(--color-blue-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-blue)'
          }}>
            <Settings size={22} />
          </div>
          <span>Campus Study Settings</span>
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Configure your academic preferences, reader contrast, alerts, and offline storage.
        </p>
      </div>

      {/* 1. Academic Curriculum & Program Settings */}
      <div className="settings-card" style={{ marginBottom: '1.5rem' }}>
        <div className="settings-card-header">
          <div className="settings-card-icon" style={{ background: 'var(--color-blue-light)', color: 'var(--color-blue)' }}>
            <GraduationCap size={20} />
          </div>
          <div>
            <h2 className="settings-card-title">Academic Profile & University</h2>
            <p className="settings-card-subtitle">Enrolled curriculum determines default notes and exam papers shown</p>
          </div>
        </div>

        <div className="settings-grid-two">
          <div className="settings-input-group">
            <label className="settings-label">University / Institute</label>
            <input
              type="text"
              className="settings-input"
              value={studySettings.university}
              onChange={(e) => updateStudySetting('university', e.target.value)}
              placeholder="e.g. Delhi Technological University"
            />
          </div>

          <div className="settings-input-group">
            <label className="settings-label">Academic Program & Major</label>
            <input
              type="text"
              className="settings-input"
              value={studySettings.branch}
              onChange={(e) => updateStudySetting('branch', e.target.value)}
              placeholder="e.g. Computer Science & Engineering"
            />
          </div>

          <div className="settings-input-group">
            <label className="settings-label">Current Semester</label>
            <select
              className="settings-select"
              value={studySettings.semester}
              onChange={(e) => updateStudySetting('semester', e.target.value)}
            >
              <option value="Semester I">Semester I</option>
              <option value="Semester II">Semester II</option>
              <option value="Semester III">Semester III</option>
              <option value="Semester IV">Semester IV</option>
              <option value="Semester V">Semester V</option>
              <option value="Semester VI">Semester VI</option>
              <option value="Semester VII">Semester VII</option>
              <option value="Semester VIII">Semester VIII</option>
            </select>
          </div>

          <div className="settings-input-group">
            <label className="settings-label">Active Academic Cycle</label>
            <div className="settings-readonly-badge">
              <span>2025–2026 End-Term Evaluation</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Reading & Visual Study Experience */}
      <div className="settings-card" style={{ marginBottom: '1.5rem' }}>
        <div className="settings-card-header">
          <div className="settings-card-icon" style={{ background: 'var(--color-pink-light)', color: 'var(--color-pink)' }}>
            <Eye size={20} />
          </div>
          <div>
            <h2 className="settings-card-title">Reading & Study Display</h2>
            <p className="settings-card-subtitle">Visual ergonomics for long revision and exam sprint sessions</p>
          </div>
        </div>

        <div className="settings-toggle-list">
          {/* Toggle 1: High-Contrast Note Scans */}
          <div className="settings-toggle-row">
            <div className="settings-toggle-info">
              <div className="settings-toggle-name">High-Contrast Note Scans</div>
              <div className="settings-toggle-desc">
                Sharpens pencil, pen, and faded whiteboard lecture diagrams for improved readability.
              </div>
            </div>
            <button
              type="button"
              className={`settings-switch ${studySettings.highContrast ? 'active' : ''}`}
              onClick={() => updateStudySetting('highContrast', !studySettings.highContrast)}
              role="switch"
              aria-checked={studySettings.highContrast}
            >
              <span className="settings-switch-thumb" />
            </button>
          </div>

          {/* Toggle 2: Paper Texture Background */}
          <div className="settings-toggle-row">
            <div className="settings-toggle-info">
              <div className="settings-toggle-name">Notebook Dot Grid Canvas Texture</div>
              <div className="settings-toggle-desc">
                Subtle campus notebook micro-grid backing instead of flat digital stark white.
              </div>
            </div>
            <button
              type="button"
              className={`settings-switch ${studySettings.paperTexture ? 'active' : ''}`}
              onClick={() => updateStudySetting('paperTexture', !studySettings.paperTexture)}
              role="switch"
              aria-checked={studySettings.paperTexture}
            >
              <span className="settings-switch-thumb" />
            </button>
          </div>

          {/* Toggle 3: Auto-Download on Wi-Fi */}
          <div className="settings-toggle-row">
            <div className="settings-toggle-info">
              <div className="settings-toggle-name">Download Notes Over Wi-Fi Only</div>
              <div className="settings-toggle-desc">
                Saves mobile cellular bandwidth when saving high-resolution scanned PDF frames.
              </div>
            </div>
            <button
              type="button"
              className={`settings-switch ${studySettings.autoDownloadOnWifi ? 'active' : ''}`}
              onClick={() => updateStudySetting('autoDownloadOnWifi', !studySettings.autoDownloadOnWifi)}
              role="switch"
              aria-checked={studySettings.autoDownloadOnWifi}
            >
              <span className="settings-switch-thumb" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Notification & Campus Alerts */}
      <div className="settings-card" style={{ marginBottom: '1.5rem' }}>
        <div className="settings-card-header">
          <div className="settings-card-icon" style={{ background: 'var(--color-green-light)', color: 'var(--color-green)' }}>
            <Bell size={20} />
          </div>
          <div>
            <h2 className="settings-card-title">Exam & Campus Notifications</h2>
            <p className="settings-card-subtitle">Stay alerted on syllabus deadlines and peer contributions</p>
          </div>
        </div>

        <div className="settings-toggle-list">
          {/* Toggle 4: Exam Rescue Countdown Reminders */}
          <div className="settings-toggle-row">
            <div className="settings-toggle-info">
              <div className="settings-toggle-name">Exam Rescue Countdown Reminders</div>
              <div className="settings-toggle-desc">
                Push alerts 48h and 24h prior to major university exam papers with unchecked checklist tasks.
              </div>
            </div>
            <button
              type="button"
              className={`settings-switch ${studySettings.examAlerts ? 'active' : ''}`}
              onClick={() => updateStudySetting('examAlerts', !studySettings.examAlerts)}
              role="switch"
              aria-checked={studySettings.examAlerts}
            >
              <span className="settings-switch-thumb" />
            </button>
          </div>

          {/* Toggle 5: Peer Activity & New Notes */}
          <div className="settings-toggle-row">
            <div className="settings-toggle-info">
              <div className="settings-toggle-name">Peer Saves & Subject Upload Alerts</div>
              <div className="settings-toggle-desc">
                Notifies when classmates bookmark your notes or when new PYQs are uploaded in your semester.
              </div>
            </div>
            <button
              type="button"
              className={`settings-switch ${studySettings.peerActivityAlerts ? 'active' : ''}`}
              onClick={() => updateStudySetting('peerActivityAlerts', !studySettings.peerActivityAlerts)}
              role="switch"
              aria-checked={studySettings.peerActivityAlerts}
            >
              <span className="settings-switch-thumb" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Offline Storage & Bandwidth Management */}
      <div className="settings-card" style={{ marginBottom: '1.5rem' }}>
        <div className="settings-card-header">
          <div className="settings-card-icon" style={{ background: '#F3F4F6', color: 'var(--text-primary)' }}>
            <Database size={20} />
          </div>
          <div>
            <h2 className="settings-card-title">Offline Cache & Storage</h2>
            <p className="settings-card-subtitle">Zero-latency study session access when campus library Wi-Fi drops</p>
          </div>
        </div>

        <div style={{ marginTop: '0.5rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Cached Study Notes Storage Quota
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--color-blue)' }}>
              {cachedSizeMb} MB / 500 MB
            </span>
          </div>

          {/* Storage Progress Bar */}
          <div style={{
            width: '100%',
            height: '10px',
            borderRadius: '999px',
            background: '#F1F5F9',
            overflow: 'hidden',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{
              width: `${Math.min(100, Math.max(4, (studySettings.cachedBytes / (500 * 1024 * 1024)) * 100 * 8))}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--color-green) 0%, var(--color-blue) 100%)',
              borderRadius: '999px',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button
            type="button"
            className="btn btn-secondary tactile-btn"
            onClick={downloadAllOfflineArchive}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <DownloadCloud size={16} color="var(--color-blue)" />
            <span>Export Offline Notes Bundle</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary tactile-btn"
            onClick={clearCache}
            disabled={studySettings.cachedBytes === 0}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderColor: studySettings.cachedBytes === 0 ? 'var(--border-light)' : '#FCA5A5',
              color: studySettings.cachedBytes === 0 ? 'var(--text-muted)' : '#DC2626'
            }}
          >
            <Trash2 size={16} />
            <span>Clear Offline Cache</span>
          </button>
        </div>
      </div>

      {/* 5. Developer & Maintainer Information (Evaluator Showcase) */}
      <div className="settings-card settings-dev-card" style={{ marginBottom: '1.5rem' }}>
        {/* Top Photographic Washi Tape Accent */}
        <span className="dev-card-washi-tape" aria-hidden="true" />

        <div className="settings-card-header">
          <div className="settings-card-icon" style={{ background: '#EFF6FF', color: '#2563EB' }}>
            <Code2 size={20} strokeWidth={2.4} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h2 className="settings-card-title">Developer & Maintainer</h2>
              <span className="dev-role-badge">Lead Engineer</span>
            </div>
            <p className="settings-card-subtitle">
              Designed & engineered by Khushi Roongta for the SASC PixelRush Challenge
            </p>
          </div>
        </div>

        {/* Developer Profile Bio & Contacts */}
        <div className="dev-profile-container">
          <div className="dev-avatar-box">
            <span className="dev-avatar-emoji" role="img" aria-label="developer">👩‍💻</span>
            <div className="dev-online-dot" title="Active Contributor" />
          </div>

          <div className="dev-details-col">
            <div className="dev-name-row">
              <h3 className="dev-author-name">Khushi Roongta</h3>
              <span className="dev-campus-tag">NIT Raipur • Full-Stack Engineer</span>
            </div>
            <p className="dev-bio-text">
              Passionate about high-craft user interfaces, Neobrutalist design systems, and zero-latency web engineering. Built <em>notes in frame.</em> from scratch with a bespoke photographic darkroom theme.
            </p>
          </div>
        </div>

        {/* Contact Links & Repository Actions */}
        <div className="dev-actions-grid">
          {/* Email button with mailto */}
          <a
            href="mailto:khushiroongta0801@gmail.com"
            className="dev-action-btn btn-email tactile-btn"
            title="Send Email to Khushi Roongta"
          >
            <Mail size={16} />
            <span>khushiroongta0801@gmail.com</span>
          </a>

          {/* Copy Email quick button */}
          <button
            type="button"
            className="dev-action-btn btn-copy tactile-btn"
            onClick={() => {
              navigator.clipboard?.writeText?.('khushiroongta0801@gmail.com');
              showToast({
                title: 'Email Copied 📋',
                description: 'khushiroongta0801@gmail.com copied to your clipboard.',
                type: 'success'
              });
            }}
            title="Copy email to clipboard"
          >
            <Copy size={15} />
            <span>Copy</span>
          </button>

          {/* GitHub Profile */}
          <a
            href="https://github.com/roongtakhushi"
            target="_blank"
            rel="noopener noreferrer"
            className="dev-action-btn btn-github tactile-btn"
            title="Open Khushi Roongta's GitHub Profile"
          >
            <GithubIcon size={16} />
            <span>@roongtakhushi</span>
            <ExternalLink size={13} style={{ opacity: 0.7 }} />
          </a>

          {/* Repository Link */}
          <a
            href="https://github.com/roongtakhushi/Notes-in-Frame"
            target="_blank"
            rel="noopener noreferrer"
            className="dev-action-btn btn-repo tactile-btn"
            title="View Source Code Repository"
          >
            <Sparkles size={15} color="#89BC62" />
            <span>Notes-in-Frame Repo</span>
            <ExternalLink size={13} style={{ opacity: 0.7 }} />
          </a>
        </div>

        {/* Tech Stack & Design Badges */}
        <div className="dev-tags-row">
          <span className="dev-tech-pill">React 18</span>
          <span className="dev-tech-pill">Vite 6</span>
          <span className="dev-tech-pill">Neobrutalist UI</span>
          <span className="dev-tech-pill">Darkroom Theme</span>
          <span className="dev-tech-pill">Zero CLS</span>
          <span className="dev-tech-pill">SASC PixelRush 2026</span>
        </div>
      </div>

      {/* 6. Account & Session Management */}
      <div className="settings-card" style={{ marginBottom: '1.5rem', borderColor: '#FEE2E2' }}>
        <div className="settings-card-header">
          <div className="settings-card-icon" style={{ background: '#FEF2F2', color: '#DC2626' }}>
            <LogOut size={20} />
          </div>
          <div>
            <h2 className="settings-card-title" style={{ color: '#991B1B' }}>Session & Prototype Controls</h2>
            <p className="settings-card-subtitle">Manage your local sign-in state or restore clean demonstration data</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', marginTop: '0.5rem' }}>
          <button
            type="button"
            className="btn btn-secondary tactile-btn"
            onClick={logoutUser}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderColor: '#FCA5A5',
              color: '#DC2626'
            }}
          >
            <LogOut size={16} />
            <span>Log Out of Student Session</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary tactile-btn"
            onClick={handleResetData}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <RotateCcw size={16} color="#6B7280" />
            <span>Reset Demo Data to Factory Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
};
