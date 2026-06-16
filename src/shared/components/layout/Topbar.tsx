'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, Search, Mail, ChevronDown, Settings } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Avatar } from '@/shared/components/ui/Avatar';
import anchorLogo from '@assets/icons/anchor-logo.png';
import orgAvatar from '@assets/images/prov-sickkids.png';

export function Topbar() {
  const { user } = useAuthStore();
  const [query, setQuery] = useState('');

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      window.location.hash = `listings?q=${encodeURIComponent(q)}`;
    }
  }

  const displayName = user?.name ?? 'Toronto Community Health';
  const avatarSrc = user?.avatarUrl ?? orgAvatar.src;

  return (
    <>
      {/* Mobile navbar */}
      <header className="sticky top-0 z-20 shrink-0 border-b border-[#D9E1EF]/80 bg-white/95 backdrop-blur-[5px] md:hidden">
        <div className="flex items-center justify-between px-5 py-6">
          <Link href="/dashboard" className="shrink-0" aria-label="Anchor Canada Provider Portal">
            <Image
              src={anchorLogo}
              alt="Anchor Canada"
              height={46}
              priority
              className="h-[46px] w-auto max-w-[140px]"
            />
          </Link>

          <div className="flex items-center gap-5">
            <Link
              href="#settings"
              className="text-[#44516A] transition-colors hover:text-[#0F172A]"
              aria-label="Settings"
            >
              <Settings className="h-[22px] w-[22px]" strokeWidth={1.75} />
            </Link>

            <Link
              href="#notifications"
              className="relative text-[#44516A] transition-colors hover:text-[#0F172A]"
              aria-label="Notifications"
            >
              <Bell className="h-[21px] w-[21px]" strokeWidth={1.75} />
            </Link>

            <Link
              href="#profile"
              className="flex items-center gap-2.5 text-[#44516A] transition-colors hover:text-[#0F172A]"
              aria-label="Organization profile"
            >
              <Avatar
                src={avatarSrc}
                fallback={displayName}
                size="sm"
                className="h-[26px] w-[26px]"
              />
              <ChevronDown className="h-3.5 w-3.5 text-[#8C97AD]" strokeWidth={2} />
            </Link>
          </div>
        </div>

        <form onSubmit={handleSearch} className="border-t border-[#EEF2F8] px-5 py-3">
          <div className="flex items-center gap-3 rounded-lg border border-[#D9E1EF] bg-[#F8FAFC] px-4 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-[#8C97AD]" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search listings, applicants…"
              className="min-w-0 flex-1 bg-transparent font-sans text-sm text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
              aria-label="Search listings and applicants"
            />
          </div>
        </form>
      </header>

      {/* Desktop topbar */}
      <header className="sticky top-0 z-20 hidden h-[86px] shrink-0 items-center gap-4 border-b border-[#EEF2F8] bg-white px-6 md:flex">
        <form onSubmit={handleSearch} className="mx-auto flex max-w-xl flex-1">
          <div className="flex w-full items-center gap-3 rounded-lg border border-[#D9E1EF] bg-[#F8FAFC] px-4 py-3">
            <Search className="h-5 w-5 shrink-0 text-[#8C97AD]" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search listings, applicants…"
              className="min-w-0 flex-1 bg-transparent font-sans text-sm text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
              aria-label="Search listings and applicants"
            />
            <kbd className="hidden rounded border border-[#D9E1EF] bg-white px-2 py-0.5 text-xs font-medium text-[#8C97AD] lg:inline">
              ⌘K
            </kbd>
          </div>
        </form>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="#notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-[#44516A] transition hover:bg-[#F8FAFC]"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Link>

          <Link
            href="#messages"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#44516A] transition hover:bg-[#F8FAFC]"
            aria-label="Messages"
          >
            <Mail className="h-5 w-5" />
          </Link>

          <Link
            href="#profile"
            className="flex items-center gap-1 rounded-lg p-1 transition hover:bg-[#F8FAFC]"
            aria-label="Organization profile"
          >
            <Avatar
              src={avatarSrc}
              fallback={displayName}
              size="sm"
              className="cursor-pointer"
            />
            <ChevronDown className="h-4 w-4 text-[#8C97AD]" />
          </Link>
        </div>
      </header>
    </>
  );
}
