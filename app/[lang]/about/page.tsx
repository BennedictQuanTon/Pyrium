import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Founders, Vision } from "@/components/home/Sections";
import { CountUp } from "@/components/motion/CountUp";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { PillButton, SectionHeading } from "@/components/ui/Primitives";
import { getCopy } from "@/content/copy";
import { isLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getCopy(lang).about;
  return { title: t.eyebrow, description: t.body };
}

/**
 * About: the brand line and reach, the founders, the four principles, the vision and the
 * twelve-month path from proof to repeatability, each phase with its gate.
 */
export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const copy = getCopy(lang);
  const t = copy.about;
  const reach = copy.productsSection.stats[0];

  return (
    <PageTransition>
      <PageHeader eyebrow={t.eyebrow} title={t.title} body={t.body} />

      {/* Brand line, large */}
      <section className="bg-fog py-20 md:py-28">
        <div className="page-width grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal>
            <p className="max-w-[18ch] font-display text-[40px] leading-[1.1] tracking-[-0.8px] text-ink md:text-[64px] md:tracking-[-1.4px]">
              {t.line[0]} <span className="text-signal">{t.line[1]}</span>
            </p>
          </Reveal>
          <Reveal pop delay={1} className="flex flex-col gap-1 md:text-right">
            <span className="font-display text-[64px] leading-none tracking-[-0.04em] text-ink">
              <CountUp text={reach.value} className="tabular" />
            </span>
            <span className="text-[14px] text-stone">{reach.label}</span>
          </Reveal>
        </div>
      </section>

      {/* Founders */}
      <section className="section bg-snow">
        <div className="page-width flex flex-col gap-12">
          <Reveal>
            <SectionHeading eyebrow={copy.team.eyebrow} title={copy.team.title} />
          </Reveal>
          <Founders lang={lang} />
        </div>
      </section>

      {/* Principles */}
      <section className="section bg-blueprint">
        <div className="page-width flex flex-col gap-12">
          <Reveal>
            <SectionHeading eyebrow={t.principlesEyebrow} title={t.principlesTitle} />
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.principles.map((principle, index) => (
              <li key={principle.title}>
                <Reveal pop delay={index} className="glass flex h-full flex-col gap-4 p-7">
                  <span className="tabular text-[13px] text-signal">0{index + 1}</span>
                  <h3 className="font-sans text-[17px] font-medium">{principle.title}</h3>
                  <p className="text-[15px] text-stone">{principle.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Vision and roadmap */}
      <section className="section bg-fog">
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
                      className={`absolute top-7 left-0 size-[15px] rounded-full border-2 ${index === 0 ? "border-signal bg-signal" : "border-ink/20 bg-fog"}`}
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
