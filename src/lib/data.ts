// PLACEHOLDER CONTENT — replace with your real details before shipping.

export const siteConfig = {
  name: "Frank Simon Kavishe",
  title: "Full Stack Developer",
  tagline: "I build fast, accessible, production-grade web experiences.",
  description:
    "Portfolio of Frank Simon Kavishe, a full stack developer specializing in Next.js, TypeScript, and distributed systems.",
  url: "https://example.com",
  email: "heyamfrank@gmail.com",
  resumeUrl: "/resume.pdf",
  social: {
    github: "https://github.com/frankavishe",
    linkedin: "https://www.linkedin.com/in/frank-kavishe-6064b5246",
  },
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  /** Path to a cover screenshot under /public. Omit to use the generated placeholder cover. */
  image?: string;
  tags: string[];
  category: "Frontend" | "Backend" | "DevOps" | "Web3" | "Full Stack";
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "xy",
    title: "xy",
    description: "Full-stack application with a NestJS backend and an HTML, CSS, and JavaScript frontend.",
    tags: ["NestJS", "HTML", "CSS", "JavaScript"],
    category: "Full Stack",
    repoUrl: "https://github.com/frankavishe/xy",
    featured: true,
  },
  {
    slug: "franks-portfolio",
    title: "Frank's Portfolio",
    description: "Personal portfolio site built with Next.js, TypeScript, and Tailwind CSS.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Frontend",
    repoUrl: "https://github.com/frankavishe/Franksportfolio",
    featured: true,
  },
];

export type ExperienceEntry = {
  company: string;
  title: string;
  start: string;
  end: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "Quadraat Software House Global",
    title: "Full Stack Developer",
    start: "May 2026",
    end: "Present",
    bullets: [
      "Full-stack development across the company's product line.",
    ],
  },
  {
    company: "Freelance",
    title: "Software Engineer",
    start: "2018",
    end: "2026",
    bullets: [
      "Delivered client web applications across e-commerce, fintech, and healthtech.",
      "Built a custom CMS that reduced client content-update turnaround from days to minutes.",
    ],
  },
];
