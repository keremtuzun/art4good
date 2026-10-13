import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import Reveal from "@/components/Reveal";

export default function QuizInvitation({ locale }: { locale: Locale }) {
  return (
    <section className="wrap py-16 md:py-24">
      <Reveal className="relative overflow-hidden rounded-[34px] bg-ink px-7 py-12 text-white md:px-14 md:py-16">
        <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-brand-pink/30 blur-[70px]" />
        <div className="pointer-events-none absolute bottom-0 right-28 h-44 w-44 rounded-full bg-brand-blue/30 blur-[65px]" />
        <div className="relative max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-yellow">The art access quiz</span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-tight">What do we really know about who gets to create?</h2>
          <p className="mt-5 text-lg text-white/75">Ten short, sourced questions about creative opportunity, children&apos;s rights and the barriers families face. In English.</p>
          <Link href={`/${locale}/quiz`} className="btn mt-7 bg-brand-yellow text-ink hover:-translate-y-0.5">Take the quiz →</Link>
        </div>
      </Reveal>
    </section>
  );
}
