import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, getDictionary, type Locale } from "@/lib/i18n";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import CustomCursor from "@/components/CustomCursor";
import LangSetter from "@/components/LangSetter";
import LoadingIntro from "@/components/LoadingIntro";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);
  return {
    title: { default: `${dict.meta.siteName}, ${dict.meta.tagline}`, template: `%s · ${dict.meta.siteName}` },
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", tr: "/tr" },
    },
    openGraph: {
      title: `${dict.meta.siteName}, ${dict.meta.tagline}`,
      description: dict.meta.description,
      url: `/${locale}`,
      siteName: dict.meta.siteName,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: dict.meta.siteName }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <LangSetter locale={locale} />
      <CustomCursor />
      <LoadingIntro line={dict.loading.line} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <SiteNav locale={locale} dict={dict} />
      <main id="main">{children}</main>
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
