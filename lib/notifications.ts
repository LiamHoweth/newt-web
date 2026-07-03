import { Resend } from "resend";
import type { Lead } from "./types";
import { formatLeadSummary } from "./lead-format";
import { getAdminDashboardUrl, formatTimingLabel } from "./utils";

/**
 * Email notifications via Resend.
 * Configure RESEND_API_KEY and OWNER_NOTIFICATION_EMAIL in .env
 * Falls back to console logging when not configured.
 */
export async function sendOwnerEmailNotification(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.OWNER_NOTIFICATION_EMAIL;
  const from =
    process.env.RESEND_FROM_EMAIL ?? "All4One Quotes <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.log("[notifications] Email not configured — lead saved:", {
      id: lead.id,
      name: lead.name,
      phone: lead.phone,
    });
    return;
  }

  const resend = new Resend(apiKey);
  const dashboardUrl = getAdminDashboardUrl();
  const body = formatLeadSummary(lead, { includeDashboardUrl: dashboardUrl });

  const { error } = await resend.emails.send({
    from,
    to,
    subject: `New quote request from ${lead.name}`,
    text: body,
  });

  if (error) {
    console.error("[notifications] Resend error:", error);
    throw new Error("Failed to send email notification");
  }
}

/**
 * SMS notifications via Twilio (optional).
 * Configure TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,
 * TWILIO_FROM_NUMBER, and OWNER_SMS_NUMBER in .env.
 * App works fully without Twilio — this is skipped when env vars are missing.
 */
export async function sendOwnerSmsNotification(lead: Lead): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;
  const toNumber = process.env.OWNER_SMS_NUMBER;

  if (!accountSid || !authToken || !fromNumber || !toNumber) {
    console.log("[notifications] Twilio not configured — skipping SMS");
    return;
  }

  // Dynamic import so Twilio is not required at build time when unused
  const twilio = (await import("twilio")).default;
  const client = twilio(accountSid, authToken);

  const dashboardUrl = getAdminDashboardUrl();
  const serviceList = lead.services.join(", ");
  const timing = formatTimingLabel(lead.preferredTiming);

  // Do not include full address in SMS — summary only
  const body = `New All4One lead: ${lead.name}, ${serviceList}, ${timing}. Call: ${lead.phone}. View: ${dashboardUrl}`;

  try {
    await client.messages.create({
      body,
      from: fromNumber,
      to: toNumber,
    });
  } catch (err) {
    console.error("[notifications] Twilio error:", err);
    // Non-fatal — lead is already saved
  }
}

export async function notifyOwner(lead: Lead): Promise<void> {
  await Promise.allSettled([
    sendOwnerEmailNotification(lead),
    sendOwnerSmsNotification(lead),
  ]);
}
