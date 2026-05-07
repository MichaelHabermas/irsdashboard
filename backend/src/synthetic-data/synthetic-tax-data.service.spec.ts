// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: unit tests (NODE).
// Data handled: validated SyntheticTaxRecord objects only (no identifiable fields).

import { SyntheticTaxRecordSchema } from '@irs/shared';

import { SyntheticTaxDataService } from './synthetic-tax-data.service';

describe('SyntheticTaxDataService', () => {
  const svc = new SyntheticTaxDataService();

  it('returns a full synthetic record for unseeded generation', () => {
    const row = svc.generateOne();
    expect(SyntheticTaxRecordSchema.safeParse(row).success).toBe(true);
    expect(row.taxReturn.taxYear).toBeGreaterThanOrEqual(2020);
    expect(row.taxReturn.wages).toBeGreaterThanOrEqual(0);
    expect(row.taxReturn.adjustedGrossIncome).toBeGreaterThanOrEqual(0);
  });

  it('is deterministic when a seed is provided', () => {
    const first = svc.generateOne(424242);
    const second = svc.generateOne(424242);
    expect(first).toEqual(second);
  });

  it('produces different rows for different seeds', () => {
    const a = svc.generateOne(1);
    const b = svc.generateOne(2);
    expect(a).not.toEqual(b);
  });

  it('generateMany preserves length and parses each row', () => {
    const batch = svc.generateMany(5, 99);
    expect(batch).toHaveLength(5);
    for (const row of batch) {
      expect(SyntheticTaxRecordSchema.safeParse(row).success).toBe(true);
    }
  });
});
