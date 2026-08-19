'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from '@/shared/components/layout/Sidebar';
import { Topbar } from '@/shared/components/layout/Topbar';
import { OpportunityManagementTopbar } from '@/shared/components/layout/OpportunityManagementTopbar';
import { BottomNav } from '@/shared/components/layout/BottomNav';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { SidebarProvider } from '@/shared/context/SidebarContext';
import { cn } from '@/lib/utils';
import { isHubListPage, usesOpportunityManagementTopbar } from '@/shared/lib/hubRoutes';
import { VerificationPendingModal } from '@/features/provider/components/VerificationPendingModal';
import { useAuthBootstrap } from '@/shared/hooks/useAuthBootstrap';
import { useOrgBrandingStore } from '@/store/orgBrandingStore';
import { promptUnverifiedProvider } from '@/store/verificationModalStore';
import { useAuthStore } from '@/store/authStore';

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
  const router = useRouter();
  const pathname = usePathname();
  const { ready, isAuthenticated, isOfflineMode } = useAuthBootstrap();
  const membership = useAuthStore((s) => s.user?.provider?.membership);

  // Only show the complete-profile / verification modal to the org owner or administrators,
  // not to invited team members (Manager, Reviewer, Interviewer, Coordinator, etc.)
  const isAdminOrOwner =
    !membership ||
    membership.isOwner ||
    ['administrator', 'manager'].includes((membership.role ?? '').toLowerCase());

  useEffect(() => {
    if (!ready || isOfflineMode || !isAuthenticated || !isAdminOrOwner) return;
    let cancelled = false;
    void (async () => {
      await useOrgBrandingStore.getState().load();
      if (cancelled) return;
      promptUnverifiedProvider();
    })();
    return () => {
      cancelled = true;
    };
  }, [ready, isAuthenticated, isOfflineMode, isAdminOrOwner]);

  useEffect(() => {
    if (!ready || isOfflineMode || !isAuthenticated || !isAdminOrOwner) return;
    if (pathname === '/logout' || pathname === '/help') return;
    if (pathname.startsWith('/organization-profile')) return;
    let cancelled = false;
    void (async () => {
      await useOrgBrandingStore.getState().load();
      if (cancelled) return;
      promptUnverifiedProvider();
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname, ready, isAuthenticated, isOfflineMode, isAdminOrOwner]);

  useEffect(() => {
    if (!ready) return;
    if (isOfflineMode) return;
    if (pathname === '/help') return;
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [ready, isOfflineMode, isAuthenticated, pathname, router]);

  if (!ready) return null;
  if (pathname !== '/help' && !isOfflineMode && !isAuthenticated) return null;

  if (pathname === '/help' && !isOfflineMode && !isAuthenticated) {
    return <>{children}</>;
  }

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
      </div>
      <VerificationPendingModal />
    </SidebarProvider>
  );
}
