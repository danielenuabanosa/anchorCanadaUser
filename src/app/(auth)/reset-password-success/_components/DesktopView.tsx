'use client';

import {
  ActionButtons,
  ChecklistCard,
  LocationBanner,
  SuccessHeading,
  SuccessHero,
  TrustFooter,
  WelcomeSidebar,
} from './ResetPasswordSuccessShared';

export default function ResetPasswordSuccessDesktopView() {
  return (
    <div className="mx-auto flex w-full max-w-[1548px] flex-col gap-10">
      <div className="flex items-start gap-10">
        <div className="flex w-[886px] shrink-0 flex-col gap-10">
          <SuccessHero variant="desktop" />
          <SuccessHeading variant="desktop" />
          <ChecklistCard variant="desktop" />
          <LocationBanner variant="desktop" />
          <ActionButtons variant="desktop" />
        </div>
        <WelcomeSidebar />
      </div>
      <TrustFooter />
    </div>
  );
}
