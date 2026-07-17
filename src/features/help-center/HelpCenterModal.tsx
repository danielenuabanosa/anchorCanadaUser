'use client';

import { useMemo, useState } from 'react';
import { ChevronRight, FileText, Headset, Search, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHelpCenterStore } from '@/store/helpCenterStore';
import { HELP_ARTICLES, HELP_FAQS } from './helpCenterData';
import { CommandCenterNav } from './CommandCenterNav';
import {
  HelpModalBackdrop,
  HelpModalFooter,
  HelpModalHeader,
  HelpModalPanel,
} from './HelpCenterShared';

function EmptyResults({ query, title }: { query: string; title: string }) {
  return (
    <div className="flex w-full flex-col items-center gap-10 py-5 md:gap-[60px] md:py-[60px]">
      <div className="flex size-[120px] items-center justify-center rounded-[60px] bg-[#EEF4FD] md:size-[160px] md:rounded-[80px]">
        <Search className="h-8 w-8 text-[#2F66C8] md:h-10 md:w-10" strokeWidth={1.5} aria-hidden />
      </div>
      <div className="flex w-full flex-col items-center gap-2.5 text-center">
        <p className="flex items-baseline justify-center gap-1.5 whitespace-nowrap">
          <span className="font-serif text-[22px] text-[#0F172A] md:text-2xl">No {title}</span>
          <span className="font-serif text-2xl italic text-[#2F66C8] md:text-[28px]">
            <span className="md:hidden">Caught Up!</span>
            <span className="hidden md:inline">found!</span>
          </span>
        </p>
        <p className="text-sm text-[#44516A]">We couldn&rsquo;t find any results for &ldquo;{query}&rdquo;</p>
      </div>
    </div>
  );
}

function SearchPanel() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return HELP_ARTICLES;
    return HELP_ARTICLES.filter(
      (a) => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <>
      <p className="font-serif text-2xl text-[#0F172A] md:text-[28px] md:leading-[56px]">How can we help you?</p>
      <div
        className={cn(
          'flex w-full shrink-0 items-center gap-2.5 rounded-[10px] border border-[#D9E1EF] bg-white p-4 transition-colors focus-within:border-[#2F66C8]',
          query && 'border-[#2F66C8]',
        )}
      >
        <Search className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" strokeWidth={1.75} aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for help articles...."
          className="no-anchor-field w-full bg-transparent text-base text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyResults query={query} title="articles" />
      ) : (
        <div className="flex w-full flex-col gap-5">
          <p className="text-sm font-semibold leading-[1.8] text-[#0F172A]">Applications</p>
          <div className="flex w-full flex-col gap-5">
            {filtered.map((article) => (
              <button key={article.id} type="button" className="flex w-full items-center gap-4 text-left">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[20px] bg-[#EEF2F8]">
                  <article.icon className="h-5 w-5 text-[#44516A]" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="text-sm font-medium text-[#0F172A]">{article.title}</span>
                  <span className="text-sm text-[#44516A]">{article.description}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function FaqPanel() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return HELP_FAQS;
    return HELP_FAQS.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <p className="font-serif text-2xl text-[#0F172A] md:text-[28px] md:leading-[56px]">
        Frequently Asked Questions
      </p>
      <div
        className={cn(
          'flex w-full shrink-0 items-center gap-2.5 rounded-[10px] border border-[#D9E1EF] bg-white p-4 transition-colors focus-within:border-[#2F66C8]',
          query && 'border-[#2F66C8]',
        )}
      >
        <Search className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" strokeWidth={1.75} aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for FAQs...."
          className="no-anchor-field w-full bg-transparent text-base text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyResults query={query} title="FAQs" />
      ) : (
        <div className="flex w-full flex-col gap-5">
          {filtered.map((faq) => (
            <button
              key={faq.id}
              type="button"
              className="flex w-full items-center gap-1 py-2.5 text-left"
            >
              <span className="flex-1 text-sm font-medium text-[#0F172A]">{faq.question}</span>
              <ChevronRight className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" strokeWidth={1.75} />
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function ComingSoonPanel({ label, icon: Icon }: { label: string; icon: typeof FileText }) {
  return (
    <div className="flex w-full flex-col items-center gap-5 py-[60px] text-center">
      <div className="flex size-[160px] items-center justify-center rounded-[80px] bg-[#EEF4FD]">
        <Icon className="h-10 w-10 text-[#2F66C8]" strokeWidth={1.5} aria-hidden />
      </div>
      <div className="flex w-full flex-col items-center gap-2.5">
        <p className="font-serif text-2xl text-[#0F172A]">{label}</p>
        <p className="text-sm text-[#44516A]">We&rsquo;re putting the finishing touches on this. Check back soon!</p>
      </div>
    </div>
  );
}

export function HelpCenterModal() {
  const isOpen = useHelpCenterStore((s) => s.isOpen);
  const tab = useHelpCenterStore((s) => s.tab);
  const close = useHelpCenterStore((s) => s.close);
  const setTab = useHelpCenterStore((s) => s.setTab);
  const openReport = useHelpCenterStore((s) => s.openReport);

  if (!isOpen) return null;

  return (
    <HelpModalBackdrop onClose={close} drawer>
      <HelpModalPanel width="lg" drawer className="min-h-0">
        <HelpModalHeader title="Help Center" onClose={close} />

        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5 md:flex-row md:items-start md:gap-5 md:px-[26px] md:py-10">
          <CommandCenterNav activeTab={tab} onSelect={setTab} onReportIssue={openReport} />

          <div className="flex w-full min-w-0 flex-1 flex-col gap-5 rounded-[10px] border border-[#EEF2F8] bg-white p-5 md:h-full">
            {tab === 'search' ? <SearchPanel /> : null}
            {tab === 'faq' ? <FaqPanel /> : null}
            {tab === 'documentation' ? <ComingSoonPanel label="Documentation" icon={FileText} /> : null}
            {tab === 'video' ? <ComingSoonPanel label="Video Tutorials" icon={Video} /> : null}
            {tab === 'contact' ? <ComingSoonPanel label="Contact Support" icon={Headset} /> : null}
          </div>
        </div>

        <HelpModalFooter align="between">
          <p className="text-sm font-medium text-[#44516A]">Still need help?</p>
          <button
            type="button"
            onClick={openReport}
            className="rounded-[6px] bg-[#2F66C8] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] transition hover:bg-[#2554A6]"
          >
            Report an issue
          </button>
        </HelpModalFooter>
      </HelpModalPanel>
    </HelpModalBackdrop>
  );
}
