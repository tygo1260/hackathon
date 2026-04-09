#!/usr/bin/env node
/**
 * UI/UX Design MCP Server
 *
 * A Model Context Protocol server providing comprehensive UI/UX design knowledge:
 * - Design principles (Nielsen's heuristics, Gestalt, Laws of UX)
 * - Design patterns (navigation, forms, feedback, layout)
 * - Design tokens (colors, spacing, typography)
 * - Accessibility guidelines (WCAG-based)
 *
 * Run with: npx ui-ux-design-mcp
 * Or: node dist/index.js
 */

import { startServer } from './server.js';

startServer().catch((error) => {
  console.error('Failed to start UI/UX Design MCP server:', error);
  process.exit(1);
});
