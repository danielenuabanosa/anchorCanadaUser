/** Treat bundled mock portraits as missing so initials / org logo can show instead. */
const MOCK_PHOTO_HINTS = [
  'profile-avatar',
  'prov-sickkids',
  'profile-google',
  'profile-georgebrown',
];

export function photoSrc(value?: string | { src?: string } | null): string | undefined {
  if (!value) return undefined;
  const src = typeof value === 'string' ? value.trim() : String(value.src ?? '').trim();
  if (!src) return undefined;
  if (MOCK_PHOTO_HINTS.some((hint) => src.includes(hint))) return undefined;
  return src;
}
