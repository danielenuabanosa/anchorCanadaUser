'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Bell, ChevronDown, Command, MessageCircle, Search } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Avatar } from '@/shared/components/ui/Avatar';
import { StartBuilderDropdown } from '@/features/opportunity-builder/components/StartBuilderDropdown';
import {
  useProviderUnreadMessageCount,
  useProviderUnreadNotificationCount,
} from '@/features/messages/hooks/useUnreadCounts';
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const { data: unreadNotifications = 0 } = useProviderUnreadNotificationCount();
  const { data: unreadMessages = 0 } = useProviderUnreadMessageCount();

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  function dispatchSearch(value: string) {
    window.dispatchEvent(new CustomEvent('opp-hub-search', { detail: value.trim() }));
  }

  function syncUrl(value: string) {
    const trimmed = value.trim();
    const params = new URLSearchParams(searchParams.toString());
    if (trimmed) params.set('q', trimmed);
    else params.delete('q');
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    dispatchSearch(trimmed);
    syncUrl(trimmed);
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    dispatchSearch(value);
  }

  const displayName = user?.name ?? 'Toronto Community Health';
  const avatarSrc = user?.avatarUrl ?? orgAvatar.src;

  return (
    <>
      {/* Desktop — Figma Frame 25 / admin Navbar search */}
      <header className="sticky top-0 z-20 hidden h-[86px] shrink-0 items-center border-b border-[#EEF2F8] bg-white/90 px-10 py-5 backdrop-blur-[5px] md:flex">
        <form onSubmit={handleSearch} className="flex min-w-0 flex-1">
          <div className="anchor-search-nav w-full max-w-[520px] gap-2.5">
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
              <Search className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" aria-hidden />
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Search opportunities, applications or applicants…"
                className="no-anchor-field min-w-0 flex-1 bg-transparent font-sans text-base text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
                aria-label="Search opportunities, applications or applicants"
              />
            </div>
            <div className="flex shrink-0 items-center gap-2.5 text-[#44516A]" aria-hidden>
              <Command className="h-[18px] w-[18px]" strokeWidth={1.75} />
              <span className="font-sans text-lg leading-none">K</span>
            </div>
          </div>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-5">
          {/* Bell + badge, messages, avatar stack — Figma Frame 23 */}
          <div className="flex items-center gap-5">
            <Link
              href="/notifications"
              className="relative flex h-8 w-8 items-center justify-center text-[#44516A] hover:text-[#0F172A]"
              aria-label={`Notifications${unreadNotifications ? `, ${unreadNotifications} unread` : ''}`}
            >
              <Bell className="h-[21px] w-[21px]" strokeWidth={1.75} />
              {unreadNotifications > 0 ? (
                <span className="absolute -right-0.5 top-0 flex h-[10px] min-w-[12px] items-center justify-center rounded-[5px] bg-[#EF4444] px-0.5 text-[9px] font-medium leading-none text-white">
                  {unreadNotifications > 99 ? '99+' : unreadNotifications}
                </span>
              ) : null}
            </Link>

            <Link
              href="/messages"
              className="relative flex h-8 w-8 items-center justify-center text-[#44516A] hover:text-[#0F172A]"
              aria-label={`Messages${unreadMessages ? `, ${unreadMessages} unread` : ''}`}
            >
              <MessageCircle className="h-[21px] w-[21px]" strokeWidth={1.75} />
              {unreadMessages > 0 ? (
                <span className="absolute -right-0.5 top-0 flex h-[10px] min-w-[12px] items-center justify-center rounded-[5px] bg-[#EF4444] px-0.5 text-[9px] font-medium leading-none text-white">
                  {unreadMessages > 99 ? '99+' : unreadMessages}
                </span>
              ) : null}
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
