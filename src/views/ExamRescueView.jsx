import React, { useState } from 'react';
import { ArrowLeft, Calendar, ArrowRight, Check, Sparkles, Clock, Target, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FilmStripDecoration } from '../components/PhotographicPreviews';

const SUBJECT_ROADMAPS = {
  'Machine Learning': [
    { id: 'ml-1', text: 'Understand Supervised Loss & Gradient Descent', subtext: '(Unit 1: Linear & Logistic Regression)', completed: true, resourceId: 'nif-01' },
    { id: 'ml-2', text: 'Practice Backpropagation & Neural Network weight updates', subtext: '(Unit 2 & 3: Loss Derivations)', completed: true, resourceId: 'nif-01' },
    { id: 'ml-3', text: 'Solve 5-year repeat PYQs (SVM, Decision Trees & Ensembles)', subtext: '(2021–2024 University Exam Questions)', completed: false, resourceId: 'nif-01' },
    { id: 'ml-4', text: 'Revise Confusion Matrix, ROC-AUC, and Bias-Variance tradeoffs', subtext: '(Unit 4: Model Evaluation)', completed: false, resourceId: null },
    { id: 'ml-5', text: 'Take a 45-minute timed mock test on high-yield derivations', subtext: '', completed: false, resourceId: null }
  ],
  'Data Structures': [
    { id: 'dsa-1', text: 'Understand Asymptotic Complexity & Master Theorem', subtext: '(Unit 1: Recurrence Relations)', completed: true, resourceId: 'nif-03' },
    { id: 'dsa-2', text: 'Practice AVL Trees, Red-Black Trees & Heap Rotations', subtext: '(Unit 3: Self-Balancing Trees)', completed: true, resourceId: 'nif-03' },
    { id: 'dsa-3', text: 'Solve Graph Traversals (BFS, DFS, Dijkstra) PYQs', subtext: '(Shortest Path & MST Repeat Problems)', completed: false, resourceId: 'nif-03' },
    { id: 'dsa-4', text: 'Revise Dynamic Programming Knapsack & Memoization proofs', subtext: '(Unit 5: Optimal Substructure)', completed: false, resourceId: null },
    { id: 'dsa-5', text: 'Take a 45-minute timed mock test on Trees & Graph problems', subtext: '', completed: false, resourceId: null }
  ],
  'DBMS': [
    { id: 'dbms-1', text: 'Review ER Modeling & Relational Algebra Axioms', subtext: '(Unit 1: Schema Design & Keys)', completed: true, resourceId: 'nif-02' },
    { id: 'dbms-2', text: 'Practice B+ Tree Indexing & 3NF/BCNF Normalization proofs', subtext: '(Unit 3: Normalization & Dependencies)', completed: true, resourceId: 'nif-02' },
    { id: 'dbms-3', text: 'Solve Concurrency Control, 2PL & ACID property PYQs', subtext: '(2021–2024 Solved University Papers)', completed: false, resourceId: 'nif-02' },
    { id: 'dbms-4', text: 'Write SQL Triggers, Views & Complex Nested Group By Queries', subtext: '(Unit 2: SQL Operations)', completed: false, resourceId: null },
    { id: 'dbms-5', text: 'Take a 45-minute timed mock test on Transactions & Indexing', subtext: '', completed: false, resourceId: null }
  ],
  'Operating Systems': [
    { id: 'os-1', text: 'Review Process Synchronization & Deadlock Coffman Conditions', subtext: '(Unit 2: Semaphores & Mutex Locks)', completed: true, resourceId: 'nif-04' },
    { id: 'os-2', text: 'Practice Virtual Memory, Paging & Page Replacement (LRU/FIFO)', subtext: '(Unit 4: Address Translation & TLB)', completed: true, resourceId: 'nif-04' },
    { id: 'os-3', text: 'Solve CPU Scheduling (Round Robin & Priority) repeat PYQs', subtext: '(2021–2024 Solved Midterm Problems)', completed: false, resourceId: 'nif-04' },
    { id: 'os-4', text: 'Revise File System inode structures and disk scheduling algorithms', subtext: '(Unit 5: Storage Architecture)', completed: false, resourceId: null },
    { id: 'os-5', text: 'Take a 45-minute timed mock test on Paging & Deadlocks', subtext: '', completed: false, resourceId: null }
  ],
  'Computer Networks': [
    { id: 'cn-1', text: 'Review OSI 7-Layer vs TCP/IP Protocol Stack Architecture', subtext: '(Unit 1: Protocol Layers & Framing)', completed: true, resourceId: 'nif-07' },
    { id: 'cn-2', text: 'Practice IPv4 CIDR Subnetting, Masking & Broadcast calculations', subtext: '(Unit 2: Slash Notation Shortcuts)', completed: true, resourceId: 'nif-07' },
    { id: 'cn-3', text: 'Solve TCP 3-Way Handshake & Sliding Window Flow Control PYQs', subtext: '(2021–2024 Solved Questions)', completed: false, resourceId: 'nif-07' },
    { id: 'cn-4', text: 'Revise Routing Algorithms (Dijkstra Shortest Path & Bellman-Ford)', subtext: '(Unit 3: Network Layer Routing)', completed: false, resourceId: null },
    { id: 'cn-5', text: 'Take a 45-minute timed mock test on Subnetting & TCP Handshakes', subtext: '', completed: false, resourceId: null }
  ],
  'Engineering Maths': [
    { id: 'math-1', text: 'Review Laplace & Inverse Laplace Transform Definitions', subtext: '(Unit 1: Formulas & Standard Transforms)', completed: true, resourceId: 'nif-06' },
    { id: 'math-2', text: 'Practice Fourier Series & Half-Range Sine/Cosine Expansions', subtext: '(Unit 2: Derivations & Orthogonality)', completed: true, resourceId: 'nif-06' },
    { id: 'math-3', text: 'Solve 2nd-Order Partial Differential Wave Equations PYQs', subtext: '(2021–2024 Solved University Papers)', completed: false, resourceId: 'nif-06' },
    { id: 'math-4', text: 'Revise Probability Distributions, Poisson & Bayes Theorem proofs', subtext: '(Unit 5: Probability & Statistics)', completed: false, resourceId: null },
    { id: 'math-5', text: 'Take a 45-minute timed mock test on Laplace & Wave Equations', subtext: '', completed: false, resourceId: null }
  ]
};

