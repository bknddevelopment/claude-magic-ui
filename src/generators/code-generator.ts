import { ComponentDefinition, VariantDefinition, Framework, StylingSystem } from '@/lib/types';
import { readFileSync } from 'fs';
import { join } from 'path';

export class CodeGenerator {
  async generateCode(
    componentDef: ComponentDefinition,
    variantDef: VariantDefinition,
    framework: Framework,
    styling: StylingSystem,
    constraints: string[]
  ): Promise<string> {
    // For now, we'll use our button template
    if (componentDef.name === 'Button' && framework === 'react') {
      return this.generateButtonCode(variantDef, styling, constraints);
    }
    
    throw new Error(`Code generation not implemented for ${componentDef.name} in ${framework}`);
  }

  async generateStyles(
    componentDef: ComponentDefinition,
    variantDef: VariantDefinition,
    styling: StylingSystem,
    constraints: string[]
  ): Promise<string | undefined> {
    // For Tailwind, styles are inline
    if (styling === 'tailwind') {
      return undefined;
    }
    
    // For CSS, we would generate separate CSS
    if (styling === 'css') {
      return this.generateCSSStyles(componentDef, variantDef, constraints);
    }
    
    return undefined;
  }

  private generateButtonCode(variantDef: VariantDefinition, styling: StylingSystem, constraints: string[]): string {
    // Apply constraints to modify the base button code
    let buttonCode = this.getBaseButtonCode();
    
    // Apply color constraints
    const colorConstraint = constraints.find(c => c.startsWith('color:'));
    if (colorConstraint) {
      const color = colorConstraint.split(':')[1];
      buttonCode = this.applyColorConstraint(buttonCode, color, variantDef.name);
    }
    
    // Apply size constraints
    const sizeConstraint = constraints.find(c => c.startsWith('size:'));
    if (sizeConstraint) {
      const size = sizeConstraint.split(':')[1];
      buttonCode = this.applySizeConstraint(buttonCode, size);
    }
    
    return buttonCode;
  }

  private getBaseButtonCode(): string {
    return `import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
      secondary: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100',
      ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm rounded-md',
      md: 'h-10 px-4 text-sm rounded-md',
      lg: 'h-12 px-6 text-base rounded-lg'
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;`;
  }

  private applyColorConstraint(code: string, color: string, variant: string): string {
    const colorMap: Record<string, string> = {
      'red': 'red',
      'green': 'green',
      'blue': 'blue',
      'yellow': 'yellow',
      'purple': 'purple',
      'pink': 'pink',
      'gray': 'gray'
    };

    const tailwindColor = colorMap[color] || 'blue';
    
    // Replace the primary variant color
    if (variant === 'primary') {
      code = code.replace(
        'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
        `bg-${tailwindColor}-600 text-white hover:bg-${tailwindColor}-700 active:bg-${tailwindColor}-800`
      );
    }
    
    return code;
  }

  private applySizeConstraint(code: string, size: string): string {
    const sizeMap: Record<string, string> = {
      'small': 'sm',
      'medium': 'md',
      'large': 'lg',
      'sm': 'sm',
      'md': 'md',
      'lg': 'lg'
    };

    const tailwindSize = sizeMap[size] || 'md';
    
    // Update the default size
    code = code.replace(
      'size = \'md\'',
      `size = '${tailwindSize}'`
    );
    
    return code;
  }

  private generateCSSStyles(componentDef: ComponentDefinition, variantDef: VariantDefinition, constraints: string[]): string {
    // Generate CSS styles for non-Tailwind styling systems
    return `
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  border: none;
  cursor: pointer;
  border-radius: 6px;
}

.button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button--primary {
  background-color: #3b82f6;
  color: white;
}

.button--primary:hover {
  background-color: #2563eb;
}

.button--secondary {
  background-color: white;
  color: #374151;
  border: 1px solid #d1d5db;
}

.button--secondary:hover {
  background-color: #f9fafb;
}

.button--ghost {
  background-color: transparent;
  color: #374151;
}

.button--ghost:hover {
  background-color: #f3f4f6;
}

.button--sm {
  height: 32px;
  padding: 0 12px;
  font-size: 14px;
}

.button--md {
  height: 40px;
  padding: 0 16px;
  font-size: 14px;
}

.button--lg {
  height: 48px;
  padding: 0 24px;
  font-size: 16px;
}
    `;
  }
}