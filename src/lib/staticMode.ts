/**
 * Offline / demo mode — used until provider API auth endpoints are available.
 *
 * Enable with NEXT_PUBLIC_STATIC_MODE=true (see .env.example).
 * Disable with NEXT_PUBLIC_STATIC_MODE=false or NEXT_PUBLIC_DISABLE_AUTH=false
 * once the backend is ready.
 *
 * Development defaults to offline mode so local UI work is never blocked by APIs.
 */
export function isStaticMode(): boolean {
  if (process.env.NEXT_PUBLIC_STATIC_MODE === 'false') return false;
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
