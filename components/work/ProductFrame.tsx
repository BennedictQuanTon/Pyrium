import type { CSSProperties } from "react";
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
 * The product's film on a quiet stage. Rule: nothing is ever written on top of the picture —
 * every label, event and result lives outside the frame. The stage is the product's
 * open-licence context photo, blurred and washed into the page fog; the film sits in a
 * graphite bezel with a hairline highlight, lifted by a soft glow in the product's own colour.
 */
export function ProductFrame({ product, active = true, morph = false, className = "" }: Props) {
  const frame = (
    <figure
      className={`product-stage relative isolate overflow-hidden rounded-[36px] ${className}`}
      style={{ "--accent": product.accent } as CSSProperties}
    >
      {/* biome-ignore lint/performance/noImgElement: decorative open-licence photo behind the film */}
      <img
        src={product.photo}
        alt=""
        loading="lazy"
        className="photo-mono absolute inset-0 -z-10 size-full scale-110 object-cover opacity-60 blur-[3px]"
      />
      <span aria-hidden="true" className="product-stage-wash absolute inset-0 -z-10" />
      <div className="relative px-[6%] pt-[7%] pb-[9%]">
        <span
          aria-hidden="true"
          className="product-glow absolute inset-x-[14%] bottom-[4%] h-[38%] -z-10"
        />
        <div className="device">
          <div className="device-screen">
            <ProductVideo product={product} active={active} />
          </div>
        </div>
      </div>
    </figure>
  );
  return morph ? <MorphTarget name={`media-${product.slug}`}>{frame}</MorphTarget> : frame;
}
