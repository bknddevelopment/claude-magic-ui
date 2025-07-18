import React, { forwardRef } from 'react';
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

export default Card;