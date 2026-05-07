// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: inbound HTTP (public demo; JWT lands in Epic 5).
// Data handled: validated batch request bodies; synthetic record responses (never logged verbatim).
import { BadRequestException, Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { SyntheticBatchRequestSchema, type SyntheticTaxRecord } from '@irs/shared';

import { SyntheticTaxDataService } from './synthetic-tax-data.service';

function parseOptionalIntegerSeed(raw: string | undefined): number | undefined {
  const trimmed = raw?.trim() ?? '';
  if (trimmed === '') {
    return undefined;
  }
  const n = Number(trimmed);
  if (!Number.isInteger(n)) {
    throw new BadRequestException({
      error: 'Invalid seed',
      message: 'Query parameter seed must be a base-10 integer when provided.',
    });
  }
  return n;
}

@Controller('synthetic')
export class SyntheticDataController {
  constructor(private readonly syntheticTaxDataService: SyntheticTaxDataService) {}

  @Get('generate')
  generateOne(@Query('seed') seedRaw?: string): SyntheticTaxRecord {
    const seed = parseOptionalIntegerSeed(seedRaw);
    return this.syntheticTaxDataService.generateOne(seed);
  }

  @Post('generate/batch')
  @HttpCode(200)
  batch(@Body() body: unknown): SyntheticTaxRecord[] {
    const parsed = SyntheticBatchRequestSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.flatten());
    }
    const { count, seed } = parsed.data;
    if (count === 0) {
      return [];
    }
    return this.syntheticTaxDataService.generateMany(count, seed);
  }
}
