import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  GraduationCap,
  Hash,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  Check,
  Building2,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StudentAuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser, showToast } = useApp();

  const [authTab, setAuthTab] = useState('signin'); // 'signin' | 'register'

  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRollNo, setRegRollNo] = useState('');
  const [regDept, setRegDept] = useState('Computer Science & Engineering');
  const [regYear, setRegYear] = useState('Final Year (Senior)');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Departments and Academic Years
  const DEPARTMENTS = [
    'Computer Science & Engineering',
    'Electronics & Communication (ECE)',
    'Mechanical Engineering',
    'Civil Engineering',
    'Information Technology (IT)'
  ];

  const ACADEMIC_YEARS = [
    '1st Year (Freshman)',
    '2nd Year (Sophomore)',
    '3rd Year (Junior)',
    'Final Year (Senior)'
  ];

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        setIsAuthModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, setIsAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  // 1-Click Quick Demo Prefill for Evaluators & Judges
  const handleQuickDemoPrefill = () => {
    if (authTab === 'signin') {
      setSignInEmail('khushiroongta0801@gmail.com');
      setSignInPassword('CampusPass2026!');
      showToast({
        title: 'Demo Credentials Loaded! ⚡',
        description: 'Khushi Roongta (Roll: 23IT042 • IT 3rd Year • MIT Alandi) prefilled.',
        type: 'success'
      });
    } else {
      setRegName('Khushi Roongta');
      setRegEmail('khushiroongta0801@gmail.com');
      setRegRollNo('23IT042');
      setRegDept('Information Technology');
      setRegYear('3rd Year (Junior)');
      setRegPassword('CampusPass2026!');
      showToast({
        title: 'Demo Registration Filled! ⚡',
        description: 'Verified student details ready for 1-click submission.',
        type: 'success'
      });
    }
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (!signInEmail.trim() || !signInPassword.trim()) {
      showToast({
        title: 'Incomplete Credentials',
        description: 'Please provide both your Student Email / Roll No and Password.',
        type: 'error'
      });
      return;
    }

    loginUser({
      name: signInEmail.toLowerCase().includes('khushi') ? 'Khushi Roongta' : 'Student Scholar',
      email: signInEmail.trim(),
      rollNo: '23IT042',
      department: 'Information Technology',
      college: 'MIT Academy of Engineering, Alandi, Pune',
      year: '3rd Year',
      tier: 'Lead Contributor',
      streakDays: 12,
      downloads: 1280
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regRollNo.trim() || !regPassword.trim()) {
      showToast({
        title: 'Missing Fields',
        description: 'Please complete all required student registration fields.',
        type: 'error'
      });
      return;
    }

    loginUser({
      name: regName.trim(),
      email: regEmail.trim(),
      rollNo: regRollNo.trim(),
      department: regDept,
      year: regYear,
      tier: 'Verified Student',
      streakDays: 1,
      downloads: 0
    });
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div
        className="modal-container student-auth-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="auth-modal-title"
      >
        {/* Top Photographic Pink Washi Tape Accent */}
        <div className="auth-card-washi-tape" aria-hidden="true" />

        {/* Modal Header */}
        <div className="auth-modal-header">
          <div className="auth-brand-badge">
            <span className="auth-brand-mascot" role="img" aria-label="camera">📸</span>
            <div className="auth-brand-text">
              <h2 id="auth-modal-title" className="auth-title">
                notes in <span className="highlight-frame">frame.</span>
              </h2>
              <span className="auth-subtitle">SASC Campus Student Gateway</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-icon auth-close-btn tactile-btn"
            onClick={() => setIsAuthModalOpen(false)}
            aria-label="Close authentication modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* 1-Click Quick Demo Prefill Banner */}
        <div className="auth-quick-demo-banner">
          <div className="demo-banner-left">
            <Zap size={16} className="zap-pulse-icon" />
            <div className="demo-banner-text">
              <span className="demo-banner-heading">Quick Evaluator Demo</span>
              <span className="demo-banner-sub">Prefill verified credentials with 1 click</span>
            </div>
          </div>
          <button
            type="button"
            className="btn-quick-prefill tactile-btn"
            onClick={handleQuickDemoPrefill}
            title="Auto-fill with Khushi Roongta (3rd Year IT • MIT Alandi)"
          >
            <Sparkles size={14} />
            <span>1-Click Prefill</span>
          </button>
        </div>

        {/* Tab Segmented Switcher (Sign In vs Register) */}
        <div className="auth-tab-segment" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={authTab === 'signin'}
            className={`auth-tab-btn ${authTab === 'signin' ? 'active' : ''}`}
            onClick={() => setAuthTab('signin')}
          >
            <span>Sign In</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={authTab === 'register'}
            className={`auth-tab-btn ${authTab === 'register' ? 'active' : ''}`}
            onClick={() => setAuthTab('register')}
          >
            <span>Register Student</span>
          </button>
        </div>

        {/* Sign In Form */}
        {authTab === 'signin' ? (
          <form onSubmit={handleSignInSubmit} className="auth-form-body">
            {/* Student Email / Roll No */}
            <div className="form-group">
              <label className="form-label" htmlFor="signin-email">
                Student Email or Roll Number <span className="req-star">*</span>
              </label>
              <div className="auth-input-wrapper">
                <Mail size={17} className="input-leading-icon" />
                <input
                  id="signin-email"
                  type="text"
                  className="form-input auth-input"
                  placeholder="e.g. khushiroongta0801@gmail.com or 23IT042"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  autoFocus
                  required
                />
              </div>
            </div>

            {/* Password with Show/Hide Toggle */}
            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label" htmlFor="signin-password">
                  Password <span className="req-star">*</span>
                </label>
                <button
                  type="button"
                  className="btn-forgot-password-link"
                  onClick={() => {
                    showToast({
                      title: 'Password Reset 🔑',
                      description: 'Demo campus reset link sent to your university webmail.',
                      type: 'info'
                    });
                  }}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="auth-input-wrapper">
                <Lock size={17} className="input-leading-icon" />
                <input
                  id="signin-password"
                  type={showSignInPassword ? 'text' : 'password'}
                  className="form-input auth-input"
                  placeholder="Enter your student password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn-password-toggle tactile-btn"
                  onClick={() => setShowSignInPassword(!showSignInPassword)}
                  aria-label={showSignInPassword ? 'Hide password' : 'Show password'}
                  title={showSignInPassword ? 'Hide password' : 'Show password'}
                >
                  {showSignInPassword ? (
                    <EyeOff size={17} color="#6B7280" />
                  ) : (
                    <Eye size={17} color="#6B7280" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Domain Trust Row */}
            <div className="auth-options-row">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember campus session</span>
              </label>

              <div className="auth-trust-pill">
                <ShieldCheck size={13} color="#059669" />
                <span>SASC Verified SSO</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="auth-submit-row">
              <button
                type="submit"
                className="btn btn-primary auth-submit-btn tactile-btn"
              >
                <span>Sign In to Campus Hub</span>
                <ArrowRight size={17} strokeWidth={2.4} />
              </button>
            </div>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegisterSubmit} className="auth-form-body">
            {/* Student Full Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="reg-name">
                Full Name <span className="req-star">*</span>
              </label>
              <div className="auth-input-wrapper">
                <User size={17} className="input-leading-icon" />
                <input
                  id="reg-name"
                  type="text"
                  className="form-input auth-input"
                  placeholder="e.g. Khushi Roongta"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  autoFocus
                  required
                />
              </div>
            </div>

            {/* Student Email & Roll No 2-Column Row */}
            <div className="auth-two-col-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="reg-email">
                  Campus Email <span className="req-star">*</span>
                </label>
                <div className="auth-input-wrapper">
                  <Mail size={17} className="input-leading-icon" />
                  <input
                    id="reg-email"
                    type="email"
                    className="form-input auth-input"
                    placeholder="name@sasc.campus.edu"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-rollno">
                  Roll Number <span className="req-star">*</span>
                </label>
                <div className="auth-input-wrapper">
                  <Hash size={17} className="input-leading-icon" />
                  <input
                    id="reg-rollno"
                    type="text"
                    className="form-input auth-input"
                    placeholder="e.g. 21CS042"
                    value={regRollNo}
                    onChange={(e) => setRegRollNo(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Department & Year Dropdowns Row */}
            <div className="auth-two-col-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="reg-dept">
                  Department <span className="req-star">*</span>
                </label>
                <div className="auth-input-wrapper">
                  <Building2 size={17} className="input-leading-icon" />
                  <select
                    id="reg-dept"
                    className="form-select auth-select"
                    value={regDept}
                    onChange={(e) => setRegDept(e.target.value)}
                    required
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-year">
                  Academic Year <span className="req-star">*</span>
                </label>
                <div className="auth-input-wrapper">
                  <Calendar size={17} className="input-leading-icon" />
                  <select
                    id="reg-year"
                    className="form-select auth-select"
                    value={regYear}
                    onChange={(e) => setRegYear(e.target.value)}
                    required
                  >
                    {ACADEMIC_YEARS.map((yr) => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Password with Show/Hide Toggle */}
            <div className="form-group">
              <label className="form-label" htmlFor="reg-password">
                Create Password <span className="req-star">*</span>
              </label>
              <div className="auth-input-wrapper">
                <Lock size={17} className="input-leading-icon" />
                <input
                  id="reg-password"
                  type={showRegPassword ? 'text' : 'password'}
                  className="form-input auth-input"
                  placeholder="Minimum 6 characters"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  className="btn-password-toggle tactile-btn"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                  aria-label={showRegPassword ? 'Hide password' : 'Show password'}
                  title={showRegPassword ? 'Hide password' : 'Show password'}
                >
                  {showRegPassword ? (
                    <EyeOff size={17} color="#6B7280" />
                  ) : (
                    <Eye size={17} color="#6B7280" />
                  )}
                </button>
              </div>
            </div>

            {/* Action Submit */}
            <div className="auth-submit-row">
              <button
                type="submit"
                className="btn btn-primary auth-submit-btn tactile-btn"
              >
                <span>Create Student Account</span>
                <ArrowRight size={17} strokeWidth={2.4} />
              </button>
            </div>
          </form>
        )}

        {/* Modal Footer Note */}
        <div className="auth-modal-footer">
          <span className="auth-footer-text">
            Protected by SASC Peer Verification. By signing in, you agree to the Campus Study Academic Code.
          </span>
        </div>
      </div>
    </div>
  );
};