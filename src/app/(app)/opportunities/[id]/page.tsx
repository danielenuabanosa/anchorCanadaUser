import { Suspense } from 'react';
import DesktopView from './_components/DesktopView';
import MobileView from './_components/MobileView';

export default function OpportunityDetailsPage() {
  return (
    <Suspense fallback={null}>
      <div className="hidden md:block w-full">
        <DesktopView />
      </div>
      <div className="block md:hidden w-full">
        <MobileView />
      </div>
    </Suspense>
  );
}
