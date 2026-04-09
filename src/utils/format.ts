import { DesignPrinciple, DesignPattern } from '../types/index.js';

/**
 * Format a principle for output
 */
export function formatPrinciple(principle: DesignPrinciple): string {
  const lines: string[] = [];

  lines.push(`# ${principle.name}`);
  lines.push('');
  lines.push(`**Category:** ${principle.category}${principle.subcategory ? ` > ${principle.subcategory}` : ''}`);
  if (principle.importance) {
    lines.push(`**Importance:** ${principle.importance}`);
  }
  lines.push('');
  lines.push(`## Summary`);
  lines.push(principle.summary);
  lines.push('');
  lines.push(`## Description`);
  lines.push(principle.description);
  lines.push('');
  lines.push(`## Rationale`);
  lines.push(principle.rationale);
  lines.push('');

  if (principle.examples.good.length > 0) {
    lines.push(`## Good Examples`);
    principle.examples.good.forEach((ex) => {
      lines.push(`- ${ex}`);
    });
    lines.push('');
  }

  if (principle.examples.bad.length > 0) {
    lines.push(`## Bad Examples (Anti-patterns)`);
    principle.examples.bad.forEach((ex) => {
      lines.push(`- ${ex}`);
    });
    lines.push('');
  }

  if (principle.applications.length > 0) {
    lines.push(`## Applications`);
    principle.applications.forEach((app) => {
      lines.push(`- ${app}`);
    });
    lines.push('');
  }

  if (principle.relatedPrinciples.length > 0) {
    lines.push(`## Related Principles`);
    lines.push(principle.relatedPrinciples.join(', '));
    lines.push('');
  }

  if (principle.source) {
    lines.push(`## Source`);
    lines.push(principle.source);
    lines.push('');
  }

  lines.push(`**Tags:** ${principle.tags.join(', ')}`);

  return lines.join('\n');
}

/**
 * Format a pattern for output
 */
export function formatPattern(pattern: DesignPattern): string {
  const lines: string[] = [];

  lines.push(`# ${pattern.name}`);
  lines.push('');
  lines.push(`**Category:** ${pattern.category}`);
  lines.push(`**Type:** ${pattern.type}`);
  lines.push(`**Platforms:** ${pattern.platforms.join(', ')}`);
  lines.push('');

  lines.push(`## Problem`);
  lines.push(pattern.problem);
  lines.push('');

  lines.push(`## Solution`);
  lines.push(pattern.solution);
  lines.push('');

  lines.push(`## Context (When to Use)`);
  lines.push(pattern.context);
  lines.push('');

  lines.push(`## Structure`);
  lines.push(pattern.structure.description);
  lines.push('');
  lines.push(`**Components:**`);
  pattern.structure.components.forEach((comp) => {
    lines.push(`- ${comp}`);
  });
  if (pattern.structure.variants) {
    lines.push('');
    lines.push(`**Variants:**`);
    pattern.structure.variants.forEach((variant) => {
      lines.push(`- ${variant}`);
    });
  }
  lines.push('');

  lines.push(`## Consequences`);
  lines.push('');
  lines.push(`**Benefits:**`);
  pattern.consequences.benefits.forEach((benefit) => {
    lines.push(`- ✓ ${benefit}`);
  });
  lines.push('');
  lines.push(`**Trade-offs:**`);
  pattern.consequences.tradeoffs.forEach((tradeoff) => {
    lines.push(`- ⚠ ${tradeoff}`);
  });
  lines.push('');

  if (pattern.examples.length > 0) {
    lines.push(`## Examples`);
    pattern.examples.forEach((ex) => {
      lines.push(`- ${ex.description}${ex.platform ? ` (${ex.platform})` : ''}`);
    });
    lines.push('');
  }

  if (pattern.accessibility.length > 0) {
    lines.push(`## Accessibility Considerations`);
    pattern.accessibility.forEach((item) => {
      lines.push(`- ${item}`);
    });
    lines.push('');
  }

  if (pattern.antiPatterns.length > 0) {
    lines.push(`## Anti-patterns to Avoid`);
    pattern.antiPatterns.forEach((anti) => {
      lines.push(`- ✗ ${anti}`);
    });
    lines.push('');
  }

  if (pattern.relatedPatterns.length > 0) {
    lines.push(`## Related Patterns`);
    lines.push(pattern.relatedPatterns.join(', '));
    lines.push('');
  }

  lines.push(`**Tags:** ${pattern.tags.join(', ')}`);

  return lines.join('\n');
}

/**
 * Format a list of items as a summary table
 */
export function formatSummaryList(
  items: { id: string; name: string; category: string; summary: string }[]
): string {
  const lines: string[] = [];

  lines.push('| Name | Category | Summary |');
  lines.push('|------|----------|---------|');

  items.forEach((item) => {
    const summary = item.summary.length > 80
      ? item.summary.substring(0, 77) + '...'
      : item.summary;
    lines.push(`| ${item.name} | ${item.category} | ${summary} |`);
  });

  return lines.join('\n');
}

/**
 * Truncate text to a maximum length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}
