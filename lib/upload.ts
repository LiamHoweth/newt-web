import { getSupabaseAdmin, isStorageConfigured } from "./supabase";
import { v4 as uuidv4 } from "uuid";

const BUCKET = "quote-photos";

/**
 * Upload quote photos to Supabase Storage when configured.
 * Returns public URLs for saved files.
 */
export async function uploadQuotePhotos(
  files: File[]
): Promise<string[]> {
  if (!isStorageConfigured() || files.length === 0) return [];

  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const urls: string[] = [];

  for (const file of files) {
    if (!file.type.startsWith("image/")) continue;
    if (file.size > 5 * 1024 * 1024) continue; // 5MB limit

    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `quotes/${uuidv4()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, buffer, { contentType: file.type, upsert: false });

    if (error) {
      console.error("[upload] Supabase storage error:", error.message);
      continue;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    if (data?.publicUrl) urls.push(data.publicUrl);
  }

  return urls;
}

export function isPhotoUploadAvailable(): boolean {
  return isStorageConfigured();
}
