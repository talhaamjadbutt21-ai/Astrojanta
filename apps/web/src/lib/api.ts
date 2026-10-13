import { createApiClient } from "@astronex/shared";

/** Browser API client. Same-origin: Next.js rewrites /api/* to the API, and the session lives in an httpOnly cookie. */
export const api = createApiClient({ baseUrl: "" });
