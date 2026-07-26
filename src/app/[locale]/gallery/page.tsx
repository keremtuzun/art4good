import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import InstagramGallery from "@/components/InstagramGallery";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : "en");
  return { title: dict.pages.gallery.title, description: dict.pages.gallery.lede };
}

export default function GalleryPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return (
    <>
      <PageHeader eyebrow={dict.gallery.eyebrow} title={dict.pages.gallery.title} lede={dict.pages.gallery.lede} />
      <section className="wrap pb-24">
        <InstagramGallery dict={dict} />
      </section>
    </>
  );
}
