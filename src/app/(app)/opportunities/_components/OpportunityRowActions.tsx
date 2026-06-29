'use client';

import { useEffect, useRef, useState } from 'react';
import { Copy, Ellipsis, Eye, Pencil, Trash2 } from 'lucide-react';
import { BuilderDeleteModal } from '@/features/opportunity-builder/components/BuilderDeleteModal';
import type { OpportunityRow } from './opportunitiesHubData';

interface OpportunityRowActionsProps {
  row: OpportunityRow;
  onDelete?: (id: string) => void;
  compact?: boolean;
}

const MENU_ITEMS: Array<{
  id: string;
  label: string;
  icon: typeof Eye;
  danger?: boolean;
}> = [
  { id: 'view', label: 'View Details', icon: Eye },
  { id: 'edit', label: 'Edit Opportunity', icon: Pencil },
  { id: 'duplicate', label: 'Duplicate', icon: Copy },
  { id: 'delete', label: 'Delete Draft', icon: Trash2, danger: true },
];

export function OpportunityRowActions({ row, onDelete, compact = false }: OpportunityRowActionsProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  const showDelete = row.status === 'Draft';

  return (
    <>
      <div ref={menuRef} className="relative">
        <button
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

        {menuOpen ? (
          <div className="absolute right-0 top-full z-50 mt-1 w-[220px] overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white py-1 shadow-[0px_6px_16px_rgba(0,0,0,0.08)]">
            {MENU_ITEMS.filter((item) => item.id !== 'delete' || showDelete).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    if (item.id === 'delete') setDeleteOpen(true);
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-[14px] font-medium hover:bg-[#F8FAFC] ${
                    item.danger ? 'text-[#EF4444]' : 'text-[#0F172A]'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <BuilderDeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => onDelete?.(row.id)}
        accentWord="Draft"
        descriptionLines={[
          'This will permanently remove this draft opportunity and all unsaved builder progress.',
          'This action cannot be undone.',
        ]}
        itemTitle={row.name}
        itemSubtitle={row.category}
        itemBadge="Draft"
        createdLabel="Recently edited"
        confirmLabel="Delete Draft"
      />
    </>
  );
}
