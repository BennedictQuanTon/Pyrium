"use client";

import { useEffect, useRef, useState } from "react";
import { SmartLink } from "@/components/ui/SmartLink";
import { ProductLogo } from "@/components/work/ProductLogo";
import type { Organizer, ProductSlug } from "@/content/types";
import { motionLevel } from "@/lib/prefs";

type Row = { slug: ProductSlug; event: string; period: string; partners: string[] };

const STEP_MS = 3600;

/**
 * Products and the organizers they were built with, as one piece: the product list on one
 * side, the whole circle of organizers on the other. The active product lights up its own
 * partners and lets the rest recede. It steps through the list on its own while in view;
 * hovering or focusing a row takes over, and leaving hands control back.
 */
export function BuiltWith({
  rows,
  organizers,
  withLabel,
}: {
  rows: Row[];
  organizers: Organizer[];
  withLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    setAuto(motionLevel() !== "off");
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const cycling = auto && inView && !held;

  // `active` is listed so a manual pick restarts the step timer.
  // biome-ignore lint/correctness/useExhaustiveDependencies: active restarts the step timer
  useEffect(() => {
    if (!cycling) return;
    const timer = window.setTimeout(() => setActive((value) => (value + 1) % rows.length), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [active, cycling, rows.length]);

  const partners = new Set(rows[active]?.partners ?? []);

  return (
    <div
      ref={ref}
      className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-14"
    >
      <ol
        className="flex flex-col gap-1.5"
        onPointerLeave={() => setHeld(false)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false);
        }}
      >
        {rows.map((row, index) => {
          const on = index === active;
          return (
            <li
              key={row.slug}
              onPointerEnter={() => {
                setHeld(true);
                setActive(index);
              }}
              onFocus={() => {
                setHeld(true);
                setActive(index);
              }}
            >
              <SmartLink
                href={`/work/${row.slug}`}
                className={`group relative grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 overflow-hidden rounded-[20px] px-4 py-4 transition-[background-color,box-shadow] duration-500 md:px-5 ${on ? "bg-fog" : "hover:bg-fog/60"}`}
              >
                <span
                  aria-hidden="true"
                  className={`tabular text-[12px] transition-colors duration-500 ${on ? "text-signal" : "text-stone"}`}
                >
                  0{index + 1}
                </span>
                <span className="flex min-w-0 flex-col items-start gap-1.5">
                  <ProductLogo slug={row.slug} size="sm" />
                  <span className="text-[12px] leading-[1.45] text-stone">
                    {row.event} · <span className="tabular">{row.period}</span>
                  </span>
                  <span className="sr-only">
                    {withLabel} {row.partners.join(", ")}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`text-signal transition-all duration-500 group-hover:translate-x-1 ${on ? "opacity-100" : "opacity-0"}`}
                >
                  →
                </span>
                {on ? (
                  <span
                    key={`${active}-${cycling}`}
                    aria-hidden="true"
                    data-run={cycling}
                    className="built-progress pointer-events-none absolute inset-x-5 bottom-0 h-[2px] origin-left bg-signal"
                    style={{ ["--step" as string]: `${STEP_MS}ms` }}
                  />
                ) : null}
              </SmartLink>
            </li>
          );
        })}
      </ol>

      <ul className="grid grid-cols-3 gap-px overflow-hidden rounded-[28px] bg-ink/[0.07] lg:grid-cols-5">
        {organizers.map((organizer, index) => {
          const on = partners.has(organizer.name);
          return (
            <li
              key={organizer.id}
              data-on={on}
              className="built-cell relative flex h-20 items-center justify-center bg-fog px-4 text-graphite-ink md:h-28 md:px-6"
              style={{ ["--i" as string]: index % 5 }}
            >
              {organizer.logo ? (
                // biome-ignore lint/performance/noImgElement: normalized brand marks; next/image adds nothing to inline SVGs
                <img
                  src={organizer.logo}
                  alt={organizer.name}
                  loading="lazy"
                  className="built-mark max-h-7 max-w-[88px] object-contain md:max-h-9 md:max-w-[112px]"
                />
              ) : (
                <span className="built-mark text-[14px] font-medium tracking-[-0.01em] whitespace-nowrap md:text-[17px]">
                  {organizer.name}
                </span>
              )}
              <span
                aria-hidden="true"
                className="built-dot absolute top-3 right-3 size-1.5 rounded-full bg-signal"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
