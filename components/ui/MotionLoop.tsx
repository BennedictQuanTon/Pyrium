"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Basename in public/motion/, e.g. "hero-a" or "project-ignis-light". */
  name: string;
  /** Text alternative describing what the loop shows. */
  label: string;
  aspect?: string;
  className?: string;
};

/**
 * A silent, looping Remotion render. Shows only the poster when the visitor prefers reduced
 * motion, and pauses while offscreen so several loops on a page don't all decode at once.
 */
export function MotionLoop({ name, label, aspect = "16 / 9", className = "" }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setStill(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element || still) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) element.play().catch(() => {});
        else element.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [still]);

  const poster = `/motion/${name}.jpg`;
  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: aspect }}>
      {still ? (
        // biome-ignore lint/performance/noImgElement: static poster of a rendered loop; next/image adds nothing here
        <img src={poster} alt={label} className="absolute inset-0 size-full object-cover" />
      ) : (
        <video
          ref={video}
          className="absolute inset-0 size-full object-cover"
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
        >
          <source src={`/motion/${name}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
