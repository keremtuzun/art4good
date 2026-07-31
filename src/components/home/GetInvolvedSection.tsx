import type { Dictionary, Locale } from "@/lib/i18n";
import SectionHeading from "@/components/SectionHeading";
import GetInvolvedGrid from "@/components/GetInvolvedGrid";

export default function GetInvolvedSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section
      id="get-involved"
      className="py-20 md:py-28"
      style={{ backgroundImage: "linear-gradient(180deg,#FFF6E4 0%,#FDEAF2 55%,#EFE9FF 100%)" }}
    >
      <div className="wrap">
        <SectionHeading eyebrow={dict.getInvolved.eyebrow} title={dict.getInvolved.title} lede={dict.getInvolved.lede} />
        <div className="mt-10">
          <GetInvolvedGrid dict={dict} locale={locale} />
        </div>
      </div>
    </section>
  );
}
