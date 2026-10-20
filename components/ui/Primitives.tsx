import type { ReactNode } from "react";
import { citationNumber, sources } from "@/content/sources";
import type { SourceId } from "@/content/types";

type WordmarkProps = { width?: number; className?: string; variant?: "primary" | "reverse" };

/**
 * The Pyrium lockup from the corrected no-tagline logo kit — tagline band removed, complete
 * P emblem, full wordmark, red dot over the i. The primary (black + red) variant sits on
 * light surfaces like the nav pill; the reverse (white + red) is the sanctioned treatment
 * for dark and colored surfaces like the hero arc.
 */
export function Wordmark({ width = 180, className = "", variant = "primary" }: WordmarkProps) {
  return (
    // biome-ignore lint/performance/noImgElement: fixed brand artwork; next/image adds nothing here
    <img
      src={
        variant === "reverse"
          ? "/brand/pyrium-lockup-reverse.svg"
          : "/brand/pyrium-lockup-primary.svg"
      }
      alt="Pyrium"
      width={width}
      height={Math.round((width * 404) / 1611)}
      className={`block h-auto ${className}`}
    />
  );
}

type PillProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

/** 28px pill, the only rounded control in the system. Primary = the single red accent. */
export function PillButton({ href, children, variant = "primary", className = "" }: PillProps) {
  const tone =
    variant === "primary"
      ? "bg-signal text-signal-ink hover:bg-[#c42228]"
      : "bg-snow text-ink hover:bg-mist";
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-buttons px-6 py-3 text-[15px] font-medium tracking-[-0.01em] shadow-button transition-colors ${tone} ${className}`}
    >
      {children}
    </a>
  );
}

/** Neutral pill label (Landing_DESIGN.md "Feature Badge"): no colour, organizes without chroma. */
export function Badge({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-badges px-3 py-1 text-[12px] font-medium ${onDark ? "bg-white/10 text-silver" : "bg-snow text-graphite-ink"}`}
    >
      {children}
    </span>
  );
}

/**
 * Star rating pill from the reference hero: five signal-red stars and a short line, in one
 * white pill floating on the gradient. The star row is decorative; the text carries meaning.
 */
export function RatingPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-badges bg-snow px-4 py-1.5 text-[12px] font-medium text-graphite-ink shadow-button">
      <span aria-hidden="true" className="text-signal tracking-[0.08em]">
        ★★★★★
      </span>
      {children}
    </span>
  );
}

type HeadingProps = {
  title: string;
  body?: string;
  align?: "left" | "center";
  size?: "lg" | "md";
  onDark?: boolean;
};

/** Section heading block: light display headline over Inter subtext, no label chrome. */
export function SectionHeading({
  title,
  body,
  align = "left",
  size = "lg",
  onDark = false,
}: HeadingProps) {
  const centered = align === "center";
  return (
    <div className={`flex flex-col gap-4 ${centered ? "items-center text-center" : "items-start"}`}>
      <h2
        className={`max-w-[22ch] ${size === "lg" ? "text-heading md:text-heading-lg" : "text-heading-sm md:text-heading"} ${onDark ? "text-snow" : ""}`}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={`max-w-[60ch] text-body md:text-subheading ${onDark ? "text-silver" : "text-stone"}`}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

/** Numbered citation that jumps to the source list in the footer. */
export function Citation({ id, onDark = false }: { id: SourceId; onDark?: boolean }) {
  const number = citationNumber(id);
  return (
    <a
      href={`#source-${number}`}
      className={`ml-0.5 align-super text-[11px] underline underline-offset-2 ${onDark ? "text-silver" : "text-stone"}`}
      aria-label={`Source ${number}: ${sources[id].publisher}, ${sources[id].title}`}
    >
      [{number}]
    </a>
  );
}

/** White card with decorative browser chrome (Landing_DESIGN.md "Browser Mockup Frame"). */
export function BrowserFrame({ children, fade = false }: { children: ReactNode; fade?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-cards bg-snow p-3 shadow-subtle">
      <div className="flex gap-2 px-2 pb-3 pt-1" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-[#c97b84]" />
        <span className="size-2.5 rounded-full bg-silver" />
        <span className="size-2.5 rounded-full bg-ash" />
      </div>
      <div className="overflow-hidden rounded-card-inner bg-fog">{children}</div>
      {fade ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-fog to-transparent" />
      ) : null}
    </div>
  );
}
