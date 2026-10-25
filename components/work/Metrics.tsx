import { CountUp } from "@/components/motion/CountUp";
import type { Product } from "@/content/types";

/** A product's three headline numbers, each with how it was measured. */
export function ProductMetrics({ product, size = "md" }: { product: Product; size?: "md" | "lg" }) {
  return (
    <dl className="grid grid-cols-3 gap-4 md:gap-6">
      {product.metrics.map((metric) => (
        <div key={metric.label} className="flex flex-col gap-1.5 border-t border-ink/10 pt-4">
          <dt className="sr-only">{metric.label}</dt>
          <dd
            className={`font-display leading-none tracking-[-0.03em] text-ink ${size === "lg" ? "text-[34px] md:text-[56px]" : "text-[28px] md:text-[38px]"}`}
          >
            <CountUp text={metric.value} className="tabular" />
          </dd>
          <dd className="text-[13px] font-medium text-ink md:text-[14px]">{metric.label}</dd>
          <dd className="text-[12px] leading-[1.4] text-stone">{metric.context}</dd>
        </div>
      ))}
    </dl>
  );
}
