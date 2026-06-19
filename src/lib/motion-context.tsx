"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type MotionContextValue = {
  frozen: boolean;
  toggleFrozen: () => void;
};

const MotionContext = createContext<MotionContextValue | null>(null);

const STORAGE_KEY = "motion-frozen";

export function MotionProvider({ children }: { children: ReactNode }) {
  const [frozen, setFrozen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setFrozen(stored !== null ? stored === "true" : prefersReduced);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("motion-frozen", frozen);
    window.localStorage.setItem(STORAGE_KEY, String(frozen));
  }, [frozen, hydrated]);

  return (
    <MotionContext.Provider value={{ frozen, toggleFrozen: () => setFrozen((f) => !f) }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const ctx = useContext(MotionContext);
  if (!ctx) throw new Error("useMotion must be used within MotionProvider");
  return ctx;
}
