"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Dictionary, Locale } from "@/lib/i18n";
import { PROJECTS, type ProjectCategory } from "@/content/data";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;
const FILTERS: Filter[] = ["all", "workshop", "fundraiser", "affiliated", "volunteering", "future"];

export default function ProjectsExplorer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [filter, setFilter] = useState<Filter>("all");
  const items = PROJECTS.filter((p) => filter === "all" || p.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              filter === f ? "border-ink bg-ink text-white" : "border-line bg-paper text-ink hover:border-ink"
            )}
          >
            {dict.projects.filters[f]}
          </button>
        ))}
      </div>
      <motion.div layout className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <motion.div layout key={p.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ProjectCard project={p} dict={dict} locale={locale} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
