import { DesignPattern } from '../../types/index.js';
import { navigationPatterns } from './navigation.js';
import { formPatterns } from './forms.js';
import { feedbackPatterns } from './feedback.js';
import { layoutPatterns } from './layout.js';

/**
 * All design patterns combined
 */
export const allPatterns: DesignPattern[] = [
  ...navigationPatterns,
  ...formPatterns,
  ...feedbackPatterns,
  ...layoutPatterns,
];

/**
 * Get pattern by ID
 */
export function getPatternById(id: string): DesignPattern | undefined {
  return allPatterns.find((p) => p.id === id);
}

/**
 * Get patterns by category
 */
export function getPatternsByCategory(category: string): DesignPattern[] {
  return allPatterns.filter((p) => p.category === category);
}

/**
 * Get patterns by type
 */
export function getPatternsByType(type: string): DesignPattern[] {
  return allPatterns.filter((p) => p.type === type);
}

/**
 * Get patterns by platform
 */
export function getPatternsByPlatform(platform: string): DesignPattern[] {
  return allPatterns.filter((p) => p.platforms.includes(platform as any) || p.platforms.includes('all'));
}

/**
 * Get patterns by tag
 */
export function getPatternsByTag(tag: string): DesignPattern[] {
  return allPatterns.filter((p) => p.tags.includes(tag));
}

export {
  navigationPatterns,
  formPatterns,
  feedbackPatterns,
  layoutPatterns,
};
