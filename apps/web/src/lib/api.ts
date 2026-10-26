import { createApiClient } from "@astrojanta/shared";

/** Browser API client. Same-origin: Next.js rewrites /api/* to the API, and the session lives in an httpOnly cookie. */
export const api = createApiClient({ baseUrl: "" });
