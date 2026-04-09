import { z } from 'zod';
import { getTokenByName, getTokensByCategory, allTokens } from '../data/index.js';
import { TokenCategory } from '../types/index.js';

/**
 * Schema for the get_design_tokens tool
 */
export const tokensToolSchema = z.object({
  name: z.string().optional().describe('Get a specific token by name'),
  category: z
    .enum(['color', 'spacing', 'typography', 'border-radius', 'shadow', 'breakpoint', 'z-index', 'animation'])
    .optional()
    .describe('Filter by token category'),
  listAll: z.boolean().optional().describe('List all available tokens'),
});

export type TokensToolInput = z.infer<typeof tokensToolSchema>;

/**
 * Execute the get_design_tokens tool
 */
export function executeTokens(input: TokensToolInput): string {
  // Get specific token by name
  if (input.name) {
    const token = getTokenByName(input.name);
    if (!token) {
      return `Token "${input.name}" not found. Use listAll=true to see available tokens.`;
    }

    const lines: string[] = [];
    lines.push(`# ${token.name}`);
    lines.push('');
    lines.push(`**Category:** ${token.category}`);
    lines.push(`**Value:** \`${token.value}\``);
    if (token.description) {
      lines.push(`**Description:** ${token.description}`);
    }
    if (token.usage) {
      lines.push(`**Usage:** ${token.usage}`);
    }

    // Category-specific fields
    if ('hex' in token) {
      lines.push(`**Hex:** ${token.hex}`);
      lines.push(`**RGB:** rgb(${token.rgb.r}, ${token.rgb.g}, ${token.rgb.b})`);
      if (token.semantic) {
        lines.push(`**Semantic:** ${token.semantic}`);
      }
      if (token.contrastOnWhite) {
        lines.push(`**Contrast on white:** ${token.contrastOnWhite}:1`);
      }
    }

    if ('px' in token && token.category === 'spacing') {
      lines.push(`**Pixels:** ${token.px}px`);
      lines.push(`**Rem:** ${(token as any).rem}rem`);
    }

    if ('fontSize' in token) {
      lines.push(`**Font Size:** ${token.fontSize}px`);
      lines.push(`**Line Height:** ${token.lineHeight}`);
    }

    return lines.join('\n');
  }

  // Filter by category
  if (input.category) {
    const tokens = getTokensByCategory(input.category as TokenCategory);
    if (tokens.length === 0) {
      return `No tokens found for category "${input.category}".`;
    }

    const lines: string[] = [];
    lines.push(`## ${tokens.length} ${input.category} Tokens\n`);
    lines.push('| Name | Value | Description |');
    lines.push('|------|-------|-------------|');

    tokens.forEach((token) => {
      const desc = token.description || token.usage || '';
      lines.push(`| ${token.name} | \`${token.value}\` | ${desc} |`);
    });

    lines.push('\nUse `name` parameter to get full details for any token.');

    return lines.join('\n');
  }

  // List all
  if (input.listAll) {
    const byCategory: Record<string, number> = {};
    allTokens.forEach((t) => {
      byCategory[t.category] = (byCategory[t.category] || 0) + 1;
    });

    const lines: string[] = [];
    lines.push(`## ${allTokens.length} Design Tokens Available\n`);
    lines.push('**By Category:**');
    Object.entries(byCategory).forEach(([cat, count]) => {
      lines.push(`- ${cat}: ${count} tokens`);
    });
    lines.push('');
    lines.push('**Categories:**');
    lines.push('- `color` - Semantic color palette');
    lines.push('- `spacing` - Spacing scale (4px base)');
    lines.push('- `typography` - Type scale');
    lines.push('- `border-radius` - Border radius scale');
    lines.push('- `shadow` - Elevation/shadow scale');
    lines.push('- `breakpoint` - Responsive breakpoints');
    lines.push('- `z-index` - Layering scale');
    lines.push('- `animation` - Duration and easing');
    lines.push('');
    lines.push('Use `category` parameter to filter.');

    return lines.join('\n');
  }

  return 'Please specify one of: name, category, or listAll=true.';
}
