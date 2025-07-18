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
    // Button component
    if (componentDef.name === 'Button') {
      return this.generateButtonCode(variantDef, framework, styling, constraints);
    }
    
    // Input component
    if (componentDef.name === 'Input') {
      return this.generateInputCode(variantDef, framework, styling, constraints);
    }
    
    // Card component
    if (componentDef.name === 'Card') {
      return this.generateCardCode(variantDef, framework, styling, constraints);
    }
    
    // Modal component
    if (componentDef.name === 'Modal') {
      return this.generateModalCode(variantDef, framework, styling, constraints);
    }
    
    // Alert component
    if (componentDef.name === 'Alert') {
      return this.generateAlertCode(variantDef, framework, styling, constraints);
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

  private generateButtonCode(variantDef: VariantDefinition, framework: Framework, styling: StylingSystem, constraints: string[]): string {
    let buttonCode = this.getBaseButtonCode(framework);
    
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

  private generateInputCode(variantDef: VariantDefinition, framework: Framework, styling: StylingSystem, constraints: string[]): string {
    let inputCode = this.getBaseInputCode(framework);
    
    // Apply color constraints
    const colorConstraint = constraints.find(c => c.startsWith('color:'));
    if (colorConstraint) {
      const color = colorConstraint.split(':')[1];
      inputCode = this.applyInputColorConstraint(inputCode, color);
    }
    
    return inputCode;
  }

  private generateCardCode(variantDef: VariantDefinition, framework: Framework, styling: StylingSystem, constraints: string[]): string {
    let cardCode = this.getBaseCardCode(framework);
    
    // Apply constraints if any
    const colorConstraint = constraints.find(c => c.startsWith('color:'));
    if (colorConstraint) {
      const color = colorConstraint.split(':')[1];
      cardCode = this.applyCardColorConstraint(cardCode, color);
    }
    
    return cardCode;
  }

  private generateModalCode(variantDef: VariantDefinition, framework: Framework, styling: StylingSystem, constraints: string[]): string {
    let modalCode = this.getBaseModalCode(framework);
    
    // Apply constraints if any
    const sizeConstraint = constraints.find(c => c.startsWith('size:'));
    if (sizeConstraint) {
      const size = sizeConstraint.split(':')[1];
      modalCode = this.applyModalSizeConstraint(modalCode, size);
    }
    
    return modalCode;
  }

  private generateAlertCode(variantDef: VariantDefinition, framework: Framework, styling: StylingSystem, constraints: string[]): string {
    let alertCode = this.getBaseAlertCode(framework);
    
    // Apply constraints if any
    const variantConstraint = constraints.find(c => c.startsWith('type:'));
    if (variantConstraint) {
      const type = variantConstraint.split(':')[1];
      alertCode = this.applyAlertVariantConstraint(alertCode, type);
    }
    
    return alertCode;
  }

  private getBaseButtonCode(framework: Framework): string {
    switch (framework) {
      case 'react':
        return this.getReactButtonCode();
      case 'vue':
        return this.getVueButtonCode();
      case 'svelte':
        return this.getSvelteButtonCode();
      default:
        return this.getReactButtonCode();
    }
  }

  private getBaseInputCode(framework: Framework): string {
    switch (framework) {
      case 'react':
        return this.getReactInputCode();
      case 'vue':
        return this.getVueInputCode();
      case 'svelte':
        return this.getSvelteInputCode();
      default:
        return this.getReactInputCode();
    }
  }

  private getReactButtonCode(): string {
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

  private getVueButtonCode(): string {
    return `<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
    v-bind="$attrs"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  class?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  class: ''
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
    secondary: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100',
    ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
  }

  const sizes = {
    sm: 'h-8 px-3 text-sm rounded-md',
    md: 'h-10 px-4 text-sm rounded-md',
    lg: 'h-12 px-6 text-base rounded-lg'
  }

  return [
    baseClasses,
    variants[props.variant],
    sizes[props.size],
    props.class
  ].join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>`;
  }

  private getSvelteButtonCode(): string {
    return `<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let variant: 'primary' | 'secondary' | 'ghost' = 'primary'
  export let size: 'sm' | 'md' | 'lg' = 'md'
  export let disabled: boolean = false
  export let loading: boolean = false
  export let className: string = ''

  const dispatch = createEventDispatcher<{
    click: MouseEvent
  }>()

  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
    secondary: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100',
    ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
  }

  const sizes = {
    sm: 'h-8 px-3 text-sm rounded-md',
    md: 'h-10 px-4 text-sm rounded-md',
    lg: 'h-12 px-6 text-base rounded-lg'
  }

  $: buttonClasses = [
    baseClasses,
    variants[variant],
    sizes[size],
    className
  ].join(' ')

  function handleClick(event: MouseEvent) {
    if (!disabled && !loading) {
      dispatch('click', event)
    }
  }
</script>

<button
  class={buttonClasses}
  {disabled}
  on:click={handleClick}
  {...$$restProps}
>
  {#if loading}
    <svg
      class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  {/if}
  <slot />
</button>`;
  }

  private getReactInputCode(): string {
    return `import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'filled' | 'outlined';
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', error = false, helperText, label, required, ...props }, ref) => {
    const baseStyles = 'w-full px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
    
    const variants = {
      default: 'border border-gray-300 bg-white rounded-md focus:border-blue-500',
      filled: 'border-0 bg-gray-100 rounded-md focus:bg-white focus:ring-1 focus:ring-blue-500',
      outlined: 'border-2 border-gray-300 bg-transparent rounded-md focus:border-blue-500'
    };

    const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
    
    const inputId = props.id || \`input-\${Math.random().toString(36).substr(2, 9)}\`;

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId} 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          id={inputId}
          className={cn(
            baseStyles,
            variants[variant],
            errorStyles,
            className
          )}
          ref={ref}
          {...props}
        />
        {helperText && (
          <p className={cn(
            'text-xs mt-1',
            error ? 'text-red-500' : 'text-gray-500'
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;`;
  }

  private getVueInputCode(): string {
    return `<template>
  <div class="w-full">
    <label 
      v-if="label" 
      :for="inputId"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    <input
      :id="inputId"
      :class="inputClasses"
      :value="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="type"
      :required="required"
      @input="handleInput"
      v-bind="$attrs"
    />
    <p 
      v-if="helperText" 
      :class="helperTextClasses"
    >
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface InputProps {
  modelValue?: string
  variant?: 'default' | 'filled' | 'outlined'
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  placeholder?: string
  disabled?: boolean
  error?: boolean
  helperText?: string
  label?: string
  required?: boolean
  class?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  variant: 'default',
  type: 'text',
  disabled: false,
  error: false,
  required: false,
  class: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputId = ref(\`input-\${Math.random().toString(36).substr(2, 9)}\`)

const inputClasses = computed(() => {
  const baseClasses = 'w-full px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  
  const variants = {
    default: 'border border-gray-300 bg-white rounded-md focus:border-blue-500',
    filled: 'border-0 bg-gray-100 rounded-md focus:bg-white focus:ring-1 focus:ring-blue-500',
    outlined: 'border-2 border-gray-300 bg-transparent rounded-md focus:border-blue-500'
  }

  const errorClasses = props.error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
  
  return [
    baseClasses,
    variants[props.variant],
    errorClasses,
    props.class
  ].join(' ')
})

const helperTextClasses = computed(() => {
  return [
    'text-xs mt-1',
    props.error ? 'text-red-500' : 'text-gray-500'
  ].join(' ')
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>`;
  }

  private getSvelteInputCode(): string {
    return `<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let value: string = ''
  export let variant: 'default' | 'filled' | 'outlined' = 'default'
  export let type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text'
  export let placeholder: string = ''
  export let disabled: boolean = false
  export let error: boolean = false
  export let helperText: string = ''
  export let label: string = ''
  export let required: boolean = false
  export let className: string = ''

  const dispatch = createEventDispatcher<{
    input: string
    change: string
  }>()

  const inputId = \`input-\${Math.random().toString(36).substr(2, 9)}\`

  const baseClasses = 'w-full px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  
  const variants = {
    default: 'border border-gray-300 bg-white rounded-md focus:border-blue-500',
    filled: 'border-0 bg-gray-100 rounded-md focus:bg-white focus:ring-1 focus:ring-blue-500',
    outlined: 'border-2 border-gray-300 bg-transparent rounded-md focus:border-blue-500'
  }

  $: inputClasses = [
    baseClasses,
    variants[variant],
    error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '',
    className
  ].join(' ')

  $: helperTextClasses = [
    'text-xs mt-1',
    error ? 'text-red-500' : 'text-gray-500'
  ].join(' ')

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    value = target.value
    dispatch('input', value)
  }

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement
    dispatch('change', target.value)
  }
</script>

<div class="w-full">
  {#if label}
    <label for={inputId} class="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {#if required}
        <span class="text-red-500 ml-1">*</span>
      {/if}
    </label>
  {/if}
  
  <input
    id={inputId}
    class={inputClasses}
    {type}
    {placeholder}
    {disabled}
    {required}
    bind:value
    on:input={handleInput}
    on:change={handleChange}
    {...$$restProps}
  />
  
  {#if helperText}
    <p class={helperTextClasses}>
      {helperText}
    </p>
  {/if}
</div>`;
  }

  private applyInputColorConstraint(code: string, color: string): string {
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
    
    // Replace focus colors
    code = code.replace(
      /focus:border-blue-500/g,
      `focus:border-${tailwindColor}-500`
    );
    
    code = code.replace(
      /focus:ring-blue-500/g,
      `focus:ring-${tailwindColor}-500`
    );
    
    return code;
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

  private getBaseCardCode(framework: Framework): string {
    switch (framework) {
      case 'react':
        return this.getReactCardCode();
      case 'vue':
        return this.getVueCardCode();
      case 'svelte':
        return this.getSvelteCardCode();
      default:
        return this.getReactCardCode();
    }
  }

  private getBaseModalCode(framework: Framework): string {
    switch (framework) {
      case 'react':
        return this.getReactModalCode();
      case 'vue':
        return this.getVueModalCode();
      case 'svelte':
        return this.getSvelteModalCode();
      default:
        return this.getReactModalCode();
    }
  }

  private getBaseAlertCode(framework: Framework): string {
    switch (framework) {
      case 'react':
        return this.getReactAlertCode();
      case 'vue':
        return this.getVueAlertCode();
      case 'svelte':
        return this.getSvelteAlertCode();
      default:
        return this.getReactAlertCode();
    }
  }

  private getReactCardCode(): string {
    return `import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', header, footer, children, ...props }, ref) => {
    const baseStyles = 'bg-white rounded-lg transition-all duration-200';
    
    const variants = {
      default: 'border border-gray-200 shadow-sm hover:shadow-md',
      elevated: 'shadow-lg hover:shadow-xl border-0',
      outlined: 'border-2 border-gray-300 shadow-none hover:border-gray-400'
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };

    const cardClasses = cn(
      baseStyles,
      variants[variant],
      className
    );

    const contentClasses = cn(paddings[padding]);

    return (
      <div className={cardClasses} ref={ref} {...props}>
        {header && (
          <div className={cn('border-b border-gray-200 pb-4 mb-4', paddings[padding])}>
            {header}
          </div>
        )}
        
        <div className={contentClasses}>
          {children}
        </div>
        
        {footer && (
          <div className={cn('border-t border-gray-200 pt-4 mt-4', paddings[padding])}>
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;`;
  }

  private getReactModalCode(): string {
    return `import React, { useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'center' | 'fullscreen' | 'bottom-sheet';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  variant = 'center',
  size = 'md',
  title,
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
  className
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className={cn('bg-white rounded-lg shadow-xl transform transition-all max-w-md w-full', className)}>
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              {showCloseButton && (
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;`;
  }

  private getReactAlertCode(): string {
    return `import React, { useState } from 'react';
import { cn } from '@/utils/cn';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  showIcon?: boolean;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  showIcon = true,
  className
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const variants = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    success: 'bg-green-50 border-green-200 text-green-900',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    error: 'bg-red-50 border-red-200 text-red-900'
  };

  return (
    <div className={cn('rounded-md border p-4', variants[variant], className)}>
      <div className="flex">
        {showIcon && (
          <div className="flex-shrink-0">
            <div className="w-5 h-5">
              {/* Icon based on variant */}
            </div>
          </div>
        )}
        <div className="ml-3">
          {title && <h3 className="text-sm font-medium mb-1">{title}</h3>}
          <div className="text-sm">{children}</div>
        </div>
        {dismissible && (
          <div className="ml-auto pl-3">
            <button onClick={handleDismiss} className="text-gray-400 hover:text-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;`;
  }

  // Placeholder methods for Vue and Svelte
  private getVueCardCode(): string {
    return '<!-- Vue Card implementation -->';
  }

  private getSvelteCardCode(): string {
    return '<!-- Svelte Card implementation -->';
  }

  private getVueModalCode(): string {
    return '<!-- Vue Modal implementation -->';
  }

  private getSvelteModalCode(): string {
    return '<!-- Svelte Modal implementation -->';
  }

  private getVueAlertCode(): string {
    return '<!-- Vue Alert implementation -->';
  }

  private getSvelteAlertCode(): string {
    return '<!-- Svelte Alert implementation -->';
  }

  private applyCardColorConstraint(code: string, color: string): string {
    // Apply color constraints to card
    return code;
  }

  private applyModalSizeConstraint(code: string, size: string): string {
    // Apply size constraints to modal
    return code;
  }

  private applyAlertVariantConstraint(code: string, type: string): string {
    // Apply variant constraints to alert
    return code;
  }
}