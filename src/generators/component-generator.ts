import { ComponentRequest, ComponentResponse, ComponentVariant, ComponentDefinition } from '@/lib/types';
import { NaturalLanguageParser } from './parser';
import { ComponentLibrary } from './component-library';
import { CodeGenerator } from './code-generator';

export class ComponentGenerator {
  private parser: NaturalLanguageParser;
  private library: ComponentLibrary;
  private codeGenerator: CodeGenerator;

  constructor() {
    this.parser = new NaturalLanguageParser();
    this.library = new ComponentLibrary();
    this.codeGenerator = new CodeGenerator();
  }

  async generateComponent(request: ComponentRequest): Promise<ComponentResponse> {
    // Parse the natural language description
    const parsedIntent = this.parser.parse(request.description);
    
    // Find matching component definition
    const componentDef = await this.library.findComponent(parsedIntent.componentType);
    
    if (!componentDef) {
      throw new Error(`Component type "${parsedIntent.componentType}" not found`);
    }

    // Generate variants
    const variants = await this.generateVariants(componentDef, request, parsedIntent);
    
    // Create metadata
    const metadata = {
      componentType: parsedIntent.componentType,
      framework: request.framework,
      styling: request.styling,
      features: parsedIntent.features,
      accessibility: true,
      responsive: parsedIntent.features.includes('responsive'),
      generatedAt: new Date()
    };

    // Generate integration instructions
    const integrationInstructions = this.generateIntegrationInstructions(variants, request);

    return {
      variants,
      metadata,
      integrationInstructions
    };
  }

  private async generateVariants(
    componentDef: ComponentDefinition,
    request: ComponentRequest,
    parsedIntent: any
  ): Promise<ComponentVariant[]> {
    const variants: ComponentVariant[] = [];
    
    // Determine which variants to generate
    const variantsToGenerate = this.selectVariants(componentDef, request, parsedIntent);
    
    for (const variantDef of variantsToGenerate) {
      const code = await this.codeGenerator.generateCode(
        componentDef,
        variantDef,
        request.framework,
        request.styling,
        parsedIntent.constraints
      );
      
      const styles = await this.codeGenerator.generateStyles(
        componentDef,
        variantDef,
        request.styling,
        parsedIntent.constraints
      );

      variants.push({
        name: variantDef.name,
        description: variantDef.description,
        code,
        styles,
        dependencies: componentDef.dependencies,
        props: componentDef.props
      });
    }

    return variants;
  }

  private selectVariants(componentDef: ComponentDefinition, request: ComponentRequest, parsedIntent: any) {
    // For now, return all variants. Later we can be smarter about selection
    return componentDef.variants.slice(0, 3); // Limit to 3 variants like Magic MCP
  }

  private generateIntegrationInstructions(variants: ComponentVariant[], request: ComponentRequest): string[] {
    const instructions: string[] = [];
    
    // Framework-specific dependencies
    const frameworkDeps = {
      react: ['react', '@types/react'],
      vue: ['vue', '@types/vue'],
      svelte: ['svelte', '@types/svelte']
    };
    
    instructions.push(`1. Install dependencies: npm install ${frameworkDeps[request.framework].join(' ')}`);
    
    if (request.styling === 'tailwind') {
      instructions.push('2. Make sure Tailwind CSS is configured in your project');
      if (request.framework === 'react') {
        instructions.push('3. Add the utility function if not already present');
      }
    }
    
    // Framework-specific usage instructions
    const frameworkUsage = {
      react: 'Import and use the component in your React application',
      vue: 'Import and use the component in your Vue application',
      svelte: 'Import and use the component in your Svelte application'
    };
    
    instructions.push(`${request.styling === 'tailwind' ? '4' : '3'}. ${frameworkUsage[request.framework]}`);
    instructions.push(`${request.styling === 'tailwind' ? '5' : '4'}. Customize props as needed for your use case`);
    
    return instructions;
  }

  // Quick generation method for testing
  async quickGenerate(description: string): Promise<ComponentResponse> {
    const parsedIntent = this.parser.parse(description);
    
    return this.generateComponent({
      description,
      framework: parsedIntent.framework,
      styling: parsedIntent.styling,
      features: parsedIntent.features,
      constraints: {}
    });
  }

  // Get all available components for MCP server
  getAllComponents() {
    return this.library.getAllComponents();
  }
}