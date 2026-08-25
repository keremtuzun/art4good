import type { Metadata } from "next";
import CultureCanvasExperience from "@/components/culturecanvas/CultureCanvasExperience";

export const metadata: Metadata = {
  title: "CultureCanvas · Türk sanatını keşfet",
  description: "Çocuklar için Türk ve Anadolu sanatı, motifler ve yaratıcı keşif yolculukları.",
  openGraph: { title: "Art4Good CultureCanvas", description: "Türk sanatını keşfet. Kendi sanatını yarat.", images: [] },
  twitter: { card: "summary", images: [] },
};

export default function CultureCanvasPage({ params }: { params: { locale: string } }) {
  return <CultureCanvasExperience locale={params.locale === "en" ? "en" : "tr"} />;
}
