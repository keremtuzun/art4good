"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Dictionary, Locale } from "@/lib/i18n";
import MagneticButton from "@/components/MagneticButton";

export default function FinalCTA({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section className="wrap pb-24">
      <div
        ref={ref}
        onMouseMove={handleMove}
        className="relative overflow-hidden rounded-[40px] px-6 py-20 text-center text-ink md:px-10"
        style={{
          backgroundImage: `radial-gradient(340px circle at ${pos.x}% ${pos.y}%, rgba(255,194,75,.75), transparent 62%), radial-gradient(300px circle at ${100 - pos.x}% ${100 - pos.y}%, rgba(234,92,155,.55), transparent 62%), linear-gradient(135deg,#FFF1CF 0%,#FFE0EC 42%,#E6E0FF 72%,#D9F4FF 100%)`,
          transition: reduce ? undefined : "background-image .15s ease-out",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-[18ch] text-[clamp(2rem,5vw,3.4rem)] leading-[1.08] text-ink"
        >
          {dict.finalCta.title}
        </motion.h2>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <MagneticButton href={`/${locale}/get-involved`} className="btn-accent">
            {dict.finalCta.volunteer}
          </MagneticButton>
          <MagneticButton href={`/${locale}/get-involved`} className="bg-white text-brand-purple shadow-soft">
            {dict.finalCta.support}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
