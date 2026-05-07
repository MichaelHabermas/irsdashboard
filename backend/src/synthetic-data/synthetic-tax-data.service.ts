// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: internal Nest service (HTTP — Epic 2 slice 3).
// Data handled: synthetic TaxReturn + fairness payloads only (no logging of full blobs).
import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { SyntheticTaxRecordSchema, type SyntheticTaxRecord } from '@irs/shared';

import { buildFairnessMetadata } from './synthetic-fairness-metadata.builder';
import { buildSyntheticTaxReturn } from './synthetic-tax-return.builder';

@Injectable()
export class SyntheticTaxDataService {
  private applyOptionalSeed(seed?: number): void {
    if (seed !== undefined) {
      faker.seed(seed);
    }
  }

  private buildRecord(): SyntheticTaxRecord {
    return SyntheticTaxRecordSchema.parse({
      taxReturn: buildSyntheticTaxReturn(),
      fairness: buildFairnessMetadata(),
    });
  }

  generateOne(seed?: number): SyntheticTaxRecord {
    this.applyOptionalSeed(seed);
    return this.buildRecord();
  }

  generateMany(count: number, seed?: number): SyntheticTaxRecord[] {
    this.applyOptionalSeed(seed);
    return Array.from({ length: count }, () => this.buildRecord());
  }
}
