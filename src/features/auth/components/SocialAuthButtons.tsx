'use client';

import Image from 'next/image';

import googleIcon from '@assets/icons/google.png';
import { cn } from '@/lib/utils';

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function MicrosoftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path fill="#F25022" d="M3 3h8v8H3z" />
      <path fill="#7FBA00" d="M13 3h8v8h-8z" />
      <path fill="#00A4EF" d="M3 13h8v8H3z" />
      <path fill="#FFB900" d="M13 13h8v8h-8z" />
    </svg>
  );
}

interface SocialAuthButtonsProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
}

export function SocialAuthButtons({ variant = 'desktop', className }: SocialAuthButtonsProps) {
  const providers = [
    { label: 'Google', icon: <Image src={googleIcon} alt="" width={24} height={24} className="size-6 shrink-0" /> },
    { label: 'Apple', icon: <AppleIcon className="h-6 w-5 text-[#0f172a]" /> },
    { label: 'Microsoft', icon: <MicrosoftIcon className="h-6 w-6" /> },
  ];

  return (
    <div className={cn('flex flex-col gap-5', className)}>
      <div className="flex items-center gap-5">
        <div className="h-px flex-1 bg-[#d9e1ef]" />
        <span className={cn('whitespace-nowrap text-[#44516a]', variant === 'mobile' ? 'text-sm' : 'text-base')}>
          Or continue with
        </span>
        <div className="h-px flex-1 bg-[#d9e1ef]" />
      </div>
      <div className="flex gap-5">
        {providers.map((provider) => (
          <button
            key={provider.label}
            type="button"
            className={cn(
              'flex flex-1 cursor-pointer items-center justify-center rounded-[6px] border border-[#d9e1ef] bg-white transition-colors hover:bg-[#f8fafc]',
              variant === 'mobile' ? 'px-6 py-4' : 'gap-5 px-6 py-4',
            )}
          >
            {provider.icon}
            {variant === 'desktop' && (
              <span className="text-base font-medium text-[#0f172a]">{provider.label}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
