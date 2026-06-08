import Link from 'next/link';
import { Briefcase, Grid3X3, Bookmark, User } from 'lucide-react';

const ACTIONS = [
  { label: 'Browse opportunities', href: '/opportunities',  icon: Briefcase, color: 'bg-brand-50 text-brand-600'  },
  { label: 'View categories',      href: '/categories',     icon: Grid3X3,   color: 'bg-teal-50 text-teal-600'    },
  { label: 'Saved items',          href: '/saved',          icon: Bookmark,  color: 'bg-accent-50 text-accent-600'},
  { label: 'Edit profile',         href: '/profile',        icon: User,      color: 'bg-success-50 text-success-600'},
] as const;

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {ACTIONS.map(({ label, href, icon: Icon, color }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4 text-center text-sm font-medium text-neutral-700 shadow-card transition hover:border-brand-300 hover:text-brand-700 hover:shadow-md"
        >
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          {label}
        </Link>
      ))}
    </div>
  );
}
