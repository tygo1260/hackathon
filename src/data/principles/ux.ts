import { DesignPrinciple } from '../../types/index.js';
import { DesignCategory } from '../../types/category.js';

/**
 * Nielsen's 10 Usability Heuristics
 * Based on Jakob Nielsen's widely-recognized heuristics for UI design
 */
export const nielsenHeuristics: DesignPrinciple[] = [
  {
    id: 'visibility-of-system-status',
    name: 'Visibility of System Status',
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'heuristics',
    summary:
      'The design should always keep users informed about what is going on, through appropriate feedback within a reasonable amount of time.',
    description:
      'Users should never have to wonder about the current state of the system. Provide clear, timely feedback for every user action. This includes loading states, success confirmations, error messages, progress indicators, and any change in system state. The feedback should be proportional to the importance and duration of the action.',
    rationale:
      'When users understand what the system is doing, they feel in control. Lack of feedback creates anxiety, confusion, and distrust. Users may repeat actions unnecessarily or abandon tasks entirely if they cannot tell whether their actions had any effect.',
    examples: {
      good: [
        'Progress bars during file uploads showing percentage complete',
        'Skeleton loading states that indicate content is being fetched',
        'Toast notifications confirming successful form submission',
        'Real-time character count in text fields with limits',
        'Visual feedback on button press (pressed state)',
        'Badge counts on icons showing unread notifications',
      ],
      bad: [
        'Buttons that show no feedback when clicked',
        'Forms that submit without any confirmation',
        'Long-running operations with no progress indication',
        'Silent failures where nothing appears to happen',
        'Removing items from a list without animation or confirmation',
      ],
    },
    applications: [
      'Loading and progress indicators',
      'Form validation feedback',
      'Success and error messages',
      'Real-time status updates',
      'Button and interaction states',
      'System notifications',
    ],
    relatedPrinciples: ['feedback', 'error-prevention', 'help-users-recognize-errors'],
    tags: ['feedback', 'status', 'loading', 'progress', 'confirmation', 'heuristics', 'nielsen'],
    source: "Jakob Nielsen's 10 Usability Heuristics",
    importance: 'critical',
  },
  {
    id: 'match-system-real-world',
    name: 'Match Between System and the Real World',
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'heuristics',
    summary:
      'The design should speak the users\' language, with words, phrases, and concepts familiar to the user, rather than system-oriented terms.',
    description:
      'Use vocabulary and concepts that users already understand from their real-world experience. Follow real-world conventions, making information appear in a natural and logical order. Avoid technical jargon, system-oriented terminology, or unfamiliar abbreviations. Icons and metaphors should relate to familiar physical objects or common cultural concepts.',
    rationale:
      'Users bring their existing mental models and expectations to any interface. When the design aligns with these expectations, learning is faster and errors are fewer. Technical language creates barriers and makes users feel incompetent.',
    examples: {
      good: [
        'Shopping cart icon for e-commerce (familiar metaphor)',
        'Folder and file icons for document organization',
        'Using "Delete" instead of "Remove from database"',
        'Calendar views that match physical calendars',
        'Trash/Recycle bin for deleted items',
        '"Send" for email instead of "Transmit message"',
      ],
      bad: [
        'Error codes like "ERR_404" without explanation',
        '"Terminate session" instead of "Log out"',
        'Technical timestamps (Unix epoch) instead of readable dates',
        '"Submit query" instead of "Search"',
        'Using programmer terms like "null", "undefined", "instance"',
      ],
    },
    applications: [
      'UI copy and microcopy',
      'Icon selection',
      'Navigation labels',
      'Error messages',
      'Onboarding flows',
      'Help documentation',
    ],
    relatedPrinciples: ['recognition-over-recall', 'consistency-and-standards'],
    tags: ['language', 'mental-models', 'metaphors', 'copy', 'terminology', 'heuristics', 'nielsen'],
    source: "Jakob Nielsen's 10 Usability Heuristics",
    importance: 'high',
  },
  {
    id: 'user-control-and-freedom',
    name: 'User Control and Freedom',
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'heuristics',
    summary:
      'Users often perform actions by mistake. They need a clearly marked "emergency exit" to leave the unwanted state without having to go through an extended process.',
    description:
      'Users frequently choose system functions by mistake and need a clear way to exit the unwanted state. Support undo and redo. Provide clear ways to cancel operations in progress. Allow users to easily navigate backward. Never trap users in a flow without an escape route. The cost of mistakes should be low.',
    rationale:
      'Humans make mistakes constantly—clicking the wrong button, changing their mind, or exploring out of curiosity. When escape is easy, users feel safe to explore. When escape is difficult, users become anxious and conservative, reducing engagement and satisfaction.',
    examples: {
      good: [
        'Undo/redo in text editors and design tools',
        '"Cancel" buttons on all dialogs and modals',
        'Browser back button always works',
        '"Unsend" feature for recently sent messages',
        'Restore from trash feature',
        'Clear filters button to reset search',
        'Exit full-screen mode with Escape key',
      ],
      bad: [
        'Multi-step wizards without back buttons',
        'Permanent deletion without confirmation or undo',
        'Modal dialogs that can only be closed by completing an action',
        'No way to cancel a long-running operation',
        'Preventing browser back button navigation',
      ],
    },
    applications: [
      'Undo/redo functionality',
      'Cancel and back buttons',
      'Modal and dialog design',
      'Form design',
      'Navigation patterns',
      'Destructive action safeguards',
    ],
    relatedPrinciples: ['error-prevention', 'error-recovery'],
    tags: ['undo', 'cancel', 'escape', 'freedom', 'control', 'recovery', 'heuristics', 'nielsen'],
    source: "Jakob Nielsen's 10 Usability Heuristics",
    importance: 'critical',
  },
  {
    id: 'consistency-and-standards',
    name: 'Consistency and Standards',
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'heuristics',
    summary:
      'Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform and industry conventions.',
    description:
      'Maintain consistency in visual design, terminology, and interaction patterns throughout the product. Follow established platform conventions (iOS, Android, Web). Users spend most of their time on other products, so your product should work the same way as those other products. Internal consistency (within your product) and external consistency (with conventions) both matter.',
    rationale:
      'Consistency reduces the cognitive load required to learn and use an interface. Users transfer knowledge from one part of your product to another, and from other products to yours. Inconsistency forces users to learn new patterns unnecessarily and leads to errors.',
    examples: {
      good: [
        'Using standard icons (gear for settings, magnifying glass for search)',
        'Consistent button styles throughout the application',
        'Same terminology for the same concept across all screens',
        'Following platform conventions (pull-to-refresh on mobile)',
        'Consistent placement of navigation elements',
        'Standard keyboard shortcuts (Cmd+S for save)',
      ],
      bad: [
        'Different terms for the same action ("Save", "Submit", "Apply")',
        'Inconsistent icon styles or meanings',
        'Primary buttons that change color between screens',
        'Different date formats in different parts of the app',
        'Non-standard gestures that conflict with OS gestures',
      ],
    },
    applications: [
      'Design systems',
      'Component libraries',
      'Style guides',
      'Interaction patterns',
      'Terminology glossaries',
      'Platform-specific design',
    ],
    relatedPrinciples: ['match-system-real-world', 'recognition-over-recall'],
    tags: ['consistency', 'standards', 'conventions', 'design-system', 'patterns', 'heuristics', 'nielsen'],
    source: "Jakob Nielsen's 10 Usability Heuristics",
    importance: 'high',
  },
  {
    id: 'error-prevention',
    name: 'Error Prevention',
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'heuristics',
    summary:
      'Good error messages are important, but the best designs prevent problems from occurring in the first place.',
    description:
      'Eliminate error-prone conditions or check for them and present users with a confirmation option before they commit to the action. There are two types of errors: slips (unconscious errors due to inattention) and mistakes (conscious errors based on mismatch between user\'s mental model and the design). Prevent both through careful design.',
    rationale:
      'Preventing errors is better than helping users recover from them. Errors waste time, cause frustration, and can lead to data loss. Prevention shows respect for users\' time and builds trust in the product.',
    examples: {
      good: [
        'Disabling submit button until form is valid',
        'Confirmation dialogs for destructive actions',
        'Auto-save to prevent data loss',
        'Input masks and format hints for data entry',
        'Suggested search queries to prevent typos',
        'Undo period before permanent deletion',
        'Constraints that make invalid states impossible',
      ],
      bad: [
        'Accepting any input then showing error after submission',
        'Permanent deletion with single click',
        'Forms that clear on failed validation',
        'No validation until final submission',
        'Allowing conflicting options to be selected',
      ],
    },
    applications: [
      'Form validation',
      'Destructive action confirmations',
      'Input constraints and masks',
      'Auto-save functionality',
      'Default values',
      'Smart defaults',
    ],
    relatedPrinciples: ['help-users-recognize-errors', 'user-control-and-freedom'],
    tags: ['errors', 'prevention', 'validation', 'confirmation', 'safety', 'heuristics', 'nielsen'],
    source: "Jakob Nielsen's 10 Usability Heuristics",
    importance: 'critical',
  },
  {
    id: 'recognition-over-recall',
    name: 'Recognition Rather Than Recall',
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'heuristics',
    summary:
      'Minimize the user\'s memory load by making elements, actions, and options visible. Users should not have to remember information.',
    description:
      'Make objects, actions, and options visible. The user should not have to remember information from one part of the interface to another. Instructions for use of the system should be visible or easily retrievable. Recognition is easier than recall because it provides cues that help retrieve relevant information from memory.',
    rationale:
      'Human working memory is limited (about 7±2 items). Interfaces that require users to remember information impose cognitive load that leads to errors and frustration. Recognition leverages context and visual cues to reduce this burden.',
    examples: {
      good: [
        'Showing recent items and search history',
        'Visual thumbnails instead of just file names',
        'Dropdown menus that show all options',
        'Autocomplete suggestions while typing',
        'Breadcrumb navigation showing the path',
        'Visible labels on icons',
        'Preview of selected options before confirmation',
      ],
      bad: [
        'Requiring users to remember keyboard shortcuts without hints',
        'Command-line style interfaces for general users',
        'Unlabeled icons without tooltips',
        'Forms that don\'t show previously entered values',
        'Navigation that hides current location',
      ],
    },
    applications: [
      'Navigation design',
      'Search and filtering',
      'Form design',
      'Icon design',
      'Dashboard design',
      'Command palettes',
    ],
    relatedPrinciples: ['visibility-of-system-status', 'millers-law'],
    tags: ['memory', 'recognition', 'recall', 'cognitive-load', 'visibility', 'heuristics', 'nielsen'],
    source: "Jakob Nielsen's 10 Usability Heuristics",
    importance: 'high',
  },
  {
    id: 'flexibility-and-efficiency',
    name: 'Flexibility and Efficiency of Use',
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'heuristics',
    summary:
      'Accelerators—unseen by the novice user—may speed up interaction for the expert user. Allow users to tailor frequent actions.',
    description:
      'Provide multiple ways to accomplish tasks so both novice and expert users are supported. Offer keyboard shortcuts, customization options, and ways to automate frequent tasks. The interface should be accessible to beginners while allowing power users to be more efficient. Support both guided and direct manipulation.',
    rationale:
      'Users develop expertise over time, and their needs change. Novices need guidance and simple paths, while experts want speed and control. Serving only one group alienates the other. Flexible designs grow with users.',
    examples: {
      good: [
        'Keyboard shortcuts for common actions (with discoverability)',
        'Customizable toolbars and layouts',
        'Quick actions and command palettes',
        'Saved searches and filters',
        'Templates for common tasks',
        'Touch gestures alongside buttons',
        'Macros and automation features',
      ],
      bad: [
        'Only supporting mouse/touch interaction',
        'No shortcuts for frequent operations',
        'Forced linear flows for every action',
        'No way to customize the interface',
        'Expert features that break basic functionality',
      ],
    },
    applications: [
      'Keyboard navigation',
      'Shortcuts and accelerators',
      'Customization features',
      'Templates and presets',
      'Command palettes',
      'Gesture support',
    ],
    relatedPrinciples: ['user-control-and-freedom', 'recognition-over-recall'],
    tags: ['efficiency', 'flexibility', 'shortcuts', 'expert', 'customization', 'heuristics', 'nielsen'],
    source: "Jakob Nielsen's 10 Usability Heuristics",
    importance: 'medium',
  },
  {
    id: 'aesthetic-minimalist-design',
    name: 'Aesthetic and Minimalist Design',
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'heuristics',
    summary:
      'Interfaces should not contain information which is irrelevant or rarely needed. Every extra unit of information competes with relevant information.',
    description:
      'Dialogues should not contain information which is irrelevant or rarely needed. Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility. This heuristic doesn\'t mean removing all decoration—it means prioritizing content and removing clutter that interferes with the user\'s goals.',
    rationale:
      'Attention is a limited resource. Cluttered interfaces overwhelm users and hide important information. Minimalist design reduces cognitive load, speeds up task completion, and creates a sense of quality and professionalism.',
    examples: {
      good: [
        'Progressive disclosure of advanced options',
        'Clean, focused landing pages',
        'Appropriate white space',
        'Hiding rarely-used features in menus',
        'Contextual actions that appear when relevant',
        'Simple onboarding with optional deep dives',
      ],
      bad: [
        'Showing all features at once',
        'Crowded interfaces with no visual hierarchy',
        'Unnecessary animations or decorations',
        'Redundant text and labels',
        'Feature bloat on the main screen',
        'Marketing messages interrupting core tasks',
      ],
    },
    applications: [
      'Information architecture',
      'Progressive disclosure',
      'Visual hierarchy',
      'Content strategy',
      'Feature prioritization',
      'Dashboard design',
    ],
    relatedPrinciples: ['progressive-disclosure', 'visual-hierarchy'],
    tags: ['minimalism', 'aesthetics', 'clutter', 'focus', 'simplicity', 'heuristics', 'nielsen'],
    source: "Jakob Nielsen's 10 Usability Heuristics",
    importance: 'high',
  },
  {
    id: 'help-users-recognize-errors',
    name: 'Help Users Recognize, Diagnose, and Recover from Errors',
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'heuristics',
    summary:
      'Error messages should be expressed in plain language (no error codes), precisely indicate the problem, and constructively suggest a solution.',
    description:
      'Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution. Help users understand what went wrong and how to fix it. Place error messages near the problem. Use visual indicators (color, icons) to draw attention without relying solely on them.',
    rationale:
      'Errors are inevitable, but how they\'re communicated determines whether users can recover or become stuck. Good error handling turns potential abandonment into successful task completion. Bad error handling creates support burden and user frustration.',
    examples: {
      good: [
        '"Password must be at least 8 characters" (specific, actionable)',
        '"Could not connect. Check your internet connection and try again."',
        'Inline validation showing exactly which field has an issue',
        'Suggestions for fixing typos in search queries',
        '"Email already registered. Log in instead?"',
        'Keeping form data when validation fails',
      ],
      bad: [
        '"Error 500" or "Something went wrong"',
        '"Invalid input" without specifying which input',
        'Error messages far from the relevant field',
        'Clearing the form after an error',
        'Red color alone without explanatory text',
        '"Contact support" as the only suggestion',
      ],
    },
    applications: [
      'Form validation messages',
      'System error pages',
      'API error handling',
      'Network error states',
      'Inline validation',
      'Help documentation',
    ],
    relatedPrinciples: ['error-prevention', 'visibility-of-system-status'],
    tags: ['errors', 'messages', 'recovery', 'validation', 'help', 'heuristics', 'nielsen'],
    source: "Jakob Nielsen's 10 Usability Heuristics",
    importance: 'high',
  },
  {
    id: 'help-and-documentation',
    name: 'Help and Documentation',
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'heuristics',
    summary:
      'It\'s best if the system can be used without documentation, but it may be necessary to provide help. Help should be easy to search, focused on the task, and not too large.',
    description:
      'Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation. Any such information should be easy to search, focused on the user\'s task, list concrete steps to be carried out, and not be too large. Contextual help is more effective than separate documentation.',
    rationale:
      'Users generally don\'t read documentation before using a product—they seek help when stuck. Help should be discoverable when needed, not forced upfront. Good in-context help reduces support costs and improves user success rates.',
    examples: {
      good: [
        'Tooltips explaining unfamiliar terms or icons',
        'Inline hints during onboarding',
        'Searchable help documentation',
        'Contextual help buttons ("?" icons)',
        'Interactive tutorials and walkthroughs',
        'FAQs addressing common questions',
        'Empty states with helpful getting started tips',
      ],
      bad: [
        'Long manuals with no search',
        'Forcing users through tutorials they can\'t skip',
        'Help content that doesn\'t match current version',
        'No help for complex features',
        'Help that uses technical jargon',
        'Help hidden in hard-to-find locations',
      ],
    },
    applications: [
      'Tooltips and hints',
      'Help documentation',
      'Onboarding flows',
      'Empty states',
      'Error recovery guidance',
      'Feature announcements',
    ],
    relatedPrinciples: ['match-system-real-world', 'recognition-over-recall'],
    tags: ['help', 'documentation', 'onboarding', 'tooltips', 'tutorials', 'heuristics', 'nielsen'],
    source: "Jakob Nielsen's 10 Usability Heuristics",
    importance: 'medium',
  },
];

