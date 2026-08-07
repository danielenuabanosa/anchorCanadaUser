import { cn } from '@/lib/utils';
import { OpportunityGridSkeleton } from './PageSkeletons';

interface SkeletonProps {
  className?: string;
}

/** Figma 492:1253 pulse block — prefer PageSkeletons for page layouts */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse rounded-lg bg-[#EEF2F8]', className)}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col gap-5 rounded-[10px] border border-[#EEF2F8] bg-white p-5">
      <Skeleton className="h-6 w-20 rounded" />
      <Skeleton className="h-4 w-3/4 rounded" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-28 rounded" />
          <Skeleton className="h-3 w-20 rounded" />
        </div>
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded" />
        <Skeleton className="h-5 w-20 rounded" />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 4 }: { count?: number }) {
  return <OpportunityGridSkeleton count={count} columns="grid-cols-1" />;
}
