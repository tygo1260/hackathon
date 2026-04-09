import { DesignPrinciple } from '../../types/index.js';
import { DesignCategory } from '../../types/category.js';

/**
 * Accessibility Principles
 * Based on WCAG 2.1 guidelines and inclusive design practices
 */
export const accessibilityPrinciples: DesignPrinciple[] = [
  {
    id: 'accessibility-color-contrast',
    name: 'Color Contrast Requirements',
    category: DesignCategory.ACCESSIBILITY,
    subcategory: 'wcag',
    summary:
      'Text and interactive elements must have sufficient contrast against their backgrounds. WCAG AA requires 4.5:1 for normal text, 3:1 for large text.',
    description:
      'WCAG requires minimum contrast ratios: 4.5:1 for normal text (under 18pt or 14pt bold) and 3:1 for large text (18pt+ or 14pt+ bold). UI components and graphical objects need 3:1 contrast against adjacent colors. AAA level requires 7:1 and 4.5:1 respectively.',
    rationale:
      'Low contrast makes content hard or impossible to read for users with low vision, color blindness, or those in challenging lighting conditions. Sufficient contrast benefits everyone, especially on mobile in bright sunlight.',
    examples: {
      good: [
        'Black (#000) text on white (#fff) - 21:1 ratio',
        'Dark gray (#333) on light backgrounds - typically 10:1+',
        'High-contrast focus indicators',
        'Button text clearly readable against button color',
        'Error text that contrasts with both background and nearby elements',
        'Placeholder text at 4.5:1 (not light gray)',
      ],
      bad: [
        'Light gray text on white (#ccc on #fff - 1.6:1)',
        'Medium gray placeholder text (#999)',
        'Colored text on colored backgrounds without checking ratio',
        'Focus indicators that don\'t meet 3:1',
        'Disabled states that fail contrast entirely',
      ],
    },
    applications: [
      'Text styling',
      'Button design',
      'Form inputs',
      'Focus indicators',
      'Status messages',
      'Dark mode design',
    ],
    relatedPrinciples: ['contrast', 'accessibility-color-independence', 'visual-hierarchy'],
    tags: ['accessibility', 'wcag', 'contrast', 'color', 'readability', 'a11y'],
    source: 'WCAG 2.1 - Success Criterion 1.4.3 (Contrast Minimum)',
    importance: 'critical',
  },
  {
    id: 'accessibility-color-independence',
    name: 'Color Independence',
    category: DesignCategory.ACCESSIBILITY,
    subcategory: 'wcag',
    summary:
      'Don\'t rely on color alone to convey information. Use additional indicators like text, icons, or patterns.',
    description:
      'Information conveyed by color must also be available through other means. This ensures colorblind users and those using monochrome displays can understand the interface. Color can enhance but not be the sole indicator.',
    rationale:
      'Approximately 8% of men and 0.5% of women have some form of color vision deficiency. Relying on color alone excludes these users from critical information.',
    examples: {
      good: [
        'Error fields with red AND an error icon/text',
        'Form validation with text message, not just color change',
        'Charts with patterns/labels, not just colors',
        'Required field indicator: asterisk + color',
        'Success states with checkmark AND green',
        'Links underlined, not just colored',
      ],
      bad: [
        'Required fields indicated only by red asterisk',
        'Error states shown only by red border',
        'Data charts differentiated only by color',
        'Links distinguished only by color',
        'Traffic light indicators without labels',
      ],
    },
    applications: [
      'Form validation',
      'Status indicators',
      'Data visualization',
      'Navigation states',
      'Link styling',
      'Required field indicators',
    ],
    relatedPrinciples: ['accessibility-color-contrast', 'visibility-of-system-status'],
    tags: ['accessibility', 'wcag', 'color-blindness', 'color', 'indicators', 'a11y'],
    source: 'WCAG 2.1 - Success Criterion 1.4.1 (Use of Color)',
    importance: 'critical',
  },
  {
    id: 'accessibility-keyboard-navigation',
    name: 'Keyboard Navigation',
    category: DesignCategory.ACCESSIBILITY,
    subcategory: 'keyboard',
    summary:
      'All functionality must be accessible via keyboard. Users must be able to navigate, interact, and escape without a mouse.',
    description:
      'Every interactive element must be reachable and operable via keyboard. Focus must be visible and follow a logical order. Users must be able to escape any component (like modals) without getting trapped. Standard keyboard patterns (Tab, Enter, Escape, Arrow keys) should work as expected.',
    rationale:
      'Many users cannot use a mouse—including those with motor disabilities, screen reader users, and power users who prefer keyboard. Keyboard accessibility is fundamental to an inclusive interface.',
    examples: {
      good: [
        'All buttons and links focusable via Tab',
        'Visible focus indicators on all interactive elements',
        'Logical tab order following visual layout',
        'Modal dialogs trapping focus and closeable with Escape',
        'Custom components following ARIA patterns',
        'Skip links for repetitive navigation',
      ],
      bad: [
        'Interactive elements only clickable, not focusable',
        'No visible focus indicators',
        'Tab order jumping randomly around page',
        'Keyboard traps users can\'t escape',
        'Custom widgets without keyboard support',
        'Relying solely on hover states',
      ],
    },
    applications: [
      'Navigation design',
      'Modal dialogs',
      'Custom components',
      'Form controls',
      'Menus and dropdowns',
      'Focus management',
    ],
    relatedPrinciples: ['user-control-and-freedom', 'accessibility-focus-visible'],
    tags: ['accessibility', 'wcag', 'keyboard', 'focus', 'navigation', 'a11y'],
    source: 'WCAG 2.1 - Success Criterion 2.1.1 (Keyboard)',
    importance: 'critical',
  },
  {
    id: 'accessibility-focus-visible',
    name: 'Visible Focus Indicators',
    category: DesignCategory.ACCESSIBILITY,
    subcategory: 'keyboard',
    summary:
      'Interactive elements must have a visible focus state. Users navigating by keyboard must always know where they are.',
    description:
      'When an element receives keyboard focus, there must be a visible indicator. Default browser focus rings should not be removed without providing an alternative. Custom focus styles should meet 3:1 contrast and be clearly visible.',
    rationale:
      'Keyboard users are lost without visible focus. Removing focus indicators for aesthetics makes interfaces unusable for many users. Well-designed focus states can be attractive and functional.',
    examples: {
      good: [
        'Default browser focus ring preserved',
        'Custom focus ring with high contrast',
        'Focus ring offset from element for visibility',
        'Focus state distinct from hover state',
        'Focus visible in both light and dark modes',
        'Focus indicator that meets 3:1 contrast',
      ],
      bad: [
        'outline: none without replacement',
        'Focus only shown as subtle color change',
        'Focus indicator that blends with background',
        'Focus rings removed for cleaner look',
        'Focus styles that match hover (indistinguishable)',
      ],
    },
    applications: [
      'Button focus states',
      'Link focus states',
      'Form input focus',
      'Custom component focus',
      'Dark mode focus',
      'Global focus styles',
    ],
    relatedPrinciples: ['accessibility-keyboard-navigation', 'contrast', 'visibility-of-system-status'],
    tags: ['accessibility', 'wcag', 'focus', 'keyboard', 'outline', 'a11y'],
    source: 'WCAG 2.1 - Success Criterion 2.4.7 (Focus Visible)',
    importance: 'critical',
  },
  {
    id: 'accessibility-touch-targets',
    name: 'Touch Target Size',
    category: DesignCategory.ACCESSIBILITY,
    subcategory: 'mobile',
    summary:
      'Interactive targets should be at least 44x44 CSS pixels. Adequate size prevents errors and supports users with motor impairments.',
    description:
      'WCAG 2.1 recommends touch targets of at least 44x44 CSS pixels. Apple\'s HIG recommends 44pt, Material Design recommends 48dp. Targets should have spacing to prevent accidental activation of adjacent elements.',
    rationale:
      'Small targets cause frustration and errors for all users, especially those with motor impairments, tremors, or using devices in motion. Larger targets also benefit elderly users and improve general usability.',
    examples: {
      good: [
        'Buttons at least 44x44 pixels',
        'Form checkboxes/radios with large clickable areas',
        'Navigation items with adequate padding',
        'Icon buttons with sufficient hit area',
        'Links with padded clickable region',
        'Spacing between adjacent targets',
      ],
      bad: [
        'Tiny icon buttons (24x24 or smaller)',
        'Text links with no padding',
        'Closely packed buttons easy to mis-tap',
        'Small checkboxes without label click',
        'Navigation items crammed together',
      ],
    },
    applications: [
      'Button sizing',
      'Mobile navigation',
      'Form controls',
      'Icon buttons',
      'Link design',
      'Touch UI patterns',
    ],
    relatedPrinciples: ['fitts-law', 'error-prevention', 'mobile-touch-design'],
    tags: ['accessibility', 'wcag', 'touch', 'mobile', 'target-size', 'a11y'],
    source: 'WCAG 2.1 - Success Criterion 2.5.5 (Target Size)',
    importance: 'high',
  },
  {
    id: 'accessibility-screen-reader',
    name: 'Screen Reader Accessibility',
    category: DesignCategory.ACCESSIBILITY,
    subcategory: 'screen-readers',
    summary:
      'Content must be programmatically accessible to screen readers. Use semantic HTML and ARIA when needed.',
    description:
      'Screen readers interpret page structure and content for visually impaired users. Proper semantic HTML (headings, lists, buttons) provides structure. ARIA attributes fill gaps when HTML semantics are insufficient. Images need alt text, and dynamic content needs live regions.',
    rationale:
      'Screen reader users rely entirely on programmatic content. Without proper markup, interfaces are unusable or confusing for these users.',
    examples: {
      good: [
        'Semantic HTML elements (button, nav, main, article)',
        'Heading hierarchy (h1, h2, h3) for structure',
        'Descriptive alt text for meaningful images',
        'ARIA labels for icon buttons',
        'Live regions for dynamic content updates',
        'Form labels associated with inputs',
      ],
      bad: [
        'div and span with click handlers instead of buttons',
        'Skipped heading levels (h1 to h4)',
        'Images without alt text (or alt="image")',
        'Icon buttons without accessible names',
        'Content changes without announcement',
        'Unlabeled form inputs',
      ],
    },
    applications: [
      'Semantic markup',
      'Image accessibility',
      'Form labeling',
      'Dynamic content',
      'Custom widgets',
      'Page structure',
    ],
    relatedPrinciples: ['accessibility-aria-landmarks', 'match-system-real-world'],
    tags: ['accessibility', 'wcag', 'screen-reader', 'aria', 'semantic', 'a11y'],
    source: 'WCAG 2.1 - Multiple criteria',
    importance: 'critical',
  },
  {
    id: 'accessibility-aria-landmarks',
    name: 'ARIA Landmarks and Roles',
    category: DesignCategory.ACCESSIBILITY,
    subcategory: 'aria',
    summary:
      'Use ARIA landmarks to define page regions. Roles communicate purpose when HTML semantics aren\'t sufficient.',
    description:
      'ARIA landmarks (banner, navigation, main, complementary, contentinfo) help screen reader users navigate page sections. Roles describe the purpose of custom widgets. However, the first rule of ARIA is to use native HTML elements when possible.',
    rationale:
      'Landmarks enable screen reader users to skip to important sections quickly. Roles make custom components understandable. But improper ARIA can make accessibility worse.',
    examples: {
      good: [
        '<main> for primary content (role="main")',
        '<nav> for navigation (role="navigation")',
        '<header> for page header (role="banner")',
        '<footer> for page footer (role="contentinfo")',
        'role="search" for search forms',
        'role="alert" for important messages',
      ],
      bad: [
        'Missing landmarks on page',
        'Using role="button" instead of <button>',
        'Incorrect roles that mislead',
        'ARIA that conflicts with native semantics',
        'Over-using landmarks (every section)',
      ],
    },
    applications: [
      'Page structure',
      'Navigation design',
      'Search components',
      'Alert messages',
      'Custom widgets',
      'Region labeling',
    ],
    relatedPrinciples: ['accessibility-screen-reader', 'match-system-real-world'],
    tags: ['accessibility', 'wcag', 'aria', 'landmarks', 'roles', 'a11y'],
    source: 'WAI-ARIA Practices',
    importance: 'high',
  },
  {
    id: 'accessibility-motion-preference',
    name: 'Respecting Motion Preferences',
    category: DesignCategory.ACCESSIBILITY,
    subcategory: 'wcag',
    summary:
      'Honor prefers-reduced-motion setting. Provide controls to pause, stop, or hide moving content.',
    description:
      'Some users experience motion sickness, vestibular disorders, or distraction from animations. The prefers-reduced-motion media query should disable or reduce non-essential animations. Users should be able to control auto-playing content.',
    rationale:
      'Motion can cause physical discomfort or trigger seizures in sensitive users. Respecting motion preferences is both an accessibility requirement and user comfort consideration.',
    examples: {
      good: [
        'Using prefers-reduced-motion media query',
        'Providing animation toggle in settings',
        'Pause/stop buttons for carousels and videos',
        'Essential animations that remain subtle',
        'Instant transitions when reduced motion preferred',
        'No flashing content above 3 times per second',
      ],
      bad: [
        'Ignoring prefers-reduced-motion',
        'Auto-playing animations without controls',
        'Parallax effects without opt-out',
        'Rapidly flashing content',
        'Continuous motion that can\'t be stopped',
      ],
    },
    applications: [
      'Animation systems',
      'Page transitions',
      'Loading animations',
      'Carousels and sliders',
      'Video auto-play',
      'Scroll effects',
    ],
    relatedPrinciples: ['user-control-and-freedom', 'flexibility-and-efficiency'],
    tags: ['accessibility', 'wcag', 'motion', 'animation', 'vestibular', 'a11y'],
    source: 'WCAG 2.1 - Success Criterion 2.3.3 (Animation from Interactions)',
    importance: 'high',
  },
  {
    id: 'accessibility-text-resize',
    name: 'Text Resizing Support',
    category: DesignCategory.ACCESSIBILITY,
    subcategory: 'wcag',
    summary:
      'Text should be resizable up to 200% without loss of content or functionality. Use relative units.',
    description:
      'Users with low vision need to enlarge text. Content should remain functional when text is resized up to 200%. Use relative units (rem, em, %) instead of fixed pixels for font sizes. Layouts should accommodate larger text.',
    rationale:
      'Fixed font sizes prevent users from enlarging text to their needs. Layouts that break at larger sizes make content inaccessible to users who require larger text.',
    examples: {
      good: [
        'Font sizes in rem or em units',
        'Containers that expand with content',
        'Line heights as relative values (1.5, not 24px)',
        'Media queries that respond to text zoom',
        'Text that reflows rather than truncates',
        'Testing at 200% zoom level',
      ],
      bad: [
        'Font sizes in fixed pixels',
        'Fixed-height containers that clip text',
        'Layouts that break at larger text sizes',
        'Text that overflows its container',
        'Important text that gets truncated',
      ],
    },
    applications: [
      'Typography systems',
      'Layout design',
      'Container sizing',
      'Responsive design',
      'Form design',
      'Navigation design',
    ],
    relatedPrinciples: ['responsive-design', 'typography-hierarchy'],
    tags: ['accessibility', 'wcag', 'text-size', 'zoom', 'responsive', 'a11y'],
    source: 'WCAG 2.1 - Success Criterion 1.4.4 (Resize text)',
    importance: 'high',
  },
  {
    id: 'accessibility-form-labels',
    name: 'Form Labeling and Instructions',
    category: DesignCategory.ACCESSIBILITY,
    subcategory: 'forms',
    summary:
      'All form inputs must have accessible labels. Provide clear instructions and error messages.',
    description:
      'Every form input needs an associated label that screen readers can announce. Labels should be visible (not just placeholders) and clearly describe what to enter. Group related fields and provide instructions upfront. Error messages should identify the field and suggest correction.',
    rationale:
      'Form interactions are critical for most applications. Without proper labels and instructions, forms are unusable for screen reader users and confusing for many others.',
    examples: {
      good: [
        'Visible <label> elements linked to inputs',
        'Fieldsets with legends for grouped controls',
        'Required field indicators (asterisk + text)',
        'Error messages linked to fields with aria-describedby',
        'Instructions before complex fields',
        'Autocomplete attributes for common fields',
      ],
      bad: [
        'Placeholder text as the only label',
        'Unlabeled inputs',
        'Error messages without field identification',
        'Required fields with only color indicator',
        'Instructions that disappear on focus',
      ],
    },
    applications: [
      'Form design',
      'Input fields',
      'Error handling',
      'Required field indication',
      'Form grouping',
      'Help text',
    ],
    relatedPrinciples: ['help-users-recognize-errors', 'error-prevention', 'visibility-of-system-status'],
    tags: ['accessibility', 'wcag', 'forms', 'labels', 'inputs', 'a11y'],
    source: 'WCAG 2.1 - Success Criterion 3.3.2 (Labels or Instructions)',
    importance: 'critical',
  },
  {
    id: 'accessibility-perceivable',
    name: 'Perceivable Content',
    category: DesignCategory.ACCESSIBILITY,
    subcategory: 'wcag',
    summary:
      'Information and UI components must be presentable in ways users can perceive. This is WCAG\'s first principle.',
    description:
      'The Perceivable principle requires that information and interface components must be presented in ways that all users can perceive—whether through vision, hearing, or touch. This includes text alternatives for images, captions for video, and content that can be presented in different ways.',
    rationale:
      'If users cannot perceive content, they cannot interact with it. This principle ensures content is available to users regardless of sensory abilities.',
    examples: {
      good: [
        'Alt text for all meaningful images',
        'Captions and transcripts for video',
        'Text alternatives for complex graphics',
        'Content understandable without color',
        'Sufficient color contrast',
        'Responsive text sizing',
      ],
      bad: [
        'Images of text without alternatives',
        'Video without captions',
        'Audio-only content without transcript',
        'Information conveyed only by color',
        'Low contrast text',
      ],
    },
    applications: [
      'Image accessibility',
      'Video accessibility',
      'Audio accessibility',
      'Color usage',
      'Text alternatives',
      'Sensory characteristics',
    ],
    relatedPrinciples: ['accessibility-color-contrast', 'accessibility-color-independence', 'accessibility-screen-reader'],
    tags: ['accessibility', 'wcag', 'perceivable', 'alt-text', 'captions', 'a11y'],
    source: 'WCAG 2.1 - Principle 1: Perceivable',
    importance: 'critical',
  },
  {
    id: 'accessibility-operable',
    name: 'Operable Interface',
    category: DesignCategory.ACCESSIBILITY,
    subcategory: 'wcag',
    summary:
      'UI components and navigation must be operable. Users must be able to operate interface regardless of input method.',
    description:
      'The Operable principle requires that interface components must be operable by all users. This includes keyboard accessibility, sufficient time for interactions, avoiding content that causes seizures, and providing ways to navigate and find content.',
    rationale:
      'If users cannot operate interface components, the interface is useless to them. This principle ensures all users can interact with content regardless of their abilities.',
    examples: {
      good: [
        'Full keyboard accessibility',
        'Adequate time limits (or ability to extend)',
        'No content that flashes rapidly',
        'Skip navigation links',
        'Clear page titles and headings',
        'Multiple ways to find content',
      ],
      bad: [
        'Mouse-only interactions',
        'Short timeouts without extension option',
        'Flashing content that could trigger seizures',
        'No way to skip repetitive content',
        'Confusing navigation structure',
      ],
    },
    applications: [
      'Keyboard navigation',
      'Time limits',
      'Motion and animation',
      'Navigation design',
      'Focus management',
      'Input methods',
    ],
    relatedPrinciples: ['accessibility-keyboard-navigation', 'accessibility-motion-preference', 'user-control-and-freedom'],
    tags: ['accessibility', 'wcag', 'operable', 'keyboard', 'navigation', 'a11y'],
    source: 'WCAG 2.1 - Principle 2: Operable',
    importance: 'critical',
  },
  {
    id: 'accessibility-understandable',
    name: 'Understandable Content',
    category: DesignCategory.ACCESSIBILITY,
    subcategory: 'wcag',
    summary:
      'Information and UI operation must be understandable. Users must be able to comprehend content and interface.',
    description:
      'The Understandable principle requires that content be readable and comprehensible, and that the interface operates in predictable ways. This includes clear language, consistent navigation, and helpful error messages.',
    rationale:
      'If users cannot understand content or how the interface works, they cannot use it effectively. This principle ensures clarity and predictability.',
    examples: {
      good: [
        'Clear, simple language',
        'Consistent navigation across pages',
        'Predictable UI behavior',
        'Input error identification',
        'Labels and instructions for forms',
        'Page language declared',
      ],
      bad: [
        'Jargon and complex language',
        'Navigation that changes unexpectedly',
        'Confusing or unpredictable interface',
        'Vague error messages',
        'Missing labels and instructions',
      ],
    },
    applications: [
      'Content writing',
      'Navigation design',
      'Form design',
      'Error handling',
      'Consistent patterns',
      'Language declaration',
    ],
    relatedPrinciples: ['consistency-and-standards', 'help-users-recognize-errors', 'match-system-real-world'],
    tags: ['accessibility', 'wcag', 'understandable', 'clarity', 'language', 'a11y'],
    source: 'WCAG 2.1 - Principle 3: Understandable',
    importance: 'critical',
  },
  {
    id: 'accessibility-robust',
    name: 'Robust Content',
    category: DesignCategory.ACCESSIBILITY,
    subcategory: 'wcag',
    summary:
      'Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies.',
    description:
      'The Robust principle requires that content works across different browsers, devices, and assistive technologies. This is achieved through valid HTML, proper ARIA usage, and ensuring compatibility with current and future tools.',
    rationale:
      'Users access content through many different technologies. Robust content ensures it remains accessible as technologies evolve.',
    examples: {
      good: [
        'Valid HTML without parsing errors',
        'Unique ID values',
        'ARIA used correctly',
        'Custom controls with proper semantics',
        'Testing across browsers and assistive tech',
        'Progressive enhancement',
      ],
      bad: [
        'Invalid HTML with parsing errors',
        'Duplicate IDs',
        'Misused ARIA attributes',
        'Custom controls without accessibility',
        'Only testing in one browser',
      ],
    },
    applications: [
      'HTML validation',
      'ARIA implementation',
      'Custom components',
      'Cross-browser testing',
      'Assistive technology testing',
      'Progressive enhancement',
    ],
    relatedPrinciples: ['accessibility-aria-landmarks', 'accessibility-screen-reader'],
    tags: ['accessibility', 'wcag', 'robust', 'html', 'compatibility', 'a11y'],
    source: 'WCAG 2.1 - Principle 4: Robust',
    importance: 'high',
  },
];
