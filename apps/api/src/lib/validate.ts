import type { z } from "zod";
import { AppError } from "./errors";

/** Parses untrusted input, throwing a 422 with per-field messages on failure. */
export function parse<T extends z.ZodType>(schema: T, input: unknown): z.infer<T> {
  const result = schema.safeParse(input);
  if (result.success) return result.data;

  const fields: Record<string, string[]> = {};
  for (const issue of result.error.issues) {
    const key = issue.path.join(".") || "_";
    (fields[key] ??= []).push(issue.message);
  }
  throw new AppError("VALIDATION", "Please check the highlighted fields", fields);
}
