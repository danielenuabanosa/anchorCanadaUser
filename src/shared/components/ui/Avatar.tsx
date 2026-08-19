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

function isRenderableImageUrl(src?: string) {
  if (!src) return false;
  if (src.startsWith('data:image/')) return true;
  if (src.startsWith('blob:')) return true;
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) return true;
  const path = src.split('?')[0]?.toLowerCase() ?? '';
  return /\.(avif|gif|jpe?g|png|svg|webp)$/.test(path);
}

interface AvatarProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
}

function Avatar({ className, size = 'md', src, alt = '', fallback, ...props }: AvatarProps) {
  const px = sizeMap[size ?? 'md'] ?? 40;
  const imageSrc = isRenderableImageUrl(src) ? src : undefined;
  const remote = Boolean(imageSrc && /^https?:\/\//.test(imageSrc));

  return (
    <div className={cn(avatarVariants({ size }), className)} {...props}>
      {imageSrc ? (
        remote ? (
          // User-uploaded org logos (Supabase) must not depend on next/image remotePatterns.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageSrc} alt={alt} width={px} height={px} className="h-full w-full object-cover" />
        ) : (
          <Image
            src={imageSrc}
            alt={alt}
            width={px}
            height={px}
            className="h-full w-full object-cover"
          />
        )
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