/**
 * Laws of UX - psychological principles applied to design
 * Based on publicly documented cognitive psychology principles
 */
export const lawsOfUx: DesignPrinciple[] = [
  {
    id: 'fitts-law',
    name: "Fitts's Law",
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'laws',
    summary:
      'The time to acquire a target is a function of the distance to and size of the target. Make important elements large and close.',
    description:
      'The time required to move to a target depends on the distance to it and its size. Closer and larger targets are faster to reach. This applies to all pointing tasks—mouse, touch, or any other input device. Edge and corner positions are effectively infinite in size on screens.',
    rationale:
      'Understanding Fitts\'s Law helps designers optimize interaction efficiency. Poorly sized or positioned elements slow users down and increase errors. This is especially critical for frequently-used actions and error-prone contexts.',
    examples: {
      good: [
        'Large touch targets on mobile (44x44pt minimum)',
        'Primary actions as larger buttons',
        'Placing common actions near current cursor position',
        'Full-width buttons on mobile',
        'Menu items with generous padding',
        'Positioning toolbar near workspace',
      ],
      bad: [
        'Tiny click targets (especially on touch devices)',
        'Important actions in hard-to-reach corners',
        'Small close buttons on modals',
        'Actions requiring precise cursor positioning',
        'Adjacent small targets that are easy to mis-tap',
      ],
    },
    applications: [
      'Button and touch target sizing',
      'Navigation placement',
      'Toolbar positioning',
      'Modal and dialog design',
      'Context menu placement',
      'Mobile interface design',
    ],
    relatedPrinciples: ['accessibility-touch-targets', 'error-prevention'],
    tags: ['fitts', 'targeting', 'size', 'distance', 'efficiency', 'laws', 'psychology'],
    source: "Paul Fitts (1954) - Fitts's Law",
    importance: 'high',
  },
  {
    id: 'hicks-law',
    name: "Hick's Law",
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'laws',
    summary:
      'The time it takes to make a decision increases with the number and complexity of choices. Simplify choices.',
    description:
      'The time it takes to make a decision increases logarithmically with the number of alternatives. More choices mean longer decision times and potential decision paralysis. This applies to menu items, options in forms, and any set of alternatives presented to users.',
    rationale:
      'Too many options overwhelm users and slow them down. Choice overload can lead to decision avoidance altogether. Reducing and organizing choices improves user experience and conversion rates.',
    examples: {
      good: [
        'Limiting navigation to 5-7 main items',
        'Progressive disclosure of advanced options',
        'Smart defaults that handle common cases',
        'Categorized options in long lists',
        'Recommended/popular choices highlighted',
        'Search/filter for large option sets',
      ],
      bad: [
        'Mega menus with 50+ unorganized items',
        'Forms with unnecessary optional fields',
        'Showing all features in a single toolbar',
        'Long dropdowns without grouping',
        'Equal visual weight to all options',
      ],
    },
    applications: [
      'Navigation structure',
      'Form design',
      'Settings organization',
      'Feature prioritization',
      'Onboarding flows',
      'E-commerce product options',
    ],
    relatedPrinciples: ['millers-law', 'aesthetic-minimalist-design', 'progressive-disclosure'],
    tags: ['hicks', 'choices', 'decisions', 'simplicity', 'options', 'laws', 'psychology'],
    source: "William Edmund Hick & Ray Hyman - Hick's Law (1952)",
    importance: 'high',
  },
  {
    id: 'millers-law',
    name: "Miller's Law",
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'laws',
    summary:
      'The average person can hold about 7 (±2) items in working memory. Chunk information into digestible groups.',
    description:
      'The average person can only keep about 7 (plus or minus 2) items in their working memory at once. Content should be chunked into groups of 5-9 items. Phone numbers, credit card numbers, and other long sequences should be broken into chunks for easier processing.',
    rationale:
      'Overloading working memory leads to information loss and errors. Chunking makes information more memorable and easier to process. This is why phone numbers use dashes and credit cards have spaces.',
    examples: {
      good: [
        'Phone numbers formatted as 555-123-4567',
        'Credit card numbers with spaces: 4111 1111 1111 1111',
        'Navigation limited to 5-7 main items',
        'Steps in a process grouped logically',
        'Form sections with 4-6 fields each',
        'Dashboard with grouped metric cards',
      ],
      bad: [
        'Long unformatted number strings',
        '20+ unorganized navigation items',
        'Dense walls of text without headings',
        'Complex forms without logical grouping',
        'Instructions with 15 unnumbered steps',
      ],
    },
    applications: [
      'Information architecture',
      'Form design',
      'Navigation structure',
      'Data presentation',
      'Instruction design',
      'Chunking strategies',
    ],
    relatedPrinciples: ['hicks-law', 'recognition-over-recall', 'chunking'],
    tags: ['miller', 'memory', 'chunking', 'cognitive-load', '7-plus-minus-2', 'laws', 'psychology'],
    source: "George A. Miller - 'The Magical Number Seven' (1956)",
    importance: 'high',
  },
  {
    id: 'jakobs-law',
    name: "Jakob's Law",
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'laws',
    summary:
      'Users spend most of their time on other sites. They prefer your site to work the same way as all the other sites they know.',
    description:
      'Users transfer expectations from one familiar product to another. They expect your product to work like others they\'ve used. Leveraging existing mental models reduces learning curve and errors. Innovation should build on familiar patterns rather than reinventing everything.',
    rationale:
      'Users don\'t arrive at your product with a blank slate—they bring learned behaviors from every other product they\'ve used. Meeting these expectations reduces friction. Violating them requires justification and increases cognitive load.',
    examples: {
      good: [
        'Logo in top-left links to home',
        'Shopping cart icon in top-right',
        'Underlined blue text for links',
        'Pull-to-refresh on mobile',
        'Swipe to delete in lists',
        'Double-click to edit',
      ],
      bad: [
        'Novel navigation patterns without clear benefit',
        'Custom scroll behaviors that fight the OS',
        'Non-standard icon meanings',
        'Unique gestures that conflict with platform standards',
        'Reinventing established patterns like date pickers',
      ],
    },
    applications: [
      'Navigation design',
      'E-commerce patterns',
      'Form design',
      'Mobile gestures',
      'Icon usage',
      'Interaction patterns',
    ],
    relatedPrinciples: ['consistency-and-standards', 'match-system-real-world'],
    tags: ['jakob', 'expectations', 'conventions', 'familiarity', 'mental-models', 'laws', 'psychology'],
    source: 'Jakob Nielsen',
    importance: 'high',
  },
  {
    id: 'peak-end-rule',
    name: 'Peak-End Rule',
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'laws',
    summary:
      'People judge an experience largely based on how they felt at its peak and at its end, rather than the total or average of every moment.',
    description:
      'Users remember experiences by their most intense point (peak) and how they ended, not by the average of all moments. Design for memorable peaks and positive endings. A difficult middle can be forgiven if the end is satisfying.',
    rationale:
      'Understanding memory and perception helps design experiences that leave lasting positive impressions. A great ending can redeem a mediocre experience, while a bad ending can ruin an otherwise good one.',
    examples: {
      good: [
        'Celebration screens after completing a goal',
        'Thoughtful confirmation pages after purchase',
        'Delightful micro-interactions at key moments',
        'Thank you messages after form submission',
        'Progress celebrations in onboarding',
        'Smooth offboarding experiences',
      ],
      bad: [
        'Anticlimactic endings (just closing a modal)',
        'Errors at the final step of a process',
        'Abrupt session timeouts',
        'Forgettable confirmation pages',
        'Ending on a payment screen without confirmation',
      ],
    },
    applications: [
      'Checkout completion',
      'Onboarding flows',
      'Task completion celebrations',
      'Session endings',
      'Feature announcements',
      'Error recovery',
    ],
    relatedPrinciples: ['visibility-of-system-status', 'delight'],
    tags: ['peak-end', 'memory', 'experience', 'endings', 'perception', 'laws', 'psychology'],
    source: 'Daniel Kahneman - Peak-End Rule',
    importance: 'medium',
  },
  {
    id: 'law-of-common-region',
    name: 'Law of Common Region',
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'laws',
    summary:
      'Elements tend to be perceived as grouped together if they share a clearly defined boundary or region.',
    description:
      'Items within a boundary are perceived as belonging together. Boundaries can be created with backgrounds, borders, cards, or other visual containers. This is one of the Gestalt principles applied to UI design.',
    rationale:
      'Visual grouping helps users understand relationships between elements without reading. Clear boundaries reduce cognitive load and improve scannability.',
    examples: {
      good: [
        'Card-based layouts for grouping related content',
        'Form sections with subtle background colors',
        'Modal dialogs with clear boundaries',
        'Grouped toolbar buttons',
        'Related settings in bordered sections',
      ],
      bad: [
        'Related elements scattered without visual grouping',
        'Borders that split related content',
        'Inconsistent card usage',
        'Missing boundaries between unrelated content',
      ],
    },
    applications: [
      'Card design',
      'Form layout',
      'Navigation grouping',
      'Dashboard sections',
      'Settings organization',
    ],
    relatedPrinciples: ['gestalt-proximity', 'gestalt-similarity', 'visual-hierarchy'],
    tags: ['common-region', 'grouping', 'boundaries', 'cards', 'gestalt', 'laws'],
    source: 'Gestalt Psychology',
    importance: 'high',
  },
  {
    id: 'law-of-proximity',
    name: 'Law of Proximity',
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'laws',
    summary:
      'Objects that are near each other tend to be grouped together. Use spacing to show relationships.',
    description:
      'Elements placed close together are perceived as related. Whitespace between elements signals separation. This is fundamental to creating visual hierarchy and showing relationships without explicit labels.',
    rationale:
      'Proximity is one of the most powerful grouping cues. Proper use of spacing can replace the need for borders and backgrounds, creating cleaner designs while maintaining clear organization.',
    examples: {
      good: [
        'Labels positioned close to their form fields',
        'Related buttons grouped together',
        'Clear spacing between form sections',
        'Tight spacing within cards, larger between cards',
        'Icon-label pairs with minimal gap',
      ],
      bad: [
        'Labels far from their inputs',
        'Equal spacing everywhere (no grouping)',
        'Related actions placed far apart',
        'Unrelated elements too close together',
      ],
    },
    applications: [
      'Form design',
      'Layout spacing',
      'Button grouping',
      'Card design',
      'Navigation structure',
    ],
    relatedPrinciples: ['law-of-common-region', 'gestalt-similarity', 'whitespace'],
    tags: ['proximity', 'spacing', 'grouping', 'gestalt', 'relationships', 'laws'],
    source: 'Gestalt Psychology',
    importance: 'critical',
  },
  {
    id: 'aesthetic-usability-effect',
    name: 'Aesthetic-Usability Effect',
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'laws',
    summary:
      'Users often perceive aesthetically pleasing designs as more usable. Beautiful designs create positive emotional responses.',
    description:
      'Attractive things are perceived to work better. Users are more tolerant of minor usability issues in aesthetically pleasing designs. Good visual design builds trust and creates positive emotional responses that enhance perceived usability.',
    rationale:
      'Visual design isn\'t just decoration—it affects how users perceive functionality. Investment in aesthetics pays off in user trust, engagement, and forgiveness for minor issues.',
    examples: {
      good: [
        'Polished visual design with attention to detail',
        'Consistent and harmonious color schemes',
        'Well-crafted micro-interactions',
        'Quality typography and spacing',
        'Professional iconography',
      ],
      bad: [
        'Dated or inconsistent visual design',
        'Clashing colors and fonts',
        'Pixelated or misaligned elements',
        'Generic stock imagery',
        'Neglected visual details',
      ],
    },
    applications: [
      'Visual design polish',
      'Brand design',
      'First impressions',
      'Landing pages',
      'Product marketing',
    ],
    relatedPrinciples: ['aesthetic-minimalist-design', 'consistency-and-standards'],
    tags: ['aesthetics', 'beauty', 'perception', 'trust', 'emotion', 'laws'],
    source: 'Masaaki Kurosu and Kaori Kashimura (1995)',
    importance: 'medium',
  },
  {
    id: 'doherty-threshold',
    name: 'Doherty Threshold',
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'laws',
    summary:
      'Productivity soars when a computer and its users interact at a pace that ensures neither has to wait on the other.',
    description:
      'System response times should be under 400ms to keep users in a state of flow. Delays beyond this threshold break concentration and reduce productivity. When instant response isn\'t possible, provide feedback immediately.',
    rationale:
      'Speed is a feature. Fast interfaces feel more responsive and professional. Slow interfaces frustrate users and reduce task completion rates. When true speed isn\'t achievable, perceived speed through optimistic UI and loading states helps.',
    examples: {
      good: [
        'Optimistic UI updates before server confirmation',
        'Skeleton loaders for content',
        'Instant local validation',
        'Preloading likely next views',
        'Debounced but responsive search',
        'Progress indicators for long operations',
      ],
      bad: [
        'Full-page reloads for small changes',
        'Blocking UI during network requests',
        'No feedback during processing',
        'Long waits without progress indicators',
        'Heavy pages that take seconds to load',
      ],
    },
    applications: [
      'Performance optimization',
      'Loading states',
      'Optimistic updates',
      'Perceived performance',
      'Response time budgets',
    ],
    relatedPrinciples: ['visibility-of-system-status', 'perceived-performance'],
    tags: ['doherty', 'speed', 'performance', 'response-time', 'flow', 'laws'],
    source: 'Walter J. Doherty and Ahrvind J. Thadani (1982)',
    importance: 'high',
  },
  {
    id: 'teslers-law',
    name: "Tesler's Law (Law of Conservation of Complexity)",
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'laws',
    summary:
      'Every application has an inherent amount of irreducible complexity. The only question is: who will have to deal with it?',
    description:
      'For any system, there is a certain amount of complexity that cannot be reduced. The question is who handles it—the user, the developer, or the system. Good design moves complexity away from users and into the system.',
    rationale:
      'Shifting complexity from users to the system improves user experience, even if it increases development effort. The goal is to handle complexity once (in code) rather than force every user to deal with it.',
    examples: {
      good: [
        'Auto-detecting location instead of asking',
        'Smart defaults based on user behavior',
        'Automatic format handling (dates, phones)',
        'Context-aware suggestions',
        'System handling edge cases gracefully',
      ],
      bad: [
        'Requiring users to configure everything',
        'Exposing technical details unnecessarily',
        'Making users handle data format conversion',
        'Requiring manual setup that could be automated',
      ],
    },
    applications: [
      'Default values',
      'Smart automation',
      'Format handling',
      'Configuration design',
      'Onboarding simplification',
    ],
    relatedPrinciples: ['error-prevention', 'flexibility-and-efficiency'],
    tags: ['tesler', 'complexity', 'simplicity', 'automation', 'defaults', 'laws'],
    source: 'Larry Tesler',
    importance: 'medium',
  },
  {
    id: 'postel-law',
    name: "Postel's Law (Robustness Principle)",
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'laws',
    summary:
      'Be liberal in what you accept, and conservative in what you send. Accept varied user input but produce consistent output.',
    description:
      'Be tolerant of various input formats and flexible in accepting user data, but be strict and consistent in what the system outputs. This applies to forms, search, APIs, and any user input.',
    rationale:
      'Users make mistakes and have different habits. Rigid input requirements frustrate users. Accepting various formats and cleaning/normalizing them improves success rates without sacrificing data quality.',
    examples: {
      good: [
        'Accepting phone numbers in any format',
        'Search that handles typos and variations',
        'Date inputs accepting multiple formats',
        'Trimming whitespace from inputs',
        'Case-insensitive matching',
      ],
      bad: [
        'Rejecting valid input due to formatting',
        'Strict format requirements without guidance',
        'Case-sensitive when it doesn\'t matter',
        'Failing on leading/trailing whitespace',
      ],
    },
    applications: [
      'Form validation',
      'Search functionality',
      'Data input handling',
      'API design',
      'Error tolerance',
    ],
    relatedPrinciples: ['error-prevention', 'help-users-recognize-errors'],
    tags: ['postel', 'robustness', 'input', 'validation', 'tolerance', 'laws'],
    source: 'Jon Postel - RFC 761',
    importance: 'high',
  },
];

