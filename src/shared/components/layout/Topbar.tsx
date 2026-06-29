'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, ChevronDown, MessageCircle, Search, Settings } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Avatar } from '@/shared/components/ui/Avatar';
import { StartBuilderDropdown } from '@/features/opportunity-builder/components/StartBuilderDropdown';
import anchorLogoFull from '@assets/icons/anchor-logo-full.png';
import orgAvatar from '@assets/images/prov-sickkids.png';
import avatar1 from '@assets/images/profile-avatar.png';
import avatar2 from '@assets/images/profile-google.png';
import avatar3 from '@assets/images/profile-georgebrown.png';

const TEAM_AVATARS = [avatar1, avatar2, avatar3] as const;

/** Figma dashboard header (80:2486): 110px bar with search, team avatars, Create Opportunity. */
export function Topbar() {
  const { user } = useAuthStore();
  const [query, setQuery] = useState('');

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) window.location.hash = `search?q=${encodeURIComponent(q)}`;
  }

  const displayName = user?.name ?? 'Toronto Community Health';
  const avatarSrc = user?.avatarUrl ?? orgAvatar.src;

  return (
    <>
      {/* Mobile — Figma 92:1918 */}
      <header className="sticky top-0 z-20 shrink-0 border-b border-[#D9E1EF]/80 bg-white backdrop-blur-[5px] md:hidden">
        <div className="flex items-center justify-between p-10">
          <Link href="/dashboard" className="shrink-0" aria-label="Anchor Canada Provider Portal">
            <Image
              src={anchorLogoFull}
              alt="Anchor Canada"
              width={140}
              height={46}
              priority
              className="h-[45.75px] w-[140px] object-contain object-left"
            />
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href="/dashboard#settings"
              className="text-[#44516A] transition-colors hover:text-[#0F172A]"
              aria-label="Settings"
            >
              <Settings className="h-[22px] w-[22px]" strokeWidth={1.75} />
            </Link>
            <Link
              href="/dashboard#notifications"
              className="relative inline-flex h-[21px] w-[21px] shrink-0 items-center justify-center text-[#44516A] transition-colors hover:text-[#0F172A]"
              aria-label="Notifications, 3 unread"
            >
              <Bell className="h-[21px] w-[21px]" strokeWidth={1.75} />
              <span className="absolute left-[12.5px] top-[1.5px] flex h-2.5 w-2.5 items-center justify-center rounded-[5px] border-[1.4px] border-white bg-[#EF4444] text-[6.5px] font-normal leading-none text-white">
                3
              </span>
            </Link>
            <Link
              href="/dashboard#profile"
              className="flex items-center gap-2.5 text-[#44516A] transition-colors hover:text-[#0F172A]"
              aria-label="Profile"
            >
              <Avatar src={avatarSrc} fallback={displayName} size="sm" className="h-[26px] w-[26px]" />
              <ChevronDown className="h-3.5 w-3.5 text-[#8C97AD]" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </header>

      {/* Desktop — Figma Frame 25 */}
      <header className="sticky top-0 z-20 hidden h-[110px] shrink-0 items-center border-b border-[#EEF2F8] bg-white px-10 md:flex">
        <form onSubmit={handleSearch} className="flex min-w-0 flex-1">
          <div className="flex h-[45px] w-full max-w-[520px] items-center gap-3 rounded-[10px] border border-[#D9E1EF] bg-[#F8FAFC] px-4">
            <Search className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search opportunities, applications or applicants…"
              className="min-w-0 flex-1 bg-transparent text-base leading-[21px] text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
              aria-label="Search opportunities, applications or applicants"
            />
            <kbd className="hidden shrink-0 items-center gap-1 rounded border border-[#D9E1EF] bg-white px-1.5 py-0.5 text-xs text-[#44516A] sm:inline-flex">
              ⌘ K
            </kbd>
          </div>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-5">
          <Link href="/dashboard#notifications" className="relative flex h-8 w-8 items-center justify-center text-[#44516A]" aria-label="Notifications">
            <Bell className="h-[21px] w-[21px]" strokeWidth={1.75} />
            <span className="absolute -right-0.5 top-0 flex h-[10px] min-w-[12px] items-center justify-center rounded-[5px] bg-[#EF4444] px-0.5 text-[9px] font-medium leading-none text-white">
              12
            </span>
          </Link>
          <Link href="/dashboard#messages" className="flex h-8 w-8 items-center justify-center text-[#44516A]" aria-label="Messages">
            <MessageCircle className="h-[21px] w-[21px]" strokeWidth={1.75} />
          </Link>
          <button type="button" className="flex items-center gap-2 rounded-lg p-0.5 hover:bg-[#F8FAFC]" aria-label="Team members">
            <div className="flex -space-x-2">
              {TEAM_AVATARS.map((src, i) => (
                <Image key={i} src={src} alt="" width={32} height={32} className="h-8 w-8 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-[#EFF4FF] text-sm font-medium text-[#0F172A]">+8</span>
            <ChevronDown className="h-3.5 w-3.5 text-[#8C97AD]" strokeWidth={2} />
          </button>
          <StartBuilderDropdown label="Create Opportunity" />
        </div>
      </header>
    </>
  );
}
