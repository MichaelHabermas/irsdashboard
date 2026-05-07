// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: shared module consumed by backend HTTP layer and frontend forms (future).
// Data handled: TaxReturn DTO shape only (no taxpayer identifiers).
import { z } from 'zod';

export const TaxReturnSchema = z.object({
  taxYear: z.number().int(),
});

export type TaxReturn = z.infer<typeof TaxReturnSchema>;
