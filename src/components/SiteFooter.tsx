import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import BrandLogo from "./BrandLogo";
import { INSTAGRAM_URL, CONTACT_EMAIL } from "@/content/data";

export default function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const explore = [
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/quiz`, label: "Art access quiz" },
    { href: `/${locale}/workshops`, label: dict.nav.workshops },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/gallery`, label: dict.nav.gallery },
    { href: `/${locale}/impact`, label: dict.nav.impact },
    { href: `/${locale}/partners`, label: dict.pages.partners.title },
  ];
  const involved = [
    { href: `/${locale}/get-involved`, label: dict.nav.getInvolved },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];
  const legal = [
    { href: `/${locale}/privacy`, label: dict.footer.privacy },
    { href: `/${locale}/accessibility`, label: dict.footer.accessibility },
  ];

  return (
    <footer className="bg-ink text-[#cdd6e4]">
      <div className="wrap py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <BrandLogo size={64} />
            <p className="mt-4 max-w-[40ch] text-[#9fabbd]">{dict.footer.mission}</p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @art4good.ist"
              className="mt-5 inline-grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white transition-colors hover:bg-brand-red"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>

          <FooterCol title={dict.footer.explore} links={explore} />
          <FooterCol title={dict.footer.involved} links={involved} />
          <div>
            <h4 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.14em] text-white">
              {dict.footer.legal}
            </h4>
            <ul className="grid gap-2.5">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[#cdd6e4] opacity-85 hover:text-white hover:opacity-100">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="opacity-85 hover:text-white hover:opacity-100">
                  {dict.footer.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-[#8b98ab]">
          <span>
            © {new Date().getFullYear()} Art4Good · {dict.footer.based}
          </span>
          <span>{dict.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.14em] text-white">{title}</h4>
      <ul className="grid gap-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[#cdd6e4] opacity-85 hover:text-white hover:opacity-100">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
