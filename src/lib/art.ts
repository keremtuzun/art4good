import type { ArtKey } from "@/content/data";

/**
 * Deterministic, on-brand generated artwork used as photo placeholders.
 * Each key has a palette drawn from the Art4Good identity. Output is an
 * SVG data URI, safe to render on the server (no Math.random / Date).
 *
 * To use a real photo instead, pass an <img> src to the component that
 * consumes this; the generated art is only the fallback.
 */

const PALETTES: Record<ArtKey, string[]> = {
  workshop: ["#FF8A3D", "#FFC24B", "#E4572E"],
  paint: ["#2F6FE0", "#14AEB0", "#8A5CD6"],
  kids: ["#35B36B", "#FFC24B", "#14AEB0"],
  clay: ["#EA5C9B", "#FF8A3D", "#FFC24B"],
  marathon: ["#E4572E", "#FF8A3D", "#FFC24B"],
  biennial: ["#8A5CD6", "#2F6FE0", "#14AEB0"],
  boxes: ["#EA5C9B", "#E4572E", "#FFC24B"],
  bakesale: ["#FFC24B", "#EA5C9B", "#FF8A3D"],
  podcast: ["#8A5CD6", "#EA5C9B", "#2F6FE0"],
  materials: ["#14AEB0", "#35B36B", "#FFC24B"],
  "artwork-1": ["#35B36B", "#FFC24B", "#2F6FE0"],
  "artwork-2": ["#E4572E", "#2F6FE0", "#FFC24B"],
  "artwork-3": ["#EA5C9B", "#14AEB0", "#FF8A3D"],
};

function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generatedArt(key: ArtKey, seed?: string): string {
  const pal = PALETTES[key] ?? PALETTES.workshop;
  const r = seeded(seed ?? key);
  const w = 480;
  const h = 600;
  let s = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}' preserveAspectRatio='xMidYMid slice'>`;
  s += `<rect width='${w}' height='${h}' fill='${pal[0]}'/>`;
  s += `<defs><radialGradient id='g' cx='32%' cy='24%' r='95%'><stop offset='0' stop-color='#ffffff' stop-opacity='.30'/><stop offset='1' stop-color='#000000' stop-opacity='.14'/></radialGradient></defs>`;
  for (let i = 0; i < 8; i++) {
    const c = pal[Math.floor(r() * pal.length)];
    const cx = Math.floor(r() * w);
    const cy = Math.floor(r() * h);
    const size = 60 + Math.floor(r() * 190);
    const op = (0.5 + r() * 0.45).toFixed(2);
    const kind = Math.floor(r() * 3);
    if (kind === 0) {
      s += `<circle cx='${cx}' cy='${cy}' r='${(size / 2).toFixed(0)}' fill='${c}' opacity='${op}'/>`;
    } else if (kind === 1) {
      const rot = Math.floor(r() * 90);
      s += `<rect x='${cx}' y='${cy}' width='${size}' height='${(size * 0.5).toFixed(0)}' rx='${(size * 0.25).toFixed(0)}' fill='${c}' opacity='${op}' transform='rotate(${rot} ${cx} ${cy})'/>`;
    } else {
      s += `<path d='M${cx} ${cy} q ${size} -${(size * 0.6).toFixed(0)} ${(size * 1.4).toFixed(0)} ${(size * 0.2).toFixed(0)}' stroke='${c}' stroke-width='${(12 + r() * 22).toFixed(0)}' fill='none' stroke-linecap='round' opacity='${op}'/>`;
    }
  }
  s += `<rect width='${w}' height='${h}' fill='url(#g)'/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(s)}`;
}
