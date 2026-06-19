import { siteConfig } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-win-blue/10 px-6 py-8 text-center text-xs text-foreground/50">
      <p>
        © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js, Tailwind CSS, and a
        little zero-gravity.
      </p>
    </footer>
  );
}
