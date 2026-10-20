import { loadVariableFont } from "@remotion/google-fonts/Inter";
import { Easing } from "remotion";

// Same face as the site, per the brand kit: Inter Display / Inter. The variable font carries the
// optical-size axis, so large text renders with the Display cut. No monospace face.
const inter = loadVariableFont("normal", { subsets: ["latin"] }).fontFamily;
export const display = inter;
export const sans = inter;

/**
 * Motion stays monochrome. Signal Red is a CTA-only colour on the page (Landing_DESIGN.md), so it
 * never appears in a loop; the loops use the doc's neutrals only.
 */
export const palettes = {
  light: {
    canvas: "#ffffff",
    surface: "#f7f7f7",
    ink: "#111111",
    muted: "#636363",
    faint: "#b2b2b2",
    line: "#f3f3f3",
  },
  dark: {
    canvas: "#242433",
    surface: "#2c2c3c",
    ink: "#ffffff",
    muted: "#b2b2b2",
    faint: "#636363",
    line: "#3a3a4a",
  },
} as const;

export type Theme = keyof typeof palettes;
export type Palette = (typeof palettes)[Theme];

export const FPS = 30;
export const HERO_SECONDS = 10;
export const PROJECT_SECONDS = 8;

export const smooth = Easing.bezier(0.45, 0, 0.2, 1);
export const settle = Easing.bezier(0.16, 1, 0.3, 1);
export const exit = Easing.bezier(0.7, 0, 0.84, 0);

export const frames = (seconds: number) => Math.round(seconds * FPS);
