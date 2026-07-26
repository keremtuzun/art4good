import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The official Art4Good logo (from @art4good.ist), presented on a soft white
 * tile so the colourful mark + wordmark stay legible on any background , 
 * the light nav as well as the dark footer.
 */
export default function BrandLogo({
  size = 44,
  priority = false,
  className,
}: {
  size?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_6px_18px_-8px_rgba(28,38,55,0.35)] ring-1 ring-black/5",
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/logo.jpg"
        alt="Art4Good"
        width={size}
        height={size}
        priority={priority}
        className="h-full w-full object-contain p-1"
      />
    </span>
  );
}
