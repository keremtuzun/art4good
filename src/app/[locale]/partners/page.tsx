import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { PARTNERS, ACCENTS } from "@/content/data";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : "en");
  return { title: dict.pages.partners.title, description: dict.pages.partners.lede };
}

export default function PartnersPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return (
    <>
      <PageHeader eyebrow={dict.nav.about} title={dict.pages.partners.title} lede={dict.pages.partners.lede} />
      <section className="wrap pb-24">
        <Reveal>
          <p className="max-w-2xl text-lg text-muted">{dict.pages.partners.body}</p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.04} className="card flex items-center gap-4 p-5">
              <span className="grid h-12 w-12 flex-none place-items-center rounded-xl font-display text-lg text-white" style={{ background: ACCENTS[p.color] }}>
                {p.name.charAt(0)}
              </span>
              <span className="font-semibold">{p.name}</span>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
