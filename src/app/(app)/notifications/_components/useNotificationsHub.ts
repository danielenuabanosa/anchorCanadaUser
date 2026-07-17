'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  DEFAULT_NOTIFICATION_FILTERS,
  NOTIFICATIONS,
  PAGE_SIZE,
  filterNotifications,
  type NotificationFilters,
  type NotificationItem,
  type NotificationSort,
  type NotificationTab,
} from './notificationsData';

export function useNotificationsHub() {
  const [items, setItems] = useState<NotificationItem[]>(NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<NotificationTab>('all');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<NotificationSort>('newest');
  const [filters, setFilters] = useState<NotificationFilters>(DEFAULT_NOTIFICATION_FILTERS);
  const [filterOpen, setFilterOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [detailTargetId, setDetailTargetId] = useState<string | null>(null);
  const [actionsOpenId, setActionsOpenId] = useState<string | null>(null);
  const [selectionMode, setSelectionMode] = useState(false);

  const filtered = useMemo(
    () => filterNotifications(items, activeTab, filters, sort),
    [items, activeTab, filters, sort],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const rangeStart = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(safePage * PAGE_SIZE, filtered.length);

  const deleteTarget = items.find((item) => item.id === deleteTargetId) ?? null;
  const detailTarget = items.find((item) => item.id === detailTargetId) ?? null;

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      if (next.size === 0) setSelectionMode(false);
      else setSelectionMode(true);
      return next;
    });
  }, []);

  function toggleGroupSelect(groupItems: NotificationItem[]) {
    const allSelected = groupItems.every((item) => selected.has(item.id));
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        groupItems.forEach((item) => next.delete(item.id));
      } else {
        groupItems.forEach((item) => next.add(item.id));
      }
      if (next.size === 0) setSelectionMode(false);
      else setSelectionMode(true);
      return next;
    });
  }

  const clearSelection = useCallback(() => {
    setSelected(new Set());
    setSelectionMode(false);
  }, []);

  function enterSelectionMode() {
    setSelectionMode(true);
    setActionsOpenId(null);
  }

  function markRead(ids: string[]) {
    setItems((prev) =>
      prev.map((item) => (ids.includes(item.id) ? { ...item, unread: false } : item)),
    );
  }

  function markAllRead() {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })));
  }

  function archive(ids: string[]) {
    setItems((prev) => prev.filter((item) => !ids.includes(item.id)));
    clearSelection();
    setActionsOpenId(null);
  }

  function confirmDelete() {
    if (!deleteTargetId) return;
    setItems((prev) => prev.filter((item) => item.id !== deleteTargetId));
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(deleteTargetId);
      return next;
    });
    setDeleteTargetId(null);
    setActionsOpenId(null);
  }

  function deleteSelected() {
    if (selected.size === 0) return;
    const first = [...selected][0];
    setDeleteTargetId(first);
  }

  function handleBulkMarkRead() {
    markRead([...selected]);
    clearSelection();
  }

  function handleBulkArchive() {
    archive([...selected]);
  }

  function openDetail(item: NotificationItem) {
    if (item.detail) {
      setDetailTargetId(item.id);
    }
  }

  return {
    items,
    activeTab,
    setActiveTab,
    selected,
    selectionMode,
    enterSelectionMode,
    page: safePage,
    setPage,
    sort,
    setSort,
    filters,
    setFilters,
    filterOpen,
    setFilterOpen,
    deleteTarget,
    deleteTargetId,
    setDeleteTargetId,
    detailTarget,
    detailTargetId,
    setDetailTargetId,
    actionsOpenId,
    setActionsOpenId,
    filtered,
    pageItems,
    totalPages,
    rangeStart,
    rangeEnd,
    toggleSelect,
    toggleGroupSelect,
    clearSelection,
    markRead,
    markAllRead,
    archive,
    confirmDelete,
    deleteSelected,
    handleBulkMarkRead,
    handleBulkArchive,
    openDetail,
  };
}
