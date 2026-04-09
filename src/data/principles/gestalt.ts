import { DesignPrinciple } from '../../types/index.js';
import { DesignCategory } from '../../types/category.js';

/**
 * Gestalt Principles of Visual Perception
 * Based on early 20th century psychology research on how humans perceive visual elements
 */
export const gestaltPrinciples: DesignPrinciple[] = [
  {
    id: 'gestalt-proximity',
    name: 'Gestalt Principle of Proximity',
    category: DesignCategory.USER_INTERFACE,
    subcategory: 'gestalt',
    summary:
      'Objects that are near each other are perceived as a group. Use spacing to create visual relationships.',
    description:
      'Elements placed close together are perceived as related, while elements farther apart are seen as separate. This principle is fundamental to visual organization and allows designers to create groupings without borders or backgrounds. The spacing between elements communicates relationships.',
    rationale:
      'Proximity is one of the strongest visual grouping cues. Proper use of proximity can replace the need for explicit containers, creating cleaner designs while maintaining clear organization.',
    examples: {
      good: [
        'Form labels positioned directly above or beside their inputs',
        'Related action buttons grouped with tight spacing',
        'Card content with tight internal spacing, larger gaps between cards',
        'Navigation items in logical groups with spacing between groups',
        'Icon and label pairs with minimal gap between them',
        'Related list items with tighter spacing than section breaks',
      ],
      bad: [
        'Labels far from their associated inputs',
        'Equal spacing throughout a layout (no visual grouping)',
        'Related buttons scattered across the interface',
        'Unrelated elements positioned too close together',
        'Inconsistent spacing that confuses relationships',
      ],
    },
    applications: [
      'Form layout design',
      'Navigation grouping',
      'Card and list design',
      'Button grouping',
      'Dashboard organization',
      'Spacing systems',
    ],
    relatedPrinciples: ['law-of-proximity', 'gestalt-common-region', 'whitespace'],
    tags: ['gestalt', 'proximity', 'spacing', 'grouping', 'visual-hierarchy', 'layout'],
    source: 'Gestalt Psychology - Max Wertheimer (1923)',
    importance: 'critical',
  },
  {
    id: 'gestalt-similarity',
    name: 'Gestalt Principle of Similarity',
    category: DesignCategory.USER_INTERFACE,
    subcategory: 'gestalt',
    summary:
      'Elements that share visual characteristics (color, shape, size) are perceived as related or grouped.',
    description:
      'When elements look alike, users perceive them as part of the same group or having the same function. Similarity can be created through color, shape, size, texture, or orientation. Breaking similarity draws attention to different elements.',
    rationale:
      'Similarity helps users quickly understand what elements do without reading labels. Consistent styling of similar functions reduces cognitive load. Strategic breaks in similarity create emphasis.',
    examples: {
      good: [
        'All primary buttons sharing the same color and style',
        'Link text consistently styled across the site',
        'Icons with consistent style (outline, filled, or stroke width)',
        'Active navigation item with different color than inactive ones',
        'Error states consistently using red across all form fields',
        'Success indicators consistently using green and checkmarks',
      ],
      bad: [
        'Primary buttons with different colors on different pages',
        'Links that look like regular text in some places',
        'Mixed icon styles (some outlined, some filled)',
        'Different error indication methods for similar errors',
        'Inconsistent styling for the same type of content',
      ],
    },
    applications: [
      'Button styling',
      'Navigation design',
      'Icon systems',
      'Status indicators',
      'Data visualization',
      'Design systems',
    ],
    relatedPrinciples: ['consistency-and-standards', 'gestalt-proximity', 'visual-hierarchy'],
    tags: ['gestalt', 'similarity', 'consistency', 'color', 'shape', 'visual-design'],
    source: 'Gestalt Psychology - Max Wertheimer (1923)',
    importance: 'high',
  },
  {
    id: 'gestalt-continuity',
    name: 'Gestalt Principle of Continuity',
    category: DesignCategory.USER_INTERFACE,
    subcategory: 'gestalt',
    summary:
      'Elements arranged on a line or curve are perceived as more related than elements not on the line or curve.',
    description:
      'The eye naturally follows lines and curves. Elements aligned on a path are perceived as related. This principle guides the eye through a design and creates visual flow. Breaking continuity creates stopping points.',
    rationale:
      'Alignment creates order and guides attention. Well-aligned elements feel organized and professional. Poor alignment creates visual noise and makes interfaces harder to scan.',
    examples: {
      good: [
        'Left-aligned form labels and inputs',
        'Navigation items aligned on a horizontal or vertical axis',
        'Progress indicators showing steps on a line',
        'Timeline designs with events on a continuous line',
        'Grid layouts with consistent column alignment',
        'Stepper components with connected steps',
      ],
      bad: [
        'Randomly placed elements with no alignment',
        'Mixed alignments within the same section',
        'Steps that don\'t visually connect',
        'Lists with inconsistent indentation',
        'Layouts where eye has to jump around',
      ],
    },
    applications: [
      'Layout grids',
      'Form alignment',
      'Navigation design',
      'Progress indicators',
      'Timeline design',
      'Visual flow',
    ],
    relatedPrinciples: ['gestalt-proximity', 'alignment', 'visual-hierarchy'],
    tags: ['gestalt', 'continuity', 'alignment', 'flow', 'lines', 'visual-design'],
    source: 'Gestalt Psychology - Max Wertheimer (1923)',
    importance: 'high',
  },
  {
    id: 'gestalt-closure',
    name: 'Gestalt Principle of Closure',
    category: DesignCategory.USER_INTERFACE,
    subcategory: 'gestalt',
    summary:
      'The mind tends to complete incomplete shapes. Users perceive whole objects even when parts are missing.',
    description:
      'When presented with incomplete visual information, the human brain fills in the gaps to perceive a complete object. This allows designers to suggest shapes without drawing them completely, creating elegant and minimal designs.',
    rationale:
      'Closure enables minimalist design. Well-designed logos and icons leverage closure to convey meaning with less visual noise. It also explains why users understand implied boundaries.',
    examples: {
      good: [
        'IBM logo with striped letters that brain completes',
        'World Wildlife Fund panda logo with implied shapes',
        'Icons that suggest shapes without complete outlines',
        'Cards without full borders that still feel contained',
        'Progress circles that imply completion',
        'Hidden navigation that slides from implied edge',
      ],
      bad: [
        'Too many missing pieces that confuse rather than simplify',
        'Incomplete indicators that seem broken',
        'Shapes that are too abstract to complete mentally',
        'Gaps that look like errors rather than intentional design',
      ],
    },
    applications: [
      'Logo design',
      'Icon design',
      'Minimalist UI elements',
      'Progress indicators',
      'Image cropping',
      'Card design',
    ],
    relatedPrinciples: ['aesthetic-minimalist-design', 'gestalt-figure-ground'],
    tags: ['gestalt', 'closure', 'completion', 'minimalism', 'icons', 'visual-design'],
    source: 'Gestalt Psychology',
    importance: 'medium',
  },
  {
    id: 'gestalt-figure-ground',
    name: 'Gestalt Principle of Figure-Ground',
    category: DesignCategory.USER_INTERFACE,
    subcategory: 'gestalt',
    summary:
      'People instinctively separate elements into foreground (figure) and background (ground). Design should make this distinction clear.',
    description:
      'The eye naturally differentiates between the main subject (figure) and its surrounding area (ground). In UI design, this determines what users perceive as interactive content versus backdrop. Modal overlays, cards, and focus states all leverage figure-ground.',
    rationale:
      'Clear figure-ground relationships help users understand what\'s important and interactive. Ambiguous relationships cause confusion. Layering creates visual depth and hierarchy.',
    examples: {
      good: [
        'Modal dialogs with darkened backgrounds',
        'Cards elevated above the background with shadows',
        'Focus states that highlight active elements',
        'Dropdown menus that appear above page content',
        'Toast notifications that stand out from content',
        'Selected items with clear visual distinction',
      ],
      bad: [
        'Modals that blend into page content',
        'Flat designs where layers are unclear',
        'Menus that don\'t visually separate from content',
        'Active states that don\'t stand out',
        'Overlapping elements without clear depth',
      ],
    },
    applications: [
      'Modal design',
      'Card design',
      'Focus management',
      'Layering systems',
      'Overlay design',
      'Visual hierarchy',
    ],
    relatedPrinciples: ['visual-hierarchy', 'depth-and-elevation', 'gestalt-common-region'],
    tags: ['gestalt', 'figure-ground', 'layers', 'depth', 'focus', 'visual-design'],
    source: 'Gestalt Psychology - Edgar Rubin (1915)',
    importance: 'high',
  },
  {
    id: 'gestalt-common-region',
    name: 'Gestalt Principle of Common Region',
    category: DesignCategory.USER_INTERFACE,
    subcategory: 'gestalt',
    summary:
      'Elements within a bounded area are perceived as grouped. Borders and backgrounds create visual containers.',
    description:
      'When elements share a clearly defined boundary—whether through borders, backgrounds, or other visual containers—they are perceived as belonging together. This is foundational to card-based design and section organization.',
    rationale:
      'Common region is a strong grouping cue that works even when proximity would suggest otherwise. It allows flexible layouts while maintaining clear organization.',
    examples: {
      good: [
        'Card components containing related content',
        'Form sections with subtle background colors',
        'Navigation bars with distinct backgrounds',
        'Tooltip containers',
        'Alert boxes with borders',
        'Grouped settings within bordered sections',
      ],
      bad: [
        'Boundaries that split related content',
        'Missing containers for logically grouped elements',
        'Inconsistent use of containers',
        'Too many nested containers creating visual noise',
      ],
    },
    applications: [
      'Card design',
      'Form sections',
      'Navigation containers',
      'Alert and message design',
      'Settings grouping',
      'Dashboard panels',
    ],
    relatedPrinciples: ['gestalt-proximity', 'law-of-common-region', 'visual-hierarchy'],
    tags: ['gestalt', 'common-region', 'boundaries', 'containers', 'cards', 'visual-design'],
    source: 'Gestalt Psychology - Stephen Palmer (1992)',
    importance: 'high',
  },
  {
    id: 'gestalt-common-fate',
    name: 'Gestalt Principle of Common Fate',
    category: DesignCategory.USER_INTERFACE,
    subcategory: 'gestalt',
    summary:
      'Elements that move in the same direction are perceived as more related than elements moving differently or stationary.',
    description:
      'Motion creates grouping. Elements that animate together are seen as related. This principle is crucial for interface animations and transitions. It also applies to elements that change state together (like form fields in validation).',
    rationale:
      'Motion is a powerful attention director. Coordinated animations create cohesive experiences. Conflicting motions create visual confusion.',
    examples: {
      good: [
        'Multiple items collapsing/expanding together',
        'Page transitions where related elements move as a unit',
        'Drag and drop where selected items move together',
        'Parallax effects with grouped layers',
        'Loading animations that pulse in unison',
        'Bulk selection animations',
      ],
      bad: [
        'Unrelated elements animating at the same time',
        'Related items with conflicting animation directions',
        'Too many different motions happening simultaneously',
        'Animations that break logical groupings',
      ],
    },
    applications: [
      'UI animations',
      'Page transitions',
      'Multi-select interactions',
      'Loading states',
      'Parallax effects',
      'Gesture responses',
    ],
    relatedPrinciples: ['gestalt-proximity', 'gestalt-similarity', 'motion-design'],
    tags: ['gestalt', 'common-fate', 'motion', 'animation', 'transitions', 'interaction'],
    source: 'Gestalt Psychology - Max Wertheimer (1923)',
    importance: 'medium',
  },
  {
    id: 'gestalt-focal-point',
    name: 'Gestalt Principle of Focal Point',
    category: DesignCategory.USER_INTERFACE,
    subcategory: 'gestalt',
    summary:
      'Elements that stand out visually capture attention first. Create clear focal points to guide user attention.',
    description:
      'Whatever stands out visually will attract attention first. Focal points can be created through size, color, contrast, shape, or position. Every screen should have a clear primary focal point that guides users to the most important element.',
    rationale:
      'Without clear focal points, users\' attention wanders aimlessly. Strategic focal points guide users through the interface in the intended order and ensure important elements aren\'t missed.',
    examples: {
      good: [
        'Large, high-contrast call-to-action buttons',
        'Hero sections with prominent headlines',
        'Error indicators that stand out from the form',
        'Primary navigation item highlighted',
        'Featured content with visual emphasis',
        'Success celebrations with prominent visuals',
      ],
      bad: [
        'Everything competing for attention equally',
        'Important actions that don\'t stand out',
        'Buried call-to-actions',
        'Multiple equally prominent elements confusing priority',
        'Subtle errors that users miss',
      ],
    },
    applications: [
      'Call-to-action design',
      'Landing pages',
      'Error highlighting',
      'Visual hierarchy',
      'Hero sections',
      'Feature emphasis',
    ],
    relatedPrinciples: ['visual-hierarchy', 'contrast', 'emphasis'],
    tags: ['gestalt', 'focal-point', 'attention', 'emphasis', 'hierarchy', 'visual-design'],
    source: 'Gestalt Psychology',
    importance: 'high',
  },
];
