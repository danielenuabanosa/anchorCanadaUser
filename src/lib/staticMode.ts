/** True when auth should be bypassed and mock/offline data used. */
export function isStaticMode(): boolean {
  if (process.env.NEXT_PUBLIC_DISABLE_AUTH === 'false') return false;

  return (
    process.env.NEXT_PUBLIC_STATIC_MODE === 'true' ||
    process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true' ||
    process.env.NODE_ENV === 'development'
  );
}

/** Normalize any dummy login input into a usable email for offline sessions. */
export function resolveDevLoginEmail(email: string): string {
  const trimmed = email.trim();
  if (!trimmed) return 'dev@provider.local';
  return trimmed.includes('@') ? trimmed : `${trimmed}@provider.local`;
}
