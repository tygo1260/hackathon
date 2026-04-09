/**
 * Main data export file
 * Aggregates all design knowledge for the MCP server
 */

// Re-export all principles
export * from './principles/index.js';

// Re-export all patterns
export * from './patterns/index.js';

// Re-export all tokens
export * from './tokens/index.js';

// Import for combined access
import { allPrinciples, getPrincipleById, getPrinciplesByCategory, getPrinciplesByTag } from './principles/index.js';
import { allPatterns, getPatternById, getPatternsByCategory, getPatternsByType, getPatternsByPlatform, getPatternsByTag } from './patterns/index.js';
import { allTokens, getTokenByName, getTokensByCategory } from './tokens/index.js';
import { CATEGORY_DEFINITIONS } from '../types/category.js';

/**
 * Summary statistics for the knowledge base
 */
export const knowledgeStats = {
  get principleCount() {
    return allPrinciples.length;
  },
  get patternCount() {
    return allPatterns.length;
  },
  get tokenCount() {
    return allTokens.length;
  },
  get categoryCount() {
    return CATEGORY_DEFINITIONS.length;
  },
  get totalItems() {
    return allPrinciples.length + allPatterns.length + allTokens.length;
  },
};

/**
 * Get all searchable items as a unified list
 */
export function getAllSearchableItems() {
  const principles = allPrinciples.map((p) => ({
    type: 'principle' as const,
    id: p.id,
    name: p.name,
    category: p.category,
    summary: p.summary,
    tags: p.tags,
    data: p,
  }));

  const patterns = allPatterns.map((p) => ({
    type: 'pattern' as const,
    id: p.id,
    name: p.name,
    category: p.category,
    summary: p.problem,
    tags: p.tags,
    data: p,
  }));

  const tokens = allTokens.map((t) => ({
    type: 'token' as const,
    id: t.name,
    name: t.name,
    category: t.category,
    summary: t.description || t.usage || '',
    tags: [t.category],
    data: t,
  }));

  return [...principles, ...patterns, ...tokens];
}

export {
  allPrinciples,
  allPatterns,
  allTokens,
  getPrincipleById,
  getPrinciplesByCategory,
  getPrinciplesByTag,
  getPatternById,
  getPatternsByCategory,
  getPatternsByType,
  getPatternsByPlatform,
  getPatternsByTag,
  getTokenByName,
  getTokensByCategory,
  CATEGORY_DEFINITIONS,
};
