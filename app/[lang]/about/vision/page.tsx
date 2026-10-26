import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Vision } from "@/components/home/Sections";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { PillButton, SectionHeading } from "@/components/ui/Primitives";
import { SubNav } from "@/components/ui/SubNav";
import { getCopy } from "@/content/copy";
import { isLang } from "@/lib/i18n";
import { getMenus } from "@/lib/menus";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getCopy(lang).about.pages.vision;
  return { title: t.eyebrow, description: t.body };
}

/** Vision: the statement and its three horizons, the twelve-month roadmap with a gate per phase, and the call to start. */
export default async function VisionPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const copy = getCopy(lang);
  const t = copy.about;
  const page = t.pages.vision;

  return (
    <PageTransition>
      <PageHeader eyebrow={page.eyebrow} title={page.title} body={page.body}>
        <SubNav items={getMenus(lang)["/about"]} current="/about/vision" />
      </PageHeader>

      {/* Vision and roadmap */}
      <section className="section bg-snow">
        <div className="page-width flex flex-col gap-14">
          <Vision lang={lang} />
          <div className="flex flex-col gap-8">
            <Reveal>
              <SectionHeading
                eyebrow={t.roadmapEyebrow}
                title={t.roadmapTitle}
                body={t.roadmapBody}
                size="md"
              />
            </Reveal>
            <ol className="relative flex flex-col">
              <span
                aria-hidden="true"
                className="absolute top-2 bottom-2 left-[7px] w-px bg-ink/10"
              />
              {t.roadmap.map((phase, index) => (
                <li key={phase.phase}>
                  <Reveal
                    delay={index}
                    className="relative grid gap-2 py-5 pl-10 md:grid-cols-[12rem_1fr_1.4fr] md:gap-8"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute top-7 left-0 size-[15px] rounded-full border-2 ${index === 0 ? "border-signal bg-signal" : "border-ink/20 bg-snow"}`}
                    />
                    <span className="tabular text-[13px] text-stone">{phase.time}</span>
                    <span className="text-[17px] font-medium text-ink">{phase.phase}</span>
                    <span className="text-[14px] text-graphite-ink">
                      <span className="text-stone">{t.gate} · </span>
                      {phase.gate}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="signal-frame relative overflow-hidden">
        <div className="page-width relative flex flex-col items-center gap-5 py-28 text-center md:py-36">
          <Reveal>
            <h2 className="max-w-[18ch] text-heading-md md:text-heading-lg">
              {copy.closing.title}
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <PillButton href="/contact">{copy.hero.primaryCta}</PillButton>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
