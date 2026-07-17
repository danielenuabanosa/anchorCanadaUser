'use client';

import { useEffect, useState } from 'react';
import {
  Check,
  FileSpreadsheet,
  FileTerminal,
  FileType,
  SquareArrowRight,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { downloadTableExport, type ExportRow } from '@/lib/exportTable';
import {
  ANALYTICS_STATS,
  EXPORT_INCLUDE_OPTIONS,
  TEAM_PERFORMANCE,
  TOP_OPPORTUNITIES,
  type ExportIncludeKey,
  type InsightDetail,
} from './analyticsData';

type ExportFormat = 'csv' | 'excel' | 'pdf';

const DEFAULT_EXPORT_INCLUDES: Record<ExportIncludeKey, boolean> = {
  overview: true,
  opportunityPerformance: true,
  applicantFunnel: true,
  teamPerformance: true,
  demographics: true,
  trafficSources: true,
  insights: true,
};

function ExportFormatButton({
  active,
  label,
  icon: Icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: typeof FileTerminal;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2.5 rounded-[6px] border px-4 py-2.5 text-sm font-medium',
        active
          ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]'
          : 'border-[#EEF2F8] bg-white text-[#0F172A]',
      )}
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
      {label}
    </button>
  );
}

function ExportCheckbox({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center gap-5 text-left"
    >
      <span
        className={cn(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] border',
          checked ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-[#D9E1EF] bg-white',
        )}
      >
        {checked ? <Check className="h-4 w-4 text-white" strokeWidth={2.5} /> : null}
      </span>
      <span className="text-base text-[#44516A]">{label}</span>
    </button>
  );
}

