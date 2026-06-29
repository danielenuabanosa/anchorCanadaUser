'use client';

import { ReviewPageShell, useReviewPublish } from './ReviewShared';

export default function DesktopView() {
  const review = useReviewPublish();
  return <ReviewPageShell variant="desktop" review={review} />;
}
