import type { Metadata } from "next";
import { LabList } from "@/components/home/Sections";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { SmartLink } from "@/components/ui/Primitives";
import { ProductMetrics } from "@/components/work/Metrics";
import { ProductFrame } from "@/components/work/ProductFrame";
import { productsSection } from "@/content/copy";
import { coreProducts, reach } from "@/content/products";

export const metadata: Metadata = {
  title: "Products",
  description: productsSection.body,
};

/**
 * Products index: the four core products as alternating editorial rows — film on one side,
 * story and numbers on the other — each frame morphing into its case study. The rest of the
 * lab follows as a quiet list.
 */
export default function WorkPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow={productsSection.eyebrow}
        title={productsSection.title}
        body={productsSection.body}
      >
        <p className="text-[14px] text-graphite-ink">
          <span className="font-medium text-ink">{reach.users}</span> {reach.usersLabel}
        </p>
      </PageHeader>

      <section className="section bg-fog">
        <ol className="page-width flex flex-col gap-24 md:gap-32">
          {coreProducts.map((product, index) => (
            <li key={product.slug}>
              <Reveal className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <SmartLink
                  href={`/work/${product.slug}`}
                  aria-label={`${product.name} case study`}
                  className={`block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <ProductFrame product={product} morph />
                </SmartLink>
                <div className="flex flex-col gap-6 lg:col-span-5">
                  <div className="flex items-center gap-3">
                    <span className="tabular text-[13px] font-medium text-signal">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-8 bg-ink/15" aria-hidden="true" />
                    <span className="eyebrow">{product.category}</span>
                  </div>
                  <h2 className="text-heading md:text-heading-lg">{product.name}</h2>
                  <p className="font-display text-[20px] leading-[1.35] text-graphite-ink">
                    {product.tagline}
                  </p>
                  <p className="text-[15px] text-stone">{product.oneLine}</p>
                  <ProductMetrics product={product} />
                  <div className="flex flex-wrap items-center gap-5 pt-2">
                    <SmartLink
                      href={`/work/${product.slug}`}
                      className="group inline-flex items-center gap-2 text-[15px] font-medium text-ink"
                    >
                      Read the case study
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
                      Live demo ↗
                    </SmartLink>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="section bg-snow">
        <LabList linkAll={false} />
      </section>
    </PageTransition>
  );
}
