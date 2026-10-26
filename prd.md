# Product Requirements Document (PRD) — Notes in Frame

## 1. Overview
**Product:** Notes in Frame  
**Competition:** SASC PixelRush UI/UX Build Challenge  
**Selected challenge:** Campus Notes Hub  
**Format:** Responsive web app, mobile-first  
**Tagline:** Your campus knowledge, captured one frame at a time.

Notes in Frame is a student-focused library for lecture notes, previous-year question papers (PYQs), revision guides and other academic resources. Its distinguishing visual concept is a photography-inspired library: study resources appear as Polaroid cards, contact sheets and film-inspired collections.

## 2. Problem statement
Students often spend unnecessary time searching across chats, folders and scattered links for useful notes and previous-year papers. A single, searchable and visually organized hub can make resources easier to discover, evaluate, save and use during exam preparation.

## 3. Product goals
1. Make relevant academic resources easy to find.
2. Help students evaluate a resource before opening or downloading it.
3. Let students bookmark and organize resources.
4. Make sharing/uploading resources understandable and straightforward.
5. Provide one distinctive feature that improves the study workflow.
6. Deliver a polished, responsive experience that aligns with the competition rubric.

## 4. Target users
### Primary
College students who need lecture notes, PYQs, revision materials and exam resources.

### Secondary
Students who want to share useful resources with classmates.

### User needs
- “I need notes for a particular subject or unit quickly.”
- “I want to know what a file contains before opening it.”
- “I want to save useful resources for exam preparation.”
- “I need a simple way to contribute notes.”
- “I want to organize resources for an upcoming exam.”

## 5. Value proposition
A campus notes library that combines fast discovery and practical study tools with a distinctive Polaroid/film photography-inspired interface.

## 6. Competition requirements and alignment
The Campus Notes Hub challenge requires:
- A search bar that is easy to spot.
- Subject and year filters.
- Notes cards with title, subject and rating.
- An upload button.
- Extra credit opportunity: bookmarking or dark mode.

The broader product expectations include:
- Clear first screen explaining the product and next action.
- Simple navigation.
- Works on mobile and desktop.
- Consistent colors and typography.
- Functional buttons and links.
- Live deployed link.
- Unique idea explained in the submission note.

The competition states that a backend/database, real login/payments, real data and a fixed tech stack are not required; dummy data is acceptable. The deployed link must be accessible to anyone. Original work is required; AI assistance is permitted, but design decisions must be the participant’s own.

## 7. Judging rubric
Use the official rubric to prioritize implementation:
- **Ease of use and flow — 30 marks:** users should understand the product and complete the main task without help.
- **Creativity and originality — 25 marks:** the idea and unique additions should feel fresh.
- **Visual design — 25 marks:** color, typography, spacing and consistency.
- **Responsiveness — 10 marks:** usable on mobile and desktop.
- **Idea explanation — 10 marks:** concise and clear problem/solution statement.

## 8. Product scope
### Must have (MVP)
1. Home page with clear purpose and prominent search.
2. Explore/all-notes page.
3. Search by title, subject, unit/topic and tags.
4. Filters for subject, academic year and resource type.
5. Resource cards with title, subject, rating and bookmark action.
6. Note details page with description, preview placeholder, metadata and actions.
7. Upload form with validation and visible success/error feedback.
8. Responsive mobile layout with bottom navigation.
9. Working navigation and interactive controls.
10. Public deployment and testing.

### Signature innovation
**Knowledge Wall + Exam Rescue Mode**
- Knowledge Wall: resource cards use Polaroid styling and can be saved into visual collections such as “Semester 3,” “Tomorrow’s Exam,” and “Important PYQs.”
- Exam Rescue Mode: select a subject and exam date to generate a deterministic demo revision checklist with linked notes/PYQs and completion progress.

Implement the smaller, more reliable version first. If time is short, keep the Knowledge Wall as the core differentiator and make Exam Rescue Mode a focused, polished workflow.

### Nice to have
- Sort by rating or newest.
- Dark mode only if it can be implemented without diluting the required brand palette.
- Related resources.
- Flashcards using curated mock content.
- PYQ topic-frequency visualization based on clearly labeled sample data.
- Small transitions and hover effects.
- Local session persistence for bookmarks and collections.

### Out of scope
- Real authentication.
- Real payments.
- Production backend/database.
- Real AI document analysis.
- Complex social network features.
- Unimplemented controls presented as functional.
- Claims that mock data or demo-generated plans are verified or AI-generated.

## 9. Core features and acceptance criteria

### F1 — Search
**Requirement:** Search is visible and easy to access.  
**Acceptance criteria:**
- Search input accepts text.
- Results update based on title, subject, topic or tags.
- Empty results show a helpful message and clear-filters action.

### F2 — Filters
**Requirement:** Filter by subject, academic year and resource type.  
**Acceptance criteria:**
- Filter choices are visible and understandable.
- Applying filters updates the result set.
- Reset restores the unfiltered result set.
- Mobile filters use a bottom sheet or drawer.

