import { TriangleAlert } from 'lucide-react';
import type { AttentionAlert } from './opportunitiesHubData';

interface MobileAttentionPanelProps {
  alerts: AttentionAlert[];
}

export function MobileAttentionPanel({ alerts }: MobileAttentionPanelProps) {
  return (
    <section className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
      <h3 className="mb-5 text-base font-semibold leading-[29px] text-[#0F172A]">
        Opportunity Requiring Attention
      </h3>

      <ul className="flex flex-col gap-5">
        {alerts.map((alert) => (
          <li key={alert.id} className="rounded-[10px] border border-[#FDF5E8] bg-[#FDFAF3] p-2.5">
            <div className="flex gap-4">
              <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#FFF6E0]">
                <TriangleAlert className="h-[26px] w-[26px] text-[#9B290E]" strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-[21px] text-[#9B290E]">{alert.title}</p>
                <p className="mt-1 text-sm leading-[18px] text-[#0F172A]">
                  {alert.opportunity}
                  {alert.details.length > 0 ? (
                    <>
                      {' '}
                      • {alert.details.join(' • ')}
                    </>
                  ) : null}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="mt-5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2 text-sm font-medium leading-[18px] text-[#2F66C8]"
            >
              {alert.actionLabel}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
