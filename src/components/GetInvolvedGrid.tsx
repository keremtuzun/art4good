import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { GET_INVOLVED, ACCENTS } from "@/content/data";
import Reveal from "./Reveal";

const ICONS: Record<string, JSX.Element> = {
  volunteer: <path d="M12 21s-7-4.35-9.5-8.5C.5 9 2 5.5 5.5 5.5 8 5.5 12 8 12 8s4-2.5 6.5-2.5C22 5.5 23.5 9 21.5 12.5 19 16.65 12 21 12 21Z" />,
  sponsor: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M3 11h18M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
  partner: <><circle cx="9" cy="8" r="3.2" /><circle cx="17" cy="10" r="2.6" /><path d="M2 20c0-3.5 3.1-5.2 7-5.2M14.5 20c0-2.5 1.4-4 3.5-4.3" /></>,
  materials: <><path d="M4 7h16l-1.4 12.2A2 2 0 0 1 16.6 21H7.4a2 2 0 0 1-2-1.8L4 7Z" /><path d="M9 7V5a3 3 0 0 1 6 0v2" /></>,
  fundraiser: <><path d="M12 21s-7-4.35-9.5-8.5C.5 9 2 5.5 5.5 5.5 8 5.5 12 8 12 8s4-2.5 6.5-2.5C22 5.5 23.5 9 21.5 12.5 19 16.65 12 21 12 21Z" /></>,
  school: <><path d="M3 9l9-5 9 5-9 5-9-5Z" /><path d="M7 11v5c0 1 2.2 2.5 5 2.5s5-1.5 5-2.5v-5" /></>,
};

export default function GetInvolvedGrid({
  dict,
  locale,
  compact = false,
}: {
  dict: Dictionary;
  locale: Locale;
  compact?: boolean;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {GET_INVOLVED.map((opt, i) => {
        const t = dict.getInvolved.options[opt.id as keyof typeof dict.getInvolved.options];
        const color = ACCENTS[opt.accent];
        return (
          <Reveal key={opt.id} delay={i * 0.05}>
            <Link
              href={`/${locale}/contact?interest=${opt.id}`}
              data-cursor="lift"
              className="group card relative flex h-full flex-col overflow-hidden p-7 transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-soft"
            >
              <span
                className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-15 transition-transform duration-500 group-hover:scale-150"
                style={{ background: color }}
              />
              <span className="grid h-12 w-12 place-items-center rounded-xl text-white" style={{ background: color }}>
                <svg viewBox="0 0 24 24" width="22" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {ICONS[opt.id]}
                </svg>
              </span>
              <h3 className="mt-4 text-xl">{t.title}</h3>
              <p className="mt-2 flex-1 text-muted">{t.text}</p>
              {!compact && (
                <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-ink transition-colors group-hover:text-brand-red">
                  {dict.getInvolved.cta}
                  <svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              )}
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
