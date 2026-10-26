import React, { useState } from 'react';
import { ArrowLeft, Calendar, ArrowRight, Check, Sparkles, Clock, Target, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FilmStripDecoration } from '../components/PhotographicPreviews';

export const ExamRescueView = () => {
  const {
    examState,
    generateExamPlan,
    toggleChecklistTask,
    navigateBack,
    navigateTo,
    showToast
  } = useApp();

  const [subject, setSubject] = useState(examState.selectedSubject || 'Machine Learning');
  const [examDate, setExamDate] = useState(examState.examDate || '2025-11-15');

  // Hardcoded or dynamically derived checklist items matching Screen 7
  const defaultTasks = [
    {
      id: 'task-1',
      text: 'Understand key concepts',
      subtext: '(Use Unit 1 Notes)',
      completed: true,
      resourceId: 'nif-01'
    },
    {
      id: 'task-2',
      text: 'Practise PYQs (2021 - 2024)',
      subtext: '(DBMS & ML Repeat Questions)',
      completed: true,
      resourceId: 'nif-02'
    },
    {
      id: 'task-3',
      text: 'Solve sample questions',
      subtext: '',
      completed: false,
      resourceId: null
    },
    {
      id: 'task-4',
      text: 'Revise important formulas',
      subtext: '',
      completed: false,
      resourceId: null
    },
    {
      id: 'task-5',
      text: 'Take a mock test',
      subtext: '',
      completed: false,
      resourceId: null
    }
  ];

  const [tasks, setTasks] = useState(defaultTasks);

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const handleToggleTask = (id) => {
    const currentTask = tasks.find(t => t.id === id);
    if (!currentTask) return;

    const nextCompleted = !currentTask.completed;

    // 1. Update tasks state
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: nextCompleted } : t));

    // 2. Completed count calculation
    const nextCompletedCount = tasks.filter(t => t.id === id ? nextCompleted : t.completed).length;

    // 3. Trigger toast feedback in event handler
    if (nextCompleted) {
      showToast({
        title: 'Revision Task Completed! 🎉',
        description: `"${currentTask.text}" checked off. (${nextCompletedCount}/${tasks.length} tasks ready)`,
        type: 'success',
        duration: 8000,
        action: {
          label: 'Undo',
          onClick: () => {
            setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: false } : t));
            showToast({
              title: 'Task Restored ↩️',
              description: `"${currentTask.text}" moved back to active checklist.`,
              type: 'info'
            });
          }
        }
      });
    } else {
      showToast({
        title: 'Task Unchecked',
        description: `"${currentTask.text}" moved back to active checklist.`,
        type: 'info',
        duration: 8000,
        action: {
          label: 'Undo',
          onClick: () => {
            setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: true } : t));
            showToast({
              title: 'Task Completed! 🎉',
              description: `"${currentTask.text}" checked off.`,
              type: 'success'
            });
          }
        }
      });
    }
  };

  const handleGeneratePlan = (e) => {
    e.preventDefault();
    generateExamPlan(subject, examDate);
    showToast({
      title: `Exam Sprint Plan Ready for ${subject}! ⚡`,
      description: `Targeted 48-hour checklist synchronized with syllabus and repeat PYQs.`,
      type: 'exam'
    });
  };

  return (
    <div className="exam-rescue-screen-container">
      {/* Top Header Row with Back Button, Title, and Film Accent */}
      <div className="exam-rescue-top-bar">
        <button
          className="btn-back-round tactile-btn"
          onClick={navigateBack}
          aria-label="Back"
          title="Return to previous screen"
        >
          <ArrowLeft size={20} strokeWidth={2.4} />
        </button>

        <div className="exam-rescue-title-area">
          <div className="title-with-icon">
            <div className="calendar-icon-box">
              <Calendar size={18} color="#407ADD" strokeWidth={2.4} />
            </div>
            <h1 className="exam-rescue-title">Exam Rescue Mode</h1>
          </div>
          <p className="exam-rescue-subtitle">
            Enter your exam details and get a personalised, high-yield revision sprint roadmap.
          </p>
        </div>

        {/* Film Strip Accent in Top Right Corner */}
        <div className="exam-rescue-film-corner" aria-hidden="true">
          <FilmStripDecoration vertical style={{ height: '70px', width: '22px' }} />
        </div>
      </div>

      {/* Two-Column Responsive Layout on Desktop (Configurator on Left, Sprint Plan on Right) */}
      <div className="exam-rescue-desktop-layout">
        {/* Left Column: Configurator & Exam Countdown Studio */}
        <div className="rescue-config-col">
          {/* Stepper: (1) Subject -> (2) Date -> (3) Plan */}
          <div className="stepper-row" aria-label="Steps">
            <div className="stepper-item active">
              <span className="step-circle filled">1</span>
              <span className="step-label">Subject</span>
            </div>
            <div className="stepper-divider" />
            <div className="stepper-item active">
              <span className="step-circle filled">2</span>
              <span className="step-label">Date</span>
            </div>
            <div className="stepper-divider" />
            <div className="stepper-item active">
              <span className="step-circle filled">3</span>
              <span className="step-label">Plan</span>
            </div>
          </div>

          {/* Form Fields: Select Subject & Exam Date */}
          <form onSubmit={handleGeneratePlan} className="rescue-form-card">
            <div className="rescue-form-field">
              <label className="rescue-field-label">Select Subject</label>
              <select
                className="rescue-select-input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="Machine Learning">Machine Learning (CS401)</option>
                <option value="DBMS">DBMS - Database Management</option>
                <option value="Data Structures">Data Structures & Algorithms</option>
                <option value="Operating Systems">Operating Systems Memo</option>
                <option value="Computer Networks">Computer Networks</option>
                <option value="Engineering Maths">Engineering Mathematics III</option>
              </select>
            </div>

            <div className="rescue-form-field">
              <label className="rescue-field-label">Target Exam Date</label>
              <div className="rescue-date-input-wrap">
                <input
                  type="text"
                  className="rescue-text-input"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  placeholder="15 Nov 2025"
                />
                <span className="calendar-suffix-icon" aria-hidden="true">
                  <Calendar size={18} color="#6B7280" />
                </span>
              </div>
            </div>

            {/* Generate Plan Blue Button */}
            <button type="submit" className="btn-generate-plan tactile-btn">
              <span>Update Revision Plan</span>
              <ArrowRight size={18} strokeWidth={2.4} />
            </button>

            {/* Desktop Quick Metric Hints */}
            <div className="rescue-countdown-pill-card">
              <Clock size={16} color="#407ADD" />
              <span>Target: <strong>4 Weeks Sprint</strong> • 20 Days remaining</span>
            </div>
          </form>
        </div>

        {/* Right Column: Generated Revision Plan Checklist Section */}
        <div className="rescue-plan-col">
          <div className="revision-plan-card">
            <div className="plan-header-row">
              <div>
                <div className="plan-title-with-pill">
                  <h2 className="plan-heading">Your Revision Sprint Roadmap</h2>
                  <span className="weeks-countdown-badge">4 weeks to go!</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Deterministic checklist matching high-yield exam derivations & 5-year repeat PYQs
                </p>
              </div>
            </div>

            {/* Dynamic Visual Progress Bar */}
            <div className="plan-progress-bar-wrap">
              <div className="plan-progress-header">
                <span className="plan-progress-label">
                  {completedCount === tasks.length
                    ? '🎉 Complete! All revision milestones achieved!'
                    : `${completedCount} of ${tasks.length} tasks ready`}
                </span>
                <span className="plan-progress-pct">{progressPercent}%</span>
              </div>
              <div className="plan-progress-track">
                <div
                  className="plan-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <ul className="plan-checklist">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`checklist-item tactile-btn ${task.completed ? 'completed' : ''}`}
                  onClick={() => handleToggleTask(task.id)}
                >
                  <button
                    type="button"
                    className={`circle-checkbox ${task.completed ? 'checked' : ''}`}
                    aria-label={`Toggle task: ${task.text}`}
                  >
                    {task.completed && <Check size={13} strokeWidth={3.2} color="#FFFFFF" />}
                  </button>

                  <div className="task-content">
                    <span className="task-text">{task.text}</span>
                    {task.subtext && (
                      <span
                        className="task-subtext"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (task.resourceId) {
                            navigateTo('detail', task.resourceId);
                          }
                        }}
                        title="Click to open attached study note"
                      >
                        {task.subtext} ↗
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
