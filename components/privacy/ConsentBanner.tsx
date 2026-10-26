"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Switch } from "@/components/sound/Settings";
import { getCopy } from "@/content/copy";
import { CONSENT_OPEN_EVENT, readConsent, writeConsent } from "@/lib/consent";
import { splitPath } from "@/lib/i18n";

const INTRO_DELAY_MS = 2600;
const DELAY_MS = 900;
const LEAVE_MS = 320;

const pill =
  "inline-flex h-10 items-center justify-center rounded-buttons px-4 text-[14px] font-medium tracking-[-0.01em] transition-colors";

/**
 * The privacy prompt: a glass card in the corner, in the same language as Preferences. It asks
 * once, after the intro has played, and never blocks the page. "Accept all" and "Necessary only"
 * carry equal weight; "Customize" unfolds per-category switches. Preferences can reopen it to
 * change the answer at any time.
 */
export function ConsentBanner() {
  const pathname = usePathname();
  const { lang } = splitPath(pathname);
  const t = getCopy(lang).consent;
  const [state, setState] = useState<"closed" | "open" | "leaving">("closed");
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const titleId = useId();
  const bodyId = useId();
  const detailsId = useId();

  useEffect(() => {
    let timer: number | undefined;
    if (!readConsent()) {
      const intro = !document.documentElement.classList.contains("welcome-skip");
      timer = window.setTimeout(() => setState("open"), intro ? INTRO_DELAY_MS : DELAY_MS);
    }
    const onOpen = () => {
      window.clearTimeout(timer);
      setAnalytics(readConsent()?.analytics ?? false);
      setCustom(true);
      setState("open");
    };
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (state !== "leaving") return;
    const timer = window.setTimeout(() => {
      setState("closed");
      setCustom(false);
    }, LEAVE_MS);
    return () => window.clearTimeout(timer);
  }, [state]);

  const decide = (value: boolean) => {
    writeConsent(value);
    setState("leaving");
  };

  if (state === "closed") return null;

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-describedby={bodyId}
      data-leaving={state === "leaving"}
      className="consent-panel glass glass-strong fixed right-4 bottom-4 left-4 z-50 p-5 sm:left-auto sm:right-5 sm:bottom-5 sm:w-[384px] sm:p-6"
    >
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="grid size-7 place-items-center rounded-full bg-ink/[0.06] text-ink"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="size-[15px]"
          >
            <path d="M12 3 5 6v5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3Z" />
            <path d="m9.5 12 1.8 1.8 3.4-3.6" />
          </svg>
        </span>
        <p className="eyebrow">{t.eyebrow}</p>
      </div>

      <h2
        id={titleId}
        className="mt-4 font-display text-[22px] leading-[1.2] tracking-[-0.02em] text-ink"
      >
        {t.title}
      </h2>
      <p id={bodyId} className="mt-2 text-[14px] leading-[1.55] text-graphite-ink">
        {t.body}
      </p>

      <div
        id={detailsId}
        className="consent-details grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        data-open={custom}
      >
        <div className="min-h-0 overflow-hidden" inert={!custom}>
          <div className="mt-4 flex flex-col rounded-[18px] bg-ink/[0.04] px-4 py-2">
            <div className="border-b border-ink/[0.07] py-2">
              <Switch label={t.necessary} checked disabled onChange={() => {}} />
              <p className="pb-1 text-[12px] leading-[1.45] text-stone">
                {t.necessaryHint} · {t.always}
              </p>
            </div>
            <div className="py-2">
              <Switch label={t.analytics} checked={analytics} onChange={setAnalytics} />
              <p className="pb-1 text-[12px] leading-[1.45] text-stone">{t.analyticsHint}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => decide(false)}
          className={`${pill} bg-ink/[0.06] text-ink hover:bg-ink/[0.1]`}
        >
          {t.reject}
        </button>
        <button
          type="button"
          onClick={() => decide(custom ? analytics : true)}
          className={`${pill} bg-ink text-snow hover:bg-graphite-ink`}
        >
          {custom ? t.save : t.accept}
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-[12px] text-stone">
        <p>{t.footnote}</p>
        {custom ? null : (
          <button
            type="button"
            aria-expanded={custom}
            aria-controls={detailsId}
            onClick={() => setCustom(true)}
            className="shrink-0 font-medium text-ink underline decoration-ink/20 underline-offset-[3px] transition-colors hover:decoration-signal"
          >
            {t.customize}
          </button>
        )}
      </div>
    </section>
  );
}
