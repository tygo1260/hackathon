import { z } from 'zod';
import { getPrinciplesByCategory } from '../data/index.js';
import { DesignCategory } from '../types/category.js';

/**
 * Schema for the get_accessibility_checklist tool
 */
export const accessibilityToolSchema = z.object({
  component: z
    .enum(['button', 'form', 'modal', 'navigation', 'images', 'color', 'keyboard', 'general'])
    .describe('The component type or area to get accessibility guidance for'),
  wcagLevel: z
    .enum(['A', 'AA', 'AAA'])
    .default('AA')
    .describe('Target WCAG conformance level'),
});

export type AccessibilityToolInput = z.infer<typeof accessibilityToolSchema>;

// Component-specific checklists
const componentChecklists: Record<string, { category: string; items: { item: string; level: 'A' | 'AA' | 'AAA'; critical: boolean }[] }> = {
  button: {
    category: 'Interactive Elements - Buttons',
    items: [
      { item: 'Use <button> element or role="button" for clickable elements', level: 'A', critical: true },
      { item: 'Provide accessible name via text content, aria-label, or aria-labelledby', level: 'A', critical: true },
      { item: 'Ensure buttons are keyboard operable (Enter and Space)', level: 'A', critical: true },
      { item: 'Provide visible focus indicator meeting 3:1 contrast', level: 'AA', critical: true },
      { item: 'Indicate disabled state with aria-disabled (not just visually)', level: 'A', critical: false },
      { item: 'Minimum touch target size of 44x44 CSS pixels', level: 'AAA', critical: false },
      { item: 'Loading states announced to screen readers', level: 'AA', critical: false },
      { item: 'Icon-only buttons have aria-label or visible tooltip', level: 'A', critical: true },
    ],
  },
  form: {
    category: 'Forms',
    items: [
      { item: 'All inputs have associated <label> elements', level: 'A', critical: true },
      { item: 'Required fields indicated in label (not just by color)', level: 'A', critical: true },
      { item: 'Error messages linked to inputs via aria-describedby', level: 'A', critical: true },
      { item: 'Use aria-invalid="true" on invalid fields', level: 'A', critical: false },
      { item: 'Provide error suggestions when possible', level: 'AA', critical: false },
      { item: 'Group related fields with <fieldset> and <legend>', level: 'A', critical: false },
      { item: 'Autocomplete attributes for common fields', level: 'AA', critical: false },
      { item: 'Submit button clearly identified', level: 'A', critical: true },
      { item: 'Form errors announced to screen readers', level: 'A', critical: true },
      { item: 'Don\'t rely on placeholder as only label', level: 'A', critical: true },
    ],
  },
  modal: {
    category: 'Modal Dialogs',
    items: [
      { item: 'Use role="dialog" and aria-modal="true"', level: 'A', critical: true },
      { item: 'Provide accessible name via aria-labelledby or aria-label', level: 'A', critical: true },
      { item: 'Trap keyboard focus within modal', level: 'A', critical: true },
      { item: 'Close modal on Escape key', level: 'AA', critical: true },
      { item: 'Return focus to trigger element on close', level: 'AA', critical: true },
      { item: 'Background content marked as inert', level: 'A', critical: false },
      { item: 'Initial focus on first interactive element (or title)', level: 'A', critical: true },
      { item: 'Scroll lock on body while modal is open', level: 'AA', critical: false },
    ],
  },
  navigation: {
    category: 'Navigation',
    items: [
      { item: 'Use <nav> element or role="navigation"', level: 'A', critical: true },
      { item: 'Provide skip link to main content', level: 'A', critical: true },
      { item: 'Current page indicated with aria-current="page"', level: 'A', critical: false },
      { item: 'Consistent navigation across pages', level: 'AA', critical: true },
      { item: 'Keyboard navigable menus', level: 'A', critical: true },
      { item: 'Dropdown menus support arrow key navigation', level: 'AA', critical: false },
      { item: 'Mobile menu accessible via keyboard', level: 'A', critical: true },
      { item: 'Multiple ways to find pages (nav, search, sitemap)', level: 'AA', critical: false },
    ],
  },
  images: {
    category: 'Images',
    items: [
      { item: 'All meaningful images have alt text', level: 'A', critical: true },
      { item: 'Decorative images have alt="" (empty)', level: 'A', critical: true },
      { item: 'Complex images have extended descriptions', level: 'A', critical: false },
      { item: 'Text in images also available as real text', level: 'A', critical: true },
      { item: 'Charts and graphs have text alternatives', level: 'A', critical: true },
      { item: 'Background images that convey info have alternatives', level: 'A', critical: false },
    ],
  },
  color: {
    category: 'Color & Contrast',
    items: [
      { item: 'Text contrast ratio at least 4.5:1 (normal text)', level: 'AA', critical: true },
      { item: 'Text contrast ratio at least 3:1 (large text 18pt+)', level: 'AA', critical: true },
      { item: 'UI component contrast at least 3:1', level: 'AA', critical: true },
      { item: 'Color is not only indicator of information', level: 'A', critical: true },
      { item: 'Links distinguishable from text (not just by color)', level: 'A', critical: true },
      { item: 'Focus indicators meet 3:1 contrast', level: 'AA', critical: true },
      { item: 'Enhanced contrast 7:1 for AAA', level: 'AAA', critical: false },
      { item: 'Test with colorblind simulators', level: 'AA', critical: false },
    ],
  },
  keyboard: {
    category: 'Keyboard Accessibility',
    items: [
      { item: 'All functionality available via keyboard', level: 'A', critical: true },
      { item: 'No keyboard traps', level: 'A', critical: true },
      { item: 'Visible focus indicator on all interactive elements', level: 'AA', critical: true },
      { item: 'Logical tab order (follows visual flow)', level: 'A', critical: true },
      { item: 'Custom widgets follow ARIA patterns', level: 'A', critical: true },
      { item: 'Skip links for repetitive content', level: 'A', critical: true },
      { item: 'Shortcuts documented and don\'t conflict', level: 'A', critical: false },
      { item: 'Single-key shortcuts can be disabled', level: 'A', critical: false },
    ],
  },
  general: {
    category: 'General Accessibility',
    items: [
      { item: 'Page has descriptive <title>', level: 'A', critical: true },
      { item: 'Language declared with lang attribute', level: 'A', critical: true },
      { item: 'Proper heading hierarchy (h1-h6)', level: 'A', critical: true },
      { item: 'Text can be resized to 200% without loss', level: 'AA', critical: true },
      { item: 'Content reflows at 400% zoom', level: 'AA', critical: false },
      { item: 'Animations respect prefers-reduced-motion', level: 'AA', critical: true },
      { item: 'No content flashes more than 3 times/second', level: 'A', critical: true },
      { item: 'Time limits can be extended or removed', level: 'A', critical: false },
      { item: 'Error prevention for legal/financial data', level: 'AA', critical: false },
    ],
  },
};

