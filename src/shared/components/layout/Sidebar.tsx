'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Home,
  Compass,
  Building2,
  FileText,
  Bookmark,
  Bell,
  Save,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { Avatar } from '@/shared/components/ui/Avatar';
import anchorLogo from '@assets/icons/anchor-logo.png';
import logo from '@assets/icons/logo.png';
import sidebar_bg from '@assets/images/sidebar_bg.png';

const NAV_ITEMS = [
  { label: 'Home',                href: '/dashboard',     icon: Home },
  // { label: 'Explore',             href: '/opportunities', icon: Compass },
  { label: 'Providers',           href: '/categories',    icon: Building2 },
  { label: 'My Applications',     href: '/applications',  icon: FileText },
  { label: 'Saved Opportunities', href: '/saved',         icon: Bookmark },
  { label: 'Notifications',       href: '/notifications', icon: Bell, badge: 3 },
  { label: 'Saved Applications',   href: '/saved-applications',      icon: Save },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, sidebarMobileOpen, toggleSidebar, setSidebarMobileOpen } = useUIStore();
  const { user, clearAuth } = useAuthStore();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'app-sidebar flex flex-col',
          sidebarCollapsed && 'app-sidebar-collapsed',
          sidebarMobileOpen && 'open'
        )}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div
          className={cn(
            'flex h-16 shrink-0 items-center border-b border-white/10 px-4',
            sidebarCollapsed ? 'justify-center' : 'justify-between'
          )}
        >
          <Link href="/dashboard" aria-label="Anchor Canada home">
            <Image
              src={sidebarCollapsed ? logo : anchorLogo} 
              alt="Anchor Canada"
              height={36}
              priority
              className={cn('w-auto', sidebarCollapsed ? 'h-8' : 'h-9')}
            />
          </Link>
        </div>


        {/* Nav items */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4" aria-label="Primary">
          {NAV_ITEMS.map(({ label, href, icon: Icon, ...rest }) => {
            const badge = 'badge' in rest ? (rest as { badge?: number }).badge : undefined;
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[#2f66c8] text-white'
                    : 'text-neutral-400 hover:bg-[#2F66C8] hover:text-white',
                  sidebarCollapsed && 'justify-center px-2'
                )}
                title={sidebarCollapsed ? label : undefined}
              >
                <span className="relative shrink-0">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {badge && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-sm bg-red-500 text-[9px] font-bold text-white">
                      {badge}
                    </span>
                  )}
                </span>
                {!sidebarCollapsed && <span>{label}</span>}
                {!sidebarCollapsed && badge && (
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Support card */}
        {!sidebarCollapsed && (
          <div className="mx-3 mb-3 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#2f66c8] to-[#6b4fd8]">
            <div className="relative flex flex-col p-4">
              <div className="mb-2 h-16 w-full overflow-hidden rounded-xl">
                <Image
                  src={sidebar_bg}
                  alt=""
                  className="h-full w-full object-cover"
                  aria-hidden="true"
                />
              </div>
              <p className="mb-2 text-xs font-medium leading-snug text-white/90">
                Our team is here to help you complete your application
              </p>
              <Link
                href="/support"
                className="text-xs font-semibold text-white hover:text-white/80 transition-colors"
              >
                Contact Support →
              </Link>
            </div>
          </div>
        )}

        {/* User profile row */}
        <div className="shrink-0 border-t border-white/10 p-3">
          {!sidebarCollapsed && user && (
            <div className="mb-2 flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/8 transition-colors">
              <Avatar
                src={user.avatarUrl}
                fallback={user.name}
                size="sm"
                className="shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{user.name}</p>
                <Link
                  href="/profile"
                  className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  View Profile
                </Link>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-neutral-500" />
            </div>
          )}
          <button
            onClick={clearAuth}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-400 transition hover:bg-white/8 hover:text-white',
              sidebarCollapsed && 'justify-center px-2'
            )}
            title="Sign out"
          >
            <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
            {!sidebarCollapsed && <span>Sign out</span>}
          </button>
        </div>

        {/* Collapse toggle (desktop only) */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-5 hidden h-6 w-6 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm text-neutral-500 hover:text-neutral-700 md:flex"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </button>
      </aside>
    </>
  );
}
