"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Download, ArrowRight, Mail, Trophy } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { siteConfig } from "@/lib/data";

function KineticHeadline({ text }: { text: string }) {
  return (
    <h1 className="flex flex-wrap justify-center text-5xl font-bold tracking-tight sm:text-7xl">
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="mr-4 flex">
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              className="inline-block text-foreground"
              whileHover={{
                y: -10,
                color: "#38bdf8",
                transition: { type: "spring", stiffness: 320, damping: 9 },
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
}

function FloatingTrophy() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 15 });
  const springY = useSpring(y, { stiffness: 60, damping: 15 });
  const rotate = useTransform(springX, [-30, 30], [-8, 8]);

  return (
    <motion.div
      aria-hidden="true"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - rect.left) / rect.width - 0.5) * 60);
        y.set(((e.clientY - rect.top) / rect.height - 0.5) * 30);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: springX, y: springY, rotate }}
      className="pointer-events-auto absolute -top-6 right-2 hidden text-trophy-cyan-light drop-shadow-[0_0_25px_rgba(56,189,248,0.55)] sm:block"
    >
      <Trophy className="h-16 w-16" strokeWidth={1.25} />
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 text-center"
    >
      <div className="relative">
        <FloatingTrophy />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm font-medium uppercase tracking-widest text-trophy-cyan-light"
        >
          {siteConfig.title}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <KineticHeadline text={siteConfig.name} />
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6 max-w-xl text-base text-foreground/70 sm:text-lg"
      >
        {siteConfig.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href="#projects"
          className="group inline-flex items-center gap-2 rounded-full bg-win-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-win-blue/30 transition hover:bg-win-blue-light hover:shadow-trophy-cyan/30"
        >
          View Technical Work
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
        <a
          href={siteConfig.resumeUrl}
          download
          className="inline-flex items-center gap-2 rounded-full border border-win-blue/40 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-md transition hover:border-trophy-cyan-light hover:text-trophy-cyan-light"
        >
          <Download className="h-4 w-4" />
          Download CV
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12 flex items-center gap-5"
      >
        <a
          href={siteConfig.social.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="text-foreground/60 transition hover:text-trophy-cyan-light"
        >
          <GithubIcon className="h-5 w-5" />
        </a>
        <a
          href={siteConfig.social.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="text-foreground/60 transition hover:text-trophy-cyan-light"
        >
          <LinkedinIcon className="h-5 w-5" />
        </a>
        <a
          href={`mailto:${siteConfig.email}`}
          aria-label="Email"
          className="text-foreground/60 transition hover:text-trophy-cyan-light"
        >
          <Mail className="h-5 w-5" />
        </a>
      </motion.div>
    </section>
  );
}
