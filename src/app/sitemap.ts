import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { PROJECTS } from "@/content/data";

const BASE = "https://art4good.ist";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/mission-values",
    "/impact",
    "/workshops",
    "/projects",
    "/gallery",
    "/team",
    "/partners",
    "/get-involved",
    "/contact",
    "/privacy",
    "/accessibility",
  ];
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const p of paths) {
      entries.push({
        url: `${BASE}/${locale}${p}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: p === "" ? 1 : 0.7,
        alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}${p}`])) },
      });
    }
    for (const proj of PROJECTS) {
      entries.push({
        url: `${BASE}/${locale}/projects/${proj.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }
  return entries;
}
