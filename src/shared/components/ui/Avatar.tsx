import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import type { HTMLAttributes } from 'react';

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full bg-brand-100',
  {
    variants: {
      size: {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

const sizeMap: Record<string, number> = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };

interface AvatarProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
}

function Avatar({ className, size = 'md', src, alt = '', fallback, ...props }: AvatarProps) {
  const px = sizeMap[size ?? 'md'] ?? 40;

  return (
    <div className={cn(avatarVariants({ size }), className)} {...props}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={px}
          height={px}
          className="h-full w-full object-cover"
        />
      ) : (
        <span
          aria-label={alt || fallback}
          className="flex h-full w-full items-center justify-center text-xs font-semibold text-brand-700 select-none"
        >
          {fallback?.slice(0, 2).toUpperCase() ?? '?'}
        </span>
      )}
    </div>
  );
}

export { Avatar };
export type { AvatarProps };
