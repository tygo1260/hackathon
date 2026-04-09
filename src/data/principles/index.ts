import { DesignPrinciple } from '../../types/index.js';
import { uxPrinciples } from './ux.js';
import { gestaltPrinciples } from './gestalt.js';
import { uiPrinciples } from './ui.js';
import { accessibilityPrinciples } from './accessibility.js';
import { mobilePrinciples } from './mobile.js';
import { typographyPrinciples } from './typography.js';

/**
 * All design principles combined
 */
export const allPrinciples: DesignPrinciple[] = [
  ...uxPrinciples,
  ...gestaltPrinciples,
  ...uiPrinciples,
  ...accessibilityPrinciples,
  ...mobilePrinciples,
  ...typographyPrinciples,
];

/**
 * Get principle by ID
 */
export function getPrincipleById(id: string): DesignPrinciple | undefined {
  return allPrinciples.find((p) => p.id === id);
}

/**
 * Get principles by category
 */
export function getPrinciplesByCategory(category: string): DesignPrinciple[] {
  return allPrinciples.filter((p) => p.category === category);
}

/**
 * Get principles by subcategory
 */
export function getPrinciplesBySubcategory(subcategory: string): DesignPrinciple[] {
  return allPrinciples.filter((p) => p.subcategory === subcategory);
}

/**
 * Get principles by tag
 */
export function getPrinciplesByTag(tag: string): DesignPrinciple[] {
  return allPrinciples.filter((p) => p.tags.includes(tag));
}

export {
  uxPrinciples,
  gestaltPrinciples,
  uiPrinciples,
  accessibilityPrinciples,
  mobilePrinciples,
  typographyPrinciples,
};
