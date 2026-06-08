import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import type { AuthUser } from '@/store/authStore';

const TIME_GREETING = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

interface WelcomeBannerProps {
  user: AuthUser;
}

export function WelcomeBanner({ user }: WelcomeBannerProps) {
  const firstName = user.name.split(' ')[0];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-700 to-brand-900 p-6 text-white shadow-lg">
      {/* Background dots */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #93c5fd 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-brand-200">
            {TIME_GREETING()}, {firstName}!
          </p>
          <h2 className="mt-1 text-xl font-bold">Your opportunity hub is ready.</h2>
          <p className="mt-1 text-sm text-brand-200">
            Discover jobs, housing, training, and more across Canada.
          </p>
        </div>

        <Link
          href="/opportunities"
          className="hidden shrink-0 items-center gap-2 rounded-xl bg-white/20 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/30 sm:flex"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Explore now
        </Link>
      </div>
    </div>
  );
}
