// Mock Resources for Notes in Frame — Campus Notes Hub
// Photography motifs: Polaroid framing, tape accents, camera exposure stamps.
// Strictly NO botanical decorations.

export const INITIAL_RESOURCES = [
  {
    id: "nif-01",
    title: "Machine Learning Unit 1 & 2: Supervised Algorithms & Loss Functions",
    subject: "Machine Learning",
    subjectCode: "CS601",
    academicYear: "3rd Year",
    resourceType: "Lecture Notes",
    unitOrTopic: "Unit 1: Linear Regression & Gradient Descent",
    description: "In-depth lecture notes covering linear regression, cost function formulation, batch vs stochastic gradient descent, and bias-variance tradeoff with step-by-step derivations.",
    rating: 4.9,
    reviewCount: 68,
    fileName: "ML_Unit1_Supervised_Notes.pdf",
    fileSize: "4.8 MB",
    pages: "42 pages",
    uploadedBy: "Aarav Mehta (CSE '26)",
    createdAt: "2026-10-14",
    tags: ["Regression", "Gradient Descent", "Cost Function", "Sem 5"],
    tapeColor: "blue",
    frameNumber: "EXP 01",
    handwrittenCaption: "Prof. Rao's key exam derivations!",
    previewType: "code-math",
    svgContent: {
      accentColor: "#407ADD",
      diagramTitle: "Gradient Descent Convex Optimization",
      subtitle: "J(θ₀, θ₁) = 1/2m ∑ (h_θ(x) - y)²",
      codeSnippet: "θ_j := θ_j - α * (1/m) * ∑(h_θ(x) - y)x_j"
    }
  },
  {
    id: "nif-02",
    title: "Database Management Systems (DBMS) 5-Year Solved PYQs (2021–2025)",
    subject: "DBMS",
    subjectCode: "CS402",
    academicYear: "2nd Year",
    resourceType: "PYQ",
    unitOrTopic: "All Units: SQL, Normalization & ACID Properties",
    description: "Previous Year Question papers solved with complete SQL queries, B+ tree index diagrams, 1NF to BCNF decomposition examples, and concurrency control serializability questions.",
    rating: 4.8,
    reviewCount: 94,
    fileName: "DBMS_5Yr_Solved_PYQs.pdf",
    fileSize: "7.1 MB",
    pages: "58 pages",
    uploadedBy: "Priya Sharma (IT '27)",
    createdAt: "2026-10-08",
    tags: ["SQL", "Normalization", "BCNF", "Transactions", "PYQ"],
    tapeColor: "pink",
    frameNumber: "EXP 02",
    handwrittenCaption: "80% questions repeated from here!",
    previewType: "database",
    svgContent: {
      accentColor: "#DD88C1",
      diagramTitle: "Relational Schema & BCNF Dependency",
      subtitle: "FD: A -> B, B -> C | Canonical Cover",
      codeSnippet: "SELECT s.id, AVG(m.score) FROM students s..."
    }
  },
  {
    id: "nif-03",
    title: "Data Structures & Algorithms Handwritten Cheatsheet & Trees",
    subject: "Data Structures",
    subjectCode: "CS301",
    academicYear: "2nd Year",
    resourceType: "Handwritten Notes",
    unitOrTopic: "Unit 3: AVL Trees, Red-Black Trees & Graphs",
    description: "Clean handwritten notes with color-coded tree rotation diagrams (LL, RR, LR, RL), Dijkstra’s shortest path trace, and amortized complexity tables.",
    rating: 4.9,
    reviewCount: 112,
    fileName: "DSA_Handwritten_Rotations_Graph.pdf",
    fileSize: "6.3 MB",
    pages: "31 pages",
    uploadedBy: "Rohan Varma (CSE '27)",
    createdAt: "2026-10-19",
    tags: ["AVL Trees", "Dijkstra", "Rotations", "Handwritten"],
    tapeColor: "green",
    frameNumber: "EXP 03",
    handwrittenCaption: "Easy AVL tree rotation tricks 📐",
    previewType: "graph-tree",
    svgContent: {
      accentColor: "#89BC62",
      diagramTitle: "AVL Balanced Binary Search Tree",
      subtitle: "Height Balance: |h_L - h_R| ≤ 1",
      codeSnippet: "node->height = 1 + max(left, right);"
    }
  },
  {
    id: "nif-04",
    title: "Operating Systems Memory Management & Paging Revision Guide",
    subject: "Operating Systems",
    subjectCode: "CS503",
    academicYear: "3rd Year",
    resourceType: "Revision Guide",
    unitOrTopic: "Unit 4: Virtual Memory, TLB & Page Replacement",
    description: "Last-minute exam revision guide covering FIFO, LRU, Optimal page replacement algorithms, Belady's anomaly, and inverted page table address translation.",
    rating: 4.7,
    reviewCount: 45,
    fileName: "OS_Memory_Virtual_Revision.pdf",
    fileSize: "3.5 MB",
    pages: "22 pages",
    uploadedBy: "Ananya Deshmukh (CSE '26)",
    createdAt: "2026-10-11",
    tags: ["Virtual Memory", "Paging", "LRU", "TLB", "Exam Ready"],
    tapeColor: "green",
    frameNumber: "EXP 04",
    handwrittenCaption: "Revise 2 hours before the exam!",
    previewType: "memory-blocks",
    svgContent: {
      accentColor: "#89BC62",
      diagramTitle: "Virtual to Physical Address Translation",
      subtitle: "Page Number (p) + Offset (d) via TLB",
      codeSnippet: "Frame = TLB_Hit ? cache[p] : PageTable[p];"
    }
  },
  {
    id: "nif-05",
    title: "Signals & Systems Fourier Transform & Laplace Solved PYQs",
    subject: "Signals & Systems",
    subjectCode: "EC302",
    academicYear: "2nd Year",
    resourceType: "PYQ",
    unitOrTopic: "Unit 3 & 4: CTFT, DTFT & ROC Analysis",
    description: "Official past exam papers with full mathematical step-by-step ROC (Region of Convergence) sketches, stability criteria, and convolution integrals.",
    rating: 4.6,
    reviewCount: 38,
    fileName: "ECE_Signals_Fourier_Laplace_PYQ.pdf",
    fileSize: "5.4 MB",
    pages: "44 pages",
    uploadedBy: "Karthik Iyer (ECE '27)",
    createdAt: "2026-09-29",
    tags: ["Fourier", "Laplace", "ROC", "ECE", "PYQ"],
    tapeColor: "blue",
    frameNumber: "EXP 05",
    handwrittenCaption: "ROC stability regions highlighted!",
    previewType: "signal-wave",
    svgContent: {
      accentColor: "#407ADD",
      diagramTitle: "Continuous-Time Fourier Transform",
      subtitle: "X(jω) = ∫ x(t) e^(-jωt) dt",
      codeSnippet: "H(s) = Y(s) / X(s) | Re(s) > σ_max"
    }
  },
  {
    id: "nif-06",
    title: "Engineering Mathematics III: Laplace & PDE Formula Sheet",
    subject: "Engineering Maths",
    subjectCode: "MA301",
    academicYear: "2nd Year",
    resourceType: "Revision Guide",
    unitOrTopic: "Unit 1–5: Laplace, Fourier Series & Wave Equations",
    description: "Condensed 4-page master formula sheet with all standard Laplace transforms, inverse Laplace partial fraction formulas, and half-range Fourier series coefficients.",
    rating: 4.9,
    reviewCount: 120,
    fileName: "EnggMaths3_Formula_Sheet.pdf",
    fileSize: "2.1 MB",
    pages: "4 pages",
    uploadedBy: "Neha Gupta (Maths Club)",
    createdAt: "2026-10-21",
    tags: ["Formula Sheet", "Laplace", "PDE", "Common", "Quick Revise"],
    tapeColor: "pink",
    frameNumber: "EXP 06",
    handwrittenCaption: "Every single formula you need!",
    previewType: "formula-table",
    svgContent: {
      accentColor: "#DD88C1",
      diagramTitle: "Standard Laplace Transform Tables",
      subtitle: "L{e^(at) sin(ωt)} = ω / ((s-a)² + ω²)",
      codeSnippet: "∂²u/∂t² = c² (∂²u/∂x²) [1D Wave Equation]"
    }
  },
  {
    id: "nif-07",
    title: "Computer Networks: Subnetting, TCP/IP & OSI Architecture Notes",
    subject: "Computer Networks",
    subjectCode: "CS504",
    academicYear: "3rd Year",
    resourceType: "Lecture Notes",
    unitOrTopic: "Unit 2: IPv4 CIDR, Subnet Masks & TCP 3-Way Handshake",
    description: "Clear breakdown of variable length subnet masking (VLSM), sliding window flow control protocols, TCP congestion control algorithms (Slow Start, Tahoe, Reno).",
    rating: 4.8,
    reviewCount: 52,
    fileName: "CN_Subnetting_TCP_Handshake.pdf",
    fileSize: "4.5 MB",
    pages: "38 pages",
    uploadedBy: "Vikram Sen (CSE '26)",
    createdAt: "2026-10-15",
    tags: ["Subnetting", "TCP", "OSI Model", "CIDR", "Networking"],
    tapeColor: "blue",
    frameNumber: "EXP 07",
    handwrittenCaption: "Subnetting calculation shortcut table!",
    previewType: "network-packets",
    svgContent: {
      accentColor: "#407ADD",
      diagramTitle: "TCP 3-Way Handshake & Sequence ACK",
      subtitle: "SYN -> SYN-ACK -> ACK Protocol",
      codeSnippet: "IP: 192.168.10.0/27 -> 32 Hosts per Subnet"
    }
  },
  {
    id: "nif-08",
    title: "Theory of Computation (TOC): Turing Machines & DFA State Diagrams",
    subject: "Theory of Computation",
    subjectCode: "CS403",
    academicYear: "2nd Year",
    resourceType: "Handwritten Notes",
    unitOrTopic: "Unit 4: Turing Machines & Halting Problem",
    description: "Neat state transition tables, instantaneous descriptions (ID) for language acceptance, and pumping lemma proofs for non-regular languages.",
    rating: 4.7,
    reviewCount: 41,
    fileName: "TOC_DFA_PDA_Turing_Machines.pdf",
    fileSize: "5.8 MB",
    pages: "34 pages",
    uploadedBy: "Divya Nambiar (CSE '27)",
    createdAt: "2026-10-02",
    tags: ["Turing Machine", "DFA", "Pumping Lemma", "Automata"],
    tapeColor: "pink",
    frameNumber: "EXP 08",
    handwrittenCaption: "Pumping lemma proofs made simple!",
    previewType: "automata-states",
    svgContent: {
      accentColor: "#DD88C1",
      diagramTitle: "Deterministic Finite Automaton (DFA)",
      subtitle: "δ(q₀, 0) = q₁, δ(q₁, 1) = q₂ [Final]",
      codeSnippet: "M = (Q, Σ, δ, q₀, F) | Language L = {0ⁿ1ⁿ}"
    }
  },
  {
    id: "nif-09",
    title: "Thermodynamics & Heat Transfer Past Exam Papers with Solutions",
    subject: "Thermodynamics",
    subjectCode: "ME301",
    academicYear: "2nd Year",
    resourceType: "PYQ",
    unitOrTopic: "Unit 2: Carnot Cycle, Entropy & 2nd Law",
    description: "Solved questions on Brayton cycle, Rankine steam cycles, entropy generation calculations, and conduction heat transfer through composite cylinders.",
    rating: 4.5,
    reviewCount: 29,
    fileName: "Mech_Thermodynamics_Solved_PYQ.pdf",
    fileSize: "6.9 MB",
    pages: "50 pages",
    uploadedBy: "Sameer Joshi (Mech '27)",
    createdAt: "2026-09-22",
    tags: ["Carnot Cycle", "Entropy", "Heat Transfer", "Mech", "PYQ"],
    tapeColor: "green",
    frameNumber: "EXP 09",
    handwrittenCaption: "T-s and P-v cycle sketches included!",
    previewType: "thermo-cycle",
    svgContent: {
      accentColor: "#89BC62",
      diagramTitle: "Ideal Carnot Cycle P-V & T-S Curve",
      subtitle: "η = 1 - (T_C / T_H) | dS = dQ_rev / T",
      codeSnippet: "W_net = Q_in - Q_out = (T_H - T_C) * ΔS"
    }
  }
];

