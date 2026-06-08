'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-600 shadow-sm',
        secondary:
          'bg-teal-600 text-white hover:bg-teal-700 focus-visible:ring-teal-600 shadow-sm',
        outline:
          'border border-neutral-300 bg-transparent text-neutral-800 hover:bg-neutral-100 focus-visible:ring-brand-600',
        ghost:
          'bg-transparent text-neutral-700 hover:bg-neutral-100 focus-visible:ring-brand-600',
        destructive:
          'bg-error-500 text-white hover:bg-error-600 focus-visible:ring-error-500 shadow-sm',
        link:
          'bg-transparent text-brand-600 underline-offset-4 hover:underline focus-visible:ring-brand-600 p-0 h-auto',
      },
      size: {
        sm:   'h-8 px-3 text-sm',
        md:   'h-10 px-4 text-sm',
        lg:   'h-12 px-6 text-base',
        icon: 'h-10 w-10 p-0',
        'icon-sm': 'h-8 w-8 p-0',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  )
);

Button.displayName = 'Button';

export { Button, buttonVariants };
export type { ButtonProps };
