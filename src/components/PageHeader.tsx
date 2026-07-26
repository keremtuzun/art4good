import Reveal from "./Reveal";

export default function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="relative overflow-hidden pt-[70px]">
      <span className="pointer-events-none absolute -right-20 -top-10 h-72 w-72 rounded-full bg-brand-yellow/30 blur-[70px]" />
      <span className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-brand-teal/25 blur-[70px]" />
      <div className="wrap py-16 md:py-24">
        <Reveal>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="mt-4 text-[clamp(2.3rem,5.5vw,4rem)] leading-[1.05]">{title}</h1>
          {lede && <p className="mt-5 max-w-2xl text-xl text-muted">{lede}</p>}
        </Reveal>
      </div>
    </header>
  );
}
