// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: internal data generation services (HTTP routes — Epic 2).
// Data handled: synthetic 1040-shaped JSON only (with fairness metadata).
import { Module } from '@nestjs/common';

@Module({})
export class SyntheticDataModule {}
