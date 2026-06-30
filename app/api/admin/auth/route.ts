import { NextRequest, NextResponse } from "next/server";
import {
  verifyPassword,
  setAdminSession,
  clearAdminSession,
  isAdminPasswordConfigured,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  if (!isAdminPasswordConfigured()) {
    return NextResponse.json(
      { error: "Admin password not configured. Set ADMIN_PASSWORD in .env" },
      { status: 503 }
    );
  }

  const { password } = await request.json();

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  return setAdminSession(response);
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  return clearAdminSession(response);
}
