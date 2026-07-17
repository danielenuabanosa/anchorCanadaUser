'use client';

import DesktopView from './_components/DesktopView';
import MobileView from './_components/MobileView';
import { Suspense } from 'react';

export default function NotificationsPage() {
  return (
    <Suspense fallback={null}>
      <>
        <div className="hidden w-full md:block">
          <DesktopView />
        </div>
        <div className="block w-full md:hidden">
          <MobileView />
        </div>
      </>
    </Suspense>
  );
}
