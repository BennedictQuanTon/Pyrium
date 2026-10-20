import type { ReactNode } from "react";
import { citationNumber, sources } from "@/content/sources";
import type { SourceId } from "@/content/types";

/**
 * The primary Pyrium logo, copied unchanged from PYRIUM_Brand_Identity_Kit/01-logos (640px
 * transparent PNG). Its red mark and dot are the only place red appears outside a CTA.
 */
export function Wordmark({ width = 180, className = "" }: { width?: number; className?: string }) {
  return (
    // biome-ignore lint/performance/noImgElement: fixed brand artwork; next/image adds nothing here
    <img
      src="/brand/pyrium-logo.png"
      alt="Pyrium"
      width={width}
      height={Math.round((width * 150) / 640)}
      className={`block h-auto ${className}`}
    />
  );
}

type PillProps = { href: string; children: ReactNode; variant?: "primary" | "ghost" };

/** 28px pill, the only rounded control in the system. Primary = the single red accent. */
export function PillButton({ href, children, variant = "primary" }: PillProps) {
  const tone =
    variant === "primary"
      ? "bg-signal text-signal-ink hover:bg-[#c42228]"
      : "bg-snow text-ink hover:bg-mist";
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-buttons px-6 py-3 text-[15px] font-medium tracking-[-0.01em] shadow-button transition-colors ${tone}`}
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

type HeadingProps = {
  label: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  size?: "lg" | "md";
  onDark?: boolean;
};

/** Section heading block: label pill, light display headline, Inter subtext. */
export function SectionHeading({
  label,
  title,
  body,
  align = "left",
  size = "lg",
  onDark = false,
}: HeadingProps) {
  const centered = align === "center";
  return (
    <div className={`flex flex-col gap-4 ${centered ? "items-center text-center" : "items-start"}`}>
      <Badge onDark={onDark}>{label}</Badge>
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
