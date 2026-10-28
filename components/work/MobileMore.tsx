"use client";

import { type ReactNode, useId, useState } from "react";

/** Below md the details fold behind one toggle; from md up they are always shown. */
export function MobileMore({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className="flex items-center justify-between gap-3 rounded-[16px] bg-ink/[0.04] px-4 py-3 text-left text-[14px] font-medium text-ink md:hidden"
      >
        {label}
        <span
          aria-hidden="true"
          className={`text-[18px] leading-none text-signal transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <div id={id} className={`${open ? "flex" : "hidden"} flex-col gap-6 md:flex`}>
        {children}
      </div>
    </div>
  );
}
