"use client";

import { useEffect, useRef, useState } from "react";
import { DraftTag, PillButton } from "@/components/ui/Primitives";
import type { Product } from "@/content/types";
import { ProductMetrics } from "./Metrics";
import { ProductFrame } from "./ProductFrame";

/**
 * Apple-style product walk-through. On large screens the stage on the right stays pinned while
 * the story on the left scrolls; whichever story block crosses the middle of the viewport
 * becomes active, and the stage crossfades to its film. On small screens every block carries
 * its own frame inline. Only the pinned stage carries view-transition names, so each product's
 * frame morphs into its case study.
 */
export function ProductShowcase({ products }: { products: Product[] }) {
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
    <div className="page-width grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <div className="flex flex-col">
        {products.map((product, index) => (
          <article
            key={product.slug}
            ref={(element) => {
              blocks.current[index] = element;
            }}
            data-index={index}
            aria-labelledby={`showcase-${product.slug}`}
            className={`flex flex-col justify-center gap-7 py-6 transition-opacity duration-700 lg:min-h-[88vh] lg:py-0 ${
              active === index ? "lg:opacity-100" : "lg:opacity-35"
            }`}
          >
            <div className="lg:hidden">
              <ProductFrame product={product} />
            </div>
            <div className="flex items-center gap-3">
              <span className="tabular text-[13px] font-medium text-signal">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-8 bg-ink/15" aria-hidden="true" />
              <span className="eyebrow">{product.category}</span>
            </div>
            <div className="flex flex-col gap-3">
              <h3 id={`showcase-${product.slug}`} className="text-heading md:text-heading-lg">
                {product.name}
              </h3>
              <p className="font-display text-[20px] leading-[1.35] text-graphite-ink md:text-[22px]">
                {product.tagline}
              </p>
              <p className="max-w-[46ch] text-[15px] text-stone">{product.oneLine}</p>
            </div>
            <ProductMetrics product={product} />
            <blockquote className="glass flex flex-col gap-3 p-5 md:p-6">
              <p className="text-[15px] leading-[1.55] text-midnight">“{product.review.quote}”</p>
              <footer className="flex items-center justify-between gap-3">
                <span className="text-[12px] text-stone">{product.review.role}</span>
                {product.review.draft ? <DraftTag /> : null}
              </footer>
            </blockquote>
            <div className="flex flex-wrap gap-3">
              <PillButton href={`/work/${product.slug}`}>Read the case study</PillButton>
              <PillButton href={product.demo} variant="ghost">
                Live demo
              </PillButton>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-[max(6rem,calc(50vh-22rem))]">
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
