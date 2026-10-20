import { interpolate, useCurrentFrame } from "remotion";
import { exit, FPS, settle } from "./theme";

// Adapted from the Ignis film (video/ignis-film/src/motion/time.ts).

/** Composition time in seconds. */
export function useSeconds(): number {
  return useCurrentFrame() / FPS;
}

/** 0→1 eased ramp between two times. */
export function ramp(seconds: number, from: number, to: number, easing = settle): number {
  return interpolate(seconds, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
}

/** Opacity/blur/offset for an element that enters at `at` and leaves at `out`. */
export function presence(
  seconds: number,
  at: number,
  out = Number.POSITIVE_INFINITY,
  enter = 0.55,
) {
  const shown = ramp(seconds, at, at + enter);
  const gone = Number.isFinite(out) ? ramp(seconds, out, out + 0.45, exit) : 0;
  return {
    opacity: shown * (1 - gone),
    blur: (1 - shown) * 10 + gone * 12,
    shift: (1 - shown) * 22 - gone * 12,
  };
}

/** Deterministic PRNG so every render of a loop is identical. */
export function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}
