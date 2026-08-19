'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowRight, CheckCircle2, FileText, MailCheck, ShieldAlert } from 'lucide-react';
import { Modal } from '@/shared/components/ui/Modal';
import { providerApi } from '@/features/provider/services/providerApi';
import { getRemainingProfileItems, type RemainingProfileItem } from '@/features/provider/lib/remainingProfile';
import { useProviderOnboardingStore } from '@/store/onboardingStore';
import { useVerificationModalStore } from '@/store/verificationModalStore';

function RemainingList({
  items,
  group,
  startIndex,
  onNavigate,
}: {
  items: RemainingProfileItem[];
  group: RemainingProfileItem['group'];
  startIndex: number;
  onNavigate: () => void;
}) {
  const filtered = items.filter((item) => item.group === group);
  if (filtered.length === 0) return null;

  return (
    <div>
      <p className="mb-2 font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8C97AD]">
        {group === 'profile' ? 'Profile details' : 'Required documents'}
      </p>
      <ul className="overflow-hidden rounded-[12px] border border-[#EEF2F8] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        {filtered.map((item, index) => (
          <li key={item.id} className="border-b border-[#EEF2F8] last:border-b-0">
            <Link
              href={item.href}
              onClick={onNavigate}
              className="flex items-center gap-3 px-4 py-3.5 transition hover:bg-[#F8FAFC]"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EFF4FF] font-sans text-[12px] font-semibold text-[#2F66C8]">
                {startIndex + index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[14px] font-medium text-[#0F172A]">{item.label}</p>
                <p className="mt-0.5 font-sans text-[12px] leading-relaxed text-[#8C97AD]">{item.hint}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-[6px] bg-[#EFF4FF] px-2.5 py-1 font-sans text-[11px] font-medium text-[#2F66C8]">
                Add
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function VerificationPendingModal() {
  const isOpen = useVerificationModalStore((s) => s.isOpen);
  const variant = useVerificationModalStore((s) => s.variant);
  const adminNote = useVerificationModalStore((s) => s.adminNote);
  const generation = useVerificationModalStore((s) => s.generation);
  const close = useVerificationModalStore((s) => s.close);
  const hydrateFromApi = useProviderOnboardingStore((s) => s.hydrateFromApi);
  const [remaining, setRemaining] = useState<RemainingProfileItem[]>([]);
  const [completion, setCompletion] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setLoading(true);

    void Promise.all([providerApi.getOrganization(), providerApi.getOnboarding()])
      .then(([org, onboarding]) => {
        if (cancelled) return;
        if (onboarding?.data && typeof onboarding.data === 'object') {
          hydrateFromApi(onboarding.data);
        }
        const payload = (org ?? {}) as Parameters<typeof getRemainingProfileItems>[0];
        const docs = Array.isArray(onboarding?.documents) ? onboarding.documents : payload?.documents;
        const items = getRemainingProfileItems({
          ...payload,
          documents: docs as never,
        });
        setRemaining(items);
        const nextCompletion = typeof payload?.completion === 'number' ? payload.completion : 0;
        setCompletion(nextCompletion);
        if (variant === 'incomplete' && nextCompletion >= 100) {
          close();
        }
      })
      .catch(() => {
        if (!cancelled) setRemaining([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [close, generation, hydrateFromApi, isOpen, variant]);

  const profileItems = useMemo(() => remaining.filter((item) => item.group === 'profile'), [remaining]);
  const documentItems = useMemo(() => remaining.filter((item) => item.group === 'documents'), [remaining]);
  const remainingCount = remaining.length;
  const progress = Math.min(100, Math.max(0, completion));

  if (variant === 'submitted') {
    return (
      <Modal isOpen={isOpen} onClose={close} size="lg" overlayClassName="z-[80]" className="max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col items-center px-2 py-2 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ECFDF5]">
            <MailCheck className="h-8 w-8 text-[#15803D]" strokeWidth={1.5} />
          </div>
          <h2 className="mt-5 font-serif text-[28px] leading-tight text-[#0F172A] md:text-[32px]">
            Thanks for completing your <span className="italic text-[#2F66C8]">profile</span>
          </h2>
          <p className="mt-3 max-w-[520px] font-sans text-[15px] leading-relaxed text-[#44516A]">
            An admin is reviewing your organization account. We&apos;ll email you once verification is
            successful. Publishing stays locked until you&apos;re approved.
          </p>
          <button
            type="button"
            onClick={close}
            className="mt-6 flex h-[45px] w-full items-center justify-center rounded-[6px] bg-[#2F66C8] text-sm font-medium text-white hover:bg-[#2454A4]"
          >
            Got it
          </button>
        </div>
      </Modal>
    );
  }

  if (variant === 'attention') {
    return (
      <Modal isOpen={isOpen} onClose={close} size="lg" overlayClassName="z-[80]" className="max-h-[90vh] overflow-y-auto">
        <div className="flex items-start gap-3 rounded-[10px] border border-[#FDE68A] bg-[#FFFBEB] p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#FEF3C7]">
            <ShieldAlert className="h-5 w-5 text-[#B45309]" />
          </div>
          <div>
            <p className="font-sans text-[16px] font-semibold leading-snug text-[#92400E]">
              An admin needs more information before approval
            </p>
            <p className="mt-2 whitespace-pre-wrap font-sans text-[14px] leading-relaxed text-[#78350F]">
              {adminNote || 'Please update the requested profile details and documents, then resubmit for review.'}
            </p>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/organization-profile"
            onClick={close}
            className="flex h-[45px] flex-1 items-center justify-center rounded-[6px] bg-[#2F66C8] text-sm font-medium text-white hover:bg-[#2454A4]"
          >
            Update profile
          </Link>
          <button
            type="button"
            onClick={close}
            className="flex h-[45px] flex-1 items-center justify-center rounded-[6px] border border-[#D9E1EF] bg-white text-sm font-medium text-[#2F66C8] hover:bg-[#F8FAFC]"
          >
            I&apos;ll do this later
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={close} size="lg" overlayClassName="z-[80]" className="max-h-[90vh] overflow-y-auto">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[#FFFBEB]">
          <AlertTriangle className="h-6 w-6 text-[#B45309]" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-[#B45309]">
            Action required
          </p>
          <h2 className="mt-1 font-serif text-[26px] leading-tight text-[#0F172A] md:text-[30px]">
            Complete your <span className="italic text-[#2F66C8]">profile</span>
          </h2>
          <p className="mt-2 font-sans text-[14px] leading-relaxed text-[#44516A]">
            These remaining items still need to be saved. Admin review and publishing stay locked until
            they are complete.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-[12px] border border-[#EEF2F8] bg-[#F8FAFC] p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-sans text-[13px] font-medium text-[#0F172A]">
            {loading ? 'Checking your profile…' : `${progress}% complete`}
          </p>
          <p className="rounded-full bg-white px-2.5 py-1 font-sans text-[12px] font-medium text-[#44516A] ring-1 ring-[#EEF2F8]">
            {remainingCount === 0 ? 'Ready to submit' : `${remainingCount} remaining`}
          </p>
        </div>
        <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-[#EEF2F8]">
          <div className="h-full rounded-full bg-[#2F66C8] transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        {loading ? (
          <div className="space-y-2">
            {[0, 1, 2].map((key) => (
              <div key={key} className="h-[68px] animate-pulse rounded-[12px] bg-[#F1F5F9]" />
            ))}
          </div>
        ) : remainingCount > 0 ? (
          <>
            <RemainingList items={profileItems} group="profile" startIndex={0} onNavigate={close} />
            <RemainingList
              items={documentItems}
              group="documents"
              startIndex={profileItems.length}
              onNavigate={close}
            />
          </>
        ) : (
          <div className="flex items-start gap-3 rounded-[12px] border border-[#D1FAE5] bg-[#ECFDF5] p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" />
            <div>
              <p className="font-sans text-[14px] font-medium text-[#166534]">Required details are in place</p>
              <p className="mt-1 font-sans text-[13px] leading-relaxed text-[#166534]">
                Open Organization Profile and submit verification if you have not already, then wait for
                admin approval.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href={documentItems[0]?.href || profileItems[0]?.href || '/organization-profile'}
          onClick={close}
          className="flex h-[45px] flex-1 items-center justify-center gap-2 rounded-[6px] bg-[#2F66C8] text-sm font-medium text-white hover:bg-[#2454A4]"
        >
          <FileText className="h-4 w-4" />
          {remainingCount > 0 ? 'Finish remaining items' : 'Go to profile'}
        </Link>
        <button
          type="button"
          onClick={close}
          className="flex h-[45px] flex-1 items-center justify-center rounded-[6px] border border-[#D9E1EF] bg-white text-sm font-medium text-[#2F66C8] hover:bg-[#F8FAFC]"
        >
          I&apos;ll do this later
        </button>
      </div>
    </Modal>
  );
}
