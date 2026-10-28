"use client";

import { type MouseEvent, useEffect, useState } from "react";

type Item = { id: string; name: string };

const MOBILE = "(max-width: 767px)";

/**
 * The four industry groups as one balanced row of equal cells, each with its number and name.
 * From md up the cell for the group in view fills in ink as the page scrolls. Below md the row
 * is a tab bar: only the chosen group is shown, so the page stays short.
 */
export function GroupNav({ items, label }: { items: Item[]; label: string }) {
  const [current, setCurrent] = useState(items[0]?.id);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(MOBILE);
    const sync = () => setMobile(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (mobile) return;
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
  }, [items, mobile]);

  useEffect(() => {
    for (const item of items) {
      const section = document.getElementById(`group-${item.id}`);
      if (!section) continue;
      if (mobile && item.id !== current) section.dataset.off = "true";
      else delete section.dataset.off;
    }
  }, [items, mobile, current]);

  const choose = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!mobile) return;
    event.preventDefault();
    setCurrent(id);
  };

  return (
    <nav aria-label={label} className="page-width z-20 md:sticky md:top-[88px]">
      <ul className="glass glass-strong grid grid-cols-2 gap-1 rounded-[22px] p-1.5 md:grid-cols-4">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#group-${item.id}`}
              aria-current={current === item.id}
              onClick={(event) => choose(event, item.id)}
              className="group-cell relative flex h-full flex-col gap-1.5 overflow-hidden rounded-[16px] px-3.5 py-2.5 text-graphite-ink md:gap-3 md:px-5 md:py-3.5"
            >
              <span className="flex items-center justify-between text-[12px]">
                <span className="tabular font-medium text-signal">0{index + 1}</span>
                <span aria-hidden="true" className="hidden opacity-50 md:inline">
                  ↓
                </span>
              </span>
              <span className="text-[13px] leading-[1.25] font-medium md:text-[15px]">
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
