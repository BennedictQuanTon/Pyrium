"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Citation } from "@/components/ui/Primitives";
import { Rail } from "@/components/ui/Rail";
import type { Copy } from "@/content/copy";
import { motionLevel } from "@/lib/prefs";

type CoreCopy = Copy["core"];
const CYCLE_MS = 6000;

/** Agentic: three nodes linked by a path that work flows along. */
function AgenticGlyph() {
  return (
    <svg viewBox="0 0 96 64" fill="none" aria-hidden="true" className="glyph h-12 w-auto">
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
    <svg viewBox="0 0 96 64" fill="none" aria-hidden="true" className="glyph h-12 w-auto">
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
    <svg viewBox="0 0 96 64" fill="none" aria-hidden="true" className="glyph h-12 w-auto">
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

/** Deep domain: layered sheets (SOPs, data, rules) with the system shaped to the top one. */
function DomainGlyph() {
  return (
    <svg viewBox="0 0 96 64" fill="none" aria-hidden="true" className="glyph h-12 w-auto">
      <path
        d="M18 40 L48 54 L78 40"
        stroke="currentColor"
        strokeWidth="1.5"
        className="perimeter"
        style={{ animationDelay: "0.8s" }}
      />
      <path
        d="M18 30 L48 44 L78 30"
        stroke="currentColor"
        strokeWidth="1.5"
        className="perimeter"
        style={{ animationDelay: "0.4s" }}
      />
      <path
        d="M18 20 L48 6 L78 20 L48 34 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        className="perimeter"
      />
      <circle cx="48" cy="20" r="5" className="node node-end" />
    </svg>
  );
}

/** Fast integration: two blocks snapping together along a connector. */
function IntegrationGlyph() {
  return (
    <svg viewBox="0 0 96 64" fill="none" aria-hidden="true" className="glyph h-12 w-auto">
      <rect
        x="10"
        y="18"
        width="28"
        height="28"
        rx="8"
        stroke="currentColor"
        strokeWidth="1.5"
        className="perimeter"
      />
      <rect
        x="58"
        y="18"
        width="28"
        height="28"
        rx="8"
        stroke="currentColor"
        strokeWidth="1.5"
        className="perimeter"
        style={{ animationDelay: "0.5s" }}
      />
      <path className="flow" d="M38 32 H58" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="48" cy="32" r="5" className="node node-end" />
    </svg>
  );
}

const GLYPHS = {
  agentic: AgenticGlyph,
  private: PrivateGlyph,
  efficient: EfficientGlyph,
  domain: DomainGlyph,
  integration: IntegrationGlyph,
};

/**
 * One circle per pillar, arranged around a centre and sliding in from apart until they overlap
 * like petals; where all of them meet, the Pyrium mark appears. Labels sit outside each circle.
 */
function Meet({ labels }: { labels: string[] }) {
  const count = labels.length;
  const petals = labels.map((label, index) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / count;
    return {
      label,
      cx: 140 + Math.cos(angle) * 38,
      cy: 140 + Math.sin(angle) * 38,
      lx: 140 + Math.cos(angle) * 124,
      ly: 144 + Math.sin(angle) * 118,
      tx: Math.cos(angle) * 26,
      ty: Math.sin(angle) * 26,
    };
  });
  return (
    <svg viewBox="-36 0 352 290" aria-hidden="true" className="meet h-auto w-full max-w-[380px]">
      {petals.map((petal) => (
        <circle
          key={petal.label}
          cx={petal.cx}
          cy={petal.cy}
          r="56"
          className="meet-petal"
          style={{ ["--tx" as string]: `${petal.tx}px`, ["--ty" as string]: `${petal.ty}px` }}
        />
      ))}
      <circle cx="140" cy="140" r="30" className="meet-core" />
      <image
        href="/brand/pyrium-mark-reverse.png"
        x="125"
        y="125"
        width="30"
        height="30"
        className="meet-mark"
      />
      {petals.map((petal) => (
        <text
          key={`${petal.label}-label`}
          x={petal.lx}
          y={petal.ly}
          textAnchor="middle"
          className="meet-label"
        >
          {petal.label}
        </text>
      ))}
    </svg>
  );
}

/**
 * Pyrium's core in one quiet, dark section: Agentic AI, Private AI, Cost-efficient and Deep
 * Domain. Each pillar is a glass card with its own living glyph, the market shift it answers
 * (the old way struck through in red), what we do about it, and one cited fact. The highlight
 * cycles on its own with a progress line and follows the pointer or keyboard focus. Underneath,
 * four circles converge on the point where all four meet.
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
      threshold: 0.2,
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
      className="core-section relative overflow-hidden py-16 text-snow md:py-32"
    >
      <div aria-hidden="true" className="core-field absolute inset-0" />
      <div className="page-width relative flex flex-col gap-10 md:gap-14">
        <Reveal className="flex flex-col gap-5">
          <p className="eyebrow flex items-center gap-2 text-silver">
            <span aria-hidden="true" className="h-px w-6 bg-signal" />
            {copy.eyebrow}
          </p>
          <h2 className="max-w-[20ch] text-[36px] leading-[1.06] tracking-[-1px] text-snow md:text-[64px] md:tracking-[-1.8px]">
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

        <Rail
          as="ol"
          className="md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-6"
          onPointerEnter={() => setHeld(true)}
          onPointerLeave={() => setHeld(false)}
        >
          {copy.pillars.map((pillar, index) => {
            const Glyph = GLYPHS[pillar.key as keyof typeof GLYPHS];
            return (
              <li key={pillar.key} className={index < 3 ? "lg:col-span-2" : "lg:col-span-3"}>
                <Reveal pop delay={index % 3} className="h-full">
                  <article
                    // biome-ignore lint/a11y/noNoninteractiveTabindex: focus mirrors hover so keyboard visitors can move the highlight
                    tabIndex={0}
                    onPointerEnter={() => setActive(index)}
                    onFocus={() => {
                      setActive(index);
                      setHeld(true);
                    }}
                    onBlur={() => setHeld(false)}
                    data-active={active === index}
                    className="pillar glass-dark flex h-full flex-col gap-6 p-6 outline-none md:p-8"
                  >
                    <span
                      aria-hidden="true"
                      className="pillar-progress"
                      key={`${active}-${held}`}
                    />
                    <div className="flex flex-col gap-5">
                      <div className="flex items-start justify-between gap-4">
                        <span className="pillar-glyph text-silver">
                          <Glyph />
                        </span>
                        <span className="tabular text-[13px] text-silver">0{index + 1}</span>
                      </div>
                      <h3 className="text-[30px] leading-[1.1] tracking-[-0.6px] text-snow md:text-[34px]">
                        {pillar.name}
                      </h3>
                      <p className="text-[16px] leading-[1.5] text-mist">{pillar.promise}</p>
                      <div className="mt-auto flex flex-col gap-1 rounded-[18px] bg-white/[0.05] p-4">
                        <span className="font-display text-[28px] leading-none tracking-[-0.03em] text-snow">
                          {pillar.fact.value}
                        </span>
                        <span className="text-[13px] leading-[1.45] text-silver">
                          {pillar.fact.label}
                          {pillar.fact.source ? <Citation id={pillar.fact.source} onDark /> : null}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-2">
                        <p className="eyebrow text-silver">{copy.shiftLabel}</p>
                        <p className="shift-from w-fit text-[14px] text-silver">{pillar.from}</p>
                        <p className="flex items-start gap-2 text-[15px] leading-[1.45] text-snow">
                          <span aria-hidden="true" className="text-signal">
                            →
                          </span>
                          {pillar.to}
                        </p>
                      </div>
                      <ul className="hidden flex-col gap-2.5 border-t border-white/10 pt-5 md:flex">
                        {pillar.capabilities.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2.5 text-[14px] leading-[1.5] text-mist"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[9px] h-px w-3 shrink-0 bg-signal"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </Rail>

        <Reveal className="grid items-center gap-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:grid-cols-[minmax(0,380px)_1fr] md:gap-16 md:rounded-[32px] md:p-12">
          <div className="mx-auto w-full max-w-[280px] md:max-w-none">
            <Meet labels={copy.meet.labels} />
          </div>
          <div className="flex flex-col gap-4">
            <p className="eyebrow flex items-center gap-2 text-silver">
              <span aria-hidden="true" className="h-px w-6 bg-signal" />
              {copy.meet.title}
            </p>
            <p className="max-w-[26ch] font-display text-[24px] leading-[1.2] tracking-[-0.5px] text-snow md:text-[42px]">
              {copy.meet.body}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
