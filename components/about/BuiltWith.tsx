"use client";

import { useEffect, useRef, useState } from "react";
import { OrganizerMark } from "@/components/ui/OrganizerMark";
import { SmartLink } from "@/components/ui/SmartLink";
import { ProductLogo } from "@/components/work/ProductLogo";
import type { Organizer, ProductSlug } from "@/content/types";
import { motionLevel } from "@/lib/prefs";

type Row = { slug: ProductSlug; partners: string[] };

const STEP_MS = 3600;

/**
 * Products and the organizers they were built with, woven into one block: a row of product
 * lockups over the organizer grid, on the same five columns. The active product opens like a
 * tab and lights up its own partners while the rest recede. It steps through the products on
 * its own while in view; hovering or focusing a product takes over, and leaving hands it back.
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
      className="flex flex-col gap-px overflow-hidden rounded-[28px] bg-ink/[0.07] ring-1 ring-ink/[0.07]"
    >
      <ol
        className="grid grid-cols-2 gap-px sm:grid-cols-5"
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
              className="odd:last:col-span-2 sm:odd:last:col-span-1"
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
                className={`relative flex h-24 items-center justify-center px-4 transition-colors duration-500 md:h-32 ${on ? "bg-snow" : "bg-fog hover:bg-snow/70"}`}
              >
                <span
                  aria-hidden="true"
                  className={`tabular absolute top-3 left-4 text-[11px] transition-colors duration-500 md:top-4 md:left-5 ${on ? "text-signal" : "text-stone/70"}`}
                >
                  0{index + 1}
                </span>
                <span
                  className={`transition-[opacity,transform] duration-500 ${on ? "scale-100 opacity-100" : "scale-[0.96] opacity-55"}`}
                >
                  <ProductLogo slug={row.slug} size="sm" />
                </span>
                <span className="sr-only">
                  {withLabel} {row.partners.join(", ")}
                </span>
                {on ? (
                  <span
                    key={`${active}-${cycling}`}
                    aria-hidden="true"
                    data-run={cycling}
                    className="built-progress pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-signal"
                    style={{ ["--step" as string]: `${STEP_MS}ms` }}
                  />
                ) : null}
              </SmartLink>
            </li>
          );
        })}
      </ol>

      <ul className="grid grid-cols-3 gap-px sm:grid-cols-5">
        {organizers.map((organizer, index) => {
          const on = partners.has(organizer.name);
          return (
            <li
              key={organizer.id}
              data-on={on}
              className="built-cell relative flex h-20 items-center justify-center bg-fog px-4 text-graphite-ink md:h-28 md:px-6"
              style={{ ["--i" as string]: index % 5 }}
            >
              <OrganizerMark organizer={organizer} className="built-mark" />
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
