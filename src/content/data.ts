/**
 * Structural, non-translated data.
 * Prose (titles, summaries) lives in the locale dictionaries, keyed by `id`.
 * `art` is the generated placeholder palette key; drop a real photo at
 * /public/images/<img>.jpg and set `img` to swap it in automatically.
 *
 * SOURCES: figures marked `confirmed: true` are verified from Art4Good's
 * Instagram (@art4good.ist) or supplied by the organisation. Anything marked
 * `confirmed: false` is an editable placeholder, replace before publishing.
 */

export type ArtKey =
  | "workshop"
  | "paint"
  | "kids"
  | "clay"
  | "marathon"
  | "biennial"
  | "boxes"
  | "bakesale"
  | "podcast"
  | "materials"
  | "artwork-1"
  | "artwork-2"
  | "artwork-3";

export type ProjectCategory = "workshop" | "fundraiser" | "volunteering" | "future";

export interface ProjectMeta {
  slug: string;
  art: ArtKey;
  img?: string;
  date: string; // ISO-ish, for sorting/display
  category: ProjectCategory;
  metric?: { value: number; suffix?: string; confirmed: boolean; kind: "raised" | "children" | "weeks" };
  partners?: string[];
  gallery?: ArtKey[];
}

export const PROJECTS: ProjectMeta[] = [
  {
    slug: "art-workshops",
    art: "workshop",
    date: "2025-09-01",
    category: "workshop",
    partners: ["pace", "atlas"],
    gallery: ["kids", "clay", "paint", "workshop"],
  },
  {
    slug: "istanbul-marathon-2025",
    art: "marathon",
    date: "2025-11-02",
    category: "fundraiser",
    metric: { value: 27000, suffix: " ₺", confirmed: true, kind: "raised" },
    partners: ["tog"],
    gallery: ["marathon", "workshop"],
  },
  {
    slug: "bake-sale",
    art: "bakesale",
    date: "2025-12-10",
    category: "fundraiser",
    metric: { value: 7500, suffix: " ₺", confirmed: true, kind: "raised" },
    gallery: ["bakesale", "materials"],
  },
  {
    slug: "istanbul-biennial",
    art: "biennial",
    date: "2025-09-21",
    category: "volunteering",
    metric: { value: 7, suffix: "", confirmed: true, kind: "weeks" },
    partners: ["pace", "iksv", "koc"],
    gallery: ["biennial", "kids", "paint"],
  },
  {
    slug: "school-collaborations",
    art: "kids",
    date: "2026-09-01",
    category: "future",
    partners: [],
    gallery: ["kids", "workshop"],
  },
];

/** The 7 stages of a workshop, connected by the animated painted line. */
export const JOURNEY: { id: string; art: ArtKey }[] = [
  { id: "funds", art: "bakesale" },
  { id: "materials", art: "materials" },
  { id: "partners", art: "biennial" },
  { id: "volunteers", art: "workshop" },
  { id: "organise", art: "paint" },
  { id: "create", art: "kids" },
  { id: "impact", art: "clay" },
];

/** Impact counters. Every figure here is confirmed from our campaigns/records. */
export const IMPACT: { id: string; value: number; suffix?: string; confirmed: boolean }[] = [
  { id: "marathon", value: 27000, suffix: " ₺", confirmed: true },
  { id: "bakesale", value: 7500, suffix: " ₺", confirmed: true },
  { id: "biennial", value: 7, suffix: "", confirmed: true },
  { id: "partners", value: 5, suffix: "", confirmed: true },
];

/**
 * Gallery items pulled from @art4good.ist. `code` is the Instagram post
 * shortcode; the gallery renders the real post via the official Instagram
 * embed, so these are genuine photos (paintings + workshop moments), never
 * placeholders. `id` maps to a caption in the dictionary.
 */
export const GALLERY: { id: string; code?: string; img?: string; category: ProjectCategory | "artwork" }[] = [
  // Self-hosted real photos (always render, never depend on Instagram)
  { id: "ws-star", img: "/images/hero-1.jpg", category: "workshop" },
  { id: "ws-drawing", img: "/images/hero-2.jpg", category: "workshop" },
  { id: "ws-together", img: "/images/gallery-ws.jpg", category: "workshop" },
  { id: "ws-pencils", img: "/images/hero-3.jpg", category: "workshop" },
  // Instagram posts (rendered via official embed where the viewer's browser allows)
  { id: "origami", code: "DYedfKeCmeS", category: "workshop" },
  { id: "clay5", code: "DXya02_Cr_M", category: "workshop" },
  { id: "colouring", code: "DXW9G2yiupM", category: "workshop" },
  { id: "dream-cities", code: "DVoMrH0ikA_", category: "workshop" },
  { id: "playdough", code: "DU3ZaqVCoDk", category: "workshop" },
  { id: "superpower", code: "DTqB7SDCgk9", category: "workshop" },
  { id: "whatisart", code: "DRggpqWCsAt", category: "volunteering" },
  { id: "biennial-7", code: "DQ2QXQtjdrz", category: "volunteering" },
  { id: "biennial-5", code: "DQexN3PCiZE", category: "volunteering" },
  { id: "biennial-3", code: "DPt1lLNCpyd", category: "volunteering" },
  { id: "biennial-start", code: "DO3-JNKDcn4", category: "volunteering" },
  { id: "marathon", code: "DQ2SJRODV0s", category: "volunteering" },
  { id: "marathon-cheer", code: "DQjAxHMjYKM", category: "volunteering" },
  { id: "kalpten", code: "DYec8JwKWN5", category: "fundraiser" },
  { id: "bolu", code: "DXT1bAyCj3H", category: "fundraiser" },
  { id: "materials", code: "DSrmdL6Cs1c", category: "fundraiser" },
];

/** Ways to get involved. */
export const GET_INVOLVED: { id: string; accent: keyof typeof ACCENTS }[] = [
  { id: "volunteer", accent: "teal" },
  { id: "sponsor", accent: "red" },
  { id: "partner", accent: "blue" },
  { id: "materials", accent: "green" },
  { id: "fundraiser", accent: "orange" },
  { id: "school", accent: "purple" },
];

/** Partner organisations (proper nouns, same in both languages). */
export const PARTNERS: { id: string; name: string; color: keyof typeof ACCENTS }[] = [
  { id: "pace", name: "PACE Children's Art Center", color: "red" },
  { id: "atlas", name: "Atlas Yardım Derneği", color: "orange" },
  { id: "tog", name: "Toplum Gönüllüleri (TOG)", color: "yellow" },
  { id: "iksv", name: "İKSV, Istanbul Biennial", color: "green" },
  { id: "koc", name: "Vehbi Koç Vakfı", color: "teal" },
];

export const ACCENTS = {
  red: "#E4572E",
  orange: "#FF8A3D",
  yellow: "#FFC24B",
  green: "#35B36B",
  teal: "#14AEB0",
  blue: "#2F6FE0",
  purple: "#8A5CD6",
  pink: "#EA5C9B",
} as const;

export const INSTAGRAM_URL = "https://www.instagram.com/art4good.ist/";
export const CONTACT_EMAIL = "art4good.ist@gmail.com";
