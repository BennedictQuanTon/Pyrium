"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/content/types";
import { motionLevel } from "@/lib/prefs";

type Props = {
  product: Product;
  /** When false the video pauses (e.g. an inactive showcase layer). Defaults to visible-only play. */
  active?: boolean;
  className?: string;
};

/**
 * A product's own film, silent and looping, letterboxed on the product's background colour.
 * Plays only while it is on screen (and, in the showcase, only while it is the active layer);
 * reduced-motion visitors get the poster.
 */
export function ProductVideo({ product, active = true, className = "" }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setStill(motionLevel() === "off");
    update();
    window.addEventListener("pyrium:prefs", update);
    return () => window.removeEventListener("pyrium:prefs", update);
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element || still) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [still]);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (active && visible) element.play().catch(() => {});
    else element.pause();
  }, [active, visible]);

  const { video: media, name } = product;
  return (
    <div
      className={`relative aspect-video w-full overflow-hidden ${className}`}
      style={{ background: media.background }}
    >
      {still ? (
        // biome-ignore lint/performance/noImgElement: static poster of the product film; next/image adds nothing here
        <img
          src={media.poster}
          alt={`${name}: product film poster`}
          className="absolute inset-0 size-full object-contain"
        />
      ) : (
        <video
          ref={video}
          className="absolute inset-0 size-full object-contain"
          poster={media.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${name}: product film`}
        >
          <source src={media.webm} type="video/webm" />
          <source src={media.mp4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
