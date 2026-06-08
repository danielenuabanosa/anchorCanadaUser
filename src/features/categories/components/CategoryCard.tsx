import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Category } from '../types';

const COLOR_MAP: Record<string, string> = {
  blue:   'bg-brand-50 text-brand-700 border-brand-200',
  teal:   'bg-teal-50 text-teal-700 border-teal-200',
  orange: 'bg-accent-50 text-accent-600 border-accent-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  green:  'bg-success-50 text-success-600 border-success-200',
};

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const colorClass = COLOR_MAP[category.color] ?? COLOR_MAP.blue;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-card transition hover:border-brand-300 hover:shadow-md"
    >
      {/* Icon */}
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl border text-2xl ${colorClass}`}>
        {category.icon}
      </div>

      {/* Title & desc */}
      <div>
        <h3 className="font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors">
          {category.title}
        </h3>
        <p className="mt-1 text-sm text-neutral-500 line-clamp-2">{category.description}</p>
      </div>

      {/* Count & arrow */}
      <div className="mt-auto flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-500">
          {category.opportunityCount} opportunities
        </span>
        <ArrowRight className="h-4 w-4 text-neutral-400 transition group-hover:translate-x-1 group-hover:text-brand-600" />
      </div>
    </Link>
  );
}
