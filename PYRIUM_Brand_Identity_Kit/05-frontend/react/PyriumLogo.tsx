import React from "react";

type Props = {
  variant?: "primary" | "reverse";
  width?: number | string;
  className?: string;
  alt?: string;
};

/** Uses the supplied brand artwork as an image for maximum visual fidelity. */
export function PyriumLogo({
  variant = "primary",
  width = 280,
  className,
  alt = "PYRIUM — Private AI. Real-world impact.",
}: Props) {
  const src = variant === "reverse"
    ? "/pyrium/logos/PYRIUM-Primary-Reversed.png"
    : "/pyrium/logos/PYRIUM-Primary-Transparent.png";

  return <img src={src} width={width} className={className} alt={alt} />;
}
