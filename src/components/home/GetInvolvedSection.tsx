import type { Dictionary, Locale } from "@/lib/i18n";
import SectionHeading from "@/components/SectionHeading";
import GetInvolvedGrid from "@/components/GetInvolvedGrid";

export default function GetInvolvedSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section id="get-involved" className="bg-cream-2 py-20 md:py-28">
      <div className="wrap">
        <SectionHeading eyebrow={dict.getInvolved.eyebrow} title={dict.getInvolved.title} lede={dict.getInvolved.lede} />
        <div className="mt-10">
          <GetInvolvedGrid dict={dict} locale={locale} />
        </div>
      </div>
    </section>
  );
}
