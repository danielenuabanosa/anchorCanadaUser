'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { useRegisteredProviders } from '../hooks/useRegisteredProviders';
import { SkeletonList } from '@/shared/components/ui/Skeleton';
import { HubSortSelect } from '@/shared/components/hub/HubSortSelect';
import type { HubMenuOption } from '@/shared/components/hub/HubMenuSelect';
import type { ProviderDirectoryItem } from '../types';

const SORT_OPTIONS: HubMenuOption[] = [
  { value: 'relevant', label: 'Most relevant' },
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'opportunities', label: 'Most opportunities' },
];

function VerifiedBadge() {
  return (
    <div className="flex items-center gap-1 text-[#15803d]">
      <CheckCircle2 size={12} className="fill-[#15803d] text-white" />
      <span className="text-xs font-medium text-[#15803d]">Verified</span>
    </div>
  );
}

function ProviderCard({ provider }: { provider: ProviderDirectoryItem }) {
  return (
    <div className="flex flex-col gap-4 rounded-[10px] border border-[#eef2f8] bg-white p-5">
      <div className="flex items-start justify-between gap-2">
        {provider.verified ? <VerifiedBadge /> : <span className="text-xs text-[#8c97ad]">Unverified</span>}
        <span className="text-xs text-[#2f66c8]">#{provider.code}</span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-[#f8fafc]">
          <span className="text-xs font-bold text-[#44516a]">{provider.initials}</span>
        </div>
        <div>
          <p className="text-base font-medium text-[#0f172a]">{provider.name}</p>
          <p className="mt-0.5 text-xs text-[#44516a]">
            {provider.type} • {provider.location}
          </p>
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-[#44516a]">{provider.description}</p>
      </div>

      <div>
        <p className="text-xl font-semibold text-[#0f172a]">{provider.opportunities}</p>
        <p className="text-xs text-[#8c97ad]">Active Opportunities</p>
      </div>

      {provider.hiringNow ? (
        <span className="w-fit rounded-full bg-[#eff4ff] px-2.5 py-1 text-xs font-medium text-[#2f66c8]">
          Hiring now
        </span>
      ) : null}
    </div>
  );
}

export function ProvidersDirectoryGrid() {
  const searchParams = useSearchParams();
  const query = (searchParams.get('q') ?? '').trim();
  const [sort, setSort] = useState('relevant');

  const listParams = useMemo(
    () => ({
      query: query || undefined,
      sort: sort as 'relevant' | 'name-asc' | 'opportunities',
    }),
    [query, sort],
  );

  const { providers, total, loading, error } = useRegisteredProviders(listParams);

  if (loading) return <SkeletonList count={6} />;

  if (error) {
    return (
      <div className="rounded-2xl border border-error-100 bg-error-50 p-6 text-center text-sm text-error-600">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[#44516A]">
          {total} {total === 1 ? 'provider' : 'providers'} registered
          {query ? ` matching “${query}”` : ''}
        </p>
        <HubSortSelect value={sort} onChange={setSort} options={SORT_OPTIONS} />
      </div>

      {providers.length === 0 ? (
        <div className="rounded-[10px] border border-[#EEF2F8] bg-white px-4 py-8 text-center text-sm text-[#44516A]">
          No registered providers found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      )}
    </div>
  );
}
