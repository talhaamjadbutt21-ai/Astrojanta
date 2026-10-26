"use client";

import { ApiError, type ChatLanguage, STARTER_QUESTIONS } from "@astrojanta/shared";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowUp, History, MessageSquarePlus, Sparkles, Square, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { ChartView } from "@/components/chart-view";
import { RichText } from "@/components/rich-text";
import { Button, ButtonLink } from "@/components/ui/button";
import { Badge, Card, Skeleton } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/lib/api";
import { cn } from "@/lib/cn";
import { useRequireSession } from "@/lib/session";

interface UiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  failed?: boolean;
}

const LANGUAGES: { value: ChatLanguage; label: string }[] = [
  { value: "auto", label: "Auto" },
  { value: "en", label: "English" },
  { value: "hi", label: "हिंदी" },
  { value: "hinglish", label: "Hinglish" },
];

export function ChatScreen({ profileId }: { profileId: string }) {
  const qc = useQueryClient();
  const { data: user } = useRequireSession(`/chat/${profileId}`);
  const [tab, setTab] = useState<"chat" | "kundli">("chat");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<ChatLanguage>("auto");
  const [streaming, setStreaming] = useState(false);
  const [quotaHit, setQuotaHit] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const detail = useQuery({
    queryKey: ["profile", profileId],
    queryFn: () => api.profiles.get(profileId),
    enabled: Boolean(user),
  });
  const conversations = useQuery({
    queryKey: ["conversations", profileId],
    queryFn: () => api.chat.conversations(profileId),
    enabled: Boolean(user),
  });
  const quota = useQuery({ queryKey: ["quota"], queryFn: () => api.chat.quota(), enabled: Boolean(user) });

  // biome-ignore lint/correctness/useExhaustiveDependencies: `messages` is the trigger for auto-scrolling.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: streaming ? "auto" : "smooth" });
  }, [messages, streaming]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const openConversation = useCallback(async (id: string) => {
    abortRef.current?.abort();
    setHistoryOpen(false);
    setConversationId(id);
    setMessages([]);
    const res = await api.chat.messages(id);
    setMessages(res.messages.map((m) => ({ id: m.id, role: m.role, content: m.content })));
  }, []);

  const newChat = () => {
    abortRef.current?.abort();
    setConversationId(null);
    setMessages([]);
    setHistoryOpen(false);
    setQuotaHit(null);
    inputRef.current?.focus();
  };

  const send = async (text: string) => {
    const message = text.trim();
    if (!message || streaming) return;
    setInput("");
    setQuotaHit(null);
    const assistantId = crypto.randomUUID();
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: "user", content: message },
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setStreaming(true);
    const controller = new AbortController();
    abortRef.current = controller;

    const update = (patch: Partial<UiMessage>) =>
      setMessages((m) => m.map((msg) => (msg.id === assistantId ? { ...msg, ...patch } : msg)));

    try {
      const res = await api.chat.stream(
        { profileId, conversationId: conversationId ?? undefined, message, language },
        { signal: controller.signal, onText: (content) => update({ content }) },
      );
      if (res.conversationId) setConversationId(res.conversationId);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      if (err instanceof ApiError && err.code === "QUOTA_EXCEEDED") {
        setQuotaHit(err.message);
        setMessages((m) => m.filter((msg) => msg.id !== assistantId));
      } else {
        update({ content: err instanceof Error ? err.message : "Something went wrong.", failed: true });
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
      void qc.invalidateQueries({ queryKey: ["conversations", profileId] });
      void qc.invalidateQueries({ queryKey: ["quota"] });
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  if (detail.isError) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-2xl">Chart not found</h1>
        <p className="mt-2 text-sm text-muted">It may have been deleted, or it belongs to another account.</p>
        <ButtonLink href="/dashboard" className="mt-6">
          Back to dashboard
        </ButtonLink>
      </div>
    );
  }

  const profile = detail.data?.profile;
  const chart = detail.data?.chart;

  const historyList = (
    <div className="flex h-full flex-col gap-3">
      <Button variant="secondary" size="sm" onClick={newChat} className="w-full">
        <MessageSquarePlus className="size-4" /> New conversation
      </Button>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {conversations.isPending ? (
          <div className="grid gap-2">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
        ) : (conversations.data?.conversations.length ?? 0) === 0 ? (
          <p className="px-2 py-4 text-center text-xs text-muted">Your conversations will appear here.</p>
        ) : (
          <ul className="grid gap-1">
            {conversations.data!.conversations.map((c) => (
              <li key={c.id} className="group flex items-center">
                <button
                  type="button"
                  onClick={() => void openConversation(c.id)}
                  className={cn(
                    "min-w-0 flex-1 truncate rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                    c.id === conversationId
                      ? "bg-gold-400/12 text-gold-100"
                      : "text-muted hover:bg-white/5 hover:text-ink",
                  )}
                >
                  {c.title}
                </button>
                <button
                  type="button"
                  aria-label="Delete conversation"
                  className="grid size-8 shrink-0 place-items-center rounded-full text-muted opacity-0 hover:text-red-300 focus:opacity-100 group-hover:opacity-100"
                  onClick={async () => {
                    await api.chat.deleteConversation(c.id);
                    if (c.id === conversationId) newChat();
                    void qc.invalidateQueries({ queryKey: ["conversations", profileId] });
                  }}
                >
                  <Trash2 className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <div className="mx-auto flex h-[calc(100dvh-4rem)] w-full max-w-7xl gap-6 px-0 sm:px-6 lg:py-6">
      <aside className="hidden w-72 shrink-0 flex-col gap-4 lg:flex">
        <Card className="p-5">
          {profile && chart ? (
            <>
              <p className="text-xs uppercase tracking-wider text-muted">Chart of</p>
              <h2 className="font-display text-2xl">{profile.name}</h2>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {chart.lagna && <Badge tone="gold">{chart.lagna.sign} Lagna</Badge>}
                <Badge>{chart.moonSign} Moon</Badge>
                <Badge>{chart.birthNakshatra}</Badge>
              </div>
              {chart.dasha.current && (
                <p className="mt-3 text-xs text-muted">
                  Running {chart.dasha.current.maha}–{chart.dasha.current.antar} dasha
                </p>
              )}
            </>
          ) : (
            <Skeleton className="h-24" />
          )}
        </Card>
        <Card className="min-h-0 flex-1 p-3">{historyList}</Card>
      </aside>

      <section className="glass flex min-w-0 flex-1 flex-col overflow-hidden sm:rounded-3xl">
        <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2.5 sm:px-5">
          <Link
            href="/dashboard"
            className="grid size-9 place-items-center rounded-full text-muted hover:bg-white/5 lg:hidden"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div className="flex rounded-full bg-white/5 p-1" role="tablist">
            {(["chat", "kundli"] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm capitalize transition-colors",
                  tab === t ? "bg-gradient-gold text-night-950" : "text-muted hover:text-ink",
                )}
              >
                {t === "chat" ? "AI Chat" : "Kundli"}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            {quota.data && (
              <span className="hidden text-xs text-muted sm:inline">{quota.data.quota.remaining} left today</span>
            )}
            <select
              aria-label="Answer language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as ChatLanguage)}
              className="h-9 rounded-full border border-white/10 bg-night-900 px-3 text-sm text-ink focus:border-gold-400/60 focus:outline-none"
            >
              {LANGUAGES.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setHistoryOpen(true)}
              className="grid size-9 place-items-center rounded-full text-muted hover:bg-white/5 lg:hidden"
              aria-label="Conversation history"
            >
              <History className="size-5" />
            </button>
          </div>
        </div>

        {tab === "kundli" ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {chart && detail.data && profile ? (
              <ChartView chart={chart} transits={detail.data.transits} name={profile.name} />
            ) : (
              <Skeleton className="h-96" />
            )}
          </div>
        ) : (
          <>
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-8" aria-live="polite">
              {messages.length === 0 ? (
                <div className="mx-auto flex max-w-2xl flex-col items-center pt-6 text-center sm:pt-12">
                  <div className="grid size-16 place-items-center rounded-full bg-gradient-gold text-night-950 shadow-[0_0_60px_-10px_rgb(242_181_68/0.8)]">
                    <Sparkles className="size-7" />
                  </div>
                  <h1 className="mt-5 font-display text-2xl sm:text-3xl">
                    Ask about {profile ? `${profile.name}’s` : "this"} chart
                  </h1>
                  <p className="mt-2 max-w-md text-sm text-muted">
                    Answers are grounded in the computed Kundli. Ask in English, हिंदी or Hinglish.
                  </p>
                  <div className="mt-8 grid w-full gap-2 sm:grid-cols-2">
                    {STARTER_QUESTIONS.map((s) => (
                      <button
                        key={s.question}
                        type="button"
                        onClick={() => void send(s.question)}
                        disabled={streaming || !detail.data}
                        className="glass rounded-2xl px-4 py-3 text-left text-sm transition-colors hover:border-gold-400/40 hover:bg-white/8 disabled:opacity-50"
                      >
                        <span className="block text-[11px] uppercase tracking-wider text-gold-300">{s.topic}</span>
                        {s.question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <ol className="mx-auto grid max-w-3xl gap-5">
                  {messages.map((m) => (
                    <motion.li
                      key={m.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn("flex", m.role === "user" ? "justify-end" : "justify-start gap-3")}
                    >
                      {m.role === "assistant" && (
                        <div className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-gradient-gold text-night-950">
                          <Sparkles className="size-4" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[85%] rounded-3xl px-4 py-3 text-[15px] sm:max-w-[80%] sm:px-5",
                          m.role === "user"
                            ? "rounded-br-lg bg-gold-400/15 text-ink"
                            : m.failed
                              ? "rounded-tl-lg border border-red-400/30 bg-red-500/10 text-red-200"
                              : "rounded-tl-lg bg-white/[0.05] text-ink/95",
                        )}
                      >
                        {m.role === "assistant" && !m.content ? (
                          streaming ? (
                            <span className="flex items-center gap-2 text-sm text-muted">
                              <Spinner className="size-4" /> Reading your chart…
                            </span>
                          ) : (
                            <p className="text-sm text-muted">No reply came back. Please try again.</p>
                          )
                        ) : m.role === "assistant" ? (
                          <RichText text={m.content} />
                        ) : (
                          <p className="whitespace-pre-wrap">{m.content}</p>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </ol>
              )}
              {quotaHit && (
                <Card className="mx-auto mt-6 max-w-xl border-gold-400/30 text-center">
                  <h2 className="font-display text-xl">You’ve used today’s 3 free questions</h2>
                  <p className="mt-2 text-sm text-muted">{quotaHit}</p>
                  <ButtonLink href="/pricing" className="mt-5">
                    See Pro plans
                  </ButtonLink>
                </Card>
              )}
            </div>

            <form
              onSubmit={onSubmit}
              className="border-t border-white/8 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4"
            >
              <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-3xl border border-white/10 bg-night-900/80 p-2 focus-within:border-gold-400/50">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                      e.preventDefault();
                      void send(input);
                    }
                  }}
                  rows={1}
                  maxLength={1000}
                  placeholder="Ask about career, marriage, timing…"
                  aria-label="Your question"
                  className="max-h-40 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-[15px] text-ink placeholder:text-muted/60 focus:outline-none [field-sizing:content]"
                />
                {streaming ? (
                  <Button
                    type="button"
                    variant="secondary"
                    className="size-11 shrink-0 p-0"
                    onClick={() => abortRef.current?.abort()}
                    aria-label="Stop generating"
                  >
                    <Square className="size-4 fill-current" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="size-11 shrink-0 p-0"
                    disabled={!input.trim() || !detail.data}
                    aria-label="Send"
                  >
                    <ArrowUp className="size-5" />
                  </Button>
                )}
              </div>
              <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-muted/80">
                Guidance, not certainty. Not medical, legal or financial advice.
              </p>
            </form>
          </>
        )}
      </section>

      <AnimatePresence>
        {historyOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setHistoryOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-sm flex-col gap-4 border-l border-white/10 bg-night-900 p-4 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              aria-label="Conversation history"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl">Conversations</h2>
                <button
                  type="button"
                  onClick={() => setHistoryOpen(false)}
                  className="grid size-9 place-items-center rounded-full text-muted hover:bg-white/10"
                  aria-label="Close"
                >
                  <X className="size-5" />
                </button>
              </div>
              {historyList}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
