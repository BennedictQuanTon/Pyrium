import { MorphTarget } from "@/components/motion/PageTransition";
import type { Product } from "@/content/types";
import { ProductVideo } from "./ProductVideo";

type Props = {
  product: Product;
  active?: boolean;
  /** Give the frame a view-transition name so it morphs into the case-study hero. */
  morph?: boolean;
  /** Show the event chip in the corner. */
  caption?: boolean;
  className?: string;
};

/**
 * The product's film set in a dark glass bezel, floating over its open-licence context photo
 * (rendered in monochrome). Used by the home showcase, the products index and the case-study
 * hero, which share a view-transition name so the frame morphs between pages.
 */
export function ProductFrame({
  product,
  active = true,
  morph = false,
  caption = true,
  className = "",
}: Props) {
  const frame = (
    <figure className={`relative overflow-hidden rounded-[32px] bg-deep-slate ${className}`}>
      {/* biome-ignore lint/performance/noImgElement: decorative open-licence photo under glass */}
      <img
        src={product.photo.src}
        alt=""
        loading="lazy"
        className="photo-mono absolute inset-0 size-full scale-105 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-midnight/20 via-midnight/35 to-midnight/70"
      />
      <div className="relative p-4 sm:p-7 lg:p-10">
        <div className="glass-dark rounded-[22px] p-1.5 sm:p-2">
          <div className="overflow-hidden rounded-[16px]">
            <ProductVideo product={product} active={active} />
          </div>
        </div>
      </div>
      {caption ? (
        <figcaption className="relative flex flex-wrap items-center justify-between gap-2 px-4 pb-4 sm:px-7 sm:pb-6 lg:px-10 lg:pb-8">
          <span className="glass-dark rounded-badges px-3.5 py-1.5 text-[12px] font-medium">
            {product.event}
          </span>
          {product.result ? (
            <span className="rounded-badges bg-signal px-3.5 py-1.5 text-[12px] font-medium text-snow">
              {product.result}
            </span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
  return morph ? <MorphTarget name={`media-${product.slug}`}>{frame}</MorphTarget> : frame;
}
