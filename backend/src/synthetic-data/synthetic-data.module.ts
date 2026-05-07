// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: internal data generation services (HTTP routes — Epic 2).
// Data handled: synthetic 1040-shaped JSON only (with fairness metadata).
import { Module } from '@nestjs/common';

import { SyntheticDataController } from './synthetic-data.controller';
import { SyntheticTaxDataService } from './synthetic-tax-data.service';

@Module({
  controllers: [SyntheticDataController],
  providers: [SyntheticTaxDataService],
  exports: [SyntheticTaxDataService],
})
export class SyntheticDataModule {}
