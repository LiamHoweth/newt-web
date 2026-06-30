import type { QuoteFormData } from "./types";
import { PREFERRED_TIMING_OPTIONS } from "./types";

export interface ValidationError {
  field: string;
  message: string;
}

export function validateQuoteForm(data: QuoteFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name?.trim()) {
    errors.push({ field: "name", message: "Full name is required." });
  }

  if (!data.phone?.trim()) {
    errors.push({ field: "phone", message: "Phone number is required." });
  } else if (data.phone.replace(/\D/g, "").length < 10) {
    errors.push({ field: "phone", message: "Enter a valid phone number." });
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({ field: "email", message: "Enter a valid email address." });
  }

  if (!data.services?.length) {
    errors.push({
      field: "services",
      message: "Select at least one service.",
    });
  }

  if (!data.addressOrZip?.trim()) {
    errors.push({
      field: "addressOrZip",
      message: "Address or ZIP is required.",
    });
  }

  const validTimings = PREFERRED_TIMING_OPTIONS.map((o) => o.value);
  if (!validTimings.includes(data.preferredTiming)) {
    errors.push({
      field: "preferredTiming",
      message: "Select a preferred timing option.",
    });
  }

  if (data.preferredTiming === "specific-date" && !data.specificDate?.trim()) {
    errors.push({
      field: "specificDate",
      message: "Please enter your preferred date.",
    });
  }

  if (!data.consentToContact) {
    errors.push({
      field: "consentToContact",
      message: "You must agree to be contacted about your quote.",
    });
  }

  return errors;
}
