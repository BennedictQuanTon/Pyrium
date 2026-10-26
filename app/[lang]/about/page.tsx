import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BuiltWith } from "@/components/about/BuiltWith";
import { CountUp } from "@/components/motion/CountUp";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading, SmartLink } from "@/components/ui/Primitives";
import { getCopy } from "@/content/copy";
import { collaborations, organizers } from "@/content/people";
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
 * About: who we are, the four numbers we can point to, the products beside the organizers they
 * were built with, and our five-part core in depth, each commitment tied to the product that
 * proves it. The team and the vision each have their own page.
 */
export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const copy = getCopy(lang);
  const t = copy.about;
  const pillars = copy.core.pillars;
  const builtRows = collaborations.map((row) => ({ slug: row.product, partners: row.with }));

  return (
    <PageTransition>
      <PageHeader eyebrow={t.eyebrow} title={t.title} body={t.body} />

      {/* Numbers: four figures set large on hairlines, each rule drawing in under its figure */}
      <section className="bg-fog pb-20 md:pb-28">
        <div className="page-width flex flex-col gap-12 md:gap-14">
          <Reveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <SectionHeading eyebrow={t.numbersEyebrow} title={t.numbersTitle} size="md" />
            <p className="max-w-[44ch] text-[13px] leading-[1.55] text-stone lg:text-right">
              {t.numbersNote}
            </p>
          </Reveal>
          <dl className="grid grid-cols-2 gap-y-14 lg:grid-cols-4">
            {t.numbers.map((item, index) => (
              <Reveal
                key={item.label}
                delay={index}
                className="flex flex-col border-l border-ink/10 pr-4 pl-5 md:pl-8"
              >
                <dt className="order-last mt-5 max-w-[22ch] text-[13px] leading-[1.5] text-graphite-ink md:text-[15px]">
                  {item.label}
                </dt>
                <dd className="flex flex-col">
                  <span aria-hidden="true" className="tabular text-[12px] text-stone">
                    0{index + 1}
                  </span>
                  <span
                    className={`mt-8 font-display text-[56px] leading-[0.9] tracking-[-0.055em] whitespace-nowrap sm:text-[72px] lg:mt-12 lg:text-[84px] xl:text-[104px] ${index === 0 ? "text-signal" : "text-ink"}`}
                  >
                    <CountUp text={item.value} className="tabular" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="stat-rule mt-6 block h-[2px] w-10 bg-signal"
                  />
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Built with: the products and the organizers behind them, as one interactive piece */}
      <section className="section bg-snow">
        <div className="page-width flex flex-col gap-12 md:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow={t.builtEyebrow}
              title={t.builtTitle}
              body={t.builtBody}
              size="md"
            />
          </Reveal>
          <Reveal pop>
            <BuiltWith rows={builtRows} organizers={organizers} withLabel={t.builtWith} />
          </Reveal>
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
    </PageTransition>
  );
}
