import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Intro } from "@/components/motion/Intro";
import { ConsentBanner } from "@/components/privacy/ConsentBanner";
import { VisitMemory } from "@/components/privacy/VisitMemory";
import { Footer } from "@/components/ui/Footer";
import { Nav } from "@/components/ui/Nav";
import { getCopy } from "@/content/copy";
import { isLang, langs } from "@/lib/i18n";

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

/** Per-language chrome: intro, nav, page and footer. The root layout owns <html> and sound. */
export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const copy = getCopy(lang);
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-buttons focus:bg-snow focus:px-6 focus:py-3 focus:shadow-subtle"
      >
        {lang === "vi" ? "Bỏ qua đến nội dung" : "Skip to content"}
      </a>
      <Intro tagline={copy.intro.tagline} meter={copy.intro.meter} />
      <Nav />
      {children}
      <Footer lang={lang} />
      <ConsentBanner />
      <VisitMemory />
    </>
  );
}
