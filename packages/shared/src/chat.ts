import { z } from "zod";

export const chatLanguageSchema = z.enum(["auto", "en", "hi", "hinglish"]);

export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

export const chatRequestSchema = z.object({
  profileId: z.uuid(),
  conversationId: z.uuid().optional(),
  message: z.string().trim().min(1, { error: "Message is empty" }).max(1000),
  language: chatLanguageSchema.default("auto"),
});

export interface Conversation {
  id: string;
  profileId: string;
  title: string;
  createdAt: string;
}

export interface StoredChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface ChatQuota {
  feature?: "chat";
  used: number;
  limit: number;
  remaining: number;
  resetsAt: string;
  plan?: "guest" | "free" | "pro";
  pro: boolean;
}

export type ChatRequest = z.input<typeof chatRequestSchema>;
export type ChatLanguage = z.infer<typeof chatLanguageSchema>;

export const STARTER_QUESTIONS = [
  { topic: "Career", question: "What does my chart say about my career growth?" },
  { topic: "Marriage", question: "When is a favourable time for marriage in my chart?" },
  { topic: "Love", question: "What kind of partner suits me according to my 7th house?" },
  { topic: "Finance", question: "Which periods look strong for wealth and savings?" },
  { topic: "Current dasha", question: "Explain my current Mahadasha and Antardasha simply." },
  { topic: "Hinglish", question: "Meri kundli ke hisaab se agla saal kaisa rahega?" },
] as const;
