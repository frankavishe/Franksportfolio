import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import { getAllPosts, getPostSlugs, getPostSource, type PostFrontmatter } from "@/lib/blog";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!getPostSlugs().includes(slug)) {
    notFound();
  }

  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source: getPostSource(slug),
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrism, { ignoreMissing: true }]],
      },
    },
  });

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <header className="mb-10 text-center">
        <p className="text-xs uppercase tracking-wide text-trophy-cyan-light">
          {new Date(frontmatter.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="mt-3 text-4xl font-bold">{frontmatter.title}</h1>
      </header>

      <div className="prose prose-invert prose-blue mx-auto max-w-none prose-headings:scroll-mt-24 prose-a:text-trophy-cyan-light prose-strong:text-foreground">
        {content}
      </div>
    </article>
  );
}
