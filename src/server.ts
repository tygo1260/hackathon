import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { knowledgeStats, CATEGORY_DEFINITIONS, allPrinciples, allPatterns, allTokens } from './data/index.js';
import {
  searchToolSchema,
  executeSearch,
  principlesToolSchema,
  executePrinciples,
  patternsToolSchema,
  executePatterns,
  tokensToolSchema,
  executeTokens,
  accessibilityToolSchema,
  executeAccessibility,
} from './tools/index.js';

/**
 * Create and configure the MCP server
 */
export function createServer(): Server {
  const server = new Server(
    {
      name: 'ui-ux-design-mcp',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
        resources: {},
        prompts: {},
      },
    }
  );

  // ===== TOOLS =====
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: 'search_design_knowledge',
          description:
            'Search across all UI/UX design knowledge including principles, patterns, and tokens using fuzzy matching. Returns relevant results with relevance scores.',
          inputSchema: {
            type: 'object' as const,
            properties: {
              query: {
                type: 'string',
                description: 'The search query to find relevant design knowledge',
              },
              type: {
                type: 'string',
                enum: ['principle', 'pattern', 'token'],
                description: 'Filter results to a specific type',
              },
              category: {
                type: 'string',
                description: 'Filter results to a specific category (e.g., "ux", "accessibility")',
              },
              limit: {
                type: 'number',
                description: 'Maximum number of results to return (default: 10, max: 50)',
              },
            },
            required: ['query'],
          },
        },
        {
          name: 'get_design_principles',
          description:
            `Retrieve UI/UX design principles including Nielsen\'s heuristics, Gestalt principles, Laws of UX, accessibility guidelines, and more. Contains ${knowledgeStats.principleCount} principles across ${knowledgeStats.categoryCount} categories.`,
          inputSchema: {
            type: 'object' as const,
            properties: {
              id: {
                type: 'string',
                description: 'Get a specific principle by ID (e.g., "visibility-of-system-status")',
              },
              category: {
                type: 'string',
                enum: ['ux', 'ui', 'accessibility', 'mobile', 'typography', 'interaction', 'web'],
                description: 'Filter by category',
              },
              subcategory: {
                type: 'string',
                description: 'Filter by subcategory (e.g., "heuristics", "gestalt", "laws", "wcag")',
              },
              tag: {
                type: 'string',
                description: 'Filter by tag',
              },
              listAll: {
                type: 'boolean',
                description: 'List all available principles with category breakdown',
              },
            },
          },
        },
        {
          name: 'get_design_patterns',
          description:
            `Retrieve UI/UX design patterns for common interface problems. Contains ${knowledgeStats.patternCount} patterns covering navigation, forms, feedback, and layout. Each pattern includes problem, solution, structure, consequences, and accessibility considerations.`,
          inputSchema: {
            type: 'object' as const,
            properties: {
              id: {
                type: 'string',
                description: 'Get a specific pattern by ID (e.g., "pattern-tabs")',
              },
              type: {
                type: 'string',
                enum: ['ui', 'ux', 'interaction', 'layout', 'navigation', 'feedback', 'form'],
                description: 'Filter by pattern type',
              },
              platform: {
                type: 'string',
                enum: ['web', 'ios', 'android', 'desktop', 'all'],
                description: 'Filter by platform',
              },
              category: {
                type: 'string',
                description: 'Filter by category',
              },
              tag: {
                type: 'string',
                description: 'Filter by tag',
              },
              listAll: {
                type: 'boolean',
                description: 'List all available patterns',
              },
            },
          },
        },
        {
          name: 'get_design_tokens',
          description:
            `Retrieve design tokens for colors, spacing, typography, shadows, and more. Contains ${knowledgeStats.tokenCount} tokens providing a complete design token system.`,
          inputSchema: {
            type: 'object' as const,
            properties: {
              name: {
                type: 'string',
                description: 'Get a specific token by name (e.g., "primary-500")',
              },
              category: {
                type: 'string',
                enum: ['color', 'spacing', 'typography', 'border-radius', 'shadow', 'breakpoint', 'z-index', 'animation'],
                description: 'Filter by token category',
              },
              listAll: {
                type: 'boolean',
                description: 'List all available tokens',
              },
            },
          },
        },
        {
          name: 'get_accessibility_checklist',
          description:
            'Get a WCAG-based accessibility checklist for specific component types. Returns critical and additional requirements at the specified conformance level.',
          inputSchema: {
            type: 'object' as const,
            properties: {
              component: {
                type: 'string',
                enum: ['button', 'form', 'modal', 'navigation', 'images', 'color', 'keyboard', 'general'],
                description: 'The component type or area to get accessibility guidance for',
              },
              wcagLevel: {
                type: 'string',
                enum: ['A', 'AA', 'AAA'],
                default: 'AA',
                description: 'Target WCAG conformance level',
              },
            },
            required: ['component'],
          },
        },
      ],
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case 'search_design_knowledge': {
          const input = searchToolSchema.parse(args);
          const result = executeSearch(input);
          return { content: [{ type: 'text', text: result }] };
        }
        case 'get_design_principles': {
          const input = principlesToolSchema.parse(args);
          const result = executePrinciples(input);
          return { content: [{ type: 'text', text: result }] };
        }
        case 'get_design_patterns': {
          const input = patternsToolSchema.parse(args);
          const result = executePatterns(input);
          return { content: [{ type: 'text', text: result }] };
        }
        case 'get_design_tokens': {
          const input = tokensToolSchema.parse(args);
          const result = executeTokens(input);
          return { content: [{ type: 'text', text: result }] };
        }
        case 'get_accessibility_checklist': {
          const input = accessibilityToolSchema.parse(args);
          const result = executeAccessibility(input);
          return { content: [{ type: 'text', text: result }] };
        }
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return {
        content: [{ type: 'text', text: `Error: ${message}` }],
        isError: true,
      };
    }
  });

  // ===== RESOURCES =====
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: [
        {
          uri: 'uiux://categories',
          name: 'Design Categories',
          description: 'List of all design knowledge categories',
          mimeType: 'text/markdown',
        },
        {
          uri: 'uiux://principles/all',
          name: 'All Principles',
          description: 'Complete list of all design principles',
          mimeType: 'text/markdown',
        },
        {
          uri: 'uiux://patterns/all',
          name: 'All Patterns',
          description: 'Complete list of all design patterns',
          mimeType: 'text/markdown',
        },
        {
          uri: 'uiux://tokens/all',
          name: 'All Tokens',
          description: 'Complete list of all design tokens',
          mimeType: 'text/markdown',
        },
        {
          uri: 'uiux://stats',
          name: 'Knowledge Base Stats',
          description: 'Statistics about the design knowledge base',
          mimeType: 'text/markdown',
        },
      ],
    };
  });

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;

    switch (uri) {
      case 'uiux://categories': {
        const lines = ['# Design Categories\n'];
        CATEGORY_DEFINITIONS.forEach((cat) => {
          lines.push(`## ${cat.icon} ${cat.name}`);
          lines.push(`**ID:** \`${cat.id}\``);
          lines.push(`${cat.description}`);
          lines.push(`**Subcategories:** ${cat.subcategories.join(', ')}`);
          lines.push('');
        });
        return { contents: [{ uri, mimeType: 'text/markdown', text: lines.join('\n') }] };
      }

      case 'uiux://principles/all': {
        const lines = [`# All Design Principles (${allPrinciples.length})\n`];
        allPrinciples.forEach((p) => {
          lines.push(`- **${p.name}** (\`${p.id}\`): ${p.summary.substring(0, 100)}...`);
        });
        return { contents: [{ uri, mimeType: 'text/markdown', text: lines.join('\n') }] };
      }

      case 'uiux://patterns/all': {
        const lines = [`# All Design Patterns (${allPatterns.length})\n`];
        allPatterns.forEach((p) => {
          lines.push(`- **${p.name}** (\`${p.id}\`): ${p.problem.substring(0, 100)}...`);
        });
        return { contents: [{ uri, mimeType: 'text/markdown', text: lines.join('\n') }] };
      }

      case 'uiux://tokens/all': {
        const lines = [`# All Design Tokens (${allTokens.length})\n`];
        const byCategory: Record<string, typeof allTokens> = {};
        allTokens.forEach((t) => {
          if (!byCategory[t.category]) byCategory[t.category] = [];
          byCategory[t.category].push(t);
        });
        Object.entries(byCategory).forEach(([cat, tokens]) => {
          lines.push(`## ${cat} (${tokens.length})`);
          tokens.forEach((t) => {
            lines.push(`- \`${t.name}\`: ${t.value}`);
          });
          lines.push('');
        });
        return { contents: [{ uri, mimeType: 'text/markdown', text: lines.join('\n') }] };
      }

      case 'uiux://stats': {
        const lines = [
          '# UI/UX Design Knowledge Base Stats\n',
          `- **Total Items:** ${knowledgeStats.totalItems}`,
          `- **Principles:** ${knowledgeStats.principleCount}`,
          `- **Patterns:** ${knowledgeStats.patternCount}`,
          `- **Tokens:** ${knowledgeStats.tokenCount}`,
          `- **Categories:** ${knowledgeStats.categoryCount}`,
          '',
          '## Coverage',
          '- Nielsen\'s 10 Usability Heuristics ✓',
          '- 8 Gestalt Principles ✓',
          '- 11 Laws of UX ✓',
          '- 14 Accessibility Principles ✓',
          '- 8 Mobile Design Principles ✓',
          '- 8 Typography Principles ✓',
          '- 11 UI Design Principles ✓',
          '',
          '## Pattern Coverage',
          '- 7 Navigation Patterns ✓',
          '- 7 Form Patterns ✓',
          '- 8 Feedback Patterns ✓',
          '- 8 Layout Patterns ✓',
        ];
        return { contents: [{ uri, mimeType: 'text/markdown', text: lines.join('\n') }] };
      }

      default:
        throw new Error(`Unknown resource: ${uri}`);
    }
  });

  // ===== PROMPTS =====
  server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return {
      prompts: [
        {
          name: 'ui_review',
          description: 'Review a UI design for usability issues and improvements based on design principles',
          arguments: [
            {
              name: 'description',
              description: 'Description of the UI being reviewed',
              required: true,
            },
            {
              name: 'focus',
              description: 'Specific area to focus on (optional)',
              required: false,
            },
          ],
        },
        {
          name: 'accessibility_audit',
          description: 'Perform an accessibility audit of a component or interface',
          arguments: [
            {
              name: 'component',
              description: 'Description of the component or interface to audit',
              required: true,
            },
            {
              name: 'level',
              description: 'Target WCAG level (A, AA, or AAA)',
              required: false,
            },
          ],
        },
        {
          name: 'pattern_recommendation',
          description: 'Get pattern recommendations for a specific design problem',
          arguments: [
            {
              name: 'problem',
              description: 'Description of the design problem to solve',
              required: true,
            },
            {
              name: 'platform',
              description: 'Target platform (web, ios, android, desktop)',
              required: false,
            },
          ],
        },
        {
          name: 'design_system_tokens',
          description: 'Get recommended design tokens for a new design system',
          arguments: [
            {
              name: 'brand_color',
              description: 'Primary brand color (optional)',
              required: false,
            },
            {
              name: 'style',
              description: 'Design style (minimal, bold, etc.)',
              required: false,
            },
          ],
        },
      ],
    };
  });

  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
      case 'ui_review': {
        const description = args?.description || 'No description provided';
        const focus = args?.focus || '';
        return {
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: `Please review this UI design for usability issues and potential improvements.

**UI Description:**
${description}

${focus ? `**Focus Area:** ${focus}` : ''}

Use the following tools to inform your review:
1. \`get_design_principles\` with category "ux" to check against Nielsen's heuristics
2. \`get_design_principles\` with subcategory "gestalt" to check visual organization
3. \`get_accessibility_checklist\` with component "general" for accessibility issues

Provide your analysis in this format:
1. **Principle Violations** - Which design principles are being violated?
2. **Usability Issues** - Specific problems that could affect users
3. **Accessibility Concerns** - Potential accessibility barriers
4. **Recommendations** - Specific improvements to make

Be specific and actionable in your feedback.`,
              },
            },
          ],
        };
      }

      case 'accessibility_audit': {
        const component = args?.component || 'No component provided';
        const level = args?.level || 'AA';
        return {
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: `Please perform an accessibility audit on the following component/interface.

**Component Description:**
${component}

**Target WCAG Level:** ${level}

Use these tools:
1. \`get_accessibility_checklist\` with the relevant component type
2. \`get_design_principles\` with category "accessibility"
3. \`search_design_knowledge\` for specific accessibility topics

Provide your audit in this format:
1. **WCAG Compliance Summary** - Overall assessment
2. **Critical Issues** - Must-fix problems
3. **Warnings** - Should-fix improvements
4. **Recommendations** - Best practice suggestions
5. **Testing Checklist** - Manual tests to perform

Include specific WCAG success criteria references.`,
              },
            },
          ],
        };
      }

      case 'pattern_recommendation': {
        const problem = args?.problem || 'No problem provided';
        const platform = args?.platform || 'all';
        return {
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: `Please recommend design patterns to solve this problem.

**Problem:**
${problem}

**Target Platform:** ${platform}

Use these tools:
1. \`search_design_knowledge\` to find relevant patterns
2. \`get_design_patterns\` with the appropriate type or platform
3. \`get_design_principles\` for supporting principles

Provide your recommendations:
1. **Primary Pattern** - The best pattern for this problem
2. **Alternative Patterns** - Other options with trade-offs
3. **Implementation Considerations** - Key things to watch for
4. **Accessibility Requirements** - A11y considerations
5. **Related Principles** - Principles guiding this choice`,
              },
            },
          ],
        };
      }

      case 'design_system_tokens': {
        const brandColor = args?.brand_color || '#3b82f6';
        const style = args?.style || 'modern';
        return {
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: `Please recommend design tokens for a new design system.

**Brand Color:** ${brandColor}
**Style:** ${style}

Use \`get_design_tokens\` with listAll=true to see available token categories, then provide recommendations for each category.

Include:
1. **Color Palette** - Primary, secondary, semantic colors
2. **Spacing Scale** - Recommended spacing values
3. **Typography Scale** - Font sizes and line heights
4. **Border Radius** - Rounding values for the style
5. **Shadows** - Elevation levels
6. **Breakpoints** - Responsive design breakpoints

Format as CSS custom properties where appropriate.`,
              },
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown prompt: ${name}`);
    }
  });

  return server;
}

/**
 * Start the server with stdio transport
 */
export async function startServer(): Promise<void> {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('UI/UX Design MCP Server running on stdio');
}
