import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : "en");
  return { title: dict.pages.about.valuesTitle, description: dict.mission.title };
}

export default function MissionValuesPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return (
    <>
      <PageHeader eyebrow={dict.mission.eyebrow} title={dict.pages.about.valuesTitle} lede={dict.mission.title} />
      <section className="wrap pb-20">
        <Reveal className="max-w-3xl">
          {dict.mission.body.map((p, i) => (
            <p key={i} className="mb-4 text-lg text-ink/90">
              {p}
            </p>
          ))}
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {dict.mission.pillars.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06} className="card h-full p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-yellow/25 font-display text-xl text-brand-orange">
                {i + 1}
              </span>
              <b className="mt-4 block font-display text-xl">{v.title}</b>
              <p className="mt-1.5 text-muted">{v.text}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dict.pages.about.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06} className="card h-full border-l-4 border-l-brand-red p-6">
              <b className="font-display text-lg">{v.title}</b>
              <p className="mt-1.5 text-muted">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
