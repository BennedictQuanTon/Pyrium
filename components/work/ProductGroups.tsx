import { Reveal } from "@/components/motion/Reveal";
import { OrganizerMark } from "@/components/ui/OrganizerMark";
import { PillButton, SmartLink } from "@/components/ui/Primitives";
import { getCopy } from "@/content/copy";
import { collaborations, organizers, supporters } from "@/content/people";
import { getProductGroups } from "@/content/products";
import type { Product } from "@/content/types";
import type { Lang } from "@/lib/i18n";
import { GroupNav } from "./GroupNav";
import { ProductOutputs } from "./Metrics";
import { MobileMore } from "./MobileMore";
import { ProductFrame } from "./ProductFrame";
import { ProductLogo } from "./ProductLogo";
import { TestimonialDeck } from "./TestimonialDeck";

export type Labels = ReturnType<typeof getCopy>["showcase"];

/**
 * One product as a balanced pair of columns. One side holds the film, the event it was built at
 * and its three outputs; the other holds what it is, who it serves, the problem it solves, two
 * pilot quotes and the actions. The first product of a group also carries the group's promise.
 * Sides alternate from row to row; nothing pins or scrolls on its own.
 */
export function ProductPanel({
  product,
  labels,
  flip,
  intro,
}: {
  product: Product;
  labels: Labels;
  flip: boolean;
  intro?: string;
}) {
  const supported = supporters[product.slug];
  const partners =
    supported ?? collaborations.find((row) => row.product === product.slug)?.with ?? [];
  return (
    <article id={product.slug} aria-labelledby={`product-${product.slug}`} className="scroll-mt-40">
      <Reveal className="grid items-start gap-6 md:gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-14">
        <div className={`order-2 flex flex-col gap-5 ${flip ? "lg:order-2" : "lg:order-1"}`}>
          <ProductFrame product={product} morph />
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-stone">
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
          <ProductOutputs product={product} labels={labels} />
          {partners.length ? (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/[0.07] pt-5 lg:mt-auto lg:min-h-[4.25rem]">
              <p className="eyebrow">{supported ? labels.supportedBy : labels.organisedBy}</p>
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-graphite-ink">
                {partners.map((name) => {
                  const organizer = organizers.find((entry) => entry.name === name);
                  return (
                    <li key={name} className="flex h-9 items-center">
                      {organizer ? (
                        <OrganizerMark organizer={organizer} size="sm" />
                      ) : (
                        <span className="text-[14px] font-medium">{name}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
        <div className={`order-1 flex flex-col gap-6 ${flip ? "lg:order-1" : "lg:order-2"}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h4 id={`product-${product.slug}`} aria-label={product.name}>
              <ProductLogo slug={product.slug} size="md" />
            </h4>
            <span className="eyebrow">{product.category}</span>
          </div>
          <div className="flex flex-col gap-3">
            {intro ? (
              <p className="flex items-center gap-2.5 text-[14px] text-graphite-ink">
                <span aria-hidden="true" className="h-px w-6 shrink-0 bg-signal" />
                {intro}
              </p>
            ) : null}
            <p className="font-display text-[24px] leading-[1.18] tracking-[-0.02em] text-ink md:text-[32px]">
              {product.tagline}
            </p>
            <p className="text-[15px] leading-[1.6] text-stone md:text-[16px]">{product.oneLine}</p>
          </div>
          <MobileMore label={labels.more}>
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
            <TestimonialDeck
              quotes={product.testimonials}
              avatar={product.slug}
              anonymous={labels.anonymous}
              label={labels.pilot}
            />
          </MobileMore>
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
 * The phone version of a product: logo, category, the promise and where it was recognised.
 * The whole card opens the case study; the demo keeps its own button.
 */
function ProductCard({ product, labels }: { product: Product; labels: Labels }) {
  return (
    <article className="glass relative flex flex-col gap-4 rounded-[24px] p-5 transition-transform duration-300 active:scale-[0.985]">
      <div className="flex items-center justify-between gap-3">
        <ProductLogo slug={product.slug} size="sm" />
        <span className="eyebrow text-[10.5px]">{product.category}</span>
      </div>
      <p className="font-display text-[20px] leading-[1.2] tracking-[-0.02em] text-ink">
        {product.tagline}
      </p>
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[12.5px] text-stone">
        <span>{product.event}</span>
        {product.result ? (
          <span className="rounded-badges bg-signal px-2.5 py-0.5 text-[11px] font-medium text-snow">
            {product.result}
          </span>
        ) : null}
      </p>
      <div className="flex items-center justify-between gap-3 border-t border-ink/[0.07] pt-4">
        <SmartLink
          href={`/work/${product.slug}`}
          className="flex items-center gap-1.5 text-[14px] font-medium text-ink after:absolute after:inset-0 after:rounded-[24px]"
        >
          {labels.readCase}
          <span aria-hidden="true" className="text-signal">
            →
          </span>
        </SmartLink>
        <SmartLink
          href={product.demo}
          className="relative z-10 rounded-full bg-signal px-4 py-2 text-[13px] font-medium text-snow"
        >
          {labels.tryLive} ↗
        </SmartLink>
      </div>
    </article>
  );
}

/**
 * Every product, grouped by the industry it serves. A row of four equal group cells sits at the
 * top; each group opens with its number and name, and its promise travels with its first
 * product.
 */
export function ProductGroups({ lang }: { lang: Lang }) {
  const copy = getCopy(lang);
  const groups = getProductGroups(lang);
  const names = copy.productsSection.groups;
  let row = 0;
  return (
    <div className="flex flex-col gap-8 md:gap-24">
      <GroupNav
        label={copy.productsSection.eyebrow}
        items={groups.map(({ group }) => ({ id: group, name: names[group].name }))}
      />
      {groups.map(({ group, products }, index) => (
        <section
          key={group}
          id={`group-${group}`}
          aria-labelledby={`group-title-${group}`}
          className="page-width flex scroll-mt-48 flex-col gap-10 md:gap-12"
        >
          <Reveal className="hidden items-center gap-5 border-t border-ink/10 pt-8 md:flex">
            <span className="tabular font-display text-[40px] leading-none text-signal md:text-[52px]">
              0{index + 1}
            </span>
            <h3 id={`group-title-${group}`} className="text-heading md:text-heading-lg">
              {names[group].name}
            </h3>
          </Reveal>
          <div className="flex flex-col gap-3 md:hidden">
            <p className="flex items-start gap-2.5 px-1 text-[13.5px] leading-[1.5] text-graphite-ink">
              <span aria-hidden="true" className="mt-[10px] h-px w-5 shrink-0 bg-signal" />
              {names[group].body}
            </p>
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} labels={copy.showcase} />
            ))}
          </div>
          <div className="hidden flex-col gap-28 md:flex">
            {products.map((product, position) => {
              const flip = row % 2 === 1;
              row += 1;
              return (
                <ProductPanel
                  key={product.slug}
                  product={product}
                  labels={copy.showcase}
                  flip={flip}
                  intro={position === 0 ? names[group].body : undefined}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
