'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { providerApi } from '@/features/provider/services/providerApi';
import { getStoredToken } from '@/lib/apiError';
import { isStaticMode } from '@/lib/staticMode';

type InvitePreview = {
  id: string;
  email: string;
  name: string;
  role: string;
  organizationName: string;
  expiresAt: string | null;
};

function AcceptInviteContent() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get('token')?.trim() ?? '';

  const [invite, setInvite] = useState<InvitePreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('This invitation link is missing a token.');
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const data = await providerApi.getTeamInvite(token);
        if (!cancelled) setInvite(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not load this invitation.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  async function handleAccept() {
    if (!token) return;
    if (!isStaticMode() && !getStoredToken()) {
      router.push(`/login?next=${encodeURIComponent(`/team/accept?token=${token}`)}`);
      return;
    }

    setAccepting(true);
    setError('');
    try {
      await providerApi.acceptTeamInvite(token);
      setDone(true);
      setTimeout(() => router.push('/dashboard'), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not accept invitation.');
    } finally {
      setAccepting(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-[520px] flex-col gap-6 px-4 py-16">
      <div>
        <h1 className="font-serif text-[36px] leading-[44px] text-[#0F172A]">Team invitation</h1>
        <p className="mt-2 text-base text-[#44516A]">
          Accept your invite to join an organization on Anchor Canada.
        </p>
      </div>

      {loading ? <p className="text-sm text-[#8C97AD]">Loading invitation…</p> : null}

      {!loading && error ? (
        <div className="rounded-[10px] border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {!loading && invite && !done ? (
        <div className="flex flex-col gap-5 rounded-[10px] border border-[#EEF2F8] bg-white p-6">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-[#8C97AD]">Organization</p>
            <p className="text-lg font-semibold text-[#0F172A]">{invite.organizationName}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-[#8C97AD]">Role</p>
              <p className="font-medium text-[#0F172A]">{invite.role}</p>
            </div>
            <div>
              <p className="text-sm text-[#8C97AD]">Invited as</p>
              <p className="font-medium text-[#0F172A]">{invite.email}</p>
            </div>
          </div>
          <p className="text-sm text-[#44516A]">
            Sign in with <strong>{invite.email}</strong> to accept. If you&apos;re already signed in with
            another account, switch accounts first.
          </p>
          <button
            type="button"
            disabled={accepting}
            onClick={() => void handleAccept()}
            className="rounded-[6px] bg-[#2F66C8] px-6 py-3.5 text-base text-white hover:bg-[#2454A4] disabled:opacity-60"
          >
            {accepting ? 'Accepting…' : 'Accept invitation'}
          </button>
          <Link href="/login" className="text-center text-sm font-medium text-[#2F66C8] hover:underline">
            Sign in with a different account
          </Link>
        </div>
      ) : null}

      {done ? (
        <div className="rounded-[10px] border border-[#D1FAE5] bg-[#ECFDF5] p-5 text-sm text-[#15803D]">
          You&apos;re in! Redirecting to your dashboard…
        </div>
      ) : null}
    </div>
  );
}

export default function TeamAcceptPage() {
  return (
    <Suspense fallback={<p className="p-10 text-sm text-[#8C97AD]">Loading…</p>}>
      <AcceptInviteContent />
    </Suspense>
  );
}
