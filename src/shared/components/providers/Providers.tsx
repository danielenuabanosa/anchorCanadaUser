'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthSessionProvider } from '@/features/auth/components/AuthSessionProvider';
import { StaticModeBootstrap } from '@/shared/components/providers/StaticModeBootstrap';
import { HelpCenterRoot } from '@/features/help-center/HelpCenterRoot';
import { queryClient } from '@/lib/queryClient';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthSessionProvider>
        <StaticModeBootstrap />
        {children}
        <HelpCenterRoot />
      </AuthSessionProvider>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
