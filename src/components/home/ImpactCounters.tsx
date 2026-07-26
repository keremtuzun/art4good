import type { Dictionary, Locale } from "@/lib/i18n";
import { IMPACT } from "@/content/data";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const GRADIENTS: Record<string, string> = {
  marathon: "from-brand-yellow to-brand-orange",
  bakesale: "from-brand-pink to-brand-purple",
  biennial: "from-[#6db3ff] to-brand-blue",
  partners: "from-brand-green to-brand-teal",
};

export default function ImpactCounters({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section className="wrap py-8">
      <div className="rounded-[36px] bg-ink px-6 py-12 text-white shadow-lift md:px-12">
        <SectionHeading eyebrow={dict.impact.eyebrow} title={dict.impact.title} lede={dict.impact.lede} light />
        <div className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {IMPACT.map((stat, i) => (
            <Reveal key={stat.id} delay={i * 0.05}>
              <div>
                <div
                  className={`bg-gradient-to-r ${GRADIENTS[stat.id]} bg-clip-text font-display text-[clamp(2.1rem,5vw,3.2rem)] leading-none text-transparent`}
                >
                  <Counter value={stat.value} suffix={stat.suffix} locale={locale} />
                </div>
                <p className="mt-2 text-sm font-semibold text-white/75">
                  {dict.impact.stats[stat.id as keyof typeof dict.impact.stats]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-9 text-xs text-white/50">{dict.impact.note}</p>
      </div>
    </section>
  );
}
