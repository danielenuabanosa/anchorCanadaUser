import DesktopView from './_components/DesktopView';
import MobileView from './_components/MobileView';

export default function CategoriesPage() {
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
