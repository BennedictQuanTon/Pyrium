import Link from "next/link";
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

type Direction = "forward" | "back";

type SmartLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Page-transition direction for internal routes; external links open in a new tab. */
  direction?: Direction;
  "aria-label"?: string;
};

/**
 * One link for the whole site: internal routes go through next/link with a transition type
 * (so <PageTransition> knows which way to move), in-page anchors stay plain, and external
 * links open in a new tab.
 */
export function SmartLink({
  href,
  children,
  className = "",
  direction = "forward",
  ...rest
}: SmartLinkProps) {
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className} {...rest}>
        {children}
      </a>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      transitionTypes={[direction === "back" ? "nav-back" : "nav-forward"]}
      className={className}
      {...rest}
    >
      {children}
    </Link>
  );
}

type PillProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "glass";
  className?: string;
  direction?: Direction;
};

/** 28px pill, the only rounded control in the system. Primary = the single red accent. */
export function PillButton({
  href,
  children,
  variant = "primary",
  className = "",
  direction,
}: PillProps) {
  const tone = {
    primary: "bg-signal text-signal-ink shadow-button hover:bg-[#c42228]",
    ghost: "bg-snow text-ink shadow-button hover:bg-mist",
    glass: "glass text-ink hover:bg-white/80",
  }[variant];
  return (
    <SmartLink
      href={href}
      direction={direction}
      className={`group inline-flex items-center justify-center gap-2 rounded-buttons px-6 py-3 text-[15px] font-medium tracking-[-0.01em] transition-colors ${tone} ${className}`}
    >
      {children}
      {href.startsWith("http") ? (
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          ↗
        </span>
      ) : null}
    </SmartLink>
  );
}

/** Neutral pill label: no colour, organizes without chroma. */
export function Badge({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-badges px-3 py-1 text-[12px] font-medium ${onDark ? "bg-white/10 text-silver" : "bg-snow text-graphite-ink shadow-subtle"}`}
    >
      {children}
    </span>
  );
}

/** Marks draft copy (quotes awaiting approval) so it is never mistaken for a signed-off one. */
export function DraftTag({ onDark = false }: { onDark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.08em] uppercase ${onDark ? "text-silver" : "text-stone"}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full border border-current" />
      Draft
    </span>
  );
}

type HeadingProps = {
  title: string;
  eyebrow?: string;
  body?: string;
  align?: "left" | "center";
  size?: "lg" | "md";
  onDark?: boolean;
  as?: "h1" | "h2";
};

/** Section heading block: eyebrow, light display headline, Inter subtext. */
export function SectionHeading({
  title,
  eyebrow,
  body,
  align = "left",
  size = "lg",
  onDark = false,
  as: Tag = "h2",
}: HeadingProps) {
  const centered = align === "center";
  return (
    <div className={`flex flex-col gap-4 ${centered ? "items-center text-center" : "items-start"}`}>
      {eyebrow ? (
        <p className={`eyebrow flex items-center gap-2 ${onDark ? "text-silver" : ""}`}>
          <span aria-hidden="true" className="h-px w-6 bg-signal" />
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={`max-w-[22ch] ${size === "lg" ? "text-heading md:text-heading-lg" : "text-heading-sm md:text-heading"} ${onDark ? "text-snow" : ""}`}
      >
        {title}
      </Tag>
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
