import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import ProjectsExplorer from "@/components/ProjectsExplorer";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : "en");
  return { title: dict.pages.projects.title, description: dict.pages.projects.lede };
}

export default function ProjectsPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return (
    <>
      <PageHeader eyebrow={dict.projects.eyebrow} title={dict.pages.projects.title} lede={dict.pages.projects.lede} />
      <section className="wrap pb-24">
        <ProjectsExplorer dict={dict} locale={params.locale} />
      </section>
    </>
  );
}
