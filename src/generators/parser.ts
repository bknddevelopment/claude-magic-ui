import { ComponentType, Framework, StylingSystem, ParsedIntent } from '@/lib/types';

// Keyword mappings for component detection
const COMPONENT_KEYWORDS: Record<string, ComponentType[]> = {
  'button': ['button'],
  'btn': ['button'],
  'input': ['input'],
  'form': ['input', 'contact-form'],
  'textbox': ['input'],
  'field': ['input'],
  'card': ['card'],
  'panel': ['card'],
  'modal': ['modal'],
  'dialog': ['modal'],
  'popup': ['modal'],
  'overlay': ['modal'],
  'alert': ['alert'],
  'notification': ['alert'],
  'message': ['alert'],
  'toast': ['alert'],
  'pricing': ['pricing-table'],
  'price': ['pricing-table'],
  'subscription': ['pricing-table'],
  'plan': ['pricing-table'],
  'tier': ['pricing-table'],
  'contact': ['contact-form'],
  'navigation': ['navigation'],
  'nav': ['navigation'],
  'navbar': ['navigation'],
  'menu': ['navigation'],
  'sidebar': ['navigation'],
  'hero': ['hero'],
  'banner': ['hero'],
  'header': ['hero'],
  'landing': ['hero'],
  'table': ['data-table'],
  'grid': ['data-table'],
  'list': ['data-table'],
  'data': ['data-table']
};

const FRAMEWORK_KEYWORDS: Record<string, Framework> = {
  'react': 'react',
  'vue': 'vue',
  'svelte': 'svelte',
  'next': 'react',
  'nuxt': 'vue',
  'sveltekit': 'svelte'
};

const STYLING_KEYWORDS: Record<string, StylingSystem> = {
  'tailwind': 'tailwind',
  'css': 'css',
  'styled-components': 'styled-components',
  'styled': 'styled-components',
  'emotion': 'emotion'
};

const FEATURE_KEYWORDS: Record<string, string[]> = {
  'responsive': ['responsive'],
  'mobile': ['responsive'],
  'accessible': ['accessibility'],
  'a11y': ['accessibility'],
  'dark': ['dark-mode'],
  'theme': ['theming'],
  'animated': ['animation'],
  'loading': ['loading-state'],
  'spinner': ['loading-state'],
  'validation': ['form-validation'],
  'error': ['error-handling'],
  'success': ['success-state'],
  'disabled': ['disabled-state'],
  'hover': ['hover-effects'],
  'focus': ['focus-states'],
  'gradient': ['gradient-background'],
  'shadow': ['drop-shadow'],
  'rounded': ['rounded-corners'],
  'border': ['border-styles']
};

export class NaturalLanguageParser {
  parse(description: string): ParsedIntent {
    const normalized = description.toLowerCase().trim();
    
    // Extract component type
    const componentType = this.extractComponentType(normalized);
    
    // Extract framework (default to React)
    const framework = this.extractFramework(normalized) || 'react';
    
    // Extract styling system (default to Tailwind)
    const styling = this.extractStyling(normalized) || 'tailwind';
    
    // Extract features
    const features = this.extractFeatures(normalized);
    
    // Extract constraints
    const constraints = this.extractConstraints(normalized);
    
    // Calculate confidence score
    const confidence = this.calculateConfidence(normalized, componentType, features);
    
    return {
      componentType,
      framework,
      styling,
      features,
      constraints,
      confidence
    };
  }

  private extractComponentType(description: string): ComponentType {
    let bestMatch: ComponentType = 'button'; // Default fallback
    let maxMatches = 0;
    
    for (const [keyword, types] of Object.entries(COMPONENT_KEYWORDS)) {
      if (description.includes(keyword)) {
        const matches = description.split(keyword).length - 1;
        if (matches > maxMatches) {
          maxMatches = matches;
          bestMatch = types[0]; // Take first match
        }
      }
    }
    
    // Special cases for composite components
    if (description.includes('pricing') && description.includes('table')) {
      return 'pricing-table';
    }
    if (description.includes('contact') && description.includes('form')) {
      return 'contact-form';
    }
    if (description.includes('data') && description.includes('table')) {
      return 'data-table';
    }
    
    return bestMatch;
  }

