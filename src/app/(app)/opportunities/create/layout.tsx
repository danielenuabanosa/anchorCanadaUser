'use client';

import { usePathname } from 'next/navigation';
import {
  BuilderMobileHelpBar,
  BuilderNavBar,
} from '@/shared/components/opportunity-builder/BuilderNavBar';
import { BuilderStepProgress } from '@/shared/components/opportunity-builder/BuilderStepProgress';
import { BuilderNavProvider, useBuilderNav } from '@/features/opportunity-builder/context/BuilderNavContext';
import { BUILDER_STEP_ROUTES } from '@/features/opportunity-builder/lib/builderData';

function getCurrentStep(pathname: string): number {
  if (pathname.startsWith('/opportunities/create/template')) return 2;
  const entries = Object.entries(BUILDER_STEP_ROUTES) as [string, string][];
  const match = entries
    .filter(([, route]) => pathname.startsWith(route))
    .sort((a, b) => b[1].length - a[1].length)[0];
  return match ? Number(match[0]) : 0;
}

function BuilderLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const current = getCurrentStep(pathname);
  const nav = useBuilderNav();

  return (
    <div className="flex min-h-full flex-col overflow-x-hidden bg-[#FFFFFF]">
      {/* Desktop sticky header  */}
      <div className="sticky top-0 z-40 hidden border-b border-[#EEF2F8] bg-white md:block">
        <div className="mx-auto w-full max-w-[1548px] px-10 py-5">
          <BuilderNavBar
            step={nav.step}
            backHref={nav.backHref}
            onContinue={nav.onContinue}
            continueDisabled={nav.continueDisabled}
            continueLabel={nav.continueLabel}
            headerVariant={nav.headerVariant}
            secondaryAction={nav.secondaryAction}
          />
        </div>
        <div className="mx-auto w-full max-w-[1548px] px-10 pb-5">
          <BuilderStepProgress current={current} />
        </div>
      </div>

      {/* Mobile builder  */}
      <div className="flex flex-col gap-5 bg-[#F2F7FF] px-5 pt-5 md:hidden">
        <BuilderNavBar
          step={nav.step}
          backHref={nav.backHref}
          onContinue={nav.onContinue}
          continueDisabled={nav.continueDisabled}
          continueLabel={nav.continueLabel}
          headerVariant={nav.headerVariant}
          secondaryAction={nav.secondaryAction}
        />
        <BuilderStepProgress current={current} mobile />
      </div>

      <div className="flex flex-1 flex-col">{children}</div>

      {nav.showMobileHelp !== false ? (
        <div className="px-5 py-10 md:hidden">
          <BuilderMobileHelpBar />
        </div>
      ) : null}
    </div>
  );
}

export default function OpportunityBuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <BuilderNavProvider>
      <BuilderLayoutInner>{children}</BuilderLayoutInner>
    </BuilderNavProvider>
  );
}
