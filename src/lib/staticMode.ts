/**
 * Offline / demo mode for the provider app.
 *
 * Opt-in only: set NEXT_PUBLIC_STATIC_MODE=true (or NEXT_PUBLIC_DISABLE_AUTH=true)
 * when you intentionally want mock data without a backend.
 * Default is live API mode so onboarding/login hit real endpoints.
 */
export function isStaticMode(): boolean {
  if (process.env.NEXT_PUBLIC_STATIC_MODE === 'false') return false;
  if (process.env.NEXT_PUBLIC_DISABLE_AUTH === 'false') return false;

  return (
    process.env.NEXT_PUBLIC_STATIC_MODE === 'true' ||
    process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true'
  );
}

/** Normalize any dummy login input into a usable email for offline sessions. */
export function resolveDevLoginEmail(email: string): string {
  const trimmed = email.trim();
  if (!trimmed) return 'dev@provider.local';
  return trimmed.includes('@') ? trimmed : `${trimmed}@provider.local`;
}
