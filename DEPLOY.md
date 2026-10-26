# Deploying Astrojanta on Vercel (free Hobby, two projects)

Both apps are separate Vercel projects from this one repo:

| | Web | API |
|---|---|---|
| Root Directory | `apps/web` | `apps/api` |
| Framework Preset | Next.js | Other |
| Install Command | `cd ../.. && npm ci` (from `vercel.json`) | `cd ../.. && npm ci` (from `vercel.json`) |
| Build Command | `next build` | `npm run build` |
| Output Directory | default | `public` |
| Region | `bom1` (Mumbai) | `bom1` (Mumbai) |
| Node.js version | 22.x | 22.x |

Turn on "Include files outside the root directory" (it's on by default) in both projects.

## 0. One-time secrets
- `DATA_ENCRYPTION_KEY`: `openssl rand -base64 32`. Store a backup in a password manager. Losing it makes stored birth data unreadable; changing it breaks existing rows.
- Supabase (Project Settings → Database → Connection string):
  - `DATABASE_URL` = **Transaction pooler**, port **6543** (prepared statements are disabled automatically).
  - `DATABASE_MIGRATE_URL` = **Direct** connection, port 5432 (used only for migrations, from your laptop).
- Supabase (Project Settings → API): `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

## 1. Run database migrations (from your machine, before the first deploy and after schema changes)
The API never migrates at boot on Vercel.
```bash
git clone https://github.com/talhaamjadbutt21-ai/Astrojanta && cd Astrojanta
npm ci
# apps/api/.env is gitignored; put only these two lines in it, or export them in your shell:
#   DATABASE_URL=postgresql://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres
#   DATABASE_MIGRATE_URL=postgresql://postgres:<password>@db.<ref>.supabase.co:5432/postgres
npm run db:migrate -w @astrojanta/api
```

## 2. API project
1. Vercel → Add New → Project → import the repo → Root Directory `apps/api`, preset **Other**.
2. Environment Variables (Production):
   `NODE_ENV=production`, `TRUST_PROXY=true`, `DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `DATA_ENCRYPTION_KEY`, `CORS_ORIGINS` (e.g. `https://astrojanta.vercel.app`, https only), `ADMIN_EMAILS`, `GEMINI_API_KEY` (or `OPENAI_API_KEY`), `RESEND_API_KEY`, `MAIL_FROM`, `PRO_REQUEST_EMAIL`.
   Optional: `AI_MODEL`, `SESSION_TTL_DAYS`, `GUEST_DAILY_ATTEMPTS`, `FREE_DAILY_QUESTIONS`, `PRO_DAILY_QUESTIONS`, `PRO_PAYMENT_LINK_MONTHLY`, `PRO_PAYMENT_LINK_YEARLY`.
   Do **not** set `DATABASE_MIGRATE_URL` here.
3. Deploy, then open `https://<api-project>.vercel.app/api/health` and you should see `{"ok":true,...}`.
4. If the API deploy has a misconfigured env, requests return a generic 500 and the reason is in Vercel → Logs.

## 3. Web project
1. Add New → Project → same repo → Root Directory `apps/web`, preset **Next.js**.
2. Environment Variables: `API_URL=https://<api-project>.vercel.app`, `NEXT_PUBLIC_SITE_URL=https://<web-project>.vercel.app`, `NEXT_PUBLIC_SUPPORT_EMAIL`.
3. Deploy. Put the final web URL into the API's `CORS_ORIGINS` and redeploy the API.

The browser only talks to the web domain; Next.js proxies `/api/*` to `API_URL`, so session cookies stay first-party.

## Security rules
- No Supabase/AI/Resend keys on the web project and never in a `NEXT_PUBLIC_*` variable.
- Never commit `.env` files. Run `gitleaks git .` before pushing.
- In Vercel → API project → Settings → Deployment Protection, leave preview protection on.

## Limitations (Hobby)
- Functions max 300 s; AI chat streams must finish within that (web chat proxy is 180 s).
- Rate limits are in-memory per function instance, so they're approximate (an instance restart or a second instance resets/splits counts).
- Cold starts add ~1–3 s to the first request after idle.
- Hobby is for non-commercial use per Vercel's terms.

`render.yaml` is no longer used.
