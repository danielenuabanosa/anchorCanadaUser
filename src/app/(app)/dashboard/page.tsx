'use client';

import { useIsMdUp } from '@/shared/hooks/useMediaQuery';
import DesktopView from './_components/DesktopView';
import MobileView from './_components/MobileView';

export default function DashboardPage() {
  const isDesktop = useIsMdUp();

  // Mount only one viewport so hidden charts are not measured at 0×0.
  return isDesktop ? <DesktopView /> : <MobileView />;
}
