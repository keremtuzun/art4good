import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  center = false,
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  center?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", center && "mx-auto text-center", className)}>
      {eyebrow && (
        <span className={cn("eyebrow", center && "justify-center", light && "text-brand-yellow")}>{eyebrow}</span>
      )}
      <h2 className={cn("mt-4 text-[clamp(2rem,4.4vw,3.1rem)]", light && "text-white")}>{title}</h2>
      {lede && <p className={cn("mt-4 text-lg", light ? "text-white/75" : "text-muted")}>{lede}</p>}
    </Reveal>
  );
}
