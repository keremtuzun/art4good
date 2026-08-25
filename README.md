# Art4Good — website + CultureCanvas

A modern, bilingual (English / Turkish) marketing site for **Art4Good**, a
student-led initiative in Istanbul that brings art workshops and creative
opportunities to economically disadvantaged primary-school children.

Built as a contemporary art-foundation experience: large editorial typography,
layered artwork compositions, organic paint shapes, subtle grain, scroll-driven
motion, a custom cursor, and a masonry gallery with a lightbox.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (custom brand theme)
- **Framer Motion** (reveals, parallax, magnetic buttons, painted timeline, page motion)
- Built-in **next/font**, **next/og** (dynamic Open Graph image), sitemap & robots
- Zero external UI dependencies — deploy-ready for **Vercel**

## CultureCanvas

The illustrated learning experience lives at `/tr/culturecanvas` (and the
matching English locale route). It includes the regional art map, topic lessons,
motif explorer, guided creative journey, and a clearly labeled deterministic
local mock mentor. The protected dataset studio is at
`/[locale]/culturecanvas/admin`; set `CULTURECANVAS_ADMIN_SECRET` to enable it.

The independent open-weight model pipeline is in `model/`. It contains the
behavior specification, seed JSONL data, QLoRA training, PEFT adapter loading,
FastAPI inference, and behavioral evaluation. It contains no commercial LLM API.

## Getting started

```bash
npm install
npm run dev     # http://localhost:4731  (redirects to /en or /tr)
npm run build   # production build
npm run start   # serve the production build
npm run lint
```

The root URL redirects to a locale based on the browser's `Accept-Language`
(Turkish visitors land on `/tr`, everyone else on `/en`).

## Project structure

```
src/
  app/
    layout.tsx                 # <html>, fonts, global grain
    [locale]/
      layout.tsx               # nav, footer, cursor, intro, SEO metadata
      page.tsx                 # homepage (all 12 sections)
      about, mission-values, impact, workshops,
      projects, projects/[slug], gallery, team,
      partners, get-involved, contact, privacy, accessibility
      opengraph-image.tsx      # dynamic 1200×630 social card
    sitemap.ts, robots.ts, icon.svg
  components/                  # Hero, ImpactCounters, JourneyTimeline,
                               # MasonryGallery, ContactForm, ProjectCard, …
  content/
    en.ts, tr.ts               # ALL copy — the single source of truth
    data.ts                    # structural data (projects, gallery, impact…)
    team.ts                    # real team members (empty by default)
  lib/                         # i18n, art generator, utils
  middleware.ts                # locale routing
public/images/                 # drop real photos here (see below)
```

## Editing content

**All text lives in `src/content/en.ts` and `src/content/tr.ts`.** They share the
same shape, so add/rename a key in `en.ts` and TypeScript will tell you to mirror
it in `tr.ts`. Turkish is natural Turkish, not machine translation — keep it that
way.

Structural data (which projects exist, their metrics, gallery items, impact
counters) is in `src/content/data.ts`.

### Confirmed vs. placeholder figures

Impact figures are flagged `confirmed: true/false` in `data.ts`:

- **Confirmed:** 27,000 ₺ (Istanbul Marathon 2025 “Run for Good”, with the
  Community Volunteers Foundation) and 7,500 ₺ (bake sale). These show a `*`.
- **Placeholder:** workshops, children reached, volunteers, partners — editable
  numbers to replace once finalised. Nothing is invented; placeholders are
  labelled in the UI and content files.

## Adding real photos

Every image slot shows a deterministic, on-brand **generated artwork** until a
real photo is supplied — so the site never looks broken.

- **Gallery / projects:** put a file in `public/images/` and set the `img` field
  on the relevant item in `src/content/data.ts` (e.g. `img: "/images/origami.jpg"`).
- **Hero / one-off slots:** pass `src="/images/…"` where `<ArtImage>` is used.

Recommended: JPGs ~1200 px on the long edge. Layouts are responsive, so exact
dimensions don't matter.

## Adding team members

`src/content/team.ts` is intentionally empty — we never invent people. Add real
members there and the Team page swaps its placeholder cards for real ones.

## Forms

`ContactForm` includes required-field + email validation, a consent checkbox, a
success state, and a hidden honeypot for basic spam protection. It is **not yet
wired to a backend** — connect it to a serverless route or a form provider
(Formspree, Resend, etc.) where the `TODO` is marked in `ContactForm.tsx`.
Also replace the placeholder `CONTACT_EMAIL` in `src/content/data.ts`.

## Accessibility & motion

- Semantic HTML, skip-to-content link, keyboard-navigable menus and lightbox.
- Full `prefers-reduced-motion` support — animations, the custom cursor and the
  intro all stand down.
- `<html lang>` tracks the active locale; `hreflang` alternates are emitted.

## Deploy to Vercel

1. Push this folder to a Git repository.
2. Import it in Vercel (framework auto-detected as Next.js — no config needed).
3. Set the production domain, then update the hard-coded base URL
   `https://art4good.info` in `src/app/layout.tsx`, `sitemap.ts` and `robots.ts`.

## Notes

- `_scrape/` and `_old_static/` are working artifacts and are git-ignored.
- Brand colours and the logo mark are derived from the @art4good.ist identity.
