import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { PROJECTS } from "@/content/data";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function FeaturedProjects({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const featured = PROJECTS.slice(0, 3);
  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundImage: "linear-gradient(180deg,#EAF7FF 0%,#EFFBF3 60%,#FFF7E6 100%)" }}
    >
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow={dict.projects.eyebrow} title={dict.projects.title} lede={dict.projects.lede} />
          <Reveal>
            <Link
              href={`/${locale}/projects`}
              className="btn btn-ghost"
            >
              {dict.projects.viewAll}
            </Link>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProjectCard project={p} dict={dict} locale={locale} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
