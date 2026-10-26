import { DM_Sans, Geist, Inter, Libre_Baskerville } from "next/font/google";
import type { ReactNode } from "react";
import { PointerLight } from "@/components/motion/PointerLight";
import { SoundLayer } from "@/components/sound/SoundLayer";
import "./globals.css";

/*
 * Typography follows the brand kit: Inter for body and DM Sans at weight 400 for headings, the
 * sanctioned substitute for Landing_DESIGN.md's light display voice. Both cover Vietnamese.
 * Geist and Libre Baskerville are used only for the Weatherise / Unfound and The Lantern
 * wordmarks, matching those products' own branding. No monospace face: JetBrains Mono is
 * banned by the brief.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  axes: ["opsz"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  // The vendored subset metadata for DM Sans predates its Vietnamese release; without preload
  // all unicode-ranges are served, and any glyph it lacks falls back to Inter.
  preload: false,
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["600"],
  preload: false,
});

const baskerville = Libre_Baskerville({
  variable: "--font-baskerville",
  subsets: ["latin"],
  weight: ["700"],
  preload: false,
});

/**
 * Runs before first paint. Sets <html lang> from the URL, marks that JS is available (scroll reveals may hide pre-reveal
 * content only when this class is present), applies the visitor's motion preference, and
 * records whether the intro should play: first visit in a session, with full motion only.
 */
const bootstrap = `(function(){var r=document.documentElement;try{r.classList.add("js");r.lang=location.pathname==="/vi"||location.pathname.indexOf("/vi/")===0?"vi":"en";var p={};try{p=JSON.parse(localStorage.getItem("pyrium-prefs")||"{}")}catch(e){}var m=p.motion||(matchMedia("(prefers-reduced-motion: reduce)").matches?"off":"full");r.dataset.motion=m;if(m!=="full"||sessionStorage.getItem("pyrium-welcomed")){r.classList.add("welcome-skip")}else{sessionStorage.setItem("pyrium-welcomed","1")}}catch(e){r.classList.add("welcome-skip")}})();`;

/**
 * The one root layout for both languages. It owns <html>, the fonts and the sound layer, so the
 * ambient music keeps playing through every navigation — including a switch of language, which
 * only swaps the nested [lang] layout beneath it.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} ${geist.variable} ${baskerville.variable}`}
      // The inline bootstrap sets lang, classes and data-motion before hydration on purpose —
      // the standard next-themes pattern. Only the <html> attributes may differ.
      suppressHydrationWarning
    >
      <body>
        {/* Static, hand-written bootstrap: no user content, so the escape hatch is safe here. */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: pre-paint bootstrap constant, required before hydration */}
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
        <PointerLight />
        <SoundLayer />
        {children}
      </body>
    </html>
  );
}
