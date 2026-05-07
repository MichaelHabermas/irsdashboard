// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: HTTP integration (Supertest, in-memory Nest app).
// Data handled: validates response shape only; no payload logging.
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
  SYNTHETIC_BATCH_MAX,
  SyntheticTaxRecordSchema,
  type SyntheticTaxRecord,
} from '@irs/shared';
import type { Server } from 'http';
import request from 'supertest';

import { AppModule } from '../app.module';

function httpServer(app: INestApplication): Server {
  return app.getHttpServer() as Server;
}

async function createTestApp(): Promise<INestApplication> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const nestApp = moduleRef.createNestApplication();
  nestApp.setGlobalPrefix('api');
  await nestApp.init();
  return nestApp;
}

function assertSyntheticRecord(body: unknown): asserts body is SyntheticTaxRecord {
  const parsed = SyntheticTaxRecordSchema.safeParse(body);
  expect(parsed.success).toBe(true);
}

describe('SyntheticDataController (HTTP)', () => {
  let app: INestApplication;
  let server: Server;

  beforeAll(async () => {
    app = await createTestApp();
    server = httpServer(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/synthetic/generate returns a synthetic record', async () => {
    const res = await request(server).get('/api/synthetic/generate').expect(200);
    assertSyntheticRecord(res.body);
    expect(res.body.taxReturn.taxYear).toBeGreaterThanOrEqual(2020);
    expect(res.body.fairness.ageGroup).toContain('synthetic_');
  });

  it('GET /api/synthetic/generate respects seed', async () => {
    const first = await request(server).get('/api/synthetic/generate?seed=77').expect(200);
    const second = await request(server).get('/api/synthetic/generate?seed=77').expect(200);
    assertSyntheticRecord(first.body);
    assertSyntheticRecord(second.body);
    expect(first.body).toEqual(second.body);
  });

  it('GET /api/synthetic/generate rejects non-integer seed', async () => {
    await request(server).get('/api/synthetic/generate?seed=abc').expect(400);
  });

  it('POST /api/synthetic/generate/batch returns N records', async () => {
    const res = await request(server)
      .post('/api/synthetic/generate/batch')
      .send({ count: 3, seed: 9001 })
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    const rows = res.body as unknown[];
    expect(rows).toHaveLength(3);
    assertSyntheticRecord(rows[0]);
  });

  it('POST batch returns [] when count is 0', async () => {
    const res = await request(server)
      .post('/api/synthetic/generate/batch')
      .send({ count: 0 })
      .expect(200);
    expect(res.body).toEqual([]);
  });

  it('POST batch rejects count above cap', async () => {
    await request(server)
      .post('/api/synthetic/generate/batch')
      .send({ count: SYNTHETIC_BATCH_MAX + 1 })
      .expect(400);
  });

  it('POST batch rejects invalid count type', async () => {
    await request(server).post('/api/synthetic/generate/batch').send({ count: 'five' }).expect(400);
  });

  it('GET /api/synthetic/generate ignores empty seed query', async () => {
    const res = await request(server).get('/api/synthetic/generate?seed=').expect(200);
    assertSyntheticRecord(res.body);
  });

  it('POST batch rejects non-integer seed', async () => {
    await request(server)
      .post('/api/synthetic/generate/batch')
      .send({ count: 1, seed: 1.25 })
      .expect(400);
  });
});