export const ALL_SUBJECTS = [
  "All",
  "Machine Learning",
  "DBMS",
  "Data Structures",
  "Operating Systems",
  "Signals & Systems",
  "Engineering Maths",
  "Computer Networks",
  "Theory of Computation",
  "Thermodynamics"
];

export const ACADEMIC_YEARS = [
  "All",
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year"
];

export const RESOURCE_TYPES = [
  "All",
  "Lecture Notes",
  "PYQ",
  "Revision Guide",
  "Handwritten Notes"
];

export const DEFAULT_COLLECTIONS = [
  {
    id: "col-1",
    name: "Semester 3 Core",
    description: "Essential notes and formula sheets for third semester exams",
    resourceIds: ["nif-03", "nif-06", "nif-02"],
    tapeColor: "blue",
    createdAt: "2026-10-10"
  },
  {
    id: "col-2",
    name: "Tomorrow's Exam",
    description: "Urgent last-minute revision materials and high-yield questions",
    resourceIds: ["nif-01", "nif-04"],
    tapeColor: "pink",
    createdAt: "2026-10-24"
  },
  {
    id: "col-3",
    name: "Important PYQs",
    description: "Curated collection of 5-year repeated exam questions",
    resourceIds: ["nif-02", "nif-05", "nif-09"],
    tapeColor: "green",
    createdAt: "2026-10-18"
  }
];

export const DEFAULT_EXAM_CHECKLIST = [
  { id: "task-1", text: "Review fundamental formulas and unit summaries", completed: true, resourceId: "nif-06" },
  { id: "task-2", text: "Solve 2023 & 2024 university PYQ questions", completed: true, resourceId: "nif-02" },
  { id: "task-3", text: "Practice core derivations and algorithms step-by-step", completed: false, resourceId: "nif-01" },
  { id: "task-4", text: "Review memory models and architecture diagrams", completed: false, resourceId: "nif-04" },
  { id: "task-5", text: "Take a timed 45-minute mock test on key topics", completed: false, resourceId: null }
];
