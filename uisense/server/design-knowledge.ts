/**
 * Design knowledge context extracted from the UI/UX Design MCP Server.
 * This provides Claude with expert design literature to ground its analysis.
 */

export const DESIGN_KNOWLEDGE_CONTEXT = `
## DESIGN PRINCIPLES KNOWLEDGE BASE
You must cite these principles when making recommendations.

### Nielsen's 10 Usability Heuristics (Source: Jakob Nielsen)
1. **Visibility of System Status** — Keep users informed through timely feedback.
2. **Match Between System and Real World** — Use familiar language and conventions.
3. **User Control and Freedom** — Support undo and redo. Provide clear exits.
4. **Consistency and Standards** — Follow platform and industry conventions.
5. **Error Prevention** — Prevent errors through constraints and confirmations.
6. **Recognition Rather Than Recall** — Make options visible. Minimize memory load.
7. **Flexibility and Efficiency of Use** — Accommodate both novice and expert users.
8. **Aesthetic and Minimalist Design** — Only show relevant information. Every element should serve a purpose.
9. **Help Users Recognize and Recover from Errors** — Clear error messages with solutions.
10. **Help and Documentation** — Provide searchable, task-focused help.

### Gestalt Principles of Visual Perception (Source: Wertheimer, 1923)
1. **Proximity** — Elements near each other are perceived as grouped. Use spacing to create relationships.
2. **Similarity** — Elements sharing visual characteristics (color, shape, size) are perceived as related.
3. **Continuity** — The eye follows smooth paths. Align elements along clear lines or curves.
4. **Closure** — The mind completes incomplete shapes. Use implied boundaries.
5. **Figure-Ground** — Users distinguish foreground from background. Ensure clear separation.
6. **Common Region** — Elements within a boundary are grouped. Use containers for logical grouping.
7. **Focal Point** — Distinctive elements attract attention. Use contrast to create entry points.
8. **Symmetry** — Symmetric layouts feel balanced and harmonious.

### Laws of UX (Source: Jon Yablonski)
1. **Fitts's Law** — Larger, closer targets are easier to interact with. Make important buttons large.
2. **Hick's Law** — Decision time increases with choices. Reduce options to reduce cognitive load.
3. **Jakob's Law** — Users prefer sites that work like others they know.
4. **Miller's Law** — Average person can hold 7±2 items in working memory. Chunk information.
5. **Law of Prägnanz** — People interpret ambiguous images in their simplest form.
6. **Von Restorff Effect** — Items that stand out are more likely to be remembered. Use for CTAs.
7. **Serial Position Effect** — People best remember first and last items in a series.
8. **Doherty Threshold** — Productivity soars when response time < 400ms.
9. **Tesler's Law** — Every system has inherent complexity that cannot be removed, only transferred.
10. **Postel's Law** — Be liberal in what you accept, conservative in what you output.
11. **Peak-End Rule** — People judge an experience by its peak and end, not the average.

### Visual Design Principles
1. **Visual Hierarchy** — Arrange elements by importance using size, color, contrast, spacing.
2. **Contrast** — WCAG requires minimum 4.5:1 for normal text, 3:1 for large text.
3. **Whitespace** — Use negative space to reduce cognitive load, improve readability, create grouping.
4. **Color Theory** — Use 60-30-10 color distribution. Limit palette. Use color meaningfully.
5. **Alignment** — Align elements to a grid. Left-align text for readability.
6. **Repetition** — Repeat visual styles for consistency.
7. **Balance** — Distribute visual weight evenly (symmetric or asymmetric).

### Typography Principles
1. **Typographic Scale** — Use mathematical ratios (1.25, 1.333, 1.5) for harmonious sizes.
2. **Readability** — Body text ≥ 16px. Line height 1.4-1.6. Line length 45-75 characters.
3. **Font Pairing** — Pair contrasting fonts (serif + sans-serif). Max 2-3 fonts.
4. **Hierarchy** — Create clear levels: display, h1-h6, body, caption. Minimum 2 levels distinction.
5. **Measure** — Optimal line width 45-75 characters for comfortable reading.

### Accessibility (WCAG 2.1)
1. **Color Contrast** — 4.5:1 minimum for normal text, 3:1 for large text (AA level).
2. **Keyboard Navigation** — All interactive elements must be keyboard accessible.
3. **Focus Indicators** — Visible focus states on all interactive elements.
4. **Alt Text** — All meaningful images must have descriptive alt text.
5. **Semantic HTML** — Use proper heading hierarchy, landmarks, and ARIA roles.
6. **Touch Targets** — Minimum 44x44px for touch targets.
7. **Motion** — Respect prefers-reduced-motion. Avoid auto-playing animations.

## DESIGN PATTERNS

### Navigation Patterns
- **Tabs** — For 2-7 categories of related content. Horizontal layout preferred.
- **Sidebar Navigation** — For complex apps with many sections. Persistent access.
- **Breadcrumbs** — Show user's location in hierarchy. Aid wayfinding.
- **Bottom Navigation** — For mobile apps. 3-5 top-level destinations.
- **Mega Menu** — For large sites with many categories. Group related items.
- **Search** — Universal access pattern. Auto-complete improves efficiency.

### Layout Patterns
- **Card Layout** — Group related content in contained units. Use for collections.
- **Grid System** — Consistent column-based layout. 12-column grid common for web.
- **Split View** — Show two related views side by side. Master-detail pattern.
- **Hero Section** — Large prominent area for primary message. Use for landing pages.
- **F-Pattern / Z-Pattern** — Follow natural eye-scanning patterns for content layout.
- **Holy Grail Layout** — Header, footer, main content with sidebars.
- **Sticky Elements** — Keep important elements visible during scroll.

### Feedback Patterns
- **Toast Notifications** — Brief, non-blocking messages for confirmations.
- **Progress Indicators** — Show progress for multi-step processes.
- **Skeleton Screens** — Show layout placeholders during loading (better than spinners).
- **Empty States** — Guide users when there's no content yet.
- **Error States** — Clear error messages with recovery actions.

### Form Patterns
- **Inline Validation** — Validate fields as user completes them.
- **Progressive Disclosure** — Show fields progressively based on context.
- **Smart Defaults** — Pre-fill likely values to reduce effort.
- **Single Column Forms** — One field per row for better completion rates.
`;

export function getDesignKnowledgeForAnalysis(): string {
  return DESIGN_KNOWLEDGE_CONTEXT;
}
