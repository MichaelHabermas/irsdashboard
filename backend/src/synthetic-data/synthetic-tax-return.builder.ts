// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: deterministic builder for synthetic-data module.
// Data handled: numeric tax-return fields only (no identifiers).
import { faker } from '@faker-js/faker';
import { TaxReturnSchema, type TaxReturn } from '@irs/shared';

/**
 * Composes a single synthetic return using Faker's current RNG state.
 * Caller controls seeding (e.g. `faker.seed`) for reproducibility.
 */
export function buildSyntheticTaxReturn(): TaxReturn {
  const taxYear = faker.number.int({ min: 2020, max: 2025 });
  const wages = faker.number.int({ min: 0, max: 400_000 });
  const interestIncome = faker.number.int({ min: 0, max: 40_000 });
  const dividendIncome = faker.number.int({ min: 0, max: 35_000 });
  const scheduleCNetProfitOrLoss = faker.number.int({ min: -60_000, max: 180_000 });
  const dependentsClaimed = faker.number.int({ min: 0, max: 6 });

  const agiRaw = wages + interestIncome + dividendIncome + scheduleCNetProfitOrLoss;
  const adjustedGrossIncome = Math.max(0, agiRaw);

  const deductionCap = faker.number.int({ min: 14_600, max: 45_000 });
  const deductionsApplied = Math.min(adjustedGrossIncome, deductionCap);

  const taxableIncome = Math.max(0, adjustedGrossIncome - deductionsApplied);

  const rate = faker.number.float({ min: 0.1, max: 0.32 });
  const liabilityEstimate = Math.round(taxableIncome * rate);
  const withholdingFloor = Math.min(liabilityEstimate, 500);
  const withholdingCeil = Math.max(liabilityEstimate + 10_000, 1_000);
  const totalWithholding = faker.number.int({
    min: withholdingFloor,
    max: withholdingCeil,
  });
  const estimatedTaxPayments = faker.number.int({ min: 0, max: 25_000 });
  const refundableCredits = faker.number.int({ min: 0, max: 5_000 });

  const refundOrAmountOwed =
    totalWithholding + estimatedTaxPayments + refundableCredits - liabilityEstimate;

  return TaxReturnSchema.parse({
    taxYear,
    wages,
    interestIncome,
    dividendIncome,
    scheduleCNetProfitOrLoss,
    dependentsClaimed,
    totalWithholding,
    estimatedTaxPayments,
    refundableCredits,
    deductionsApplied,
    adjustedGrossIncome,
    taxableIncome,
    refundOrAmountOwed,
  });
}
