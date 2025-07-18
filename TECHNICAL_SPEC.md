# Claude Magic UI - Technical Specification

## System Overview

Claude Magic UI is a natural language-driven UI component generator that integrates directly with Claude Code to provide instant, production-ready components.

## Core Architecture

### 1. Natural Language Processing Engine

```typescript
interface ComponentRequest {
  description: string;
  framework: Framework;
  styling: StylingSystem;
  features?: string[];
  constraints?: ProjectConstraints;
}

interface ComponentResponse {
  variants: ComponentVariant[];
  metadata: ComponentMetadata;
  integrationInstructions: string[];
}
```

### 2. Component Library Structure

```
components/
├── core/
│   ├── Button/
│   │   ├── variants/
│   │   │   ├── primary.tsx
│   │   │   ├── secondary.tsx
│   │   │   └── ghost.tsx
│   │   ├── styles/
│   │   │   ├── tailwind.ts
│   │   │   ├── css.ts
│   │   │   └── styled.ts
│   │   └── config.json
│   ├── Input/
│   ├── Card/
│   └── Modal/
├── composite/
│   ├── PricingTable/
│   ├── ContactForm/
│   ├── Navigation/
│   └── Hero/
└── layouts/
    ├── Grid/
    ├── Container/
    └── Stack/
```

### 3. Generator Engine

```typescript
class ComponentGenerator {
  private parser: NLParser;
  private library: ComponentLibrary;
  private integrator: ProjectIntegrator;

  async generateComponent(request: ComponentRequest): Promise<ComponentResponse> {
    // Parse natural language
    const parsed = await this.parser.parse(request.description);
    
    // Find matching components
    const matches = this.library.findMatches(parsed);
    
    // Generate variations
    const variants = await this.generateVariants(matches, request);
    
    // Apply project context
    const integrated = await this.integrator.integrate(variants, request.constraints);
    
    return integrated;
  }
}
```

## Component Definition Format

```json
{
  "name": "PricingTable",
  "category": "composite",
  "description": "A pricing table with tiers and features",
  "keywords": ["pricing", "table", "tiers", "subscription", "plans"],
  "frameworks": ["react", "vue", "svelte"],
  "styling": ["tailwind", "css", "styled-components"],
  "variants": [
    {
      "name": "basic",
      "description": "Simple 3-tier pricing table",
      "features": ["responsive", "accessible"]
    },
    {
      "name": "popular",
      "description": "With popular badge and highlights",
      "features": ["responsive", "accessible", "badges"]
    },
    {
      "name": "comparison",
      "description": "Feature comparison matrix",
      "features": ["responsive", "accessible", "comparison"]
    }
  ],
  "props": {
    "tiers": {
      "type": "PricingTier[]",
      "required": true
    },
    "currency": {
      "type": "string",
      "default": "$"
    },
    "interval": {
      "type": "string",
      "default": "month"
    }
  },
  "dependencies": ["react", "@types/react"],
  "imports": ["useState", "useEffect"]
}
```

## Natural Language Processing

### Intent Recognition
```typescript
interface ParsedIntent {
  componentType: ComponentType;
  framework: Framework;
  styling: StylingSystem;
  features: Feature[];
  constraints: Constraint[];
}

class NLParser {
  parseDescription(description: string): ParsedIntent {
    // Extract component type
    const componentType = this.extractComponentType(description);
    
    // Extract features
    const features = this.extractFeatures(description);
    
    // Extract constraints
    const constraints = this.extractConstraints(description);
    
    return {
      componentType,
      features,
      constraints,
      // ... other properties
    };
  }
}
```

### Keyword Mapping
```typescript
const COMPONENT_KEYWORDS = {
  'pricing': ['ComponentType.PRICING_TABLE'],
  'contact': ['ComponentType.CONTACT_FORM'],
  'navigation': ['ComponentType.NAVBAR', 'ComponentType.SIDEBAR'],
  'hero': ['ComponentType.HERO_SECTION'],
  'card': ['ComponentType.CARD'],
  'modal': ['ComponentType.MODAL', 'ComponentType.DIALOG'],
  'button': ['ComponentType.BUTTON'],
  'form': ['ComponentType.FORM', 'ComponentType.CONTACT_FORM'],
  'table': ['ComponentType.TABLE', 'ComponentType.PRICING_TABLE']
};
```

## Project Integration

