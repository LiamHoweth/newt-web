import { NextResponse } from "next/server";
import { getSettings } from "@/lib/storage";

/** Public endpoint for site settings (no secrets). */
export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}
