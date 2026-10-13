import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import AwarenessQuiz from "@/components/AwarenessQuiz";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Art access quiz",
  description: "Ten sourced questions about children's access to art, poverty and creative education.",
};

export default function QuizPage({ params }: { params: { locale: Locale } }) {
  return (
    <>
      <PageHeader
        eyebrow="10 questions · about 3 minutes"
        title="How much do you know about access to art?"
        lede="Explore the barriers children face. Every answer includes context and a source, because awareness starts with reliable facts."
      />
      <AwarenessQuiz locale={params.locale} />
    </>
  );
}
