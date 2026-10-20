"use client";

import { useEffect, useState } from "react";

/**
 * First-visit welcome curtain, in the spirit of air.inc's load moment: the reversed brand
 * mark rises in, a signal-red rule draws underneath, then the whole sheet lifts. Rendered on
 * the server, but CSS (bootstrapped before first paint in app/layout.tsx) hides it entirely
 * for repeat visits in the same session, JS-off visitors and reduced-motion visitors; React
 * unmounts it after its exit animation. Scrolling is locked while it plays.
 */
export function Welcome() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const skip = root.classList.contains("welcome-skip");
    if (skip) {
      setDone(true);
      return;
    }
    root.classList.add("welcome-lock");
    // Match the CSS timeline: fade starts 1.25s, lasts 0.7s.
    const timer = window.setTimeout(() => setDone(true), 2050);
    return () => {
      window.clearTimeout(timer);
      root.classList.remove("welcome-lock");
    };
  }, []);

  useEffect(() => {
    if (done) document.documentElement.classList.remove("welcome-lock");
  }, [done]);

  if (done) return null;

  return (
    <div className="welcome" aria-hidden="true">
      {/* Primary lockup from the no-tagline kit. On the fog canvas the black wordmark with
          its red mark is the primary treatment. */}
      {/* biome-ignore lint/performance/noImgElement: fixed brand artwork; next/image adds nothing here */}
      <img
        src="/brand/pyrium-lockup-primary.svg"
        alt=""
        width={280}
        height={70}
        className="welcome-mark block h-auto"
      />
      <span className="welcome-line" />
      <p className="welcome-tagline text-[12px] font-medium tracking-[0.14em] text-stone uppercase">
        Private AI, engineered for the real business.
      </p>
    </div>
  );
}
