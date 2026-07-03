import type { Metadata } from 'next';
import DesktopView from './_components/DesktopView';
import MobileView from './_components/MobileView';

export const metadata: Metadata = { title: 'Settings' };

export default function SettingsPage() {
  return (
    <>
      <div className="hidden w-full md:block">
        <DesktopView />
      </div>
      <div className="block w-full md:hidden">
        <MobileView />
      </div>
    </>
  );
}
