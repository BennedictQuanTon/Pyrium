import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { PillButton, SmartLink } from "@/components/ui/Primitives";
import { ProductOutputs } from "@/components/work/Metrics";
import { ProductFrame } from "@/components/work/ProductFrame";
import { ProductLogo } from "@/components/work/ProductLogo";
import { TestimonialDeck } from "@/components/work/TestimonialDeck";
import { getCopy } from "@/content/copy";
import { getProduct, nextProduct, productOrder } from "@/content/products";
import { isLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return productOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const product = isLang(lang) ? getProduct(lang, slug) : undefined;
  if (!product) return {};
  return { title: `${product.name} — ${product.category}`, description: product.oneLine };
}

/**
 * Case study: hero with the film (morphed in from the card), the numbers, the story (problem
 * → what we built), how the work is split between model, code and people, the build log,
 * screens, the technical outcomes, two pilot quotes and the next product.
 */
export default async function CaseStudyPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();
  const product = getProduct(lang, slug);
  if (!product) notFound();
  const copy = getCopy(lang);
  const t = copy.caseStudy;
  const next = nextProduct(lang, product.slug);
  const meta = [
    { label: t.event, value: product.event },
    { label: t.with, value: product.organizers },
    { label: t.when, value: product.period },
    ...(product.team ? [{ label: t.team, value: product.team }] : []),
    ...(product.result ? [{ label: t.result, value: product.result }] : []),
  ];
  const steps = [
    { key: "model", name: t.steps.model },
    { key: "code", name: t.steps.code },
    { key: "human", name: t.steps.human },
  ] as const;

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden bg-fog">
        <div className="page-width relative flex flex-col gap-10 pt-32 pb-16 md:pt-40">
          <SmartLink
            href="/work"
            direction="back"
            className="hero-in group inline-flex items-center gap-2 self-start text-[14px] text-stone hover:text-ink"
          >
            <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            {t.allProducts}
          </SmartLink>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div className="flex flex-col gap-5">
              <p
                className="hero-in eyebrow flex items-center gap-2"
                style={{ ["--hero-i" as string]: 1 }}
              >
                <span aria-hidden="true" className="h-px w-6 bg-signal" />
                {product.category}
              </p>
              <h1
                className="hero-in py-1"
                style={{ ["--hero-i" as string]: 2 }}
                aria-label={product.name}
              >
                <ProductLogo slug={product.slug} size="lg" />
              </h1>
              <p
                className="hero-in text-[14px] text-graphite-ink"
                style={{ ["--hero-i" as string]: 2 }}
              >
                <span className="eyebrow mr-2">{copy.showcase.builtFor}</span>
                {product.audience}
              </p>
              <p
                className="hero-in max-w-[30ch] font-display text-[22px] leading-[1.3] text-graphite-ink md:text-[28px]"
                style={{ ["--hero-i" as string]: 3 }}
              >
                {product.tagline}
              </p>
            </div>
            <div className="hero-in flex flex-col gap-6" style={{ ["--hero-i" as string]: 4 }}>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
                {meta.map((item) => (
                  <div key={item.label} className="flex flex-col gap-1 border-t border-ink/10 pt-3">
                    <dt className="text-[12px] text-stone">{item.label}</dt>
                    <dd className="text-[14px] font-medium text-ink">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap gap-3">
                <PillButton href={product.demo}>{copy.showcase.tryLive}</PillButton>
                <PillButton href={product.github} variant="ghost">
                  {t.source}
                </PillButton>
              </div>
            </div>
          </div>
          <ProductFrame product={product} morph />
        </div>
      </section>

      {/* Numbers */}
      <section className="bg-fog pb-20 md:pb-28">
        <div className="page-width">
          <Reveal className="glass p-7 md:p-10">
            <ProductOutputs product={product} labels={copy.showcase} size="lg" />
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-snow">
        <div className="page-width grid gap-14 md:grid-cols-2 md:gap-20">
          <Reveal className="flex flex-col gap-4">
            <p className="eyebrow">{t.problem}</p>
            <p className="font-display text-[22px] leading-[1.45] text-ink md:text-[26px]">
              {product.problem}
            </p>
          </Reveal>
          <Reveal delay={1} className="flex flex-col gap-4 md:pt-24">
            <p className="eyebrow">{t.built}</p>
            <p className="text-[17px] leading-[1.65] text-graphite-ink">{product.solution}</p>
            <ul className="mt-2 flex flex-wrap gap-2" aria-label="Stack">
              {product.stack.map((item) => (
                <li
                  key={item}
                  className="rounded-badges bg-fog px-3 py-1 text-[12px] text-graphite-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* The split */}
      <section className="section relative overflow-hidden bg-deep-slate">
        {/* biome-ignore lint/performance/noImgElement: decorative open-licence photo under glass */}
        <img
          src={product.photo}
          alt=""
          loading="lazy"
          className="photo-mono absolute inset-0 size-full object-cover opacity-30"
        />
        <div className="page-width relative flex flex-col gap-12">
          <Reveal className="flex flex-col gap-4">
            <p className="eyebrow flex items-center gap-2 text-silver">
              <span aria-hidden="true" className="h-px w-6 bg-signal" />
              {t.split}
            </p>
            <h2 className="max-w-[22ch] text-heading text-snow md:text-heading-lg">
              {t.splitTitle}
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <ol className="grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => (
                <li key={step.key} className="glass-dark flex flex-col gap-5 p-7 md:p-8">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="rail-node size-3 rounded-full"
                      style={{ ["--d" as string]: `${index * 0.4}s` }}
                    />
                    <span className="text-[13px] font-medium text-silver">{step.name}</span>
                  </div>
                  <p className="text-[17px] leading-[1.55] text-snow">{product.split[step.key]}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Build log */}
      <section className="section bg-fog">
        <div className="page-width grid gap-12 md:grid-cols-[1fr_2fr]">
          <Reveal className="self-start md:sticky md:top-32">
            <h2 className="text-heading">{t.log}</h2>
          </Reveal>
          <ol className="flex flex-col">
            {product.process.map((step, index) => (
              <li key={step.title}>
                <Reveal
                  delay={index}
                  className="grid grid-cols-[3rem_1fr] gap-4 border-t border-ink/10 py-7"
                >
                  <span className="tabular text-[14px] text-signal">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-sans text-[18px] font-medium">{step.title}</h3>
                    <p className="text-[15px] text-stone">{step.detail}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Screens */}
      <section className="section bg-snow" aria-labelledby="screens-title">
        <div className="page-width mb-10 flex items-end justify-between gap-6">
          <Reveal>
            <h2 id="screens-title" className="text-heading">
              {t.inside}
            </h2>
          </Reveal>
          <p className="hidden text-[13px] text-stone md:block">{t.scroll}</p>
        </div>
        <Reveal delay={1}>
          <ul className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:px-[max(2rem,calc((100vw-1200px)/2+2rem))]">
            {product.screens.map((src, index) => (
              <li key={src} className="w-[85vw] shrink-0 snap-center md:w-[720px]">
                <figure className="flex flex-col gap-4">
                  <div className="overflow-hidden rounded-cards bg-fog p-2 shadow-subtle">
                    {/* biome-ignore lint/performance/noImgElement: product screenshot; next/image adds nothing for these static webp files */}
                    <img
                      src={src}
                      alt={product.captions[index]}
                      loading="lazy"
                      className="aspect-[16/10] w-full rounded-[18px] object-cover object-top"
                    />
                  </div>
                  <figcaption className="text-[14px] text-stone">
                    {product.captions[index]}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Outcomes and pilot quotes */}
      <section className="section bg-blueprint">
        <div className="page-width grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="flex flex-col gap-6">
            <h2 className="text-heading">{t.outcomes}</h2>
            <ul className="flex flex-col gap-4">
              {product.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex gap-3 text-[16px] leading-[1.6] text-graphite-ink"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="mt-1.5 size-4 shrink-0 text-signal"
                    aria-hidden="true"
                  >
                    <path
                      d="M3.5 8.5l3 3 6-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  {outcome}
                </li>
              ))}
            </ul>
            <p className="text-[12px] text-stone">{t.outcomesNote}</p>
          </Reveal>
          <Reveal delay={1}>
            <TestimonialDeck
              quotes={product.testimonials}
              draftLabel={copy.showcase.draft}
              label={copy.showcase.pilot}
            />
          </Reveal>
        </div>
      </section>

      {/* Next product */}
      <section className="bg-fog">
        <SmartLink
          href={`/work/${next.slug}`}
          className="group relative block overflow-hidden bg-deep-slate"
          aria-label={`${t.next}: ${next.name}`}
        >
          {/* biome-ignore lint/performance/noImgElement: decorative open-licence photo */}
          <img
            src={next.photo}
            alt=""
            loading="lazy"
            className="photo-mono absolute inset-0 size-full object-cover opacity-40 transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          <div className="page-width relative flex flex-col gap-4 py-24 md:py-32">
            <span className="eyebrow text-silver">{t.next}</span>
            <span className="flex items-center gap-6 text-[48px] leading-none tracking-[-1px] text-snow md:text-[88px]">
              <span className="font-display">{next.name}</span>
              <span
                aria-hidden="true"
                className="text-signal transition-transform duration-500 group-hover:translate-x-3"
              >
                →
              </span>
            </span>
            <span className="max-w-[48ch] text-[16px] text-silver">{next.tagline}</span>
          </div>
        </SmartLink>
      </section>
    </PageTransition>
  );
}
