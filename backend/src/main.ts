// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: inbound HTTP process bootstrap (public listener).
// Data handled: none at bootstrap (request payloads handled in controllers — Epic 5+).
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
