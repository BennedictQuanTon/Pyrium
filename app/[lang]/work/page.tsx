import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LabList } from "@/components/home/Sections";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { SmartLink } from "@/components/ui/Primitives";
import { ProductMetrics } from "@/components/work/Metrics";
import { ProductFrame } from "@/components/work/ProductFrame";
import { ProductLogo } from "@/components/work/ProductLogo";
import { getCopy } from "@/content/copy";
import { getProducts } from "@/content/products";
import { isLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getCopy(lang).productsSection;
  return { title: t.eyebrow, description: t.body };
}

/**
 * Products index: the four core products as alternating editorial rows — film on one side,
 * logo, who it's for and what it changes on the other — each frame morphing into its case
 * study. The rest of the lab follows as a quiet list.
 */
export default async function WorkPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const copy = getCopy(lang);
  const t = copy.productsSection;
  const products = getProducts(lang);

  return (
    <PageTransition>
      <PageHeader eyebrow={t.eyebrow} title={t.title} body={t.body}>
        <p className="text-[14px] text-graphite-ink">
          <span className="font-medium text-ink">{t.stats[0].value}</span> {t.stats[0].label}
        </p>
      </PageHeader>

      <section className="section bg-fog">
        <ol className="page-width flex flex-col gap-24 md:gap-32">
          {products.map((product, index) => (
            <li key={product.slug}>
              <Reveal className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <SmartLink
                  href={`/work/${product.slug}`}
                  aria-label={product.name}
                  className={`block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <ProductFrame product={product} morph />
                </SmartLink>
                <div className="flex flex-col gap-6 lg:col-span-5">
                  <div className="flex items-center justify-between gap-3">
                    <h2 aria-label={product.name}>
                      <ProductLogo slug={product.slug} size="md" />
                    </h2>
                    <span className="eyebrow">{product.category}</span>
                  </div>
                  <p className="font-display text-[26px] leading-[1.2] tracking-[-0.02em] text-ink md:text-[30px]">
                    {product.tagline}
                  </p>
                  <p className="text-[15px] text-stone">{product.oneLine}</p>
                  <p className="text-[14px] text-ink">
                    <span className="eyebrow mr-2">{copy.showcase.builtFor}</span>
                    {product.audience}
                  </p>
                  <ProductMetrics product={product} />
                  <div className="flex flex-wrap items-center gap-5 pt-2">
                    <SmartLink
                      href={`/work/${product.slug}`}
                      className="group inline-flex items-center gap-2 text-[15px] font-medium text-ink"
                    >
                      {copy.showcase.readCase}
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </SmartLink>
                    <SmartLink
                      href={product.demo}
                      className="text-[15px] text-stone underline underline-offset-4 hover:text-ink"
                    >
                      {copy.showcase.tryLive} ↗
                    </SmartLink>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="section bg-snow">
        <LabList lang={lang} linkAll={false} />
      </section>
    </PageTransition>
  );
}
