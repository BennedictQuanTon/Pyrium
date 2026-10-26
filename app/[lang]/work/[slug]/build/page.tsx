import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { SmartLink } from "@/components/ui/Primitives";
import { CaseTabs } from "@/components/work/CaseTabs";
import { ProductLogo } from "@/components/work/ProductLogo";
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
  const t = getCopy(lang as "en").caseStudy;
  return { title: `${product.name} — ${t.tabs.build}`, description: product.solution };
}

/**
 * How a product is built: how the work is split between model, code and people, the build
 * log, and screens from inside the product, ending on a link to the next product.
 */
export default async function CaseBuildPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();
  const product = getProduct(lang, slug);
  if (!product) notFound();
  const t = getCopy(lang).caseStudy;
  const next = nextProduct(lang, product.slug);
  const steps = [
    { key: "model", name: t.steps.model },
    { key: "code", name: t.steps.code },
    { key: "human", name: t.steps.human },
  ] as const;

  return (
    <PageTransition>
      <section className="bg-blueprint">
        <div className="page-width flex flex-col gap-6 pt-36 pb-14 md:pt-44">
          <SmartLink
            href={`/work/${product.slug}`}
            direction="back"
            className="hero-in group inline-flex items-center gap-2 self-start text-[14px] text-stone hover:text-ink"
          >
            <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            {product.name}
          </SmartLink>
          <h1 className="hero-in" style={{ ["--hero-i" as string]: 1 }} aria-label={product.name}>
            <ProductLogo slug={product.slug} size="lg" />
          </h1>
          <p
            className="hero-in max-w-[46ch] font-display text-[22px] leading-[1.3] text-graphite-ink md:text-[28px]"
            style={{ ["--hero-i" as string]: 2 }}
          >
            {product.tagline}
          </p>
          <div className="hero-in" style={{ ["--hero-i" as string]: 3 }}>
            <CaseTabs slug={product.slug} labels={t.tabs} current="build" />
          </div>
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
        <div className="page-width mt-16">
          <SmartLink
            href={`/work/${next.slug}`}
            className="group flex items-center justify-between gap-6 border-t border-ink/10 pt-8"
          >
            <span className="flex flex-col gap-2">
              <span className="eyebrow">{t.next}</span>
              <span className="font-display text-[32px] leading-none tracking-[-0.8px] text-ink md:text-[48px]">
                {next.name}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="text-[28px] text-signal transition-transform duration-500 group-hover:translate-x-2"
            >
              →
            </span>
          </SmartLink>
        </div>
      </section>
    </PageTransition>
  );
}
