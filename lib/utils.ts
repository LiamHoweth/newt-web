export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (url) return url.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export function getAdminDashboardUrl(): string {
  return `${getSiteUrl()}/admin`;
}

/** Host + path for display (e.g. all4oneexterior.com/admin). Safe on client. */
export function getAdminUrlDisplay(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    return `${siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}/admin`;
  }
  if (typeof window !== "undefined") {
    return `${window.location.host}/admin`;
  }
  return "localhost:3000/admin";
}

export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatTimingLabel(timing: string): string {
  const map: Record<string, string> = {
    "same-day": "Same-day",
    "this-week": "This week",
    flexible: "Flexible",
    "specific-date": "Specific date",
  };
  return map[timing] ?? timing;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
