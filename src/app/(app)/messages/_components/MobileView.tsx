'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MobileHubPageHero } from '@/app/(app)/opportunities/_components/MobileHubPageHero';
import { MESSAGE_THREADS } from './messagesData';

export default function MobileView() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = MESSAGE_THREADS.find((t) => t.id === activeId);

  if (active) {
    return (
      <div className="flex flex-col pb-4">
        <button
          type="button"
          onClick={() => setActiveId(null)}
          className="mb-4 inline-flex items-center gap-2 text-sm text-[#2F66C8]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Messages
        </button>
        <div className="flex items-center gap-3 rounded-[10px] border border-[#EEF2F8] bg-white p-4">
          <Image src={active.avatar} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
          <div>
            <p className="text-sm font-medium text-[#0F172A]">{active.name}</p>
            <p className="text-xs text-[#8C97AD]">{active.role}</p>
          </div>
        </div>
        <div className="mt-4 rounded-[10px] border border-[#EEF2F8] bg-white p-4">
          <p className="text-sm text-[#44516A]">{active.preview}</p>
          <p className="mt-2 text-xs text-[#8C97AD]">{active.time}</p>
        </div>
        <Link
          href={`/applications/${active.id}`}
          className="mt-4 inline-flex w-full items-center justify-center rounded-[6px] border border-[#D9E1EF] py-2.5 text-sm font-medium text-[#2F66C8]"
        >
          View Application
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-4">
      <MobileHubPageHero title="Messages" subtitle="Communicate with applicants and team members." />

      <div className="relative mt-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C97AD]" />
        <input
          type="search"
          placeholder="Search messages..."
          className="h-[45px] w-full rounded-[6px] border border-[#D9E1EF] bg-white pl-10 pr-3 text-sm outline-none focus:border-[#2F66C8]"
        />
      </div>

      <ul className="mt-4 overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
        {MESSAGE_THREADS.map((thread, index) => (
          <li key={thread.id}>
            <button
              type="button"
              onClick={() => setActiveId(thread.id)}
              className={cn(
                'flex w-full gap-3 p-4 text-left',
                index < MESSAGE_THREADS.length - 1 && 'border-b border-[#EEF2F8]',
              )}
            >
              <Image src={thread.avatar} alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-[#0F172A]">{thread.name}</p>
                  <span className="shrink-0 text-xs text-[#8C97AD]">{thread.time}</span>
                </div>
                <p className="truncate text-sm text-[#44516A]">{thread.preview}</p>
              </div>
              {thread.unread ? <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2F66C8]" /> : null}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
