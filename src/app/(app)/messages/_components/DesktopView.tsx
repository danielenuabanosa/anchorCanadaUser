'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MESSAGE_THREADS, SAMPLE_CONVERSATION } from './messagesData';

export default function DesktopView() {
  const [activeId, setActiveId] = useState(MESSAGE_THREADS[0]?.id ?? '1');
  const [draft, setDraft] = useState('');
  const active = MESSAGE_THREADS.find((t) => t.id === activeId) ?? MESSAGE_THREADS[0];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Messages</h1>
        <p className="text-base text-[#44516A]">Communicate with applicants and team members.</p>
      </div>

      <div className="grid min-h-[560px] grid-cols-[360px_1fr] overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
        <div className="border-r border-[#EEF2F8]">
          <div className="border-b border-[#EEF2F8] p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C97AD]" />
              <input
                type="search"
                placeholder="Search messages..."
                className="h-[45px] w-full rounded-[6px] border border-[#D9E1EF] bg-white pl-10 pr-3 text-sm outline-none focus:border-[#2F66C8]"
              />
            </div>
          </div>
          <ul>
            {MESSAGE_THREADS.map((thread) => (
              <li key={thread.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(thread.id)}
                  className={cn(
                    'flex w-full gap-3 border-b border-[#EEF2F8] p-4 text-left transition',
                    activeId === thread.id ? 'bg-[#EFF4FF]' : 'hover:bg-[#F8FAFC]',
                  )}
                >
                  <Image src={thread.avatar} alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-full object-cover" />
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
          <div className="flex items-center gap-3 border-b border-[#EEF2F8] px-5 py-4">
            <Image src={active.avatar} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-medium text-[#0F172A]">{active.name}</p>
              <p className="text-xs text-[#8C97AD]">{active.role}</p>
            </div>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {SAMPLE_CONVERSATION.messages.map((msg) => (
              <div key={msg.id} className={cn('flex', msg.from === 'us' ? 'justify-end' : 'justify-start')}>
                <div
                  className={cn(
                    'max-w-[75%] rounded-[10px] px-4 py-3',
                    msg.from === 'us' ? 'bg-[#2F66C8] text-white' : 'border border-[#EEF2F8] bg-[#F8FAFC] text-[#0F172A]',
                  )}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={cn('mt-1 text-xs', msg.from === 'us' ? 'text-white/70' : 'text-[#8C97AD]')}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2.5 border-t border-[#EEF2F8] p-4">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message..."
              className="h-[45px] flex-1 rounded-[6px] border border-[#D9E1EF] px-4 text-sm outline-none focus:border-[#2F66C8]"
            />
            <button
              type="button"
              className="inline-flex h-[45px] items-center gap-2 rounded-[6px] bg-[#2F66C8] px-5 text-sm font-medium text-white"
            >
              <Send className="h-4 w-4" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
