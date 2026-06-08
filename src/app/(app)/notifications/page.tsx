import type { Metadata } from 'next';
import DesktopView from './_components/DesktopView';
import MobileView from './_components/MobileView';

export const metadata: Metadata = { title: 'Notifications' };

export default function NotificationsPage() {
  return (
    <>
      <div className="hidden md:block w-full">
        <DesktopView />
      </div>
      <div className="block md:hidden w-full">
        <MobileView />
      </div>
    </>
  );
}
