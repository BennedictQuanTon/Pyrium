import { CountUp } from "@/components/motion/CountUp";
import type { Product } from "@/content/types";

/** A product's three impact numbers in plain language: what changes for the people using it. */
export function ProductMetrics({ product, size = "md" }: { product: Product; size?: "md" | "lg" }) {
  return (
    <dl className="grid grid-cols-3 gap-4 md:gap-6">
      {product.metrics.map((metric, index) => (
        <div
          key={metric.label}
          className="metric flex flex-col gap-2 border-t border-ink/10 pt-4"
          style={{ ["--d" as string]: `${index * 0.12}s` }}
        >
          <dt className="sr-only">{metric.label}</dt>
          <dd
            className={`font-display leading-none tracking-[-0.035em] whitespace-nowrap text-ink ${size === "lg" ? "text-[30px] sm:text-[44px] md:text-[60px]" : "text-[26px] sm:text-[32px] md:text-[40px]"}`}
          >
            <CountUp text={metric.value} className="tabular" />
          </dd>
          <dd className="text-[13px] leading-[1.45] text-graphite-ink md:text-[14px]">
            {metric.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
