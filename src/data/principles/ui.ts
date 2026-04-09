import { DesignPrinciple } from '../../types/index.js';
import { DesignCategory } from '../../types/category.js';

/**
 * Visual Design and UI Principles
 * Core principles for creating effective visual interfaces
 */
export const uiPrinciples: DesignPrinciple[] = [
  {
    id: 'visual-hierarchy',
    name: 'Visual Hierarchy',
    category: DesignCategory.USER_INTERFACE,
    subcategory: 'visual',
    summary:
      'Arrange elements to show their order of importance. Guide users\' attention through size, color, contrast, and spacing.',
    description:
      'Visual hierarchy determines the order in which the eye perceives what it sees. It is created through the deliberate arrangement of elements using size, color, contrast, spacing, and position. Good hierarchy ensures users see the most important elements first and understand the structure of information.',
    rationale:
      'Without hierarchy, all elements compete for attention equally, making interfaces overwhelming and hard to navigate. Clear hierarchy speeds comprehension and helps users find what they need.',
    examples: {
      good: [
        'Headlines larger than body text',
        'Primary buttons more prominent than secondary',
        'Important information above the fold',
        'Color used to emphasize key elements',
        'Whitespace creating breathing room for important content',
        'F-pattern or Z-pattern layouts for web content',
      ],
      bad: [
        'All text the same size',
        'Multiple elements competing for attention',
        'Important actions buried below the fold',
        'No clear entry point on a page',
        'Overwhelming amount of equally-weighted information',
      ],
    },
    applications: [
      'Page layout',
      'Typography scale',
      'Button prominence',
      'Information architecture',
      'Dashboard design',
      'Landing pages',
    ],
    relatedPrinciples: ['gestalt-focal-point', 'contrast', 'typography-hierarchy'],
    tags: ['hierarchy', 'visual-design', 'layout', 'attention', 'importance', 'scanning'],
    importance: 'critical',
  },
  {
    id: 'contrast',
    name: 'Contrast',
    category: DesignCategory.USER_INTERFACE,
    subcategory: 'visual',
    summary:
      'Use contrast to make elements distinguishable and to create visual interest. Contrast aids readability and hierarchy.',
    description:
      'Contrast is the difference between elements—in color, size, shape, or other properties. Sufficient contrast ensures readability (especially for text), distinguishes interactive from non-interactive elements, and creates visual interest. WCAG requires minimum contrast ratios for accessibility.',
    rationale:
      'Low contrast makes interfaces hard to read and navigate, especially for users with visual impairments. Strategic contrast guides attention and creates clear distinctions.',
    examples: {
      good: [
        'Dark text on light background (or vice versa) meeting WCAG ratios',
        'Primary buttons with high contrast against background',
        'Active states clearly distinct from inactive',
        'Error states with high-contrast red indicators',
        'Visited links distinguishable from unvisited',
        'Focus states with visible outlines',
      ],
      bad: [
        'Light gray text on white background',
        'Low contrast between primary and secondary buttons',
        'Placeholder text that\'s hard to read',
        'Disabled states indistinguishable from enabled',
        'Links that look like body text',
      ],
    },
    applications: [
      'Text readability',
      'Button design',
      'State indicators',
      'Data visualization',
      'Accessibility',
      'Dark mode design',
    ],
    relatedPrinciples: ['accessibility-color-contrast', 'visual-hierarchy', 'gestalt-figure-ground'],
    tags: ['contrast', 'readability', 'accessibility', 'color', 'visual-design', 'wcag'],
    importance: 'critical',
  },
  {
    id: 'alignment',
    name: 'Alignment',
    category: DesignCategory.USER_INTERFACE,
    subcategory: 'visual',
    summary:
      'Every element should have a visual connection with other elements on the page. Nothing should be placed arbitrarily.',
    description:
      'Alignment creates a sense of unity and cohesion. Elements should be aligned to invisible lines that connect them to other elements. Strong alignment makes layouts feel organized and professional. Even deliberate breaking of alignment should be purposeful.',
    rationale:
      'Arbitrary placement creates visual noise and makes interfaces feel chaotic. Consistent alignment reduces cognitive load and makes scanning easier.',
    examples: {
      good: [
        'Left-aligned text creating a strong vertical edge',
        'Form labels consistently aligned',
        'Grid-based layouts',
        'Icons aligned with text baselines',
        'Navigation items on a consistent axis',
        'Content aligned to a column grid',
      ],
      bad: [
        'Centered and left-aligned text mixed randomly',
        'Elements placed without reference to others',
        'Inconsistent margins and padding',
        'Icons misaligned with adjacent text',
        'No visible grid structure',
      ],
    },
    applications: [
      'Grid systems',
      'Form layout',
      'Typography',
      'Icon placement',
      'Page composition',
      'Navigation design',
    ],
    relatedPrinciples: ['gestalt-continuity', 'consistency-and-standards', 'whitespace'],
    tags: ['alignment', 'grid', 'layout', 'organization', 'visual-design', 'structure'],
    importance: 'high',
  },
  {
    id: 'whitespace',
    name: 'Whitespace (Negative Space)',
    category: DesignCategory.USER_INTERFACE,
    subcategory: 'visual',
    summary:
      'Empty space between elements improves readability, creates hierarchy, and gives designs room to breathe.',
    description:
      'Whitespace is the empty space between elements. It\'s not wasted space—it\'s a design element that improves comprehension, creates grouping, establishes hierarchy, and guides attention. Generous whitespace often signals quality and sophistication.',
    rationale:
      'Cramped interfaces overwhelm users. Whitespace provides visual rest, separates content sections, and improves both readability and comprehension. Studies show increased whitespace around content improves reading comprehension.',
    examples: {
      good: [
        'Generous padding around call-to-action buttons',
        'Clear spacing between form sections',
        'Breathing room around images and important content',
        'Line height that prevents text from feeling cramped',
        'Margins that prevent elements from touching edges',
        'Empty space guiding focus to key content',
      ],
      bad: [
        'Elements crammed together with no spacing',
        'Text running edge to edge',
        'Buttons too close to other elements',
        'Dense layouts with no visual breaks',
        'Inconsistent spacing throughout the interface',
      ],
    },
    applications: [
      'Layout spacing',
      'Typography (line height, letter spacing)',
      'Card design',
      'Button placement',
      'Content sections',
      'Hero areas',
    ],
    relatedPrinciples: ['gestalt-proximity', 'aesthetic-minimalist-design', 'visual-hierarchy'],
    tags: ['whitespace', 'spacing', 'negative-space', 'layout', 'readability', 'visual-design'],
    importance: 'high',
  },
  {
    id: 'repetition',
    name: 'Repetition and Consistency',
    category: DesignCategory.USER_INTERFACE,
    subcategory: 'visual',
    summary:
      'Repeat visual elements throughout the design to create cohesion, unity, and a sense of visual rhythm.',
    description:
      'Repeating visual elements—colors, fonts, shapes, spatial relationships—creates unity and strengthens the design. Repetition ties separate parts together, establishes identity, and makes interfaces learnable. This is the foundation of design systems.',
    rationale:
      'Consistent repetition builds familiarity and reduces cognitive load. Users learn patterns once and apply them throughout. It also establishes brand identity and professionalism.',
    examples: {
      good: [
        'Consistent button styles throughout the app',
        'Repeated color palette for categorization',
        'Consistent icon style (outline, filled)',
        'Same spacing rhythm between sections',
        'Repeated card patterns for similar content',
        'Consistent header treatment across pages',
      ],
      bad: [
        'Different button styles on each page',
        'Random colors without meaning',
        'Mixed icon styles',
        'Varying spacing patterns',
        'One-off component designs',
      ],
    },
    applications: [
      'Design systems',
      'Component libraries',
      'Brand identity',
      'Pattern libraries',
      'Style guides',
      'Theme design',
    ],
    relatedPrinciples: ['consistency-and-standards', 'gestalt-similarity'],
    tags: ['repetition', 'consistency', 'patterns', 'unity', 'visual-design', 'design-system'],
    importance: 'high',
  },
  {
    id: 'color-theory',
    name: 'Color Theory in UI',
    category: DesignCategory.USER_INTERFACE,
    subcategory: 'color',
    summary:
      'Use color purposefully to communicate meaning, create hierarchy, and evoke emotions. Follow accessibility standards.',
    description:
      'Color communicates meaning, establishes hierarchy, and creates emotional responses. In UI, colors should have consistent semantic meanings (red for errors, green for success). Color choices must meet accessibility contrast requirements. Don\'t rely on color alone to convey information.',
    rationale:
      'Color is a powerful communication tool but comes with responsibilities. Poor color choices reduce usability and exclude users with color vision deficiencies. Strategic color use improves comprehension and engagement.',
    examples: {
      good: [
        'Red for errors, green for success, yellow/amber for warnings',
        'Primary brand color for key call-to-actions',
        'Muted colors for less important elements',
        'Sufficient contrast for text readability',
        'Color paired with icons/text for colorblind users',
        '60-30-10 color distribution rule',
      ],
      bad: [
        'Red for positive actions, green for errors',
        'Low contrast color combinations',
        'Color as the only differentiator',
        'Too many competing colors',
        'Vibrating color combinations',
        'Inconsistent color meanings',
      ],
    },
    applications: [
      'Status indicators',
      'Call-to-action buttons',
      'Form validation',
      'Data visualization',
      'Brand expression',
      'Dark/light modes',
    ],
    relatedPrinciples: ['contrast', 'accessibility-color-contrast', 'consistency-and-standards'],
    tags: ['color', 'visual-design', 'accessibility', 'semantics', 'branding', 'emotion'],
    importance: 'high',
  },
  {
    id: 'typography-hierarchy',
    name: 'Typography Hierarchy',
    category: DesignCategory.USER_INTERFACE,
    subcategory: 'typography',
    summary:
      'Establish a clear typographic scale that creates hierarchy and improves readability. Use size, weight, and style to differentiate.',
    description:
      'Typography hierarchy uses font size, weight, style, color, and spacing to establish importance and guide reading. A well-defined type scale creates consistency while clearly differentiating headlines, subheadlines, body text, captions, and labels.',
    rationale:
      'Typography is often the primary visual element in interfaces. Clear type hierarchy speeds scanning, improves comprehension, and creates professional polish. Poor typography makes content hard to read and navigate.',
    examples: {
      good: [
        'Clear size distinction between heading levels',
        'Bold or semibold for emphasis, not all caps',
        'Consistent line heights for readability',
        'Appropriate font sizes for different contexts',
        'Type scale with mathematical ratios',
        'Different weights rather than just sizes',
      ],
      bad: [
        'Too many font sizes with no clear system',
        'All text the same size',
        'Headlines barely larger than body text',
        'Tight line height making text hard to read',
        'Too many font families',
      ],
    },
    applications: [
      'Type scale systems',
      'Heading hierarchy',
      'Body text styling',
      'UI labels',
      'Navigation text',
      'Responsive typography',
    ],
    relatedPrinciples: ['visual-hierarchy', 'readability', 'contrast'],
    tags: ['typography', 'hierarchy', 'type-scale', 'fonts', 'readability', 'visual-design'],
    importance: 'high',
  },
  {
    id: 'depth-and-elevation',
    name: 'Depth and Elevation',
    category: DesignCategory.USER_INTERFACE,
    subcategory: 'visual',
    summary:
      'Use shadows, layering, and z-index to create depth. Elevation communicates hierarchy and interactive states.',
    description:
      'Depth creates a sense of layering in flat screens. Shadows, overlapping elements, and blurring create visual hierarchy and indicate interactive relationships. Material Design popularized elevation as a systematic approach to depth.',
    rationale:
      'Depth helps users understand spatial relationships and interaction possibilities. Cards appear above surfaces, modals float above pages, tooltips hover near their targets. Proper depth cues reduce confusion.',
    examples: {
      good: [
        'Cards with subtle shadows',
        'Modals with strong elevation above darkened background',
        'Dropdown menus with shadow indicating they\'re above content',
        'Raised buttons showing they\'re interactive',
        'Consistent shadow intensity for same elevation levels',
        'Focus states with elevated appearance',
      ],
      bad: [
        'Flat elements that should appear elevated',
        'Inconsistent shadow usage',
        'Too strong shadows that distract',
        'Modals without clear elevation above page',
        'Menus that blend into content',
      ],
    },
    applications: [
      'Card design',
      'Modal design',
      'Dropdown menus',
      'Button states',
      'Toast notifications',
      'Floating action buttons',
    ],
    relatedPrinciples: ['gestalt-figure-ground', 'visual-hierarchy'],
    tags: ['depth', 'elevation', 'shadows', 'layers', 'z-index', 'visual-design'],
    importance: 'medium',
  },
  {
    id: 'responsive-design',
    name: 'Responsive Design',
    category: DesignCategory.USER_INTERFACE,
    subcategory: 'layout',
    summary:
      'Design interfaces that adapt fluidly to different screen sizes and devices, ensuring usability across all contexts.',
    description:
      'Responsive design ensures interfaces work across all screen sizes—from mobile phones to large desktop monitors. This includes flexible grids, scalable typography, adaptive layouts, and appropriate touch/click targets. Mobile-first approach often yields cleaner designs.',
    rationale:
      'Users access interfaces on countless devices. Non-responsive designs alienate large portions of users and create poor experiences. Responsive design is an expectation, not a feature.',
    examples: {
      good: [
        'Fluid grids that reflow content based on viewport',
        'Touch-friendly tap targets on mobile (44px minimum)',
        'Navigation that collapses to hamburger on small screens',
        'Images that scale appropriately',
        'Typography that adjusts for readability',
        'Different layouts for different breakpoints',
      ],
      bad: [
        'Fixed-width layouts that cause horizontal scrolling',
        'Tiny tap targets on mobile',
        'Desktop patterns forced onto mobile',
        'Text too small to read on mobile',
        'Images that break layouts on small screens',
      ],
    },
    applications: [
      'Grid systems',
      'Breakpoint strategy',
      'Navigation patterns',
      'Image handling',
      'Typography scaling',
      'Touch optimization',
    ],
    relatedPrinciples: ['mobile-first', 'fitts-law', 'flexibility-and-efficiency'],
    tags: ['responsive', 'mobile', 'breakpoints', 'adaptive', 'fluid', 'layout'],
    importance: 'critical',
  },
  {
    id: 'iconography',
    name: 'Iconography Principles',
    category: DesignCategory.USER_INTERFACE,
    subcategory: 'visual',
    summary:
      'Icons should be simple, recognizable, and consistent in style. They support text but rarely replace it entirely.',
    description:
      'Icons are visual shortcuts that communicate meaning quickly when well-designed. Effective icons are simple, use consistent style, and pair with text labels for clarity. Icons alone are often ambiguous—the hamburger menu and save disk icons are rare universally understood exceptions.',
    rationale:
      'Icons speed recognition when users already know their meaning. However, icon-only interfaces often confuse users. Labels plus icons provide the best of both: quick recognition for experts, clarity for newcomers.',
    examples: {
      good: [
        'Icon paired with text label: 🔍 Search',
        'Consistent icon family (all outlined or all filled)',
        'Standard meanings for common icons (gear = settings)',
        'Appropriate icon size relative to context',
        'Icons aligned with text baselines',
        'Tooltips for icon-only buttons',
      ],
      bad: [
        'Icon-only navigation without tooltips',
        'Mixed icon styles in the same interface',
        'Ambiguous icons without labels',
        'Custom icons for standard concepts',
        'Tiny icons that are hard to discern',
      ],
    },
    applications: [
      'Navigation design',
      'Button design',
      'Status indicators',
      'Feature identification',
      'Mobile UI',
      'Toolbar design',
    ],
    relatedPrinciples: ['recognition-over-recall', 'consistency-and-standards', 'affordance'],
    tags: ['icons', 'iconography', 'visual-design', 'navigation', 'symbols', 'recognition'],
    importance: 'high',
  },
  {
    id: 'grid-systems',
    name: 'Grid Systems',
    category: DesignCategory.USER_INTERFACE,
    subcategory: 'layout',
    summary:
      'Use grid systems to create consistent, organized layouts. Grids provide structure while enabling creative flexibility.',
    description:
      'Grid systems divide a page into columns and rows, creating a framework for placing elements consistently. Standard grids (12-column, 8pt) enable responsive design and consistent spacing. Good grids feel invisible—they organize without constraining.',
    rationale:
      'Grids create visual rhythm and make layouts predictable. They speed design decisions, ensure consistency across pages, and make responsive design manageable.',
    examples: {
      good: [
        '12-column grid for flexible layouts',
        '8-point grid for spacing consistency',
        'Column gutters creating rhythm',
        'Content spanning appropriate column counts',
        'Responsive grid that adapts to breakpoints',
        'Baseline grid for typography alignment',
      ],
      bad: [
        'No underlying grid structure',
        'Elements placed arbitrarily',
        'Inconsistent gutters and margins',
        'Grid so rigid it harms content',
        'Different grids on different pages',
      ],
    },
    applications: [
      'Page layout',
      'Responsive design',
      'Spacing systems',
      'Component placement',
      'Typography alignment',
      'Design systems',
    ],
    relatedPrinciples: ['alignment', 'whitespace', 'responsive-design'],
    tags: ['grid', 'layout', 'columns', 'spacing', 'structure', 'visual-design'],
    importance: 'high',
  },
];
