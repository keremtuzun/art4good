import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import ImpactCounters from "@/components/home/ImpactCounters";
import JourneyTimeline from "@/components/home/JourneyTimeline";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : "en");
  return { title: dict.pages.impact.title, description: dict.pages.impact.lede };
}

export default function ImpactPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return (
    <>
      <PageHeader eyebrow={dict.impact.eyebrow} title={dict.pages.impact.title} lede={dict.pages.impact.lede} />
      <ImpactCounters dict={dict} locale={params.locale} />
      <JourneyTimeline dict={dict} />
    </>
  );
}
