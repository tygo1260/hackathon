import { DesignPattern } from '../../types/index.js';
import { DesignCategory } from '../../types/category.js';

/**
 * Feedback Design Patterns
 * Patterns for communicating system status and responses to users
 */
export const feedbackPatterns: DesignPattern[] = [
  {
    id: 'pattern-toast',
    name: 'Toast Notification',
    category: DesignCategory.USER_INTERFACE,
    type: 'feedback',
    platforms: ['web', 'ios', 'android', 'desktop'],
    problem: 'Users need brief, non-blocking feedback about completed actions or system events.',
    solution:
      'Display a small, temporary message that appears briefly and auto-dismisses. Toasts don\'t require user action and don\'t block interaction.',
    context:
      'Use for confirmations of actions (saved, sent, copied), background events (new message), or non-critical information. Not for errors requiring action.',
    structure: {
      description:
        'A small container with a message, appearing at screen edge (often bottom or top-right). May include icon and dismiss action. Auto-disappears after 3-5 seconds.',
      components: ['Container', 'Message text', 'Icon (optional)', 'Dismiss button (optional)', 'Action button (optional)'],
      variants: [
        'Simple text message',
        'With icon (success/info/warning)',
        'With action button (Undo)',
        'Snackbar (Material Design term)',
        'Stacking multiple toasts',
      ],
    },
    consequences: {
      benefits: [
        'Non-blocking feedback',
        'Low interruption',
        'Confirms actions were received',
        'Disappears automatically',
        'Can include quick actions (undo)',
      ],
      tradeoffs: [
        'Easy to miss if not paying attention',
        'Short duration may be too fast',
        'Position may overlap content',
        'Multiple toasts need queuing strategy',
        'Screen reader timing challenges',
      ],
    },
    examples: [
      { description: '"Changes saved" toast after form submission', platform: 'all' },
      { description: '"Message sent" with Undo action', platform: 'web' },
      { description: '"Copied to clipboard" confirmation', platform: 'all' },
    ],
    relatedPatterns: ['pattern-modal', 'pattern-alert-banner'],
    antiPatterns: [
      'Using for critical errors requiring action',
      'Too much text (keep brief)',
      'Auto-dismissing error messages',
      'Toast obscuring important content',
    ],
    accessibility: [
      'Use role="status" or aria-live="polite"',
      'Don\'t auto-dismiss too quickly (minimum 5 seconds)',
      'Ensure color is not only indicator',
      'Make dismiss button keyboard accessible',
      'Consider pause on hover/focus',
    ],
    tags: ['feedback', 'toast', 'notification', 'snackbar', 'confirmation', 'message'],
  },
  {
    id: 'pattern-modal',
    name: 'Modal Dialog',
    category: DesignCategory.USER_INTERFACE,
    type: 'feedback',
    platforms: ['web', 'ios', 'android', 'desktop'],
    problem: 'Users need to complete a focused task or acknowledge important information before continuing.',
    solution:
      'Display content in a dialog box overlaid on the page. A dimmed backdrop blocks interaction with the underlying page until the modal is closed.',
    context:
      'Use for tasks requiring focus (compose message), confirmations (delete?), important alerts, or subsidiary information. Don\'t overuse—modals interrupt flow.',
    structure: {
      description:
        'A focused dialog box in the viewport center with backdrop overlay. Contains header, content, and action buttons. Traps focus and closes via action or escape.',
      components: ['Backdrop overlay', 'Dialog container', 'Header/Title', 'Content area', 'Action buttons', 'Close mechanism'],
      variants: [
        'Alert dialog (simple message + actions)',
        'Form dialog (contains form)',
        'Full-screen modal (mobile)',
        'Side sheet/drawer',
        'Lightbox (images)',
      ],
    },
    consequences: {
      benefits: [
        'Focuses user attention',
        'Clear call to action',
        'Prevents accidental background interaction',
        'Good for confirmation of destructive actions',
      ],
      tradeoffs: [
        'Interrupts user flow',
        'Blocks underlying content',
        'Can be overused/annoying',
        'Complex focus management',
        'Scrolling can be tricky',
      ],
    },
    examples: [
      { description: 'Confirm delete dialog', platform: 'all' },
      { description: 'Compose new message modal', platform: 'web' },
      { description: 'Image lightbox gallery', platform: 'web' },
    ],
    relatedPatterns: ['pattern-toast', 'pattern-bottom-sheet', 'pattern-alert-banner'],
    antiPatterns: [
      'Modals for non-essential content',
      'Multiple stacked modals',
      'No close mechanism',
      'Excessive content requiring scroll',
    ],
    accessibility: [
      'Use role="dialog" and aria-modal="true"',
      'Trap focus within modal',
      'Return focus to trigger on close',
      'Close on Escape key',
      'Provide accessible title',
      'Inert underlying content',
    ],
    tags: ['feedback', 'modal', 'dialog', 'popup', 'overlay', 'focus'],
  },
  {
    id: 'pattern-loading-spinner',
    name: 'Loading Spinner',
    category: DesignCategory.USER_INTERFACE,
    type: 'feedback',
    platforms: ['web', 'ios', 'android', 'desktop'],
    problem: 'The system is processing and users need to know that their action was received and something is happening.',
    solution:
      'Display an animated indicator (spinner) showing that work is in progress. Optionally include text describing what\'s loading.',
    context:
      'Use when operations take more than ~1 second. For very short waits, no feedback needed. For very long waits, consider progress bars. Always show for uncertain durations.',
    structure: {
      description:
        'An animated circular or linear indicator, optionally with text. May replace content (skeleton) or overlay it.',
      components: ['Animated indicator', 'Loading text (optional)', 'Backdrop (optional)'],
      variants: [
        'Circular spinner',
        'Linear progress bar',
        'Dots/pulse animation',
        'Skeleton screens',
        'Button loading state',
        'Full-page loader',
      ],
    },
    consequences: {
      benefits: [
        'Confirms system received action',
        'Sets expectation of wait',
        'Prevents repeated actions',
        'Reduces perceived wait time',
      ],
      tradeoffs: [
        'Doesn\'t show progress',
        'Unclear how long to wait',
        'Can be overused',
        'May feel slow if shown too eagerly',
      ],
    },
    examples: [
      { description: 'Button spinner while submitting form', platform: 'all' },
      { description: 'Page loading spinner on navigation', platform: 'all' },
      { description: 'Content area spinner while fetching data', platform: 'web' },
    ],
    relatedPatterns: ['pattern-skeleton-loader', 'pattern-progress-indicator', 'pattern-button'],
    antiPatterns: [
      'Showing spinner for <1 second operations',
      'Spinner with no text for long operations',
      'Full-page spinner blocking all interaction',
    ],
    accessibility: [
      'Use aria-busy="true" on loading region',
      'Announce loading to screen readers',
      'Provide text alternative for spinner',
      'Respect prefers-reduced-motion',
      'Announce when loading completes',
    ],
    tags: ['feedback', 'loading', 'spinner', 'progress', 'wait', 'async'],
  },
  {
    id: 'pattern-skeleton-loader',
    name: 'Skeleton Loader',
    category: DesignCategory.USER_INTERFACE,
    type: 'feedback',
    platforms: ['web', 'ios', 'android'],
    problem: 'Content is loading and users need feedback that preserves layout context and feels fast.',
    solution:
      'Display placeholder shapes that match the content structure while loading. These "bones" of content show where text, images, and elements will appear.',
    context:
      'Use instead of spinners when content structure is known. Particularly effective for lists, cards, and content-heavy layouts. Makes loading feel faster.',
    structure: {
      description:
        'Placeholder elements matching the shape and position of expected content. Typically gray boxes with subtle animation (shimmer or pulse).',
      components: ['Placeholder shapes', 'Shimmer animation', 'Container matching final layout'],
      variants: [
        'Text line skeletons',
        'Image placeholders',
        'Card skeletons',
        'List item skeletons',
        'Avatar + text skeletons',
      ],
    },
    consequences: {
      benefits: [
        'Preserves layout stability',
        'Shows content will appear',
        'Feels faster than spinners',
        'Reduces layout shift',
        'Progressive revelation',
      ],
      tradeoffs: [
        'Must match actual content structure',
        'More design/development work',
        'Can feel slow if shown too long',
        'Needs updating if layout changes',
      ],
    },
    examples: [
      { description: 'Facebook feed loading placeholders', platform: 'web' },
      { description: 'YouTube video list skeletons', platform: 'all' },
      { description: 'LinkedIn card loading states', platform: 'web' },
    ],
    relatedPatterns: ['pattern-loading-spinner', 'pattern-card'],
    antiPatterns: [
      'Skeleton that doesn\'t match real content',
      'Skeletons for already-visible content',
      'Overly detailed skeletons',
    ],
    accessibility: [
      'Mark skeleton region as aria-busy="true"',
      'Announce loading to screen readers',
      'Respect prefers-reduced-motion for animation',
      'Announce when content loads',
    ],
    tags: ['feedback', 'loading', 'skeleton', 'placeholder', 'perceived-performance'],
  },
  {
    id: 'pattern-progress-indicator',
    name: 'Progress Indicator',
    category: DesignCategory.USER_INTERFACE,
    type: 'feedback',
    platforms: ['web', 'ios', 'android', 'desktop'],
    problem: 'Users need to understand how far along a process is and how much longer it might take.',
    solution:
      'Show a visual representation of progress, either as a percentage, steps completed, or estimated time remaining.',
    context:
      'Use for operations with known duration or steps. File uploads, multi-step processes, or any measurable progress. Better than spinners for longer operations.',
    structure: {
      description:
        'A bar, circle, or step indicator showing completion. May include percentage, step count, or time remaining.',
      components: ['Progress track', 'Progress fill', 'Percentage/count', 'Labels'],
      variants: [
        'Linear progress bar',
        'Circular progress',
        'Step progress (1 of 5)',
        'Indeterminate (unknown duration)',
        'With cancel option',
      ],
    },
    consequences: {
      benefits: [
        'Shows actual progress',
        'Sets expectations for wait time',
        'More informative than spinner',
        'Can show estimated completion',
        'Reduces anxiety during long waits',
      ],
      tradeoffs: [
        'Needs accurate progress data',
        'Inaccurate estimates frustrate users',
        'Takes more space than spinner',
      ],
    },
    examples: [
      { description: 'File upload progress bar', platform: 'all' },
      { description: 'Download progress in app store', platform: 'ios' },
      { description: 'Setup wizard step indicator', platform: 'all' },
    ],
    relatedPatterns: ['pattern-loading-spinner', 'pattern-multi-step-form'],
    antiPatterns: [
      'Fake progress (filling to 90% then waiting)',
      'No feedback for stalled progress',
      'Progress that goes backwards',
    ],
    accessibility: [
      'Use role="progressbar"',
      'Set aria-valuenow, aria-valuemin, aria-valuemax',
      'Announce progress at intervals',
      'Provide text alternative',
      'Announce completion',
    ],
    tags: ['feedback', 'progress', 'loading', 'upload', 'steps', 'indicator'],
  },
  {
    id: 'pattern-empty-state',
    name: 'Empty State',
    category: DesignCategory.USER_INTERFACE,
    type: 'feedback',
    platforms: ['web', 'ios', 'android', 'desktop'],
    problem: 'A section has no content to display and users might be confused about why or what to do.',
    solution:
      'Display a helpful message explaining the empty state and provide clear actions for creating content or understanding why it\'s empty.',
    context:
      'Use for empty lists, search results with no matches, blank dashboards, and first-time experiences. Every empty state is an opportunity to guide users.',
    structure: {
      description:
        'An illustration or icon, explanatory text, and call-to-action button. Centered in the empty area.',
      components: ['Illustration/Icon', 'Headline', 'Description', 'Call-to-action'],
      variants: [
        'First-time/blank slate',
        'No search results',
        'Empty folder/list',
        'No notifications',
        'Error-caused empty state',
      ],
    },
    consequences: {
      benefits: [
        'Educates users about feature',
        'Provides clear next steps',
        'Opportunity for delight',
        'Reduces confusion',
        'Can improve activation',
      ],
      tradeoffs: [
        'Design effort for each empty state',
        'Illustrations add page weight',
        'Text must be helpful',
      ],
    },
    examples: [
      { description: 'No messages yet - Start a conversation', platform: 'all' },
      { description: 'No search results - Try different keywords', platform: 'all' },
      { description: 'Empty inbox - Enjoy your day!', platform: 'all' },
    ],
    relatedPatterns: ['pattern-onboarding', 'pattern-error-page'],
    antiPatterns: [
      'Just showing "No items"',
      'Empty state with no guidance',
      'Overly playful for serious contexts',
    ],
    accessibility: [
      'Alternative text for illustrations',
      'Clear heading structure',
      'Accessible call-to-action',
      'Announce to screen readers',
    ],
    tags: ['feedback', 'empty', 'blank', 'first-run', 'onboarding', 'guidance'],
  },
  {
    id: 'pattern-error-message',
    name: 'Error Message',
    category: DesignCategory.USER_INTERFACE,
    type: 'feedback',
    platforms: ['web', 'ios', 'android', 'desktop'],
    problem: 'Something went wrong and users need to understand what happened and how to fix it.',
    solution:
      'Display a clear message explaining the error in plain language and suggest specific corrective actions.',
    context:
      'Use for any error condition—form validation, system errors, network issues. The message should be helpful, not technical. Position near the error source.',
    structure: {
      description:
        'An error indicator (icon, color), clear message, and recovery action. For form errors, appears near the field.',
      components: ['Error icon', 'Error message', 'Recovery suggestion', 'Retry action (if applicable)'],
      variants: [
        'Inline field error',
        'Form-level error summary',
        'Page error (404, 500)',
        'Network error',
        'Toast error',
      ],
    },
    consequences: {
      benefits: [
        'Users understand what went wrong',
        'Provides path to recovery',
        'Reduces frustration',
        'Builds trust through transparency',
      ],
      tradeoffs: [
        'Must write good error messages',
        'Need to handle many error types',
        'Security balance (don\'t reveal too much)',
      ],
    },
    examples: [
      { description: 'Password too short - Use at least 8 characters', platform: 'all' },
      { description: 'Network error - Check connection and try again', platform: 'all' },
      { description: '404 - Page not found, here are some alternatives', platform: 'web' },
    ],
    relatedPatterns: ['pattern-inline-validation', 'pattern-error-page', 'pattern-toast'],
    antiPatterns: [
      'Technical error codes without explanation',
      '"Something went wrong" with no details',
      'Blaming the user',
      'Error without recovery path',
    ],
    accessibility: [
      'Use role="alert" for important errors',
      'Associate with field via aria-describedby',
      'Don\'t rely only on color',
      'Keep visible (don\'t auto-dismiss)',
      'Announce dynamically added errors',
    ],
    tags: ['feedback', 'error', 'validation', 'message', 'help', 'recovery'],
  },
  {
    id: 'pattern-alert-banner',
    name: 'Alert Banner',
    category: DesignCategory.USER_INTERFACE,
    type: 'feedback',
    platforms: ['web', 'ios', 'android', 'desktop'],
    problem: 'Users need to be informed about important system-wide information or required actions.',
    solution:
      'Display a prominent banner across the top of the page or section conveying important information. Persists until dismissed or condition is resolved.',
    context:
      'Use for system status (maintenance), required actions (verify email), warnings, or announcements. More prominent than toasts, less blocking than modals.',
    structure: {
      description:
        'A full-width banner, typically at top of page, with message, severity indication, and optional actions.',
      components: ['Banner container', 'Icon', 'Message', 'Action buttons', 'Dismiss button'],
      variants: [
        'Info banner (blue)',
        'Success banner (green)',
        'Warning banner (yellow/amber)',
        'Error/critical banner (red)',
        'Neutral announcement',
      ],
    },
    consequences: {
      benefits: [
        'Highly visible',
        'Persists until acknowledged',
        'Good for important info',
        'Can include actions',
      ],
      tradeoffs: [
        'Takes vertical space',
        'Can be ignored after time',
        'Must be carefully styled to not alarm',
        'Multiple banners are problematic',
      ],
    },
    examples: [
      { description: 'Scheduled maintenance warning', platform: 'web' },
      { description: 'Email verification required', platform: 'all' },
      { description: 'New feature announcement', platform: 'all' },
    ],
    relatedPatterns: ['pattern-toast', 'pattern-modal'],
    antiPatterns: [
      'Multiple banners stacking',
      'Banners for minor info (use toast)',
      'No dismiss option for non-critical',
    ],
    accessibility: [
      'Use role="alert" or appropriate landmark',
      'Ensure color is not only indicator',
      'Dismiss button accessible',
      'Announce important banners',
      'Maintain focus management',
    ],
    tags: ['feedback', 'alert', 'banner', 'notification', 'warning', 'info'],
  },
];
