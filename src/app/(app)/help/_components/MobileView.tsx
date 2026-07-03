'use client';

import { useState } from 'react';
import { ChevronDown, Mail, MessageCircle, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MobileHubPageHero } from '@/app/(app)/opportunities/_components/MobileHubPageHero';
import { HELP_CATEGORIES, HELP_FAQS } from './helpData';

export default function MobileView() {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = HELP_FAQS.filter(
    (f) =>
      !search.trim() ||
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-5 pb-4">
      <MobileHubPageHero
        title="Help Center"
        subtitle="Find answers, guides, and support for your provider workspace."
      />

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C97AD]" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search help articles..."
          className="h-[45px] w-full rounded-[6px] border border-[#D9E1EF] bg-white pl-10 pr-3 text-sm outline-none focus:border-[#2F66C8]"
        />
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {HELP_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className="rounded-[8px] border border-[#EEF2F8] bg-white p-3 text-left"
          >
            <span className={`inline-flex h-8 w-8 items-center justify-center rounded-xl ${cat.color}`}>
              <cat.icon className="h-4 w-4" />
            </span>
            <p className="mt-2 text-sm font-medium text-[#0F172A]">{cat.title}</p>
          </button>
        ))}
      </div>

      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-4">
        <h2 className="mb-3 text-base font-medium text-[#0F172A]">FAQ</h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="rounded-[8px] border border-[#EEF2F8]">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left"
              >
                <span className="text-sm font-medium text-[#0F172A]">{faq.q}</span>
                <ChevronDown className={cn('h-4 w-4 shrink-0 transition', openFaq === i && 'rotate-180')} />
              </button>
              {openFaq === i ? (
                <p className="border-t border-[#EEF2F8] px-3 py-2.5 text-sm text-[#44516A]">{faq.a}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[10px] border border-[#EEF2F8] bg-[#EFF4FF] p-4">
        <h3 className="text-base font-medium text-[#0F172A]">Contact Support</h3>
        <div className="mt-3 flex flex-col gap-2">
          <button type="button" className="flex items-center justify-center gap-2 rounded-[6px] bg-[#2F66C8] py-3 text-sm font-medium text-white">
            <MessageCircle className="h-4 w-4" />
            Live Chat
          </button>
          <button type="button" className="flex items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white py-3 text-sm font-medium text-[#0F172A]">
            <Mail className="h-4 w-4" />
            Email Support
          </button>
        </div>
      </div>
    </div>
  );
}
