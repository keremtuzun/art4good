import type { Dictionary, Locale } from "@/lib/i18n";
import { IMPACT } from "@/content/data";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const GRADIENTS: Record<string, string> = {
  marathon: "from-brand-orange to-brand-red",
  bakesale: "from-brand-pink to-brand-purple",
  biennial: "from-brand-blue to-brand-purple",
  partners: "from-brand-green to-brand-teal",
};

// Cheerful tint behind each stat tile
const TINTS: Record<string, string> = {
  marathon: "bg-brand-yellow/25",
  bakesale: "bg-brand-pink/20",
  biennial: "bg-brand-blue/15",
  partners: "bg-brand-green/20",
};

export default function ImpactCounters({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section className="wrap py-8">
      <div
        className="rounded-[36px] px-6 py-12 shadow-soft md:px-12"
        style={{
          backgroundImage:
            "linear-gradient(135deg,#FFF3D6 0%,#FFE7EF 38%,#E8E1FF 66%,#DDF6EA 100%)",
        }}
      >
        <SectionHeading eyebrow={dict.impact.eyebrow} title={dict.impact.title} lede={dict.impact.lede} />
        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {IMPACT.map((stat, i) => (
            <Reveal key={stat.id} delay={i * 0.05}>
              <div className={`h-full rounded-[24px] ${TINTS[stat.id]} p-5`}>
                <div
                  className={`bg-gradient-to-r ${GRADIENTS[stat.id]} bg-clip-text font-display text-[clamp(2.1rem,5vw,3.2rem)] leading-none text-transparent`}
                >
                  <Counter value={stat.value} suffix={stat.suffix} locale={locale} />
                </div>
                <p className="mt-2 text-sm font-semibold text-ink">
                  {dict.impact.stats[stat.id as keyof typeof dict.impact.stats]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-9 text-xs text-muted">{dict.impact.note}</p>
      </div>
    </section>
  );
}
