# SEBT-Ai — Engineering Rules

These rules apply to every change in this repository (humans and AI agents).

## Product
- Specs live at the repo root: `prd.md`, `backend.md`, `frontend.md`. Keep them in sync with the code.
- Platforms: web (Next.js), iOS + Android (Expo / React Native), one shared API.

## Code quality
- Write high-quality, scalable, strongly-typed TypeScript. No `any` unless unavoidable and justified.
- Shared logic lives in `packages/*`; apps never duplicate schemas or astrology math.
- Validate every external input with the zod schemas from `@sebt/shared`.
- Every data screen handles loading, empty, error, and success states.

## Security
- Clients never talk to the database. All reads/writes go through `apps/api`.
- Passwords hashed with argon2id. Session tokens are random, stored only as SHA-256 hashes.
- Web uses httpOnly + SameSite cookies; mobile uses bearer tokens stored in `expo-secure-store`.
- Never commit secrets. Only `.env.example` files are tracked.
- Rate-limit auth and AI endpoints. Never leak stack traces or whether an email exists.
- The LLM never computes chart data; it may only interpret data produced by `@sebt/astro`.

## Dependencies
- Always use the latest stable versions of packages and frameworks. Check with `npm view <pkg> version` before adding.

## UI
- Mobile-first and responsive. Test layouts at 360px width.
- The front end must look polished and attractive: consistent design tokens, smooth motion, accessible contrast, visible focus.

## Git
- Commit after every meaningful change with a clear Conventional Commit message (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`).
