// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: outbound LLM calls via OpenRouter (LangChain.js — Epic 4).
// Data handled: retrieval snippets from seeded IRS publications + structured explanation prompts.
import { Module } from '@nestjs/common';

@Module({})
export class RagModule {}
