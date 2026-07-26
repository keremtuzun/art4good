import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import ArtImage from "@/components/ArtImage";
import Reveal from "@/components/Reveal";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : "en");
  return { title: dict.pages.about.title, description: dict.pages.about.lede };
}

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return (
    <>
      <PageHeader eyebrow={dict.nav.about} title={dict.pages.about.title} lede={dict.pages.about.lede} />
      <section className="wrap pb-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <Reveal>
            {dict.pages.about.body.map((p, i) => (
              <p key={i} className="mb-4 text-lg text-ink/90">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-[4/5] overflow-hidden rounded-[30px] border-[6px] border-white shadow-lift">
            <ArtImage artKey="workshop" alt={dict.pages.about.title} seed="about" />
          </Reveal>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl">{dict.pages.about.valuesTitle}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dict.pages.about.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06} className="card h-full p-6">
                <b className="font-display text-lg">{v.title}</b>
                <p className="mt-1.5 text-muted">{v.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <Link href={`/${params.locale}/mission-values`} className="link-underline font-bold text-brand-red">
              {dict.pages.about.valuesTitle} →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
