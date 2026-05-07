// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: inbound HTTP (health/demo endpoints — auth lands in Epic 5).
// Data handled: none for now (no request bodies logged).
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
