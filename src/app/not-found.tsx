import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-2">
        <h1 className="text-6xl font-bold text-brand-600">404</h1>
        <h2 className="text-2xl font-semibold text-neutral-800">Page not found</h2>
        <p className="text-neutral-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Link
        href="/dashboard"
        className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-700"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
