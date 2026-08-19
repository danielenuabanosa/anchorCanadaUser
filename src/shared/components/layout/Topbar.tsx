'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Bell, ChevronDown, MessageCircle, Settings } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Avatar } from '@/shared/components/ui/Avatar';
import { StartBuilderDropdown } from '@/features/opportunity-builder/components/StartBuilderDropdown';
import { TopbarSearchField } from '@/shared/components/layout/TopbarSearchField';
import { useTopbarSearchShortcut } from '@/shared/components/layout/useTopbarSearchShortcut';
import { TeamAvatarStack } from '@/shared/components/layout/TeamAvatarStack';
import { useOrgBrandingStore } from '@/store/orgBrandingStore';
import { photoSrc } from '@/shared/lib/photoSrc';
import {
  useProviderUnreadMessageCount,
  useProviderUnreadNotificationCount,
} from '@/features/messages/hooks/useUnreadCounts';
import anchorLogoFull from '@assets/icons/anchor-logo-full.png';

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  const display = count > 99 ? '99+' : String(count);
  return (
    <span className="absolute -right-0.5 top-0 flex h-[10px] min-w-[12px] items-center justify-center rounded-[5px] bg-[#EF4444] px-0.5 text-[9px] font-medium leading-none text-white">
      {display}
    </span>
  );
}

/** search, team avatars, Create Opportunity. */
export function Topbar() {
  const { user } = useAuthStore();
  const orgLogo = useOrgBrandingStore((s) => s.logoUrl);
  const orgName = useOrgBrandingStore((s) => s.organizationName);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const { data: unreadNotifications = 0 } = useProviderUnreadNotificationCount();
  const { data: unreadMessages = 0 } = useProviderUnreadMessageCount();

  useEffect(() => {
    if (
      pathname.startsWith('/opportunities') ||
      pathname.startsWith('/applications') ||
      pathname.startsWith('/categories')
    ) {
      setQuery(searchParams.get('q') ?? '');
    }
  }, [pathname, searchParams]);

  useTopbarSearchShortcut('/opportunities');

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    // Prefer searching the current hub context; otherwise go to opportunities.
    if (pathname.startsWith('/applications')) {
      router.push(`/applications?q=${encodeURIComponent(q)}`);
      window.dispatchEvent(new CustomEvent('opp-hub-search', { detail: q }));
      return;
    }
    if (pathname.startsWith('/categories')) {
      router.push(`/categories?q=${encodeURIComponent(q)}`);
      return;
    }
    router.push(`/opportunities?q=${encodeURIComponent(q)}`);
    window.dispatchEvent(new CustomEvent('opp-hub-search', { detail: q }));
  }

  const displayName = orgName || user?.name || 'Organization';
  const avatarSrc = photoSrc(user?.avatarUrl) || photoSrc(orgLogo);

  return (
    <>
      {/* Mobile —]*/}
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
              style={{ width: 'auto', height: 'auto' }}
            />
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href="/settings"
              className="text-[#44516A] transition-colors hover:text-[#0F172A]"
              aria-label="Settings"
            >
              <Settings className="h-[22px] w-[22px]" strokeWidth={1.75} />
            </Link>
            <Link
              href="/notifications"
              className="relative inline-flex h-[21px] w-[21px] shrink-0 items-center justify-center text-[#44516A] transition-colors hover:text-[#0F172A]"
              aria-label={`Notifications${unreadNotifications ? `, ${unreadNotifications} unread` : ''}`}
            >
              <Bell className="h-[21px] w-[21px]" strokeWidth={1.75} />
              {unreadNotifications > 0 ? (
                <span className="absolute left-[12.5px] top-[1.5px] flex h-2.5 min-w-2.5 items-center justify-center rounded-[5px] border-[1.4px] border-white bg-[#EF4444] px-0.5 text-[6.5px] font-normal leading-none text-white">
                  {unreadNotifications > 99 ? '99+' : unreadNotifications}
                </span>
              ) : null}
            </Link>
            <Link
              href="/organization-profile"
              className="flex items-center gap-2.5 text-[#44516A] transition-colors hover:text-[#0F172A]"
              aria-label="Profile"
            >
              <Avatar src={avatarSrc} fallback={displayName} size="sm" className="h-[26px] w-[26px]" />
              <ChevronDown className="h-3.5 w-3.5 text-[#8C97AD]" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </header>

      {/* Desktop — matches user panel topbar search */}
      <header className="sticky top-0 z-20 hidden h-[86px] shrink-0 items-center justify-between border-b border-[#EEF2F8] bg-white/90 px-10 py-5 backdrop-blur-[5px] md:flex">
        <form onSubmit={handleSearch} className="min-w-0 flex-1 max-w-[520px] shrink">
          <TopbarSearchField value={query} onChange={setQuery} />
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-5">
          <Link
            href="/notifications"
            className="relative flex h-8 w-8 items-center justify-center text-[#44516A]"
            aria-label={`Notifications${unreadNotifications ? `, ${unreadNotifications} unread` : ''}`}
          >
            <Bell className="h-[21px] w-[21px]" strokeWidth={1.75} />
            <CountBadge count={unreadNotifications} />
          </Link>
          <Link
            href="/messages"
            className="relative flex h-8 w-8 items-center justify-center text-[#44516A]"
            aria-label={`Messages${unreadMessages ? `, ${unreadMessages} unread` : ''}`}
          >
            <MessageCircle className="h-[21px] w-[21px]" strokeWidth={1.75} />
            <CountBadge count={unreadMessages} />
          </Link>
          <TeamAvatarStack />
          <StartBuilderDropdown label="Create Opportunity" />
        </div>
      </header>
    </>
  );
}
