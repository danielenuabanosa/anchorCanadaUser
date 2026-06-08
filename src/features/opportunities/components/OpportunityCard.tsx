'use client';

import Link from 'next/link';
import { MapPin, Clock, Bookmark, BookmarkCheck, Building2 } from 'lucide-react';
import { Badge } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/ui/Card';
import { useSaveOpportunity } from '../hooks/useOpportunities';
import { formatDate, truncate } from '@/lib/utils';
import type { Opportunity, OpportunityType } from '../types';

const TYPE_BADGE: Record<OpportunityType, React.ComponentProps<typeof Badge>['variant']> = {
  job:       'jobs',
  housing:   'housing',
  training:  'training',
  funding:   'funding',
  community: 'community',
};

const TYPE_LABEL: Record<OpportunityType, string> = {
  job:       'Job',
  housing:   'Housing',
  training:  'Training',
  funding:   'Funding',
  community: 'Community',
};

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const { mutate: toggleSave, isPending } = useSaveOpportunity();

  return (
    <Card className="flex flex-col gap-4 transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <Badge variant={TYPE_BADGE[opportunity.type]}>
              {TYPE_LABEL[opportunity.type]}
            </Badge>
            {opportunity.status === 'closed' && (
              <Badge variant="error">Closed</Badge>
            )}
            {opportunity.status === 'coming_soon' && (
              <Badge variant="warning">Coming soon</Badge>
            )}
          </div>
          <Link
            href={`/opportunities/${opportunity.id}`}
            className="group text-base font-semibold text-neutral-900 hover:text-brand-600"
          >
            {opportunity.title}
          </Link>
        </div>

        {/* Save button */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => toggleSave({ id: opportunity.id, isSaved: opportunity.isSaved ?? false })}
          isLoading={isPending}
          aria-label={opportunity.isSaved ? 'Remove from saved' : 'Save opportunity'}
          className="shrink-0 text-neutral-400 hover:text-brand-600"
        >
          {opportunity.isSaved ? (
            <BookmarkCheck className="h-4 w-4 text-brand-600" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Provider & location */}
      <div className="flex flex-wrap gap-3 text-xs text-neutral-500">
        <span className="flex items-center gap-1">
          <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
          {opportunity.provider}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {opportunity.location}, {opportunity.province}
        </span>
        {opportunity.deadline && (
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            Deadline: {formatDate(opportunity.deadline)}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-neutral-600">
        {truncate(opportunity.description, 140)}
      </p>

      {/* Tags */}
      {opportunity.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {opportunity.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-auto pt-2">
        <Link
          href={`/opportunities/${opportunity.id}`}
          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700"
        >
          View details
        </Link>
      </div>
    </Card>
  );
}
