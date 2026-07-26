export default function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden bg-ink py-4 text-white" aria-hidden>
      <div className="flex w-max animate-marquee gap-12">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-xl italic">
            {item}
            <span className="not-italic text-brand-yellow">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
