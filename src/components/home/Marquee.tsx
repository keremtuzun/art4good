const STAR_COLORS = [
  "text-brand-red",
  "text-brand-purple",
  "text-brand-blue",
  "text-brand-green",
  "text-brand-pink",
];

export default function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="overflow-hidden py-4 text-ink"
      style={{
        backgroundImage:
          "linear-gradient(90deg,#FFE39A,#FFC24B,#FFB88A,#FFA9C9,#D6BBFF,#A9DCFF,#A6EBC9,#FFE39A)",
      }}
      aria-hidden
    >
      <div className="flex w-max animate-marquee gap-12">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-xl italic">
            {item}
            <span className={`not-italic ${STAR_COLORS[i % STAR_COLORS.length]}`}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
