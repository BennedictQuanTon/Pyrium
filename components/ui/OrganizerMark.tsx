import type { Organizer } from "@/content/types";

const SIZES = {
  sm: {
    square: "h-8",
    mid: "h-6",
    wide: "h-[18px]",
    max: "max-w-full",
    text: "text-[13px]",
  },
  md: {
    square: "h-9 md:h-11",
    mid: "h-7 md:h-9",
    wide: "h-5 md:h-7",
    max: "max-w-[84px] md:max-w-[116px]",
    text: "text-[14px] md:text-[17px]",
  },
};

function shape(viewBox: string | undefined) {
  const [, , width, height] = (viewBox ?? "").split(/\s+/).map(Number);
  const ratio = width && height ? width / height : 3;
  if (ratio < 1.3) return "square";
  if (ratio < 3.2) return "mid";
  return "wide";
}

/**
 * One organizer's mark, sized by its proportions so square icons and long wordmarks read at the
 * same optical weight; brands without a normalized file render as a plain wordmark.
 */
export function OrganizerMark({
  organizer,
  size = "md",
  className = "",
}: {
  organizer: Organizer;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const sizes = SIZES[size];
  if (!organizer.logo) {
    return (
      <span
        className={`font-medium tracking-[-0.01em] whitespace-nowrap ${sizes.text} ${className}`}
      >
        {organizer.name}
      </span>
    );
  }
  return (
    // biome-ignore lint/performance/noImgElement: normalized brand marks; next/image adds nothing to inline SVGs
    <img
      src={organizer.logo}
      alt={organizer.name}
      loading="lazy"
      className={`w-auto object-contain ${sizes[shape(organizer.viewBox)]} ${sizes.max} ${className}`}
    />
  );
}
