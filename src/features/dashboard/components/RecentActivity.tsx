import { formatRelativeTime } from '@/lib/utils';
import { Bookmark, Send, Bell, Sparkles } from 'lucide-react';
import type { ActivityItem } from '../types';

const ICON_MAP = {
  saved:    <Bookmark className="h-3.5 w-3.5 text-brand-600" />,
  applied:  <Send className="h-3.5 w-3.5 text-teal-600" />,
  deadline: <Bell className="h-3.5 w-3.5 text-warning-600" />,
  new:      <Sparkles className="h-3.5 w-3.5 text-accent-500" />,
};

const COLOR_MAP = {
  saved:    'bg-brand-50',
  applied:  'bg-teal-50',
  deadline: 'bg-warning-50',
  new:      'bg-accent-50',
};

interface RecentActivityProps {
  items: ActivityItem[];
}

export function RecentActivity({ items }: RecentActivityProps) {
  if (items.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-neutral-400">
        No recent activity yet. Start exploring opportunities!
      </p>
    );
  }

  return (
    <ol className="space-y-3" aria-label="Recent activity">
      {items.map((item) => (
        <li key={item.id} className="flex items-start gap-3">
          <span
            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${COLOR_MAP[item.type]}`}
            aria-hidden="true"
          >
            {ICON_MAP[item.type]}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-neutral-800">{item.title}</p>
            <p className="text-xs text-neutral-500">{item.description}</p>
          </div>
          <time
            dateTime={item.createdAt}
            className="shrink-0 text-xs text-neutral-400"
            title={new Date(item.createdAt).toLocaleString()}
          >
            {formatRelativeTime(item.createdAt)}
          </time>
        </li>
      ))}
    </ol>
  );
}
