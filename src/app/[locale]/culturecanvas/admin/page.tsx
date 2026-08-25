import type { Metadata } from "next";
import { cookies } from "next/headers";
import AdminLogin from "@/components/culturecanvas/AdminLogin";
import DatasetStudio from "@/components/culturecanvas/DatasetStudio";
import { ADMIN_COOKIE, isAdminTokenValid } from "@/lib/culturecanvas/adminAuth";

export const metadata: Metadata = { title: "CultureCanvas Veri Stüdyosu", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function CultureCanvasAdminPage() {
  const secret = process.env.CULTURECANVAS_ADMIN_SECRET;
  const authenticated = Boolean(secret && isAdminTokenValid(cookies().get(ADMIN_COOKIE)?.value, secret));
  if (!authenticated) return <AdminLogin configured={Boolean(secret)} />;
  return <DatasetStudio />;
}
