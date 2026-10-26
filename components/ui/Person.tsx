/**
 * Who a quote comes from: a Notionists illustration (never a photo) and "Anonymous" over the
 * role, so no quote is pinned to a named person.
 */
export function Person({
  avatar,
  role,
  anonymous,
  size = "md",
}: {
  /** Key of the illustration in public/people, e.g. "lantern-0". */
  avatar: string;
  role: string;
  anonymous: string;
  size?: "sm" | "md";
}) {
  return (
    <span className="flex min-w-0 items-center gap-3">
      {/* biome-ignore lint/performance/noImgElement: tiny local SVG illustration */}
      <img
        src={`/people/${avatar}.svg`}
        alt=""
        loading="lazy"
        className={`shrink-0 rounded-full bg-fog ring-1 ring-ink/[0.06] ${size === "sm" ? "size-9" : "size-11"}`}
      />
      <span className="flex min-w-0 flex-col">
        <span className="text-[13px] font-medium text-ink">{anonymous}</span>
        <span className="text-[12px] leading-[1.4] text-stone">{role}</span>
      </span>
    </span>
  );
}
