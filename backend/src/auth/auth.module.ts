// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: authentication module (JWT demo users — Epic 5).
// Data handled: credentials/tokens only (no tax return payloads).
import { Module } from '@nestjs/common';

@Module({})
export class AuthModule {}
