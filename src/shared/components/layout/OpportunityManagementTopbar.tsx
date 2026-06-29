'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Bell, MessageCircle, Search, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Avatar } from '@/shared/components/ui/Avatar';
import { StartBuilderDropdown } from '@/features/opportunity-builder/components/StartBuilderDropdown';
import orgAvatar from '@assets/images/prov-sickkids.png';
import avatar1 from '@assets/images/profile-avatar.png';
import avatar2 from '@assets/images/profile-google.png';
import avatar3 from '@assets/images/profile-georgebrown.png';

const TEAM_AVATARS = [avatar1, avatar2, avatar3] as const;

/**
 * Figma hub header Frame 25 (132:675): 110px bar, search + ⌘K left,
 * bell / messages / avatar stack / Start Opportunity Builder right.
 */
export function OpportunityManagementTopbar() {
  const { user } = useAuthStore();
  const [query, setQuery] = useState('');

  function dispatchSearch(value: string) {
    window.dispatchEvent(new CustomEvent('opp-hub-search', { detail: value.trim() }));
  }

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    dispatchSearch(query);
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    dispatchSearch(value);
  }

  const displayName = user?.name ?? 'Toronto Community Health';
  const avatarSrc = user?.avatarUrl ?? orgAvatar.src;

  return (
    <>
      {/* Desktop — Figma Frame 25: h=110, content row h=45 at y=33 */}
      <header className="sticky top-0 z-20 hidden h-[110px] shrink-0 items-center border-b border-[#EEF2F8] bg-white px-10 md:flex">
        <form onSubmit={handleSearch} className="flex min-w-0 flex-1">
          <div className="flex h-[45px] w-full max-w-[520px] items-center gap-3 rounded-[10px] border border-[#D9E1EF] bg-[#F8FAFC] px-4">
            <Search className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
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
          {/* Bell + badge, messages, avatar stack — Figma Frame 23 */}
          <div className="flex items-center gap-5">
            <Link
              href="#notifications"
              className="relative flex h-8 w-8 items-center justify-center text-[#44516A] hover:text-[#0F172A]"
              aria-label="Notifications"
            >
              <Bell className="h-[21px] w-[21px]" strokeWidth={1.75} />
              <span className="absolute -right-0.5 top-0 flex h-[10px] min-w-[12px] items-center justify-center rounded-[5px] bg-[#EF4444] px-0.5 text-[9px] font-medium leading-none text-white">
                12
              </span>
            </Link>

            <Link
              href="#messages"
              className="flex h-8 w-8 items-center justify-center text-[#44516A] hover:text-[#0F172A]"
              aria-label="Messages"
            >
              <MessageCircle className="h-[21px] w-[21px]" strokeWidth={1.75} />
            </Link>

            <button
              type="button"
              className="flex items-center gap-2 rounded-lg p-0.5 hover:bg-[#F8FAFC]"
              aria-label="Team members"
            >
              <div className="flex items-center -space-x-2">
                {TEAM_AVATARS.map((src, i) => (
                  <Avatar
                    key={i}
                    src={src.src}
                    fallback="Team"
                    size="sm"
                    className="h-8 w-8 border-2 border-white"
                  />
                ))}
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#EFF4FF] text-xs font-medium text-[#0F172A]">
                  +8
                </span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-[#8C97AD]" />
            </button>
          </div>

          {/* Start Opportunity Builder — far right, Figma Frame 21 */}
          <StartBuilderDropdown />
        </div>
      </header>
    </>
  );
}
