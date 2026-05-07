# ==================== Stage 1: Builder ====================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY shared/package*.json ./shared/

RUN npm ci

# Copy source
COPY shared/ ./shared/
COPY frontend/ ./frontend/

# Build frontend
WORKDIR /app/frontend
RUN npm run build

# ==================== Stage 2: Production (nginx) ====================
FROM nginx:alpine AS production

# Copy built static files
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Copy custom nginx config (optional but recommended)
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s CMD wget --quiet --tries=1 --spider http://localhost || exit 1
