// Core types for Claude Magic UI

export type Framework = 'react' | 'vue' | 'svelte';
export type StylingSystem = 'tailwind' | 'css' | 'styled-components' | 'emotion';
export type ComponentType = 
  | 'button'
  | 'input'
  | 'card'
  | 'modal'
  | 'alert'
  | 'pricing-table'
  | 'contact-form'
  | 'navigation'
  | 'hero'
  | 'data-table';

export interface ComponentRequest {
  description: string;
  framework: Framework;
  styling: StylingSystem;
  features?: string[];
  constraints?: ProjectConstraints;
}

export interface ProjectConstraints {
  projectPath?: string;
  colorScheme?: ColorScheme;
  typography?: Typography;
  existingComponents?: string[];
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface Typography {
  fontFamily: string;
  fontSize: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  fontWeight: {
    normal: string;
    medium: string;
    bold: string;
  };
}

export interface ComponentVariant {
  name: string;
  description: string;
  code: string;
  styles?: string;
  dependencies: string[];
  props: ComponentProps;
}

export interface ComponentProps {
  [key: string]: {
    type: string;
    required?: boolean;
    default?: any;
    description?: string;
  };
}

export interface ComponentResponse {
  variants: ComponentVariant[];
  metadata: ComponentMetadata;
  integrationInstructions: string[];
}

export interface ComponentMetadata {
  componentType: ComponentType;
  framework: Framework;
  styling: StylingSystem;
  features: string[];
  accessibility: boolean;
  responsive: boolean;
  generatedAt: Date;
}

export interface ParsedIntent {
  componentType: ComponentType;
  framework: Framework;
  styling: StylingSystem;
  features: string[];
  constraints: string[];
  confidence: number;
}

export interface ComponentDefinition {
  name: string;
  category: 'core' | 'composite' | 'layout';
  description: string;
  keywords: string[];
  frameworks: Framework[];
  styling: StylingSystem[];
  variants: VariantDefinition[];
  props: ComponentProps;
  dependencies: string[];
  imports: string[];
}

export interface VariantDefinition {
  name: string;
  description: string;
  features: string[];
  complexity: 'simple' | 'medium' | 'complex';
}

export interface ProjectContext {
  framework: Framework;
  styling: StylingSystem;
  colorScheme?: ColorScheme;
  typography?: Typography;
  componentPatterns: string[];
  dependencies: Record<string, string>;
  tsconfig?: any;
  packageJson?: any;
}

export interface GenerationOptions {
  accessibility: boolean;
  responsive: boolean;
  typescript: boolean;
  testing: boolean;
  documentation: boolean;
}

export interface ValidationResult {
  passed: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  type: 'syntax' | 'accessibility' | 'performance' | 'security';
  message: string;
  line?: number;
  column?: number;
  severity: 'error' | 'warning';
}

export interface ValidationWarning {
  type: string;
  message: string;
  suggestion?: string;
}