'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/shared/components/layout/Sidebar';
import { Topbar } from '@/shared/components/layout/Topbar';
import { BottomNav } from '@/shared/components/layout/BottomNav';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const { sidebarCollapsed } = useUIStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="app-layout">
      <Sidebar />
      <div
        className={cn(
          'app-main',
          sidebarCollapsed && 'app-main-collapsed'
        )}
      >
        <Topbar />
        <main className="flex-1 p-4 pb-24 md:p-6 md:pb-6">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}
