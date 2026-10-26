import { MorphTarget } from "@/components/motion/PageTransition";
import type { Product } from "@/content/types";
import { ProductVideo } from "./ProductVideo";

type Props = {
  product: Product;
  active?: boolean;
  /** Give the frame a view-transition name so it morphs into the case-study hero. */
  morph?: boolean;
  className?: string;
};

/**
 * The product's film exactly as made: no stage, no bezel, nothing written on it. Every film sits
 * in the same 16:9 rounded frame, so all products read at one size.
 */
export function ProductFrame({ product, active = true, morph = false, className = "" }: Props) {
  const frame = (
    <figure className={`overflow-hidden rounded-[24px] ring-1 ring-ink/[0.06] ${className}`}>
      <ProductVideo product={product} active={active} />
    </figure>
  );
  return morph ? <MorphTarget name={`media-${product.slug}`}>{frame}</MorphTarget> : frame;
}
