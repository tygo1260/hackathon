import { z } from 'zod';
import { getPrincipleById, getPrinciplesByCategory, getPrinciplesByTag, allPrinciples } from '../data/index.js';
import { formatPrinciple, formatSummaryList } from '../utils/format.js';
import { DesignCategory } from '../types/category.js';

/**
 * Schema for the get_design_principles tool
 */
export const principlesToolSchema = z.object({
  id: z.string().optional().describe('Get a specific principle by ID'),
  category: z
    .nativeEnum(DesignCategory)
    .optional()
    .describe('Filter by category (e.g., "ux", "ui", "accessibility")'),
  subcategory: z
    .string()
    .optional()
    .describe('Filter by subcategory (e.g., "heuristics", "gestalt", "laws")'),
  tag: z.string().optional().describe('Filter by tag'),
  listAll: z.boolean().optional().describe('List all available principles'),
});

export type PrinciplesToolInput = z.infer<typeof principlesToolSchema>;

/**
 * Execute the get_design_principles tool
 */
export function executePrinciples(input: PrinciplesToolInput): string {
  // Get specific principle by ID
  if (input.id) {
    const principle = getPrincipleById(input.id);
    if (!principle) {
      return `Principle "${input.id}" not found. Use listAll=true to see available principles.`;
    }
    return formatPrinciple(principle);
  }

  // Filter by category
  if (input.category) {
    let principles = getPrinciplesByCategory(input.category);

    // Further filter by subcategory
    if (input.subcategory) {
      principles = principles.filter((p) => p.subcategory === input.subcategory);
    }

    if (principles.length === 0) {
      return `No principles found for category "${input.category}"${input.subcategory ? ` > ${input.subcategory}` : ''}.`;
    }

    const summaries = principles.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.subcategory || p.category,
      summary: p.summary,
    }));

    const lines: string[] = [];
    lines.push(`## ${principles.length} Principles in "${input.category}"${input.subcategory ? ` > ${input.subcategory}` : ''}\n`);
    lines.push(formatSummaryList(summaries));
    lines.push('\nUse `id` parameter to get full details for any principle.');

    return lines.join('\n');
  }

  // Filter by tag
  if (input.tag) {
    const principles = getPrinciplesByTag(input.tag);
    if (principles.length === 0) {
      return `No principles found with tag "${input.tag}".`;
    }

    const summaries = principles.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      summary: p.summary,
    }));

    const lines: string[] = [];
    lines.push(`## ${principles.length} Principles tagged "${input.tag}"\n`);
    lines.push(formatSummaryList(summaries));
    lines.push('\nUse `id` parameter to get full details for any principle.');

    return lines.join('\n');
  }

  // List all
  if (input.listAll) {
    const byCategory: Record<string, number> = {};
    allPrinciples.forEach((p) => {
      byCategory[p.category] = (byCategory[p.category] || 0) + 1;
    });

    const lines: string[] = [];
    lines.push(`## ${allPrinciples.length} Design Principles Available\n`);
    lines.push('**By Category:**');
    Object.entries(byCategory).forEach(([cat, count]) => {
      lines.push(`- ${cat}: ${count} principles`);
    });
    lines.push('');
    lines.push('**Categories:**');
    lines.push('- `ux` - User Experience (Nielsen heuristics, Laws of UX)');
    lines.push('- `ui` - User Interface (Visual design, Gestalt)');
    lines.push('- `accessibility` - Accessibility (WCAG principles)');
    lines.push('- `mobile` - Mobile Design');
    lines.push('- `typography` - Typography');
    lines.push('');
    lines.push('Use `category` parameter to filter by category.');
    lines.push('Example: `category: "ux"` or `subcategory: "heuristics"`');

    return lines.join('\n');
  }

  return 'Please specify one of: id, category, tag, or listAll=true.';
}
