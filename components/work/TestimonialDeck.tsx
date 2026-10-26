"use client";

import { useEffect, useState } from "react";
import { DraftTag } from "@/components/ui/Primitives";
import type { Quote } from "@/content/types";
import { motionLevel } from "@/lib/prefs";

/**
 * Two pilot quotes as a stacked deck: the front card reads in full, the second peeks from
 * behind, tilted. The deck turns every few seconds, or on a click of the card or a dot; the
 * back card slides forward while the front one tucks behind.
 */
export function TestimonialDeck({
  quotes,
  draftLabel,
  label,
}: {
  quotes: Quote[];
  draftLabel: string;
  label: string;
}) {
  const [front, setFront] = useState(0);
  const [paused, setPaused] = useState(false);

  // `front` is listed so a manual turn restarts the timer.
  // biome-ignore lint/correctness/useExhaustiveDependencies: front restarts the turn timer
  useEffect(() => {
    if (paused || motionLevel() === "off") return;
    const timer = window.setTimeout(() => setFront((value) => (value + 1) % quotes.length), 7000);
    return () => window.clearTimeout(timer);
  }, [front, paused, quotes.length]);

  return (
    <div
      className="flex flex-col gap-3"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <p className="eyebrow">{label}</p>
      <div className="deck relative pb-4">
        {quotes.map((quote, index) => {
          const isFront = index === front;
          return (
            <button
              key={quote.role}
              type="button"
              aria-hidden={!isFront}
              tabIndex={isFront ? 0 : -1}
              onClick={() => setFront((value) => (value + 1) % quotes.length)}
              data-front={isFront}
              className={`deck-card glass flex w-full flex-col gap-4 p-5 text-left md:p-6 ${isFront ? "relative" : "absolute inset-x-0 top-0"}`}
            >
              <p className="text-[15px] leading-[1.6] text-midnight">“{quote.quote}”</p>
              <span className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="flex size-8 items-center justify-center rounded-full bg-ink text-[12px] font-medium text-snow"
                  >
                    {(quote.name ?? quote.role).charAt(0)}
                  </span>
                  <span className="text-[12px] text-stone">
                    {quote.name ? `${quote.name} · ${quote.role}` : quote.role}
                  </span>
                </span>
                {quote.draft ? <DraftTag label={draftLabel} /> : null}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex gap-1.5" role="tablist" aria-label={label}>
        {quotes.map((quote, index) => (
          <button
            key={quote.role}
            type="button"
            role="tab"
            aria-selected={index === front}
            aria-label={quote.role}
            onClick={() => setFront(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${index === front ? "w-6 bg-ink" : "w-1.5 bg-ink/20"}`}
          />
        ))}
      </div>
    </div>
  );
}
