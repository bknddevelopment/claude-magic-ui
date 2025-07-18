import React, { forwardRef } from 'react';
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
    
    const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

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

export default Input;