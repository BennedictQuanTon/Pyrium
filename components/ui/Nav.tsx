"use client";

import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Settings } from "@/components/sound/Settings";
import { getCopy } from "@/content/copy";
import { localePath, splitPath } from "@/lib/i18n";
import { PillButton, Wordmark } from "./Primitives";

/** Red dot under the current page; it pulses while that link's navigation is pending. */
function LinkMark({ active }: { active: boolean }) {
  const { pending } = useLinkStatus();
  return (
    <span
      aria-hidden="true"
      className={`absolute -bottom-2 left-1/2 size-1 -translate-x-1/2 rounded-full bg-signal transition-all duration-300 ${
        pending ? "animate-pulse opacity-100" : active ? "opacity-100" : "scale-0 opacity-0"
      }`}
    />
  );
}

/**
 * The nav is a floating glass pill. On the home page it starts transparent over the red arc
 * with the reverse lockup; everywhere else, and once the visitor scrolls, it settles into the
 * glass pill with the primary lockup. The preferences button sits beside the CTA. It carries
 * view-transition-name "site-header" so page transitions slide content beneath a header that
 * never moves.
 */
export function Nav() {
  const pathname = usePathname();
  const { lang, path } = splitPath(pathname);
  const copy = getCopy(lang);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overArc = path === "/" && !scrolled && !open;

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Close the mobile sheet on navigation.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, not a value read
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => path === href || path.startsWith(`${href}/`);

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4"
      style={{ viewTransitionName: "site-header" }}
    >
      <nav
        aria-label="Primary"
        className={`pointer-events-auto mx-auto mt-3 flex h-16 max-w-page items-center justify-between rounded-badges pl-6 pr-2 transition-[background,box-shadow] duration-500 ${
          overArc ? "bg-transparent" : "glass glass-strong"
        }`}
      >
        <Link
          href={localePath(lang, "/")}
          transitionTypes={["nav-back"]}
          aria-label="Pyrium"
          className="shrink-0"
        >
          <Wordmark variant={overArc ? "reverse" : "primary"} className="w-[118px] md:w-[150px]" />
        </Link>
        <ul className="hidden items-center gap-7 lg:flex">
          {copy.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={localePath(lang, item.href)}
                transitionTypes={["nav-forward"]}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative text-[14px] font-medium whitespace-nowrap transition-colors ${
                  overArc
                    ? "text-snow/85 hover:text-snow"
                    : isActive(item.href)
                      ? "text-ink"
                      : "text-stone hover:text-ink"
                }`}
              >
                {item.label}
                <LinkMark active={isActive(item.href)} />
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <Settings onDark={overArc} />
          <span className="hidden sm:block">
            <PillButton href="/contact" className="whitespace-nowrap">
              {copy.hero.navCta}
            </PillButton>
          </span>
          <button
            type="button"
            className={`inline-flex size-11 items-center justify-center rounded-full lg:hidden ${overArc ? "text-snow" : "text-ink"}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={`absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>
      <div
        id="mobile-menu"
        hidden={!open}
        className="glass glass-strong pointer-events-auto mx-auto mt-2 max-w-page p-3 lg:hidden"
      >
        <ul className="flex flex-col">
          {copy.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={localePath(lang, item.href)}
                transitionTypes={["nav-forward"]}
                className="flex items-center justify-between rounded-[18px] px-4 py-3.5 text-[17px] text-ink hover:bg-white/60"
              >
                {item.label}
                <span aria-hidden="true" className="text-stone">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <PillButton href="/contact" className="mt-2 w-full">
          {copy.hero.navCta}
        </PillButton>
      </div>
    </header>
  );
}
