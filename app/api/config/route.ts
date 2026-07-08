import { NextResponse } from "next/server";
import { getEnvFlagsAsync } from "@/lib/env";
import { isPhotoUploadAvailable } from "@/lib/upload";
import { isStorageConfigured } from "@/lib/supabase";

const RUNTIME_ENV_KEYS = [
  "ADMIN_PASSWORD",
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
] as const;

export async function GET() {
  const runtimeEnv = await getEnvFlagsAsync(RUNTIME_ENV_KEYS);
  const storageMode = isStorageConfigured() ? "supabase" : "local";

  return NextResponse.json({
    photoUpload: isPhotoUploadAvailable(),
    storageMode,
    runtimeEnv,
  });
}
