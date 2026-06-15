'use client';

import { useRef, useCallback } from 'react';

interface OtpInputProps {
  digits: string[];
  onChange: (digits: string[]) => void;
  length?: number;
  variant?: 'desktop' | 'mobile';
}

export function OtpInput({ digits, onChange, length = 6, variant = 'desktop' }: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = useCallback(
    (idx: number, value: string) => {
      const char = value.replace(/\D/g, '').slice(-1);
      const next = [...digits];
      next[idx] = char;
      onChange(next);
      if (char && idx < length - 1) {
        refs.current[idx + 1]?.focus();
      }
    },
    [digits, length, onChange],
  );

  const handleKeyDown = useCallback(
    (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
        refs.current[idx - 1]?.focus();
      }
    },
    [digits],
  );

  const inputClass =
    variant === 'desktop'
      ? 'size-[60px] shrink-0 rounded-[10px] border border-[#D9E1EF] bg-white text-center font-sans text-[16px] font-normal text-[#0F172A] outline-none transition focus:border-[#2F66C8] focus:ring-1 focus:ring-[#2F66C8]/20'
      : 'h-[50px] min-w-0 flex-1 rounded-[10px] border border-[#D9E1EF] bg-white text-center font-sans text-[16px] font-normal text-[#0F172A] outline-none transition focus:border-[#2F66C8] focus:ring-1 focus:ring-[#2F66C8]/20';

  const containerClass =
    variant === 'desktop'
      ? 'flex items-center justify-center gap-[10px]'
      : 'flex w-full items-center gap-[10px]';

  return (
    <div className={containerClass}>
      {digits.slice(0, length).map((d, i) => (
        <span key={i} className="contents">
          {i === 3 && (
            <span
              className={`shrink-0 text-[#D9E1EF] ${variant === 'desktop' ? 'w-5 text-center' : 'w-3 text-center'}`}
              aria-hidden
            >
              —
            </span>
          )}
          <input
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={inputClass}
            aria-label={`Digit ${i + 1}`}
          />
        </span>
      ))}
    </div>
  );
}
