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
    
    // Load input component
    const inputConfig = this.loadComponentConfig('input');
    if (inputConfig) {
      this.components.set('input', inputConfig);
    }
    
    // Load card component
    const cardConfig = this.loadComponentConfig('card');
    if (cardConfig) {
      this.components.set('card', cardConfig);
    }
    
    // Load modal component
    const modalConfig = this.loadComponentConfig('modal');
    if (modalConfig) {
      this.components.set('modal', modalConfig);
    }
    
    // Load alert component
    const alertConfig = this.loadComponentConfig('alert');
    if (alertConfig) {
      this.components.set('alert', alertConfig);
    }
  }

  private loadComponentConfig(componentName: string): ComponentDefinition | null {
    try {
      // For now, hardcode the configs since we only have a few
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
      
      if (componentName === 'input') {
        return {
          name: 'Input',
          category: 'core',
          description: 'A flexible input component with multiple variants and validation states',
          keywords: ['input', 'textbox', 'field', 'form', 'text', 'email', 'password'],
          frameworks: ['react', 'vue', 'svelte'],
          styling: ['tailwind', 'css', 'styled-components'],
          variants: [
            {
              name: 'default',
              description: 'Standard input with border and focus states',
              features: ['focus', 'disabled', 'error', 'placeholder'],
              complexity: 'simple'
            },
            {
              name: 'filled',
              description: 'Input with filled background style',
              features: ['focus', 'disabled', 'error', 'placeholder'],
              complexity: 'simple'
            },
            {
              name: 'outlined',
              description: 'Input with outlined border style',
              features: ['focus', 'disabled', 'error', 'placeholder'],
              complexity: 'simple'
            }
          ],
          props: {
            type: {
              type: "'text' | 'email' | 'password' | 'number' | 'tel' | 'url'",
              default: 'text',
              description: 'Input type'
            },
            placeholder: {
              type: 'string',
              description: 'Placeholder text'
            },
            value: {
              type: 'string',
              description: 'Input value'
            },
            disabled: {
              type: 'boolean',
              default: false,
              description: 'Disabled state'
            },
            error: {
              type: 'boolean',
              default: false,
              description: 'Error state'
            },
            helperText: {
              type: 'string',
              description: 'Helper or error text'
            },
            label: {
              type: 'string',
              description: 'Input label'
            },
            required: {
              type: 'boolean',
              default: false,
              description: 'Required field indicator'
            },
            onChange: {
              type: '(value: string) => void',
              description: 'Change handler'
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
      
      if (componentName === 'card') {
        return {
          name: 'Card',
          category: 'core',
          description: 'A flexible card component with multiple variants and layout options',
          keywords: ['card', 'panel', 'container', 'box', 'surface'],
          frameworks: ['react', 'vue', 'svelte'],
          styling: ['tailwind', 'css', 'styled-components'],
          variants: [
            {
              name: 'default',
              description: 'Standard card with border and shadow',
              features: ['shadow', 'border', 'padding', 'responsive'],
              complexity: 'simple'
            },
            {
              name: 'elevated',
              description: 'Card with elevated shadow and hover effects',
              features: ['shadow', 'hover', 'elevation', 'responsive'],
              complexity: 'simple'
            },
            {
              name: 'outlined',
              description: 'Card with prominent border and no shadow',
              features: ['border', 'padding', 'responsive'],
              complexity: 'simple'
            }
          ],
          props: {
            variant: {
              type: "'default' | 'elevated' | 'outlined'",
              default: 'default',
              description: 'Card variant'
            },
            padding: {
              type: "'none' | 'sm' | 'md' | 'lg'",
              default: 'md',
              description: 'Internal padding'
            },
            children: {
              type: 'React.ReactNode',
              required: true,
              description: 'Card content'
            },
            header: {
              type: 'React.ReactNode',
              description: 'Card header content'
            },
            footer: {
              type: 'React.ReactNode',
              description: 'Card footer content'
            },
            onClick: {
              type: '() => void',
              description: 'Click handler for interactive cards'
            },
            className: {
              type: 'string',
              description: 'Additional CSS classes'
            }
          },
          dependencies: ['react', '@types/react'],
          imports: ['forwardRef']
        };
      }
      
      if (componentName === 'modal') {
        return {
          name: 'Modal',
          category: 'core',
          description: 'A modal dialog component with overlay and focus management',
          keywords: ['modal', 'dialog', 'popup', 'overlay', 'lightbox'],
          frameworks: ['react', 'vue', 'svelte'],
          styling: ['tailwind', 'css', 'styled-components'],
          variants: [
            {
              name: 'center',
              description: 'Modal centered on screen with backdrop',
              features: ['overlay', 'focus-trap', 'esc-key', 'responsive'],
              complexity: 'medium'
            },
            {
              name: 'fullscreen',
              description: 'Full screen modal on mobile, centered on desktop',
              features: ['overlay', 'focus-trap', 'responsive', 'mobile-full'],
              complexity: 'medium'
            },
            {
              name: 'bottom-sheet',
              description: 'Bottom sheet modal that slides up from bottom',
              features: ['overlay', 'slide-up', 'responsive'],
              complexity: 'medium'
            }
          ],
          props: {
            isOpen: {
              type: 'boolean',
              required: true,
              description: 'Whether the modal is open'
            },
            onClose: {
              type: '() => void',
              required: true,
              description: 'Function to close the modal'
            },
            variant: {
              type: "'center' | 'fullscreen' | 'bottom-sheet'",
              default: 'center',
              description: 'Modal variant'
            },
            size: {
              type: "'sm' | 'md' | 'lg' | 'xl'",
              default: 'md',
              description: 'Modal size'
            },
            title: {
              type: 'string',
              description: 'Modal title'
            },
            children: {
              type: 'React.ReactNode',
              required: true,
              description: 'Modal content'
            },
            showCloseButton: {
              type: 'boolean',
              default: true,
              description: 'Show close button'
            },
            closeOnOverlayClick: {
              type: 'boolean',
              default: true,
              description: 'Close modal when clicking overlay'
            },
            className: {
              type: 'string',
              description: 'Additional CSS classes'
            }
          },
          dependencies: ['react', '@types/react'],
          imports: ['useEffect', 'useRef']
        };
      }
      
      if (componentName === 'alert') {
        return {
          name: 'Alert',
          category: 'core',
          description: 'An alert component for displaying important messages and notifications',
          keywords: ['alert', 'notification', 'message', 'toast', 'banner', 'warning'],
          frameworks: ['react', 'vue', 'svelte'],
          styling: ['tailwind', 'css', 'styled-components'],
          variants: [
            {
              name: 'info',
              description: 'Informational alert with blue color scheme',
              features: ['icon', 'dismissible', 'responsive'],
              complexity: 'simple'
            },
            {
              name: 'success',
              description: 'Success alert with green color scheme',
              features: ['icon', 'dismissible', 'responsive'],
              complexity: 'simple'
            },
            {
              name: 'warning',
              description: 'Warning alert with yellow color scheme',
              features: ['icon', 'dismissible', 'responsive'],
              complexity: 'simple'
            },
            {
              name: 'error',
              description: 'Error alert with red color scheme',
              features: ['icon', 'dismissible', 'responsive'],
              complexity: 'simple'
            }
          ],
          props: {
            variant: {
              type: "'info' | 'success' | 'warning' | 'error'",
              default: 'info',
              description: 'Alert variant'
            },
            title: {
              type: 'string',
              description: 'Alert title'
            },
            children: {
              type: 'React.ReactNode',
              required: true,
              description: 'Alert content'
            },
            dismissible: {
              type: 'boolean',
              default: false,
              description: 'Whether the alert can be dismissed'
            },
            onDismiss: {
              type: '() => void',
              description: 'Function called when alert is dismissed'
            },
            showIcon: {
              type: 'boolean',
              default: true,
              description: 'Show variant icon'
            },
            className: {
              type: 'string',
              description: 'Additional CSS classes'
            }
          },
          dependencies: ['react', '@types/react'],
          imports: ['useState']
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