// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: Nest DI compile-only smoke (no listening HTTP server).
// Data handled: none.
import { Test } from '@nestjs/testing';

import { AppModule } from './app.module';

describe('AppModule (smoke)', () => {
  it('compiles the DI graph', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    expect(moduleRef).toBeDefined();
    await moduleRef.close();
  });
});
