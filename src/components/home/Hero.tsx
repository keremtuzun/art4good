"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { Dictionary, Locale } from "@/lib/i18n";
import { FUNDRAISING } from "@/content/data";
import ArtImage from "@/components/ArtImage";
import MagneticButton from "@/components/MagneticButton";
import Counter from "@/components/Counter";

export default function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-[70px]">
      {/* soft colour blobs */}
      <span className="pointer-events-none absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full bg-brand-yellow/55 blur-[70px]" />
      <span className="pointer-events-none absolute -bottom-32 -left-24 h-[340px] w-[340px] rounded-full bg-brand-teal/40 blur-[70px]" />
      <span className="pointer-events-none absolute -left-20 top-10 h-[300px] w-[300px] rounded-full bg-brand-pink/35 blur-[80px]" />
      <span className="pointer-events-none absolute right-[18%] bottom-[-10%] h-[280px] w-[280px] rounded-full bg-brand-green/30 blur-[80px]" />
      <span className="pointer-events-none absolute left-[42%] -top-16 h-[240px] w-[240px] rounded-full bg-brand-purple/25 blur-[80px]" />

      <div className="wrap grid items-center gap-8 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20">
        <div>
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {dict.hero.eyebrow}
          </motion.span>
          <motion.h1
            className="mt-4 text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.03]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {dict.hero.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="paint-underline">{dict.hero.title.split(" ").slice(-1)}</span>
          </motion.h1>
          <motion.p
            className="mt-5 max-w-[42ch] text-lg text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {dict.hero.lede}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <MagneticButton href={`/${locale}/projects`} className="btn-accent">
              {dict.hero.ctaPrimary}
              <ArrowIcon />
            </MagneticButton>
            <MagneticButton href={`/${locale}/get-involved`} className="btn-ghost">
              {dict.hero.ctaSecondary}
            </MagneticButton>
          </motion.div>

          <motion.dl
            className="mt-11 flex flex-wrap gap-x-9 gap-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="flex flex-col">
              <dt className="order-2 text-sm font-semibold text-muted">
                {dict.projects.items["istanbul-marathon-2026"].title}
              </dt>
              <dd className="font-display text-[1.7rem] leading-none">
                <Counter value={FUNDRAISING.marathon2026} suffix=" ₺" locale={locale} />
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="order-2 text-sm font-semibold text-muted">{dict.projects.items["bake-sale"].title}</dt>
              <dd className="font-display text-[1.7rem] leading-none">
                <Counter value={FUNDRAISING.bakeSale} suffix=" ₺" locale={locale} />
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="order-2 text-sm font-semibold text-muted">{dict.impact.stats.partners}</dt>
              <dd className="font-display text-[1.7rem] leading-none">
                <Counter value={5} locale={locale} />
              </dd>
            </div>
          </motion.dl>
        </div>

        {/* collage */}
        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          <motion.figure
            style={{ y: y1 }}
            className="absolute left-0 top-[2%] z-30 h-[62%] w-[62%] rotate-[-5deg] overflow-hidden rounded-[26px] border-[6px] border-white shadow-lift"
          >
            <ArtImage artKey="workshop" src="/images/hero-1.jpg" alt="An Art4Good volunteer and a child sharing a smile at a workshop" seed="hero-a" />
          </motion.figure>
          <motion.figure
            style={{ y: y2 }}
            className="absolute right-0 top-[16%] z-20 h-[58%] w-[54%] rotate-[5deg] overflow-hidden rounded-[26px] border-[6px] border-white shadow-lift"
          >
            <ArtImage artKey="paint" src="/images/hero-2.jpg" alt="A child proudly holding up the colourful drawing they made" seed="hero-b" />
          </motion.figure>
          <motion.figure
            style={{ y: y3 }}
            className="absolute bottom-0 left-[8%] z-40 h-[46%] w-[50%] rotate-[3deg] overflow-hidden rounded-[26px] border-[6px] border-white shadow-lift"
          >
            <ArtImage artKey="clay" src="/images/hero-3.jpg" alt="An Art4Good volunteer drawing together with a child at a workshop" seed="hero-c" />
          </motion.figure>
          <motion.div
            className="absolute -right-2 top-[46%] z-50 flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 text-sm font-bold shadow-soft"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-green text-white">
              <svg viewBox="0 0 24 24" width="16" fill="none" stroke="#fff" strokeWidth="2.6">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            {dict.hero.badge}
          </motion.div>

          {/* floating hand-drawn shapes */}
          <FloatingShapes reduce={!!reduce} />
        </div>
      </div>
    </section>
  );
}

function FloatingShapes({ reduce }: { reduce: boolean }) {
  const anim = reduce ? {} : { animate: { y: [0, -14, 0] } };
  return (
    <>
      <motion.svg
        className="pointer-events-none absolute -left-8 top-6 h-12 w-12 text-brand-red"
        {...anim}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M6 30c8-20 20-20 28 0" />
      </motion.svg>
      <motion.svg
        className="pointer-events-none absolute -bottom-4 right-8 h-10 w-10 text-brand-blue"
        {...(reduce ? {} : { animate: { rotate: [0, 12, 0] } })}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M8 20h24M20 8v24" />
      </motion.svg>
      <motion.svg
        className="pointer-events-none absolute -right-6 top-2 h-11 w-11 text-brand-purple"
        {...(reduce ? {} : { animate: { rotate: [0, 360] } })}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M20 5v30M5 20h30M9 9l22 22M31 9L9 31" />
      </motion.svg>
      <motion.svg
        className="pointer-events-none absolute bottom-6 -left-10 h-12 w-12 text-brand-green"
        {...(reduce ? {} : { animate: { y: [0, 12, 0] } })}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M5 26c5-6 10-6 15 0s10 6 15 0" />
      </motion.svg>
      <motion.span
        className="pointer-events-none absolute left-[46%] -top-6 block h-5 w-5 rounded-full bg-brand-pink"
        {...(reduce ? {} : { animate: { y: [0, -12, 0], scale: [1, 1.15, 1] } })}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="pointer-events-none absolute right-[24%] -bottom-8 block h-4 w-4 rounded-full bg-brand-yellow"
        {...(reduce ? {} : { animate: { y: [0, 10, 0] } })}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