/** Figma 609:26140 desktop / 609:27785 mobile — Export Analytics Report */
export function ExportAnalyticsModal({
  open,
  onClose,
  mobile,
}: {
  open: boolean;
  onClose: () => void;
  mobile?: boolean;
}) {
  const [format, setFormat] = useState<ExportFormat>('csv');
  const [includes, setIncludes] = useState(DEFAULT_EXPORT_INCLUDES);

  useEffect(() => {
    if (open) {
      setFormat('csv');
      setIncludes(DEFAULT_EXPORT_INCLUDES);
    }
  }, [open]);

  if (!open) return null;

  function toggleInclude(key: ExportIncludeKey) {
    setIncludes((current) => ({ ...current, [key]: !current[key] }));
  }

  function handleExport() {
    const headers = ['Section', 'Item', 'Value', 'Detail'];
    const rows: ExportRow[] = [];

    if (includes.overview) {
      ANALYTICS_STATS.forEach((stat) => {
        rows.push([
          'Overview',
          stat.label,
          stat.value,
          stat.change ? `${stat.changeNegative ? '-' : '+'}${stat.change}` : (stat.subtext ?? ''),
        ]);
      });
    }

    if (includes.opportunityPerformance) {
      TOP_OPPORTUNITIES.forEach((opp) => {
        rows.push([
          'Opportunity Performance',
          opp.name,
          `${opp.applications} apps`,
          `${opp.type} · ${opp.conversionRate} conversion · ${opp.status}`,
        ]);
      });
    }

    if (includes.teamPerformance) {
      TEAM_PERFORMANCE.forEach((member) => {
        rows.push([
          'Team Performance',
          member.name,
          `${member.applicationsReviewed} reviewed`,
          `${member.avgReviewTime} avg · ${member.interviewsConducted} interviews`,
        ]);
      });
    }

    if (includes.applicantFunnel) {
      rows.push(
        ['Applicant Funnel', 'Submitted', '1,284', 'All applications'],
        ['Applicant Funnel', 'Under Review', '342', 'Pending review'],
        ['Applicant Funnel', 'Shortlisted', '186', 'Advanced'],
        ['Applicant Funnel', 'Accepted', '64', 'Final decisions'],
      );
    }

    if (includes.demographics) {
      rows.push(
        ['Demographics', 'Canada', '42%', 'Primary market'],
        ['Demographics', 'Nigeria', '18%', 'International'],
        ['Demographics', 'Other', '40%', 'Rest of world'],
      );
    }

    if (includes.trafficSources) {
      rows.push(
        ['Traffic Sources', 'Organic Search', '38%', '9,842 visits'],
        ['Traffic Sources', 'Direct', '27%', '6,991 visits'],
        ['Traffic Sources', 'Social', '21%', '5,438 visits'],
        ['Traffic Sources', 'Referral', '14%', '3,625 visits'],
      );
    }

    if (includes.insights) {
      rows.push(
        ['Insights', 'High conversion opportunities', '6.5%+', 'Promote top performers'],
        ['Insights', 'Review bottlenecks', '4.6 days', 'Reduce average review time'],
      );
    }

    if (rows.length === 0) {
      rows.push(['Export', 'No sections selected', '-', 'Enable at least one section']);
    }

    downloadTableExport(format, 'analytics-report', headers, rows, {
      title: 'Export Analytics Report',
      sheetName: 'Analytics',
    });
    onClose();
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex bg-[#0F172A]/60 backdrop-blur-[5px]',
        mobile ? 'items-start justify-center p-5 pt-[83px]' : 'items-center justify-center p-4',
      )}
      role="dialog"
      aria-modal="true"
    >
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close export modal" />
      <div
        className={cn(
          'relative flex max-h-[90vh] w-full flex-col overflow-hidden border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]',
          mobile ? 'max-w-[400px] rounded-[20px]' : 'max-w-[720px] rounded-[20px]',
        )}
      >
        <div className="flex items-start justify-between border-b border-[#EEF2F8] p-[26px]">
          <div className="min-w-0 flex-1 pr-4">
            <h2 className="text-lg font-medium text-[#0F172A]">Export Analytics Report</h2>
            <p className="mt-1.5 text-sm leading-[1.4] text-[#44516A]">
              Choose the format and data you want to export.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A]"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto px-[26px] py-10">
          <div className="space-y-10">
            <div>
              <p className="mb-2.5 text-base font-semibold text-[#0F172A]">Export Format</p>
              <div className="flex flex-wrap gap-2.5">
                <ExportFormatButton
                  active={format === 'csv'}
                  label="CSV"
                  icon={FileTerminal}
                  onClick={() => setFormat('csv')}
                />
                <ExportFormatButton
                  active={format === 'excel'}
                  label="Excel"
                  icon={FileSpreadsheet}
                  onClick={() => setFormat('excel')}
                />
                <ExportFormatButton
                  active={format === 'pdf'}
                  label="PDF"
                  icon={FileType}
                  onClick={() => setFormat('pdf')}
                />
              </div>
            </div>

            <div>
              <p className="mb-2.5 text-base font-semibold text-[#0F172A]">Include in Export</p>
              <div className={cn('grid gap-4', mobile ? 'grid-cols-1' : 'grid-cols-2')}>
                {EXPORT_INCLUDE_OPTIONS.map((option) => (
                  <ExportCheckbox
                    key={option.key}
                    checked={includes[option.key]}
                    label={option.label}
                    onChange={() => toggleInclude(option.key)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
          <div className={cn('flex gap-5', mobile && 'w-full')}>
            <button
              type="button"
              onClick={onClose}
              className={cn(
                'rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#44516A]',
                mobile ? 'flex-1' : 'min-w-[86px]',
              )}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleExport}
              className={cn(
                'rounded-[6px] bg-[#2F66C8] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)]',
                mobile && 'flex-1',
              )}
            >
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightDetailContent({ insight }: { insight: InsightDetail }) {
  return (
    <div className="space-y-10">
      <div>
        <h3 className="font-serif text-[28px] leading-[56px] text-[#0F172A]">{insight.title}</h3>
        <p className="mt-1.5 text-sm leading-[1.4] text-[#44516A]">{insight.description}</p>
      </div>

      <div>
        <p className="text-sm font-bold text-[#0F172A]">{insight.detailsHeading}</p>
        <p className="mt-3 text-sm leading-[1.4] text-[#44516A]">{insight.detailsText}</p>
      </div>

      <div className="flex overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC]">
        {insight.stats.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              'min-w-0 flex-1 p-4',
              index < insight.stats.length - 1 && 'border-r border-[#EEF2F8]',
            )}
          >
            <p className="text-xs text-[#44516A]">{stat.label}</p>
            <p
              className={cn(
                'mt-1.5 text-base font-medium',
                stat.highlight ? 'text-[#15803D]' : 'text-[#0F172A]',
              )}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div>
        <p className="text-sm font-bold text-[#0F172A]">Recommendations</p>
        <ul className="mt-3 space-y-3">
          {insight.recommendations.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <SquareArrowRight className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#2F66C8]" strokeWidth={1.75} />
              <span className="text-sm leading-[1.4] text-[#2F66C8]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Figma 609:29340 desktop slide-over / 609:30892 mobile */
export function InsightDetailModal({
  open,
  onClose,
  insight,
  mobile,
}: {
  open: boolean;
  onClose: () => void;
  insight: InsightDetail | null;
  mobile?: boolean;
}) {
  if (!open || !insight) return null;

  if (mobile) {
    return (
      <div className="fixed inset-0 z-50 flex items-start justify-center bg-[#0F172A]/60 p-5 pt-[83px]" role="dialog" aria-modal="true">
        <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close insight modal" />
        <div className="relative flex max-h-[calc(100vh-100px)] w-full max-w-[400px] flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]">
          <div className="flex items-start justify-between border-b border-[#EEF2F8] p-[26px]">
            <h2 className="text-lg font-medium text-[#0F172A]">Insights & Recommendations</h2>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A]"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="overflow-y-auto px-[26px] py-[26px]">
            <InsightDetailContent insight={insight} />
          </div>
          <div className="flex justify-end border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
            <button
              type="button"
              onClick={onClose}
              className="min-w-[86px] rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#44516A]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#0F172A]/60 backdrop-blur-[5px]" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close insight panel" />
      <div className="relative flex h-full w-full max-w-[720px] flex-col border-l border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]">
        <div className="flex shrink-0 items-start justify-between border-b border-[#EEF2F8] p-[26px]">
          <h2 className="text-lg font-medium text-[#0F172A]">Insights & Recommendations</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A]"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-[26px] py-10">
          <InsightDetailContent insight={insight} />
        </div>
        <div className="flex shrink-0 justify-end border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
          <button
            type="button"
            onClick={onClose}
            className="min-w-[86px] rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#44516A]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
