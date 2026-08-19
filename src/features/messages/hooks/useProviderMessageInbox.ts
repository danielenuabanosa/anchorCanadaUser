'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { providerApi } from '@/features/provider/services/providerApi';
import { isStaticMode } from '@/lib/staticMode';
import {
  CONVERSATIONS,
  MESSAGE_THREADS,
  type MessageThread,
} from '@/app/(app)/messages/_components/messagesData';

export type InboxMessage = {
  id: string;
  from: 'them' | 'us';
  text: string;
  time: string;
};

export type InboxThread = MessageThread & {
  applicationId: string;
  messages: InboxMessage[];
};

type InboxSummary = {
  applicationId: string;
  applicantName: string;
  opportunityTitle: string;
  preview: string;
  lastMessageAt: string | null;
  unreadCount: number;
};

function formatRelative(iso?: string | null) {
  if (!iso) return '';
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return '';
  const diffMs = Date.now() - t;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min${mins === 1 ? '' : 's'} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatMessageTime(iso?: string) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function mapApiMessage(m: Record<string, unknown>, i: number, applicationId: string): InboxMessage {
  return {
    id: String(m.id ?? `${applicationId}-${i}`),
    from: m.isMe ? 'us' : 'them',
    text: String(m.content ?? m.text ?? ''),
    time: formatMessageTime(String(m.createdAt ?? m.timestamp ?? m.time ?? '')),
  };
}

export function useProviderMessageInbox() {
  const inboxQuery = useQuery({
    queryKey: ['provider', 'messages', 'inbox'],
    queryFn: async () => {
      const rows = await providerApi.getMessagesInbox();
      return (Array.isArray(rows) ? rows : []) as InboxSummary[];
    },
    enabled: !isStaticMode(),
  });

  const summaries = inboxQuery.data ?? [];
  const [conversations, setConversations] = useState<Record<string, InboxMessage[]>>({});
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const loadMessages = useCallback(async (applicationIds: string[]) => {
    if (!applicationIds.length) {
      setConversations({});
      return;
    }
    setLoadingMessages(true);
    setError('');
    try {
      const entries = await Promise.all(
        applicationIds.map(async (id) => {
          try {
            const messages = await providerApi.getApplicationMessages(id);
            return [
              id,
              (messages ?? []).map((m, i) => mapApiMessage(m as Record<string, unknown>, i, id)),
            ] as const;
          } catch {
            return [id, []] as const;
          }
        }),
      );
      setConversations(Object.fromEntries(entries));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load messages.');
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    if (isStaticMode()) return;
    void loadMessages(summaries.map((s) => s.applicationId));
  }, [summaries, loadMessages]);

  const threads: InboxThread[] = useMemo(() => {
    if (isStaticMode()) {
      return MESSAGE_THREADS.map((t) => ({
        ...t,
        applicationId: t.id,
        messages: (CONVERSATIONS[t.id]?.messages ?? []).map((m) => ({
          id: m.id,
          from: m.from,
          text: m.text,
          time: m.time,
        })),
      }));
    }

    return summaries
      .map((row) => {
        const messages = conversations[row.applicationId] ?? [];
        const last = messages[messages.length - 1];
        return {
          id: row.applicationId,
          applicationId: row.applicationId,
          name: row.applicantName || 'Applicant',
          preview:
            last?.text ||
            row.preview ||
            'No messages yet — reach out about this application.',
          time:
            last?.time ||
            formatRelative(row.lastMessageAt) ||
            '',
          unread: row.unreadCount > 0 || messages.some((m) => m.from === 'them'),
          avatar: '',
          role: `Applicant · ${row.opportunityTitle || 'Opportunity'}`,
          messages,
        } satisfies InboxThread;
      })
      .sort((a, b) => {
        const aTime = summaries.find((s) => s.applicationId === a.applicationId)?.lastMessageAt;
        const bTime = summaries.find((s) => s.applicationId === b.applicationId)?.lastMessageAt;
        return String(bTime ?? '').localeCompare(String(aTime ?? ''));
      });
  }, [summaries, conversations]);

  async function sendMessage(applicationId: string, content: string) {
    const text = content.trim();
    if (!text) return;
    setSending(true);
    setError('');
    try {
      if (isStaticMode()) {
        setConversations((prev) => ({
          ...prev,
          [applicationId]: [
            ...(prev[applicationId] ?? []),
            { id: String(Date.now()), from: 'us', text, time: 'Just now' },
          ],
        }));
        return;
      }
      const created = await providerApi.sendApplicationMessage(applicationId, text);
      const next = mapApiMessage(
        { ...(created as Record<string, unknown>), isMe: true, content: text },
        0,
        applicationId,
      );
      setConversations((prev) => ({
        ...prev,
        [applicationId]: [...(prev[applicationId] ?? []), next],
      }));
      await inboxQuery.refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send message.');
      throw err;
    } finally {
      setSending(false);
    }
  }

  return {
    threads,
    loading: inboxQuery.isLoading || loadingMessages,
    error: error || (inboxQuery.error instanceof Error ? inboxQuery.error.message : ''),
    sending,
    sendMessage,
    refresh: async () => {
      await inboxQuery.refetch();
      await loadMessages(summaries.map((s) => s.applicationId));
    },
  };
}
