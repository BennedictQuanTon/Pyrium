"use client";

import { useEffect, useState } from "react";
import { hero, nav } from "@/content/copy";
import { PillButton, Wordmark } from "./Primitives";

/**
 * The nav as a floating rounded pill in both states, like the reference: over the hero it
 * sits on the red arc with the reverse (white + red) lockup and white links; once the
 * visitor scrolls, it settles into the white pill with the primary lockup. Scroll state is
 * tracked in a passive listener; both states keep AA contrast.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4">
      <nav
        aria-label="Primary"
        className={`pointer-events-auto mx-auto flex h-16 max-w-page items-center justify-between rounded-badges pl-7 pr-2 transition-all duration-300 ${
          scrolled ? "mt-3 bg-snow shadow-subtle" : "bg-transparent"
        }`}
      >
        <a href="#main" aria-label="Pyrium, back to top" className="shrink-0">
          {/* Narrower on phones so the CTA pill stays on one line beside it. */}
          <Wordmark variant={scrolled ? "primary" : "reverse"} className="w-[132px] md:w-[180px]" />
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`text-[14px] transition-colors ${scrolled ? "text-stone hover:text-ink" : "text-snow/85 hover:text-snow"}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        {/* The nav keeps a CTA in both states, but with its own label and target: the hero's
            "Talk to our team" jumps to the section, this jumps straight to the form so the
            two pills never read as a duplicate. */}
        <PillButton href="#contact-form">{hero.navCta}</PillButton>
      </nav>
    </header>
  );
}
