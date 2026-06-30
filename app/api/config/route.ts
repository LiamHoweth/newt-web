import { NextResponse } from "next/server";
import { isPhotoUploadAvailable } from "@/lib/upload";
import { getStorageMode } from "@/lib/storage";

export async function GET() {
  return NextResponse.json({
    photoUpload: isPhotoUploadAvailable(),
    storageMode: getStorageMode(),
  });
}
