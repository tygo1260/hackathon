import { z } from 'zod';
import { getPatternById, getPatternsByCategory, getPatternsByType, getPatternsByPlatform, getPatternsByTag, allPatterns } from '../data/index.js';
import { formatPattern, formatSummaryList } from '../utils/format.js';
import { DesignCategory } from '../types/category.js';

/**
 * Schema for the get_design_patterns tool
 */
export const patternsToolSchema = z.object({
  id: z.string().optional().describe('Get a specific pattern by ID'),
  category: z
    .nativeEnum(DesignCategory)
    .optional()
    .describe('Filter by category (e.g., "ui", "mobile")'),
  type: z
    .enum(['ui', 'ux', 'interaction', 'layout', 'navigation', 'feedback', 'form'])
    .optional()
    .describe('Filter by pattern type'),
  platform: z
    .enum(['web', 'ios', 'android', 'desktop', 'all'])
    .optional()
    .describe('Filter by platform'),
  tag: z.string().optional().describe('Filter by tag'),
  listAll: z.boolean().optional().describe('List all available patterns'),
});

export type PatternsToolInput = z.infer<typeof patternsToolSchema>;

/**
 * Execute the get_design_patterns tool
 */
export function executePatterns(input: PatternsToolInput): string {
  // Get specific pattern by ID
  if (input.id) {
    const pattern = getPatternById(input.id);
    if (!pattern) {
      return `Pattern "${input.id}" not found. Use listAll=true to see available patterns.`;
    }
    return formatPattern(pattern);
  }

  // Filter by type
  if (input.type) {
    const patterns = getPatternsByType(input.type);
    if (patterns.length === 0) {
      return `No patterns found for type "${input.type}".`;
    }

    const summaries = patterns.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.type,
      summary: p.problem,
    }));

    const lines: string[] = [];
    lines.push(`## ${patterns.length} "${input.type}" Patterns\n`);
    lines.push(formatSummaryList(summaries));
    lines.push('\nUse `id` parameter to get full details for any pattern.');

    return lines.join('\n');
  }

  // Filter by platform
  if (input.platform) {
    const patterns = getPatternsByPlatform(input.platform);
    if (patterns.length === 0) {
      return `No patterns found for platform "${input.platform}".`;
    }

    const summaries = patterns.map((p) => ({
      id: p.id,
      name: p.name,
      category: `${p.type} (${p.platforms.join(', ')})`,
      summary: p.problem,
    }));

    const lines: string[] = [];
    lines.push(`## ${patterns.length} Patterns for "${input.platform}"\n`);
    lines.push(formatSummaryList(summaries));
    lines.push('\nUse `id` parameter to get full details for any pattern.');

    return lines.join('\n');
  }

  // Filter by category
  if (input.category) {
    const patterns = getPatternsByCategory(input.category);
    if (patterns.length === 0) {
      return `No patterns found for category "${input.category}".`;
    }

    const summaries = patterns.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.type,
      summary: p.problem,
    }));

    const lines: string[] = [];
    lines.push(`## ${patterns.length} Patterns in "${input.category}"\n`);
    lines.push(formatSummaryList(summaries));
    lines.push('\nUse `id` parameter to get full details for any pattern.');

    return lines.join('\n');
  }

  // Filter by tag
  if (input.tag) {
    const patterns = getPatternsByTag(input.tag);
    if (patterns.length === 0) {
      return `No patterns found with tag "${input.tag}".`;
    }

    const summaries = patterns.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.type,
      summary: p.problem,
    }));

    const lines: string[] = [];
    lines.push(`## ${patterns.length} Patterns tagged "${input.tag}"\n`);
    lines.push(formatSummaryList(summaries));
    lines.push('\nUse `id` parameter to get full details for any pattern.');

    return lines.join('\n');
  }

  // List all
  if (input.listAll) {
    const byType: Record<string, number> = {};
    allPatterns.forEach((p) => {
      byType[p.type] = (byType[p.type] || 0) + 1;
    });

    const lines: string[] = [];
    lines.push(`## ${allPatterns.length} Design Patterns Available\n`);
    lines.push('**By Type:**');
    Object.entries(byType).forEach(([type, count]) => {
      lines.push(`- ${type}: ${count} patterns`);
    });
    lines.push('');
    lines.push('**Pattern Types:**');
    lines.push('- `navigation` - Navigation patterns (tabs, sidebar, breadcrumbs)');
    lines.push('- `form` - Form patterns (validation, multi-step, inputs)');
    lines.push('- `feedback` - Feedback patterns (toast, modal, loading)');
    lines.push('- `layout` - Layout patterns (cards, grid, list)');
    lines.push('');
    lines.push('**Platforms:**');
    lines.push('- `web`, `ios`, `android`, `desktop`, `all`');
    lines.push('');
    lines.push('Use `type` or `platform` parameter to filter.');

    return lines.join('\n');
  }

  return 'Please specify one of: id, type, platform, category, tag, or listAll=true.';
}
