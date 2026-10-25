import type { ProductSlug } from "@/content/types";

type Props = {
  slug: ProductSlug;
  size?: "sm" | "md" | "lg";
  /** "light" renders the variant for dark surfaces. */
  tone?: "dark" | "light";
  className?: string;
};

const TEXT = { sm: "text-[19px]", md: "text-[24px]", lg: "text-[34px]" };
const MARK = { sm: "size-7", md: "size-8", lg: "size-11" };
const IGNIS = { sm: "h-[18px]", md: "h-[22px]", lg: "h-[32px]" };

/**
 * Each product's own lockup, taken from its repository: the Weatherise mark (favicon.svg) with
 * its sans wordmark, The Lantern's lantern glyph with its Libre Baskerville name, the IGNIS
 * wordmark with its yellow flame, and Unfound's open-arch pin with its lowercase name.
 */
export function ProductLogo({ slug, size = "md", tone = "dark", className = "" }: Props) {
  const ink = tone === "light" ? "text-snow" : "text-[#111111]";
  if (slug === "ignis") {
    return (
      // biome-ignore lint/performance/noImgElement: the product's own SVG wordmark
      <img
        src={
          tone === "light"
            ? "/work/logos/ignis-wordmark-reverse.svg"
            : "/work/logos/ignis-wordmark.svg"
        }
        alt="IGNIS"
        className={`block w-auto ${IGNIS[size]} ${className}`}
      />
    );
  }
  if (slug === "weatherise") {
    return (
      <span className={`inline-flex items-center gap-2.5 ${ink} ${className}`}>
        {/* biome-ignore lint/performance/noImgElement: the product's own SVG mark */}
        <img
          src="/work/logos/weatherise-mark.svg"
          alt=""
          className={`${MARK[size]} rounded-[22%] shadow-subtle`}
        />
        <span
          className={`font-semibold tracking-[-0.015em] ${TEXT[size]}`}
          style={{ fontFamily: "var(--font-geist)" }}
        >
          Weatherise
        </span>
      </span>
    );
  }
  if (slug === "lantern") {
    return (
      <span className={`inline-flex items-center gap-2.5 ${ink} ${className}`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={MARK[size]}
        >
          <path d="M9 3h6M12 3v3M6 9h12l-2 9H8L6 9zM9 18v3h6v-3M10 9v9M14 9v9" />
        </svg>
        <span
          className={`font-bold tracking-[-0.01em] ${TEXT[size]}`}
          style={{ fontFamily: "var(--font-baskerville)" }}
        >
          The Lantern
        </span>
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-2 ${ink} ${className}`}>
      <svg viewBox="0 0 64 64" aria-hidden="true" className={MARK[size]}>
        <path d="M16 60V28a16 16 0 0 1 32 0v32" fill="none" stroke="currentColor" strokeWidth="9" />
        <circle cx="32" cy="28" r="5.5" fill="currentColor" />
      </svg>
      <span
        className={`font-semibold tracking-[-0.03em] ${TEXT[size]}`}
        style={{ fontFamily: "var(--font-geist)" }}
      >
        unfound
      </span>
    </span>
  );
}
