'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { ElementType } from 'react';
import {
  House,
  BadgeCheck,
  FileText,
  ChartPie,
  Users,
  Bell,
  Building2,
  Settings,
  CircleHelp,
  LogOut,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouteHash } from '@/shared/hooks/useRouteHash';
import { isNavActive } from '@/shared/lib/navActive';
import { useSidebar } from '@/shared/context/SidebarContext';
import { useAuthStore } from '@/store/authStore';
import { useHelpCenterStore } from '@/store/helpCenterStore';
import { isStaticMode } from '@/lib/staticMode';
import { Avatar } from '@/shared/components/ui/Avatar';
import anchorLogo from '@assets/icons/anchor-logo-full.png';
import orgAvatar from '@assets/images/prov-sickkids.png';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: House },
  { label: 'Opportunities', href: '/opportunities', icon: BadgeCheck },
  { label: 'Applications', href: '/applications', icon: FileText },
  { label: 'Providers Team', href: '/team', icon: Users },
  { label: 'Analytics', href: '/analytics', icon: ChartPie },
  { label: 'Notifications', href: '/notifications', icon: Bell, badge: 12 },
  { label: 'Organization Profile', href: '/organization-profile', icon: Building2 },
  { label: 'Settings', href: '/settings', icon: Settings },
] as const;

const BOTTOM_NAV = [
  { label: 'Help Center', href: '/help', icon: CircleHelp },
  { label: 'Logout', href: '/logout', icon: LogOut, logout: true },
] as const;

function NavBadge({ count, active }: { count: number; active: boolean }) {
  return (
    <span
      className={cn(
        'flex h-6 shrink-0 items-center justify-center rounded-xl px-[7px] pb-px pt-0.5 text-base leading-none',
        active ? 'bg-white text-[#2F66C8]' : 'bg-[#2F66C8] text-white',
      )}
    >
      {count}
    </span>
  );
}