export const ExamRescueView = () => {
  const {
    examState,
    generateExamPlan,
    toggleChecklistTask,
    navigateBack,
    openNoteDetail,
    showToast
  } = useApp();

  const [subject, setSubject] = useState(examState.selectedSubject || 'Machine Learning');
  const [examDate, setExamDate] = useState(examState.examDate || '2026-11-15');

  const [tasks, setTasks] = useState(() => {
    return SUBJECT_ROADMAPS[examState.selectedSubject] || SUBJECT_ROADMAPS['Machine Learning'];
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  // Dynamic Subject Switcher: Instantly regenerates tailored roadmap
  const handleSubjectChange = (newSubject) => {
    setSubject(newSubject);
    const newRoadmap = SUBJECT_ROADMAPS[newSubject] || SUBJECT_ROADMAPS['Machine Learning'];
    setTasks(newRoadmap);
    showToast({
      title: `${newSubject} Sprint Loaded! ⚡`,
      description: `Synchronized 5 targeted revision milestones and repeat PYQ derivations.`,
      type: 'info'
    });
  };

  const handleToggleTask = (id) => {
    const currentTask = tasks.find(t => t.id === id);
    if (!currentTask) return;

    const nextCompleted = !currentTask.completed;

    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: nextCompleted } : t));

    const nextCompletedCount = tasks.filter(t => t.id === id ? nextCompleted : t.completed).length;

    if (nextCompleted) {
      showToast({
        title: 'Revision Task Completed! 🎉',
        description: `"${currentTask.text}" checked off. (${nextCompletedCount}/${tasks.length} tasks ready)`,
        type: 'success',
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
    const newRoadmap = SUBJECT_ROADMAPS[subject] || SUBJECT_ROADMAPS['Machine Learning'];
    setTasks(newRoadmap);
    showToast({
      title: `Exam Sprint Plan Ready for ${subject}! ⚡`,
      description: `Targeted sprint checklist synchronized with syllabus and repeat PYQs.`,
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
                onChange={(e) => handleSubjectChange(e.target.value)}
              >
                <option value="Machine Learning">Machine Learning (CS401)</option>
                <option value="Data Structures">Data Structures & Algorithms</option>
                <option value="DBMS">DBMS - Database Management Systems</option>
                <option value="Operating Systems">Operating Systems (CS503)</option>
                <option value="Computer Networks">Computer Networks (CS504)</option>
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
                  placeholder="15 Nov 2026"
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
                  Deterministic checklist matching high-yield {subject} derivations & repeat PYQs
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
                            openNoteDetail(task.resourceId);
                          }
                        }}
                        title="Click to view attached study notes"
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
