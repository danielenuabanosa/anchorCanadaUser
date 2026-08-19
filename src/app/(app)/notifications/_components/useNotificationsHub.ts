'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BadgeCheck,
  FileUser,
  ShieldAlert,
  ShieldUser,
  Users,
} from 'lucide-react';
import { usePagination } from '@/lib/pagination';
import { providerApi } from '@/features/provider/services/providerApi';
import { isStaticMode } from '@/lib/staticMode';
import {
  DEFAULT_NOTIFICATION_FILTERS,
  NOTIFICATION_SUMMARY,
  NOTIFICATION_TABS,
  filterNotifications,
  type NotificationFilters,
  type NotificationItem,
  type NotificationSort,
  type NotificationTab,
} from './notificationsData';

function mapApiNotification(raw: {
  id: string;
  category?: string;
  title: string;
  body?: string;
  link?: string | null;
  read?: boolean;
  createdAt?: string;
  metadata?: Record<string, unknown>;
}): NotificationItem {
  const created = raw.createdAt ? new Date(raw.createdAt) : new Date();
  const hours = (Date.now() - created.getTime()) / 3600000;
  const group: NotificationItem['group'] =
    hours < 24 ? 'Today' : hours < 48 ? 'Yesterday' : 'Earlier';
  const category = raw.category ?? 'system';
  const tab = (
    ['applications', 'team', 'opportunities', 'system', 'security'].includes(category)
      ? category
      : 'system'
  ) as Exclude<NotificationTab, 'all'>;

  const meta =
    tab === 'applications'
      ? { icon: FileUser, iconBg: 'bg-[#E0F4EA]', iconColor: 'text-[#15803D]', accentColor: '#A2EBDB' }
      : tab === 'team'
        ? { icon: Users, iconBg: 'bg-[#FFFBEB]', iconColor: 'text-[#C2410C]', accentColor: '#FADCAA' }
        : tab === 'opportunities'
          ? { icon: BadgeCheck, iconBg: 'bg-[#FEF2E7]', iconColor: 'text-[#D97706]', accentColor: '#FADCAA' }
          : tab === 'security'
            ? { icon: ShieldUser, iconBg: 'bg-[#FEF2F2]', iconColor: 'text-[#B91C1C]', accentColor: '#FEE2E2' }
            : { icon: ShieldAlert, iconBg: 'bg-[#E0F4EA]', iconColor: 'text-[#15803D]', accentColor: '#A2EBDB' };

  return {
    id: raw.id,
    title: raw.title,
    body: raw.body ?? '',
    time: created.toLocaleString('en-CA', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }),
    group,
    tab,
    unread: !raw.read,
    icon: meta.icon,
    iconBg: meta.iconBg,
    iconColor: meta.iconColor,
    accentColor: meta.accentColor,
    link: raw.link ?? null,
  };
}

