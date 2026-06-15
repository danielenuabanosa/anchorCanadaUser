'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Bell, Search, Mail, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Avatar } from '@/shared/components/ui/Avatar';
import anchorLogo from '@assets/icons/anchor-logo.png';

export function Topbar() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [query, setQuery] = useState('');

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/opportunities?q=${encodeURIComponent(q)}` : '/opportunities');
  }

  const displayName = user?.name ?? 'Jacob Sullivan';

  return (
    <header className="sticky top-0 z-20 flex h-[86px] shrink-0 items-center gap-4 border-b border-[#EEF2F8] bg-white px-5 md:px-6">
      <Link href="/dashboard" className="shrink-0 md:hidden" aria-label="Anchor Canada home">
        <Image src={anchorLogo} alt="Anchor Canada" height={36} className="h-9 w-auto" />
      </Link>

      <form onSubmit={handleSearch} className="flex min-w-0 flex-1 md:mx-auto md:max-w-xl">
        <div className="flex w-full items-center gap-2 rounded-lg border border-[#D9E1EF] bg-[#F8FAFC] px-3 py-2 md:gap-3 md:px-4 md:py-3">
          <Search className="h-4 w-4 shrink-0 text-[#8C97AD] md:h-5 md:w-5" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jobs, grants, support…"
            className="min-w-0 flex-1 bg-transparent font-sans text-sm text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
            aria-label="Search jobs, grants, support"
          />
          <kbd className="hidden rounded border border-[#D9E1EF] bg-white px-2 py-0.5 text-xs font-medium text-[#8C97AD] lg:inline">
            ⌘K
          </kbd>
        </div>
      </form>

      <div className="flex shrink-0 items-center gap-1 md:gap-3">
        <Link
          href="/notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-[#44516A] transition hover:bg-[#F8FAFC] md:flex"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#EF4444]" aria-hidden="true" />
        </Link>

        <Link
          href="/messages"
          className="hidden h-10 w-10 items-center justify-center rounded-lg text-[#44516A] transition hover:bg-[#F8FAFC] md:flex"
          aria-label="Messages"
        >
          <Mail className="h-5 w-5" />
        </Link>

        <Link
          href="/profile"
          className="hidden items-center gap-1 rounded-lg p-1 transition hover:bg-[#F8FAFC] md:flex"
          aria-label="Go to profile"
        >
          <Avatar
            src={user?.avatarUrl}
            fallback={displayName}
            size="sm"
            className="cursor-pointer"
          />
          <ChevronDown className="h-4 w-4 text-[#8C97AD]" />
        </Link>
      </div>
    </header>
  );
}
