"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** A button/link that gently follows the cursor (magnetic effect). */
export default function MagneticButton({
  href,
  children,
  className,
  external = false,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const inner = (
    <motion.div
      ref={ref}
      data-cursor="lift"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("btn transition-transform duration-300 ease-out", className)}
    >
      {children}
    </motion.div>
  );

  if (!href) {
    return (
      <button type="button" onClick={onClick} className="inline-block bg-transparent p-0">
        {inner}
      </button>
    );
  }
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className="inline-block" onClick={onClick}>
      {inner}
    </Link>
  );
}
