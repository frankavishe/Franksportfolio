"use client";

import { Accessibility } from "lucide-react";
import { useMotion } from "@/lib/motion-context";

export function AccessibilityToggle() {
  const { frozen, toggleFrozen } = useMotion();

  return (
    <button
      type="button"
      onClick={toggleFrozen}
      aria-pressed={frozen}
      title={frozen ? "Enable motion and starfield effects" : "Freeze motion and starfield effects"}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-win-blue/40 bg-space-deep/80 px-3 py-2 text-xs font-medium text-foreground backdrop-blur-md shadow-lg shadow-win-blue/10 transition hover:border-trophy-cyan-light hover:text-trophy-cyan-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-trophy-cyan-light"
    >
      <Accessibility className="h-4 w-4" aria-hidden="true" />
      <span>{frozen ? "Motion off" : "Reduce motion"}</span>
    </button>
  );
}
