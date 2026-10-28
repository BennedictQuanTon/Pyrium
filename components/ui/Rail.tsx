"use client";

import { Children, type ReactNode, useRef, useState } from "react";

/**
 * A row of cards that becomes a swipe rail below md: one card and a peek of the next, snapping
 * into place, with a dot per card under it. From md up it is the grid given in `className`.
 */
export function Rail({
  children,
  className = "",
  as: Tag = "ul",
  onPointerEnter,
  onPointerLeave,
}: {
  children: ReactNode;
  /** Layout from md up, e.g. "md:grid md:grid-cols-3 md:gap-6". */
  className?: string;
  as?: "ul" | "ol";
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
}) {
  const ref = useRef<HTMLUListElement & HTMLOListElement>(null);
  const [index, setIndex] = useState(0);
  const count = Children.count(children);

  const onScroll = () => {
    const element = ref.current;
    const first = element?.firstElementChild as HTMLElement | null;
    if (!element || !first) return;
    const step = first.offsetWidth + 12;
    setIndex(Math.min(count - 1, Math.round(element.scrollLeft / step)));
  };

  return (
    <div className="flex flex-col gap-4">
      <Tag
        ref={ref}
        onScroll={onScroll}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        className={`rail ${className}`}
      >
        {children}
      </Tag>
      {count > 1 ? (
        <span aria-hidden="true" className="flex justify-center gap-1.5 md:hidden">
          {Array.from({ length: count }, (_, dot) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: dots mirror the fixed card order
              key={dot}
              className={`h-1.5 rounded-full transition-all duration-300 ${dot === index ? "w-5 bg-ink" : "w-1.5 bg-ink/20"}`}
            />
          ))}
        </span>
      ) : null}
    </div>
  );
}
