# notes in frame. 📸
> **Your campus knowledge, captured one frame at a time.**  
> Built for the **SASC PixelRush** Campus Notes Hub Challenge.

---

## 🌟 Overview
**Notes in Frame** is an aesthetic, production-grade campus study and notes hub designed around a nostalgic yet modern **photographic scrapbook** aesthetic — featuring Polaroid resource cards, translucent washi tape, 35mm film strips, and tactile micro-interactions.

---

## 📱 Wireframe Implementation (10 Core Screens)

1. **Screen 1: Brand Splash & Landing**
   - Letter-by-letter organic handwriting animation for `notes in frame.`
   - Star star sparkles (`✦`) in Daisy Pink (`#DD88C1`), Sky Blue (`#407ADD`), and Grass Green (`#89BC62`)
   - Centered Polaroid hero card with pink washi tape and dual angled 35mm film strips
   - Zero-scroll `100dvh` mobile & desktop layout with primary CTA and pagination indicators

2. **Screen 2: Campus Onboarding**
   - Classical lined notebook derivation (`Gradient Descent: θ = θ - α∇J`)
   - Pastel yellow pinned sticky note (`Study · Share · Grow ☺`)
   - Vintage camera sticker with interactive lens and smooth skip/continue routing

3. **Screen 3: Campus Feed (Home)**
   - Live search with instant filtering across subjects, PYQs, and topics
   - Department pills (All, CSE, ECE, Mechanical, Civil, IT)
   - Dynamic **Exam Rescue Mode** callout card
   - Scrapbook-style popular notes with star ratings, contributors, and bookmark triggers
   - Department quick-access grid with tactile hover physics

4. **Screen 4: Explore Notes & PYQs**
   - High-density Polaroid grid with photo previews and document badges
   - Dynamic sorting (Most Relevant, Highest Rated, Newest, Most Downloaded)
   - Active filter indicators with one-click clear affordance

5. **Screen 5: Filter Bottom Sheet Modal**
   - Multi-dimensional filters: Academic Year (2022–2025), Subject, Resource Type (Notes, PYQs, Revision Guides, Handouts)
   - Spring-animated slide-up drawer with backdrop blur and reset options

6. **Screen 6: Note Detail & Study View**
   - High-fidelity handwriting note preview with page counter and file metadata
   - Contributor student badge with follower count and verification seal
   - Overview, Preview, and Reviews tabs with peer feedback
   - Offline text/blob file download simulator

7. **Screen 7: Exam Rescue Mode**
   - Custom revision planner tailored to exam countdowns
   - Subject & exam date picker with automatic sprint schedule calculation
   - Interactive circular checklist with progress tracking

8. **Screen 8: My Collections**
   - Scrapbook folder decks (Semester 3, Tomorrow's Exam, Important PYQs)
   - Separate tabs for Created Collections and Bookmarked Resources
   - "+ New Collection" modal with color themes and descriptions

9. **Screen 9: Share Your Notes (Upload Hub)**
   - Drag-and-drop file upload zone with file-size validation
   - Metadata tagging: Title, Subject, Academic Year, Resource Type, Description
   - Instant contribution publish with live feed update

10. **Screen 10: Student Profile & Settings Drawer**
    - Student identity: **Khushi Sharma** (CSE · Final Year, Senior Contributor)
    - Contribution statistics: 14 Uploads, 1,280 Downloads, 12-day streak
    - Project Information & Evaluators section with architecture breakdown
    - System settings: Offline storage manager, cache clearing, night-owl dark mode
    - Persistent logout flow with seamless redirection to the landing gateway

---

## 🎨 Design System & Palette

- **Paper White**: `#FFFFFF` / `#F8FAFC`
- **Grass Green**: `#89BC62` (Primary CTA, positive feedback, verified badges)
- **Daisy Pink**: `#DD88C1` (Washi tape, accent sparkles, brand period)
- **Sky Blue**: `#407ADD` (Interactive links, search focus, badges)
- **Slate Ink**: `#1E293B` / `#334155` (Editorial typography)
- **Script Font**: `Caveat, cursive` (Authentic student handwriting)
- **Sans Font**: `Plus Jakarta Sans, sans-serif` (Crisp digital readability)

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 18
- **Bundler**: Vite 6
- **Icons**: Lucide React
- **Styling**: Vanilla CSS Design Tokens, BEM-inspired naming, Emil Kowalski animation rules
- **State Architecture**: Centralized React Context (`AppContext`) with bidirectional `localStorage` synchronization
- **Notification Engine**: Sonner-grade floating toast container with countdown progress and dismiss actions

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/roongtakhushi/Notes-in-Frame.git

# Navigate into the project directory
cd Notes-in-Frame

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000/`.

### Production Build
```bash
npm run build
npm run preview
```

---

## 👩‍💻 Author
- **Khushi Roongta** — [@roongtakhushi](https://github.com/roongtakhushi)
- Challenge: SASC PixelRush 2026
