'use client';

import { ProvidersDirectoryGrid } from '@/features/providers/components/ProvidersDirectoryGrid';

export default function CategoriesMobileView() {
  return (
    <div className="flex flex-col gap-4 pb-10">
      <div>
        <h1 className="font-instrument-serif text-[28px] leading-10 text-[#0F172A]">Providers</h1>
        <p className="text-sm text-[#44516A]">
          Browse every organization registered on the Anchor Canada provider app.
        </p>
      </div>
      <ProvidersDirectoryGrid />
    </div>
  );
}
