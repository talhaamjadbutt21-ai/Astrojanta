import { type ApiErrorBody, CLIENT_HEADER, MOBILE_CLIENT } from "./api";
import type { AuthResponse, LoginInput, RegisterInput, User } from "./auth";
import type { BirthDetailsInput, Place } from "./birth";
import type { Chart, TransitSnapshot } from "./chart";
import type { ChatQuota, ChatRequest, Conversation, StoredChatMessage } from "./chat";
import type { CreateProfileInput, Profile } from "./profile";

export type PlaceResult = Place & { id: string };
export interface ChartResult {
  chart: Chart;
  transits: TransitSnapshot;
}
export interface ProfileDetail extends ChartResult {
  profile: Profile;
}

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: ApiErrorBody["error"]["code"] | "NETWORK",
    message: string,
    readonly fields?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface ApiClientOptions {
  /** API origin, e.g. "https://api.example.com". Use "" for same-origin (web via Next.js rewrites). */
  baseUrl: string;
  /** Native clients: returns the bearer token. Web clients rely on the httpOnly cookie instead. */
  getToken?: () => string | null | Promise<string | null>;
  /** Sends `x-client: mobile` so auth endpoints return a token instead of setting a cookie. */
  mobile?: boolean;
  /** Custom fetch (React Native needs `expo/fetch` for streaming). */
  fetch?: typeof fetch;
  onUnauthenticated?: () => void;
}

export function createApiClient(options: ApiClientOptions) {
  const doFetch = options.fetch ?? globalThis.fetch.bind(globalThis);

  async function headers(json: boolean): Promise<Record<string, string>> {
    const h: Record<string, string> = { accept: "application/json" };
    if (json) h["content-type"] = "application/json";
    if (options.mobile) h[CLIENT_HEADER] = MOBILE_CLIENT;
    const token = await options.getToken?.();
    if (token) h.authorization = `Bearer ${token}`;
    return h;
  }

  async function send(method: string, path: string, body?: unknown, signal?: AbortSignal): Promise<Response> {
    let res: Response;
    try {
      res = await doFetch(`${options.baseUrl}${path}`, {
        method,
        headers: await headers(body !== undefined),
        body: body === undefined ? undefined : JSON.stringify(body),
        credentials: "include",
        signal,
      });
    } catch (err) {
      if ((err as Error).name === "AbortError") throw err;
      throw new ApiError(0, "NETWORK", "Can't reach the server. Check your connection and try again.");
    }
    if (!res.ok) {
      const payload = (await res.json().catch(() => null)) as ApiErrorBody | null;
      if (res.status === 401) options.onUnauthenticated?.();
      throw new ApiError(
        res.status,
        payload?.error.code ?? "INTERNAL",
        payload?.error.message ?? `Request failed (${res.status})`,
        payload?.error.fields,
      );
    }
    return res;
  }

  async function json<T>(method: string, path: string, body?: unknown): Promise<T> {
    const res = await send(method, path, body);
    return (res.status === 204 ? undefined : await res.json()) as T;
  }

  return {
    auth: {
      register: (input: RegisterInput) => json<AuthResponse>("POST", "/api/auth/register", input),
      login: (input: LoginInput) => json<AuthResponse>("POST", "/api/auth/login", input),
      logout: () => json<void>("POST", "/api/auth/logout"),
      me: () => json<{ user: User }>("GET", "/api/auth/me"),
      deleteAccount: () => json<void>("DELETE", "/api/auth/me"),
    },
    places: {
      search: (q: string) => json<{ results: PlaceResult[] }>("GET", `/api/places?q=${encodeURIComponent(q)}`),
    },
    charts: {
      compute: (birth: BirthDetailsInput) => json<ChartResult>("POST", "/api/charts", birth),
    },
    profiles: {
      list: () => json<{ profiles: Profile[] }>("GET", "/api/profiles"),
      get: (id: string) => json<ProfileDetail>("GET", `/api/profiles/${id}`),
      create: (input: CreateProfileInput) => json<{ profile: Profile }>("POST", "/api/profiles", input),
      remove: (id: string) => json<void>("DELETE", `/api/profiles/${id}`),
    },
    chat: {
      quota: () => json<{ quota: ChatQuota }>("GET", "/api/chat/quota"),
      conversations: (profileId: string) =>
        json<{ conversations: Conversation[] }>("GET", `/api/conversations?profileId=${profileId}`),
      messages: (conversationId: string) =>
        json<{ conversation: Conversation; messages: StoredChatMessage[] }>(
          "GET",
          `/api/conversations/${conversationId}/messages`,
        ),
      deleteConversation: (id: string) => json<void>("DELETE", `/api/conversations/${id}`),
      /** Streams the answer, invoking `onText` with the accumulated text after every chunk. */
      async stream(
        req: ChatRequest,
        { onText, signal }: { onText: (text: string) => void; signal?: AbortSignal },
      ): Promise<{ conversationId: string; text: string }> {
        const res = await send("POST", "/api/chat", req, signal);
        const conversationId = res.headers.get("x-conversation-id") ?? req.conversationId ?? "";
        let text = "";
        const reader = res.body?.getReader();
        if (!reader) {
          text = await res.text();
          onText(text);
          return { conversationId, text };
        }
        const decoder = new TextDecoder();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          text += decoder.decode(value, { stream: true });
          onText(text);
        }
        text += decoder.decode();
        onText(text);
        return { conversationId, text };
      },
    },
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;
