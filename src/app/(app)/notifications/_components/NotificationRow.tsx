'use client';

import { useCallback, useEffect, useRef, useState, type ElementType } from 'react';
import { Archive, Check, CircleCheckBig, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const DESKTOP_ACTION_WIDTH = 240;
const MOBILE_ACTION_WIDTH = 256;
const OPEN_THRESHOLD = 72;
const DRAG_CLICK_THRESHOLD = 10;

interface NotificationRowProps {
  title: string;
  body: string;
  time: string;
  unread?: boolean;
  icon: ElementType;
  iconBg: string;
  iconColor: string;
  accentColor: string;
  className?: string;
  mobile?: boolean;
  showCheckbox?: boolean;
  disableSwipe?: boolean;
  selected?: boolean;
  onSelectToggle?: () => void;
  onEnterSelection?: () => void;
  actionsOpen?: boolean;
  onOpenActions?: () => void;
  onCloseActions?: () => void;
  onClick?: () => void;
  onMarkRead?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
}

export function NotificationRow({
  title,
  body,
  time,
  unread,
  icon: Icon,
  iconBg,
  iconColor,
  accentColor,
  className,
  mobile,
  showCheckbox = true,
  disableSwipe,
  selected,
  onSelectToggle,
  onEnterSelection,
  actionsOpen = false,
  onOpenActions,
  onCloseActions,
  onClick,
  onMarkRead,
  onArchive,
  onDelete,
}: NotificationRowProps) {
  const actionWidth = mobile ? MOBILE_ACTION_WIDTH : DESKTOP_ACTION_WIDTH;
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [offset, setOffset] = useState(actionsOpen ? actionWidth : 0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const dragMoved = useRef(false);
  const isDraggingRef = useRef(false);
  const offsetRef = useRef(offset);
  const disableSwipeRef = useRef(disableSwipe);

  useEffect(() => {
    offsetRef.current = offset;
    disableSwipeRef.current = disableSwipe;
  }, [offset, disableSwipe]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const update = () => setViewportWidth(el.offsetWidth);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isDraggingRef.current) {
      setOffset(actionsOpen ? actionWidth : 0);
    }
  }, [actionsOpen, actionWidth]);

  const snapOpen = useCallback(
    (open: boolean) => {
      const next = open ? actionWidth : 0;
      setOffset(next);
      offsetRef.current = next;
      if (open) onOpenActions?.();
      else onCloseActions?.();
    },
    [actionWidth, onOpenActions, onCloseActions],
  );

  const finishDrag = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);

    if (dragMoved.current) {
      const open = offsetRef.current > OPEN_THRESHOLD;
      snapOpen(open);
      return;
    }

    if (offsetRef.current > 0) {
      snapOpen(false);
      return;
    }

    onClick?.();
  }, [onClick, snapOpen]);

  const beginDrag = useCallback((clientX: number) => {
    dragMoved.current = false;
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartX.current = clientX;
    dragStartOffset.current = offsetRef.current;
  }, []);

  const updateDrag = useCallback(
    (clientX: number) => {
      if (!isDraggingRef.current) return;

      const delta = dragStartX.current - clientX;
      if (Math.abs(delta) > DRAG_CLICK_THRESHOLD) {
        dragMoved.current = true;
      }

      const next = Math.max(0, Math.min(actionWidth, dragStartOffset.current + delta));
      offsetRef.current = next;
      setOffset(next);
    },
    [actionWidth],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onTouchStart(e: TouchEvent) {
      if (disableSwipeRef.current) return;
      if ((e.target as HTMLElement).closest('[data-notification-checkbox]')) return;
      if (e.touches.length !== 1) return;
      beginDrag(e.touches[0].clientX);
    }

    function onTouchMove(e: TouchEvent) {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      updateDrag(e.touches[0].clientX);
      if (dragMoved.current) {
        e.preventDefault();
      }
    }

    function onTouchEnd() {
      if (!isDraggingRef.current) return;
      finishDrag();
    }

    track.addEventListener('touchstart', onTouchStart, { passive: true });
    track.addEventListener('touchmove', onTouchMove, { passive: false });
    track.addEventListener('touchend', onTouchEnd);
    track.addEventListener('touchcancel', onTouchEnd);

    return () => {
      track.removeEventListener('touchstart', onTouchStart);
      track.removeEventListener('touchmove', onTouchMove);
      track.removeEventListener('touchend', onTouchEnd);
      track.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [beginDrag, finishDrag, updateDrag]);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (disableSwipe || event.pointerType === 'touch') return;
    if ((event.target as HTMLElement).closest('[data-notification-checkbox]')) return;
    beginDrag(event.clientX);
    trackRef.current?.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch' || !isDraggingRef.current) return;
    updateDrag(event.clientX);
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch' || !isDraggingRef.current) return;
    if (trackRef.current?.hasPointerCapture(event.pointerId)) {
      trackRef.current.releasePointerCapture(event.pointerId);
    }
    finishDrag();
  }

  function handleCheckboxClick(event: React.MouseEvent) {
    event.stopPropagation();
    onEnterSelection?.();
    onSelectToggle?.();
  }

  const cardContent = (
    <div className="flex w-full items-center justify-end gap-5">
      <div className="flex min-w-0 flex-1 items-center gap-[26px]">
        <span
          className={cn(
            'flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[10px] p-[18px]',
            iconBg,
          )}
        >
          <Icon className={cn('h-6 w-6', iconColor)} strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2">
            <p className="truncate text-sm font-medium text-[#0F172A]">{title}</p>
            <p className="truncate text-xs text-[#44516A]">{body}</p>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-5">
        <p className="whitespace-nowrap text-right text-xs text-[#8C97AD]">{time}</p>
        {unread ? (
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#2F66C8]" aria-label="Unread" />
        ) : (
          <span className="h-2.5 w-2.5 shrink-0" aria-hidden />
        )}
        {showCheckbox ? (
          <button
            type="button"
            data-notification-checkbox
            onPointerDown={(event) => event.stopPropagation()}
            onTouchStart={(event) => event.stopPropagation()}
            onClick={handleCheckboxClick}
            aria-pressed={selected}
            aria-label={selected ? 'Deselect notification' : 'Select notification'}
            className={cn(
              'flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border',
              selected ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-[#D9E1EF] bg-[#EEF2F8]',
            )}
          >
            {selected ? <Check className="h-3 w-3 text-white" strokeWidth={3} /> : null}
          </button>
        ) : null}
      </div>
    </div>
  );

  const actionButtons = (
    <>
      <button
        type="button"
        onClick={() => {
          onMarkRead?.();
          snapOpen(false);
        }}
        className={cn(
          'flex shrink-0 flex-col items-center justify-center gap-2 bg-[#EEF2F8] p-5',
          mobile ? 'h-[100px] flex-1' : 'h-full w-20',
        )}
      >
        <CircleCheckBig className="h-6 w-6 text-[#44516A]" strokeWidth={1.75} />
        <span className="whitespace-nowrap text-xs text-[#44516A]">Mark Read</span>
      </button>
      <button
        type="button"
        onClick={() => {
          onArchive?.();
          snapOpen(false);
        }}
        className={cn(
          'flex shrink-0 flex-col items-center justify-center gap-2 bg-[#F59E0B] p-5',
          mobile ? 'h-[100px] flex-1' : 'h-full w-20',
        )}
      >
        <Archive className="h-6 w-6 text-white" strokeWidth={1.75} />
        <span className="whitespace-nowrap text-xs text-white">Archive</span>
      </button>
      <button
        type="button"
        onClick={() => {
          onDelete?.();
          snapOpen(false);
        }}
        className={cn(
          'flex shrink-0 flex-col items-center justify-center gap-2 bg-[#EF4444] p-5',
          mobile ? 'h-[100px] flex-1' : 'h-full w-20',
        )}
      >
        <Trash2 className="h-6 w-6 text-white" strokeWidth={1.75} />
        <span className="whitespace-nowrap text-xs text-white">Delete</span>
      </button>
    </>
  );

  if (mobile) {
    return (
      <div className={cn('relative bg-white', className)}>
        <div
          className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-px"
          style={{ backgroundColor: accentColor }}
          aria-hidden
        />
        <div ref={viewportRef} className="relative h-[100px] w-full overflow-hidden">
          <div
            ref={trackRef}
            className={cn(
              'absolute left-0 top-0 flex h-[100px]',
              !isDragging && 'transition-transform duration-200 ease-out',
            )}
            style={{
              transform: `translateX(-${offset}px)`,
              width: viewportWidth > 0 ? viewportWidth + actionWidth : '100%',
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div
              className="flex h-[100px] shrink-0 items-center bg-white p-5"
              style={{ width: viewportWidth > 0 ? viewportWidth : '100%' }}
            >
              {cardContent}
            </div>
            <div className="flex h-[100px] w-[256px] shrink-0 items-stretch">{actionButtons}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden bg-white', className)}>
      <div
        className="pointer-events-none absolute bottom-0 left-0 top-0 w-px"
        style={{ backgroundColor: accentColor }}
        aria-hidden
      />

      <div className="absolute inset-y-0 right-0 flex h-full">{actionButtons}</div>

      <div
        ref={trackRef}
        className={cn(
          'relative flex select-none touch-none items-center bg-white p-5',
          !isDragging && 'transition-transform duration-200 ease-out',
        )}
        style={{ transform: `translateX(-${offset}px)` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {cardContent}
      </div>
    </div>
  );
}

export function NotificationGroupCheckbox({
  checked,
  indeterminate,
  onToggle,
  label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button type="button" onClick={onToggle} className="flex w-full items-center gap-3.5 py-2.5 text-left">
      <span
        className={cn(
          'flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border',
          checked || indeterminate ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-[#D9E1EF] bg-[#EEF2F8]',
        )}
      >
        {checked ? <Check className="h-3 w-3 text-white" strokeWidth={3} /> : null}
        {!checked && indeterminate ? <span className="h-0.5 w-2.5 rounded bg-white" /> : null}
      </span>
      <span className="flex-1 text-sm font-medium text-[#0F172A]">{label}</span>
    </button>
  );
}
