// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: package export sanity (unit).
// Data handled: minimal fixtures only — no taxpayer identifiers.
import { describe, expect, it } from 'vitest';

import {
  FairnessMetadataSchema,
  SyntheticBatchRequestSchema,
  SyntheticTaxRecordSchema,
  TaxReturnSchema,
} from './index';

describe('@irs/shared (smoke)', () => {
  it('exports TaxReturnSchema defaults for partial input', () => {
    const data = TaxReturnSchema.parse({ taxYear: 2024 });
    expect(data.adjustedGrossIncome).toBe(0);
    expect(data.taxYear).toBe(2024);
  });

  it('validates SyntheticBatchRequestSchema boundaries', () => {
    expect(SyntheticBatchRequestSchema.safeParse({ count: 50 }).success).toBe(true);
    expect(SyntheticBatchRequestSchema.safeParse({ count: 101 }).success).toBe(false);
    expect(SyntheticBatchRequestSchema.safeParse({ count: 0 }).success).toBe(true);
  });

  it('parses SyntheticTaxRecordSchema combining taxReturn + fairness', () => {
    const row = TaxReturnSchema.parse({ taxYear: 2024 });
    const fairness = FairnessMetadataSchema.parse({
      ageGroup: 'synthetic_age_30_44',
      gender: 'synthetic_gender_group_w',
      ethnicity: 'synthetic_ethnicity_cohort_a',
    });
    expect(SyntheticTaxRecordSchema.safeParse({ taxReturn: row, fairness }).success).toBe(true);
  });
});
