import { type ReactNode, ViewTransition } from "react";

/**
 * Wraps a page's content so route changes animate by direction. Links tagged "nav-forward"
 * (deeper into the site) lift the old page away and raise the new one through a rounded
 * aperture; "nav-back" mirrors it. Untyped transitions (browser back, refresh) don't animate.
 * Each page.tsx renders its own wrapper: layouts persist, so enter / exit never fire there.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{ "nav-forward": "page-forward", "nav-back": "page-back", default: "none" }}
      exit={{ "nav-forward": "page-forward", "nav-back": "page-back", default: "none" }}
      default="none"
    >
      <main id="main">{children}</main>
    </ViewTransition>
  );
}

/** Shared-element morph between a product's card media and its case-study hero. */
export function MorphTarget({ name, children }: { name: string; children: ReactNode }) {
  return (
    <ViewTransition name={name} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
