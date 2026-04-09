/**
 * Design token categories
 */
export type TokenCategory =
  | 'color'
  | 'spacing'
  | 'typography'
  | 'border-radius'
  | 'shadow'
  | 'breakpoint'
  | 'z-index'
  | 'animation';

/**
 * Base design token interface
 */
export interface DesignToken {
  /** Token name/key */
  name: string;
  /** CSS-compatible value */
  value: string;
  /** Token category */
  category: TokenCategory;
  /** Human description */
  description?: string;
  /** Usage guidance */
  usage?: string;
  /** Aliases for this token */
  aliases?: string[];
}

/**
 * Color token with additional metadata
 */
export interface ColorToken extends DesignToken {
  category: 'color';
  /** Hex value */
  hex: string;
  /** RGB values */
  rgb: { r: number; g: number; b: number };
  /** HSL values */
  hsl?: { h: number; s: number; l: number };
  /** Semantic purpose */
  semantic?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  /** Contrast ratio against white */
  contrastOnWhite?: number;
  /** Contrast ratio against black */
  contrastOnBlack?: number;
}

/**
 * Spacing token
 */
export interface SpacingToken extends DesignToken {
  category: 'spacing';
  /** Pixel value */
  px: number;
  /** Rem value (assuming 16px base) */
  rem: number;
}

/**
 * Typography token
 */
export interface TypographyToken extends DesignToken {
  category: 'typography';
  /** Font size in pixels */
  fontSize: number;
  /** Line height ratio */
  lineHeight: number;
  /** Font weight */
  fontWeight?: number;
  /** Letter spacing */
  letterSpacing?: string;
}

/**
 * Border radius token
 */
export interface BorderRadiusToken extends DesignToken {
  category: 'border-radius';
  /** Pixel value */
  px: number;
}

/**
 * Shadow token
 */
export interface ShadowToken extends DesignToken {
  category: 'shadow';
  /** Box shadow CSS value */
  boxShadow: string;
  /** Elevation level (Material Design concept) */
  elevation?: number;
}

/**
 * Breakpoint token for responsive design
 */
export interface BreakpointToken extends DesignToken {
  category: 'breakpoint';
  /** Minimum width in pixels */
  minWidth: number;
  /** Maximum width in pixels */
  maxWidth?: number;
  /** Common device category */
  device?: 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'wide';
}

/**
 * Z-index token for layering
 */
export interface ZIndexToken extends DesignToken {
  category: 'z-index';
  /** Numeric z-index value */
  zIndex: number;
  /** Layer purpose */
  layer: 'base' | 'dropdown' | 'sticky' | 'modal' | 'popover' | 'tooltip' | 'toast';
}

/**
 * Animation/transition token
 */
export interface AnimationToken extends DesignToken {
  category: 'animation';
  /** Duration in milliseconds */
  duration: number;
  /** Easing function */
  easing: string;
  /** CSS transition value */
  transition?: string;
}

/**
 * Union type for all tokens
 */
export type AnyDesignToken =
  | ColorToken
  | SpacingToken
  | TypographyToken
  | BorderRadiusToken
  | ShadowToken
  | BreakpointToken
  | ZIndexToken
  | AnimationToken;
