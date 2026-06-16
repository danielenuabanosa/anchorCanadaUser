'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  LayoutList,
  FileText,
  Users,
  MoreHorizontal,
  BarChart3,
  Settings,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard#listings', icon: LayoutList, label: 'Listings' },
  { href: '/dashboard#applications', icon: FileText, label: 'Applications' },
  { href: '/dashboard#team', icon: Users, label: 'Team' },
] as const;

const MORE_ITEMS = [
  { href: '/dashboard#analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/dashboard#settings', icon: Settings, label: 'Settings' },
] as const;

function isNavActive(pathname: string, href: string) {
  if (href.startsWith('/dashboard#')) {
    return pathname === '/dashboard';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function BottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#EEF2F8] bg-white p-2.5 md:hidden"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
            const active = isNavActive(pathname, href);

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className="flex min-w-0 flex-1 flex-col items-center justify-center gap-3 rounded-[10px] p-2.5"
              >
                <Icon
                  className={cn('h-[22px] w-[22px]', active ? 'text-[#2F66C8]' : 'text-[#44516A]')}
                  strokeWidth={1.75}
                />
                <span
                  className={cn(
                    'text-xs leading-none',
                    active ? 'text-[#2F66C8]' : 'text-[#44516A]',
                  )}
                >
                  {label}
                </span>
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            className="flex min-w-0 flex-1 flex-col items-center justify-center gap-3 rounded-[10px] p-2.5"
            aria-label="More options"
          >
            <MoreHorizontal className="h-[22px] w-[22px] text-[#44516A]" strokeWidth={1.75} />
            <span className="text-xs leading-none text-[#44516A]">More</span>
          </button>
        </div>
      </nav>

      {moreOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="More navigation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/30"
            onClick={() => setMoreOpen(false)}
            aria-label="Close menu"
          />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-[16px] bg-white p-5 pb-8">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-base font-medium text-[#0F172A]">More</p>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#44516A] hover:bg-[#F8FAFC]"
                aria-label="Close"
              >
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
