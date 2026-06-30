import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getLeads } from "@/lib/storage";
import type { LeadStatus } from "@/lib/types";

export async function GET(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as LeadStatus | null;
  const service = searchParams.get("service");
  const search = searchParams.get("search");

  try {
    const leads = await getLeads({
      status: status ?? undefined,
      service: service ?? undefined,
      search: search ?? undefined,
    });
    return NextResponse.json({ leads });
  } catch (err) {
    console.error("[admin/leads] GET error:", err);
    return NextResponse.json(
      { error: "Failed to load leads" },
      { status: 500 }
    );
  }
}
