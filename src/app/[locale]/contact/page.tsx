import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { INSTAGRAM_URL, CONTACT_EMAIL } from "@/content/data";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : "en");
  return { title: dict.pages.contact.title, description: dict.pages.contact.lede };
}

export default function ContactPage({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: { interest?: string };
}) {
  const dict = getDictionary(params.locale);
  return (
    <>
      <PageHeader eyebrow={dict.nav.contact} title={dict.pages.contact.title} lede={dict.pages.contact.lede} />
      <section className="wrap pb-24">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
          <Reveal>
            <div className="space-y-8">
              <div>
                <h2 className="text-xl">{dict.pages.contact.reachTitle}</h2>
                <a href={`mailto:${CONTACT_EMAIL}`} className="link-underline mt-2 inline-block text-lg font-semibold text-brand-red">
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div>
                <h2 className="text-xl">{dict.pages.contact.followTitle}</h2>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="link-underline mt-2 inline-flex items-center gap-2 text-lg font-semibold">
                  <svg viewBox="0 0 24 24" width="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  @art4good.ist
                </a>
              </div>
              <p className="max-w-sm text-muted">{dict.footer.based}.</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mb-4 text-xl">{dict.pages.contact.formTitle}</h2>
            <ContactForm dict={dict} defaultInterest={searchParams.interest} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
