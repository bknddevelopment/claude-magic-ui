// Main entry point for Claude Magic UI
export { ComponentGenerator } from './generators/component-generator';
export { NaturalLanguageParser } from './generators/parser';
export { ComponentLibrary } from './generators/component-library';
export { CodeGenerator } from './generators/code-generator';

// Types
export type * from '../lib/types';

// Default export for easy usage
export { ComponentGenerator as default } from './generators/component-generator';