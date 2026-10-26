"use client";

import { useEffect, useState } from "react";

type Item = { id: string; name: string };

/**
 * The four industry groups as one balanced row of equal cells, each with its number and name. The cell for the group in view fills in ink as the page scrolls.
 */
export function GroupNav({ items, label }: { items: Item[]; label: string }) {
  const [current, setCurrent] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(`group-${item.id}`))
      .filter((element): element is HTMLElement => element !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(entry.target.id.replace("group-", ""));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="page-width z-20 md:sticky md:top-[88px]">
      <ul className="glass glass-strong grid grid-cols-2 gap-1 rounded-[22px] p-1.5 md:grid-cols-4">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#group-${item.id}`}
              aria-current={current === item.id}
              className="group-cell relative flex h-full flex-col gap-3 overflow-hidden rounded-[16px] px-4 py-3.5 text-graphite-ink md:px-5"
            >
              <span className="flex items-center justify-between text-[12px]">
                <span className="tabular font-medium text-signal">0{index + 1}</span>
                <span aria-hidden="true" className="opacity-50">
                  ↓
                </span>
              </span>
              <span className="text-[14px] leading-[1.25] font-medium md:text-[15px]">
                {item.name}
              </span>
              <span
                aria-hidden="true"
                className="group-cell-rule absolute inset-x-4 bottom-0 h-[2px] rounded-full bg-signal md:inset-x-5"
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
