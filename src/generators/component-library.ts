import { ComponentType, ComponentDefinition } from '@/lib/types';
import { readFileSync } from 'fs';
import { join } from 'path';

export class ComponentLibrary {
  private components: Map<ComponentType, ComponentDefinition> = new Map();

  constructor() {
    this.loadComponents();
  }

  private loadComponents() {
    // Load button component
    const buttonConfig = this.loadComponentConfig('button');
    if (buttonConfig) {
      this.components.set('button', buttonConfig);
    }
  }

  private loadComponentConfig(componentName: string): ComponentDefinition | null {
    try {
      // For now, hardcode the button config since we only have one
      if (componentName === 'button') {
        return {
          name: 'Button',
          category: 'core',
          description: 'A customizable button component with multiple variants and states',
          keywords: ['button', 'btn', 'click', 'action', 'submit', 'link'],
          frameworks: ['react', 'vue', 'svelte'],
          styling: ['tailwind', 'css', 'styled-components'],
          variants: [
            {
              name: 'primary',
              description: 'Primary button with solid background',
              features: ['hover', 'focus', 'disabled'],
              complexity: 'simple'
            },
            {
              name: 'secondary',
              description: 'Secondary button with outline style',
              features: ['hover', 'focus', 'disabled'],
              complexity: 'simple'
            },
            {
              name: 'ghost',
              description: 'Ghost button with transparent background',
              features: ['hover', 'focus', 'disabled'],
              complexity: 'simple'
            }
          ],
          props: {
            children: {
              type: 'React.ReactNode',
              required: true,
              description: 'Button content'
            },
            variant: {
              type: "'primary' | 'secondary' | 'ghost'",
              default: 'primary',
              description: 'Button variant'
            },
            size: {
              type: "'sm' | 'md' | 'lg'",
              default: 'md',
              description: 'Button size'
            },
            disabled: {
              type: 'boolean',
              default: false,
              description: 'Disabled state'
            },
            loading: {
              type: 'boolean',
              default: false,
              description: 'Loading state'
            },
            onClick: {
              type: '() => void',
              description: 'Click handler'
            },
            className: {
              type: 'string',
              description: 'Additional CSS classes'
            }
          },
          dependencies: ['react', '@types/react'],
          imports: ['useState', 'forwardRef']
        };
      }
      return null;
    } catch (error) {
      console.error(`Failed to load component config for ${componentName}:`, error);
      return null;
    }
  }

  async findComponent(componentType: ComponentType): Promise<ComponentDefinition | null> {
    return this.components.get(componentType) || null;
  }

  getAllComponents(): ComponentDefinition[] {
    return Array.from(this.components.values());
  }

  getComponentsByCategory(category: 'core' | 'composite' | 'layout'): ComponentDefinition[] {
    return Array.from(this.components.values()).filter(comp => comp.category === category);
  }

  searchComponents(query: string): ComponentDefinition[] {
    const results: ComponentDefinition[] = [];
    const lowerQuery = query.toLowerCase();

    for (const component of this.components.values()) {
      // Check name match
      if (component.name.toLowerCase().includes(lowerQuery)) {
        results.push(component);
        continue;
      }

      // Check keyword matches
      if (component.keywords.some(keyword => keyword.includes(lowerQuery))) {
        results.push(component);
        continue;
      }

      // Check description match
      if (component.description.toLowerCase().includes(lowerQuery)) {
        results.push(component);
      }
    }

    return results;
  }
}