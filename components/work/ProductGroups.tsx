import { Reveal } from "@/components/motion/Reveal";
import { PillButton } from "@/components/ui/Primitives";
import { getCopy } from "@/content/copy";
import { getProductGroups } from "@/content/products";
import type { Product } from "@/content/types";
import type { Lang } from "@/lib/i18n";
import { ProductOutputs } from "./Metrics";
import { ProductFrame } from "./ProductFrame";
import { ProductLogo } from "./ProductLogo";
import { TestimonialDeck } from "./TestimonialDeck";

type Labels = ReturnType<typeof getCopy>["showcase"];

/**
 * One product, told in order: the trailer first; then what it is, who it serves and the
 * problem it optimizes; the three outputs (testers, expected saving, core result); two pilot
 * quotes in a stacked deck; recognition; and the actions. Rows alternate sides for rhythm.
 */
function ProductPanel({
  product,
  labels,
  flip,
}: {
  product: Product;
  labels: Labels;
  flip: boolean;
}) {
  return (
    <article id={product.slug} aria-labelledby={`product-${product.slug}`} className="scroll-mt-32">
      <Reveal className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <div className={`lg:sticky lg:top-28 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
          <ProductFrame product={product} morph />
          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-stone">
            <span className="eyebrow">{labels.recognition}</span>
            <span>{product.event}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular">{product.period}</span>
            {product.result ? (
              <span className="rounded-badges bg-signal px-3 py-1 text-[12px] font-medium text-snow">
                {product.result}
              </span>
            ) : null}
          </p>
        </div>
        <div className="flex flex-col gap-7 lg:col-span-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h4 id={`product-${product.slug}`} aria-label={product.name}>
              <ProductLogo slug={product.slug} size="md" />
            </h4>
            <span className="eyebrow">{product.category}</span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-display text-[28px] leading-[1.18] tracking-[-0.02em] text-ink md:text-[34px]">
              {product.tagline}
            </p>
            <p className="text-[16px] leading-[1.6] text-stone">{product.oneLine}</p>
          </div>
          <dl className="flex flex-col divide-y divide-ink/[0.07] border-y border-ink/[0.07] text-[14px]">
            <div className="grid grid-cols-[6.5rem_1fr] gap-3 py-3">
              <dt className="eyebrow pt-[2px]">{labels.builtFor}</dt>
              <dd className="text-ink">{product.audience}</dd>
            </div>
            <div className="grid grid-cols-[6.5rem_1fr] gap-3 py-3">
              <dt className="eyebrow pt-[2px]">{labels.solves}</dt>
              <dd className="text-ink">{product.solves}</dd>
            </div>
          </dl>
          <ProductOutputs product={product} labels={labels} />
          <TestimonialDeck
            quotes={product.testimonials}
            draftLabel={labels.draft}
            label={labels.pilot}
          />
          <div className="flex flex-wrap gap-3">
            <PillButton href={product.demo}>{labels.tryLive}</PillButton>
            <PillButton href={`/work/${product.slug}`} variant="ghost">
              {labels.readCase}
            </PillButton>
          </div>
        </div>
      </Reveal>
    </article>
  );
}

/**
 * Every product, grouped by the industry it serves. A pinned row of group links sits at the
 * top; each group opens with its number, name and promise, then its products in alternating
 * panels.
 */
export function ProductGroups({ lang }: { lang: Lang }) {
  const copy = getCopy(lang);
  const groups = getProductGroups(lang);
  const names = copy.productsSection.groups;
  let row = 0;
  return (
    <div className="flex flex-col gap-20 md:gap-28">
      <nav
        aria-label={copy.productsSection.eyebrow}
        className="group-nav page-width sticky top-[88px] z-20"
      >
        <ul className="glass glass-strong no-scrollbar flex gap-1 overflow-x-auto rounded-badges p-1.5">
          {groups.map(({ group, products }, index) => (
            <li key={group} className="shrink-0">
              <a
                href={`#group-${group}`}
                className="flex items-center gap-2 rounded-badges px-4 py-2 text-[13px] font-medium whitespace-nowrap text-graphite-ink transition-colors hover:bg-ink hover:text-snow"
              >
                <span className="tabular text-signal">0{index + 1}</span>
                {names[group].name}
                <span className="text-stone">{products.length}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {groups.map(({ group, products }, index) => (
        <section
          key={group}
          id={`group-${group}`}
          aria-labelledby={`group-title-${group}`}
          className="page-width flex scroll-mt-40 flex-col gap-12 md:gap-16"
        >
          <Reveal className="flex flex-col gap-3 border-t border-ink/10 pt-8 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="flex items-baseline gap-5">
              <span className="tabular font-display text-[44px] leading-none text-signal md:text-[56px]">
                0{index + 1}
              </span>
              <h3 id={`group-title-${group}`} className="text-heading md:text-heading-lg">
                {names[group].name}
              </h3>
            </div>
            <p className="max-w-[44ch] text-[16px] text-stone md:text-right">{names[group].body}</p>
          </Reveal>
          <div className="flex flex-col gap-24 md:gap-32">
            {products.map((product) => {
              const flip = row % 2 === 1;
              row += 1;
              return (
                <ProductPanel
                  key={product.slug}
                  product={product}
                  labels={copy.showcase}
                  flip={flip}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
