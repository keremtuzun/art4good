import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { GALLERY } from "@/content/data";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function GalleryStrip({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  // Self-hosted real photos only — always render, never depend on Instagram.
  const picks = GALLERY.filter((g) => g.img).slice(0, 4);

  return (
    <section className="py-20 md:py-28">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow={dict.gallery.eyebrow} title={dict.gallery.title} lede={dict.gallery.lede} />
          <Link href={`/${locale}/gallery`} className="btn btn-ghost">
            {dict.nav.gallery}
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {picks.map((g, i) => (
            <Reveal
              key={g.id}
              delay={i * 0.06}
              className="group relative aspect-[4/5] overflow-hidden rounded-[22px] border-[5px] border-white shadow-soft"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.img}
                alt={dict.gallery.captions[g.id as keyof typeof dict.gallery.captions]}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-purple/85 via-brand-pink/40 to-transparent p-4 pt-10 text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {dict.gallery.captions[g.id as keyof typeof dict.gallery.captions]}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
