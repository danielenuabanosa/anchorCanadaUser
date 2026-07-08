'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HelpCloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A] transition hover:bg-[#F8FAFC]"
      aria-label="Close"
    >
      <X className="h-6 w-6" strokeWidth={1.75} />
    </button>
  );
}

/** Figma: mobile = centered 400px card; desktop drawer = right full-height rounded panel */
export function HelpModalBackdrop({
  onClose,
  children,
  drawer = false,
  zIndex = 50,
}: {
  onClose: () => void;
  children: React.ReactNode;
  drawer?: boolean;
  zIndex?: 50 | 60;
}) {
  return (
    <div
      className={cn(
        'fixed inset-0 flex bg-[rgba(15,23,42,0.6)] backdrop-blur-[5px]',
        zIndex === 60 ? 'z-[60]' : 'z-50',
        drawer
          ? 'items-center justify-center p-5 md:items-stretch md:justify-end md:p-2.5'
          : 'items-center justify-center p-5',
      )}
    >
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close" />
      <div className={cn('relative', drawer && 'md:h-full')} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export function HelpModalPanel({
  width,
  drawer = false,
  className,
  children,
}: {
  width: 'lg' | 'md';
  drawer?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const desktopWidth = width === 'lg' ? 'md:w-[840px]' : 'md:w-[720px]';

  return (
    <div
      className={cn(
        'flex w-[min(400px,calc(100vw-40px))] flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]',
        drawer
          ? cn('max-h-[85vh] md:h-full md:max-h-none', desktopWidth)
          : cn('max-h-[85vh]', desktopWidth),
        className,
      )}
    >
      {children}
    </div>
  );
}

export function HelpModalHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-[#EEF2F8] p-[26px]">
      <p className="text-[18px] font-medium text-[#0F172A]">{title}</p>
      <HelpCloseButton onClose={onClose} />
    </div>
  );
}

export function HelpModalFooter({
  children,
  align = 'between',
}: {
  children: React.ReactNode;
  align?: 'between' | 'end';
}) {
  return (
    <div
      className={cn(
        'flex shrink-0 border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]',
        align === 'between' ? 'items-center justify-between' : 'items-center justify-end gap-5',
      )}
    >
      {children}
    </div>
  );
}

/** Success / confirmation — always centered (Figma 642:19022 desktop, 642:19063 mobile) */
export function HelpCenteredShell({
  onClose,
  children,
  footer,
  zIndex = 60,
}: {
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  zIndex?: 50 | 60;
}) {
  return (
    <HelpModalBackdrop onClose={onClose} zIndex={zIndex}>
      <HelpModalPanel width="md">
        <div className="flex shrink-0 justify-end p-[26px] pb-0">
          <HelpCloseButton onClose={onClose} />
        </div>
        <div className="overflow-y-auto px-[26px] pb-[26px] pt-4">{children}</div>
        {footer ? (
          <div className="shrink-0 border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">{footer}</div>
        ) : null}
      </HelpModalPanel>
    </HelpModalBackdrop>
  );
}
