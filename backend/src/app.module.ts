// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: Nest module graph composition (service-internal).
// Data handled: none directly (modules wire controllers/services only).
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SyntheticDataModule } from './synthetic-data/synthetic-data.module';
import { MlModule } from './ml/ml.module';
import { RagModule } from './rag/rag.module';
import { TaxModule } from './tax/tax.module';

@Module({
  imports: [AuthModule, SyntheticDataModule, MlModule, RagModule, TaxModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
