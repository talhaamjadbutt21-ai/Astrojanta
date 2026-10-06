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
export const SESSION_COOKIE = "sebt_session";
