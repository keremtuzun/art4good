"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A soft paint-dot custom cursor for desktop (fine-pointer) only.
 * Grows over interactive elements. Disabled for touch and reduced-motion.
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let dx = rx;
    let dy = ry;
    let raf = 0;

    const move = (e: MouseEvent) => {
      dx = e.clientX;
      dy = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${dx}px, ${dy}px)`;
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [data-cursor], input, textarea, select, label");
      if (ring.current) ring.current.dataset.active = interactive ? "1" : "0";
    };
    const loop = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-[9998] hidden md:block" aria-hidden>
      <div
        ref={ring}
        data-active="0"
        className="fixed left-0 top-0 -ml-4 -mt-4 h-8 w-8 rounded-full border-2 border-ink/40 transition-[width,height,margin,background-color] duration-200 data-[active=1]:-ml-6 data-[active=1]:-mt-6 data-[active=1]:h-12 data-[active=1]:w-12 data-[active=1]:border-brand-red/60 data-[active=1]:bg-brand-red/10"
      />
      <div ref={dot} className="fixed left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-brand-red" />
    </div>
  );
}
