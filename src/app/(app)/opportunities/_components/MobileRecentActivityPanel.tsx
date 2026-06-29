import Link from 'next/link';
import Image from 'next/image';
import type { RecentActivity } from './opportunitiesHubData';

interface MobileRecentActivityPanelProps {
  items: RecentActivity[];
  viewAllHref?: string;
}

export function MobileRecentActivityPanel({ items, viewAllHref = '/applications' }: MobileRecentActivityPanelProps) {
  return (
    <section className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-base font-semibold leading-[29px] text-[#0F172A]">Recent Applications</h3>
        <Link href={viewAllHref} className="text-base font-medium leading-[21px] text-[#2F66C8]">
          View All
        </Link>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-4 py-2.5">
            <div className="h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full">
              <Image src={item.avatar} alt="" width={52} height={52} className="h-full w-full object-cover" />
            </div>
            <div className="flex min-w-0 flex-1 items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-base font-medium leading-[21px] text-[#0F172A]">{item.name}</p>
                <p className="truncate text-sm leading-[18px] text-[#44516A]">{item.action}</p>
              </div>
              <span className="shrink-0 text-sm leading-[18px] text-[#44516A]">{item.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
