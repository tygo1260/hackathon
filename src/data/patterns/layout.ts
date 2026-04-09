import { DesignPattern } from '../../types/index.js';
import { DesignCategory } from '../../types/category.js';

/**
 * Layout Design Patterns
 * Patterns for organizing and presenting content
 */
export const layoutPatterns: DesignPattern[] = [
  {
    id: 'pattern-card',
    name: 'Card',
    category: DesignCategory.USER_INTERFACE,
    type: 'layout',
    platforms: ['web', 'ios', 'android', 'desktop'],
    problem: 'Content needs to be presented as distinct, contained units that can be scanned and compared.',
    solution:
      'Group related content in a rectangular container with clear boundaries (border, shadow, or background). Each card is a self-contained unit of content.',
    context:
      'Use for collections of similar items (products, articles, users), dashboard widgets, or any content that benefits from visual grouping. Cards are the building blocks of many interfaces.',
    structure: {
      description:
        'A contained rectangular region with optional header, media, body content, and actions. May include metadata.',
      components: ['Container', 'Header area', 'Media/Image area', 'Body content', 'Actions area', 'Footer/Metadata'],
      variants: [
        'Basic card',
        'Media card (image prominent)',
        'Horizontal card',
        'Expandable card',
        'Interactive/Clickable card',
        'Card with overlay',
      ],
    },
    consequences: {
      benefits: [
        'Clear content grouping',
        'Easy to scan and compare',
        'Flexible content container',
        'Works in grids and lists',
        'Natural touch target',
      ],
      tradeoffs: [
        'Takes more space than lists',
        'Can feel repetitive',
        'Needs careful content hierarchy',
        'Nested cards confusing',
      ],
    },
    examples: [
      { description: 'Product card with image, title, price', platform: 'all' },
      { description: 'Social media post card', platform: 'all' },
      { description: 'Dashboard metric card', platform: 'web' },
    ],
    relatedPatterns: ['pattern-grid', 'pattern-list'],
    antiPatterns: [
      'Cards within cards',
      'Too much content in card',
      'Inconsistent card heights in grid',
    ],
    accessibility: [
      'If clickable, use appropriate element or role',
      'Group card content semantically',
      'Alternative text for images',
      'Ensure interactive elements are accessible',
      'Focus visible on interactive cards',
    ],
    tags: ['layout', 'card', 'container', 'content', 'grouping', 'grid'],
  },
  {
    id: 'pattern-list',
    name: 'List',
    category: DesignCategory.USER_INTERFACE,
    type: 'layout',
    platforms: ['web', 'ios', 'android', 'desktop'],
    problem: 'Multiple items of similar type need to be displayed in a scannable, efficient format.',
    solution:
      'Display items vertically (or horizontally) with consistent structure. Each item has the same layout making them easy to scan and compare.',
    context:
      'Use for any collection of similar items: emails, contacts, settings, search results. Lists are more space-efficient than cards for text-heavy content.',
    structure: {
      description:
        'Vertically stacked items with consistent layout. Items may include leading element (icon, avatar), content, and trailing element (action, metadata).',
      components: ['List container', 'List items', 'Dividers', 'Leading element', 'Content area', 'Trailing element'],
      variants: [
        'Simple list',
        'Two-line list',
        'Three-line list',
        'List with avatars',
        'List with thumbnails',
        'Grouped list with headers',
      ],
    },
    consequences: {
      benefits: [
        'Space efficient',
        'Easy to scan vertically',
        'Good for text-heavy items',
        'Supports many items',
        'Familiar pattern',
      ],
      tradeoffs: [
        'Limited space per item',
        'Long lists need pagination/virtualization',
        'Less visual than cards',
      ],
    },
    examples: [
      { description: 'Email inbox list', platform: 'all' },
      { description: 'Settings menu list', platform: 'all' },
      { description: 'Search results list', platform: 'web' },
    ],
    relatedPatterns: ['pattern-card', 'pattern-infinite-scroll'],
    antiPatterns: [
      'Inconsistent item heights',
      'Too much content per item',
      'No visual separation between items',
    ],
    accessibility: [
      'Use semantic list markup (ul/ol/li)',
      'Keyboard navigable',
      'Clear item boundaries',
      'Announce list updates',
      'Focus management for dynamic lists',
    ],
    tags: ['layout', 'list', 'items', 'collection', 'vertical'],
  },
  {
    id: 'pattern-grid',
    name: 'Grid Layout',
    category: DesignCategory.USER_INTERFACE,
    type: 'layout',
    platforms: ['web', 'ios', 'android', 'desktop'],
    problem: 'Multiple items need to be displayed in a way that maximizes visual content and uses horizontal space efficiently.',
    solution:
      'Arrange items in a two-dimensional grid with consistent sizing. Grids work well for visual content like images, products, or cards.',
    context:
      'Use when items have strong visual components and horizontal space should be utilized. Common for galleries, product catalogs, portfolios.',
    structure: {
      description:
        'Items arranged in rows and columns. May have fixed columns or responsive column count. Gutters provide spacing.',
      components: ['Grid container', 'Grid items', 'Gutters', 'Responsive breakpoints'],
      variants: [
        'Fixed column grid',
        'Auto-fill responsive grid',
        'Masonry grid (Pinterest style)',
        'Equal-height grid',
        'Featured item grid',
      ],
    },
    consequences: {
      benefits: [
        'Efficient use of space',
        'Good for visual browsing',
        'Can show many items',
        'Responsive friendly',
      ],
      tradeoffs: [
        'Items may be too small',
        'Scanning order can be unclear',
        'Masonry can feel chaotic',
        'Different heights problematic',
      ],
    },
    examples: [
      { description: 'Photo gallery grid', platform: 'all' },
      { description: 'E-commerce product grid', platform: 'web' },
      { description: 'App launcher grid', platform: 'ios' },
    ],
    relatedPatterns: ['pattern-card', 'pattern-list'],
    antiPatterns: [
      'Grid for text-heavy content',
      'Too many columns (tiny items)',
      'Inconsistent item sizes (unless masonry)',
    ],
    accessibility: [
      'Logical reading order',
      'Keyboard navigation through items',
      'Sufficient item size',
      'Alt text for images',
      'Focus visible on items',
    ],
    tags: ['layout', 'grid', 'gallery', 'cards', 'responsive', 'columns'],
  },
  {
    id: 'pattern-hero-section',
    name: 'Hero Section',
    category: DesignCategory.WEB_DESIGN,
    type: 'layout',
    platforms: ['web'],
    problem: 'A page needs a prominent introduction that captures attention and communicates key messaging.',
    solution:
      'Create a large, impactful section at the top of the page with headline, subheadline, call-to-action, and often a striking visual.',
    context:
      'Use on landing pages, homepages, and marketing pages. The hero is the first thing users see and should communicate value proposition quickly.',
    structure: {
      description:
        'Full-width section, often full viewport height, with large typography, CTA button, and background image/video or illustration.',
      components: ['Background (image/video/gradient)', 'Headline', 'Subheadline/value prop', 'CTA button', 'Supporting visual'],
      variants: [
        'Image background hero',
        'Video background hero',
        'Split layout (text + image)',
        'Centered text hero',
        'Animated/interactive hero',
      ],
    },
    consequences: {
      benefits: [
        'Strong first impression',
        'Clear value proposition',
        'Prominent CTA',
        'Sets tone and brand',
      ],
      tradeoffs: [
        'Pushes content below fold',
        'Large images affect performance',
        'Can feel generic if poorly done',
        'Video can be distracting',
      ],
    },
    examples: [
      { description: 'SaaS landing page with product screenshot', platform: 'web' },
      { description: 'App download page with device mockup', platform: 'web' },
      { description: 'Portfolio with dramatic background image', platform: 'web' },
    ],
    relatedPatterns: ['pattern-card', 'pattern-cta-button'],
    antiPatterns: [
      'Hero with no clear CTA',
      'Auto-playing video without pause',
      'Text unreadable over image',
    ],
    accessibility: [
      'Ensure text contrast over images',
      'Pause option for videos',
      'Alt text for meaningful images',
      'CTA accessible by keyboard',
      'Respect reduced motion',
    ],
    tags: ['layout', 'hero', 'landing', 'marketing', 'banner', 'header'],
  },
  {
    id: 'pattern-split-view',
    name: 'Split View / Master-Detail',
    category: DesignCategory.USER_INTERFACE,
    type: 'layout',
    platforms: ['web', 'ios', 'desktop'],
    problem: 'Users need to browse a list of items while seeing details of a selected item without losing list context.',
    solution:
      'Split the interface into two panels: a list (master) on one side and details of the selected item on the other.',
    context:
      'Use for email clients, file browsers, settings panels, or any interface where users move between items frequently. Common on tablets and desktop.',
    structure: {
      description:
        'Two-column layout with list panel (usually narrower) and detail panel. Selection in list updates detail view.',
      components: ['List panel', 'Detail panel', 'Divider (resizable optional)', 'Selection indicator'],
      variants: [
        'Fixed split',
        'Collapsible list',
        'Resizable panels',
        'Stacked on mobile',
        'Three-column variant',
      ],
    },
    consequences: {
      benefits: [
        'Efficient item navigation',
        'Context preserved while viewing details',
        'Reduces page transitions',
        'Good for frequent switching',
      ],
      tradeoffs: [
        'Requires sufficient screen width',
        'Needs responsive behavior',
        'Complex state management',
        'Must handle empty selection',
      ],
    },
    examples: [
      { description: 'Email client with inbox list and email view', platform: 'desktop' },
      { description: 'File browser with folder tree and file view', platform: 'desktop' },
      { description: 'Settings with category list and settings panel', platform: 'all' },
    ],
    relatedPatterns: ['pattern-list', 'pattern-sidebar-navigation'],
    antiPatterns: [
      'On narrow mobile screens without adaptation',
      'No empty state for detail panel',
      'Selection not clearly indicated',
    ],
    accessibility: [
      'Keyboard navigation between panels',
      'Announce selection changes',
      'Focus management on selection',
      'Clear landmarks for each panel',
    ],
    tags: ['layout', 'split', 'master-detail', 'panels', 'list-detail'],
  },
  {
    id: 'pattern-infinite-scroll',
    name: 'Infinite Scroll',
    category: DesignCategory.WEB_DESIGN,
    type: 'layout',
    platforms: ['web', 'ios', 'android'],
    problem: 'There\'s a lot of content and users should be able to browse continuously without explicit pagination.',
    solution:
      'Automatically load more content as the user scrolls near the bottom of the page. Creates a seamless browsing experience.',
    context:
      'Use for social feeds, image galleries, search results when discovery is the goal. Consider pagination for task-oriented browsing or when users need to find specific items.',
    structure: {
      description:
        'Initial content loads, then more content appends as user scrolls. May include loading indicator at bottom.',
      components: ['Content container', 'Scroll detection', 'Loading indicator', 'End indicator (optional)'],
      variants: [
        'Pure infinite scroll',
        'Load more button + infinite scroll',
        'Virtual scrolling (for performance)',
      ],
    },
    consequences: {
      benefits: [
        'Seamless browsing',
        'No page navigation',
        'Good for discovery',
        'Engaging for content consumption',
      ],
      tradeoffs: [
        'Can\'t reach footer',
        'Hard to return to specific item',
        'Poor for SEO',
        'Back button behavior tricky',
        'Performance with many items',
      ],
    },
    examples: [
      { description: 'Twitter/X feed', platform: 'all' },
      { description: 'Instagram photo feed', platform: 'all' },
      { description: 'Pinterest pin grid', platform: 'web' },
    ],
    relatedPatterns: ['pattern-pagination', 'pattern-list'],
    antiPatterns: [
      'Infinite scroll hiding important footer content',
      'No loading indicator',
      'No way to access specific positions',
    ],
    accessibility: [
      'Announce new content loading',
      'Focus management for loaded content',
      'Provide alternative navigation',
      'Keyboard users can trigger loading',
    ],
    tags: ['layout', 'infinite-scroll', 'loading', 'feed', 'pagination'],
  },
  {
    id: 'pattern-bottom-sheet',
    name: 'Bottom Sheet',
    category: DesignCategory.MOBILE_DESIGN,
    type: 'layout',
    platforms: ['ios', 'android', 'web'],
    problem: 'Users need to access additional content or actions on mobile without navigating away from the current screen.',
    solution:
      'A panel that slides up from the bottom of the screen, partially covering content. Can be dismissed by swiping down or tapping outside.',
    context:
      'Use for contextual actions, sharing options, filters, or additional information on mobile. More mobile-native than modals. Common in Material Design.',
    structure: {
      description:
        'A panel attached to the bottom of the screen, slides up on trigger. May have drag handle, partial or full height.',
      components: ['Sheet container', 'Drag handle', 'Content area', 'Backdrop (optional)'],
      variants: [
        'Standard bottom sheet',
        'Modal bottom sheet (with backdrop)',
        'Persistent bottom sheet',
        'Expandable bottom sheet',
      ],
    },
    consequences: {
      benefits: [
        'Natural gesture (swipe up/down)',
        'In thumb zone for interaction',
        'Less disruptive than modal',
        'Can show partial content',
      ],
      tradeoffs: [
        'Mobile-centric pattern',
        'Limited height content',
        'Gesture conflicts possible',
        'Complex height management',
      ],
    },
    examples: [
      { description: 'Share sheet on iOS', platform: 'ios' },
      { description: 'Google Maps location details', platform: 'all' },
      { description: 'Music player now playing sheet', platform: 'all' },
    ],
    relatedPatterns: ['pattern-modal', 'pattern-action-sheet'],
    antiPatterns: [
      'Complex forms in bottom sheet',
      'Essential content hidden in collapsed state',
      'No swipe-to-dismiss',
    ],
    accessibility: [
      'Focus trap when modal',
      'Announce opening/closing',
      'Alternative to gesture dismiss',
      'Keyboard accessible content',
    ],
    tags: ['layout', 'bottom-sheet', 'mobile', 'overlay', 'drawer'],
  },
  {
    id: 'pattern-fab',
    name: 'Floating Action Button (FAB)',
    category: DesignCategory.MOBILE_DESIGN,
    type: 'layout',
    platforms: ['android', 'web', 'ios'],
    problem: 'There\'s a primary action on the screen that should be always visible and easily accessible.',
    solution:
      'A circular button floating above the content, typically in the bottom-right corner. Represents the primary action for the current screen.',
    context:
      'Use when there\'s one primary action for the screen (compose, add, create). More common in Material Design than iOS. Limit to one FAB per screen.',
    structure: {
      description:
        'A circular button with icon, positioned floating above content. May expand to reveal related actions.',
      components: ['Circular button', 'Icon', 'Shadow/elevation', 'Optional label', 'Speed dial actions (optional)'],
      variants: [
        'Standard FAB',
        'Mini FAB',
        'Extended FAB (with label)',
        'Speed dial FAB (expands)',
      ],
    },
    consequences: {
      benefits: [
        'Primary action always visible',
        'Easy to reach (bottom-right)',
        'Clear visual hierarchy',
        'Material Design standard',
      ],
      tradeoffs: [
        'Covers content',
        'Only for one primary action',
        'Icon must be clear',
        'May conflict with bottom nav',
      ],
    },
    examples: [
      { description: 'Gmail compose FAB', platform: 'android' },
      { description: 'Google Maps add location', platform: 'all' },
      { description: 'Note app create note button', platform: 'all' },
    ],
    relatedPatterns: ['pattern-bottom-navigation', 'pattern-button'],
    antiPatterns: [
      'Multiple FABs',
      'FAB for secondary actions',
      'FAB covering important content',
    ],
    accessibility: [
      'Clear accessible name (not just icon)',
      'Keyboard accessible',
      'Visible focus state',
      'Speed dial items accessible',
    ],
    tags: ['layout', 'fab', 'button', 'mobile', 'action', 'material'],
  },
];
