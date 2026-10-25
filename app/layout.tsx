import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Intro } from "@/components/motion/Intro";
import { PointerLight } from "@/components/motion/PointerLight";
import { Footer } from "@/components/ui/Footer";
import { Nav } from "@/components/ui/Nav";
import "./globals.css";

/*
 * Typography follows the brand kit (PYRIUM_Brand_Identity_Kit/04-brand-guidelines): a clean
 * technical sans for body and a display cut for headings. docs/Landing_DESIGN.md defines the
 * heading voice as "PP Radio Grotesk Light" — weight 400 in a geometric grotesque — with DM
 * Sans as its sanctioned substitute, so headings are DM Sans at weight 400 and body copy is
 * Inter. Both are SIL OFL, bundled at build time by next/font. No monospace face: JetBrains
 * Mono is banned by the brief.
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
  // all unicode-ranges are served, and any glyph it lacks falls back to Inter, which covers
  // Vietnamese fully.
  preload: false,
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pyrium — Private AI, engineered for the real business.",
    template: "%s · Pyrium",
  },
  description:
    "We engineer private, efficient AI systems that automate real workflows, optimize inference, and adapt to how your business operates.",
};

/**
 * Runs before first paint. Marks that JS is available (scroll reveals may hide pre-reveal
 * content only when this class is present) and records whether the intro should play: first
 * visit in a session only, never with reduced motion or when storage is unavailable.
 */
const bootstrap = `(function(){var r=document.documentElement;try{r.classList.add("js");if(sessionStorage.getItem("pyrium-welcomed")||matchMedia("(prefers-reduced-motion: reduce)").matches){r.classList.add("welcome-skip")}else{sessionStorage.setItem("pyrium-welcomed","1")}}catch(e){r.classList.add("welcome-skip")}})();`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable}`}
      // The inline bootstrap below adds html classes (js / welcome-skip) before hydration on
      // purpose — the standard next-themes pattern. Only the <html> attributes may differ.
      suppressHydrationWarning
    >
      <body>
        {/* Static, hand-written bootstrap: no user content, so the escape hatch is safe here. */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: pre-paint bootstrap constant, required before hydration */}
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-buttons focus:bg-snow focus:px-6 focus:py-3 focus:shadow-subtle"
        >
          Skip to content
        </a>
        <Intro />
        <PointerLight />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
