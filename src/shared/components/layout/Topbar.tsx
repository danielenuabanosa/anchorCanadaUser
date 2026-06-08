'use client';

import { Menu, Bell, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { Avatar } from '@/shared/components/ui/Avatar';
import { Button } from '@/shared/components/ui/Button';
import Link from 'next/link';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard':     'Dashboard',
  '/opportunities': 'Opportunities',
  '/categories':    'Categories',
  '/saved':         'Saved',
  '/profile':       'Profile',
};

function getTitle(pathname: string): string {
  const base = '/' + pathname.split('/')[1];
  return PAGE_TITLES[base] ?? 'Anchor Canada';
}

export function Topbar() {
  const pathname = usePathname();
  const { setSidebarMobileOpen } = useUIStore();
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-4 border-b border-neutral-200 bg-white px-6">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon-sm"
        className="md:hidden"
        onClick={() => setSidebarMobileOpen(true)}
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Page title */}
      <h1 className="flex-1 text-base font-semibold text-neutral-900">
        {getTitle(pathname)}
      </h1>

      {/* Search shortcut */}
      <Link
        href="/opportunities"
        className="hidden items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-400 transition hover:border-brand-300 hover:text-neutral-600 md:flex"
        aria-label="Search opportunities"
      >
        <Search className="h-4 w-4" />
        <span>Search opportunities…</span>
        <kbd className="rounded border border-neutral-200 bg-white px-1.5 py-0.5 text-xs text-neutral-400">
          /
        </kbd>
      </Link>

      {/* Notifications */}
      <Button variant="ghost" size="icon-sm" aria-label="Notifications" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-brand-600" aria-hidden="true" />
      </Button>

      {/* Avatar */}
      <Link href="/profile" aria-label="Go to profile">
        <Avatar
          src={user?.avatarUrl}
          fallback={user?.name ?? 'U'}
          size="sm"
          className="cursor-pointer ring-2 ring-transparent transition hover:ring-brand-300"
        />
      </Link>
    </header>
  );
}
