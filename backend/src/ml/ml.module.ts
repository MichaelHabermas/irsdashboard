// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: model inference inside Node process (TensorFlow.js — Epic 3).
// Data handled: numeric feature tensors derived from synthetic returns only.
import { Module } from '@nestjs/common';

@Module({})
export class MlModule {}
