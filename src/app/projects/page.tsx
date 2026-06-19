import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/projects-grid";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse all projects, filterable by category: Frontend, Backend, DevOps, Web3, Full Stack.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold">All Projects</h1>
        <p className="mt-3 text-foreground/60">Filter by category to explore the stack.</p>
      </div>
      <ProjectsGrid projects={projects} showFilter />
    </div>
  );
}
