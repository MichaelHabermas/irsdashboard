// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: unit test (no HTTP).
// Data handled: minimal TaxReturn-shaped fixture only.
import { Test } from '@nestjs/testing';

import { TaxService } from './tax.service';

describe('TaxService', () => {
  it('assertSharedTaxReturnShape returns true for minimal valid payload', async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TaxService],
    }).compile();

    const svc = moduleRef.get(TaxService);
    expect(svc.assertSharedTaxReturnShape()).toBe(true);
    await moduleRef.close();
  });
});
