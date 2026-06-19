"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, Server, Cloud, Blocks, Layers, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Project } from "@/lib/data";

const CATEGORY_ICON = {
  Frontend: Code2,
  Backend: Server,
  DevOps: Cloud,
  Web3: Blocks,
  "Full Stack": Layers,
} as const;

export function ProjectCard({ project }: { project: Project }) {
  const Icon = CATEGORY_ICON[project.category];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      style={{ transformStyle: "preserve-3d" }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-win-blue/15 bg-space-deep/40 backdrop-blur-md transition hover:border-trophy-cyan-light/50 hover:shadow-[0_0_40px_-10px_rgba(56,189,248,0.45)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} cover`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-win-blue/30 via-space-deep to-trophy-cyan/20">
            <Icon className="h-10 w-10 text-trophy-cyan-light/70" strokeWidth={1.25} />
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full border border-champ-gold/40 bg-space-void/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-champ-gold">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
        <p className="flex-1 text-sm text-foreground/70">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-win-blue/10 px-2.5 py-1 text-[11px] text-trophy-cyan-light"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-2 flex items-center gap-4 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-foreground/80 transition hover:text-trophy-cyan-light"
            >
              <ExternalLink className="h-4 w-4" /> Live
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-foreground/80 transition hover:text-trophy-cyan-light"
            >
              <GithubIcon className="h-4 w-4" /> Source
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
