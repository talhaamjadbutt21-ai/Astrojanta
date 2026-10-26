import { DEFAULT_PRO_REQUEST_EMAIL, type ProConfig, proInquirySchema } from "@astrojanta/shared";
import type { FastifyInstance } from "fastify";
import type { AppContext } from "../app";
import { proInquiries } from "../db/schema";
import { parse } from "../lib/validate";
import { sendProInquiryEmails } from "../services/mail";

export async function proRoutes(app: FastifyInstance, ctx: AppContext) {
  const { db, env, mailer } = ctx;

  app.get("/api/pro/config", async () => {
    const body: ProConfig = {
      mode: "manual",
      requestEmail: env.PRO_REQUEST_EMAIL ?? DEFAULT_PRO_REQUEST_EMAIL,
      mailEnabled: mailer.enabled,
      hasPaymentLink: Boolean(env.PRO_PAYMENT_LINK_MONTHLY || env.PRO_PAYMENT_LINK_YEARLY),
    };
    return body;
  });

  app.post(
    "/api/pro/inquiries",
    { config: { rateLimit: { max: 8, timeWindow: "1 minute" } } },
    async (request, reply) => {
      const input = parse(proInquirySchema, request.body);
      const [row] = await db
        .insert(proInquiries)
        .values({
          userId: request.auth?.userId ?? null,
          name: input.name,
          email: input.email,
          phone: input.phone ?? null,
          plan: input.plan,
          message: input.message ?? null,
        })
        .returning({ id: proInquiries.id });

      let emailed = false;
      try {
        const sent = await sendProInquiryEmails(mailer, env, {
          name: input.name,
          email: input.email,
          phone: input.phone,
          plan: input.plan,
          message: input.message,
        });
        emailed = sent.admin || sent.customer;
        if (sent.errors.length) {
          request.log.warn({ errors: sent.errors, to: input.email }, "pro inquiry email partial failure");
        }
      } catch (err) {
        request.log.error({ err }, "pro inquiry email failed");
      }

      return reply.code(201).send({
        id: row!.id,
        requestEmail: env.PRO_REQUEST_EMAIL ?? DEFAULT_PRO_REQUEST_EMAIL,
        emailed,
      });
    },
  );
}
