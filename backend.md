# SEBT-Ai — Backend

**Status:** Draft  
**Owner:** Talha  
**Last updated:** 2026-10-05  
**Depends on:** `prd.md`

## 1. Purpose

Define the server: HTTP API, authentication, and database. The frontend must not talk to the database directly.

## 2. Stack (proposed)

- Runtime: Node.js (Express or Fastify) or Python (FastAPI) — pick one before implementation
- Database: PostgreSQL (prod-like) or SQLite (local)
- Auth: JWT in httpOnly cookie **or** session cookie
- Validation: schema validation on every write endpoint

## 3. Environment

Keep in `.env` (never commit):

- `PORT`
- `DATABASE_URL`
- `JWT_SECRET` or `SESSION_SECRET`
- `CORS_ORIGIN` (frontend origin)

## 4. Authentication (AUTH)

### 4.1 Behavior

- Passwords hashed (bcrypt/argon2), never stored in plaintext
- Register rejects duplicate emails
- Login verifies password; failed login returns generic error (do not leak whether email exists)
- Protected routes require a valid session/token
- Logout invalidates the session (or clears cookie)

### 4.2 Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/auth/register` | No | Create user |
| `POST` | `/api/auth/login` | No | Start session |
| `POST` | `/api/auth/logout` | Yes | End session |
| `GET` | `/api/auth/me` | Yes | Current user profile |

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

Never return password hashes.

## 5. Database (data storage)

### 5.1 Table: `users`

| Column | Type | Notes |
|--------|------|--------|
| `id` | UUID / PK | Generated |
| `email` | string | Unique, not null |
| `password_hash` | string | Not null |
| `created_at` | timestamp | Default now |
| `updated_at` | timestamp | Default now |

Add app tables here when PRD features are decided.

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

This spec file stays at the SEBT-Ai root until the actual API is scaffolded.
