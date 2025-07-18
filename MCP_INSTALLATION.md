# 🚀 Claude Magic UI - MCP Server Installation

Transform Claude Code into a UI component generation powerhouse with natural language!

## 🎯 What This Gives You

**Before**: Manual component creation, copy-paste from libraries
**After**: `"create a blue button"` → Instant production-ready React/Vue/Svelte components

## 📦 Quick Installation

### Option 1: NPM Install (Recommended)
```bash
# Install globally
npm install -g claude-magic-ui

# Or install in your project
npm install claude-magic-ui
```

### Option 2: GitHub Install
```bash
# Clone the repo
git clone https://github.com/bknddevelopment/claude-magic-ui.git
cd claude-magic-ui

# Install dependencies and build
npm install
npm run build
```

## 🔧 Claude Code Integration

### Step 1: Add to Claude Code MCP Configuration

Add this to your Claude Code MCP configuration file:

```json
{
  "mcpServers": {
    "claude-magic-ui": {
      "command": "npx",
      "args": ["claude-magic-ui"],
      "description": "Natural language UI component generator"
    }
  }
}
```

### Step 2: Restart Claude Code

Restart Claude Code to load the new MCP server.

### Step 3: Verify Installation

In Claude Code, you should now have access to:
- `generate-component` tool
- `list-components` tool

## 🎨 Usage Examples

### Generate Components
```
Claude: Use the generate-component tool to create a blue button
```

### List Available Components
```
Claude: Use the list-components tool to see all available components
```

### Natural Language Generation
```
"Create a Vue input with error state"
"Generate a React modal dialog"
"Build a success alert component"
"Make a Svelte card with elevation"
```

## 🛠️ Available Tools

### 1. `generate-component`
**Purpose**: Generate UI components from natural language
**Parameters**:
- `description` (required): Natural language description
- `framework` (optional): react, vue, svelte (auto-detected)
- `styling` (optional): tailwind, css, styled-components

**Example**:
```json
{
  "description": "create a blue button with loading state",
  "framework": "react",
  "styling": "tailwind"
}
```

### 2. `list-components`
**Purpose**: List all available component types and variants
**Parameters**:
- `category` (optional): core, composite, layout

**Example**:
```json
{
  "category": "core"
}
```

## 📚 Component Library

### Core Components
- **Button**: 3 variants (primary, secondary, ghost)
- **Input**: 3 variants (default, filled, outlined)
- **Card**: 3 variants (default, elevated, outlined)
- **Modal**: 3 variants (center, fullscreen, bottom-sheet)
- **Alert**: 4 variants (info, success, warning, error)

### Supported Frameworks
- **React**: Full TypeScript, hooks, modern patterns
- **Vue**: Composition API, reactive patterns
- **Svelte**: Event dispatchers, reactive statements

### Styling Systems
- **Tailwind CSS**: Default, optimized classes
- **CSS**: Custom CSS with BEM methodology
- **Styled Components**: CSS-in-JS patterns

## 🔍 Natural Language Features

### Smart Detection
- **Component Type**: "button" → Button component
- **Framework**: "Vue button" → Vue framework
- **Variants**: "elevated card" → elevated variant
- **Features**: "loading state" → loading functionality

### Context Awareness
- **Colors**: "blue button" → blue color scheme
- **Sizes**: "large button" → large size variant
- **States**: "error input" → error state styling
- **Interactions**: "dismissible alert" → dismissible functionality

## 🚀 Advanced Usage

### Batch Generation
```typescript
// Generate multiple components
const components = [
  "create a login form",
  "create a dashboard card",
  "create a notification system"
];
```

### Framework-Specific
```typescript
// Generate for specific frameworks
"create a React component for user profile"
"create a Vue component for shopping cart"
"create a Svelte component for navigation"
```

## 🐛 Troubleshooting

### Common Issues

1. **MCP Server Not Found**
   ```bash
   # Make sure it's installed globally
   npm install -g claude-magic-ui
   
   # Or check local installation
   npm list claude-magic-ui
   ```

2. **Build Issues**
   ```bash
   # Rebuild the project
   npm run build
   
   # Clear cache
   rm -rf node_modules dist
   npm install
   npm run build
   ```

3. **Claude Code Integration**
   - Restart Claude Code after adding MCP configuration
   - Check MCP configuration file syntax
   - Verify server is running: `npx claude-magic-ui`

### Debug Mode
```bash
# Run server in debug mode
DEBUG=* npx claude-magic-ui
```

## 📈 What You Get

### Before Claude Magic UI
- Manual component creation
- Copy-paste from documentation
- Inconsistent patterns
- Framework-specific learning curves

### After Claude Magic UI
- **Instant Generation**: Components in seconds
- **Production Ready**: Tested, accessible code
- **Multi-Framework**: Same component, different frameworks
- **Consistent Quality**: Professional patterns always

## 🔗 Links

- **GitHub**: https://github.com/bknddevelopment/claude-magic-ui
- **Issues**: https://github.com/bknddevelopment/claude-magic-ui/issues
- **Documentation**: See README.md for technical details

## 🎯 Next Steps

1. **Install** using one of the methods above
2. **Configure** Claude Code MCP settings
3. **Test** with simple component generation
4. **Explore** advanced natural language features
5. **Integrate** into your development workflow

Transform your Claude Code experience with professional UI component generation! 🚀