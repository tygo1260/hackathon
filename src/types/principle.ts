import { DesignCategory } from './category.js';

/**
 * A design principle represents a fundamental guideline or heuristic
 * that informs good design decisions.
 */
export interface DesignPrinciple {
  /** Unique identifier (kebab-case) */
  id: string;
  /** Human-readable name */
  name: string;
  /** Primary category */
  category: DesignCategory;
  /** Optional subcategory for finer grouping */
  subcategory?: string;
  /** Brief 1-2 sentence summary */
  summary: string;
  /** Full explanation of the principle */
  description: string;
  /** Why this principle matters for design */
  rationale: string;
  /** Examples demonstrating the principle */
  examples: {
    /** Good implementations */
    good: string[];
    /** Bad implementations to avoid */
    bad: string[];
  };
  /** Where and how to apply this principle */
  applications: string[];
  /** IDs of related principles */
  relatedPrinciples: string[];
  /** Searchable tags */
  tags: string[];
  /** Optional source attribution */
  source?: string;
  /** Priority/importance level */
  importance?: 'critical' | 'high' | 'medium' | 'low';
}

/**
 * Simplified principle for search results and lists
 */
export interface PrincipleSummary {
  id: string;
  name: string;
  category: DesignCategory;
  subcategory?: string;
  summary: string;
  tags: string[];
}

/**
 * Convert full principle to summary
 */
export function toPrincipleSummary(principle: DesignPrinciple): PrincipleSummary {
  return {
    id: principle.id,
    name: principle.name,
    category: principle.category,
    subcategory: principle.subcategory,
    summary: principle.summary,
    tags: principle.tags,
  };
}