/**
 * Additional core UX principles
 */
export const coreUxPrinciples: DesignPrinciple[] = [
  {
    id: 'progressive-disclosure',
    name: 'Progressive Disclosure',
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'psychology',
    summary:
      'Defer advanced or rarely used features to secondary screens, revealing complexity progressively as users need it.',
    description:
      'Show only the most important options upfront, and progressively reveal more as users dig deeper. This keeps interfaces simple for beginners while still providing power for experts. Advanced features are available but not overwhelming.',
    rationale:
      'Users are overwhelmed by seeing everything at once. Progressive disclosure balances simplicity with power by sequencing information and options based on likelihood of need.',
    examples: {
      good: [
        'Advanced search options behind an "Advanced" link',
        'Expandable sections in forms',
        'Read more links for long content',
        'Tooltips revealing additional information',
        'Settings organized into basic and advanced',
        'Contextual toolbars that appear on selection',
      ],
      bad: [
        'All options visible at all times',
        'Hiding commonly needed features',
        'Too many levels of disclosure',
        'Important features buried too deep',
      ],
    },
    applications: [
      'Form design',
      'Settings pages',
      'Navigation',
      'Feature organization',
      'Help systems',
    ],
    relatedPrinciples: ['aesthetic-minimalist-design', 'hicks-law', 'millers-law'],
    tags: ['disclosure', 'simplicity', 'complexity', 'hierarchy', 'layering'],
    importance: 'high',
  },
  {
    id: 'feedback',
    name: 'Immediate Feedback',
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'psychology',
    summary:
      'Every user action should produce an immediate, visible response to confirm the action was received.',
    description:
      'Users need to know their actions have been registered. Feedback should be immediate (ideally under 100ms), appropriate to the action, and clear in meaning. Lack of feedback leads to repeated actions and user frustration.',
    rationale:
      'Humans expect cause and effect. When actions produce no visible result, users assume failure. Immediate feedback maintains the illusion of direct manipulation and keeps users confident.',
    examples: {
      good: [
        'Button state changes on click',
        'Input focus states',
        'Hover effects',
        'Loading spinners',
        'Sound/haptic feedback on mobile',
        'Optimistic UI updates',
      ],
      bad: [
        'Buttons with no visual click feedback',
        'Actions that complete silently',
        'Delayed responses without indication',
        'Inconsistent feedback patterns',
      ],
    },
    applications: [
      'Button design',
      'Form interactions',
      'Navigation feedback',
      'Loading states',
      'Mobile haptics',
    ],
    relatedPrinciples: ['visibility-of-system-status', 'doherty-threshold'],
    tags: ['feedback', 'responsiveness', 'interaction', 'confirmation', 'states'],
    importance: 'critical',
  },
  {
    id: 'affordance',
    name: 'Affordance',
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'psychology',
    summary:
      'Design elements should suggest how they can be used. Buttons should look clickable, sliders should look draggable.',
    description:
      'An affordance is a quality of an object that suggests how it can be used. In UI, elements should visually communicate their function. Buttons should look pressable, text fields should look editable, draggable items should have handles.',
    rationale:
      'Clear affordances reduce learning time and errors. Users shouldn\'t have to guess how to interact with elements. Poor affordances lead to missed features and user frustration.',
    examples: {
      good: [
        'Raised buttons that look clickable',
        'Text fields with clear boundaries',
        'Drag handles on moveable items',
        'Underlined links',
        'Cursor changes on hover',
        'Toggle switches that slide',
      ],
      bad: [
        'Flat text that\'s actually a button',
        'Clickable areas with no visual indication',
        'Draggable items without handles or visual cues',
        'Interactive elements that look static',
      ],
    },
    applications: [
      'Button design',
      'Interactive elements',
      'Form design',
      'Cursor states',
      'Touch interfaces',
    ],
    relatedPrinciples: ['visibility-of-system-status', 'consistency-and-standards', 'signifier'],
    tags: ['affordance', 'interaction', 'visual-cues', 'buttons', 'clickability'],
    importance: 'high',
  },
  {
    id: 'mental-models',
    name: 'Mental Models',
    category: DesignCategory.USER_EXPERIENCE,
    subcategory: 'psychology',
    summary:
      'Design should align with users\' existing understanding of how things work, building on familiar concepts.',
    description:
      'Users approach interfaces with preconceived notions about how things should work, based on past experiences. Effective design matches these mental models or clearly teaches new ones. Misalignment causes confusion and errors.',
    rationale:
      'Working with existing mental models reduces learning time and errors. Fighting against them creates friction. When you must deviate, do so intentionally and provide clear guidance.',
    examples: {
      good: [
        'Shopping carts that work like real carts',
        'File/folder metaphors for organization',
        'Trash cans for deletion',
        'Physical switches for on/off states',
        'Calendars that look like calendars',
      ],
      bad: [
        'Novel metaphors for common actions',
        'Terminology that conflicts with conventions',
        'Workflows that contradict user expectations',
        'Surprising behaviors from familiar-looking elements',
      ],
    },
    applications: [
      'Information architecture',
      'Navigation design',
      'Metaphor selection',
      'Terminology',
      'Onboarding',
    ],
    relatedPrinciples: ['match-system-real-world', 'jakobs-law', 'consistency-and-standards'],
    tags: ['mental-models', 'expectations', 'metaphors', 'understanding', 'cognition'],
    importance: 'high',
  },
];

export const uxPrinciples: DesignPrinciple[] = [
  ...nielsenHeuristics,
  ...lawsOfUx,
  ...coreUxPrinciples,
];
