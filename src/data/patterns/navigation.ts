import { DesignPattern } from '../../types/index.js';
import { DesignCategory } from '../../types/category.js';

/**
 * Navigation Design Patterns
 * Common patterns for helping users navigate interfaces
 */
export const navigationPatterns: DesignPattern[] = [
  {
    id: 'pattern-tabs',
    name: 'Tabs',
    category: DesignCategory.USER_INTERFACE,
    type: 'navigation',
    platforms: ['web', 'ios', 'android', 'desktop'],
    problem: 'Users need to switch between different views or sections of related content within the same page.',
    solution:
      'Provide a horizontal row of labeled tabs that let users switch between content panels. One tab is always active, showing its associated content.',
    context:
      'Use when you have 2-7 distinct categories of content that belong together conceptually but are too much to show simultaneously. Tabs should represent mutually exclusive views.',
    structure: {
      description:
        'A tab bar container with individual tab items. Each tab has a label and may have an icon. The active tab is visually distinguished. Below is the content panel that changes based on selection.',
      components: ['Tab container', 'Tab items', 'Active tab indicator', 'Content panel'],
      variants: ['Horizontal tabs (most common)', 'Vertical tabs (for many items)', 'Pill tabs', 'Underlined tabs', 'Filled tabs'],
    },
    consequences: {
      benefits: [
        'Reduces page clutter by showing one section at a time',
        'Provides clear organization of related content',
        'Easy to understand and use',
        'Preserves screen space',
        'Allows quick switching between views',
      ],
      tradeoffs: [
        'Content in non-active tabs is hidden',
        'Doesn\'t scale well beyond 5-7 tabs',
        'May require horizontal scrolling on mobile',
        'Users may not discover all tabs',
        'Tab labels must be short',
      ],
    },
    examples: [
      { description: 'Product page tabs (Description, Reviews, Specs)', platform: 'web' },
      { description: 'Settings app with General, Privacy, Network tabs', platform: 'desktop' },
      { description: 'Social profile tabs (Posts, Likes, Media)', platform: 'all' },
    ],
    relatedPatterns: ['pattern-bottom-navigation', 'pattern-segmented-control'],
    antiPatterns: ['Using tabs for sequential steps (use stepper instead)', 'Nesting tabs within tabs'],
    accessibility: [
      'Use role="tablist" for the container',
      'Use role="tab" for each tab',
      'Use role="tabpanel" for content panels',
      'Manage aria-selected state',
      'Support arrow key navigation between tabs',
      'Ensure keyboard focus is managed correctly',
    ],
    tags: ['tabs', 'navigation', 'organization', 'categories', 'panels'],
  },
  {
    id: 'pattern-sidebar-navigation',
    name: 'Sidebar Navigation',
    category: DesignCategory.USER_INTERFACE,
    type: 'navigation',
    platforms: ['web', 'desktop'],
    problem: 'Users need access to multiple sections of an application, and the navigation structure is deep or has many items.',
    solution:
      'Provide a vertical sidebar along the left edge containing navigation links. The sidebar remains visible as users navigate, providing constant access to the navigation structure.',
    context:
      'Use for applications with complex navigation needs, dashboards, or content-rich sites. Best when users frequently jump between sections. Common in admin panels, productivity tools, and enterprise software.',
    structure: {
      description:
        'A fixed or sticky vertical column, usually 200-280px wide, containing navigation items. May include sections, icons, expandable groups, and a header/logo area.',
      components: ['Sidebar container', 'Navigation items', 'Section headers', 'Active indicator', 'Collapse control (optional)'],
      variants: [
        'Full sidebar (always expanded)',
        'Collapsible sidebar (with toggle)',
        'Icon-only collapsed state',
        'Overlay sidebar (mobile)',
        'Multi-level with nested items',
      ],
    },
    consequences: {
      benefits: [
        'Supports many navigation items',
        'Always visible for quick access',
        'Can show hierarchy and grouping',
        'Works well for deep navigation',
        'Current location always visible',
      ],
      tradeoffs: [
        'Takes horizontal space from content',
        'Doesn\'t work well on mobile (becomes overlay)',
        'Can be overwhelming with too many items',
        'Requires distinct active state design',
      ],
    },
    examples: [
      { description: 'Admin dashboard with sections for Users, Settings, Reports', platform: 'web' },
      { description: 'Email client with folders (Inbox, Sent, Drafts, etc.)', platform: 'desktop' },
      { description: 'Documentation site with section hierarchy', platform: 'web' },
    ],
    relatedPatterns: ['pattern-hamburger-menu', 'pattern-breadcrumbs'],
    antiPatterns: ['Using on mobile without responsive behavior', 'Too many levels of nesting'],
    accessibility: [
      'Use nav element or role="navigation"',
      'Indicate current page with aria-current="page"',
      'Make collapsible sections keyboard accessible',
      'Announce expanded/collapsed state',
      'Support skip links to bypass navigation',
    ],
    tags: ['sidebar', 'navigation', 'vertical', 'menu', 'dashboard'],
  },
  {
    id: 'pattern-hamburger-menu',
    name: 'Hamburger Menu',
    category: DesignCategory.MOBILE_DESIGN,
    type: 'navigation',
    platforms: ['web', 'ios', 'android'],
    problem: 'Screen space is limited but users need access to navigation options that don\'t fit in the visible interface.',
    solution:
      'Hide navigation behind a three-line "hamburger" icon (☰). Tapping reveals a menu (usually as a sidebar overlay or dropdown) containing navigation options.',
    context:
      'Common on mobile where screen space is limited. Use for secondary navigation on mobile or when you have more than 4-5 top-level navigation items. Less appropriate as primary navigation on desktop.',
    structure: {
      description:
        'A hamburger icon button that toggles a navigation panel. The panel typically slides in from the left or drops down. Includes navigation items and may have user account info.',
      components: ['Hamburger icon button', 'Overlay/backdrop', 'Navigation panel', 'Close mechanism', 'Navigation items'],
      variants: [
        'Left slide-in drawer',
        'Right slide-in drawer',
        'Full-screen overlay',
        'Dropdown menu',
        'Bottom sheet menu',
      ],
    },
    consequences: {
      benefits: [
        'Saves screen space',
        'Can contain many navigation items',
        'Familiar pattern users recognize',
        'Allows full-width content area',
      ],
      tradeoffs: [
        'Hides navigation from view (out of sight, out of mind)',
        'Requires extra tap to access navigation',
        'Less discoverable than visible navigation',
        'Can hurt engagement with hidden sections',
        'Controversial for desktop use',
      ],
    },
    examples: [
      { description: 'Mobile website with logo and hamburger in header', platform: 'web' },
      { description: 'Mobile app with hamburger revealing nav drawer', platform: 'android' },
      { description: 'Responsive site converting top nav to hamburger on mobile', platform: 'web' },
    ],
    relatedPatterns: ['pattern-sidebar-navigation', 'pattern-bottom-navigation'],
    antiPatterns: [
      'Using on desktop when space permits visible navigation',
      'Hamburger as only navigation with critical features',
      'Deep nesting within the hamburger menu',
    ],
    accessibility: [
      'Button should have accessible name (e.g., "Menu")',
      'Use aria-expanded to indicate state',
      'Trap focus within open menu',
      'Close menu on Escape key',
      'Manage focus when opening/closing',
    ],
    tags: ['hamburger', 'menu', 'mobile', 'navigation', 'drawer', 'responsive'],
  },
  {
    id: 'pattern-bottom-navigation',
    name: 'Bottom Navigation',
    category: DesignCategory.MOBILE_DESIGN,
    type: 'navigation',
    platforms: ['ios', 'android'],
    problem: 'Mobile users need quick access to top-level destinations while keeping content visible and primary actions in thumb reach.',
    solution:
      'Place a navigation bar at the bottom of the screen with 3-5 icon-and-label destinations. The current destination is highlighted.',
    context:
      'Use for mobile apps with 3-5 equally important top-level destinations. This is the primary navigation pattern for both iOS (tab bar) and Android (bottom navigation). Not suitable for less than 3 or more than 5 destinations.',
    structure: {
      description:
        'A fixed bar at the bottom of the screen containing 3-5 navigation items. Each item has an icon and label. The active destination is visually distinguished.',
      components: ['Bottom bar container', 'Navigation items', 'Icons', 'Labels', 'Active indicator', 'Badge indicators (optional)'],
      variants: [
        'Standard with icons and labels',
        'Active label only (inactive items icon-only)',
        'Shifting navigation (Material Design)',
        'With FAB integrated',
      ],
    },
    consequences: {
      benefits: [
        'Primary destinations always visible',
        'Within thumb reach for one-handed use',
        'Shows current location',
        'Familiar mobile pattern',
        'Supports badges for notifications',
      ],
      tradeoffs: [
        'Limited to 3-5 destinations',
        'Takes space from content area',
        'Must use icons (which can be ambiguous)',
        'Doesn\'t support hierarchy',
        'Can conflict with system gestures',
      ],
    },
    examples: [
      { description: 'iOS app with Home, Search, Add, Inbox, Profile', platform: 'ios' },
      { description: 'Android app following Material Design bottom nav', platform: 'android' },
      { description: 'Social media app with Feed, Explore, Create, Notifications, Profile', platform: 'all' },
    ],
    relatedPatterns: ['pattern-tabs', 'pattern-fab'],
    antiPatterns: [
      'More than 5 items (use alternative navigation)',
      'Using on tablet/desktop',
      'Hiding bottom nav while scrolling (except for video)',
    ],
    accessibility: [
      'Use role="navigation" or nav element',
      'Clear accessible names for each destination',
      'aria-current="page" for active item',
      'Announce badge counts',
      'Support reduced motion for transitions',
    ],
    tags: ['bottom-nav', 'tabs', 'mobile', 'navigation', 'ios', 'android', 'thumb-zone'],
  },
  {
    id: 'pattern-breadcrumbs',
    name: 'Breadcrumbs',
    category: DesignCategory.WEB_DESIGN,
    type: 'navigation',
    platforms: ['web', 'desktop'],
    problem: 'Users navigating a hierarchical site structure need to understand their current location and easily navigate to parent pages.',
    solution:
      'Display a horizontal trail showing the path from the home page to the current page. Each level is a clickable link except the current page.',
    context:
      'Use on sites with hierarchical structure deeper than 2 levels. E-commerce, documentation, and content sites benefit most. Less useful on flat sites or apps without page hierarchy.',
    structure: {
      description:
        'A horizontal row of links separated by delimiters (>, /, or icons), showing the hierarchical path. The current page is typically non-clickable text.',
      components: ['Container', 'Parent page links', 'Separators', 'Current page indicator'],
      variants: [
        'Location-based (reflects site hierarchy)',
        'Path-based (shows user\'s browsing path)',
        'Attribute-based (shows filters applied)',
      ],
    },
    consequences: {
      benefits: [
        'Shows current location in hierarchy',
        'Enables quick jumps to parent sections',
        'Reduces navigation effort for deep pages',
        'Helps users understand site structure',
        'Low visual footprint',
      ],
      tradeoffs: [
        'Takes horizontal space',
        'Long paths may wrap or truncate',
        'Requires meaningful page titles',
        'Less useful on flat site structures',
      ],
    },
    examples: [
      { description: 'E-commerce: Home > Electronics > Phones > iPhone', platform: 'web' },
      { description: 'Documentation: Docs > API > Authentication > OAuth', platform: 'web' },
      { description: 'File browser showing folder path', platform: 'desktop' },
    ],
    relatedPatterns: ['pattern-sidebar-navigation'],
    antiPatterns: [
      'Using as primary navigation',
      'On sites with flat structure',
      'Duplicating the nav structure exactly',
    ],
    accessibility: [
      'Use nav element with aria-label="Breadcrumb"',
      'Use ordered list markup',
      'Mark current page with aria-current="page"',
      'Ensure sufficient contrast for separators',
      'Links must be keyboard accessible',
    ],
    tags: ['breadcrumbs', 'navigation', 'hierarchy', 'location', 'wayfinding'],
  },
  {
    id: 'pattern-search',
    name: 'Search',
    category: DesignCategory.USER_INTERFACE,
    type: 'navigation',
    platforms: ['web', 'ios', 'android', 'desktop'],
    problem: 'Users need to find specific content in a large collection when they know what they\'re looking for.',
    solution:
      'Provide a search input where users can type queries, with results displayed either inline or on a dedicated results page. Include suggestions and filters to help refine searches.',
    context:
      'Use when there\'s enough content that browsing would be inefficient. Essential for content-heavy sites, e-commerce, and any application where users have specific goals.',
    structure: {
      description:
        'A text input (often with search icon) that accepts queries. May include autocomplete suggestions, search history, and filters. Results may appear as you type or after submission.',
      components: ['Search input', 'Search icon', 'Clear button', 'Autocomplete dropdown', 'Results display', 'Filters (optional)'],
      variants: [
        'Persistent search bar',
        'Expandable search (icon to field)',
        'Full-screen search overlay',
        'Search with filters sidebar',
        'Voice search enabled',
      ],
    },
    consequences: {
      benefits: [
        'Direct path to content for users who know what they want',
        'Handles large content collections',
        'Can reveal content organization issues',
        'Search data provides user insights',
      ],
      tradeoffs: [
        'Requires backend search infrastructure',
        'Poor search results frustrate users',
        'May bypass browsing (less discovery)',
        'Needs good content indexing',
      ],
    },
    examples: [
      { description: 'E-commerce search with product suggestions', platform: 'web' },
      { description: 'Spotlight search on macOS', platform: 'desktop' },
      { description: 'App store search with app results', platform: 'ios' },
    ],
    relatedPatterns: ['pattern-autocomplete', 'pattern-filters'],
    antiPatterns: [
      'Search without useful results ranking',
      'No feedback when no results found',
      'Search that doesn\'t handle typos',
    ],
    accessibility: [
      'Use role="search" or type="search"',
      'Label the search input',
      'Announce autocomplete results to screen readers',
      'Support keyboard navigation in results',
      'Clear button accessible to keyboard users',
    ],
    tags: ['search', 'navigation', 'find', 'query', 'autocomplete'],
  },
  {
    id: 'pattern-pagination',
    name: 'Pagination',
    category: DesignCategory.WEB_DESIGN,
    type: 'navigation',
    platforms: ['web', 'desktop'],
    problem: 'There\'s too much content to display on one page, and users need to navigate through pages of results.',
    solution:
      'Split content into pages and provide controls to navigate between them. Show current page, total pages (or results), and navigation controls.',
    context:
      'Use for search results, product listings, tables with many rows, or any content too large to display at once. Consider infinite scroll or "load more" as alternatives.',
    structure: {
      description:
        'Page number indicators, previous/next buttons, and optionally first/last buttons. May include page size selector and result count.',
      components: ['Page numbers', 'Previous/Next buttons', 'First/Last buttons (optional)', 'Current page indicator', 'Results count'],
      variants: [
        'Numbered pagination',
        'Simple prev/next only',
        'With ellipsis for large page counts',
        'With page size selector',
        'Mobile: load more button',
      ],
    },
    consequences: {
      benefits: [
        'Users can jump to specific pages',
        'Shows total content size',
        'Allows bookmarking specific pages',
        'Better for SEO than infinite scroll',
        'Predictable content loading',
      ],
      tradeoffs: [
        'Interrupts browsing flow',
        'Page loads between pages',
        'Users may never see later pages',
        'Can feel dated compared to infinite scroll',
      ],
    },
    examples: [
      { description: 'Google search results with page numbers', platform: 'web' },
      { description: 'E-commerce product listing with pagination', platform: 'web' },
      { description: 'Admin table with page controls', platform: 'web' },
    ],
    relatedPatterns: ['pattern-infinite-scroll', 'pattern-load-more'],
    antiPatterns: ['Pagination for small datasets', 'No indication of total pages', 'Pagination without keyboard support'],
    accessibility: [
      'Use nav element with aria-label="Pagination"',
      'Mark current page with aria-current="page"',
      'Disable unavailable buttons (not just visually)',
      'Clear labels for prev/next (not just arrows)',
      'Announce page changes to screen readers',
    ],
    tags: ['pagination', 'pages', 'navigation', 'results', 'lists'],
  },
];
