import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : "en");
  return { title: dict.pages.accessibility.title, description: dict.pages.accessibility.lede };
}

export default function AccessibilityPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return (
    <>
      <PageHeader eyebrow={dict.footer.legal} title={dict.pages.accessibility.title} lede={dict.pages.accessibility.lede} />
      <section className="wrap pb-24">
        <div className="max-w-3xl space-y-4">
          {dict.pages.accessibility.body.map((p, i) => (
            <p key={i} className="text-lg text-ink/85">
              {p}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
