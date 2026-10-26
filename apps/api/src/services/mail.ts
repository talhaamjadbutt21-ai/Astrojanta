import { DEFAULT_PRO_REQUEST_EMAIL, type ProPlan } from "@astrojanta/shared";
import { Resend } from "resend";
import type { Env } from "../env";

export interface MailMessage {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}

export interface Mailer {
  readonly enabled: boolean;
  send(message: MailMessage): Promise<boolean>;
}

export function createMailer(env: Env): Mailer {
  const apiKey = env.RESEND_API_KEY;
  const from = env.MAIL_FROM;
  if (!apiKey || !from) {
    return {
      enabled: false,
      async send() {
        return false;
      },
    };
  }

  const resend = new Resend(apiKey);
  return {
    enabled: true,
    async send(message) {
      const { error } = await resend.emails.send({
        from,
        to: message.to,
        subject: message.subject,
        text: message.text,
        ...(message.replyTo ? { replyTo: message.replyTo } : {}),
      });
      if (error) throw new Error(error.message);
      return true;
    },
  };
}

function adminInbox(env: Env): string {
  return env.PRO_REQUEST_EMAIL ?? DEFAULT_PRO_REQUEST_EMAIL;
}

function paymentLink(env: Env, plan: ProPlan): string | undefined {
  return plan === "yearly" ? env.PRO_PAYMENT_LINK_YEARLY : env.PRO_PAYMENT_LINK_MONTHLY;
}

function planLabel(plan: ProPlan): string {
  return plan === "yearly" ? "Pro yearly ($29.99)" : "Pro monthly ($2.99)";
}

async function sendSafe(mailer: Mailer, message: MailMessage): Promise<{ ok: boolean; error?: string }> {
  try {
    const ok = await mailer.send(message);
    return { ok };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/** Notify admin + email the requester with next steps / payment link when configured. */
export async function sendProInquiryEmails(
  mailer: Mailer,
  env: Env,
  input: { name: string; email: string; phone?: string; plan: ProPlan; message?: string },
): Promise<{ admin: boolean; customer: boolean; errors: string[] }> {
  if (!mailer.enabled) return { admin: false, customer: false, errors: ["Mailer is not configured"] };

  const inbox = adminInbox(env);
  const link = paymentLink(env, input.plan);
  const errors: string[] = [];
  const adminText = [
    `New Astrojanta Pro request`,
    ``,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.phone ? `Phone: ${input.phone}` : null,
    `Plan: ${planLabel(input.plan)}`,
    input.message ? `Note: ${input.message}` : null,
    ``,
    `1. Send / confirm payment.`,
    `2. Grant Pro in /admin for ${input.email}.`,
  ]
    .filter(Boolean)
    .join("\n");

  const customerText = [
    `Hi ${input.name},`,
    ``,
    `Thanks for requesting ${planLabel(input.plan)} on Astrojanta.`,
    ``,
    link
      ? [
          `Pay here to activate Pro:`,
          link,
          ``,
          `After payment, reply to this email with your receipt if needed. We will turn on Pro for ${input.email}.`,
        ].join("\n")
      : `We received your request. Reply to this email (or wait for our reply) to get a payment link. After you pay, Pro will be turned on for ${input.email}.`,
    ``,
    `— Astrojanta`,
  ].join("\n");

  // Send independently so a Resend sandbox block on the customer address
  // does not cancel the admin notification.
  const adminResult = await sendSafe(mailer, {
    to: inbox,
    subject: `Astrojanta Pro request — ${input.plan} — ${input.email}`,
    text: adminText,
    replyTo: input.email,
  });
  if (!adminResult.ok && adminResult.error) errors.push(`admin: ${adminResult.error}`);

  // Avoid a duplicate when the requester used the admin inbox address.
  let customerOk = adminResult.ok;
  if (input.email.toLowerCase() !== inbox.toLowerCase()) {
    const customerResult = await sendSafe(mailer, {
      to: input.email,
      subject: link ? `Astrojanta Pro — complete payment` : `Astrojanta Pro — request received`,
      text: customerText,
      replyTo: inbox,
    });
    customerOk = customerResult.ok;
    if (!customerResult.ok && customerResult.error) errors.push(`customer: ${customerResult.error}`);
  } else {
    // One combined note already went to the inbox as the admin mail.
    customerOk = adminResult.ok;
  }

  return { admin: adminResult.ok, customer: customerOk, errors };
}

/** Tell the customer their account is Pro (or revoked). */
export async function sendProStatusEmail(
  mailer: Mailer,
  env: Env,
  input: { email: string; plan: "monthly" | "yearly" | "revoke"; proUntil: Date | null },
): Promise<boolean> {
  if (!mailer.enabled) return false;
  const inbox = adminInbox(env);

  if (input.plan === "revoke") {
    return mailer.send({
      to: input.email,
      subject: "Astrojanta Pro — access ended",
      text: [
        `Hi,`,
        ``,
        `Pro access on your Astrojanta account (${input.email}) has been turned off.`,
        `You can request Pro again anytime from the pricing page.`,
        ``,
        `— Astrojanta`,
      ].join("\n"),
      replyTo: inbox,
    });
  }

  const until = input.proUntil ? input.proUntil.toLocaleDateString("en-GB", { dateStyle: "medium" }) : "the end of your plan";
  return mailer.send({
    to: input.email,
    subject: "Astrojanta Pro — you're in",
    text: [
      `Hi,`,
      ``,
      `Pro is now active on ${input.email}.`,
      `Plan: ${planLabel(input.plan)}`,
      `Access until: ${until}`,
      ``,
      `You now get 6 attempts per tool each day. Sign in at the site and keep asking.`,
      ``,
      `— Astrojanta`,
    ].join("\n"),
    replyTo: inbox,
  });
}
