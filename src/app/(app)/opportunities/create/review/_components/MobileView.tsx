'use client';

import { ReviewPageShell, useReviewPublish } from './ReviewShared';

export default function MobileView() {
  const review = useReviewPublish();
  return <ReviewPageShell variant="mobile" review={review} />;
}
