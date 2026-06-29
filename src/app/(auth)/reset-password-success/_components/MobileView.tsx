'use client';

import {
  ActionButtons,
  ChecklistCard,
  LocationBanner,
  SuccessHeading,
  SuccessHero,
  WhileYouWereAwayStats,
} from './ResetPasswordSuccessShared';

export default function ResetPasswordSuccessMobileView() {
  return (
    <div className="mx-auto flex w-full max-w-[400px] flex-col items-center gap-10">
      <SuccessHero variant="mobile" />
      <SuccessHeading variant="mobile" />
      <ChecklistCard variant="mobile" />
      <WhileYouWereAwayStats variant="mobile" />
      <LocationBanner variant="mobile" />
      <ActionButtons variant="mobile" />
    </div>
  );
}
