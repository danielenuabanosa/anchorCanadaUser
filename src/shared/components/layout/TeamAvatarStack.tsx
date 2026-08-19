'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Avatar } from '@/shared/components/ui/Avatar';
import { providerApi } from '@/features/provider/services/providerApi';
import { photoSrc } from '@/shared/lib/photoSrc';

type TeamFace = { id: string; name: string; avatarUrl?: string | null };

export function TeamAvatarStack() {
  const [members, setMembers] = useState<TeamFace[]>([]);

  useEffect(() => {
    let cancelled = false;
    void providerApi
      .getTeam()
      .then((result) => {
        if (cancelled) return;
        const list = [...(result.members ?? []), result.owner].filter(Boolean) as Array<{
          id: string;
          name: string;
          avatarUrl?: string | null;
        }>;
        const unique = new Map<string, TeamFace>();
        for (const member of list) {
          if (!unique.has(member.id)) {
            unique.set(member.id, {
              id: member.id,
              name: member.name,
              avatarUrl: member.avatarUrl,
            });
          }
        }
        setMembers([...unique.values()]);
      })
      .catch(() => {
        if (!cancelled) setMembers([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const shown = members.slice(0, 3);
  const extra = Math.max(0, members.length - shown.length);

  return (
    <Link
      href="/team"
      className="flex items-center gap-2 rounded-lg p-0.5 hover:bg-[#F8FAFC]"
      aria-label="Team members"
    >
      <div className="flex items-center -space-x-2">
        {shown.length === 0 ? (
          <Avatar fallback="Team" size="sm" className="h-8 w-8 border-2 border-white" />
        ) : (
          shown.map((member) => (
            <Avatar
              key={member.id}
              src={photoSrc(member.avatarUrl)}
              fallback={member.name}
              size="sm"
              className="h-8 w-8 border-2 border-white"
            />
          ))
        )}
        {extra > 0 ? (
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#EFF4FF] text-xs font-medium text-[#0F172A]">
            +{extra}
          </span>
        ) : null}
      </div>
      <ChevronDown className="h-3.5 w-3.5 text-[#8C97AD]" strokeWidth={2} />
    </Link>
  );
}
