// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: Nest DI service (internal orchestration; HTTP boundary lands in Epic 5).
// Data handled: TaxReturn DTO schema references only (no raw taxpayer payloads).
import { Injectable } from '@nestjs/common';
import { TaxReturnSchema } from '@irs/shared';

@Injectable()
export class TaxService {
  /**
   * Sanity-check that the workspace `@irs/shared` package resolves at build/runtime.
   * Full synthetic → predict → RAG orchestration is implemented in Epic 5.
   */
  assertSharedTaxReturnShape(): boolean {
    const parsed = TaxReturnSchema.safeParse({ taxYear: 2024 });
    return parsed.success;
  }
}
