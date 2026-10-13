# Astrojanta — Frontend

**Status:** Draft  
**Owner:** Talha  
**Last updated:** 2026-10-07  
**Depends on:** `prd.md`, `backend.md`

## 1. Purpose

Define the client application: pages, UI behavior, and how it talks to the backend.

## 2. Stack (proposed)

- Framework: Next.js (App Router) or React + Vite — pick one before implementation
- Styling: CSS modules or Tailwind
- HTTP: `fetch` or a small API client
- Auth on the client: email + password posted to the API; session is an httpOnly cookie. The browser never talks to Supabase.

## 3. Pages / routes

| Route | Auth | Purpose |
|-------|------|---------|
| `/` | Public | Landing / home |
| `/kundli` | Public | Free Janam Kundli |
| `/matching` | Public | Ashtakoot Guna Milan |
| `/manglik` | Public | Manglik dosha calculator |
| `/moon-sign` | Public | Moon sign and nakshatra |
| `/pricing` | Public | Free vs Pro; request payment link by email |
| `/privacy` | Public | Privacy Policy (DPDP) |
| `/terms` | Public | Terms of Use |
| `/login` | Public | Sign in |
| `/register` | Public | Create account |
| `/dashboard` | Required | Main app after login |
| `/admin` | Required (admin email) | Site overview counts |
| `/chat/:profileId` | Required | AI astrologer (3 free questions/day) |
| `/logout` | Required | Clear session and redirect |

## 4. Auth UX

- Guest hitting a protected route → redirect to `/login` with return URL.
- Logged-in user hitting `/login` or `/register` → redirect to `/dashboard`.
- Show loading state while session is checked.
- Show API error messages on login/register (invalid credentials, email taken).
- Logout clears client state and calls `POST /api/auth/logout`, which revokes the Supabase session and clears cookies.

## 5. Forms

**Register**

- Email, password, confirm password (client-side match check)
- Disable submit while request is in flight

**Login**

- Email, password
- Disable submit while request is in flight

## 6. API usage (client)

Base URL from env, e.g. `NEXT_PUBLIC_API_URL` or `VITE_API_URL`.

| Action | Method | Path |
|--------|--------|------|
| Register | `POST` | `/api/auth/register` |
| Login | `POST` | `/api/auth/login` |
| Logout | `POST` | `/api/auth/logout` |
| Current user | `GET` | `/api/auth/me` |
| Compute chart | `POST` | `/api/charts` |
| Kundli matching | `POST` | `/api/matching` |
| Pro config | `GET` | `/api/pro/config` |
| Pro inquiry | `POST` | `/api/pro/inquiries` |
| Admin overview | `GET` | `/api/admin/overview` |
| Admin Pro grant | `POST` | `/api/admin/pro` |

Request/response shapes must match `backend.md`. Send credentials (`credentials: 'include'`) if using cookies.

## 7. UI states

Every data screen should handle:

- Loading
- Empty
- Error
- Success

## 8. Accessibility and basics

- Labels on all inputs
- Keyboard-usable forms
- Visible focus
- Do not put secrets in frontend env except public API base URL

## 9. Folder sketch (when code is added)

```
frontend/
  src/
    app/ or pages/
    components/
    lib/api.ts
    lib/auth.ts
```

This spec file stays at the Astrojanta root until the actual app is scaffolded.
