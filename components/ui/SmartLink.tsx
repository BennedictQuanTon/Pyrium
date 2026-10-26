"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { localePath, splitPath } from "@/lib/i18n";

type Direction = "forward" | "back";

export type SmartLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Page-transition direction for internal routes. */
  direction?: Direction;
  "aria-label"?: string;
  "aria-current"?: "page";
  title?: string;
};

/**
 * One link for the whole site. Internal routes go through next/link with a transition type (so
 * <PageTransition> knows which way to move) and keep the current language; in-page anchors stay
 * plain; external links and mailto open outside the site.
 */
export function SmartLink({
  href,
  children,
  className = "",
  direction = "forward",
  ...rest
}: SmartLinkProps) {
  const { lang } = splitPath(usePathname());
  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className={className}
        {...rest}
      >
        {children}
      </a>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link
      href={localePath(lang, href)}
      transitionTypes={[direction === "back" ? "nav-back" : "nav-forward"]}
      className={className}
      {...rest}
    >
      {children}
    </Link>
  );
}
