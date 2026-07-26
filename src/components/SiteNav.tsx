"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary, Locale } from "@/lib/i18n";
import BrandLogo from "./BrandLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import { INSTAGRAM_URL } from "@/content/data";
import { cn } from "@/lib/utils";

export default function SiteNav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/impact`, label: dict.nav.impact },
    { href: `/${locale}/workshops`, label: dict.nav.workshops },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/gallery`, label: dict.nav.gallery },
    { href: `/${locale}/get-involved`, label: dict.nav.getInvolved },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[70] transition-all duration-300",
        scrolled || open
          ? "border-b border-line bg-cream/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="wrap flex h-[70px] items-center justify-between gap-4">
        <Link href={`/${locale}`} aria-label="Art4Good home" data-cursor="lift" className="flex items-center">
          <BrandLogo size={46} priority />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "link-underline text-[0.92rem] font-semibold text-ink/80 hover:text-ink",
                pathname === l.href && "text-ink"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <LanguageSwitcher locale={locale} label={dict.nav.langLabel} />
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @art4good.ist"
            className="hidden h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-white sm:grid"
          >
            <InstagramIcon />
          </a>
          <Link
            href={`/${locale}/get-involved`}
            className="hidden rounded-full bg-brand-red px-4 py-2 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 md:inline-block"
          >
            {dict.nav.support}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? dict.nav.close : dict.nav.menu}
            className="grid h-10 w-10 place-items-center lg:hidden"
          >
            <span className="relative block h-4 w-6">
              <span className={cn("absolute left-0 h-0.5 w-6 rounded bg-ink transition-all", open ? "top-2 rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 top-2 h-0.5 w-6 rounded bg-ink transition-all", open && "opacity-0")} />
              <span className={cn("absolute left-0 h-0.5 w-6 rounded bg-ink transition-all", open ? "top-2 -rotate-45" : "top-4")} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="wrap flex flex-col gap-1 pb-6 lg:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="border-b border-line py-3 text-lg font-semibold text-ink"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/get-involved`}
              className="mt-4 rounded-full bg-brand-red px-5 py-3 text-center font-bold text-white"
            >
              {dict.nav.support}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
