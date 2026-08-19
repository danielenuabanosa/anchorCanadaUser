'use client';

import { useRef, useEffect, useCallback } from 'react';

interface OtpInputProps {
  digits: string[];
  onChange: (digits: string[]) => void;
  length?: number;
  variant?: 'desktop' | 'mobile';
}

export function OtpInput({ digits, onChange, length = 6, variant = 'desktop' }: OtpInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const code = digits.join('').slice(0, length);
  const activeIndex = Math.min(code.length, length - 1);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const syncCode = useCallback(
    (raw: string) => {
      const chars = raw.replace(/\D/g, '').slice(0, length);
      const next = Array.from({ length }, (_, i) => chars[i] ?? '');
      onChange(next);
    },
    [length, onChange],
  );

  const boxClass =
    variant === 'desktop'
      ? 'flex size-[60px] shrink-0 items-center justify-center rounded-[10px] border bg-white font-sans text-[16px] font-normal text-[#0F172A] transition'
      : 'flex h-[50px] min-w-0 flex-1 items-center justify-center rounded-[10px] border bg-white font-sans text-[16px] font-normal text-[#0F172A] transition';

  const containerClass =
    variant === 'desktop'
      ? 'flex items-center justify-center gap-[10px]'
      : 'flex w-full items-center gap-[10px]';

  return (
    <div
      className={`relative ${containerClass}`}
      onClick={() => inputRef.current?.focus()}
      onKeyDown={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="one-time-code"
        autoFocus
        value={code}
        onChange={(e) => syncCode(e.target.value)}
        className="absolute inset-0 z-10 h-full w-full cursor-text opacity-0"
        aria-label="Enter 6-digit verification code"
      />

      {Array.from({ length }).map((_, i) => (
        <span key={i} className="contents">
          {i === 3 && (
            <span
              className={`shrink-0 text-[#D9E1EF] ${variant === 'desktop' ? 'w-5 text-center' : 'w-3 text-center'}`}
              aria-hidden
            >
              —
            </span>
          )}
          <div
            className={`${boxClass} ${
              i === activeIndex
                ? 'border-[#2F66C8]'
                : digits[i]
                  ? 'border-[#2F66C8]/40'
                  : 'border-[#D9E1EF]'
            }`}
            aria-hidden
          >
            {digits[i] ?? ''}
          </div>
        </span>
      ))}
    </div>
  );
}
