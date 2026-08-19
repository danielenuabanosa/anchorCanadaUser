'use client';

import { cn } from '@/lib/utils';
import { ListPagination } from '@/shared/components/ui/ListPagination';
import { useRouter } from 'next/navigation';
import type { NotificationItem } from './notificationsData';
import { NotificationGroupCheckbox, NotificationRow } from './NotificationRow';
import { NotificationBulkBar } from './NotificationsHubModals';

const GROUPS = ['Today', 'Yesterday', 'Earlier'] as const;

interface NotificationsListProps {
  pageItems: NotificationItem[];
  selected: Set<string>;
  selectionMode: boolean;
  mobile?: boolean;
  actionsOpenId: string | null;
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
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
  selected,
  selectionMode,
  mobile,
  actionsOpenId,
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
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
  const router = useRouter();
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
                    if (item.link) {
                      onMarkRead([item.id]);
                      if (item.link.startsWith('http')) window.open(item.link, '_blank', 'noopener,noreferrer');
                      else router.push(item.link);
                      return;
                    }
                    onOpenDetail(item);
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

      {grouped.length === 0 ? (
        <div className="rounded-[10px] border border-[#EEF2F8] bg-white px-4 py-10 text-center text-sm text-[#44516A]">
          No notifications yet.
        </div>
      ) : null}

      <ListPagination
        compact={mobile}
        className="mt-5 border-t-0 px-0"
        page={page}
        pageSize={pageSize}
        total={total}
        noun="notifications"
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </>
  );
}
