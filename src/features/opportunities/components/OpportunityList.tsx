'use client';

import { useState } from 'react';
import { useOpportunities } from '../hooks/useOpportunities';
import { OpportunityCard } from './OpportunityCard';
import { OpportunityFilters } from './OpportunityFilters';
import { SkeletonList } from '@/shared/components/ui/Skeleton';
import { Button } from '@/shared/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { OpportunityFilters as Filters } from '../types';

export function OpportunityList() {
  const [filters, setFilters] = useState<Filters>({ page: 1, limit: 12 });
  const { data, isLoading, isError } = useOpportunities(filters);

  return (
    <div className="space-y-6">
      <OpportunityFilters filters={filters} onChange={setFilters} />

      {isLoading && <SkeletonList count={6} />}

      {isError && (
        <div className="rounded-2xl border border-error-100 bg-error-50 p-6 text-center text-sm text-error-600">
          Failed to load opportunities. Please try again.
        </div>
      )}

      {!isLoading && !isError && data && (
        <>
          <p className="text-sm text-neutral-500">
            {data.total} {data.total === 1 ? 'opportunity' : 'opportunities'} found
          </p>

          {data.data.length === 0 ? (
            <div className="rounded-2xl border border-neutral-200 bg-white py-16 text-center">
              <p className="text-neutral-400">No opportunities match your search.</p>
              <Button
                variant="ghost"
                className="mt-3 text-brand-600"
                onClick={() => setFilters({ page: 1, limit: 12 })}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {data.data.map((opp) => (
                <OpportunityCard key={opp.id} opportunity={opp} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {data.totalPages > 1 && (
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                disabled={filters.page === 1}
                onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 1) - 1 }))}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm text-neutral-500">
                Page {filters.page} of {data.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={filters.page === data.totalPages}
                onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 1) + 1 }))}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
