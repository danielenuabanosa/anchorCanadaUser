'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** Template step is removed from the 6-step Figma flow. Redirect to Requirements. */
export default function TemplatePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/opportunities/create/requirements');
  }, [router]);

  return (
    <div className="flex flex-1 items-center justify-center p-10 text-sm text-[#8C97AD]">
      Redirecting to Requirements…
    </div>
  );
}
