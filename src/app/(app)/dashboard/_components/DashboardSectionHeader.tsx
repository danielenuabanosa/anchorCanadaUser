'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface DashboardSectionHeaderProps {
  title: string;
  href: string;
}

export function DashboardSectionHeader({ title, href }: DashboardSectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-base font-semibold leading-[1.8] text-[#0F172A]">{title}</h3>
      <Link href={href} className="flex shrink-0 items-center gap-3 text-base font-medium text-[#2F66C8]">
        View All
        <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  );
}