export function useNotificationsHub() {
  type ApiNotification = {
    id: string;
    category?: string;
    title: string;
    body?: string;
    link?: string | null;
    read?: boolean;
    createdAt?: string;
    metadata?: Record<string, unknown>;
  };

  const [items, setItems] = useState<NotificationItem[]>([]);
  const [activeTab, setActiveTab] = useState<NotificationTab>('all');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<NotificationSort>('newest');
  const [filters, setFilters] = useState<NotificationFilters>(DEFAULT_NOTIFICATION_FILTERS);
  const [filterOpen, setFilterOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [detailTargetId, setDetailTargetId] = useState<string | null>(null);
  const [actionsOpenId, setActionsOpenId] = useState<string | null>(null);
  const [selectionMode, setSelectionMode] = useState(false);

  const [cards, setCards] = useState(NOTIFICATION_SUMMARY);
  const [tabs, setTabs] = useState(NOTIFICATION_TABS);
  const [recentActivity, setRecentActivity] = useState<
    Array<{
      id: string;
      category: string;
      label: string;
      subtitle: string;
      time: string;
      createdAt?: string;
      link?: string | null;
    }>
  >([]);

  useEffect(() => {
    if (isStaticMode()) return;
    // 1) Summary cards / tab counts / recent activity
    void (async () => {
      try {
        const summary = await providerApi.getNotificationSummary();
        setCards((prev) =>
          prev.map((c) => {
            if (c.label === 'Unread') return { ...c, value: summary.cards.unread };
            if (c.label === 'Team Alerts') return { ...c, value: summary.cards.teamAlerts };
            if (c.label === 'Opportunity Alerts') return { ...c, value: summary.cards.opportunityAlerts };
            if (c.label === 'Applications') return { ...c, value: summary.cards.applications };
            if (c.label === 'System Alerts') return { ...c, value: summary.cards.systemAlerts };
            return c;
          }),
        );

        setTabs((prev) =>
          prev.map((t) => {
            if (t.id === 'all') return { ...t, count: summary.tabs.all };
            if (t.id === 'applications') return { ...t, count: summary.tabs.applications };
            if (t.id === 'team') return { ...t, count: summary.tabs.team };
            if (t.id === 'opportunities') return { ...t, count: summary.tabs.opportunities };
            if (t.id === 'system') return { ...t, count: summary.tabs.system };
            if (t.id === 'security') return { ...t, count: summary.tabs.security };
            return t;
          }),
        );
      } catch {
        // keep default static values
      }

      try {
        const recent = await providerApi.getRecentNotifications();
        setRecentActivity(recent.data ?? []);
      } catch {
        setRecentActivity([]);
      }
    })();
  }, []);

  useEffect(() => {
    if (isStaticMode()) return;

    const typeToCategory: Record<string, Exclude<NotificationTab, 'all'> | 'all'> = {
      'All types': 'all',
      Applications: 'applications',
      Team: 'team',
      Opportunities: 'opportunities',
      System: 'system',
      Security: 'security',
    };

    const typeCategory = typeToCategory[filters.type] ?? 'all';
    const activeCategory = activeTab;

    // If both are narrowed and mismatch, result is empty.
    if (activeCategory !== 'all' && typeCategory !== 'all' && activeCategory !== typeCategory) {
      setItems([]);
      return;
    }

    const finalCategory = activeCategory !== 'all' ? activeCategory : typeCategory;
    const status = filters.status;

    void (async () => {
      try {
        const res = (await providerApi.listNotifications({
          category: finalCategory === 'all' ? undefined : finalCategory,
          status,
          dateRange: filters.dateRange,
          sort,
        })) as { data?: ApiNotification[] };

        setItems((res.data ?? []).map(mapApiNotification));
      } catch {
        setItems([]);
      }
    })();
  }, [activeTab, filters, sort]);

  const filtered = useMemo(
    () => filterNotifications(items, activeTab, filters, sort),
    [items, activeTab, filters, sort],
  );

  const {
    page,
    pageSize,
    total,
    pageItems,
    goToPage,
    changePageSize,
    setPage,
  } = usePagination(filtered, 5);

  useEffect(() => {
    setPage(1);
  }, [activeTab, filters, sort, setPage]);

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
    ids.forEach((id) => {
      void providerApi.markNotificationRead(id).catch(console.error);
    });
  }

  function markAllRead() {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })));
    void providerApi.markAllNotificationsRead().catch(console.error);
  }

  function archive(ids: string[]) {
    setItems((prev) => prev.filter((item) => !ids.includes(item.id)));
    clearSelection();
    setActionsOpenId(null);
    void providerApi.deleteNotifications(ids).catch(console.error);
  }

  function confirmDelete() {
    if (!deleteTargetId) return;
    const id = deleteTargetId;
    setItems((prev) => prev.filter((item) => item.id !== id));
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setDeleteTargetId(null);
    setActionsOpenId(null);
    void providerApi.deleteNotification(id).catch(console.error);
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
    setDetailTargetId(item.id);
    if (item.unread) markRead([item.id]);
  }

  return {
    items,
    activeTab,
    setActiveTab,
    cards,
    tabs,
    recentActivity,
    selected,
    selectionMode,
    enterSelectionMode,
    page,
    pageSize,
    setPage,
    goToPage,
    changePageSize,
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
    total,
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
