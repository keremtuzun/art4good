"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() || `/${locale}`;

  const swap = (target: Locale) => {
    const parts = pathname.split("/");
    // parts[1] is the current locale segment
    if (locales.includes(parts[1] as Locale)) parts[1] = target;
    else return `/${target}`;
    return parts.join("/") || `/${target}`;
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-line bg-paper/70 p-1" aria-label={label}>
      {locales.map((loc) => (
        <Link
          key={loc}
          href={swap(loc)}
          hrefLang={loc}
          aria-current={loc === locale ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide transition-colors",
            loc === locale ? "bg-ink text-white" : "text-muted hover:text-ink"
          )}
        >
          {loc}
        </Link>
      ))}
    </div>
  );
}
