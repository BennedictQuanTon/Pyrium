"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger slot in multiples of 90ms, for sibling groups revealed together. */
  delay?: number;
  className?: string;
};

/**
 * Scroll-into-view reveal: a single 24px rise and fade, staggered by slot. Content stays
 * visible when JS never loads (the hiding rule requires html.js, added by an inline bootstrap
 * script) and when the visitor prefers reduced motion (globals.css overrides the transform).
 */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.classList.add("is-visible");
        observer.disconnect();
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay > 0 ? { ["--reveal-delay" as string]: `${delay * 90}ms` } : undefined}
    >
      {children}
    </div>
  );
}
