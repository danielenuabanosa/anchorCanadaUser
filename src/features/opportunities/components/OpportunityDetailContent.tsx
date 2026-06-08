'use client';

import Link from 'next/link';
import {
  MapPin, Building2, Clock, Bookmark, BookmarkCheck,
  ArrowLeft, ExternalLink, Tag,
} from 'lucide-react';
import { useOpportunity, useSaveOpportunity } from '../hooks/useOpportunities';
import { Badge } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import { SkeletonCard } from '@/shared/components/ui/Skeleton';
import { formatDate } from '@/lib/utils';
import type { OpportunityType } from '../types';

const TYPE_BADGE: Record<OpportunityType, React.ComponentProps<typeof Badge>['variant']> = {
  job:       'jobs',
  housing:   'housing',
  training:  'training',
  funding:   'funding',
  community: 'community',
};

interface OpportunityDetailContentProps {
  id: string;
}

export function OpportunityDetailContent({ id }: OpportunityDetailContentProps) {
  const { data: opp, isLoading, isError } = useOpportunity(id);
  const { mutate: toggleSave, isPending: saving } = useSaveOpportunity();

  if (isLoading) return (
    <div className="max-w-3xl space-y-4">
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );

  if (isError || !opp) {
    return (
      <div className="rounded-2xl border border-error-100 bg-error-50 p-8 text-center">
        <p className="text-sm text-error-600">Opportunity not found or failed to load.</p>
        <Link href="/opportunities" className="mt-3 inline-flex items-center gap-1 text-sm text-brand-600 hover:underline">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to opportunities
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Back */}
      <Link
        href="/opportunities"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to opportunities
      </Link>

      {/* Header card */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap gap-2">
              <Badge variant={TYPE_BADGE[opp.type]}>{opp.type}</Badge>
              {opp.status !== 'open' && (
                <Badge variant={opp.status === 'closed' ? 'error' : 'warning'}>
                  {opp.status === 'closed' ? 'Closed' : 'Coming soon'}
                </Badge>
              )}
            </div>
            <h1 className="text-xl font-bold text-neutral-900">{opp.title}</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleSave({ id: opp.id, isSaved: opp.isSaved ?? false })}
            isLoading={saving}
            aria-label={opp.isSaved ? 'Remove from saved' : 'Save'}
          >
            {opp.isSaved ? (
              <BookmarkCheck className="h-5 w-5 text-brand-600" />
            ) : (
              <Bookmark className="h-5 w-5 text-neutral-400" />
            )}
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-500">
          <span className="flex items-center gap-1.5">
            <Building2 className="h-4 w-4" /> {opp.provider}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" /> {opp.location}, {opp.province}
          </span>
          {opp.deadline && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> Deadline: {formatDate(opp.deadline)}
            </span>
          )}
        </div>

        {(opp.salary || opp.fundingAmount) && (
          <div className="mt-4 rounded-xl bg-success-50 px-4 py-3 text-sm font-medium text-success-700">
            {opp.salary && <p>💰 Salary: {opp.salary}</p>}
            {opp.fundingAmount && <p>💵 Funding: {opp.fundingAmount}</p>}
          </div>
        )}
      </div>

      {/* Description */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card">
        <h2 className="mb-3 text-base font-semibold text-neutral-900">About this opportunity</h2>
        <p className="whitespace-pre-line text-sm leading-relaxed text-neutral-700">
          {opp.description}
        </p>
      </div>

      {/* Tags */}
      {opp.tags.length > 0 && (
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card">
          <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-neutral-900">
            <Tag className="h-4 w-4" /> Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {opp.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      {opp.status === 'open' && (
        <div className="flex gap-3">
          <Button size="lg" className="flex-1 sm:flex-none">
            Apply now <ExternalLink className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => toggleSave({ id: opp.id, isSaved: opp.isSaved ?? false })}
            isLoading={saving}
          >
            {opp.isSaved ? 'Saved' : 'Save'}
          </Button>
        </div>
      )}
    </div>
  );
}
