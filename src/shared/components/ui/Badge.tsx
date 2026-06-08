import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default:  'bg-neutral-100 text-neutral-700',
        primary:  'bg-brand-100 text-brand-700',
        secondary:'bg-teal-100 text-teal-700',
        accent:   'bg-accent-100 text-accent-600',
        success:  'bg-success-50 text-success-600',
        warning:  'bg-warning-50 text-warning-600',
        error:    'bg-error-50 text-error-600',
        jobs:     'bg-brand-100 text-brand-700',
        housing:  'bg-teal-100 text-teal-700',
        training: 'bg-accent-100 text-accent-600',
        funding:  'bg-purple-100 text-purple-700',
        community:'bg-success-50 text-success-600',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
export type { BadgeProps };
