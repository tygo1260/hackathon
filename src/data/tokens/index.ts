import { AnyDesignToken, TokenCategory } from '../../types/index.js';
import { colorTokens } from './colors.js';
import { spacingTokens } from './spacing.js';
import {
  typographyTokens,
  borderRadiusTokens,
  shadowTokens,
  breakpointTokens,
  zIndexTokens,
  animationTokens,
} from './typography.js';

/**
 * All design tokens combined
 */
export const allTokens: AnyDesignToken[] = [
  ...colorTokens,
  ...spacingTokens,
  ...typographyTokens,
  ...borderRadiusTokens,
  ...shadowTokens,
  ...breakpointTokens,
  ...zIndexTokens,
  ...animationTokens,
];

/**
 * Get token by name
 */
export function getTokenByName(name: string): AnyDesignToken | undefined {
  return allTokens.find((t) => t.name === name);
}

/**
 * Get tokens by category
 */
export function getTokensByCategory(category: TokenCategory): AnyDesignToken[] {
  return allTokens.filter((t) => t.category === category);
}

export {
  colorTokens,
  spacingTokens,
  typographyTokens,
  borderRadiusTokens,
  shadowTokens,
  breakpointTokens,
  zIndexTokens,
  animationTokens,
};
