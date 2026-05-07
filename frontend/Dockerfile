# Privacy posture: 100% synthetic builds only.
# Trust boundary: static asset build (browser bundle).
# Data handled: none at build time.

FROM node:20-alpine AS builder

ARG VITE_API_BASE_URL=http://localhost:3000
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN corepack enable && corepack prepare pnpm@9.15.5 --activate

WORKDIR /app

ENV CI=true

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY tsconfig.base.json ./
COPY backend/package.json backend/
COPY shared/package.json shared/
COPY frontend/package.json frontend/

RUN pnpm install --frozen-lockfile

COPY shared ./shared
COPY frontend ./frontend

RUN pnpm --filter @irs/shared build && pnpm --filter @irs/frontend build

FROM nginx:alpine AS production

COPY --from=builder /app/frontend/dist /usr/share/nginx/html

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1
