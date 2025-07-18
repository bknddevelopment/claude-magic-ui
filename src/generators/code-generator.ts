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
}