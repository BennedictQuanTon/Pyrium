"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Citation } from "@/components/ui/Primitives";
import type { Copy } from "@/content/copy";
import { motionLevel } from "@/lib/prefs";

type CoreCopy = Copy["core"];
const CYCLE_MS = 6000;

/** Agentic: three nodes linked by a path that work flows along. */
function AgenticGlyph() {
  return (
    <svg viewBox="0 0 96 64" fill="none" aria-hidden="true" className="glyph h-14 w-auto">
      <path
        className="flow"
        d="M14 44 C 30 44, 30 18, 48 18 S 66 44, 82 44"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="14" cy="44" r="6" className="node" />
      <circle cx="48" cy="18" r="6" className="node" style={{ animationDelay: "0.4s" }} />
      <circle cx="82" cy="44" r="6" className="node node-end" style={{ animationDelay: "0.8s" }} />
    </svg>
  );
}

/** Private: concentric perimeters around a single point that stays inside. */
function PrivateGlyph() {
  return (
    <svg viewBox="0 0 96 64" fill="none" aria-hidden="true" className="glyph h-14 w-auto">
      <rect
        x="20"
        y="4"
        width="56"
        height="56"
        rx="16"
        stroke="currentColor"
        strokeWidth="1.5"
        className="perimeter"
      />
      <rect
        x="32"
        y="16"
        width="32"
        height="32"
        rx="10"
        stroke="currentColor"
        strokeWidth="1.5"
        className="perimeter"
        style={{ animationDelay: "0.6s" }}
      />
      <circle cx="48" cy="32" r="5" className="node node-end" />
    </svg>
  );
}

/** Cost-efficient: a falling cost curve with bars stepping down beneath it. */
function EfficientGlyph() {
  return (
    <svg viewBox="0 0 96 64" fill="none" aria-hidden="true" className="glyph h-14 w-auto">
      {[0, 1, 2, 3].map((bar) => (
        <rect
          key={bar}
          x={14 + bar * 20}
          y={20 + bar * 9}
          width="10"
          height={40 - bar * 9}
          rx="3"
          className="bar"
          style={{ animationDelay: `${bar * 0.15}s` }}
        />
      ))}
      <path
        className="flow"
        d="M10 12 C 34 14, 50 34, 86 50"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="86" cy="50" r="5" className="node node-end" />
    </svg>
  );
}

const GLYPHS = { agentic: AgenticGlyph, private: PrivateGlyph, efficient: EfficientGlyph };

/** Three loose circles that slide together; their shared centre turns signal red. */
function Meet() {
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true" className="meet h-28 w-auto shrink-0">
      <circle cx="62" cy="48" r="34" className="meet-a" />
      <circle cx="98" cy="48" r="34" className="meet-b" />
      <circle cx="80" cy="78" r="34" className="meet-c" />
      <circle cx="80" cy="58" r="7" className="meet-core" />
    </svg>
  );
}

/**
 * Pyrium's core in one dark, quiet section: Agentic AI, Private AI and Cost-efficient. Each
 * pillar is a glass card with its own living glyph, the market shift it answers (the old way
 * struck through in red), what we do about it, and one cited fact. The highlight cycles on its
 * own with a progress line, and follows the pointer or keyboard focus when the visitor engages.
 * Underneath, three circles converge on the point where all three meet.
 */
