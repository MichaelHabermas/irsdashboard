// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: package export sanity (unit).
// Data handled: minimal TaxReturn-shaped fixture only.
import { describe, expect, it } from 'vitest';

import { TaxReturnSchema } from './index';

describe('@irs/shared (smoke)', () => {
  it('exports a parseable TaxReturnSchema', () => {
    expect(TaxReturnSchema.safeParse({ taxYear: 2024 }).success).toBe(true);
  });
});
