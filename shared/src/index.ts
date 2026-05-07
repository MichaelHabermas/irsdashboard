// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: shared module consumed by backend HTTP layer and frontend forms (future).
// Data handled: TaxReturn DTO shape + explicit synthetic fairness cohort labels (not real PII).
import { z } from 'zod';

const nonnegative = z.number().nonnegative();

/**
 * Canonical synthetic 1040-shaped payload for ML/dashboard pipelines.
 * Financial fields default so `{ taxYear }` validates for smoke checks.
 */
export const TaxReturnSchema = z.object({
  taxYear: z.number().int().min(2000).max(2100),

  wages: nonnegative.default(0),
  interestIncome: nonnegative.default(0),
  dividendIncome: nonnegative.default(0),
  scheduleCNetProfitOrLoss: z.number().default(0),

  dependentsClaimed: z.number().int().nonnegative().max(99).default(0),

  totalWithholding: nonnegative.default(0),
  estimatedTaxPayments: nonnegative.default(0),
  refundableCredits: nonnegative.default(0),

  /** Proxy for deductions actually applied (standard or itemized) */
  deductionsApplied: nonnegative.default(0),

  adjustedGrossIncome: z.number().default(0),
  taxableIncome: z.number().default(0),
  /** Positive = refund, negative = amount owed */
  refundOrAmountOwed: z.number().default(0),
});

export type TaxReturn = z.infer<typeof TaxReturnSchema>;

/** Explicit synthetic cohort labels — not real demographic data. */
export const FAIRNESS_AGE_GROUPS = [
  'synthetic_age_18_29',
  'synthetic_age_30_44',
  'synthetic_age_45_59',
  'synthetic_age_60_plus',
] as const;

export const FairnessAgeGroupSchema = z.enum(FAIRNESS_AGE_GROUPS);

export const FAIRNESS_GENDER_CATEGORIES = [
  'synthetic_gender_group_w',
  'synthetic_gender_group_x',
  'synthetic_gender_group_y',
  'synthetic_gender_unspecified',
] as const;

export const FairnessGenderSchema = z.enum(FAIRNESS_GENDER_CATEGORIES);

export const FAIRNESS_ETHNICITY_COHORTS = [
  'synthetic_ethnicity_cohort_a',
  'synthetic_ethnicity_cohort_b',
  'synthetic_ethnicity_cohort_c',
  'synthetic_ethnicity_cohort_d',
] as const;

export const FairnessEthnicitySchema = z.enum(FAIRNESS_ETHNICITY_COHORTS);

export const FairnessMetadataSchema = z.object({
  ageGroup: FairnessAgeGroupSchema,
  gender: FairnessGenderSchema,
  ethnicity: FairnessEthnicitySchema,
});

export type FairnessMetadata = z.infer<typeof FairnessMetadataSchema>;

export const SyntheticTaxRecordSchema = z.object({
  taxReturn: TaxReturnSchema,
  fairness: FairnessMetadataSchema,
});

export type SyntheticTaxRecord = z.infer<typeof SyntheticTaxRecordSchema>;

export const SYNTHETIC_BATCH_MAX = 100;

export const SyntheticBatchRequestSchema = z.object({
  count: z.number().int().min(0).max(SYNTHETIC_BATCH_MAX),
  seed: z.number().int().optional(),
});

export type SyntheticBatchRequest = z.infer<typeof SyntheticBatchRequestSchema>;
