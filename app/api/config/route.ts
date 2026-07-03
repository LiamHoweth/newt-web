import { NextResponse } from "next/server";
import { getEnvFlags } from "@/lib/env";
import { isPhotoUploadAvailable } from "@/lib/upload";
import { getStorageMode } from "@/lib/storage";

const RUNTIME_ENV_KEYS = [
  "ADMIN_PASSWORD",
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
] as const;

export async function GET() {
  return NextResponse.json({
    photoUpload: isPhotoUploadAvailable(),
    storageMode: getStorageMode(),
    runtimeEnv: getEnvFlags(RUNTIME_ENV_KEYS),
  });
}
