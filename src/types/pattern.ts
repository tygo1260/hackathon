import { DesignCategory } from './category.js';

/**
 * Pattern type classification
 */
export type PatternType = 'ui' | 'ux' | 'interaction' | 'layout' | 'navigation' | 'feedback' | 'form';

/**
 * Platform-specific applicability
 */
export type Platform = 'web' | 'ios' | 'android' | 'desktop' | 'all';

/**
 * A design pattern represents a reusable solution to a common design problem.
 * Based on the pattern language approach.
 */
export interface DesignPattern {
  /** Unique identifier (kebab-case) */
  id: string;
  /** Human-readable name */
  name: string;
  /** Primary category */
  category: DesignCategory;
  /** Pattern type for filtering */
  type: PatternType;
  /** Platforms this pattern applies to */
  platforms: Platform[];
  /** The design problem this pattern solves */
  problem: string;
  /** The proposed solution */
  solution: string;
  /** When and where to use this pattern */
  context: string;
  /** Structural information about the pattern */
  structure: {
    /** Description of the pattern structure */
    description: string;
    /** Component parts of the pattern */
    components: string[];
    /** Common variants of the pattern */
    variants?: string[];
  };
  /** Outcomes of using this pattern */
  consequences: {
    /** Benefits/advantages */
    benefits: string[];
    /** Trade-offs/limitations */
    tradeoffs: string[];
  };
  /** Real-world examples */
  examples: {
    description: string;
    platform?: Platform;
    implementation?: string;
  }[];
  /** IDs of related patterns */
  relatedPatterns: string[];
  /** Patterns that solve the same problem poorly */
  antiPatterns: string[];
  /** Accessibility considerations */
  accessibility: string[];
  /** Searchable tags */
  tags: string[];
  /** Optional source attribution */
  source?: string;
}

/**
 * Simplified pattern for search results and lists
 */
export interface PatternSummary {
  id: string;
  name: string;
  category: DesignCategory;
  type: PatternType;
  platforms: Platform[];
  problem: string;
  tags: string[];
}

/**
 * Convert full pattern to summary
 */
export function toPatternSummary(pattern: DesignPattern): PatternSummary {
  return {
    id: pattern.id,
    name: pattern.name,
    category: pattern.category,
    type: pattern.type,
    platforms: pattern.platforms,
    problem: pattern.problem,
    tags: pattern.tags,
  };
}
