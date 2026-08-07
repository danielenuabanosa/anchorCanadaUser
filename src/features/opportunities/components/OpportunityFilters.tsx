'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/shared/components/ui/Input';
import { Select } from '@/shared/components/ui/Select';
import { opportunityService } from '../services/opportunity.service';
import type { OpportunityFilters as Filters, OpportunityType } from '../types';

interface OpportunityFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export function OpportunityFilters({ filters, onChange }: OpportunityFiltersProps) {
  const [typeOptions, setTypeOptions] = useState([{ value: '', label: 'All types' }]);
  const [provinceOptions, setProvinceOptions] = useState([{ value: '', label: 'All provinces' }]);
  const [popular, setPopular] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const meta = await opportunityService.getExploreMeta();
        if (cancelled) return;
        setTypeOptions([
          { value: '', label: 'All types' },
          ...meta.categories
            .filter((c) => c.key !== 'all')
            .map((c) => ({
              value:
                c.key === 'jobs'
                  ? 'job'
                  : c.key === 'grants'
                    ? 'funding'
                    : c.key === 'volunteer'
                      ? 'community'
                      : c.key,
              label: `${c.label} (${c.count})`,
            })),
        ]);
        setProvinceOptions([
          { value: '', label: 'All provinces' },
          ...meta.provinces.map((p) => ({
            value: p.label,
            label: `${p.label} (${p.count})`,
          })),
        ]);
        setPopular(meta.popularSearches);
      } catch {
        // keep defaults
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-card sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input
            placeholder="Search opportunities…"
            leftIcon={<Search className="h-4 w-4" />}
            value={filters.query ?? ''}
            onChange={(e) => onChange({ ...filters, query: e.target.value, page: 1 })}
            aria-label="Search"
          />
        </div>

        <div className="flex gap-3">
          <Select
            options={typeOptions}
            value={filters.type ?? ''}
            onChange={(e) =>
              onChange({
                ...filters,
                type: (e.target.value as OpportunityType) || undefined,
                page: 1,
              })
            }
            aria-label="Filter by type"
            className="min-w-[140px]"
          />

          <Select
            options={provinceOptions}
            value={filters.province ?? ''}
            onChange={(e) =>
              onChange({ ...filters, province: e.target.value || undefined, page: 1 })
            }
            aria-label="Filter by province"
            className="min-w-[160px]"
          />
        </div>
      </div>

      {popular.length > 0 ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-4">
          <p className="mb-3 text-sm font-semibold text-neutral-900">Popular searches</p>
          <div className="flex flex-wrap gap-2">
            {popular.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => onChange({ ...filters, query: term, page: 1 })}
                className="rounded-full border border-[#D9E1EF] bg-[#F8FAFC] px-3 py-1.5 text-xs text-[#0F172A] hover:border-[#2F66C8] hover:text-[#2F66C8]"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {filters.type || filters.province || filters.query ? (
        <div className="rounded-2xl border border-[#D9E1EF] bg-[#EFF4FF] p-4">
          <p className="mb-2 text-sm font-semibold text-[#0F172A]">Refine your results</p>
          <p className="mb-3 text-xs text-[#44516A]">
            Narrow by type, province, or keyword. Clear filters to see all live opportunities in this
            category.
          </p>
          <button
            type="button"
            onClick={() => onChange({ page: 1, limit: filters.limit ?? 12 })}
            className="text-sm font-medium text-[#2F66C8] hover:underline"
          >
            Clear refine filters
          </button>
        </div>
      ) : null}
    </div>
  );
}

