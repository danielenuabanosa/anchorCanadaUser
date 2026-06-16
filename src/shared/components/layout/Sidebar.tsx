'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  LayoutList,
  FileText,
  BarChart3,
  Users,
  Settings,
  ChevronRight,
  ChevronsLeft,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { Avatar } from '@/shared/components/ui/Avatar';
import anchorLogo from '@assets/icons/anchor-logo-full.png';
import sidebarBgImg from '@assets/images/sidebar_bg.png';
import orgAvatar from '@assets/images/prov-sickkids.png';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Opportunities', href: '/dashboard#listings', icon: LayoutList },
  { label: 'Applications', href: '/dashboard#applications', icon: FileText, badge: 18 },
  { label: 'Analytics', href: '/dashboard#analytics', icon: BarChart3 },
  { label: 'Team', href: '/dashboard#team', icon: Users },
  { label: 'Settings', href: '/dashboard#settings', icon: Settings },
] as const;

function isNavActive(pathname: string, href: string) {
  if (href.startsWith('/dashboard#')) {
    return pathname === '/dashboard';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { user, isAuthenticated } = useAuthStore();

  const displayName = user?.name ?? 'Toronto Community Health';
  const avatarSrc = user?.avatarUrl ?? orgAvatar.src;

  if (!isAuthenticated) return null;

  return (
    <aside
      className={cn(
        'app-sidebar relative hidden h-screen flex-col border-r border-[#EEF2F8] bg-white md:flex',
        sidebarCollapsed && 'app-sidebar-collapsed',
      )}
      aria-label="Provider navigation"
    >
      <div
        className={cn(
          'flex h-[86px] shrink-0 items-center border-b border-[#EEF2F8] px-5',
          sidebarCollapsed ? 'justify-center' : 'justify-between',
        )}
      >
        <Link href="/dashboard" aria-label="Anchor Canada Provider Portal">
          <Image
            src={anchorLogo}
            alt="Anchor Canada"
            height={50}
            priority
            className={cn('w-auto', sidebarCollapsed ? 'h-8' : 'h-[50px]')}
          />
        </Link>
        {!sidebarCollapsed && (
          <button
            type="button"
            onClick={toggleSidebar}
            className="flex h-[34px] w-[34px] items-center justify-center rounded-md border border-[#EEF2F8] text-[#44516A] transition hover:bg-[#F8FAFC]"
            aria-label="Collapse sidebar"
          >
            <ChevronsLeft className="h-[18px] w-[18px]" />
          </button>
        )}
      </div>

      {!sidebarCollapsed && (
        <div className="border-b border-[#EEF2F8] px-5 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8C97AD]">
            Provider Portal
          </p>
        </div>
      )}

      <nav className="space-y-1 px-5 py-5" aria-label="Primary">
        {NAV_ITEMS.map(({ label, href, icon: Icon, ...rest }) => {
          const badge = 'badge' in rest ? rest.badge : undefined;
          const isActive = isNavActive(pathname, href);

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex items-center gap-5 rounded-[10px] px-4 py-4 text-base font-medium transition-colors',
                isActive
                  ? 'bg-[#2F66C8] text-white'
                  : 'text-[#44516A] hover:bg-[#F8FAFC]',
                sidebarCollapsed && 'justify-center px-2',
              )}
              title={sidebarCollapsed ? label : undefined}
            >
              <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1">{label}</span>
                  {badge ? (
                    <span
                      className={cn(
                        'flex h-6 min-w-6 items-center justify-center rounded-xl px-1.5 text-base',
                        isActive ? 'bg-white/20 text-white' : 'bg-[#2F66C8] text-white',
                      )}
                    >
                      {badge}
                    </span>
                  ) : null}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {!sidebarCollapsed && (
        <div className="mx-5 mb-5 shrink-0">
          <div className="relative flex h-[240px] flex-col justify-end overflow-hidden rounded-[10px] border border-[#D9E1EF] p-5">
            <Image src={sidebarBgImg} alt="" fill className="object-cover" aria-hidden="true" />
            <div
              className="absolute inset-0 rounded-[10px]"
              style={{
                background:
                  'linear-gradient(188deg, rgba(255,255,255,0) 39%, rgb(239,244,255) 60%)',
              }}
            />
            <div className="relative z-10">
              <p className="font-serif text-[28px] leading-[56px] text-[#0F172A]">Need help?</p>
              <p className="mb-6 text-base text-[#44516A]">
                Our team can help you manage listings and review applications
              </p>
              <Link
                href="/dashboard#support"
                className="inline-flex items-center gap-3 text-sm font-semibold text-[#2F66C8] hover:underline"
              >
                Contact Support
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <div
        className={cn(
          'mt-auto shrink-0 border-t border-[#EEF2F8] p-5',
          sidebarCollapsed && 'flex justify-center',
        )}
      >
        <Link
          href="/dashboard#profile"
          className={cn(
            'flex items-center rounded-[10px] border border-[#EEF2F8] transition hover:bg-[#F8FAFC]',
            sidebarCollapsed
              ? 'justify-center p-2 shadow-none'
              : 'justify-between px-2.5 py-4 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]',
          )}
        >
          <div className="flex min-w-0 items-center gap-3.5">
            <Avatar
              src={avatarSrc}
              fallback={displayName}
              size="sm"
              className="h-[46px] w-[46px] shrink-0"
            />
            {!sidebarCollapsed && (
              <div className="min-w-0">
                <p className="truncate text-base font-medium text-[#0F172A]">{displayName}</p>
                <p className="text-xs text-[#2F66C8]">Organization Profile</p>
              </div>
            )}
          </div>
          {!sidebarCollapsed && (
            <ChevronRight className="h-6 w-6 shrink-0 text-[#8C97AD]" />
          )}
        </Link>
      </div>

      {sidebarCollapsed && (
        <button
          type="button"
          onClick={toggleSidebar}
          className="absolute -right-3 top-24 hidden h-6 w-6 items-center justify-center rounded-full border border-[#D9E1EF] bg-white text-[#44516A] shadow-sm hover:text-[#0F172A] md:flex"
          aria-label="Expand sidebar"
        >
          <ChevronRight className="h-3 w-3" />
        </button>
      )}
    </aside>
  );
}
