import { DesignPrinciple } from '../../types/index.js';
import { DesignCategory } from '../../types/category.js';

/**
 * Mobile Design Principles
 * Principles specific to mobile and touch-based interfaces
 */
export const mobilePrinciples: DesignPrinciple[] = [
  {
    id: 'mobile-touch-design',
    name: 'Design for Touch',
    category: DesignCategory.MOBILE_DESIGN,
    subcategory: 'touch',
    summary:
      'Touch interfaces require larger targets, appropriate spacing, and design for finger imprecision.',
    description:
      'Touch interaction is fundamentally different from mouse interaction. Fingers are imprecise (average fingertip is 10mm) and obscure the target during interaction. Design requires larger touch targets (44pt minimum), adequate spacing between targets, and consideration for one-handed use.',
    rationale:
      'Mobile users interact with fingers, not precision pointers. Designs that don\'t account for touch characteristics lead to frustration, errors, and abandoned tasks.',
    examples: {
      good: [
        'Touch targets at least 44x44 points',
        '8pt minimum spacing between adjacent targets',
        'Important actions in thumb-reachable zones',
        'Swipe gestures with generous hit areas',
        'Visual feedback on touch',
        'Bottom-placed primary actions for one-handed use',
      ],
      bad: [
        'Small buttons and links',
        'Targets close together',
        'Important actions at top corners (hard to reach)',
        'Precise hover-dependent interactions',
        'No touch feedback',
        'Desktop patterns forced onto mobile',
      ],
    },
    applications: [
      'Button sizing',
      'Navigation placement',
      'Gesture design',
      'Form controls',
      'List item design',
      'Bottom navigation',
    ],
    relatedPrinciples: ['fitts-law', 'accessibility-touch-targets', 'error-prevention'],
    tags: ['mobile', 'touch', 'targets', 'gestures', 'fingers', 'ios', 'android'],
    importance: 'critical',
  },
  {
    id: 'mobile-thumb-zone',
    name: 'Thumb Zone Design',
    category: DesignCategory.MOBILE_DESIGN,
    subcategory: 'touch',
    summary:
      'Place frequent actions in the natural thumb reach zone. Consider one-handed phone use.',
    description:
      'Most users hold phones one-handed and use their thumb to interact. The "thumb zone" maps areas of easy, stretch, and hard-to-reach access. Primary actions should be in the easy zone (bottom-center), while destructive actions can be in stretch zones.',
    rationale:
      'One-handed use is extremely common—on transit, carrying items, etc. Forcing users to shift grip or use two hands for common actions creates friction and increases drop risk.',
    examples: {
      good: [
        'Bottom navigation bars',
        'Floating action buttons in bottom-right',
        'Primary actions near bottom of screen',
        'Pull-to-refresh at top (natural gesture)',
        'Modal actions at bottom of modal',
        'Bottom sheets for options',
      ],
      bad: [
        'Important actions in top corners',
        'Navigation only at top of screen',
        'Hamburger menus requiring stretch',
        'Frequent actions requiring two hands',
        'Modal buttons at top of modal',
      ],
    },
    applications: [
      'Navigation placement',
      'Action button positioning',
      'Modal design',
      'Gesture placement',
      'Form button placement',
      'App architecture',
    ],
    relatedPrinciples: ['mobile-touch-design', 'fitts-law', 'flexibility-and-efficiency'],
    tags: ['mobile', 'thumb', 'reachability', 'one-handed', 'ergonomics', 'ios', 'android'],
    importance: 'high',
  },
  {
    id: 'mobile-gesture-patterns',
    name: 'Standard Gesture Patterns',
    category: DesignCategory.MOBILE_DESIGN,
    subcategory: 'gestures',
    summary:
      'Use platform-standard gestures. Custom gestures should be discoverable and not conflict with system gestures.',
    description:
      'Users have learned standard gestures from their OS and other apps. Tap, swipe, pinch, and long-press have expected behaviors. Custom gestures require learning and may conflict with system gestures. When using custom gestures, provide visual hints and alternatives.',
    rationale:
      'Users expect gestures to work consistently across apps. Non-standard gestures create confusion and require learning. Conflicting with system gestures (back swipe, notification pull) frustrates users.',
    examples: {
      good: [
        'Pull-to-refresh for content updates',
        'Swipe left/right to delete or archive',
        'Pinch to zoom images',
        'Edge swipe for back navigation (Android)',
        'Long-press for context menu',
        'Visual hints for available gestures',
      ],
      bad: [
        'Custom gestures without visual cues',
        'Gestures that conflict with OS gestures',
        'Essential functions hidden behind gestures only',
        'Inconsistent gesture behavior',
        'Complex multi-finger gestures for basic actions',
      ],
    },
    applications: [
      'List interactions',
      'Image viewing',
      'Navigation',
      'Content manipulation',
      'Context menus',
      'Dismissal patterns',
    ],
    relatedPrinciples: ['consistency-and-standards', 'jakobs-law', 'recognition-over-recall'],
    tags: ['mobile', 'gestures', 'swipe', 'touch', 'platform', 'ios', 'android'],
    importance: 'high',
  },
  {
    id: 'mobile-content-prioritization',
    name: 'Content Prioritization for Mobile',
    category: DesignCategory.MOBILE_DESIGN,
    subcategory: 'responsive',
    summary:
      'Prioritize essential content for limited screen space. Mobile isn\'t a smaller desktop—it\'s a different context.',
    description:
      'Mobile screens have limited space, but mobile use also has different context—often on-the-go, distracted, with poor connectivity. Prioritize content for mobile tasks, use progressive disclosure, and don\'t just shrink desktop layouts.',
    rationale:
      'Mobile users often have different goals than desktop users. Limited space forces prioritization that often improves the experience for everyone. Mobile-first design tends to yield cleaner, more focused interfaces.',
    examples: {
      good: [
        'Essential content above the fold',
        'Progressive disclosure for secondary content',
        'Single-column layouts for readability',
        'Touch-optimized form inputs (date pickers, etc.)',
        'Reduced imagery for performance',
        'Focused task flows',
      ],
      bad: [
        'Shrinking desktop layouts to fit',
        'Hiding essential features on mobile',
        'Dense information requiring zoom',
        'Multi-column layouts on small screens',
        'Desktop-style forms',
        'Assuming same use context as desktop',
      ],
    },
    applications: [
      'Responsive design',
      'Content strategy',
      'Information architecture',
      'Form design',
      'Navigation patterns',
      'Performance optimization',
    ],
    relatedPrinciples: ['progressive-disclosure', 'aesthetic-minimalist-design', 'responsive-design'],
    tags: ['mobile', 'content', 'prioritization', 'responsive', 'mobile-first'],
    importance: 'high',
  },
  {
    id: 'mobile-performance',
    name: 'Mobile Performance Optimization',
    category: DesignCategory.MOBILE_DESIGN,
    subcategory: 'performance',
    summary:
      'Optimize for slower connections, limited bandwidth, and varied device capabilities.',
    description:
      'Mobile devices often have slower connections, data caps, and less powerful processors than desktops. Optimize images, lazy-load content, minimize JavaScript, and provide offline capabilities where possible. Perceived performance matters as much as actual performance.',
    rationale:
      'Slow mobile experiences cause abandonment. Users on slow connections or limited data plans appreciate optimization. Good mobile performance is often the baseline for a good mobile experience.',
    examples: {
      good: [
        'Optimized and responsive images',
        'Lazy loading of below-fold content',
        'Skeleton screens during loading',
        'Offline support for key features',
        'Minimal JavaScript bundles',
        'Caching strategies',
      ],
      bad: [
        'Large unoptimized images',
        'Loading all content upfront',
        'No loading indicators',
        'Assuming fast connections',
        'Heavy JavaScript frameworks for simple tasks',
        'No offline support',
      ],
    },
    applications: [
      'Image optimization',
      'Loading strategies',
      'Caching',
      'Offline support',
      'Bundle optimization',
      'Progressive web apps',
    ],
    relatedPrinciples: ['doherty-threshold', 'visibility-of-system-status'],
    tags: ['mobile', 'performance', 'speed', 'optimization', 'loading', 'offline'],
    importance: 'high',
  },
  {
    id: 'mobile-native-patterns',
    name: 'Platform-Native Patterns',
    category: DesignCategory.MOBILE_DESIGN,
    subcategory: 'platform',
    summary:
      'Follow platform guidelines (iOS HIG, Material Design) for native feel. Don\'t fight user expectations.',
    description:
      'iOS and Android have distinct design languages and user expectations. iOS users expect bottom tab bars, sheet modals, and specific transitions. Android users expect Material Design patterns, FABs, and different navigation. Respecting these creates familiar, comfortable experiences.',
    rationale:
      'Users develop muscle memory and expectations from platform conventions. Fighting these conventions creates friction. However, brand expression can still occur within platform guidelines.',
    examples: {
      good: [
        'Bottom tab bar on iOS (like native apps)',
        'Material bottom navigation or nav drawer on Android',
        'Platform-appropriate back navigation',
        'Native date/time pickers',
        'Appropriate modal presentations',
        'Platform keyboard behaviors',
      ],
      bad: [
        'Hamburger menu on iOS (rare in native)',
        'iOS patterns on Android (or vice versa)',
        'Custom navigation that ignores platform back',
        'Custom pickers that ignore platform patterns',
        'Animations that feel foreign to platform',
      ],
    },
    applications: [
      'Navigation patterns',
      'Modal presentations',
      'Input controls',
      'Transitions',
      'System integration',
      'Gesture support',
    ],
    relatedPrinciples: ['consistency-and-standards', 'jakobs-law', 'mobile-gesture-patterns'],
    tags: ['mobile', 'ios', 'android', 'platform', 'native', 'hig', 'material'],
    importance: 'high',
  },
  {
    id: 'mobile-context-awareness',
    name: 'Context-Aware Design',
    category: DesignCategory.MOBILE_DESIGN,
    subcategory: 'context',
    summary:
      'Consider the varied contexts of mobile use—outdoors, on transit, multitasking. Design for real-world conditions.',
    description:
      'Mobile devices are used in varying conditions—bright sunlight, noisy environments, while walking, with one hand. Design should account for these contexts with high contrast, large targets, simple interactions, and consideration for interruptions.',
    rationale:
      'Mobile use is rarely the focused desktop experience. Designs that assume ideal conditions fail in the real world. Context-aware design creates resilient experiences.',
    examples: {
      good: [
        'High contrast for outdoor readability',
        'Large touch targets for in-motion use',
        'Simple flows that handle interruptions',
        'Offline support for poor connectivity',
        'Auto-save to prevent data loss',
        'Clear visual hierarchy for quick scanning',
      ],
      bad: [
        'Low contrast requiring shade to read',
        'Complex interactions requiring focus',
        'Flows that lose progress on interruption',
        'Features requiring constant connectivity',
        'Dense information requiring careful reading',
      ],
    },
    applications: [
      'Visual design',
      'Interaction design',
      'Form design',
      'Content presentation',
      'Error handling',
      'State preservation',
    ],
    relatedPrinciples: ['error-prevention', 'user-control-and-freedom', 'accessibility-color-contrast'],
    tags: ['mobile', 'context', 'outdoor', 'real-world', 'interruptions', 'conditions'],
    importance: 'medium',
  },
  {
    id: 'mobile-notifications',
    name: 'Respectful Notifications',
    category: DesignCategory.MOBILE_DESIGN,
    subcategory: 'notifications',
    summary:
      'Notifications should be valuable, timely, and user-controlled. Respect attention and don\'t spam.',
    description:
      'Push notifications are powerful but easily abused. Notifications should be timely, relevant, and actionable. Users should control notification preferences. Excessive or irrelevant notifications lead to app uninstalls or notification disabling.',
    rationale:
      'User attention is precious and trust is easily lost. Well-designed notifications enhance the experience; poorly designed ones destroy it. Notification permission is earned, not given freely.',
    examples: {
      good: [
        'Clear value proposition before requesting permission',
        'Granular notification preferences',
        'Timely, relevant notifications',
        'Actionable notification content',
        'Deep links to relevant content',
        'Respectful frequency',
      ],
      bad: [
        'Requesting notification permission on first launch',
        'All-or-nothing notification controls',
        'Promotional notifications without opt-in',
        'Vague notification content',
        'Notifications that just open the app',
        'Spammy frequency',
      ],
    },
    applications: [
      'Permission requests',
      'Notification content',
      'Notification preferences',
      'Deep linking',
      'Notification grouping',
      'Timing strategies',
    ],
    relatedPrinciples: ['user-control-and-freedom', 'aesthetic-minimalist-design'],
    tags: ['mobile', 'notifications', 'push', 'attention', 'permissions', 'respect'],
    importance: 'high',
  },
];
