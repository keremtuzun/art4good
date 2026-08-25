import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken } from "@/lib/culturecanvas/adminAuth";

export async function POST(request: NextRequest) {
  const configuredSecret = process.env.CULTURECANVAS_ADMIN_SECRET;
  if (!configuredSecret) return NextResponse.json({ error: "Yönetici erişimi yapılandırılmamış." }, { status: 503 });

  const body = (await request.json().catch(() => null)) as { password?: unknown } | null;
  if (!body || typeof body.password !== "string" || body.password !== configuredSecret) {
    return NextResponse.json({ error: "Parola doğru değil." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, adminToken(configuredSecret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}
