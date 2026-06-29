'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { ElementType } from 'react';
import {
  LayoutDashboard,
  BadgeCheck,
  FileText,
  BarChart3,
  Users,
  MessageSquare,
  Bell,
  Building2,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  CircleCheckBig,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouteHash } from '@/shared/hooks/useRouteHash';
import { isNavActive } from '@/shared/lib/navActive';
import { useAuthStore } from '@/store/authStore';
import { Avatar } from '@/shared/components/ui/Avatar';
import anchorLogo from '@assets/icons/anchor-logo-full.png';
import orgAvatar from '@assets/images/prov-sickkids.png';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Opportunities', href: '/opportunities', icon: BadgeCheck },
  { label: 'Applications', href: '/applications', icon: FileText },
  { label: 'Providers Team', href: '/team', icon: Users },
  { label: 'Analytics', href: '/dashboard#analytics', icon: BarChart3 },
  { label: 'Messages', href: '/dashboard#messages', icon: MessageSquare, badge: 3 },
  { label: 'Notifications', href: '/dashboard#notifications', icon: Bell, badge: 12 },
  { label: 'Organization Profile', href: '/dashboard#profile', icon: Building2 },
  { label: 'Settings', href: '/dashboard#settings', icon: Settings },
] as const;

const BOTTOM_NAV = [
  { label: 'Help Center', href: '/dashboard#support', icon: HelpCircle },
  { label: 'Logout', href: '/login', icon: LogOut },
] as const;

function NavItem({
  label,
  href,
  icon: Icon,
  badge,
  active,
}: {
  label: string;
  href: string;
  icon: ElementType;
  badge?: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'relative flex h-14 w-full max-w-[320px] items-center gap-4 rounded-[10px] px-4 transition-colors',
        active ? 'bg-[#2F66C8] text-white' : 'text-[#94A3B8] hover:bg-[#1E293B] hover:text-white',
      )}
    >
      <Icon className="h-6 w-6 shrink-0" strokeWidth={1.75} aria-hidden />
      <span className="flex-1 text-base font-medium leading-[21px]">{label}</span>
      {badge ? (
        <span
          className={cn(
            'flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-sm font-medium',
            active ? 'bg-white/20 text-white' : 'bg-[#2F66C8] text-white',
          )}
        >
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const hash = useRouteHash();
  const { user, isAuthenticated } = useAuthStore();

  const orgName = user?.name ?? 'Maple Future Nonprofit';
  const avatarSrc = user?.avatarUrl ?? orgAvatar.src;

  if (!isAuthenticated) return null;

  return (
    <aside
      className="app-sidebar relative z-30 hidden h-screen w-[360px] shrink-0 flex-col bg-[#0F172A] md:flex"
      aria-label="Provider navigation"
    >
      {/* Figma Frame 26 — logo + Provider Portal label, 110px */}
      <div className="flex h-[110px] shrink-0 flex-col justify-center px-5">
        <Link href="/dashboard" aria-label="Anchor Canada Provider Portal" className="inline-flex w-fit">
          <Image
            src={anchorLogo}
            alt="Anchor Canada"
            width={153}
            height={50}
            priority
            className="h-[50px] w-auto"
          />
        </Link>
        <p className="mt-1 pl-[51px] text-[13px] leading-[13px] text-[#8C97AD]">Provider Portal</p>
      </div>

      {/* Primary nav — Figma 320×56 items, 10px gap */}
      <nav className="flex flex-1 flex-col px-5" aria-label="Primary">
        <div className="flex flex-col gap-2.5">
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
              />
            );
          })}
        </div>

        <div className="mt-auto flex flex-col gap-2.5 pb-4 pt-6">
          {BOTTOM_NAV.map(({ label, href, icon }) => (
            <NavItem
              key={href}
              label={label}
              href={href}
              icon={icon}
              active={isNavActive(pathname, href, hash)}
            />
          ))}

          {/* Figma Frame 38 — org identity card #1C2436 */}
          <Link
            href="/dashboard#profile"
            className="mt-2 flex h-[78px] w-full max-w-[320px] items-center gap-3 rounded-[10px] bg-[#1C2436] px-4 transition hover:bg-[#243047]"
          >
            <Avatar
              src={avatarSrc}
              fallback={orgName}
              size="sm"
              className="h-[46px] w-[46px] shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-medium leading-[21px] text-white">{orgName}</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[13px] leading-4 text-[#8C97AD]">
                <CircleCheckBig className="h-3 w-3 shrink-0 text-[#2F66C8]" strokeWidth={2.5} />
                Verified Organization
              </p>
            </div>
            <ChevronRight className="h-6 w-6 shrink-0 text-[#64748B]" strokeWidth={1.75} />
          </Link>
        </div>
      </nav>
    </aside>
  );
}
