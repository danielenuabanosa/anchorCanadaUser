'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BadgeCheck,
  FileText,
  MessageSquare,
  Grid2x2Plus,
  Users,
  Building2,
  HelpCircle,
  ChartPie,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouteHash } from '@/shared/hooks/useRouteHash';
import { isNavActive } from '@/shared/lib/navActive';
import { useHelpCenterStore } from '@/store/helpCenterStore';

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/opportunities', icon: BadgeCheck, label: 'Opportunities' },
  { href: '/applications', icon: FileText, label: 'Applications' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
] as const;

/** Figma 95:750 — More popover items */
const MORE_ITEMS = [
  { href: '/team', icon: Users, label: 'Provider Team' },
  { href: '/organization-profile', icon: Building2, label: 'Profile' },
  { href: '/help', icon: HelpCircle, label: 'Help Center' },
  { href: '/analytics', icon: ChartPie, label: 'Analytics' },
  { href: '/logout', icon: LogOut, label: 'Logout' },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const hash = useRouteHash();
  const [moreOpen, setMoreOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const helpCenterOpen = useHelpCenterStore((s) => s.isOpen || s.reportOpen);
  const openHelpCenter = useHelpCenterStore((s) => s.open);

  const moreActive = helpCenterOpen || MORE_ITEMS.some(({ href }) => isNavActive(pathname, href, hash));

  useEffect(() => {
    if (!moreOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [moreOpen]);

  return (
    <nav
      ref={navRef}
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#EEF2F8] bg-[#0F172A] p-2.5 md:hidden"
      aria-label="Mobile navigation"
    >
      {moreOpen ? (
        <div className="absolute bottom-full left-2.5 right-2.5 mb-2.5 rounded-[12px] bg-[#0F172A] p-2.5 shadow-[0px_12px_32px_rgba(0,0,0,0.12)]">
          <div className="flex flex-wrap justify-between gap-y-2.5">
            {MORE_ITEMS.map(({ href, icon: Icon, label }) => {
              const active = href === '/help' ? helpCenterOpen : isNavActive(pathname, href, hash);

              if (href === '/help') {
                return (
                  <button
                    key={href}
                    type="button"
                    onClick={() => {
                      openHelpCenter();
                      setMoreOpen(false);
                    }}
                    aria-current={active ? 'page' : undefined}
                    className="flex w-[23%] min-w-[72px] max-w-[105px] flex-col items-center justify-center gap-3 rounded-[10px] p-2.5"
                  >
                    <Icon
                      className={cn('h-[22px] w-[22px]', active ? 'text-white' : 'text-[#8C97AD]')}
                      strokeWidth={1.75}
                    />
                    <span className={cn('text-center text-xs leading-none', active ? 'text-white' : 'text-[#8C97AD]')}>
                      {label}
                    </span>
                  </button>
                );
              }

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMoreOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className="flex w-[23%] min-w-[72px] max-w-[105px] flex-col items-center justify-center gap-3 rounded-[10px] p-2.5"
                >
                  <Icon
                    className={cn('h-[22px] w-[22px]', active ? 'text-white' : 'text-[#8C97AD]')}
                    strokeWidth={1.75}
                  />
                  <span className={cn('text-center text-xs leading-none', active ? 'text-white' : 'text-[#8C97AD]')}>
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="flex items-center">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = isNavActive(pathname, href, hash);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex min-w-0 flex-1 flex-col items-center justify-center gap-3 rounded-[10px] p-2.5',
                active ? 'bg-[#1C2436]' : '',
              )}
            >
              <Icon className={cn('h-[22px] w-[22px]', active ? 'text-white' : 'text-[#8C97AD]')} strokeWidth={1.75} />
              <span className={cn('text-xs leading-none', active ? 'text-white' : 'text-[#8C97AD]')}>{label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setMoreOpen((open) => !open)}
          aria-expanded={moreOpen}
          aria-label="More options"
          className={cn(
            'flex min-w-0 flex-1 flex-col items-center justify-center gap-3 rounded-[10px] p-2.5',
            moreOpen || moreActive ? 'bg-[#1C2436]' : '',
          )}
        >
          <Grid2x2Plus
            className={cn('h-[22px] w-[22px]', moreOpen || moreActive ? 'text-white' : 'text-[#8C97AD]')}
            strokeWidth={1.75}
          />
          <span className={cn('text-xs leading-none', moreOpen || moreActive ? 'text-white' : 'text-[#8C97AD]')}>
            More
          </span>
        </button>
      </div>
    </nav>
  );
}
