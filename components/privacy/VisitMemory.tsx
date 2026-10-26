"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SmartLink } from "@/components/ui/SmartLink";
import { getCopy } from "@/content/copy";
import { splitPath } from "@/lib/i18n";
import { readHistory, recordVisit, startsSession, type Visit } from "@/lib/memory";

const INTRO_DELAY_MS = 2600;
const DELAY_MS = 900;
const LEAVE_MS = 320;

function pageTitle() {
  return document.title.replace(/\s*·\s*Pyrium$/, "").trim();
}

/**
 * Remembers where a visitor was, with personalization consent only, and on their next visit
 * offers a quiet way back: a glass card in the corner linking to the last page they read, in
 * the language they are reading now. Home pages are not remembered; there is nothing to pick up.
 */
export function VisitMemory() {
  const pathname = usePathname();
  const t = getCopy(splitPath(pathname).lang).welcome;
  const [resume, setResume] = useState<Visit | null>(null);
  const [state, setState] = useState<"closed" | "open" | "leaving">("closed");
  const newSession = useRef<boolean | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: decided once, on the first page view
  useEffect(() => {
    newSession.current ??= startsSession();
    if (!newSession.current) return;
    const last = readHistory()?.last;
    if (!last || last.path === splitPath(pathname).path) return;
    setResume({ path: last.path, title: last.title });
    const intro = !document.documentElement.classList.contains("welcome-skip");
    const timer = window.setTimeout(() => setState("open"), intro ? INTRO_DELAY_MS : DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setState((current) => (current === "open" ? "leaving" : current));
    const { path } = splitPath(pathname);
    if (path === "/") return;
    // The new page's <title> lands just after the route commits.
    const timer = window.setTimeout(() => recordVisit({ path, title: pageTitle() }), 400);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (state !== "leaving") return;
    const timer = window.setTimeout(() => setState("closed"), LEAVE_MS);
    return () => window.clearTimeout(timer);
  }, [state]);

  if (state === "closed" || !resume) return null;

  return (
    <aside
      aria-label={t.title}
      data-leaving={state === "leaving"}
      className="consent-panel glass glass-strong fixed right-4 bottom-4 left-4 z-50 flex items-start gap-3.5 p-4 sm:left-auto sm:right-5 sm:bottom-5 sm:w-[360px] sm:p-5"
    >
      <span
        aria-hidden="true"
        className="grid size-9 shrink-0 place-items-center rounded-full bg-ink/[0.06] text-ink"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="size-[16px]"
        >
          <path d="M4 12a8 8 0 1 0 2.4-5.7" />
          <path d="M4 4v4h4" />
          <path d="M12 8v4l2.5 2" />
        </svg>
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-[17px] leading-[1.25] text-ink">{t.title}</p>
        <p className="mt-1 text-[13px] text-stone">{t.body}</p>
        <SmartLink
          href={resume.path}
          className="group mt-3 inline-flex max-w-full items-center gap-2 rounded-buttons bg-ink px-4 py-2 text-[14px] font-medium text-snow transition-colors hover:bg-graphite-ink"
        >
          <span className="truncate">{resume.title}</span>
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </SmartLink>
      </div>
      <button
        type="button"
        aria-label={t.dismiss}
        onClick={() => setState("leaving")}
        className="-mt-1 -mr-1 grid size-8 shrink-0 place-items-center rounded-full text-stone transition-colors hover:bg-ink/[0.06] hover:text-ink"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
          className="size-[14px]"
        >
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </aside>
  );
}
