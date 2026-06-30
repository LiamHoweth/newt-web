import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/lib/storage";
import { validateQuoteForm } from "@/lib/validation";
import { notifyOwner } from "@/lib/notifications";
import { uploadQuotePhotos } from "@/lib/upload";
import type { QuoteFormData } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") ?? "";

    let formData: QuoteFormData;
    let photoFiles: File[] = [];

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const servicesRaw = form.get("services");
      let services: string[] = [];
      if (typeof servicesRaw === "string") {
        try {
          services = JSON.parse(servicesRaw);
        } catch {
          services = servicesRaw.split(",").map((s) => s.trim()).filter(Boolean);
        }
      }

      formData = {
        name: String(form.get("name") ?? ""),
        phone: String(form.get("phone") ?? ""),
        email: form.get("email") ? String(form.get("email")) : undefined,
        services,
        addressOrZip: String(form.get("addressOrZip") ?? ""),
        preferredTiming: String(form.get("preferredTiming") ?? "") as QuoteFormData["preferredTiming"],
        specificDate: form.get("specificDate")
          ? String(form.get("specificDate"))
          : undefined,
        trashCanCount: form.get("trashCanCount")
          ? Number(form.get("trashCanCount"))
          : undefined,
        notes: form.get("notes") ? String(form.get("notes")) : undefined,
        consentToContact: form.get("consentToContact") === "true",
      };

      const photos = form.getAll("photos");
      photoFiles = photos.filter((f): f is File => f instanceof File && f.size > 0);
    } else {
      const body = await request.json();
      formData = body as QuoteFormData;
    }

    const errors = validateQuoteForm(formData);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const photoUrls = await uploadQuotePhotos(photoFiles);

    const lead = await createLead({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email?.trim() || null,
      services: formData.services,
      addressOrZip: formData.addressOrZip.trim(),
      preferredTiming: formData.preferredTiming,
      specificDate: formData.specificDate ?? null,
      trashCanCount: formData.trashCanCount ?? null,
      notes: formData.notes?.trim() || null,
      photoUrls,
      consentToContact: formData.consentToContact,
    });

    // Fire-and-forget notifications — lead is already persisted
    notifyOwner(lead).catch((err) =>
      console.error("[quote] Notification error:", err)
    );

    return NextResponse.json({ success: true, id: lead.id });
  } catch (err) {
    console.error("[quote] Submit error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
