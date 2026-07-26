"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import { JOURNEY } from "@/content/data";
import SectionHeading from "@/components/SectionHeading";

export default function JourneyTimeline({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  const steps = JOURNEY.map((s) => ({
    ...s,
    ...dict.journey.steps[s.id as keyof typeof dict.journey.steps],
  }));

  return (
    <section className="wrap py-20 md:py-28">
      <SectionHeading eyebrow={dict.journey.eyebrow} title={dict.journey.title} lede={dict.journey.lede} />

      <div ref={ref} className="relative mt-12 pl-2">
        {/* track */}
        <div className="absolute left-[19px] top-2 bottom-2 w-[3px] rounded bg-line" />
        {/* painted, scroll-linked progress line */}
        <motion.div
          className="absolute left-[19px] top-2 w-[3px] origin-top rounded bg-gradient-to-b from-brand-yellow via-brand-teal to-brand-purple"
          style={{ height: "calc(100% - 16px)", scaleY: progress }}
        />

        <ol className="space-y-9">
          {steps.map((step, i) => (
            <li key={step.id} className="relative pl-16">
              <span className="absolute left-[6px] top-1 grid h-8 w-8 place-items-center rounded-full border-4 border-brand-red bg-paper shadow-[0_0_0_4px_theme(colors.cream)]">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-red" />
              </span>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-xl">{step.title}</h3>
                <p className="mt-1 max-w-[52ch] text-muted">{step.text}</p>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
