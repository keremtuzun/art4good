"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LogoMark } from "./Logo";

/**
 * Brief intro where a painted line is drawn onto the screen with the logo.
 * Shows once per session, and never blocks for reduced-motion users.
 */
export default function LoadingIntro({ line }: { line: string }) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (reduce) {
      setShow(false);
      return;
    }
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("a4g-intro") === "1") {
      setShow(false);
      return;
    }
    const t = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem("a4g-intro", "1");
      } catch {}
    }, 1900);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-cream"
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
          >
            <LogoMark className="h-20 w-20 animate-spin-slow" />
          </motion.div>
          <svg width="220" height="20" viewBox="0 0 220 20" className="mt-6" aria-hidden>
            <motion.path
              d="M4 12 C 50 2, 90 20, 130 8 S 200 4, 216 10"
              fill="none"
              stroke="#E4572E"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </svg>
          <motion.p
            className="mt-4 font-hand text-2xl text-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {line}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
