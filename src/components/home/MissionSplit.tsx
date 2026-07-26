import type { Dictionary } from "@/lib/i18n";
import ArtImage from "@/components/ArtImage";
import Reveal from "@/components/Reveal";

export default function MissionSplit({ dict }: { dict: Dictionary }) {
  return (
    <section className="wrap py-20 md:py-28">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <span className="eyebrow">{dict.mission.eyebrow}</span>
          <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.12]">{dict.mission.title}</h2>
          {dict.mission.body.map((p, i) => (
            <p key={i} className="mt-4 text-lg text-muted">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] border-[6px] border-white shadow-lift">
            <ArtImage artKey="kids" alt={dict.mission.title} seed="mission" />
          </div>
          <div className="absolute -bottom-6 -left-4 hidden max-w-[220px] rounded-2xl bg-white p-4 shadow-soft sm:block">
            <p className="font-hand text-2xl leading-tight text-ink">{dict.marquee[0]}</p>
          </div>
          {/* pillars */}
          <ul className="mt-8 grid grid-cols-2 gap-3">
            {dict.mission.pillars.map((p) => (
              <li key={p.title} className="card p-4">
                <b className="font-display text-lg">{p.title}</b>
                <p className="mt-1 text-sm text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
