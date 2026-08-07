'use client';

import { Suspense } from 'react';
import { useIsMdUp } from '@/shared/hooks/useMediaQuery';
import DesktopView from './_components/DesktopView';
import MobileView from './_components/MobileView';

function AnalyticsViews() {
  const isDesktop = useIsMdUp();
  return isDesktop ? <DesktopView /> : <MobileView />;
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={null}>
      <AnalyticsViews />
    </Suspense>
  );
}
