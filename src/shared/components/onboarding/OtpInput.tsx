'use client';

import { useRef, useCallback } from 'react';

interface OtpInputProps {
  digits: string[];
  onChange: (digits: string[]) => void;
  length?: number;
}

export function OtpInput({ digits, onChange, length = 6 }: OtpInputProps) {
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

  return (
    <div className="flex items-center justify-center gap-2 md:gap-3">
      {digits.slice(0, length).map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="h-11 w-10 rounded-lg border border-[#D9E1EF] bg-[#F8FAFC] text-center text-lg font-semibold text-[#0F172A] outline-none transition focus:border-[#2F66C8] focus:ring-1 focus:ring-[#2F66C8]/20 md:h-12 md:w-11"
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  );
}