### Codebase Analysis
```typescript
interface ProjectContext {
  framework: Framework;
  styling: StylingSystem;
  colorScheme: ColorScheme;
  typography: Typography;
  componentPatterns: ComponentPattern[];
  dependencies: Dependency[];
}

class ProjectIntegrator {
  async analyzeProject(projectPath: string): Promise<ProjectContext> {
    const packageJson = await this.readPackageJson(projectPath);
    const configFiles = await this.findConfigFiles(projectPath);
    const components = await this.analyzeExistingComponents(projectPath);
    
    return {
      framework: this.detectFramework(packageJson),
      styling: this.detectStyling(configFiles),
      colorScheme: this.extractColorScheme(components),
      typography: this.extractTypography(components),
      componentPatterns: this.extractPatterns(components),
      dependencies: packageJson.dependencies
    };
  }
}
```

### Code Generation
```typescript
class CodeGenerator {
  generateReactComponent(
    template: ComponentTemplate,
    context: ProjectContext
  ): string {
    const imports = this.generateImports(template, context);
    const props = this.generateProps(template);
    const component = this.generateComponentBody(template, context);
    const styles = this.generateStyles(template, context);
    
    return `${imports}\n\n${component}\n\n${styles}`;
  }
}
```

## Quality Assurance

### Component Validation
```typescript
interface ComponentValidation {
  accessibility: AccessibilityCheck[];
  performance: PerformanceCheck[];
  responsiveness: ResponsiveCheck[];
  browser: BrowserCompatibilityCheck[];
}

class ComponentValidator {
  validateComponent(component: GeneratedComponent): ComponentValidation {
    return {
      accessibility: this.checkAccessibility(component),
      performance: this.checkPerformance(component),
      responsiveness: this.checkResponsiveness(component),
      browser: this.checkBrowserCompatibility(component)
    };
  }
}
```

### Testing Framework
```typescript
describe('ComponentGenerator', () => {
  it('should generate accessible components', async () => {
    const request = {
      description: 'Create a pricing table with 3 tiers',
      framework: 'react',
      styling: 'tailwind'
    };
    
    const response = await generator.generateComponent(request);
    
    expect(response.variants).toHaveLength(3);
    expect(response.variants[0].code).toContain('aria-label');
    expect(response.variants[0].code).toContain('role="table"');
  });
});
```

## Performance Considerations

### Caching Strategy
```typescript
class ComponentCache {
  private cache = new Map<string, ComponentResponse>();
  
  async get(key: string): Promise<ComponentResponse | null> {
    return this.cache.get(key) || null;
  }
  
  async set(key: string, value: ComponentResponse): Promise<void> {
    this.cache.set(key, value);
  }
}
```

### Optimization Techniques
1. **Component Memoization**: Cache generated components
2. **Lazy Loading**: Load component definitions on demand
3. **Tree Shaking**: Include only used utilities
4. **Code Splitting**: Separate framework-specific code

## Error Handling

### Error Types
```typescript
enum ErrorType {
  PARSING_ERROR = 'parsing_error',
  GENERATION_ERROR = 'generation_error',
  INTEGRATION_ERROR = 'integration_error',
  VALIDATION_ERROR = 'validation_error'
}

class ComponentError extends Error {
  constructor(
    type: ErrorType,
    message: string,
    public context?: any
  ) {
    super(message);
    this.name = type;
  }
}
```

### Recovery Strategies
1. **Fallback Components**: Provide basic alternatives
2. **Partial Generation**: Generate what's possible
3. **User Feedback**: Clear error messages with suggestions
4. **Graceful Degradation**: Maintain functionality

## Extensibility

### Plugin System
```typescript
interface ComponentPlugin {
  name: string;
  version: string;
  components: ComponentDefinition[];
  generators: GeneratorExtension[];
}

class PluginManager {
  loadPlugin(plugin: ComponentPlugin): void {
    this.registerComponents(plugin.components);
    this.registerGenerators(plugin.generators);
  }
}
```

### Custom Component Registration
```typescript
interface CustomComponent {
  definition: ComponentDefinition;
  templates: ComponentTemplate[];
  validator?: ComponentValidator;
}

class ComponentRegistry {
  registerComponent(component: CustomComponent): void {
    this.validateDefinition(component.definition);
    this.storeComponent(component);
  }
}
```

## Security Considerations

### Code Injection Prevention
```typescript
class SecurityValidator {
  validateGeneratedCode(code: string): SecurityValidation {
    const checks = [
      this.checkForDangerousPatterns(code),
      this.validateImports(code),
      this.checkForXSS(code),
      this.validateProps(code)
    ];
    
    return {
      safe: checks.every(check => check.passed),
      issues: checks.filter(check => !check.passed)
    };
  }
}
```

### Input Sanitization
```typescript
class InputSanitizer {
  sanitizeDescription(description: string): string {
    return description
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .trim()
      .slice(0, 1000); // Limit length
  }
}
```

This technical specification provides the foundation for building a robust, secure, and extensible UI component generator that integrates seamlessly with Claude Code.