import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : "en");
  return { title: dict.pages.privacy.title, description: dict.pages.privacy.lede, robots: { index: false } };
}

export default function PrivacyPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return (
    <>
      <PageHeader eyebrow={dict.footer.legal} title={dict.pages.privacy.title} lede={dict.pages.privacy.lede} />
      <section className="wrap pb-24">
        <p className="text-sm italic text-muted">{dict.pages.privacy.updated}</p>
        <div className="mt-8 max-w-3xl space-y-8">
          {dict.pages.privacy.body.map((b) => (
            <div key={b.h}>
              <h2 className="text-xl">{b.h}</h2>
              <p className="mt-2 text-lg text-ink/85">{b.p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
