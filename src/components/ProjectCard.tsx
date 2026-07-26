import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import type { ProjectMeta } from "@/content/data";
import ArtImage from "./ArtImage";

export default function ProjectCard({
  project,
  dict,
  locale,
}: {
  project: ProjectMeta;
  dict: Dictionary;
  locale: Locale;
}) {
  const t = dict.projects.items[project.slug as keyof typeof dict.projects.items];
  const metricLabel =
    project.metric?.kind === "raised"
      ? dict.projects.raised
      : project.metric?.kind === "children"
      ? dict.projects.children
      : dict.projects.weeks;

  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      data-cursor="lift"
      className="group card block overflow-hidden transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          <ArtImage artKey={project.art} src={project.img} alt={t.title} seed={project.slug} rounded={false} />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink backdrop-blur">
          {dict.projects.filters[project.category]}
        </span>
        {project.metric && (
          <span className="absolute bottom-3 right-3 rounded-full bg-ink/90 px-3 py-1.5 text-sm font-bold text-white backdrop-blur">
            {project.metric.kind === "raised"
              ? new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US").format(project.metric.value) + (project.metric.suffix ?? "")
              : `${project.metric.value}${project.metric.suffix ?? ""} ${metricLabel}`}
          </span>
        )}
      </div>
      <div className="p-6">
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-brand-red">{t.date}</span>
        <h3 className="mt-1.5 text-xl">{t.title}</h3>
        <p className="mt-2 line-clamp-3 text-muted">{t.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-ink transition-colors group-hover:text-brand-red">
          {dict.projects.viewDetail}
          <svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
