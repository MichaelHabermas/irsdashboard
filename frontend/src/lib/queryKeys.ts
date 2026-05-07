// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: client-side TanStack Query cache keys (no secrets).
// Data handled: stable string identifiers only.

export const queryKeys = {
  root: ['irs-dashboard'] as const,
} as const;