export function Core({ copy }: { copy: CoreCopy }) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const section = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // `active` is listed so each step re-arms the timer after a manual change.
  // biome-ignore lint/correctness/useExhaustiveDependencies: active restarts the cycle timer
  useEffect(() => {
    if (held || !inView || motionLevel() === "off") return;
    const timer = window.setTimeout(
      () => setActive((value) => (value + 1) % copy.pillars.length),
      CYCLE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [active, held, inView, copy.pillars.length]);

  return (
    <section
      ref={section}
      id="solution"
      className="core-section relative overflow-hidden py-24 text-snow md:py-32"
    >
      <div aria-hidden="true" className="core-field absolute inset-0" />
      <div className="page-width relative flex flex-col gap-14">
        <Reveal className="flex flex-col gap-5">
          <p className="eyebrow flex items-center gap-2 text-silver">
            <span aria-hidden="true" className="h-px w-6 bg-signal" />
            {copy.eyebrow}
          </p>
          <h2 className="core-title max-w-[18ch] text-[42px] leading-[1.05] tracking-[-1px] text-snow md:text-[72px] md:tracking-[-2px]">
            {copy.title.split(" ").map((word, index) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: a fixed sentence; position is identity
                key={index}
                className="core-word"
                style={{ ["--i" as string]: index }}
              >
                {word}
              </span>
            ))}
          </h2>
          <p className="max-w-[58ch] text-body text-silver md:text-subheading">{copy.body}</p>
        </Reveal>

        <ol
          className="grid gap-4 lg:grid-cols-3"
          onPointerEnter={() => setHeld(true)}
          onPointerLeave={() => setHeld(false)}
        >
          {copy.pillars.map((pillar, index) => {
            const Glyph = GLYPHS[pillar.key as keyof typeof GLYPHS];
            const on = active === index;
            return (
              <li key={pillar.key}>
                <Reveal pop delay={index} className="h-full">
                  <article
                    // biome-ignore lint/a11y/noNoninteractiveTabindex: focus mirrors hover so keyboard visitors can move the highlight
                    tabIndex={0}
                    onPointerEnter={() => setActive(index)}
                    onFocus={() => {
                      setActive(index);
                      setHeld(true);
                    }}
                    onBlur={() => setHeld(false)}
                    data-active={on}
                    className="pillar glass-dark flex h-full flex-col gap-7 p-7 outline-none md:p-8"
                  >
                    <span
                      aria-hidden="true"
                      className="pillar-progress"
                      key={`${active}-${held}`}
                    />
                    <div className="flex items-start justify-between gap-4">
                      <span className="pillar-glyph text-silver">
                        <Glyph />
                      </span>
                      <span className="tabular text-[13px] text-silver">0{index + 1}</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-[30px] leading-[1.1] tracking-[-0.6px] text-snow md:text-[34px]">
                        {pillar.name}
                      </h3>
                      <p className="text-[16px] leading-[1.5] text-mist">{pillar.promise}</p>
                    </div>
                    <div className="flex flex-col gap-2 border-t border-white/10 pt-5">
                      <p className="eyebrow text-silver">{copy.shiftLabel}</p>
                      <p className="shift-from w-fit text-[14px] text-silver">{pillar.from}</p>
                      <p className="flex items-center gap-2 text-[15px] text-snow">
                        <span aria-hidden="true" className="text-signal">
                          →
                        </span>
                        {pillar.to}
                      </p>
                    </div>
                    <ul className="flex flex-col gap-2.5">
                      {pillar.capabilities.map((item) => (
                        <li key={item} className="flex gap-2.5 text-[14px] leading-[1.5] text-mist">
                          <span
                            aria-hidden="true"
                            className="mt-[9px] h-px w-3 shrink-0 bg-signal"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-col gap-1 rounded-[18px] bg-white/[0.05] p-4">
                      <span className="font-display text-[30px] leading-none tracking-[-0.03em] text-snow">
                        {pillar.fact.value}
                      </span>
                      <span className="text-[13px] text-silver">
                        {pillar.fact.label}
                        <Citation id={pillar.fact.source} onDark />
                      </span>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <Reveal className="flex flex-col items-start gap-6 border-t border-white/10 pt-12 md:flex-row md:items-center md:gap-10">
          <Meet />
          <div className="flex flex-col gap-2">
            <p className="eyebrow text-silver">{copy.meet.title}</p>
            <p className="max-w-[40ch] font-display text-[24px] leading-[1.3] text-snow md:text-[30px]">
              {copy.meet.body}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
