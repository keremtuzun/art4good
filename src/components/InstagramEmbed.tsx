"use client";

import { cn } from "@/lib/utils";

/**
 * Official Instagram post embed (raw iframe, no scraping). Renders the real
 * post from @art4good.ist. Instagram limits embeds for some logged-out
 * viewers, so this is used only for posts we don't self-host; the reliable
 * photos in the gallery are served from /public.
 */
export default function InstagramEmbed({
  code,
  className,
  title,
}: {
  code: string;
  className?: string;
  title?: string;
}) {
  return (
    <div className={cn("w-full overflow-hidden rounded-2xl border border-line bg-white", className)}>
      <iframe
        src={`https://www.instagram.com/p/${code}/embed/captioned/`}
        title={title ?? `Instagram post ${code}`}
        loading="lazy"
        scrolling="no"
        allow="encrypted-media"
        className="w-full border-0 bg-white"
        style={{ height: 560 }}
      />
    </div>
  );
}
