import { createOpenAI } from "@ai-sdk/openai";
import { isStepCount, streamText } from "ai";
import type { Chart, ChatLanguage, TransitSnapshot } from "@sebt/shared";
import type { Env } from "../env";
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

export function createAstrologer(env: Env): Astrologer {
  if (!env.OPENAI_API_KEY) return offlineAstrologer;

  const openai = createOpenAI({ apiKey: env.OPENAI_API_KEY });
  return {
    mode: "llm",
    stream(input) {
      const result = streamText({
        model: openai(env.AI_MODEL),
        instructions: buildInstructions({ ...input, today: new Date() }),
        messages: input.history,
        tools: chartTools(input.chart, input.transits),
        stopWhen: isStepCount(5),
        maxOutputTokens: 1200,
        abortSignal: input.abortSignal,
      });
      return result.textStream;
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
      "Add an `OPENAI_API_KEY` to the API's `.env` to enable full conversational answers.",
    ].filter((l): l is string => l !== null);

    for (const line of lines) {
      yield `${line}\n`;
      await new Promise((r) => setTimeout(r, 15));
    }
  },
};
