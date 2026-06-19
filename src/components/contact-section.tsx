"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-2xl px-6 py-24">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Let&apos;s Talk</h2>
        <p className="mt-3 text-foreground/60">
          Have a role, a project, or just a question? Send a message.
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 rounded-2xl border border-win-blue/15 bg-space-deep/40 p-6 backdrop-blur-md sm:p-8"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-foreground/80">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            aria-invalid={!!errors.name}
            className="rounded-lg border border-win-blue/20 bg-space-void/60 px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-trophy-cyan-light"
          />
          {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-foreground/80">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={!!errors.email}
            className="rounded-lg border border-win-blue/20 bg-space-void/60 px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-trophy-cyan-light"
          />
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm font-medium text-foreground/80">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            {...register("message")}
            aria-invalid={!!errors.message}
            className="resize-none rounded-lg border border-win-blue/20 bg-space-void/60 px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-trophy-cyan-light"
          />
          {errors.message && <p className="text-xs text-red-400">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-win-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-win-blue/30 transition hover:bg-win-blue-light disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="flex items-center justify-center gap-2 text-sm text-trophy-cyan-light">
            <CheckCircle2 className="h-4 w-4" /> Message sent — I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="flex items-center justify-center gap-2 text-sm text-red-400">
            <AlertCircle className="h-4 w-4" /> Something went wrong. Please try again.
          </p>
        )}
      </motion.form>
    </section>
  );
}
