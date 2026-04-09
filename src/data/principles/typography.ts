import { DesignPrinciple } from '../../types/index.js';
import { DesignCategory } from '../../types/category.js';

/**
 * Typography Principles
 * Principles for effective typography in user interfaces
 */
export const typographyPrinciples: DesignPrinciple[] = [
  {
    id: 'typography-scale',
    name: 'Typographic Scale',
    category: DesignCategory.TYPOGRAPHY,
    subcategory: 'scale',
    summary:
      'Use a harmonious scale of font sizes based on mathematical ratios. Consistency creates rhythm and hierarchy.',
    description:
      'A typographic scale is a series of font sizes that follow a mathematical ratio (like 1.25, 1.333, or 1.5). Using a scale creates visual rhythm and makes size relationships feel intentional. Common scales include Major Third (1.25), Perfect Fourth (1.333), and Perfect Fifth (1.5).',
    rationale:
      'Random font sizes create visual noise. Scales create harmony and consistency. They also simplify design decisions—you pick from the scale rather than arbitrary sizes.',
    examples: {
      good: [
        'Type scale: 12, 14, 16, 18, 21, 24, 28, 32, 40px (1.167 ratio)',
        'Type scale: 12, 16, 21, 28, 37, 50px (1.333 ratio)',
        'Consistent use of scale across application',
        'Design tokens defining the scale',
        'Headings stepping through scale levels',
      ],
      bad: [
        'Random sizes: 13, 15, 19, 22, 27px',
        'Too many sizes with minimal distinction',
        'Inconsistent sizing between pages',
        'Headlines barely larger than body text',
      ],
    },
    applications: [
      'Design systems',
      'Heading hierarchy',
      'Component typography',
      'Responsive scaling',
      'Design tokens',
    ],
    relatedPrinciples: ['visual-hierarchy', 'typography-hierarchy', 'consistency-and-standards'],
    tags: ['typography', 'scale', 'ratio', 'sizes', 'hierarchy', 'design-system'],
    importance: 'high',
  },
  {
    id: 'typography-readability',
    name: 'Readability',
    category: DesignCategory.TYPOGRAPHY,
    subcategory: 'readability',
    summary:
      'Text should be easy to read. Optimize line length, line height, and font size for comfortable reading.',
    description:
      'Readability is affected by multiple factors: font choice, size, line height, line length, contrast, and spacing. Optimal line length is 45-75 characters. Line height should be 1.4-1.6 for body text. Font size should be 16px minimum for body text on screen.',
    rationale:
      'If text is hard to read, users won\'t read it. Poor readability leads to user fatigue, errors, and abandonment. Good readability is foundational to effective communication.',
    examples: {
      good: [
        'Body text at 16-18px',
        'Line height of 1.5 for body text',
        'Line length of 50-75 characters',
        'Adequate paragraph spacing',
        'High contrast text on backgrounds',
        'Appropriate letter spacing',
      ],
      bad: [
        'Body text smaller than 14px',
        'Line height of 1.0 (touching lines)',
        'Lines too long (100+ characters)',
        'Lines too short (under 30 characters)',
        'Low contrast text',
        'All caps for long text',
      ],
    },
    applications: [
      'Body text styling',
      'Article layouts',
      'Content containers',
      'Responsive typography',
      'Accessibility',
    ],
    relatedPrinciples: ['accessibility-color-contrast', 'whitespace', 'typography-scale'],
    tags: ['typography', 'readability', 'line-height', 'line-length', 'legibility'],
    importance: 'critical',
  },
  {
    id: 'typography-font-pairing',
    name: 'Font Pairing',
    category: DesignCategory.TYPOGRAPHY,
    subcategory: 'pairing',
    summary:
      'Combine fonts that complement each other. Typically pair a distinctive display font with a readable body font.',
    description:
      'Font pairing involves selecting typefaces that work harmoniously together. Common strategies include pairing a serif headline with sans-serif body, or using fonts from the same superfamily. Limit to 2-3 typefaces maximum per project.',
    rationale:
      'Good font pairing creates visual interest while maintaining readability. Too many fonts create chaos. Poor pairings feel discordant. The right combination establishes brand personality.',
    examples: {
      good: [
        'One distinctive headline font + one readable body font',
        'Fonts from the same superfamily',
        'Serif headlines + sans-serif body',
        'High contrast between display and body fonts',
        'Maximum 2-3 font families',
      ],
      bad: [
        'Multiple display fonts competing',
        '5+ different typefaces',
        'Similar fonts that aren\'t different enough',
        'Decorative fonts for body text',
        'Fonts that clash stylistically',
      ],
    },
    applications: [
      'Brand typography',
      'Editorial design',
      'Marketing pages',
      'App typography',
      'Design systems',
    ],
    relatedPrinciples: ['consistency-and-standards', 'visual-hierarchy'],
    tags: ['typography', 'fonts', 'pairing', 'typefaces', 'design-system'],
    importance: 'medium',
  },
  {
    id: 'typography-weight-contrast',
    name: 'Weight and Style Contrast',
    category: DesignCategory.TYPOGRAPHY,
    subcategory: 'hierarchy',
    summary:
      'Use font weight and style to create emphasis and hierarchy. Bold for emphasis, regular for body.',
    description:
      'Font weight (light, regular, medium, semibold, bold) and style (roman, italic) create visual hierarchy and emphasis. Bold should be used sparingly for emphasis. Italic is for specific purposes (titles, emphasis, technical terms). Avoid combining too many weights.',
    rationale:
      'Weight variations provide emphasis without changing font size or color. Strategic use of bold guides scanning. Overuse dilutes impact. Italic has specific connotations in writing.',
    examples: {
      good: [
        'Regular weight for body text',
        'Semibold or bold for headings',
        'Bold for key terms and emphasis',
        'Italic for titles of works, emphasis in context',
        '2-3 weights maximum per font',
        'Sufficient weight contrast between levels',
      ],
      bad: [
        'Entire paragraphs in bold',
        'Light weight for body text',
        'Too many weight variations',
        'No clear weight hierarchy',
        'Mixing bold and italic for same purpose',
      ],
    },
    applications: [
      'Heading styling',
      'Emphasis',
      'Labels and captions',
      'Navigation',
      'UI text',
    ],
    relatedPrinciples: ['visual-hierarchy', 'typography-hierarchy'],
    tags: ['typography', 'weight', 'bold', 'italic', 'emphasis', 'hierarchy'],
    importance: 'high',
  },
  {
    id: 'typography-alignment',
    name: 'Text Alignment',
    category: DesignCategory.TYPOGRAPHY,
    subcategory: 'layout',
    summary:
      'Choose alignment purposefully. Left-aligned for readability, centered for short text, avoid justified on web.',
    description:
      'Text alignment affects readability and visual flow. Left-aligned (ragged right) is most readable for body text. Centered works for headings and short text. Right-aligned for specific contexts (numbers, RTL). Justified can create uneven spacing on web.',
    rationale:
      'Consistent left edges make text easy to scan. Centered text is harder to read in long form. Justified text creates rivers of whitespace on web without proper hyphenation support.',
    examples: {
      good: [
        'Left-aligned body text',
        'Centered short headlines',
        'Right-aligned numbers in tables',
        'Consistent alignment within sections',
        'Left-aligned form labels',
      ],
      bad: [
        'Centered paragraphs',
        'Justified text on web (without hyphenation)',
        'Mixed alignments without purpose',
        'Right-aligned body text (for LTR languages)',
        'Alternating alignment for visual effect',
      ],
    },
    applications: [
      'Body text',
      'Headlines',
      'Tables',
      'Forms',
      'Captions',
    ],
    relatedPrinciples: ['alignment', 'typography-readability', 'gestalt-continuity'],
    tags: ['typography', 'alignment', 'left', 'center', 'justified', 'layout'],
    importance: 'high',
  },
  {
    id: 'typography-responsive',
    name: 'Responsive Typography',
    category: DesignCategory.TYPOGRAPHY,
    subcategory: 'responsive',
    summary:
      'Typography should adapt to screen size. Scale sizes, adjust line lengths, and maintain readability across devices.',
    description:
      'Responsive typography adjusts to viewport size using fluid scaling, breakpoint adjustments, or viewport units. Line lengths should adapt (not too long on wide screens, not too short on narrow). Size changes should maintain hierarchy.',
    rationale:
      'Fixed typography fails on different screen sizes—too small on mobile or too large relative to container on desktop. Responsive typography maintains optimal reading experience across devices.',
    examples: {
      good: [
        'Fluid type scaling with clamp()',
        'Adjusted sizes at breakpoints',
        'Maximum line length on wide screens',
        'Larger base size on larger screens',
        'Maintained hierarchy at all sizes',
        'Testing typography at all breakpoints',
      ],
      bad: [
        'Same pixel sizes at all viewports',
        'Text too small on mobile',
        'Extremely long lines on desktop',
        'Hierarchy that breaks at some sizes',
        'Line heights that don\'t scale appropriately',
      ],
    },
    applications: [
      'Design systems',
      'Content sites',
      'Responsive layouts',
      'Mobile design',
      'Cross-device experiences',
    ],
    relatedPrinciples: ['responsive-design', 'typography-readability', 'typography-scale'],
    tags: ['typography', 'responsive', 'fluid', 'scaling', 'breakpoints'],
    importance: 'high',
  },
  {
    id: 'typography-whitespace',
    name: 'Typographic Whitespace',
    category: DesignCategory.TYPOGRAPHY,
    subcategory: 'spacing',
    summary:
      'Use whitespace within and around text to improve readability. Letter spacing, word spacing, line height, and margins all matter.',
    description:
      'Typography involves multiple types of whitespace: letter spacing (tracking), word spacing, line height (leading), paragraph spacing, and margins. Each affects readability and feel. Tighter spacing feels dense; looser spacing feels open.',
    rationale:
      'Cramped text is hard to read. Appropriate spacing improves legibility, creates rhythm, and affects the perceived tone of content.',
    examples: {
      good: [
        'Line height of 1.4-1.6 for body text',
        'Increased line height for smaller text',
        'Loose tracking for uppercase text',
        'Generous paragraph margins',
        'Balanced word spacing',
      ],
      bad: [
        'Tight line height making text cramped',
        'No paragraph spacing',
        'Default letter spacing for all caps',
        'Inconsistent spacing throughout',
        'Text running to container edges',
      ],
    },
    applications: [
      'Body text styling',
      'Headings',
      'All-caps text',
      'Labels and captions',
      'Content layout',
    ],
    relatedPrinciples: ['whitespace', 'typography-readability', 'visual-hierarchy'],
    tags: ['typography', 'spacing', 'whitespace', 'leading', 'tracking'],
    importance: 'high',
  },
  {
    id: 'typography-web-fonts',
    name: 'Web Font Best Practices',
    category: DesignCategory.TYPOGRAPHY,
    subcategory: 'performance',
    summary:
      'Optimize web font loading for performance. Use font-display, subset fonts, and provide fallbacks.',
    description:
      'Web fonts can significantly impact page load. Optimize with font-display: swap for visible text during load, subset fonts to only needed characters, preload critical fonts, and provide appropriate fallback stacks. Variable fonts can reduce file count.',
    rationale:
      'Web fonts add personality but at a performance cost. Poor font loading causes Flash of Invisible Text (FOIT) or Flash of Unstyled Text (FOUT). Optimization balances aesthetics with performance.',
    examples: {
      good: [
        'font-display: swap to show text immediately',
        'Preload critical fonts',
        'Font subsetting for used characters only',
        'System font fallback stack',
        'Variable fonts for multiple weights',
        'Self-hosting for control',
      ],
      bad: [
        'No font-display causing FOIT',
        'Loading all font weights when only 2 needed',
        'No fallback fonts specified',
        'Blocking render on font load',
        'Multiple separate font files when variable would work',
      ],
    },
    applications: [
      'Performance optimization',
      'Design systems',
      'Web development',
      'Font implementation',
      'Build configuration',
    ],
    relatedPrinciples: ['mobile-performance', 'doherty-threshold'],
    tags: ['typography', 'web-fonts', 'performance', 'loading', 'optimization'],
    importance: 'medium',
  },
];
