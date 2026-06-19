"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experience } from "@/lib/data";

export function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-24">
      <div className="mb-14 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Career Roadmap</h2>
        <p className="mt-3 text-foreground/60">Where I&apos;ve shipped, scaled, and learned.</p>
      </div>

      <ol className="relative border-l border-win-blue/20 pl-8">
        {experience.map((entry, i) => (
          <motion.li
            key={entry.company}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="relative mb-12 last:mb-0"
          >
            <span className="absolute -left-[2.55rem] flex h-8 w-8 items-center justify-center rounded-full border border-trophy-cyan-light/40 bg-space-deep text-trophy-cyan-light shadow-[0_0_20px_-4px_rgba(56,189,248,0.6)]">
              <Briefcase className="h-4 w-4" />
            </span>

            <div className="rounded-xl border border-win-blue/10 bg-space-deep/40 p-5 backdrop-blur-md">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-foreground">{entry.title}</h3>
                <span className="text-xs font-medium uppercase tracking-wide text-champ-gold">
                  {entry.start} — {entry.end}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-trophy-cyan-light">{entry.company}</p>
              <ul className="mt-3 space-y-2 text-sm text-foreground/70">
                {entry.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-win-blue-light" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
