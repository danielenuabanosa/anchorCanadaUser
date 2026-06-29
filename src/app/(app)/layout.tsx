'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from '@/shared/components/layout/Sidebar';
import { Topbar } from '@/shared/components/layout/Topbar';
import { OpportunityManagementTopbar } from '@/shared/components/layout/OpportunityManagementTopbar';
import { BottomNav } from '@/shared/components/layout/BottomNav';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';

function resolveTopbar(pathname: string) {
  if (pathname.startsWith('/opportunities/create')) {
    return (
      <div className="md:hidden">
        <Topbar />
      </div>
    );
  }
  if (pathname.startsWith('/opportunities') || pathname.startsWith('/applications') || pathname.startsWith('/team')) {
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
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated || !isAuthenticated) return null;

  const topbar = resolveTopbar(pathname);
  const isBuilder = pathname.startsWith('/opportunities/create');
  const isOppManagementHub =
    pathname === '/opportunities' || pathname === '/applications' || pathname === '/team';
  const isDetailPage =
    /^\/opportunities\/[^/]+$/.test(pathname) || /^\/applications\/[^/]+$/.test(pathname);
  const useHubBackground =
    !isBuilder &&
    (pathname.startsWith('/dashboard') ||
      pathname.startsWith('/opportunities') ||
      pathname.startsWith('/applications') ||
      pathname.startsWith('/team'));

  return (
    <div className="app-layout">
      <Sidebar />
      <div className={cn('app-main overflow-x-hidden', isBuilder && 'relative isolate')}>
        {topbar}
        <main
          className={cn(
            'flex-1',
            isBuilder
              ? 'p-0 pb-[88px] md:pb-0'
              : isOppManagementHub || isDetailPage
                ? 'px-5 pt-0 pb-[88px] md:p-6 md:pb-6'
                : 'px-5 py-4 pb-[88px] md:p-6 md:pb-6',
            useHubBackground && 'bg-white md:bg-[#F2F7FF]',
          )}
        >
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
