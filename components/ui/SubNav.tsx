import type { MenuItem } from "@/lib/menus";
import { SmartLink } from "./SmartLink";

/** The sibling pages of a section as a row of pills under the page header; the current one is filled. */
export function SubNav({
  items,
  current,
}: {
  items: Pick<MenuItem, "href" | "label">[];
  current: string;
}) {
  return (
    <nav aria-label="Section" className="no-scrollbar -mx-4 overflow-x-auto px-4">
      <ul className="flex w-max gap-1.5 rounded-badges bg-ink/[0.04] p-1.5">
        {items.map((item) => {
          const active = item.href === current;
          return (
            <li key={item.href}>
              <SmartLink
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`block rounded-badges px-4 py-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-300 ${
                  active ? "bg-ink text-snow" : "text-graphite-ink hover:bg-snow hover:text-ink"
                }`}
              >
                {item.label}
              </SmartLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
