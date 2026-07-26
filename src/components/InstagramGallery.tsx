"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import { GALLERY, INSTAGRAM_URL } from "@/content/data";
import InstagramEmbed from "./InstagramEmbed";
import { cn } from "@/lib/utils";

type Filter = "all" | "workshop" | "volunteering" | "fundraiser";
const FILTERS: Filter[] = ["all", "workshop", "volunteering", "fundraiser"];

export default function InstagramGallery({ dict }: { dict: Dictionary }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<number | null>(null);

  const items = GALLERY.filter((g) => filter === "all" || g.category === filter);
  const photos = items.filter((g) => g.img);
  const embeds = items.filter((g) => g.code && !g.img).slice(0, -3);
  const caption = (id: string) => dict.gallery.captions[id as keyof typeof dict.gallery.captions];

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(() => setActive((a) => (a === null ? a : (a + 1) % photos.length)), [photos.length]);
  const prev = useCallback(() => setActive((a) => (a === null ? a : (a - 1 + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              filter === f ? "border-ink bg-ink text-white" : "border-line bg-paper text-ink hover:border-ink"
            )}
          >
            {dict.gallery.filters[f as keyof typeof dict.gallery.filters]}
          </button>
        ))}
      </div>

      {/* Self-hosted photos — always render */}
      {photos.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {photos.map((g, i) => (
            <motion.button
              key={g.id}
              layout
              type="button"
              onClick={() => setActive(i)}
              data-cursor="lift"
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border-[4px] border-white shadow-soft"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.img}
                alt={caption(g.id)}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/85 to-transparent p-4 pt-10 text-left text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {caption(g.id)}
              </span>
            </motion.button>
          ))}
        </div>
      )}

      {/* Instagram posts (artwork + more moments) */}
      {embeds.length > 0 && (
        <>
          <p className="mt-12 mb-4 text-sm font-bold uppercase tracking-[0.14em] text-brand-red">{dict.instagram.eyebrow}</p>
          <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {embeds.map((g) => (
              <motion.div key={g.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
                <InstagramEmbed code={g.code!} title={caption(g.id)} />
              </motion.div>
            ))}
          </div>
        </>
      )}

      <p className="mt-10 text-center text-sm text-muted">
        {dict.instagram.lede}{" "}
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-red link-underline">
          @art4good.ist
        </a>
      </p>

      {/* Lightbox for self-hosted photos */}
      <AnimatePresence>
        {active !== null && photos[active] && (
          <motion.div
            className="fixed inset-0 z-[9000] flex items-center justify-center bg-ink/90 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={caption(photos[active].id)}
          >
            <button
              type="button"
              onClick={close}
              aria-label={dict.gallery.close}
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" width="22" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
            <motion.figure
              key={photos[active].id}
              className="max-h-[86vh] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) next();
                else if (info.offset.x > 80) prev();
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[active].img}
                alt={caption(photos[active].id)}
                className="max-h-[76vh] w-full rounded-2xl border-[6px] border-white object-contain"
              />
              <figcaption className="mt-3 text-center text-white/90">{caption(photos[active].id)}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
