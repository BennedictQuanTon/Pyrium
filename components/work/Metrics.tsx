import { CountUp } from "@/components/motion/CountUp";
import type { Copy } from "@/content/copy";
import type { Product } from "@/content/types";

type Labels = Copy["showcase"];

/**
 * The three outputs every product reports — who tested it, the money it is expected to save,
 * its core result — as three tiles. The saving tile is tinted and estimates carry an "est."
 * mark.
 */
export function ProductOutputs({
  product,
  labels,
  size = "md",
}: {
  product: Product;
  labels: Labels;
  size?: "md" | "lg";
}) {
  const tiles = [
    { key: "testers", label: labels.testers, metric: product.outputs.testers },
    { key: "saving", label: labels.saving, metric: product.outputs.saving },
    { key: "core", label: labels.core, metric: product.outputs.core },
  ] as const;
  return (
    <dl className="grid grid-cols-3 gap-2.5 md:gap-3">
      {tiles.map((tile) => (
        <div
          key={tile.key}
          className={`output-tile flex flex-col gap-2 rounded-[20px] p-4 md:p-5 ${tile.key === "saving" ? "bg-signal/[0.07]" : "bg-ink/[0.04]"}`}
        >
          <dt className="eyebrow text-[10px] tracking-[0.12em] md:text-[11px]">{tile.label}</dt>
          <dd
            className={`flex flex-col items-start gap-1 font-display leading-none tracking-[-0.04em] ${tile.key === "saving" ? "text-signal" : "text-ink"} ${size === "lg" ? "text-[24px] sm:text-[40px] md:text-[52px]" : "text-[20px] sm:text-[28px] md:text-[32px]"}`}
          >
            <CountUp text={tile.metric.value} className="tabular break-words" />
            {tile.metric.estimate ? (
              <a
                href="#estimate-note"
                className="rounded-badges bg-signal/10 px-1.5 py-0.5 font-sans text-[10px] font-medium tracking-normal text-signal"
              >
                {labels.est}
              </a>
            ) : null}
          </dd>
          <dd className="text-[12px] leading-[1.45] text-graphite-ink md:text-[13px]">
            {tile.metric.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
