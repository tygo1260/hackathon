import { z } from 'zod';
import { searchKnowledge } from '../utils/search.js';

/**
 * Schema for the search_design_knowledge tool
 */
export const searchToolSchema = z.object({
  query: z.string().describe('The search query to find relevant design knowledge'),
  type: z
    .enum(['principle', 'pattern', 'token'])
    .optional()
    .describe('Filter results to a specific type'),
  category: z
    .string()
    .optional()
    .describe('Filter results to a specific category (e.g., "ux", "accessibility")'),
  limit: z
    .number()
    .min(1)
    .max(50)
    .default(10)
    .describe('Maximum number of results to return'),
});

export type SearchToolInput = z.infer<typeof searchToolSchema>;

/**
 * Execute the search_design_knowledge tool
 */
export function executeSearch(input: SearchToolInput): string {
  const results = searchKnowledge(input.query, {
    type: input.type,
    category: input.category,
    limit: input.limit,
  });

  if (results.length === 0) {
    return `No results found for "${input.query}". Try different keywords or remove filters.`;
  }

  const lines: string[] = [];
  lines.push(`Found ${results.length} result(s) for "${input.query}":\n`);

  results.forEach((result, index) => {
    const relevance = Math.round((1 - result.score) * 100);
    lines.push(`${index + 1}. **${result.name}** [${result.type}]`);
    lines.push(`   Category: ${result.category} | Relevance: ${relevance}%`);
    lines.push(`   ${result.summary}`);
    lines.push(`   Tags: ${result.tags.slice(0, 5).join(', ')}`);
    lines.push('');
  });

  lines.push('Use `get_design_principles` or `get_design_patterns` with the ID to get full details.');

  return lines.join('\n');
}
