# Privacy posture: 100% synthetic builds only.
# Trust boundary: container image build (CI/deploy artifact).
# Data handled: none at build time.

FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9.15.5 --activate

WORKDIR /app

ENV HUSKY=0
ENV CI=true

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY tsconfig.base.json ./
COPY backend/package.json backend/
COPY shared/package.json shared/
COPY frontend/package.json frontend/

RUN pnpm install --frozen-lockfile

COPY shared ./shared
COPY backend ./backend

RUN pnpm --filter @irs/shared build && pnpm --filter @irs/backend build
RUN pnpm --filter @irs/backend deploy --prod /prod/app

FROM node:20-alpine AS production

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

COPY --from=builder /prod/app ./

COPY --chown=nestjs:nodejs data ./data
COPY --chown=nestjs:nodejs models ./models

USER nestjs

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=5 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1

CMD ["node", "dist/main.js"]