function NavItem({
  label,
  href,
  icon: Icon,
  badge,
  active,
  logout,
  collapsed,
}: {
  label: string;
  href: string;
  icon: ElementType;
  badge?: number;
  active: boolean;
  logout?: boolean;
  collapsed?: boolean;
}) {
  const isLogoutActive = logout && active;

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      title={collapsed ? label : undefined}
      className={cn(
        'group flex w-full items-center rounded-[10px] p-4 transition-colors',
        collapsed ? 'justify-center' : badge ? 'justify-between' : 'gap-5',
        isLogoutActive
          ? 'bg-[#EF4444] text-white'
          : active
            ? 'bg-[#2F66C8] text-white'
            : 'text-[#8C97AD] hover:bg-[#1C2436] hover:text-white',
      )}
    >
      <span className={cn('flex min-w-0 items-center', collapsed ? 'justify-center' : 'gap-5', badge && !collapsed && 'max-w-[240px] flex-1')}>
        <Icon
          className={cn(
            'h-6 w-6 shrink-0',
            active || isLogoutActive ? 'text-white' : 'text-[#8C97AD] group-hover:text-white',
          )}
          strokeWidth={1.75}
          aria-hidden
        />
        {!collapsed ? (
          <span className={cn('truncate text-base leading-none', active ? 'font-medium' : 'font-normal')}>
            {label}
          </span>
        ) : null}
      </span>
      {!collapsed && badge ? <NavBadge count={badge} active={active} /> : null}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const hash = useRouteHash();
  const { collapsed, toggleCollapsed } = useSidebar();
  const { user, isAuthenticated } = useAuthStore();
  const helpCenterOpen = useHelpCenterStore((s) => s.isOpen || s.reportOpen);
  const openHelpCenter = useHelpCenterStore((s) => s.open);

  const orgName = user?.name ?? 'Maple Future Nonprofit';
  const avatarSrc = user?.avatarUrl ?? orgAvatar.src;

  if (!isStaticMode() && !isAuthenticated) return null;

  return (
    <aside
      className={cn(
        'app-sidebar relative z-30 hidden shrink-0 flex-col justify-between border-r border-[#EEF2F8] bg-[#0F172A] md:flex',
        collapsed && 'app-sidebar-collapsed',
      )}
      aria-label="Provider navigation"
    >
      <div className="flex w-full shrink-0 flex-col">
        <div className={cn('shrink-0 border-b border-[#2F3B52] px-5 py-[30px]', collapsed && 'px-3')}>
          <div className={cn('flex items-start', collapsed ? 'flex-col items-center gap-3' : 'justify-between gap-2')}>
            <Link href="/dashboard" aria-label="Anchor Canada Provider Portal" className="relative inline-flex flex-col gap-2.5">
              <Image
                src={anchorLogo}
                alt="Anchor Canada"
                width={153}
                height={50}
                priority
                className={cn('h-[50px] w-auto', collapsed && 'h-10 w-10 object-cover object-left')}
              />
              {!collapsed ? (
                <span className="absolute left-[51px] top-9 text-[10px] font-medium leading-none text-[#8C97AD]">
                  Provider Portal
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="rounded-[8px] p-2 text-[#8C97AD] transition-colors hover:bg-[#1C2436] hover:text-white"
            >
              {collapsed ? (
                <PanelLeftOpen className="h-5 w-5" strokeWidth={1.75} />
              ) : (
                <PanelLeftClose className="h-5 w-5" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>

        <nav className={cn('flex flex-col gap-2.5 p-5', collapsed && 'px-2')} aria-label="Primary">
          {NAV_ITEMS.map(({ label, href, icon, ...rest }) => {
            const badge = 'badge' in rest ? rest.badge : undefined;
            return (
              <NavItem
                key={href}
                label={label}
                href={href}
                icon={icon}
                badge={badge}
                active={isNavActive(pathname, href, hash)}
                collapsed={collapsed}
              />
            );
          })}
        </nav>
      </div>

      <div className="flex w-full shrink-0 flex-col">
        <div className={cn('flex flex-col gap-2.5 p-5', collapsed && 'px-2')}>
          {BOTTOM_NAV.map(({ label, href, icon, ...rest }) => {
            const logout = 'logout' in rest ? rest.logout : undefined;
            const active = href === '/help' ? helpCenterOpen : isNavActive(pathname, href, hash);

            if (href === '/help') {
              return (
                <button
                  key={href}
                  type="button"
                  onClick={() => openHelpCenter()}
                  title={collapsed ? label : undefined}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group flex w-full items-center rounded-[10px] p-4 transition-colors',
                    collapsed ? 'justify-center' : 'gap-5',
                    active
                      ? 'bg-[#2F66C8] text-white'
                      : 'text-[#8C97AD] hover:bg-[#1C2436] hover:text-white',
                  )}
                >
                  <CircleHelp
                    className={cn('h-6 w-6 shrink-0', active ? 'text-white' : 'text-[#8C97AD] group-hover:text-white')}
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  {!collapsed ? (
                    <span className={cn('truncate text-base leading-none', active ? 'font-medium' : 'font-normal')}>
                      {label}
                    </span>
                  ) : null}
                </button>
              );
            }

            return (
              <NavItem
                key={href}
                label={label}
                href={href}
                icon={icon}
                active={active}
                logout={logout}
                collapsed={collapsed}
              />
            );
          })}
        </div>

        <div className={cn('p-5 pt-0', collapsed && 'px-2')}>
          <Link
            href="/organization-profile"
            title={collapsed ? orgName : undefined}
            className={cn(
              'flex w-full items-center rounded-[10px] border border-[#2F3B52] bg-[#1C2436] px-2.5 py-4 shadow-[0px_2px_4px_rgba(0,0,0,0.05)] transition-colors hover:bg-[#243047]',
              collapsed ? 'justify-center' : 'justify-between',
            )}
          >
            <div className={cn('flex min-w-0 items-center', collapsed ? '' : 'flex-1 gap-3.5')}>
              <Avatar
                src={avatarSrc}
                fallback={orgName}
                size="sm"
                className="h-[46px] w-[46px] shrink-0"
              />
              {!collapsed ? (
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-medium leading-none text-white">{orgName}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs leading-none text-[#8C97AD]">
                    Verified Organization
                    <ShieldCheck className="h-3 w-3 shrink-0 text-[#2F66C8]" strokeWidth={2.5} aria-hidden />
                  </p>
                </div>
              ) : null}
            </div>
            {!collapsed ? (
              <ChevronRight className="h-6 w-6 shrink-0 text-[#8C97AD]" strokeWidth={1.75} aria-hidden />
            ) : null}
          </Link>
        </div>
      </div>
    </aside>
  );
}
