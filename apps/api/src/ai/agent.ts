import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import type { Chart, ChatLanguage, TransitSnapshot } from "@astrojanta/shared";
import { isStepCount, streamText } from "ai";
import { type Env, googleApiKey } from "../env";
import { buildInstructions } from "./prompt";
import { chartTools } from "./tools";

export interface AstrologerInput {
  chart: Chart;
  transits: TransitSnapshot;
  personName: string;
  language: ChatLanguage;
  history: { role: "user" | "assistant"; content: string }[];
  abortSignal?: AbortSignal;
}

export interface Astrologer {
  readonly mode: "llm" | "offline";
  stream(input: AstrologerInput): AsyncIterable<string>;
}

function openRouterModelId(model: string): string {
  return model.includes("/") ? model : `google/${model}`;
}

function languageModel(env: Env) {
  const googleKey = googleApiKey(env);
  if (googleKey?.startsWith("sk-or-")) {
    return createOpenAI({
      apiKey: googleKey,
      baseURL: "https://openrouter.ai/api/v1",
      headers: { "HTTP-Referer": "http://localhost:3000", "X-Title": "Astrojanta" },
    })(openRouterModelId(env.AI_MODEL));
  }
  if (googleKey) return createGoogleGenerativeAI({ apiKey: googleKey })(env.AI_MODEL);
  if (env.OPENAI_API_KEY?.startsWith("sk-or-")) {
    return createOpenAI({
      apiKey: env.OPENAI_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
      headers: { "HTTP-Referer": "http://localhost:3000", "X-Title": "Astrojanta" },
    })(openRouterModelId(env.AI_MODEL));
  }
  if (env.OPENAI_API_KEY) return createOpenAI({ apiKey: env.OPENAI_API_KEY })(env.AI_MODEL);
  return null;
}

export function createAstrologer(env: Env): Astrologer {
  const model = languageModel(env);
  if (!model) return offlineAstrologer;

  return {
    mode: "llm",
    async *stream(input) {
      const result = streamText({
        model,
        instructions: buildInstructions({ ...input, today: new Date() }),
        messages: input.history,
        tools: chartTools(input.chart, input.transits),
        // Keep tool loops short so the first visible token arrives before proxies time out.
        stopWhen: isStepCount(3),
        // Gemma spends many tokens on internal reasoning; budget enough for a full answer after tools.
        maxOutputTokens: 4096,
        abortSignal: input.abortSignal,
        providerOptions: {
          google: {
            // Only one of thinkingBudget / thinkingLevel is allowed.
            thinkingConfig: { thinkingLevel: "minimal" },
          },
        },
      });
      // textStream can end empty on provider errors; drain fullStream so failures throw.
      for await (const part of result.fullStream) {
        if (part.type === "text-delta") yield part.text;
        else if (part.type === "error") throw part.error;
      }
    },
  };
}

/** Deterministic, chart-grounded fallback used when no LLM key is configured (local dev, outages). */
export const offlineAstrologer: Astrologer = {
  mode: "offline",
  async *stream({ chart, transits }) {
    const d = chart.dasha.current;
    const lines = [
      "_The AI model isn't configured yet, so here is a quick summary straight from your chart._",
      "",
      chart.lagna ? `• **Lagna (Ascendant):** ${chart.lagna.sign}` : "• **Lagna:** needs an exact birth time",
      `• **Moon sign (Rashi):** ${chart.moonSign} · **Nakshatra:** ${chart.birthNakshatra}`,
      `• **Sun sign:** ${chart.sunSign}`,
      d ? `• **Current dasha:** ${d.maha} Mahadasha / ${d.antar} Antardasha (until ${d.antarEnds.slice(0, 10)})` : null,
      `• **Sade Sati:** ${transits.sadeSati.active ? `active — ${transits.sadeSati.phase} phase` : "not active"}`,
      chart.yogas.length ? `• **Yogas:** ${chart.yogas.map((y) => y.name).join(", ")}` : null,
      "",
      "Add a `GEMINI_API_KEY` (Google AI Studio) to the API's `.env` to enable full conversational answers.",
    ].filter((l): l is string => l !== null);

    for (const line of lines) {
      yield `${line}\n`;
      await new Promise((r) => setTimeout(r, 15));
    }
  },
};
