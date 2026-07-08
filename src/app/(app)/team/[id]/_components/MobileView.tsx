'use client';

import { useParams } from 'next/navigation';
import { TeamMemberDetailView } from './TeamMemberDetailShared';

export default function MobileView() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '1';
  return <TeamMemberDetailView variant="mobile" memberId={id} />;
}
