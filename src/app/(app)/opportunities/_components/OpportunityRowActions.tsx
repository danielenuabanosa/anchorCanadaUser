'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import {
  Archive,
  BarChart3,
  CalendarClock,
  Copy,
  Download,
  Ellipsis,
  Eye,
  Pause,
  Pencil,
  Trash2,
} from 'lucide-react';
import type { OpportunityRow } from './opportunitiesHubData';
import {
  ArchiveOpportunityModal,
  DeleteOpportunityModal,
  ExportOpportunitiesModal,
  ExtendDeadlineModal,
  PauseOpportunityModal,
} from './OpportunityHubModals';
import { providerApi } from '@/features/provider/services/providerApi';

interface OpportunityRowActionsProps {
  row: OpportunityRow;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
  onPause?: (id: string) => void;
  onExtendDeadline?: (id: string, date: string) => void;
  compact?: boolean;
}

const MENU_ITEMS: Array<{
  id: string;
  label: string;
  icon: typeof Eye;
  danger?: boolean;
}> = [
  { id: 'view', label: 'View Opportunity', icon: Eye },
  { id: 'edit', label: 'Edit Opportunity', icon: Pencil },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'duplicate', label: 'Duplicate Opportunity', icon: Copy },
  { id: 'pause', label: 'Pause Opportunity', icon: Pause },
  { id: 'extend', label: 'Extend Deadline', icon: CalendarClock },
  { id: 'download', label: 'Download Report', icon: Download },
  { id: 'archive', label: 'Archive Opportunity', icon: Archive },
  { id: 'delete', label: 'Delete Draft', icon: Trash2, danger: true },
];

const MENU_WIDTH = 240;

type HubModal = 'archive' | 'delete' | 'pause' | 'extend' | 'download' | null;

type MenuCoords = { top: number; left: number };

export function OpportunityRowActions({
  row,
  onDelete,
  onArchive,
  onPause,
  onExtendDeadline,
  compact = false,
}: OpportunityRowActionsProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<HubModal>(null);
  const [coords, setCoords] = useState<MenuCoords | null>(null);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!menuOpen) {
      setCoords(null);
      return;
    }

    function updatePosition() {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const menuHeight = menuRef.current?.offsetHeight ?? 420;
      const gap = 4;
      const spaceBelow = window.innerHeight - rect.bottom - gap;
      const openUp = spaceBelow < menuHeight && rect.top > spaceBelow;

      const top = openUp ? rect.top - menuHeight - gap : rect.bottom + gap;
      const left = Math.min(
        Math.max(8, rect.right - MENU_WIDTH),
        window.innerWidth - MENU_WIDTH - 8,
      );

      setCoords({ top, left });
    }

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(event: MouseEvent) {
      const target = event.target as Node;
      if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setMenuOpen(false);
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  function handleAction(id: string) {
    setMenuOpen(false);
    switch (id) {
      case 'view':
        router.push(`/opportunities/${row.id}`);
        break;
      case 'edit':
        router.push(`/opportunities/create/details?id=${encodeURIComponent(row.id)}`);
        break;
      case 'analytics':
        router.push('/analytics');
        break;
      case 'duplicate':
        void (async () => {
          try {
            const created = await providerApi.duplicateOpportunity(row.id);
            const newId = (created as { id?: string })?.id;
            if (newId) {
              router.push(`/opportunities/create/details?id=${encodeURIComponent(newId)}`);
            } else {
              router.push('/opportunities/create/category');
            }
          } catch (err) {
            console.error(err);
            router.push('/opportunities/create/category');
          }
        })();
        break;
      case 'pause':
        setModal('pause');
        break;
      case 'extend':
        setModal('extend');
        break;
      case 'download':
        setModal('download');
        break;
      case 'archive':
        setModal('archive');
        break;
      case 'delete':
        setModal('delete');
        break;
      default:
        break;
    }
  }

  function closeModal() {
    setModal(null);
  }

  const menu =
    mounted && menuOpen
      ? createPortal(
          <div
            ref={menuRef}
            style={
              coords
                ? { top: coords.top, left: coords.left, width: MENU_WIDTH }
                : { visibility: 'hidden', top: 0, left: 0, width: MENU_WIDTH }
            }
            className="fixed z-[200] overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white py-1 shadow-[0px_6px_16px_rgba(0,0,0,0.08)]"
          >
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const label =
                item.id === 'delete'
                  ? row.status === 'Draft'
                    ? 'Delete Draft'
                    : 'Delete Opportunity'
                  : item.label;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleAction(item.id)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-[14px] font-medium hover:bg-[#F8FAFC] ${
                    item.danger ? 'text-[#EF4444]' : 'text-[#0F172A]'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </button>
              );
            })}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className={`flex items-center justify-center rounded-[6px] border border-[#EEF2F8] text-[#44516A] hover:bg-[#F8FAFC] ${
            compact ? 'h-[30px] w-[30px]' : 'h-8 w-8'
          }`}
          aria-label={`Actions for ${row.name}`}
          aria-expanded={menuOpen}
        >
          <Ellipsis className="h-[18px] w-[18px]" />
        </button>
        {menu}
      </div>

      <ArchiveOpportunityModal
        open={modal === 'archive'}
        opportunity={row}
        onClose={closeModal}
        onConfirm={() => onArchive?.(row.id)}
      />
      <DeleteOpportunityModal
        open={modal === 'delete'}
        opportunity={row}
        onClose={closeModal}
        onConfirm={() => onDelete?.(row.id)}
      />
      <PauseOpportunityModal
        open={modal === 'pause'}
        opportunity={row}
        onClose={closeModal}
        onConfirm={() => onPause?.(row.id)}
      />
      <ExtendDeadlineModal
        open={modal === 'extend'}
        opportunity={row}
        onClose={closeModal}
        onConfirm={({ date }) => onExtendDeadline?.(row.id, date)}
      />
      <ExportOpportunitiesModal
        open={modal === 'download'}
        onClose={closeModal}
        rows={[row]}
        title="Download Report"
        filename={`${row.name.toLowerCase().replace(/\s+/g, '-')}-report`}
      />
    </>
  );
}
