# App Flow — Notes in Frame

## 1. Primary user goal
A student should be able to find a relevant note or previous-year question paper, understand what it contains, and preview/download or bookmark it with minimal effort.

## 2. Main navigation
### Desktop
- Home
- Explore Notes
- Previous-Year Papers (PYQs)
- Exam Rescue
- My Collections
- Upload Notes
- Profile

### Mobile bottom navigation
- Home
- Explore
- **Upload (+)** — prominent center action
- Collections
- Profile

The logo always returns to Home. Search is available on Home and Explore.

## 3. Screen-by-screen flow

### A. Splash / onboarding (optional)
1. Show `notes in frame.` wordmark with camera/Polaroid visuals.
2. Tagline: “Your campus knowledge, captured one frame at a time.”
3. CTA: “Get started” leads to Home/Explore.
4. Do not require account creation; authentication is not needed for the competition prototype.

### B. Home
**Purpose:** Orient the user and help them start searching immediately.
1. Header and prominent search field.
2. Subject chips: All, CSE, ECE, Mechanical, Civil, etc.
3. Featured “Exam Rescue Mode” banner.
4. Popular notes section with Polaroid resource cards.
5. Subject shortcuts.
6. “See all” opens Explore with the relevant filter applied.
7. Tapping a resource card opens Note Details.

### C. Explore / All Notes
**Purpose:** Browse and narrow the resource library.
1. Show search bar and result count.
2. Show filters: Academic Year, Subject, Resource Type, Sort.
3. Resource types: Lecture Notes, PYQs, Revision Guide, Handwritten Notes, Video Resources.
4. Filtering updates the visible cards immediately.
5. Search matches title, subject, unit/topic and tags.
6. Sort options: Most relevant, Highest rated, Newest, Most saved.
7. Tapping a card opens Note Details.
8. If no matches, show a helpful empty state with “Clear filters”.

### D. Filter sheet
1. Open from Explore’s filter control.
2. Select academic year, subject and resource type.
3. “Reset” clears selections.
4. “Apply filters” closes the sheet and updates results.
5. On desktop, filters may appear inline or in a sidebar.

### E. Note Details
**Purpose:** Help the student decide whether a resource is useful.
1. Show preview image or mock document preview.
2. Show title, subject, unit/topic, type, academic year, rating and review count.
3. Tabs/sections: Overview, Preview, Reviews, Related.
4. Primary actions: Download, Save/Bookmark, Share.
5. Download must work for a provided demo file or show a clear prototype message; never show a dead button.
6. Save toggles bookmark state and updates Collections/Bookmarks.
7. Share uses native share if available, otherwise copies a local share URL or shows a copy-link confirmation.
8. Related resource cards open their own detail pages.
9. Back returns to the previous filtered list.

### F. Exam Rescue Mode
**Purpose:** Turn a resource library into an actionable revision plan.
1. Student selects subject.
2. Student chooses exam date.
3. CTA “Generate Revision Plan”.
4. Generate a deterministic demo plan based on the selected subject/date and mock resources.
5. Display checklist items such as:
   - Review key concepts.
   - Practice available PYQs.
   - Solve sample questions.
   - Revise important formulas.
   - Take a mock test.
6. Checkboxes toggle completion and progress updates.
7. Show recommended notes/PYQs linked to Note Details.
8. If date is missing, show inline validation.
9. Label plans as demo-generated; do not imply real AI unless implemented.

### G. My Collections
**Purpose:** Organize saved resources.
1. Show collections as Polaroid stacks.
2. Default examples: Semester 3, Tomorrow’s Exam, Important PYQs.
3. “New Collection” opens a small modal/form.
4. Tapping a collection shows saved resources.
5. Users can add/remove a resource from a collection.
6. If persistence is unavailable, store state locally for the session and label it as a prototype.

### H. Upload Notes
**Purpose:** Demonstrate the required upload action.
1. Drop zone and “Choose a file”.
2. Fields: Title, Subject, Resource Type, Academic Year, Unit/Topic, Description.
3. Validate required fields and supported file types.
4. On submit, add the resource to the current mock list or show a success state that clearly explains it is a local prototype.
5. Provide error state for missing fields or unsupported file.
6. Do not imply the file was uploaded to a server if no backend exists.

### I. Profile / menu
1. Show profile summary and navigation links.
2. Links: Home, Explore Notes, Exam Planner, My Collections, My Uploads, Bookmarks, Flashcards (optional), Settings.
3. Each link must lead to a real screen or a clear “coming soon” state; prioritize implementing links used in the main flow.
4. No real login is required.

## 4. Key end-to-end journeys
### Journey 1: Find and save notes
Home → Search or choose subject → Explore results → Open Note Details → Save/Bookmark → Collections.

### Journey 2: Find a PYQ
Home/Explore → Select PYQs filter → Browse cards → Note Details → Preview/Download.

### Journey 3: Prepare for an exam
Home → Exam Rescue Mode → Select subject and exam date → Generate plan → Open recommended resource → Mark checklist tasks complete.

### Journey 4: Contribute notes
Home/Upload (+) → Upload Notes form → Validate details → Submit → Success state → Resource appears in local demo library.

### Journey 5: Use on mobile
Open Home → Search → Apply filters via bottom sheet → Open note → Save or download → Return via bottom navigation.

## 5. State handling
- Search query and selected filters must affect visible results.
- Bookmark state must update the icon and saved resources.
- Collection creation and membership should update the UI.
- Exam checklist completion must update progress.
- Upload form must validate and show success/error feedback.
- Navigation, tabs, sorting and CTAs must work.
- Use local mock data; avoid dead controls.

## 6. Empty, loading and error states
- No search results: “No frames found. Try another subject or clear filters.”
- No bookmarks: “Your saved notes will appear here.”
- Empty collection: “Pin your first resource to this collection.”
- Upload error: explain what needs fixing.
- Download unavailable: provide a demo resource file or a clear fallback message.
- Loading state: lightweight skeleton cards if needed.

## 7. Scope guardrails
Build a polished frontend prototype, not a full production learning platform. Do not spend time on real authentication, payments, database infrastructure or complex AI integrations. Prioritize the complete user journey, visual quality, mobile responsiveness and clear interactions.
