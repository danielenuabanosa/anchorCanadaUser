export function isStaticMode(): boolean {
  return process.env.NEXT_PUBLIC_STATIC_MODE === 'true';
}
