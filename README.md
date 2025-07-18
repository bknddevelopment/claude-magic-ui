# Claude Magic UI - MCP Server

> Transform Claude Code into a UI component generation powerhouse with natural language!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue.svg)](https://modelcontextprotocol.io/)

## 🚀 What This Does

**Claude Magic UI** is a Model Context Protocol (MCP) server that brings professional UI component generation directly into Claude Code. Instead of manually creating components or copying from libraries, just describe what you want in natural language.

### Before vs After

**Before:**
```typescript
// Manual component creation
const Button = ({ children, onClick, disabled }) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {children}
    </button>
  );
};
```

**After:**
```
You: "create a blue button with loading state"
Claude: *Uses MCP server to generate 3 professional variants with TypeScript, accessibility, and loading states*
```

## ✨ Key Features

### 🎯 Natural Language Generation
- **"create a blue button"** → Button component with blue styling
- **"create a Vue input with error state"** → Vue input with validation
- **"create an elevated card"** → Card component with shadow elevation
- **"create a success alert with dismiss"** → Alert with success styling and dismiss functionality

### 🏗️ Multi-Framework Support
- **React**: Modern hooks, TypeScript, best practices
- **Vue**: Composition API, reactive patterns, TypeScript
- **Svelte**: Event dispatchers, reactive statements, TypeScript

### 🎨 Complete Component Library
- **Button**: 3 variants (primary, secondary, ghost)
- **Input**: 3 variants (default, filled, outlined)
- **Card**: 3 variants (default, elevated, outlined)
- **Modal**: 3 variants (center, fullscreen, bottom-sheet)
- **Alert**: 4 variants (info, success, warning, error)

### 🔧 Production-Ready Code
- **TypeScript**: Full type safety and IntelliSense
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsive**: Mobile-first design patterns
- **Testing**: Component validation and error handling

## 📦 Installation

### Option 1: NPM Install (Recommended)
```bash
# Install globally for Claude Code MCP usage
npm install -g claude-magic-ui

# Or install in your project
npm install claude-magic-ui
```

### Option 2: GitHub Install
```bash
# Clone and build
git clone https://github.com/bknddevelopment/claude-magic-ui.git
cd claude-magic-ui
npm install
npm run build
```

## 🔧 Claude Code Integration

### Step 1: Configure MCP Server

Add to your Claude Code MCP configuration:

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

### Step 3: Start Using

In Claude Code, you can now:
- Generate components with natural language
- List available components and variants
- Get production-ready code instantly

## 🎨 Usage Examples

### Basic Component Generation
```
Claude: Use the generate-component tool to create a blue button
```

**Result**: 3 button variants with blue styling, TypeScript interfaces, and accessibility features.

### Framework-Specific Generation
```
Claude: Generate a Vue input component with error validation
```

**Result**: Vue component with Composition API, reactive validation, and error states.

### Advanced Components
```
Claude: Create a React modal dialog with custom size options
```

**Result**: Modal component with overlay, focus management, ESC key handling, and size variants.

## 🛠️ Available MCP Tools

### 1. `generate-component`
Generate UI components from natural language descriptions.

**Parameters:**
- `description` (required): Natural language description
- `framework` (optional): react, vue, svelte (auto-detected)
- `styling` (optional): tailwind, css, styled-components

**Example:**
```json
{
  "description": "create a blue button with loading state",
  "framework": "react",
  "styling": "tailwind"
}
```

### 2. `list-components`
List all available component types and their variants.

**Parameters:**
- `category` (optional): core, composite, layout

**Example:**
```json
{
  "category": "core"
}
```

## 🧠 Smart Natural Language Processing

### Component Detection
- **"button"** → Button component
- **"input field"** → Input component
- **"card"** → Card component
- **"modal dialog"** → Modal component
- **"alert"** → Alert component

### Framework Detection
- **"React button"** → React framework
- **"Vue input"** → Vue framework
- **"Svelte card"** → Svelte framework

### Variant Detection
- **"elevated card"** → elevated variant
- **"outlined input"** → outlined variant
- **"ghost button"** → ghost variant

### Feature Detection
- **"loading state"** → loading functionality
- **"error state"** → error styling
- **"dismissible"** → dismiss functionality

## 🎯 Component Library

### Core Components

#### Button Component
- **Variants**: primary, secondary, ghost
- **Features**: loading states, disabled states, size variants
- **Props**: variant, size, loading, disabled, onClick

#### Input Component
- **Variants**: default, filled, outlined
- **Features**: validation, error states, helper text, labels
- **Props**: type, placeholder, value, error, helperText, label

#### Card Component
- **Variants**: default, elevated, outlined
- **Features**: headers, footers, padding options, interactive states
- **Props**: variant, padding, header, footer, onClick

#### Modal Component
- **Variants**: center, fullscreen, bottom-sheet
- **Features**: overlay, focus management, ESC key, size options
- **Props**: isOpen, onClose, variant, size, title, showCloseButton

#### Alert Component
- **Variants**: info, success, warning, error
- **Features**: icons, dismissible, titles, auto-dismiss
- **Props**: variant, title, dismissible, onDismiss, showIcon

## 🔍 Natural Language Examples

### Basic Examples
```
"create a blue button"
"create an input field"
"create a card component"
"create a modal dialog"
"create a success alert"
```

### Framework-Specific Examples
```
"create a React button with loading state"
"create a Vue input with validation"
"create a Svelte card with custom padding"
```

### Advanced Examples
```
"create a large red button with loading spinner"
"create a filled input with error state and helper text"
"create an elevated card with header and footer"
"create a fullscreen modal with custom title"
"create a dismissible warning alert with icon"
```

## 🚀 Development

### Project Structure
```
claude-magic-ui/
├── src/
│   ├── components/          # Component definitions
│   ├── generators/          # Core generation logic
│   ├── templates/           # Framework-specific templates
│   └── utils/              # Utility functions
├── mcp-server.js           # MCP server implementation
├── demo.ts                 # Demo script
└── README.md               # This file
```

### Building
```bash
npm run build        # Build the project
npm run dev         # Development mode
npm run test        # Run tests
npm run lint        # Lint code
```

### Testing MCP Server
```bash
npm run mcp-server  # Start MCP server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- **GitHub**: https://github.com/bknddevelopment/claude-magic-ui
- **Issues**: https://github.com/bknddevelopment/claude-magic-ui/issues
- **MCP Documentation**: https://modelcontextprotocol.io/

## 🎯 Roadmap

- [ ] Vue and Svelte template completions
- [ ] More component types (navigation, forms, tables)
- [ ] Custom component templates
- [ ] Design system integration
- [ ] Component composition features
- [ ] Advanced natural language processing

---

**Transform your Claude Code experience with professional UI component generation!** 🚀