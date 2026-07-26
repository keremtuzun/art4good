import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { PROJECTS } from "@/content/data";
import ArtImage from "@/components/ArtImage";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";

export function generateStaticParams() {
  return locales.flatMap((locale) => PROJECTS.map((p) => ({ locale, slug: p.slug })));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : "en");
  const t = dict.projects.items[params.slug as keyof typeof dict.projects.items];
  if (!t) return {};
  return { title: t.title, description: t.summary };
}

export default function ProjectDetail({ params }: { params: { locale: Locale; slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();
  const dict = getDictionary(params.locale);
  const t = dict.projects.items[params.slug as keyof typeof dict.projects.items];
  const partners = (project.partners ?? []).map(
    (id) => ({ pace: "PACE Children's Art Center", atlas: "Atlas Yardım Derneği", tog: "Toplum Gönüllüleri (TOG)", iksv: "İKSV", koc: "Vehbi Koç Vakfı" }[id] ?? id)
  );

  return (
    <>
      <header className="relative overflow-hidden pt-[70px]">
        <div className="wrap py-12 md:py-16">
          <Link href={`/${params.locale}/projects`} className="link-underline text-sm font-semibold text-muted">
            ← {dict.pages.projects.title}
          </Link>
          <Reveal className="mt-5">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-red">{t.date}</span>
            <h1 className="mt-2 max-w-3xl text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.06]">{t.title}</h1>
            <p className="mt-4 max-w-2xl text-xl text-muted">{t.summary}</p>
          </Reveal>
        </div>
      </header>

      <div className="wrap pb-24">
        <Reveal className="relative aspect-[16/9] overflow-hidden rounded-[30px] border-[6px] border-white shadow-lift">
          <ArtImage artKey={project.art} src={project.img} alt={t.title} seed={project.slug} rounded={false} />
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <div className="prose-a4g">
              {t.detail.map((p, i) => (
                <p key={i} className="mb-4 text-lg text-ink/90">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="card p-6">
              {project.metric && (
                <div className="mb-6">
                  <div className="font-display text-4xl text-ink">
                    {project.metric.kind === "raised"
                      ? new Intl.NumberFormat(params.locale === "tr" ? "tr-TR" : "en-US").format(project.metric.value) + (project.metric.suffix ?? "")
                      : `${project.metric.value}${project.metric.suffix ?? ""}`}
                  </div>
                  <span className="text-sm font-semibold text-muted">
                    {project.metric.kind === "raised"
                      ? dict.projects.raised
                      : project.metric.kind === "children"
                      ? dict.projects.children
                      : dict.projects.weeks}
                  </span>
                </div>
              )}
              {partners.length > 0 && (
                <div>
                  <h3 className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.12em] text-muted">
                    {dict.pages.partners.title}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {partners.map((p) => (
                      <li key={p} className="rounded-full bg-cream-2 px-3 py-1 text-sm font-semibold">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </Reveal>
        </div>

        {/* photo gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl">{dict.pages.gallery.title}</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {project.gallery.map((art, i) => (
                <Reveal key={i} delay={i * 0.05} className="relative aspect-square overflow-hidden rounded-2xl border-[4px] border-white shadow-soft">
                  <ArtImage artKey={art} alt={`${t.title}, ${i + 1}`} seed={`${project.slug}-${i}`} rounded={false} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <div className="mt-14 flex flex-wrap gap-3">
          <MagneticButton href={`/${params.locale}/get-involved`} className="btn-accent">
            {dict.finalCta.support}
          </MagneticButton>
          <MagneticButton href={`/${params.locale}/projects`} className="btn-ghost">
            {dict.projects.viewAll}
          </MagneticButton>
        </div>
      </div>
    </>
  );
}
