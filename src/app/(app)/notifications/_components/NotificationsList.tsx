'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NotificationItem } from './notificationsData';
import { NotificationGroupCheckbox, NotificationRow } from './NotificationRow';
import { NotificationBulkBar } from './NotificationsHubModals';

const GROUPS = ['Today', 'Yesterday', 'Earlier'] as const;

interface NotificationsListProps {
  pageItems: NotificationItem[];
  filtered: NotificationItem[];
  selected: Set<string>;
  selectionMode: boolean;
  mobile?: boolean;
  actionsOpenId: string | null;
  rangeStart: number;
  rangeEnd: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onToggleSelect: (id: string) => void;
  onToggleGroupSelect: (items: NotificationItem[]) => void;
  onEnterSelection: () => void;
  onOpenDetail: (item: NotificationItem) => void;
  onMarkRead: (ids: string[]) => void;
  onArchive: (ids: string[]) => void;
  onDelete: (id: string) => void;
  onSetActionsOpenId: (id: string | null) => void;
  onBulkMarkRead: () => void;
  onBulkArchive: () => void;
  onBulkDelete: () => void;
  onClearSelection: () => void;
}

export function NotificationsList({
  pageItems,
  filtered,
  selected,
  selectionMode,
  mobile,
  actionsOpenId,
  rangeStart,
  rangeEnd,
  page,
  totalPages,
  onPageChange,
  onToggleSelect,
  onToggleGroupSelect,
  onEnterSelection,
  onOpenDetail,
  onMarkRead,
  onArchive,
  onDelete,
  onSetActionsOpenId,
  onBulkMarkRead,
  onBulkArchive,
  onBulkDelete,
  onClearSelection,
}: NotificationsListProps) {
  const grouped = GROUPS.map((group) => ({
    group,
    items: pageItems.filter((item) => item.group === group),
  })).filter((entry) => entry.items.length > 0);

  const showGroupCheckboxes = selectionMode || selected.size > 0;
  const showRowCheckboxes = mobile ? showGroupCheckboxes : true;

  return (
    <>
      <NotificationBulkBar
        mobile={mobile}
        count={selected.size}
        onMarkRead={onBulkMarkRead}
        onArchive={onBulkArchive}
        onDelete={onBulkDelete}
        onClearSelection={onClearSelection}
      />

      {grouped.map(({ group, items }) => {
        const allSelected = items.every((item) => selected.has(item.id));
        const someSelected = items.some((item) => selected.has(item.id));

        return (
          <div key={group} className="mb-2.5 last:mb-0">
            {showGroupCheckboxes ? (
              <NotificationGroupCheckbox
                label={group}
                checked={allSelected}
                indeterminate={someSelected && !allSelected}
                onToggle={() => {
                  onEnterSelection();
                  onToggleGroupSelect(items);
                }}
              />
            ) : (
              <p className="py-2.5 text-sm font-medium text-[#0F172A]">{group}</p>
            )}
            <div className="relative overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
              {items.map((item, index) => (
                <NotificationRow
                  key={item.id}
                  mobile={mobile}
                  showCheckbox={showRowCheckboxes}
                  disableSwipe={selected.size > 0}
                  title={item.title}
                  body={item.body}
                  time={item.time}
                  unread={item.unread}
                  icon={item.icon}
                  iconBg={item.iconBg}
                  iconColor={item.iconColor}
                  accentColor={item.accentColor}
                  selected={selected.has(item.id)}
                  onSelectToggle={() => onToggleSelect(item.id)}
                  onEnterSelection={onEnterSelection}
                  actionsOpen={actionsOpenId === item.id}
                  onOpenActions={() => onSetActionsOpenId(item.id)}
                  onCloseActions={() => onSetActionsOpenId(null)}
                  onClick={() => {
                    if (selectionMode || selected.size > 0) {
                      onEnterSelection();
                      onToggleSelect(item.id);
                      return;
                    }
                    if (item.detail) {
                      onOpenDetail(item);
                    }
                  }}
                  onMarkRead={() => onMarkRead([item.id])}
                  onArchive={() => onArchive([item.id])}
                  onDelete={() => onDelete(item.id)}
                  className={cn(index < items.length - 1 && 'border-b border-[#EEF2F8]')}
                />
              ))}
            </div>
          </div>
        );
      })}

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-[#8C97AD]">
          Showing {rangeStart} to {rangeEnd} of {filtered.length} notifications
        </p>
        <div className={cn('flex items-center', mobile ? 'gap-2.5' : 'gap-5')}>
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className={cn(
              'flex items-center justify-center rounded-[6px] border border-[#D9E1EF] bg-white disabled:opacity-40',
              mobile ? 'h-10 w-10' : 'h-12 w-12',
            )}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4 text-[#0F172A]" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              className={cn(
                'flex items-center justify-center rounded-[6px] font-medium',
                mobile ? 'h-10 min-w-[40px] px-4 text-sm' : 'h-12 min-w-[48px] px-6 text-base',
                pageNumber === page ? 'bg-[#2F66C8] text-white' : 'border border-[#D9E1EF] bg-white text-[#0F172A]',
              )}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className={cn(
              'flex items-center justify-center rounded-[6px] border border-[#D9E1EF] bg-white disabled:opacity-40',
              mobile ? 'h-10 w-10' : 'h-12 w-12',
            )}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4 text-[#0F172A]" />
          </button>
        </div>
      </div>
    </>
  );
}
