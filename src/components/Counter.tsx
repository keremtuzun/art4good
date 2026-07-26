"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { formatNumber } from "@/lib/utils";

export default function Counter({
  value,
  suffix = "",
  locale,
  duration = 1600,
  className,
}: {
  value: number;
  suffix?: string;
  locale: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    // Guarantee the final value even if rAF is throttled in a background tab.
    const guarantee = window.setTimeout(() => setDisplay(value), duration + 200);
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(step);
      else {
        window.clearTimeout(guarantee);
        setDisplay(value);
      }
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(guarantee);
    };
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {formatNumber(Math.round(display), locale)}
      {suffix}
    </span>
  );
}
