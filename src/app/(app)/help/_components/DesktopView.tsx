'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, Mail, MessageCircle, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HELP_CATEGORIES, HELP_FAQS, POPULAR_ARTICLES } from './helpData';

export default function DesktopView() {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = HELP_FAQS.filter(
    (f) =>
      !search.trim() ||
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Help Center</h1>
        <p className="text-base text-[#44516A]">
          Find answers, guides, and support for your provider workspace.
        </p>
      </div>

      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#8C97AD]" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search help articles..."
          className="h-[45px] w-full rounded-[6px] border border-[#D9E1EF] bg-white pl-11 pr-4 text-sm outline-none focus:border-[#2F66C8]"
        />
      </div>

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-3">
        {HELP_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className="flex flex-col items-start gap-3 rounded-[10px] border border-[#EEF2F8] bg-white p-5 text-left transition hover:border-[#2F66C8]/30"
          >
            <span className={`flex h-8 w-8 items-center justify-center rounded-2xl ${cat.color}`}>
              <cat.icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-base font-medium text-[#0F172A]">{cat.title}</p>
              <p className="mt-1 text-sm text-[#44516A]">{cat.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
          <h2 className="mb-4 text-lg font-medium text-[#0F172A]">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={faq.q} className="rounded-[8px] border border-[#EEF2F8]">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span className="text-sm font-medium text-[#0F172A]">{faq.q}</span>
                  <ChevronDown
                    className={cn('h-4 w-4 shrink-0 text-[#8C97AD] transition', openFaq === i && 'rotate-180')}
                  />
                </button>
                {openFaq === i ? (
                  <p className="border-t border-[#EEF2F8] px-4 py-3 text-sm text-[#44516A]">{faq.a}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
            <h3 className="text-lg font-medium text-[#0F172A]">Popular Articles</h3>
            <ul className="mt-4 space-y-3">
              {POPULAR_ARTICLES.map((article) => (
                <li key={article.title}>
                  <button type="button" className="flex w-full items-center gap-3 text-left text-sm text-[#2F66C8]">
                    <article.icon className="h-4 w-4 shrink-0" />
                    {article.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[10px] border border-[#EEF2F8] bg-[#EFF4FF] p-5">
            <h3 className="text-lg font-medium text-[#0F172A]">Need more help?</h3>
            <p className="mt-1 text-sm text-[#44516A]">Our support team typically responds within 24 hours.</p>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/help"
                className="inline-flex items-center justify-center gap-2 rounded-[6px] bg-[#2F66C8] py-3 text-sm font-medium text-white"
              >
                <MessageCircle className="h-4 w-4" />
                Start Live Chat
              </Link>
              <Link
                href="/messages"
                className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white py-3 text-sm font-medium text-[#0F172A]"
              >
                <Mail className="h-4 w-4" />
                Email Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
