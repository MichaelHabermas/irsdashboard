// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: orchestration services coordinating synthetic → ML → RAG (Epic 5 controllers).
// Data handled: validated TaxReturn DTOs + model outputs (never raw logs of full payloads).
import { Module } from '@nestjs/common';
import { TaxService } from './tax.service';

@Module({
  providers: [TaxService],
  exports: [TaxService],
})
export class TaxModule {}
