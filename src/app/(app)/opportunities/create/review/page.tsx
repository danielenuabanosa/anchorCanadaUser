'use client';

import { ReviewPageShell, useReviewPublish } from './_components/ReviewShared';

export default function ReviewPage() {
  const review = useReviewPublish();
  return <ReviewPageShell review={review} />;
}
