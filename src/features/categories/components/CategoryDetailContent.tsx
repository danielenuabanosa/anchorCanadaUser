'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useCategory } from '../hooks/useCategories';
import { OpportunityList } from '@/features/opportunities/components/OpportunityList';
import { Badge } from '@/shared/components/ui/Badge';
import type { OpportunityType } from '@/features/opportunities/types';

const TYPE_BADGE: Record<OpportunityType, React.ComponentProps<typeof Badge>['variant']> = {
  job:       'jobs',
  housing:   'housing',
  training:  'training',
  funding:   'funding',
  community: 'community',
};

interface CategoryDetailContentProps {
  slug: string;
}

export function CategoryDetailContent({ slug }: CategoryDetailContentProps) {
  const { data: category, isLoading } = useCategory(slug);

  return (
    <div className="space-y-6">
      <Link
        href="/categories"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700"
      >
        <ArrowLeft className="h-4 w-4" /> Back to categories
      </Link>

      {!isLoading && category && (
        <div className="flex items-center gap-3">
          <span className="text-3xl">{category.icon}</span>
          <div>
            <h2 className="text-xl font-bold text-neutral-900">{category.title}</h2>
            <p className="text-sm text-neutral-500">{category.description}</p>
          </div>
          <Badge variant={TYPE_BADGE[category.type]} className="ml-auto">
            {category.opportunityCount} opportunities
          </Badge>
        </div>
      )}

      <OpportunityList />
    </div>
  );
}
