# Deploying Astrojanta (free tier)

## API → Render
1. Render → New → Blueprint → pick this repo (uses `render.yaml`).
2. Fill every `sync: false` variable in the dashboard. Never commit values.
   - `CORS_ORIGINS=https://<your-vercel-domain>` (https only; enforced in production)
   - `DATA_ENCRYPTION_KEY`: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` — back it up; losing it makes stored birth data unreadable.
3. Migrations run automatically on start (`apps/api/drizzle`).

## Web → Vercel
1. Import repo, Root Directory `apps/web` (uses `apps/web/vercel.json`, installs from the monorepo root).
2. Env: `API_URL=https://<render-service>.onrender.com`, `NEXT_PUBLIC_SITE_URL=https://<vercel-domain>`, `NEXT_PUBLIC_SUPPORT_EMAIL`.
3. The browser only calls `/api/*` on the Vercel domain; Next proxies to `API_URL`, so session cookies are first-party.

## Never
- Put Supabase/AI/Resend keys in any `NEXT_PUBLIC_*` variable or on Vercel at all — the web app needs none of them.
- Commit `.env` files (gitignored; `gitleaks git .` should report no leaks before every push).
