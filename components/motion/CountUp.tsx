"use client";

import { useEffect, useRef, useState } from "react";
import { motionLevel } from "@/lib/prefs";

type CountUpProps = {
  /** Final text, e.g. "88%". Integer runs inside it are animated from zero. */
  text: string;
  className?: string;
};

/**
 * Rolls every integer in the text up from zero when it scrolls into view — the "numbers
 * landing" moment. Non-numeric strings render as-is; reduced motion skips the roll.
 */
export function CountUp({ text, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [rendered, setRendered] = useState(text);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (motionLevel() === "off") return;
    // Decimals and grouped thousands ("0.982", "726,500") would roll through misleading intermediate values; show them as-is.
    if (/\d[.,]\d/.test(text)) return;
    const matches = [...text.matchAll(/\d+/g)];
    if (matches.length === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 1100;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - (1 - p) ** 3;
          let out = "";
          let last = 0;
          for (const match of matches) {
            out += text.slice(last, match.index);
            out += Math.round(Number(match[0]) * eased);
            last = match.index + match[0].length;
          }
          out += text.slice(last);
          setRendered(out);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [text]);

  return (
    <span ref={ref} className={className}>
      {rendered}
    </span>
  );
}
