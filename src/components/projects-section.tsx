import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectsGrid } from "@/components/projects-grid";
import { projects } from "@/lib/data";

export function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Selected Work</h2>
        <p className="mt-3 text-foreground/60">A few projects I&apos;m proud to have shipped.</p>
      </div>

      <ProjectsGrid projects={featured} />

      <div className="mt-10 flex justify-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-trophy-cyan-light transition hover:text-trophy-cyan"
        >
          View all projects <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
