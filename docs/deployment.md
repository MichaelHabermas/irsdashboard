# Deployment Guide – Render.com (Free Tier)

This project is optimized for **Render.com** — the easiest, cheapest (free forever for hobby use), and most maintainable deployment platform for this monorepo.

## Why Render?
- Free Hobby tier (750 hours/month — more than enough)
- Excellent monorepo + Docker support
- Automatic CI/CD on every `main` push
- Free HTTPS, custom domains, logs, and basic metrics
- One-click Blueprint deployment via `render.yaml`

**Note:** Free services sleep after 15 minutes of inactivity (first request may take 30-60s). Perfectly acceptable for a portfolio demo.

## One-Click Deployment (Recommended)

1. Push your code to GitHub (with `render.yaml` in root).
2. Go to [Render Dashboard](https://dashboard.render.com) → **New Blueprint**.
3. Connect your GitHub repo.
4. Render will automatically detect and create:
   - Backend (Web Service – Docker)
   - Frontend (Static Site)
5. Add your environment variables (see below).
6. Click **Deploy**.

## Manual Setup (Alternative)

### Backend (Web Service)
- **Root Directory**: `backend`
- **Runtime**: Docker
- **Dockerfile Path**: `backend/Dockerfile`
- **Plan**: Free
- **Environment Variables**: Copy from `.env.example`

### Frontend (Static Site)
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Environment Variable**:
  - `VITE_API_BASE_URL` → Your backend URL (e.g. `https://your-backend.onrender.com`)

## Required Environment Variables

| Variable              | Description                              | Example / Note                     |
|-----------------------|------------------------------------------|------------------------------------|
| `OPENROUTER_API_KEY`  | Your OpenRouter key                      | Required for RAG                   |
| `JWT_SECRET`          | Secret for JWT auth                      | Change in production               |
| `VITE_API_BASE_URL`   | Backend URL for frontend                 | Set on Frontend service            |

## Post-Deployment Steps
1. Update frontend `VITE_API_BASE_URL` to point to the deployed backend.
2. Test the app: Upload a mock tax return.
3. Add a custom domain (optional) in Render settings.

## CI/CD
Every push to `main` automatically triggers a new deploy for both services.

## Troubleshooting
- Cold start delay → Normal on free tier
- RAG not working → Check `OPENROUTER_API_KEY`
- CORS issues → Ensure backend allows the frontend URL

See `README.md` for local Docker instructions.

---

**Last Updated:** May 2026
