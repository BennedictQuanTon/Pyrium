import type { Metadata } from "next";
import { DM_Sans, Geist, Inter, Libre_Baskerville } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Intro } from "@/components/motion/Intro";
import { PointerLight } from "@/components/motion/PointerLight";
import { SoundLayer } from "@/components/sound/SoundLayer";
import { Footer } from "@/components/ui/Footer";
import { Nav } from "@/components/ui/Nav";
import { getCopy } from "@/content/copy";
import { isLang, langs } from "@/lib/i18n";
import "../globals.css";

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

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

type Props = { children: ReactNode; params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const { meta } = getCopy(lang);
  return {
    title: { default: meta.title, template: "%s · Pyrium" },
    description: meta.description,
    alternates: { languages: { en: "/", vi: "/vi" } },
  };
}

/**
 * Runs before first paint. Marks that JS is available (scroll reveals may hide pre-reveal
 * content only when this class is present), applies the visitor's motion preference, and
 * records whether the intro should play: first visit in a session, with full motion only.
 */
const bootstrap = `(function(){var r=document.documentElement;try{r.classList.add("js");var p={};try{p=JSON.parse(localStorage.getItem("pyrium-prefs")||"{}")}catch(e){}var m=p.motion||(matchMedia("(prefers-reduced-motion: reduce)").matches?"off":"full");r.dataset.motion=m;if(m!=="full"||sessionStorage.getItem("pyrium-welcomed")){r.classList.add("welcome-skip")}else{sessionStorage.setItem("pyrium-welcomed","1")}}catch(e){r.classList.add("welcome-skip")}})();`;

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const copy = getCopy(lang);
  return (
    <html
      lang={lang}
      className={`${inter.variable} ${dmSans.variable} ${geist.variable} ${baskerville.variable}`}
      // The inline bootstrap adds html classes and data-motion before hydration on purpose —
      // the standard next-themes pattern. Only the <html> attributes may differ.
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
          {lang === "vi" ? "Bỏ qua đến nội dung" : "Skip to content"}
        </a>
        <Intro tagline={copy.intro.tagline} meter={copy.intro.meter} />
        <PointerLight />
        <SoundLayer />
        <Nav />
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  );
}
