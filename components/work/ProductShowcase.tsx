"use client";

import { useEffect, useRef, useState } from "react";
import { DraftTag, PillButton } from "@/components/ui/Primitives";
import type { Copy } from "@/content/copy";
import type { Product } from "@/content/types";
import { ProductMetrics } from "./Metrics";
import { ProductFrame } from "./ProductFrame";
import { ProductLogo } from "./ProductLogo";

type Labels = Copy["showcase"];

/**
 * Apple-style product walk-through. On large screens the stage on the right stays pinned while
 * the story on the left scrolls; whichever story crosses the middle of the viewport becomes
 * active and the stage crossfades to its film. Each story leads with the product's own logo,
 * who it is for, what it changes in plain numbers, and its recognition — all outside the frame.
 * On small screens every story carries its own frame inline.
 */
export function ProductShowcase({ products, labels }: { products: Product[]; labels: Labels }) {
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const block of blocks.current) if (block) observer.observe(block);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-width grid gap-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <div className="flex flex-col">
        {products.map((product, index) => (
          <article
            key={product.slug}
            ref={(element) => {
              blocks.current[index] = element;
            }}
            data-index={index}
            aria-labelledby={`showcase-${product.slug}`}
            className={`flex flex-col justify-center gap-7 transition-opacity duration-700 lg:min-h-[92vh] ${
              active === index ? "lg:opacity-100" : "lg:opacity-30"
            }`}
          >
            <div className="lg:hidden">
              <ProductFrame product={product} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 id={`showcase-${product.slug}`} aria-label={product.name}>
                <ProductLogo slug={product.slug} size="md" />
              </h3>
              <span className="tabular text-[13px] text-stone">
                {String(index + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-display text-[28px] leading-[1.18] tracking-[-0.02em] text-ink md:text-[36px]">
                {product.tagline}
              </p>
              <p className="max-w-[48ch] text-[16px] leading-[1.6] text-stone">{product.oneLine}</p>
            </div>
            <div className="flex items-start gap-3 rounded-[18px] bg-ink/[0.035] px-4 py-3">
              <span className="eyebrow mt-[3px] shrink-0">{labels.builtFor}</span>
              <span className="text-[14px] text-ink">{product.audience}</span>
            </div>
            <ProductMetrics product={product} />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-stone">
              <span className="eyebrow">{labels.recognition}</span>
              <span>{product.event}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular">{product.period}</span>
              {product.result ? (
                <span className="rounded-badges bg-signal px-3 py-1 text-[12px] font-medium text-snow">
                  {product.result}
                </span>
              ) : null}
            </div>
            <blockquote className="glass flex flex-col gap-3 p-5 md:p-6">
              <p className="text-[15px] leading-[1.6] text-midnight">“{product.review.quote}”</p>
              <footer className="flex items-center justify-between gap-3">
                <span className="text-[12px] text-stone">{product.review.role}</span>
                {product.review.draft ? <DraftTag label={labels.draft} /> : null}
              </footer>
            </blockquote>
            <div className="flex flex-wrap gap-3">
              <PillButton href={`/work/${product.slug}`}>{labels.readCase}</PillButton>
              <PillButton href={product.demo} variant="ghost">
                {labels.tryLive}
              </PillButton>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-[max(6rem,calc(50vh-20rem))]">
          <div className="relative">
            {products.map((product, index) => (
              <div
                key={product.slug}
                data-active={active === index}
                aria-hidden={active !== index}
                className={`stage-layer ${index === 0 ? "relative" : "absolute inset-0"}`}
              >
                <ProductFrame product={product} active={active === index} morph />
              </div>
            ))}
          </div>
          {/* Progress rail: one segment per product, the active one in signal red. */}
          <ol className="mt-6 flex gap-2" aria-label="Products">
            {products.map((product, index) => (
              <li key={product.slug} className="flex-1">
                <button
                  type="button"
                  onClick={() =>
                    blocks.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })
                  }
                  className="group flex w-full flex-col gap-2 text-left"
                  aria-current={active === index ? "step" : undefined}
                >
                  <span className="relative h-[2px] w-full overflow-hidden rounded-full bg-ink/10">
                    <span
                      className={`absolute inset-0 origin-left bg-signal transition-transform duration-700 ${active === index ? "scale-x-100" : "scale-x-0"}`}
                    />
                  </span>
                  <span
                    className={`text-[12px] font-medium transition-colors ${active === index ? "text-ink" : "text-stone group-hover:text-ink"}`}
                  >
                    {product.name}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
