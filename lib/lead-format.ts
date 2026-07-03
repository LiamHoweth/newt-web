import type { Lead } from "./types";
import { formatDate, formatPhoneDisplay, formatTimingLabel } from "./utils";

export function formatLeadSummary(
  lead: Lead,
  options?: { includeDashboardUrl?: string }
): string {
  const timing = formatTimingLabel(lead.preferredTiming);
  const timingLine =
    lead.specificDate && lead.preferredTiming === "specific-date"
      ? `${timing} — ${lead.specificDate}`
      : timing;

  const lines = [
    "NEW QUOTE REQUEST — All4One Exterior Solutions",
    `Submitted: ${formatDate(lead.createdAt)}`,
    "",
    "CONTACT",
    `Name: ${lead.name}`,
    `Phone: ${formatPhoneDisplay(lead.phone)}`,
    `Email: ${lead.email || "Not provided"}`,
    "",
    "JOB DETAILS",
    `Services: ${lead.services.join(", ")}`,
    `Address/ZIP: ${lead.addressOrZip}`,
    `Preferred timing: ${timingLine}`,
  ];

  if (lead.trashCanCount != null) {
    lines.push(`Trash cans: ${lead.trashCanCount}`);
  }

  lines.push("", "NOTES", lead.notes?.trim() || "None");

  if (lead.photoUrls.length > 0) {
    lines.push("", "Photos:", ...lead.photoUrls);
  } else {
    lines.push("", "Photos: None uploaded");
  }

  lines.push(
    "",
    `Consent to contact: ${lead.consentToContact ? "Yes" : "No"}`,
    `Status: ${lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}`
  );

  if (options?.includeDashboardUrl) {
    lines.push("", `View in dashboard: ${options.includeDashboardUrl}`);
  }

  return lines.join("\n");
}
