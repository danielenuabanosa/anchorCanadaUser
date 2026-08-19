'use client';

import { useEffect, useMemo, useState } from 'react';
import { Avatar } from '@/shared/components/ui/Avatar';
import { photoSrc } from '@/shared/lib/photoSrc';
import Link from 'next/link';
import { Search, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProviderMessageInbox } from '@/features/messages/hooks/useProviderMessageInbox';
import { useMarkProviderMessageThreadRead } from '@/features/messages/hooks/useUnreadCounts';
import {
  MessagesInboxSkeleton,
  MessagesThreadSkeleton,
} from '@/shared/components/ui/PageSkeletons';

export default function DesktopView() {
  const { threads, loading, error, sending, sendMessage } = useProviderMessageInbox();
  const markRead = useMarkProviderMessageThreadRead();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return threads;
    return threads.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.preview.toLowerCase().includes(q) ||
        t.role.toLowerCase().includes(q),
    );
  }, [query, threads]);

  const active = filtered.find((t) => t.id === activeId) ?? filtered[0] ?? threads[0];
  const messages = active?.messages ?? [];

  useEffect(() => {
    if (!active?.applicationId || !active.unread) return;
    void markRead.mutateAsync(active.applicationId).catch(() => undefined);
  }, [active?.applicationId, active?.unread]);

  async function handleSend() {
    if (!active || !draft.trim()) return;
    try {
      await sendMessage(active.applicationId, draft);
      setDraft('');
    } catch {
      // surfaced via hook
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Messages</h1>
        <p className="text-base text-[#44516A]">Communicate with applicants about their applications.</p>
      </div>

      {error ? <p className="text-sm text-[#B91C1C]">{error}</p> : null}

      <div className="grid min-h-[560px] grid-cols-[360px_1fr] overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
        <div className="border-r border-[#EEF2F8]">
          <div className="border-b border-[#EEF2F8] p-4">
            <div className="anchor-search-field w-full">
              <Search className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" strokeWidth={1.75} aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search messages..."
                aria-label="Search messages"
                className="no-anchor-field min-w-0 flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
              />
            </div>
          </div>
          <ul>
            {loading && !threads.length ? (
              <li>
                <MessagesInboxSkeleton count={6} />
              </li>
            ) : null}
            {!loading && filtered.length === 0 ? (
              <li className="p-4 text-sm text-[#8C97AD]">No applicant conversations yet.</li>
            ) : null}
            {filtered.map((thread) => (
              <li key={thread.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(thread.id)}
                  className={cn(
                    'flex w-full gap-3 border-b border-[#EEF2F8] p-4 text-left transition',
                    (activeId ?? active?.id) === thread.id ? 'bg-[#EFF4FF]' : 'hover:bg-[#F8FAFC]',
                  )}
                >
                  <Avatar
                    src={photoSrc(thread.avatar)}
                    fallback={thread.name}
                    size="md"
                    className="h-12 w-12 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-[#0F172A]">{thread.name}</p>
                      <span className="shrink-0 text-xs text-[#8C97AD]">{thread.time}</span>
                    </div>
                    <p className="text-xs text-[#8C97AD]">{thread.role}</p>
                    <p className="mt-1 truncate text-sm text-[#44516A]">{thread.preview}</p>
                  </div>
                  {thread.unread ? <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2F66C8]" /> : null}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          {active ? (
            <>
              <div className="flex items-center justify-between gap-3 border-b border-[#EEF2F8] px-5 py-4">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={photoSrc(active.avatar)}
                    fallback={active.name}
                    size="sm"
                    className="h-10 w-10"
                  />
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">{active.name}</p>
                    <p className="text-xs text-[#8C97AD]">{active.role}</p>
                  </div>
                </div>
                <Link
                  href={`/applications/${active.applicationId}`}
                  className="text-xs font-medium text-[#2F66C8]"
                >
                  View application
                </Link>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto p-5">
                {messages.length === 0 ? (
                  <p className="text-sm text-[#8C97AD]">No messages yet. Say hello about this application.</p>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn('flex', msg.from === 'us' ? 'justify-end' : 'justify-start')}
                    >
                      <div
                        className={cn(
                          'max-w-[75%] rounded-[10px] px-4 py-3',
                          msg.from === 'us'
                            ? 'bg-[#2F66C8] text-white'
                            : 'border border-[#EEF2F8] bg-[#F8FAFC] text-[#0F172A]',
                        )}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p
                          className={cn(
                            'mt-1 text-xs',
                            msg.from === 'us' ? 'text-white/70' : 'text-[#8C97AD]',
                          )}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex gap-2.5 border-t border-[#EEF2F8] p-4">
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') void handleSend();
                  }}
                  placeholder="Type a message..."
                  className="h-[45px] flex-1 rounded-[6px] border border-[#D9E1EF] px-4 text-sm outline-none focus:border-[#2F66C8]"
                />
                <button
                  type="button"
                  disabled={sending || !draft.trim()}
                  onClick={() => void handleSend()}
                  className="inline-flex h-[45px] items-center gap-2 rounded-[6px] bg-[#2F66C8] px-5 text-sm font-medium text-white disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  {sending ? 'Sending…' : 'Send'}
                </button>
              </div>
            </>
          ) : loading ? (
            <MessagesThreadSkeleton />
          ) : (
            <div className="flex flex-1 items-center justify-center p-8 text-sm text-[#8C97AD]">
              Select a conversation to start messaging.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
