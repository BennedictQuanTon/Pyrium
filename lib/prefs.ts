import { memoryStore, PREFS_KEY } from "@/lib/memory";

export { PREFS_KEY };

/**
 * Visitor preferences, kept on this device only: across visits with personalization consent,
 * for this visit otherwise (lib/memory). The pre-paint bootstrap in app/layout.tsx reads the
 * same key from either storage and sets html[data-motion] before first paint.
 */
export type MotionLevel = "full" | "subtle" | "off";

export type Prefs = {
  motion: MotionLevel;
  music: boolean;
  musicVolume: number;
  sfx: boolean;
};

export const defaultPrefs: Prefs = { motion: "full", music: true, musicVolume: 0.5, sfx: true };

export function readPrefs(): Prefs {
  try {
    // sessionStorage holds prefs only while the visit isn't remembered, so it wins when present.
    const raw = sessionStorage.getItem(PREFS_KEY) ?? localStorage.getItem(PREFS_KEY);
    const stored = JSON.parse(raw ?? "{}") as Partial<Prefs>;
    const prefs = { ...defaultPrefs, ...stored };
    // A visitor who asks the OS for reduced motion starts with motion off.
    if (!stored.motion && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      prefs.motion = "off";
    }
    return prefs;
  } catch {
    return defaultPrefs;
  }
}

export function writePrefs(prefs: Prefs) {
  try {
    memoryStore().setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    // Storage can be unavailable (private mode); preferences then last for the page only.
  }
  document.documentElement.dataset.motion = prefs.motion;
  window.dispatchEvent(new CustomEvent("pyrium:prefs", { detail: prefs }));
}

/** The current motion level, as applied to <html> (falls back to the OS setting). */
export function motionLevel(): MotionLevel {
  const level = document.documentElement.dataset.motion as MotionLevel | undefined;
  if (level) return level;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "off" : "full";
}
