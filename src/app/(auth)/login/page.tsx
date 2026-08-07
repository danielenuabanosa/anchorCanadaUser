'use client';

import { Suspense } from 'react';
import DesktopView from './_components/DesktopView';
import MobileView from './_components/MobileView';

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <div className="hidden w-full md:block">
        <DesktopView />
      </div>
      <div className="block w-full md:hidden">
        <MobileView />
      </div>
    </Suspense>
  );
}
