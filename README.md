# UI/UX Design MCP Server

A comprehensive Model Context Protocol (MCP) server providing UI/UX design knowledge including principles, patterns, guidelines, and design tokens.

## 📊 Knowledge Base

- **74 Design Principles** - Nielsen's heuristics, Gestalt, Laws of UX, accessibility, mobile, typography
- **30 Design Patterns** - Navigation, forms, feedback, layout patterns with accessibility considerations
- **89 Design Tokens** - Colors, spacing, typography, shadows, breakpoints, animations
- **13 Categories** - Organized from introductory concepts to specialized topics

## 🛠️ Tools

| Tool | Description |
|------|-------------|
| `search_design_knowledge` | Fuzzy search across all principles, patterns, and tokens |
| `get_design_principles` | Retrieve principles by ID, category, subcategory, or tag |
| `get_design_patterns` | Retrieve patterns by ID, type, platform, or tag |
| `get_design_tokens` | Retrieve design tokens by name or category |
| `get_accessibility_checklist` | WCAG-based checklist for component types |

## 📚 Resources

- `uiux://categories` - List all design categories
- `uiux://principles/all` - Complete principle list
- `uiux://patterns/all` - Complete pattern list
- `uiux://tokens/all` - Complete token list
- `uiux://stats` - Knowledge base statistics

## 💬 Prompts

- `ui_review` - Review UI designs for usability issues
- `accessibility_audit` - Perform accessibility audits
- `pattern_recommendation` - Get pattern recommendations for design problems
- `design_system_tokens` - Get token recommendations for design systems

## 🚀 Installation

```bash
npm install
npm run build
```

## 📖 Usage

### With Claude Desktop

Add to your Claude Desktop configuration (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "uiux": {
      "command": "node",
      "args": ["/path/to/ui-ux-design-mcp/dist/index.js"]
    }
  }
}
```

### Standalone

```bash
npm start
```

## 🎯 Content Coverage

### Principles

**UX Principles (24)**
- Nielsen's 10 Usability Heuristics
- Laws of UX (Fitts's Law, Hick's Law, Miller's Law, Jakob's Law, etc.)
- Core UX (Progressive Disclosure, Feedback, Affordance, Mental Models)

**Gestalt Principles (8)**
- Proximity, Similarity, Continuity, Closure
- Figure-Ground, Common Region, Common Fate, Focal Point

**UI Principles (11)**
- Visual Hierarchy, Contrast, Alignment, Whitespace
- Typography, Color Theory, Depth, Responsive Design, etc.

**Accessibility Principles (14)**
- WCAG foundations (Perceivable, Operable, Understandable, Robust)
- Color contrast, keyboard navigation, screen readers, ARIA

**Mobile Principles (8)**
- Touch design, thumb zones, gestures, platform patterns

**Typography Principles (8)**
- Scale, readability, pairing, responsive typography

### Patterns

**Navigation (7)**: Tabs, Sidebar, Hamburger, Bottom Nav, Breadcrumbs, Search, Pagination

**Forms (7)**: Inline Validation, Multi-Step, Form Fields, Autocomplete, Input Masking, Toggle, Date Picker

**Feedback (8)**: Toast, Modal, Loading Spinner, Skeleton, Progress, Empty State, Error Message, Alert Banner

**Layout (8)**: Card, List, Grid, Hero, Split View, Infinite Scroll, Bottom Sheet, FAB

### Tokens

- **Colors**: Semantic palette (primary, success, warning, error, info, neutral)
- **Spacing**: 4px base unit scale (0-128px)
- **Typography**: Type scale with line heights
- **Border Radius**: Rounded corners scale
- **Shadows**: Elevation levels
- **Breakpoints**: Responsive design breakpoints
- **Z-Index**: Layering system
- **Animation**: Durations and easings

## 🔧 Development

```bash
npm run dev    # Run with tsx (development)
npm run build  # Build TypeScript
npm run lint   # Lint code
npm test       # Run tests
```

## 📄 License

MIT

## 🙏 Attribution

Design knowledge synthesized from public domain sources:
- Jakob Nielsen's usability research
- Gestalt psychology principles
- WCAG accessibility guidelines
- Material Design documentation
- Apple Human Interface Guidelines
