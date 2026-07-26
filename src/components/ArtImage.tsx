"use client";

import { useState } from "react";
import type { ArtKey } from "@/content/data";
import { generatedArt } from "@/lib/art";
import { cn } from "@/lib/utils";

/**
 * Renders a real photo when one is available at `src`, and falls back to a
 * deterministic on-brand generated artwork otherwise. This keeps the site
 * looking finished while real Instagram/organisation photos are dropped in.
 */
export default function ArtImage({
  artKey,
  src,
  seed,
  alt,
  className,
  rounded = true,
}: {
  artKey: ArtKey;
  src?: string;
  seed?: string;
  alt: string;
  className?: string;
  rounded?: boolean;
}) {
  const fallback = generatedArt(artKey, seed ?? artKey);
  const [failed, setFailed] = useState(false);
  const showReal = src && !failed;

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden bg-cream-2", rounded && "rounded-[inherit]", className)}
      role="img"
      aria-label={alt}
    >
      {/* generated art always sits underneath as a graceful fallback */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${fallback}")` }}
      />
      {showReal && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          aria-hidden
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
