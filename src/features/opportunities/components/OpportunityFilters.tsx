'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/shared/components/ui/Input';
import { Select } from '@/shared/components/ui/Select';
import type { OpportunityFilters, OpportunityType } from '../types';

const TYPE_OPTIONS = [
  { value: '',          label: 'All types'  },
  { value: 'job',       label: '💼 Jobs'       },
  { value: 'housing',   label: '🏠 Housing'    },
  { value: 'training',  label: '📚 Training'   },
  { value: 'funding',   label: '💰 Funding'    },
  { value: 'community', label: '🤝 Community'  },
];

const PROVINCE_OPTIONS = [
  { value: '',   label: 'All provinces' },
  { value: 'AB', label: 'Alberta'       },
  { value: 'BC', label: 'British Columbia' },
  { value: 'MB', label: 'Manitoba'      },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland & Labrador' },
  { value: 'NS', label: 'Nova Scotia'   },
  { value: 'ON', label: 'Ontario'       },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'QC', label: 'Quebec'        },
  { value: 'SK', label: 'Saskatchewan'  },
];

interface OpportunityFiltersProps {
  filters: OpportunityFilters;
  onChange: (filters: OpportunityFilters) => void;
}

export function OpportunityFilters({ filters, onChange }: OpportunityFiltersProps) {
  return (
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
          options={TYPE_OPTIONS}
          value={filters.type ?? ''}
          onChange={(e) =>
            onChange({ ...filters, type: (e.target.value as OpportunityType) || undefined, page: 1 })
          }
          aria-label="Filter by type"
          className="min-w-[140px]"
        />

        <Select
          options={PROVINCE_OPTIONS}
          value={filters.province ?? ''}
          onChange={(e) =>
            onChange({ ...filters, province: e.target.value || undefined, page: 1 })
          }
          aria-label="Filter by province"
          className="min-w-[160px]"
        />
      </div>
    </div>
  );
}
