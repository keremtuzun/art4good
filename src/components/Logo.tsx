import { cn } from "@/lib/utils";

/** The Art4Good paint-splash mark, recreated as crisp inline SVG. */
export function LogoMark({ className, circle = "#1C2637" }: { className?: string; circle?: string }) {
  const petals = ["#E4572E", "#FFC24B", "#35B36B", "#14AEB0", "#2F6FE0", "#8A5CD6"];
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="48" fill={circle} />
      <g transform="translate(50 48)">
        {petals.map((c, i) => (
          <path
            key={i}
            d="M0,-30 C7,-24 7,-12 0,-6 C-7,-12 -7,-24 0,-30Z"
            fill={c}
            transform={`rotate(${i * 60})`}
          />
        ))}
        <circle r="6" fill="#fff" />
      </g>
    </svg>
  );
}

export function LogoWordmark({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-sans font-extrabold tracking-tight", className)}>
      <LogoMark className="h-9 w-9" />
      <span className={dark ? "text-white" : "text-ink"}>
        Art<span className="text-brand-red">4</span>Good
      </span>
    </span>
  );
}
