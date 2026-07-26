import type { Dictionary } from "@/lib/i18n";
import { INSTAGRAM_URL } from "@/content/data";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function InstagramSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="wrap pb-24">
      <Reveal className="relative overflow-hidden rounded-[36px] bg-cream-2 px-6 py-16 text-center md:px-10">
        <span className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-brand-pink/25 blur-[60px]" />
        <span className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-brand-blue/25 blur-[60px]" />
        <div className="relative mx-auto max-w-2xl">
          <span className="eyebrow justify-center">{dict.instagram.eyebrow}</span>
          <h2 className="mt-4 text-[clamp(1.9rem,4vw,2.9rem)]">{dict.instagram.title}</h2>
          <p className="mt-4 text-lg text-muted">{dict.instagram.lede}</p>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ink mt-7">
            <svg viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            {dict.instagram.cta}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
