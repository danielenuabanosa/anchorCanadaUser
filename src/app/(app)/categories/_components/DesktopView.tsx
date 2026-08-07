'use client';

import { ProvidersDirectoryGrid } from '@/features/providers/components/ProvidersDirectoryGrid';

export default function CategoriesDesktopView() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-instrument-serif text-[36px] leading-[56px] text-[#0F172A]">
          Providers
        </h1>
        <p className="text-base text-[#44516A]">
          Browse every organization registered on the Anchor Canada provider app.
        </p>
      </div>
      <ProvidersDirectoryGrid />
    </div>
  );
}
