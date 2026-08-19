'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Bell, MessageCircle } from 'lucide-react';
import { StartBuilderDropdown } from '@/features/opportunity-builder/components/StartBuilderDropdown';
import { TopbarSearchField } from '@/shared/components/layout/TopbarSearchField';
import { useTopbarSearchShortcut } from '@/shared/components/layout/useTopbarSearchShortcut';
import {
  useProviderUnreadMessageCount,
  useProviderUnreadNotificationCount,
} from '@/features/messages/hooks/useUnreadCounts';
import { TeamAvatarStack } from '@/shared/components/layout/TeamAvatarStack';

/**
 * Figma hub header Frame 25 (132:675): 110px bar, search + ⌘K left,
 * bell / messages / avatar stack / Start Opportunity Builder right.
 */
export function OpportunityManagementTopbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const { data: unreadNotifications = 0 } = useProviderUnreadNotificationCount();
  const { data: unreadMessages = 0 } = useProviderUnreadMessageCount();

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  useTopbarSearchShortcut('/opportunities');

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

  return (
    <>
      {/* Desktop — matches user panel topbar search */}
      <header className="sticky top-0 z-20 hidden h-[86px] shrink-0 items-center justify-between border-b border-[#EEF2F8] bg-white/90 px-10 py-5 backdrop-blur-[5px] md:flex">
        <form onSubmit={handleSearch} className="min-w-0 flex-1 max-w-[520px] shrink">
          <TopbarSearchField value={query} onChange={handleQueryChange} />
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

            <TeamAvatarStack />
          </div>

          {/* Start Opportunity Builder — far right, Figma Frame 21 */}
          <StartBuilderDropdown />
        </div>
      </header>
    </>
  );
}
