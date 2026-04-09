import { DesignCategory } from './category.js';

/**
 * Guideline domain - specific areas of design
 */
export type GuidelineDomain =
  | 'color'
  | 'typography'
  | 'spacing'
  | 'layout'
  | 'iconography'
  | 'imagery'
  | 'motion'
  | 'accessibility'
  | 'responsive'
  | 'dark-mode';

/**
 * A design guideline provides specific, actionable recommendations
 * for a particular aspect of design.
 */
export interface DesignGuideline {
  /** Unique identifier */
  id: string;
  /** Human-readable name */
  name: string;
  /** Domain this guideline belongs to */
  domain: GuidelineDomain;
  /** Related category */
  category: DesignCategory;
  /** Brief description */
  summary: string;
  /** Detailed recommendation */
  recommendation: string;
  /** Specific rules or values */
  rules: {
    rule: string;
    value?: string;
    rationale?: string;
  }[];
  /** Do's - things to do */
  dos: string[];
  /** Don'ts - things to avoid */
  donts: string[];
  /** Code or implementation examples */
  codeExamples?: {
    language: string;
    code: string;
    description?: string;
  }[];
  /** Related guidelines */
  relatedGuidelines: string[];
  /** Searchable tags */
  tags: string[];
}

/**
 * Checklist item for design reviews
 */
export interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  wcagLevel?: 'A' | 'AA' | 'AAA';
  automated?: boolean;
}

/**
 * Design review checklist
 */
export interface DesignChecklist {
  id: string;
  name: string;
  description: string;
  type: 'ui' | 'ux' | 'accessibility' | 'general';
  items: ChecklistItem[];
}
