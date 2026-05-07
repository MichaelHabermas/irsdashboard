// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: Nest provider invoked by HTTP controllers.
// Data handled: none (placeholder hello endpoint; tax orchestration in Epic 5).
import { Injectable } from '@nestjs/common';
import { TaxService } from './tax/tax.service';

@Injectable()
export class AppService {
  constructor(private readonly taxService: TaxService) {}

  getHello(): string {
    void this.taxService.assertSharedTaxReturnShape();
    return 'Hello World!';
  }
}
