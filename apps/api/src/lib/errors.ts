import type { ApiErrorBody } from "@sebt/shared";

type Code = ApiErrorBody["error"]["code"];

const STATUS: Record<Code, number> = {
  UNAUTHENTICATED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  VALIDATION: 422,
  RATE_LIMITED: 429,
  QUOTA_EXCEEDED: 429,
  UPSTREAM: 502,
  INTERNAL: 500,
};

export class AppError extends Error {
  readonly statusCode: number;

  constructor(
    readonly code: Code,
    message: string,
    readonly fields?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = STATUS[code];
  }

  toBody(): ApiErrorBody {
    return { error: { code: this.code, message: this.message, ...(this.fields ? { fields: this.fields } : {}) } };
  }
}

export const unauthenticated = () => new AppError("UNAUTHENTICATED", "Please sign in to continue");
export const notFound = (what = "Resource") => new AppError("NOT_FOUND", `${what} not found`);
