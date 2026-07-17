'use client';

import { useEffect, useMemo } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OpportunityPublishedModalProps {
  open: boolean;
  onClose: () => void;
  onCreateAnother: () => void;
  onViewOpportunity: () => void;
}

const CONFETTI_COLORS = [
  '#EF4444',
  '#F97316',
  '#EAB308',
  '#22C55E',
  '#2F66C8',
  '#A855F7',
  '#EC4899',
];

function ConfettiBurst() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        id: i,
        left: `${(i * 17) % 100}%`,
        top: `${(i * 23) % 100}%`,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: `${(i % 10) * 0.05}s`,
        size: 6 + (i % 5) * 2,
        rotate: (i * 37) % 360,
        shape: i % 3 === 0 ? 'circle' : i % 3 === 1 ? 'rect' : 'star',
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute animate-pulse opacity-90"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.shape === 'rect' ? p.size * 0.45 : p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '999px' : p.shape === 'rect' ? '2px' : '1px',
            transform: `rotate(${p.rotate}deg)`,
            animationDelay: p.delay,
            clipPath:
              p.shape === 'star'
                ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                : undefined,
          }}
        />
      ))}
    </div>
  );
}

export function OpportunityPublishedModal({
  open,
  onClose,
  onCreateAnother,
  onViewOpportunity,
}: OpportunityPublishedModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#0F172A]/60 p-0 backdrop-blur-[5px] sm:items-center sm:p-4">
      <ConfettiBurst />
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close dialog" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="opportunity-published-title"
        className={cn(
          'relative z-10 flex w-full flex-col overflow-hidden border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]',
          'rounded-t-[20px] sm:max-w-[720px] sm:rounded-[20px]',
        )}
      >
        <div className="flex items-center justify-end border-b border-[#EEF2F8] p-5 sm:p-[26px]">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A] hover:bg-[#F8FAFC]"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-5 px-5 py-10 sm:px-[26px]">
          <div className="relative flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#F1FFEE] sm:h-[160px] sm:w-[160px]">
            <div className="absolute inset-3 rounded-full border-2 border-[#BBF7D0]/70" />
            <div className="absolute inset-6 rounded-full border-2 border-[#BBF7D0]/50" />
            <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[#15803D] sm:h-[112px] sm:w-[112px]">
              <Check className="h-12 w-12 text-white sm:h-14 sm:w-14" strokeWidth={2.5} />
            </div>
          </div>

          <div className="w-full text-center">
            <h2
              id="opportunity-published-title"
              className="flex flex-wrap items-baseline justify-center gap-1.5 font-serif"
            >
              <span className="text-[24px] text-[#0F172A] sm:text-[28px]">🎉 Opportunity</span>
              <span className="text-[28px] italic text-[#2F66C8] sm:text-[36px]">Published!</span>
            </h2>
            <p className="mt-2.5 text-base text-[#44516A]">
              Your opportunity is now live and visible to applicants.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#EEF2F8] bg-[#F8FAFC] p-5 sm:flex-row sm:gap-5 sm:p-[26px]">
          <button
            type="button"
            onClick={onCreateAnother}
            className="flex h-[45px] flex-1 items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white px-5 text-sm font-medium text-[#44516A] hover:bg-white"
          >
            Create another opportunity
          </button>
          <button
            type="button"
            onClick={onViewOpportunity}
            className="flex h-[45px] flex-1 items-center justify-center rounded-[6px] bg-[#2F66C8] px-5 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] hover:bg-[#2454A4]"
          >
            View Opportunity
          </button>
        </div>
      </div>
    </div>
  );
}
