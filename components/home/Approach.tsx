"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/Primitives";
import { approach } from "@/content/copy";
import type { Product } from "@/content/types";

/**
 * The method in one picture: a red rail draws across three nodes — model proposes, code
 * decides, people approve — and a segmented control swaps in how each product splits the
 * work. The panel text crossfades on change; the rail itself never moves.
 */
export function Approach({ products }: { products: Product[] }) {
  const [current, setCurrent] = useState(0);
  const product = products[current];

  return (
    <section id="approach" className="section relative overflow-hidden bg-snow">
      <div className="page-width flex flex-col gap-14">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow={approach.eyebrow}
              title={approach.title}
              body={approach.body}
            />
          </Reveal>
          <Reveal delay={1}>
            <div
              role="tablist"
              aria-label="Show the split for a product"
              className="relative inline-grid grid-cols-4 rounded-badges bg-fog p-1 shadow-[inset_0_0_0_1px_rgba(17,17,17,0.05)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/4)] rounded-badges bg-snow shadow-button transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `translateX(${current * 100}%)` }}
              />
              {products.map((item, index) => (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  aria-selected={current === index}
                  aria-controls="approach-panel"
                  onClick={() => setCurrent(index)}
                  className={`relative z-10 whitespace-nowrap px-3 py-2 text-[13px] font-medium transition-colors sm:px-5 ${current === index ? "text-ink" : "text-stone hover:text-ink"}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <div className="relative">
            {/* The rail runs through the node centres on wide screens. */}
            <div
              aria-hidden="true"
              className="absolute top-[11px] right-[16.66%] left-[16.66%] hidden h-px bg-ink/10 md:block"
            >
              <span className="rail block h-full bg-signal" />
            </div>
            <ol id="approach-panel" role="tabpanel" className="grid gap-10 md:grid-cols-3 md:gap-6">
              {approach.steps.map((step, index) => (
                <li
                  key={step.key}
                  className="flex flex-col items-start gap-5 md:items-center md:text-center"
                >
                  <span
                    aria-hidden="true"
                    className="rail-node relative z-10 size-[22px] rounded-full"
                    style={{ ["--d" as string]: `${index * 0.6}s` }}
                  />
                  <div className="flex flex-col gap-2 md:items-center">
                    <span className="tabular text-[12px] text-stone">0{index + 1}</span>
                    <h3 className="text-heading-sm">{step.name}</h3>
                    <p className="max-w-[32ch] text-[15px] text-stone">{step.detail}</p>
                  </div>
                  <div className="glass w-full p-5 text-left md:p-6">
                    <p className="eyebrow mb-2">In {product.name}</p>
                    <p
                      key={product.slug}
                      className="animate-[fade-swap_0.6s_cubic-bezier(0.16,1,0.3,1)] text-[15px] leading-[1.55] text-midnight"
                    >
                      {product.split[step.key]}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