  private extractFramework(description: string): Framework | null {
    for (const [keyword, framework] of Object.entries(FRAMEWORK_KEYWORDS)) {
      if (description.includes(keyword)) {
        return framework;
      }
    }
    return null;
  }

  private extractStyling(description: string): StylingSystem | null {
    for (const [keyword, styling] of Object.entries(STYLING_KEYWORDS)) {
      if (description.includes(keyword)) {
        return styling;
      }
    }
    return null;
  }

  private extractFeatures(description: string): string[] {
    const features: string[] = [];
    
    for (const [keyword, featureList] of Object.entries(FEATURE_KEYWORDS)) {
      if (description.includes(keyword)) {
        features.push(...featureList);
      }
    }
    
    // Remove duplicates
    return [...new Set(features)];
  }

  private extractConstraints(description: string): string[] {
    const constraints: string[] = [];
    
    // Color constraints
    const colors = ['blue', 'red', 'green', 'yellow', 'purple', 'pink', 'gray', 'black', 'white'];
    for (const color of colors) {
      if (description.includes(color)) {
        constraints.push(`color:${color}`);
      }
    }
    
    // Size constraints
    const sizes = ['small', 'medium', 'large', 'xl', 'xs', 'sm', 'lg'];
    for (const size of sizes) {
      if (description.includes(size)) {
        constraints.push(`size:${size}`);
      }
    }
    
    // Style constraints
    if (description.includes('minimal')) constraints.push('style:minimal');
    if (description.includes('modern')) constraints.push('style:modern');
    if (description.includes('classic')) constraints.push('style:classic');
    if (description.includes('elegant')) constraints.push('style:elegant');
    
    return constraints;
  }

  private calculateConfidence(description: string, componentType: ComponentType, features: string[]): number {
    let confidence = 0.5; // Base confidence
    
    // Increase confidence for clear component type matches
    const componentKeywords = Object.keys(COMPONENT_KEYWORDS);
    const matchedKeywords = componentKeywords.filter(keyword => description.includes(keyword));
    confidence += matchedKeywords.length * 0.1;
    
    // Increase confidence for feature matches
    confidence += features.length * 0.05;
    
    // Increase confidence for specific composite components
    if (componentType === 'pricing-table' && description.includes('pricing') && description.includes('table')) {
      confidence += 0.2;
    }
    
    if (componentType === 'contact-form' && description.includes('contact') && description.includes('form')) {
      confidence += 0.2;
    }
    
    // Cap confidence at 1.0
    return Math.min(confidence, 1.0);
  }

  // Additional utility methods
  extractVariantHint(description: string): string | null {
    if (description.includes('simple') || description.includes('basic')) return 'basic';
    if (description.includes('advanced') || description.includes('complex')) return 'advanced';
    if (description.includes('minimal')) return 'minimal';
    if (description.includes('full') || description.includes('complete')) return 'complete';
    return null;
  }

  extractQuantity(description: string): number | null {
    const matches = description.match(/(\d+)\s*(tier|column|row|item|button)/);
    return matches ? parseInt(matches[1]) : null;
  }

  extractComparison(description: string): string | null {
    const patterns = [
      /like\s+([a-zA-Z]+)/,
      /similar\s+to\s+([a-zA-Z]+)/,
      /inspired\s+by\s+([a-zA-Z]+)/,
      /based\s+on\s+([a-zA-Z]+)/
    ];
    
    for (const pattern of patterns) {
      const match = description.match(pattern);
      if (match) {
        return match[1];
      }
    }
    
    return null;
  }
}