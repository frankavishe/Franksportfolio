import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on software engineering, architecture, and shipping production systems.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold">Writing</h1>
        <p className="mt-3 text-foreground/60">Notes on building and shipping software.</p>
      </div>

      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-xl border border-win-blue/10 bg-space-deep/40 p-6 backdrop-blur-md transition hover:border-trophy-cyan-light/40"
          >
            <p className="text-xs uppercase tracking-wide text-trophy-cyan-light">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-foreground transition group-hover:text-trophy-cyan-light">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-foreground/70">{post.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-win-blue/10 px-2.5 py-1 text-[11px] text-foreground/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
