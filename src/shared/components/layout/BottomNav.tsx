'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BadgeCheck,
  FileText,
  MessageSquare,
  LayoutGrid,
  BarChart3,
  Settings,
  Bell,
  Building2,
  HelpCircle,
  LogOut,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouteHash } from '@/shared/hooks/useRouteHash';
import { isNavActive } from '@/shared/lib/navActive';

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/opportunities', icon: BadgeCheck, label: 'Opportunities' },
  { href: '/applications', icon: FileText, label: 'Applications' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
] as const;

const MORE_ITEMS = [
  { href: '/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/notifications', icon: Bell, label: 'Notifications' },
  { href: '/help', icon: HelpCircle, label: 'Help Center' },
  { href: '/organization-profile', icon: Building2, label: 'Organization Profile' },
  { href: '/settings', icon: Settings, label: 'Settings' },
  { href: '/logout', icon: LogOut, label: 'Logout' },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const hash = useRouteHash();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#EEF2F8] bg-[#0F172A] p-2.5 md:hidden"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center gap-0">
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
            onClick={() => setMoreOpen(true)}
            className="flex min-w-0 flex-1 flex-col items-center justify-center gap-3 rounded-[10px] p-2.5"
            aria-label="More options"
          >
            <LayoutGrid className="h-[22px] w-[22px] text-[#8C97AD]" strokeWidth={1.75} />
            <span className="text-xs leading-none text-[#8C97AD]">More</span>
          </button>
        </div>
      </nav>

      {moreOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="More navigation">
          <button type="button" className="absolute inset-0 bg-black/30" onClick={() => setMoreOpen(false)} aria-label="Close menu" />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-[16px] bg-white p-5 pb-8">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-base font-medium text-[#0F172A]">More</p>
              <button type="button" onClick={() => setMoreOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#44516A] hover:bg-[#F8FAFC]" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-1">
              {MORE_ITEMS.map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-4 rounded-[10px] px-4 py-3.5 text-base text-[#44516A] hover:bg-[#F8FAFC]"
                >
                  <Icon className="h-5 w-5 text-[#2F66C8]" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
