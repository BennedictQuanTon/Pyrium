import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Founders, Vision } from "@/components/home/Sections";
import { CountUp } from "@/components/motion/CountUp";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { PillButton, SectionHeading, SmartLink } from "@/components/ui/Primitives";
import { getCopy } from "@/content/copy";
import { organizers } from "@/content/people";
import { getProduct } from "@/content/products";
import { isLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getCopy(lang).about;
  return { title: t.eyebrow, description: t.body };
}

/**
 * About: who we are, the numbers we can point to, our five-part core in depth (each commitment
 * tied to the product that proves it), the organizers and institutions behind the work, the
 * founders, and the vision with its twelve-month path, each phase behind a gate.
 */
export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const copy = getCopy(lang);
  const t = copy.about;
  const pillars = copy.core.pillars;

  return (
    <PageTransition>
      <PageHeader eyebrow={t.eyebrow} title={t.title} body={t.body} />

      {/* Numbers */}
      <section className="bg-fog py-20 md:py-28">
        <div className="page-width flex flex-col gap-10">
          <Reveal>
            <SectionHeading eyebrow={t.numbersEyebrow} title={t.numbersTitle} size="md" />
          </Reveal>
          <Reveal pop>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-ink/[0.07] md:grid-cols-4">
              {t.numbers.map((item, index) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-3 bg-snow p-6 md:min-h-[188px] md:p-8"
                >
                  <dt className="sr-only">{item.label}</dt>
                  <dd
                    className={`font-display text-[40px] leading-none tracking-[-0.045em] whitespace-nowrap md:text-[52px] ${index === 0 ? "text-signal" : "text-ink"}`}
                  >
                    <CountUp text={item.value} className="tabular" />
                  </dd>
                  <dd className="mt-auto max-w-[24ch] text-[13px] leading-[1.5] text-graphite-ink md:text-[14px]">
                    {item.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <p className="text-[12px] text-stone">{t.numbersNote}</p>
        </div>
      </section>

      {/* Core, in depth */}
      <section className="core-section relative overflow-hidden py-24 text-snow md:py-32">
        <div aria-hidden="true" className="core-field absolute inset-0" />
        <div className="page-width relative flex flex-col gap-14">
          <Reveal className="flex flex-col gap-5">
            <p className="eyebrow flex items-center gap-2 text-silver">
              <span aria-hidden="true" className="h-px w-6 bg-signal" />
              {t.depthEyebrow}
            </p>
            <h2 className="max-w-[22ch] text-[36px] leading-[1.08] tracking-[-1px] text-snow md:text-[56px] md:tracking-[-1.6px]">
              {t.depthTitle}
            </h2>
          </Reveal>
          <ol className="flex flex-col">
            {t.depth.map((item, index) => {
              const pillar = pillars.find((entry) => entry.key === item.key);
              const proof = getProduct(lang, item.proof);
              if (!pillar || !proof) return null;
              return (
                <li key={item.key} className="border-t border-white/10 last:border-b">
                  <Reveal className="grid gap-6 py-10 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-14 md:py-14">
                    <div className="flex flex-col gap-4">
                      <span className="tabular text-[13px] text-signal">0{index + 1}</span>
                      <h3 className="text-[30px] leading-[1.1] tracking-[-0.6px] text-snow md:text-[40px]">
                        {pillar.name}
                      </h3>
                      <p className="max-w-[30ch] text-[16px] leading-[1.5] text-mist">
                        {pillar.promise}
                      </p>
                    </div>
                    <div className="flex flex-col gap-7">
                      <p className="text-[17px] leading-[1.7] text-silver md:text-[18px]">
                        {item.body}
                      </p>
                      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-3">
                        {pillar.capabilities.map((capability) => (
                          <li
                            key={capability}
                            className="flex gap-2.5 text-[14px] leading-[1.5] text-mist"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[9px] h-px w-3 shrink-0 bg-signal"
                            />
                            {capability}
                          </li>
                        ))}
                      </ul>
                      <SmartLink
                        href={`/work/${proof.slug}`}
                        className="group flex items-center justify-between gap-4 rounded-[18px] bg-white/[0.05] px-5 py-4 transition-colors duration-300 hover:bg-white/[0.09]"
                      >
                        <span className="flex flex-col gap-1">
                          <span className="eyebrow text-silver">{t.proofLabel}</span>
                          <span className="text-[15px] text-snow">
                            {proof.name} — {proof.tagline}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-signal transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </SmartLink>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Partners */}
      <section className="section bg-snow">
        <div className="page-width flex flex-col gap-12">
          <Reveal>
            <SectionHeading eyebrow={t.partnersEyebrow} title={t.partnersTitle} size="md" />
          </Reveal>
          <Reveal pop>
            <ul className="flex flex-wrap justify-center gap-3">
              {organizers.map((organizer) => (
                <li
                  key={organizer.id}
                  className="logo-cell flex h-28 w-[calc(50%-6px)] items-center justify-center rounded-[20px] bg-fog px-6 text-graphite-ink sm:w-[calc(33.333%-8px)] md:h-32 lg:w-[calc(20%-9.6px)]"
                >
                  {organizer.logo ? (
                    // biome-ignore lint/performance/noImgElement: normalized brand marks; next/image adds nothing to inline SVGs
                    <img
                      src={organizer.logo}
                      alt={organizer.name}
                      loading="lazy"
                      className="max-h-10 max-w-[120px] object-contain"
                    />
                  ) : (
                    <span className="text-[18px] font-medium tracking-[-0.01em] whitespace-nowrap">
                      {organizer.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Founders */}
      <section className="section bg-fog">
        <div className="page-width flex flex-col gap-12">
          <Reveal>
            <SectionHeading eyebrow={copy.team.eyebrow} title={copy.team.title} />
          </Reveal>
          <Founders lang={lang} />
        </div>
      </section>

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
