"use client";

import { useEffect, useRef, useState } from "react";

const TAGLINE = "Private AI. Built to act.".split(" ");
/** Matches the CSS timeline in globals.css: curtain starts at 2s and runs 0.95s. */
const LIFETIME_MS = 3000;
const COUNT_START_MS = 550;
const COUNT_MS = 1300;

/**
 * First-visit intro. The primary lockup is wiped in along the diagonal of the mark's red slash,
 * the tagline resolves word by word, a hairline and a tabular counter run to 100, then the
 * fog curtain collapses upward with a signal-red edge riding the cut and the hero's arc blooms
 * beneath. Server-rendered so it covers the first paint; CSS hides it for repeat visits in the
 * session, JS-off and reduced-motion visitors. Any click, key or wheel skips it.
 */
export function Intro() {
  const [done, setDone] = useState(false);
  const counter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (root.classList.contains("welcome-skip") || reduced) {
      setDone(true);
      return;
    }
    root.classList.add("welcome-lock");

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(Math.max((now - start - COUNT_START_MS) / COUNT_MS, 0), 1);
      // Same ease as the hairline (cubic-bezier(0.65, 0, 0.35, 1) ≈ easeInOutCubic).
      const eased = p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2;
      if (counter.current)
        counter.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const finish = () => {
      // Later visits in the session go straight to the page (the hero then plays its short entrance).
      root.classList.add("welcome-skip");
      setDone(true);
    };
    const timer = window.setTimeout(finish, LIFETIME_MS);
    const skip = () => finish();
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("wheel", skip, { once: true, passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      root.classList.remove("welcome-lock");
    };
  }, []);

  useEffect(() => {
    if (done) document.documentElement.classList.remove("welcome-lock");
  }, [done]);

  if (done) return null;

  return (
    <>
      <div className="intro" aria-hidden="true">
        <div className="intro-stage">
          {/* biome-ignore lint/performance/noImgElement: fixed brand artwork; next/image adds nothing here */}
          <img
            src="/brand/pyrium-lockup-primary.svg"
            alt=""
            width={300}
            height={75}
            className="intro-mark block h-auto w-[220px] md:w-[300px]"
          />
          <p className="font-display text-[18px] text-graphite-ink md:text-[20px]">
            {TAGLINE.map((word, index) => (
              <span key={word} className="intro-word" style={{ ["--i" as string]: index }}>
                {word}
                {index < TAGLINE.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
        </div>
        <div className="intro-meter">
          <span className="eyebrow">Private · Efficient · Domain-driven</span>
          <span className="intro-track">
            <span className="intro-fill" />
          </span>
          <span ref={counter} className="tabular text-[12px] font-medium text-ink">
            000
          </span>
        </div>
      </div>
      <span className="intro-edge" aria-hidden="true" />
    </>
  );
}
