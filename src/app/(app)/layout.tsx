'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from '@/shared/components/layout/Sidebar';
import { Topbar } from '@/shared/components/layout/Topbar';
import { OpportunityManagementTopbar } from '@/shared/components/layout/OpportunityManagementTopbar';
import { BottomNav } from '@/shared/components/layout/BottomNav';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { SidebarProvider } from '@/shared/context/SidebarContext';
import { useAuthStore } from '@/store/authStore';
import { isStaticMode } from '@/lib/staticMode';
import { cn } from '@/lib/utils';
import { isHubListPage, usesOpportunityManagementTopbar } from '@/shared/lib/hubRoutes';
import { HelpCenterRoot } from '@/features/help-center/HelpCenterRoot';

function resolveTopbar(pathname: string) {
  if (pathname === '/logout') return null;
  if (pathname.startsWith('/opportunities/create')) {
    return (
      <div className="md:hidden">
        <Topbar />
      </div>
    );
  }
  // Application / Team member details use their own sticky Back / Previous / Next header.
  if (/^\/applications\/[^/]+$/.test(pathname) || /^\/team\/[^/]+$/.test(pathname)) {
    return (
      <div className="md:hidden">
        <Topbar />
      </div>
    );
  }
  if (usesOpportunityManagementTopbar(pathname)) {
    return (
      <>
        <div className="md:hidden">
          <Topbar />
        </div>
        <div className="hidden md:block">
          <OpportunityManagementTopbar />
        </div>
      </>
    );
  }
  return <Topbar />;
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (isStaticMode()) return;
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated) return null;
  if (!isStaticMode() && !isAuthenticated) return null;

  const topbar = resolveTopbar(pathname);
  const isBuilder = pathname.startsWith('/opportunities/create');
  const isOppManagementHub = isHubListPage(pathname);
  const isDetailPage =
    /^\/opportunities\/[^/]+$/.test(pathname) ||
    /^\/applications\/[^/]+$/.test(pathname) ||
    /^\/team\/[^/]+$/.test(pathname);

  return (
    <SidebarProvider>
      <div className="app-layout">
        <Sidebar />
        <div className={cn('app-main overflow-x-hidden', isBuilder && 'relative isolate')}>
          {topbar}
          <main
            className={cn(
              'flex-1 bg-[#FFFFFF]',
              pathname === '/logout' && 'bg-transparent p-0',
              pathname !== '/logout' &&
                (isBuilder
                  ? 'p-0 pb-[88px] md:pb-0'
                  : isOppManagementHub || isDetailPage
                    ? 'px-5 pt-0 pb-[88px] md:p-6 md:pb-6'
                    : 'px-5 py-4 pb-[88px] md:p-6 md:pb-6'),
            )}
          >
            <ErrorBoundary fallbackTitle="Unable to load this page">{children}</ErrorBoundary>
          </main>
          {pathname !== '/logout' ? <BottomNav /> : null}
        </div>
        <HelpCenterRoot />
      </div>
    </SidebarProvider>
  );
}
