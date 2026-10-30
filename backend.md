# Astrojanta — Backend

**Status:** Draft  
**Owner:** Talha  
**Last updated:** 2026-10-07  
**Depends on:** `prd.md`

## 1. Purpose

Define the server: HTTP API, authentication, and database. The frontend must not talk to the database directly.

## 2. Stack

- Runtime: Node.js + Fastify (`apps/api`)
- Database: PostgreSQL via Supabase (PGlite in local/test when `DATABASE_URL` is unset)
- Auth: Supabase Auth, email + password, session delivered as httpOnly cookies
- Validation: Zod schemas from `@astrojanta/shared` on every write endpoint

## 3. Environment

Keep in `.env` (never commit):

- `PORT`
- `DATABASE_URL` (Supabase pooler, port 6543, in production)
- `DATABASE_MIGRATE_URL` (direct Postgres, port 5432, for migrations)
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (API-only; never send to the browser)
- `CORS_ORIGINS` (frontend origin, `https://your-domain` in production)
- `ADMIN_EMAILS` (comma-separated; empty = no admins)
- `DATA_ENCRYPTION_KEY` (32-byte base64; required in production)
- `GEMINI_API_KEY` (Google AI Studio; Gemma 4 `gemma-4-26b-a4b-it` by default). `OPENAI_API_KEY` is an optional fallback. One of the two is required in production.
- `TRUST_PROXY` (`true` behind HTTPS reverse proxies)
- `GUEST_DAILY_ATTEMPTS` (default 3 per tool), `GUEST_KUNDLI_DAILY_ATTEMPTS` (default 1, kundli only), `FREE_DAILY_QUESTIONS` (default 2), `PRO_DAILY_QUESTIONS` (default 6)
- `PRO_REQUEST_EMAIL` (inbox for Pro requests; default `talha.amjadbutt.21@gmail.com`)
- `RESEND_API_KEY` + `MAIL_FROM` (send Pro request / payment / activation emails; without these, requests are stored only)
- `PRO_PAYMENT_LINK_MONTHLY` / `PRO_PAYMENT_LINK_YEARLY` (optional URLs included in the customer email)

## 4. Authentication (AUTH)

The web app never uses `@supabase/supabase-js`. Register and login are `POST /api/auth/register` and `POST /api/auth/login` with email and password. The API talks to Supabase Auth, upserts a local `users` row (`id` = Supabase user id), and sets `astrojanta_session` (access token) plus `astrojanta_refresh` (refresh token) as httpOnly cookies.

### 4.1 Behavior

- Passwords are stored by Supabase Auth, never in our database
- Register rejects duplicate emails (`409`)
- Login verifies password; failed login returns a generic error (do not leak whether email exists)
- Protected routes require a valid access token (cookie or `Authorization: Bearer`)
- Logout revokes the Supabase session and clears cookies

### 4.2 Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/auth/register` | No | Create user |
| `POST` | `/api/auth/login` | No | Start session |
| `POST` | `/api/auth/logout` | Yes | End session |
| `GET` | `/api/auth/me` | Yes | Current user profile |
| `POST` | `/api/charts` | No | Compute a birth chart (`?feature=kundli\|manglik\|moon_sign`); spends one daily attempt |
| `POST` | `/api/matching` | No | Ashtakoot Guna Milan; spends one daily matching attempt |
| `GET` | `/api/usage` | No | Daily remaining attempts per tool (guest cookie or signed-in user) |
| `GET` | `/api/pro/config` | No | Manual Pro request email |
| `POST` | `/api/pro/inquiries` | Optional | Store a Pro payment-link request |
| `POST` | `/api/chat` | Yes | Stream an AI answer; free vs Pro daily quota |
| `GET` | `/api/admin/overview` | Admin | User, chat and Pro counts |
| `GET` | `/api/admin/pro-inquiries` | Admin | Recent Pro payment-link requests |
| `POST` | `/api/admin/pro` | Admin | Grant or revoke Pro by account email |

### 4.3 Bodies (draft)

**POST `/api/auth/register`**

```json
{ "email": "user@example.com", "password": "string" }
```

**POST `/api/auth/login`**

```json
{ "email": "user@example.com", "password": "string" }
```

**GET `/api/auth/me` success**

```json
{ "id": "uuid", "email": "user@example.com" }
```

Never return tokens to web clients (cookies only). Never return password hashes.

## 5. Database (data storage)

### 5.1 Table: `users`

| Column | Type | Notes |
|--------|------|--------|
| `id` | UUID / PK | Same as Supabase `auth.users.id` |
| `email` | string | Unique, not null |
| `pro_until` | timestamp | Nullable; Pro quota while in the future |
| `created_at` | timestamp | Default now |
| `updated_at` | timestamp | Default now |

### 5.1b Table: `pro_inquiries`

| Column | Type | Notes |
|--------|------|--------|
| `id` | UUID / PK | Generated |
| `user_id` | UUID / FK users | Nullable, set null on user delete |
| `name` | string | Not null |
| `email` | string | Not null |
| `phone` | string | Optional |
| `plan` | `monthly` \| `yearly` | Not null |
| `message` | string | Optional |
| `created_at` | timestamp | Default now |

### 5.2 Rules

- All reads/writes go through the backend
- Use parameterized queries / ORM (no string-concat SQL)
- Migrations for schema changes

## 6. Cross-cutting API

- JSON only
- CORS limited to the frontend origin
- `401` unauthenticated, `403` forbidden, `404` missing, `409` conflict (e.g. email taken), `422` validation
- Log errors server-side; do not leak stack traces to clients

## 7. Folder sketch (when code is added)

```
backend/
  src/
    routes/auth.ts
    middleware/auth.ts
    db/
    models/
```

This spec file stays at the Astrojanta root until the actual API is scaffolded.
