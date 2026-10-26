# Design System — Notes in Frame

## 1. Product identity
- **Product name:** Notes in Frame
- **Competition track:** Campus Notes Hub (SASC PixelRush)
- **Tagline:** Your campus knowledge, captured one frame at a time.
- **Core idea:** A student notes and previous-year-question-paper library presented through a photography-inspired Polaroid and film aesthetic.
- **Design principle:** Photography is the visual language of the product, not a distraction from finding and using study resources.

## 2. Competition alignment
The interface must satisfy the Campus Notes Hub brief:
- Prominent, easy-to-find search.
- Subject and academic-year filters.
- Resource cards showing title, subject and rating.
- Upload button/form.
- Bookmarking and/or dark mode as an extra.
- Responsive mobile and desktop layouts.
- Simple navigation and functional buttons/links.
- Use mock data where needed; a real backend, database, login or payments are not required.
- Add a clear unique idea and explain it in the submission note.

Judging priorities from the challenge brief:
- Ease of use and flow: 30 marks.
- Creativity and originality: 25 marks.
- Visual design: 25 marks.
- Responsiveness: 10 marks.
- Idea explanation: 10 marks.

## 3. Exact color palette
Use only these brand colors as the UI color palette:
- **Green:** `#89BC62` — primary actions, active filters, progress and success indicators.
- **White:** `#FFFFFF` — main page background, resource surfaces and negative space.
- **Daisy pink:** `#DD88C1` — tape, favorite states, stickers, small highlights and secondary accents.
- **Sky blue:** `#407ADD` — links, selected secondary actions, film/camera accents and informational banners.

Neutral black/gray may be used only for readable text, borders, and disabled states. Do not introduce additional decorative colors. Photographs and note preview images can retain their natural colors.

### Color usage rules
- Keep white as the dominant background.
- Use green for the main CTA; do not make every button a different color.
- Use pink and blue as accents, not large competing blocks.
- Maintain readable contrast. Avoid white text on pale pink or pale green.
- Active state must not rely on color alone; also use a label, icon or border.
- Avoid cream as the main page background; the user prefers white.

## 4. Photography-only visual language
**Allowed motifs**
- Polaroid frames and instant-photo borders.
- 35mm film strips, contact sheets and film negatives.
- Camera icons, instant cameras, camera viewfinder corners and focus marks.
- Shutter, aperture, lens and focus-ring motifs.
- Washi tape holding photographs or notes.
- Handwritten captions, date stamps, frame numbers and photo labels.
- Photo prints, stacked photographs and darkroom-inspired details.
- Small star/sparkle stickers only when they feel like camera/film embellishments.

**Do not use**
- Leaves, plants, flowers, vines or other nature-themed decorations.
- Generic botanical scrapbook elements.
- Unrelated decorative illustrations.
- Overly heavy film strips behind important text or controls.

## 5. Typography
- Use a highly legible sans-serif for interface labels, body copy, forms, filters and resource metadata.
- Use a restrained handwritten/script font only for the brand wordmark, short captions and occasional editorial headings.
- Keep body text readable on mobile; target 16px where practical and never make essential labels tiny.
- Use consistent type scale and line height. Avoid using handwritten fonts for long paragraphs or form labels.

## 6. Layout and components
### App shell
- White background.
- Compact wordmark: `notes in frame.`
- Small camera or frame icon near the wordmark.
- Consistent header and spacing across pages.
- Soft shadows and thin neutral borders; use rounded corners moderately.
- Keep the scrapbook look around resource cards, not on every component.

### Polaroid resource card
Each card should include:
- Photo/preview image area.
- Small tape accent at top, colored green, pink or blue.
- Resource title.
- Subject/unit/type metadata.
- Rating and review count (mock values must be clearly demo content).
- Bookmark control.
- Optional tiny film-frame label or frame number.

Cards may have subtle rotation at rest, but use minimal rotation in dense grids. On hover/focus, straighten the card and raise it slightly. On touch devices, do not rely on hover.

### Buttons
- Primary: green background, readable dark text or high-contrast text based on contrast check.
- Secondary: white background with neutral border.
- Informational/tertiary links: blue.
- Favorite/selected sticker: pink.
- Every button must perform an action or be clearly disabled.

### Photography interactions
- Click/tap a Polaroid to open its resource details.
- Optional subtle photo-reveal transition (short and reduced-motion aware).
- Bookmark toggles saved state.
- Film strip is decorative only and must not interfere with touch targets.
- Do not animate continuously; respect reduced-motion settings.

## 7. Required responsive behavior
### Mobile-first
- Test at 360px, 390px and 430px widths.
- Use a two-column resource grid when cards remain readable; collapse to one column on very narrow screens or when content needs more space.
- Fixed bottom navigation on mobile: Home, Explore, central Upload (+), Collections, Profile.
- Filters open in a bottom sheet or full-screen drawer.
- Keep the main search visible near the top.
- Use 44px minimum touch targets where practical.
- Avoid horizontal overflow and ensure forms are comfortable to fill.

### Desktop
- Header navigation across top.
- Optional left sidebar for categories.
- Three-column resource grid when viewport allows.
- Detail page can use a two-column layout: preview/content and metadata/actions.

## 8. Accessibility and quality
- Use semantic headings and labels.
- Keyboard-accessible navigation and controls.
- Visible focus indicators.
- Alt text for meaningful preview images.
- Don't encode status by color alone.
- Ensure adequate contrast and readable line lengths.
- Provide empty, loading, and error states.
- Avoid layout shifts when images load.
- Keep page performance fast by using optimized/local demo images where possible.

## 9. Suggested component inventory
- `AppHeader`
- `DesktopSidebar`
- `MobileBottomNav`
- `SearchBar`
- `SubjectChips`
- `FilterSheet`
- `ResourcePolaroidCard`
- `ResourceGrid`
- `BookmarkButton`
- `RatingSummary`
- `ResourceDetail`
- `UploadResourceForm`
- `CollectionCard`
- `ExamRescuePanel`
- `RevisionChecklist`
- `EmptyState`
- `Toast/InlineFeedback`

## 10. Content and voice
Friendly, clear and student-centered. Use concise microcopy:
- “Find your next Aha! moment.”
- “Your campus knowledge, captured one frame at a time.”
- “Save it for exam day.”
- “Build your study wall.”
- “Share notes. Help your campus.”
Avoid overpromising AI capabilities or implying demo resources are verified real uploads.
