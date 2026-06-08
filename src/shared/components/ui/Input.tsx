'use client';

import { forwardRef, type InputHTMLAttributes, useId } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-neutral-700">
            {label}
            {props.required && (
              <span className="ml-1 text-error-500" aria-hidden="true">*</span>
            )}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="pointer-events-none absolute left-4 text-neutral-400">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            aria-invalid={!!error}
            className={cn(
              'anchor-field',
              error && 'border-error-500 focus:border-error-500',
              leftIcon && 'pl-11',
              rightIcon && 'pr-11',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="pointer-events-none absolute right-4 text-neutral-400">
              {rightIcon}
            </span>
          )}
        </div>

        {error && (
          <p id={errorId} role="alert" className="text-xs text-error-500">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="text-xs text-neutral-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export { Input };
export type { InputProps };
