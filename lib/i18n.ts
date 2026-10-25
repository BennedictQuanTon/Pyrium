/**
 * Two languages. English lives at the bare paths ("/", "/work"), Vietnamese under "/vi". The
 * app renders every page from app/[lang]/; next.config.ts rewrites un-prefixed paths to /en, so
 * English URLs stay clean.
 */
export const langs = ["en", "vi"] as const;
export type Lang = (typeof langs)[number];

export function isLang(value: string): value is Lang {
  return (langs as readonly string[]).includes(value);
}

/** The public URL of an internal path ("/work", "/#problem") in a language. */
export function localePath(lang: Lang, path: string): string {
  if (lang === "en") return path;
  if (path === "/") return "/vi";
  if (path.startsWith("/#")) return `/vi${path.slice(1)}`;
  return `/vi${path}`;
}

/** Splits a visible pathname into its language and the language-free path. */
export function splitPath(pathname: string): { lang: Lang; path: string } {
  if (pathname === "/vi" || pathname.startsWith("/vi/")) {
    return { lang: "vi", path: pathname.slice(3) || "/" };
  }
  // The internal English path can surface after the /en rewrite.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return { lang: "en", path: pathname.slice(3) || "/" };
  }
  return { lang: "en", path: pathname || "/" };
}
