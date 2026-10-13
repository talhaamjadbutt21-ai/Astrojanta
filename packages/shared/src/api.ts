/** Uniform error body returned by every API endpoint. */
export interface ApiErrorBody {
  error: {
    code:
      | "UNAUTHENTICATED"
      | "FORBIDDEN"
      | "NOT_FOUND"
      | "CONFLICT"
      | "VALIDATION"
      | "RATE_LIMITED"
      | "QUOTA_EXCEEDED"
      | "UPSTREAM"
      | "INTERNAL";
    message: string;
    fields?: Record<string, string[]>;
  };
}

/** Header native clients send so the API returns a bearer token instead of setting a cookie. */
export const CLIENT_HEADER = "x-client";
export const MOBILE_CLIENT = "mobile";
/** httpOnly cookie holding the Supabase access token (or in-memory token in tests). */
export const SESSION_COOKIE = "astronex_session";
/** httpOnly cookie holding the Supabase refresh token so the API can rotate expired access tokens. */
export const REFRESH_COOKIE = "astronex_refresh";
