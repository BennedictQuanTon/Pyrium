import { getCopy } from "@/content/copy";
import { groupOrder } from "@/content/products";
import type { Lang } from "./i18n";

export type MenuItem = { href: string; label: string; desc: string };

/**
 * The sub-pages under each top-level section, shared by the nav's hover menus and the tabs
 * under each page header. Products are split by industry; Services and About into three pages.
 */
export function getMenus(lang: Lang): Record<"/work" | "/services" | "/about", MenuItem[]> {
  const copy = getCopy(lang);
  const groups = copy.productsSection.groups;
  return {
    "/work": [
      { href: "/work", label: copy.menu.allProducts, desc: copy.menu.allProductsDesc },
      ...groupOrder.map((group) => ({
        href: `/work/industry/${group}`,
        label: groups[group].name,
        desc: groups[group].body,
      })),
    ],
    "/services": copy.menu.services,
    "/about": copy.menu.about,
  };
}
