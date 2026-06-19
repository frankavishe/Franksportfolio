"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/data";

const CATEGORIES = ["All", "Frontend", "Backend", "DevOps", "Web3", "Full Stack"] as const;

export function ProjectsGrid({
  projects,
  showFilter = false,
}: {
  projects: Project[];
  showFilter?: boolean;
}) {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [projects, active],
  );

  return (
    <div>
      {showFilter && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={active === category}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                active === category
                  ? "border-trophy-cyan-light bg-trophy-cyan-light/10 text-trophy-cyan-light"
                  : "border-win-blue/20 text-foreground/60 hover:border-win-blue/40 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-foreground/50">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
