'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Search, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MobileHubPageHero } from '@/app/(app)/opportunities/_components/MobileHubPageHero';
import { useProviderMessageInbox } from '@/features/messages/hooks/useProviderMessageInbox';
import { useMarkProviderMessageThreadRead } from '@/features/messages/hooks/useUnreadCounts';
import { MessagesInboxSkeleton } from '@/shared/components/ui/PageSkeletons';

export default function MobileView() {
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

  const active = threads.find((t) => t.id === activeId);

  useEffect(() => {
    if (!active?.applicationId || !active.unread) return;
    void markRead.mutateAsync(active.applicationId).catch(() => undefined);
  }, [active?.applicationId, active?.unread]);
  const messages = active?.messages ?? [];

  async function handleSend() {
    if (!active || !draft.trim()) return;
    try {
      await sendMessage(active.applicationId, draft);
      setDraft('');
    } catch {
      // surfaced via hook
    }
  }

  if (active) {
    return (
      <div className="flex min-h-[70vh] flex-col pb-4">
        <button
          type="button"
          onClick={() => setActiveId(null)}
          className="mb-4 inline-flex items-center gap-2 text-sm text-[#2F66C8]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Messages
        </button>

        <div className="flex items-center justify-between gap-3 rounded-[10px] border border-[#EEF2F8] bg-white p-4">
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src={active.avatar}
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[#0F172A]">{active.name}</p>
              <p className="truncate text-xs text-[#8C97AD]">{active.role}</p>
            </div>
          </div>
          <Link
            href={`/applications/${active.applicationId}`}
            className="shrink-0 text-xs font-medium text-[#2F66C8]"
          >
            Application
          </Link>
        </div>

        <div className="mt-4 flex-1 space-y-3 rounded-[10px] border border-[#EEF2F8] bg-white p-4">
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
                    'max-w-[85%] rounded-[10px] px-3 py-2',
                    msg.from === 'us'
                      ? 'bg-[#2F66C8] text-white'
                      : 'border border-[#EEF2F8] bg-[#F8FAFC] text-[#0F172A]',
                  )}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={cn(
                      'mt-1 text-[10px]',
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

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void handleSend();
            }}
            placeholder="Type a message..."
            className="h-[45px] flex-1 rounded-[6px] border border-[#D9E1EF] px-3 text-sm outline-none focus:border-[#2F66C8]"
          />
          <button
            type="button"
            disabled={sending || !draft.trim()}
            onClick={() => void handleSend()}
            className="inline-flex h-[45px] items-center gap-2 rounded-[6px] bg-[#2F66C8] px-4 text-sm font-medium text-white disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        {error ? <p className="mt-2 text-sm text-[#B91C1C]">{error}</p> : null}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-4">
      <MobileHubPageHero
        title="Messages"
        subtitle="Communicate with applicants about their applications."
      />

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C97AD]" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search messages..."
          className="h-[45px] w-full rounded-[6px] border border-[#D9E1EF] bg-white pl-10 pr-3 text-sm outline-none focus:border-[#2F66C8]"
        />
      </div>

      {error ? <p className="text-sm text-[#B91C1C]">{error}</p> : null}
      {loading && !threads.length ? (
        <MessagesInboxSkeleton count={5} />
      ) : !loading && filtered.length === 0 ? (
        <p className="text-sm text-[#8C97AD]">No applicant conversations yet.</p>
      ) : (
        <ul className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
          {filtered.map((thread) => (
            <li key={thread.id} className="border-b border-[#EEF2F8] last:border-b-0">
              <button
                type="button"
                onClick={() => setActiveId(thread.id)}
                className="flex w-full gap-3 p-4 text-left"
              >
                <Image
                  src={thread.avatar}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
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
      )}
    </div>
  );
}
