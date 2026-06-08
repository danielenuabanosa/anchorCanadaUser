'use client';

import Link from 'next/link';
import { Trash2, MapPin, Building2 } from 'lucide-react';
import { useSaved, useRemoveSaved } from '../hooks/useSaved';
import { Badge } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import { SkeletonList } from '@/shared/components/ui/Skeleton';

export function SavedList() {
  const { data: saved, isLoading, isError } = useSaved();
  const { mutate: remove, isPending } = useRemoveSaved();

  if (isLoading) return <SkeletonList count={4} />;

  if (isError) {
    return (
      <div className="rounded-2xl border border-error-100 bg-error-50 p-6 text-center text-sm text-error-600">
        Failed to load saved opportunities.
      </div>
    );
  }

  if (!saved || saved.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-white py-16 text-center">
        <p className="text-4xl">🔖</p>
        <h3 className="mt-4 text-base font-semibold text-neutral-700">Nothing saved yet</h3>
        <p className="mt-1 text-sm text-neutral-400">
          Bookmark opportunities to find them here later.
        </p>
        <Link
          href="/opportunities"
          className="mt-4 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700"
        >
          Browse opportunities
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-3" aria-label="Saved opportunities">
      {saved.map((opp) => (
        <li
          key={opp.id}
          className="flex items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-card"
        >
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap gap-2">
              <Badge variant={opp.type as 'jobs' | 'housing' | 'training' | 'funding' | 'community'}>
                {opp.type}
              </Badge>
            </div>
            <Link
              href={`/opportunities/${opp.id}`}
              className="text-sm font-semibold text-neutral-900 hover:text-brand-600"
            >
              {opp.title}
            </Link>
            <div className="mt-1 flex flex-wrap gap-3 text-xs text-neutral-500">
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {opp.provider}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {opp.location}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            isLoading={isPending}
            onClick={() => remove(opp.id)}
            aria-label={`Remove "${opp.title}" from saved`}
            className="shrink-0 text-neutral-400 hover:text-error-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </li>
      ))}
    </ul>
  );
}
