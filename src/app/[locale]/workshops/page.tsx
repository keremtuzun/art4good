import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import JourneyTimeline from "@/components/home/JourneyTimeline";
import GalleryStrip from "@/components/home/GalleryStrip";
import Reveal from "@/components/Reveal";
import ArtImage from "@/components/ArtImage";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : "en");
  return { title: dict.pages.workshops.title, description: dict.pages.workshops.lede };
}

export default function WorkshopsPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  const arts = ["clay", "paint", "kids", "workshop"] as const;
  return (
    <>
      <PageHeader eyebrow={dict.nav.workshops} title={dict.pages.workshops.title} lede={dict.pages.workshops.lede} />
      <section className="wrap pb-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-14">
          <Reveal>
            {dict.pages.workshops.body.map((p, i) => (
              <p key={i} className="mb-4 text-lg text-ink/90">
                {p}
              </p>
            ))}
          </Reveal>
          <div className="grid grid-cols-2 gap-3">
            {arts.map((a, i) => (
              <Reveal key={a} delay={i * 0.05} className="relative aspect-square overflow-hidden rounded-2xl border-[5px] border-white shadow-soft">
                <ArtImage artKey={a} alt={dict.pages.workshops.title} seed={`ws-${a}`} rounded={false} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <JourneyTimeline dict={dict} />
      <GalleryStrip dict={dict} locale={params.locale} />
    </>
  );
}
