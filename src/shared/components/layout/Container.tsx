import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'full';
}

const sizeMap = {
  sm:   'max-w-2xl',
  md:   'max-w-4xl',
  lg:   'max-w-6xl',
  full: 'max-w-none',
};

export function Container({ className, size = 'lg', children, ...props }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full px-4 sm:px-6', sizeMap[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}
