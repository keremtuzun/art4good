import { getDictionary, type Locale } from "@/lib/i18n";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import MissionSplit from "@/components/home/MissionSplit";
import ImpactCounters from "@/components/home/ImpactCounters";
import JourneyTimeline from "@/components/home/JourneyTimeline";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import GalleryStrip from "@/components/home/GalleryStrip";
import GetInvolvedSection from "@/components/home/GetInvolvedSection";
import InstagramSection from "@/components/home/InstagramSection";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  const locale = params.locale;
  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Marquee items={dict.marquee} />
      <MissionSplit dict={dict} />
      <ImpactCounters dict={dict} locale={locale} />
      <JourneyTimeline dict={dict} />
      <FeaturedProjects dict={dict} locale={locale} />
      <GalleryStrip dict={dict} locale={locale} />
      <GetInvolvedSection dict={dict} locale={locale} />
      <InstagramSection dict={dict} />
      <FinalCTA dict={dict} locale={locale} />
    </>
  );
}
