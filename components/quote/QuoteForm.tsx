"use client";

import { useState, useEffect, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle, Upload } from "lucide-react";
import { PREFERRED_TIMING_OPTIONS } from "@/lib/types";
import type { QuoteFormData, PreferredTiming } from "@/lib/types";

interface FieldErrors {
  [key: string]: string;
}

function QuoteFormInner() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service");

  const [services, setServices] = useState<string[]>(
    preselectedService ? [preselectedService] : []
  );
  const [preferredTiming, setPreferredTiming] =
    useState<PreferredTiming>("flexible");
  const [showTrashCanCount, setShowTrashCanCount] = useState(
    preselectedService?.toLowerCase().includes("trash") ?? false
  );
  const [photoUploadEnabled, setPhotoUploadEnabled] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");

  const serviceOptions = [
    "Trash Can Cleaning and Sanitizing",
    "Siding Cleaning",
    "Driveway Cleaning",
    "Sidewalk Cleaning",
    "Porch Cleaning",
    "Fence Cleaning",
    "General Exterior Cleaning",
  ];

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((data) => setPhotoUploadEnabled(data.photoUpload))
      .catch(() => {});
  }, []);

  function toggleService(service: string) {
    setServices((prev) => {
      const next = prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service];
      const hasTrash = next.some((s) => s.toLowerCase().includes("trash"));
      setShowTrashCanCount(hasTrash);
      return next;
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setServerError("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const data: QuoteFormData = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? "") || undefined,
      services,
      addressOrZip: String(fd.get("addressOrZip") ?? ""),
      preferredTiming,
      specificDate:
        preferredTiming === "specific-date"
          ? String(fd.get("specificDate") ?? "")
          : undefined,
      trashCanCount: showTrashCanCount
        ? Number(fd.get("trashCanCount")) || undefined
        : undefined,
      notes: String(fd.get("notes") ?? "") || undefined,
      consentToContact: fd.get("consentToContact") === "on",
    };

    try {
      let response: Response;

      if (photoUploadEnabled && photos.length > 0) {
        const multipart = new FormData();
        multipart.append("name", data.name);
        multipart.append("phone", data.phone);
        if (data.email) multipart.append("email", data.email);
        multipart.append("services", JSON.stringify(data.services));
        multipart.append("addressOrZip", data.addressOrZip);
        multipart.append("preferredTiming", data.preferredTiming);
        if (data.specificDate) multipart.append("specificDate", data.specificDate);
        if (data.trashCanCount)
          multipart.append("trashCanCount", String(data.trashCanCount));
        if (data.notes) multipart.append("notes", data.notes);
        multipart.append("consentToContact", String(data.consentToContact));
        photos.forEach((p) => multipart.append("photos", p));

        response = await fetch("/api/quote", {
          method: "POST",
          body: multipart,
        });
      } else {
        response = await fetch("/api/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          const fieldErrors: FieldErrors = {};
          for (const err of result.errors) {
            fieldErrors[err.field] = err.message;
          }
          setErrors(fieldErrors);
        } else {
          setServerError(result.error ?? "Something went wrong.");
        }
        return;
      }

      setSuccess(true);
      form.reset();
      setServices([]);
      setPhotos([]);
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-lg border border-brand-200 bg-brand-50 p-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-brand-600" aria-hidden />
        <h2 className="mt-4 text-xl font-bold text-charcoal">
          Quote request received!
        </h2>
        <p className="mt-2 text-charcoal-muted">
          Thanks for reaching out. We&apos;ll review your details and get back to
          you with a free quote soon.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="btn-secondary mt-6"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {serverError && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {serverError}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label-text">
            Full name <span className="text-red-500">*</span>
          </label>
          <input id="name" name="name" type="text" required className="input-field" autoComplete="name" />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="label-text">
            Phone <span className="text-red-500">*</span>
          </label>
          <input id="phone" name="phone" type="tel" required className="input-field" autoComplete="tel" />
          {errors.phone && <p className="error-text">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="label-text">
          Email <span className="text-charcoal-muted">(optional)</span>
        </label>
        <input id="email" name="email" type="email" className="input-field" autoComplete="email" />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <fieldset>
        <legend className="label-text">
          Service needed <span className="text-red-500">*</span>
        </legend>
        <div className="mt-2 grid gap-2">
          {serviceOptions.map((service) => (
            <label
              key={service}
              className="choice-row"
            >
              <input
                type="checkbox"
                checked={services.includes(service)}
                onChange={() => toggleService(service)}
                className="choice-input rounded"
              />
              {service}
            </label>
          ))}
        </div>
        {errors.services && <p className="error-text">{errors.services}</p>}
      </fieldset>

      <div>
        <label htmlFor="addressOrZip" className="label-text">
          Address or ZIP / service area <span className="text-red-500">*</span>
        </label>
        <input
          id="addressOrZip"
          name="addressOrZip"
          type="text"
          required
          className="input-field"
          placeholder="Street address or ZIP code"
          autoComplete="street-address"
        />
        {errors.addressOrZip && <p className="error-text">{errors.addressOrZip}</p>}
      </div>

      <fieldset>
        <legend className="label-text">
          Preferred timing <span className="text-red-500">*</span>
        </legend>
        <div className="mt-2 grid grid-cols-2 gap-2 xs:grid-cols-2 sm:flex sm:flex-wrap sm:gap-3">
          {PREFERRED_TIMING_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="choice-row col-span-1 sm:min-h-0"
            >
              <input
                type="radio"
                name="preferredTimingDisplay"
                value={opt.value}
                checked={preferredTiming === opt.value}
                onChange={() => setPreferredTiming(opt.value)}
                className="choice-input"
              />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.preferredTiming && (
          <p className="error-text">{errors.preferredTiming}</p>
        )}
      </fieldset>

      {preferredTiming === "specific-date" && (
        <div>
          <label htmlFor="specificDate" className="label-text">
            Preferred date <span className="text-red-500">*</span>
          </label>
          <input
            id="specificDate"
            name="specificDate"
            type="date"
            className="input-field"
          />
          {errors.specificDate && (
            <p className="error-text">{errors.specificDate}</p>
          )}
        </div>
      )}

      {showTrashCanCount && (
        <div>
          <label htmlFor="trashCanCount" className="label-text">
            Number of trash cans <span className="text-charcoal-muted">(optional)</span>
          </label>
          <input
            id="trashCanCount"
            name="trashCanCount"
            type="number"
            min="1"
            max="20"
            className="input-field max-w-xs"
          />
        </div>
      )}

      <div>
        <label htmlFor="notes" className="label-text">
          Notes <span className="text-charcoal-muted">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className="input-field"
          placeholder="Tell us about the job — size, access, special concerns, etc."
        />
      </div>

      {photoUploadEnabled && (
        <div>
          <label htmlFor="photos" className="label-text">
            Photos <span className="text-charcoal-muted">(optional)</span>
          </label>
          <div className="mt-1 flex items-center gap-3">
            <label className="btn-secondary cursor-pointer">
              <Upload className="h-4 w-4" aria-hidden />
              Upload photos
              <input
                id="photos"
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(e) =>
                  setPhotos(Array.from(e.target.files ?? []))
                }
              />
            </label>
            {photos.length > 0 && (
              <span className="text-sm text-charcoal-muted">
                {photos.length} file{photos.length !== 1 ? "s" : ""} selected
              </span>
            )}
          </div>
        </div>
      )}

      <div>
        <label className="choice-row items-start sm:items-center">
          <input
            type="checkbox"
            name="consentToContact"
            required
            className="choice-input mt-0.5 rounded sm:mt-0"
          />
          <span className="text-sm leading-relaxed text-charcoal sm:text-sm">
            I agree to be contacted about my quote request by call, text, or
            email. <span className="text-red-500">*</span>
          </span>
        </label>
        {errors.consentToContact && (
          <p className="error-text">{errors.consentToContact}</p>
        )}
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 sm:w-auto sm:py-2.5">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Submitting…
          </>
        ) : (
          "Submit Quote Request"
        )}
      </button>
    </form>
  );
}

export default function QuoteForm() {
  return (
    <Suspense fallback={<div className="text-charcoal-muted">Loading form…</div>}>
      <QuoteFormInner />
    </Suspense>
  );
}
