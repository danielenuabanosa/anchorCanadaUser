'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Building2, Briefcase, Bookmark } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard',     icon: Home,      label: 'Home' },
  { href: '/opportunities', icon: Compass,   label: 'Explore' },
  { href: '/categories',    icon: Building2, label: 'Providers' },
  { href: '/applications',  icon: Briefcase, label: 'Applications' },
  { href: '/saved',         icon: Bookmark,  label: 'Saved' },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-[#EEF2F8] bg-white px-2 py-2 md:hidden"
      aria-label="Mobile navigation"
    >
      {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className="flex min-w-0 flex-1 flex-col items-center gap-0.5 py-1"
          >
            <Icon className={`h-5 w-5 ${active ? 'text-[#2F66C8]' : 'text-[#8C97AD]'}`} />
            <span className={`text-[10px] font-medium ${active ? 'text-[#2F66C8]' : 'text-[#8C97AD]'}`}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
