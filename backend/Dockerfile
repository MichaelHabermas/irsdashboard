# ==================== Stage 1: Builder ====================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY shared/package*.json ./shared/

RUN npm ci

# Copy source
COPY shared/ ./shared/
COPY backend/ ./backend/

# Build backend
WORKDIR /app/backend
RUN npm run build

# ==================== Stage 2: Production ====================
FROM node:20-alpine AS production

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
COPY backend/package*.json ./backend/

RUN npm ci --only=production

# Copy built files
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/shared ./shared

# Copy necessary folders
COPY backend/package*.json ./backend/
COPY data/ ./data/
COPY models/ ./models/

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Run as non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    chown -R nestjs:nodejs /app

USER nestjs

CMD ["node", "backend/dist/main"]
