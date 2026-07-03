'use client';

import { useParams } from 'next/navigation';
import { ApplicationDetailView } from './ApplicationDetailShared';

export default function DesktopView() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '1';
  return <ApplicationDetailView variant="desktop" applicationId={id} />;
}
