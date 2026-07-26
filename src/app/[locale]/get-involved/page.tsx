import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import GetInvolvedGrid from "@/components/GetInvolvedGrid";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : "en");
  return { title: dict.pages.getInvolved.title, description: dict.pages.getInvolved.lede };
}

export default function GetInvolvedPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return (
    <>
      <PageHeader eyebrow={dict.getInvolved.eyebrow} title={dict.pages.getInvolved.title} lede={dict.pages.getInvolved.lede} />
      <section className="wrap pb-16">
        <GetInvolvedGrid dict={dict} locale={params.locale} />
      </section>
      <section className="wrap pb-24">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-14">
          <Reveal>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] leading-tight">{dict.pages.contact.formTitle}</h2>
            <p className="mt-3 text-lg text-muted">{dict.getInvolved.lede}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm dict={dict} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