/**
 * Execute the get_accessibility_checklist tool
 */
export function executeAccessibility(input: AccessibilityToolInput): string {
  const checklist = componentChecklists[input.component];
  if (!checklist) {
    return `No checklist found for "${input.component}".`;
  }

  // Filter by WCAG level
  const levelOrder = { A: 1, AA: 2, AAA: 3 };
  const targetLevel = levelOrder[input.wcagLevel];
  const items = checklist.items.filter((item) => levelOrder[item.level] <= targetLevel);

  const lines: string[] = [];
  lines.push(`# Accessibility Checklist: ${checklist.category}`);
  lines.push(`**Target Level:** WCAG ${input.wcagLevel}`);
  lines.push('');

  // Critical items first
  const critical = items.filter((i) => i.critical);
  const nonCritical = items.filter((i) => !i.critical);

  if (critical.length > 0) {
    lines.push('## Critical Requirements\n');
    critical.forEach((item) => {
      lines.push(`- [ ] ${item.item} [Level ${item.level}]`);
    });
    lines.push('');
  }

  if (nonCritical.length > 0) {
    lines.push('## Additional Requirements\n');
    nonCritical.forEach((item) => {
      lines.push(`- [ ] ${item.item} [Level ${item.level}]`);
    });
    lines.push('');
  }

  // Add related principles
  const a11yPrinciples = getPrinciplesByCategory(DesignCategory.ACCESSIBILITY);
  if (a11yPrinciples.length > 0) {
    lines.push('## Related Principles');
    lines.push('Use `get_design_principles` with these IDs for detailed guidance:');
    a11yPrinciples.slice(0, 5).forEach((p) => {
      lines.push(`- \`${p.id}\`: ${p.name}`);
    });
  }

  return lines.join('\n');
}
