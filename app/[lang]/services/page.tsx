import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Engagement } from "@/components/home/Sections";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { PillButton, SectionHeading, SmartLink } from "@/components/ui/Primitives";
import { ProductLogo } from "@/components/work/ProductLogo";
import { getCopy } from "@/content/copy";
import { getProduct } from "@/content/products";
import { isLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getCopy(lang).services;
  return { title: t.eyebrow, description: t.body };
}

/**
 * Services: the four offer families (each tied to a product that proves it), the six-layer
 * system, the controls every deployment documents, who it's for and which workflows come first,
 * the metrics we report, the engagement path, and the promises we won't make.
 */
export default async function ServicesPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const copy = getCopy(lang);
  const t = copy.services;

  return (
    <PageTransition>
      <PageHeader eyebrow={t.eyebrow} title={t.title} body={t.body}>
        <PillButton href="/contact">{copy.hero.navCta}</PillButton>
      </PageHeader>

      {/* Offer families */}
      <section className="section bg-fog">
        <div className="page-width flex flex-col gap-12">
          <Reveal>
            <SectionHeading eyebrow={t.offersEyebrow} title={t.offersTitle} />
          </Reveal>
          <ul className="grid gap-4 md:grid-cols-2">
            {t.offers.map((offer, index) => {
              const proof = getProduct(lang, offer.proof);
              return (
                <li key={offer.name}>
                  <Reveal
                    pop
                    delay={index % 2}
                    className="glass group flex h-full flex-col gap-6 p-8 md:p-10"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="eyebrow">{offer.role}</span>
                      <span className="tabular text-[13px] text-stone">0{index + 1}</span>
                    </div>
                    <h2 className="text-heading-sm md:text-heading">{offer.name}</h2>
                    <p className="text-[16px] leading-[1.6] text-graphite-ink">{offer.detail}</p>
                    {proof ? (
                      <SmartLink
                        href={`/work/${proof.slug}`}
                        className="mt-auto flex items-center justify-between gap-4 rounded-[18px] bg-white/60 p-4 transition-colors hover:bg-white"
                      >
                        <span className="flex flex-col gap-1.5">
                          <span className="text-[12px] text-stone">{t.shownIn}</span>
                          <ProductLogo slug={proof.slug} size="sm" />
                        </span>
                        <span className="max-w-[18ch] text-right text-[13px] text-graphite-ink">
                          <span className="block font-display text-[24px] text-ink">
                            {proof.metrics[0].value}
                          </span>
                          {proof.metrics[0].label}
                        </span>
                      </SmartLink>
                    ) : null}
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* System layers */}
      <section className="section bg-snow">
        <div className="page-width grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <SectionHeading
              eyebrow={t.archEyebrow}
              title={t.archTitle}
              body={t.archBody}
              size="md"
            />
          </Reveal>
          <Reveal delay={1}>
            {/* A stacked diagram: each layer is a plate, the top one closest to the business. */}
            <ol className="flex flex-col gap-2">
              {t.layers.map((layer, index) => (
                <li
                  key={layer.name}
                  className="group grid grid-cols-[2.5rem_1fr] items-center gap-4 rounded-[20px] border border-ink/[0.06] bg-fog px-5 py-4 transition-all duration-500 hover:translate-x-1 hover:border-signal/30 hover:bg-snow md:grid-cols-[2.5rem_12rem_1fr] md:ml-[var(--indent)]"
                  style={{ ["--indent" as string]: `${index * 10}px` }}
                >
                  <span className="tabular text-[13px] text-stone group-hover:text-signal">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-medium text-ink">{layer.name}</span>
                  <span className="col-start-2 text-[14px] text-stone md:col-start-3">
                    {layer.detail}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Controls */}
      <section className="section bg-deep-slate">
        <div className="page-width flex flex-col gap-12">
          <Reveal>
            <SectionHeading
              eyebrow={t.controlsEyebrow}
              title={t.controlsTitle}
              body={t.controlsBody}
              onDark
            />
          </Reveal>
          <Reveal>
            <ul className="grid gap-px overflow-hidden rounded-cards bg-white/10 md:grid-cols-3">
              {t.controls.map((control) => (
                <li key={control.area} className="flex h-full flex-col gap-3 bg-deep-slate p-7">
                  <span aria-hidden="true" className="h-px w-8 bg-signal" />
                  <h3 className="font-sans text-[16px] font-medium text-snow">{control.area}</h3>
                  <p className="text-[14px] text-silver">{control.evidence}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Audience, use cases, metrics */}
      <section className="section bg-fog">
        <div className="page-width grid gap-6 lg:grid-cols-3">
          <Reveal pop className="glass flex flex-col gap-5 p-8">
            <h2 className="text-heading-sm">{t.audienceTitle}</h2>
            <p className="text-[15px] leading-[1.6] text-graphite-ink">{t.audienceBody}</p>
            <ul className="flex flex-wrap gap-2">
              {t.buyers.map((buyer) => (
                <li
                  key={buyer}
                  className="rounded-badges bg-ink px-3.5 py-1.5 text-[12px] font-medium text-snow"
                >
                  {buyer}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal pop delay={1} className="glass flex flex-col gap-5 p-8">
            <h2 className="text-heading-sm">{t.startTitle}</h2>
            <ul className="flex flex-col">
              {t.useCases.map((useCase) => (
                <li
                  key={useCase.name}
                  className="flex items-start justify-between gap-4 border-t border-ink/[0.07] py-3"
                >
                  <span className="text-[14px] text-ink">{useCase.name}</span>
                  <span className="shrink-0 text-[12px] text-stone">{useCase.fit}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal pop delay={2} className="glass flex flex-col gap-5 p-8">
            <h2 className="text-heading-sm">{t.reportTitle}</h2>
            <ul className="flex flex-col gap-4">
              {t.metrics.map((metric) => (
                <li
                  key={metric.name}
                  className="flex flex-col gap-1 border-l border-signal/40 pl-4"
                >
                  <span className="text-[14px] font-medium text-ink">{metric.name}</span>
                  <span className="text-[13px] text-stone">{metric.detail}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Engagement */}
      <section className="section bg-blueprint">
        <div className="page-width flex flex-col gap-12">
          <Reveal>
            <SectionHeading
              eyebrow={copy.engagement.eyebrow}
              title={copy.engagement.title}
              body={copy.engagement.body}
            />
          </Reveal>
          <Engagement lang={lang} />
        </div>
      </section>

      {/* Claims policy */}
      <section className="section bg-snow">
        <div className="page-width flex flex-col gap-10">
          <Reveal>
            <SectionHeading eyebrow={t.promisesEyebrow} title={t.promisesTitle} />
          </Reveal>
          <ul className="grid gap-4 md:grid-cols-3">
            {t.promises.map((promise, index) => (
              <li key={promise}>
                <Reveal
                  delay={index}
                  className="flex h-full flex-col gap-4 rounded-cards border border-ink/[0.07] p-7"
                >
                  <span className="tabular text-[13px] text-signal">0{index + 1}</span>
                  <p className="font-display text-[20px] leading-[1.4] text-ink">{promise}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageTransition>
  );
}