### F3 — Resource cards
**Requirement:** Display academic resources in Polaroid-style cards.  
**Acceptance criteria:**
- Each card includes title, subject and rating.
- Type/unit/year metadata is shown where useful.
- Bookmark toggles state.
- Card click opens the correct detail page.
- Decorative tape/film elements never obscure content.

### F4 — Note details
**Requirement:** Show enough information to judge usefulness.  
**Acceptance criteria:**
- Title, subject, type, unit/topic, academic year and description appear.
- Preview and related resources are shown when available.
- Download, Save and Share have real behavior or an honest prototype fallback.
- Back navigation returns to the previous browse context.

### F5 — Upload notes
**Requirement:** Provide an upload button and submission form.  
**Acceptance criteria:**
- Required fields are validated.
- Supported file types and size guidance are shown.
- Success/error feedback is visible.
- If no backend exists, the UI explicitly treats submission as a local demo and does not falsely claim server upload.

### F6 — Bookmarks and collections
**Requirement:** Let students save and organize resources.  
**Acceptance criteria:**
- Bookmark state changes immediately.
- Saved items appear in Bookmarks/Collections.
- Create collection and add/remove resource interactions work.
- Empty states are designed.

### F7 — Exam Rescue Mode
**Requirement:** Provide a useful revision workflow.  
**Acceptance criteria:**
- Subject and exam date can be selected.
- Missing required input triggers validation.
- Generate Plan displays a sample revision checklist and relevant resources.
- Checklist toggles completion and progress updates.
- The plan is identified as demo-generated.

### F8 — Responsive layout
**Requirement:** Work on phone and desktop.  
**Acceptance criteria:**
- No horizontal overflow at 360px, 390px, 430px, tablet and desktop widths.
- Mobile bottom navigation is usable.
- Search, filters, cards and forms remain readable.
- Touch targets are appropriately sized.

## 10. Information architecture
- Home
- Explore Notes
  - All Notes
  - PYQs
  - Revision Guides
  - Handwritten Notes
- Note Details
- Exam Rescue Mode
- My Collections
- Bookmarks
- Upload Notes
- Profile/Menu

## 11. Content model for mock data
Each resource should include:
- `id`
- `title`
- `subject`
- `unitOrTopic`
- `resourceType`
- `academicYear`
- `description`
- `rating`
- `reviewCount`
- `previewImage`
- `fileName` or demo download target
- `tags`
- `uploadedBy` (sample profile)
- `isBookmarked`
- `createdAt`

Use plausible sample resources such as Machine Learning Unit 1 Notes, DBMS PYQs, Data Structures Handwritten Notes, Operating Systems Revision Guide, Computer Networks Short Notes and Engineering Maths Formulas & PYQs. Clearly treat names, ratings, authors and counts as demo content.

## 12. Visual requirements
Follow `design.md` exactly:
- White-dominant backgrounds.
- Brand palette: green `#89BC62`, white `#FFFFFF`, pink `#DD88C1`, blue `#407ADD`.
- Photography-only decorations: Polaroids, film strips, camera/lens icons, tape, handwritten photo captions and contact sheets.
- **No leaves, plants, flowers, vines or nature decorations.**
- Use readable sans-serif UI text and restrained handwritten accents.
- Keep controls clean and content readable.
- Mobile-first design.

## 13. Suggested implementation approach
Use the stack most comfortable for rapid iteration. A reasonable default is React + Vite + TypeScript + Tailwind CSS, but the brief does not mandate a stack. Keep the app frontend-only with local mock data unless a backend is genuinely needed.

Suggested implementation order:
1. Establish app shell, colors, typography and responsive navigation.
2. Create mock resource data.
3. Implement Home and Explore/search/filter.
4. Implement Note Details and bookmarks.
5. Implement Collections.
6. Implement Upload form and validation.
7. Implement Exam Rescue Mode.
8. Add empty/error states and subtle interactions.
9. Test mobile and desktop flows.
10. Deploy and test the public URL in a private/incognito window.

## 14. Quality checklist before submission
- [ ] Home page clearly explains the product.
- [ ] Search is obvious and functional.
- [ ] Subject/year/type filters work.
- [ ] Cards show title, subject and rating.
- [ ] Bookmark and collection interactions work.
- [ ] Upload form validates and gives feedback.
- [ ] Main buttons and links are not dead.
- [ ] Photography theme is consistent and contains no botanical decorations.
- [ ] Exact four-color palette is used.
- [ ] Mobile layout works at common widths.
- [ ] Empty states are present.
- [ ] No placeholder or mock behavior is misrepresented as real.
- [ ] Deployment link opens publicly.
- [ ] Submission note explains the problem, solution and unique idea.

## 15. Competition submission note draft
“Notes in Frame is a student-focused hub for discovering and organizing lecture notes, previous-year papers and revision resources. It combines searchable academic resources with a photography-inspired Polaroid Knowledge Wall and an Exam Rescue workflow that turns saved resources into a practical revision checklist. The prototype uses sample data to demonstrate the complete student journey.”
