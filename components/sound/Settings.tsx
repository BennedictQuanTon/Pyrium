"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { getCopy } from "@/content/copy";
import { audio } from "@/lib/audio";
import { openConsent } from "@/lib/consent";
import { type Lang, localePath, splitPath } from "@/lib/i18n";
import { defaultPrefs, type MotionLevel, type Prefs, readPrefs, writePrefs } from "@/lib/prefs";

const MOTION: MotionLevel[] = ["full", "subtle", "off"];

/** A segmented control whose thumb slides under the selected option. */
function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  const index = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  return (
    <fieldset
      aria-label={label}
      className="relative m-0 grid min-w-0 rounded-badges border-0 bg-ink/[0.06] p-1"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 rounded-badges bg-snow shadow-button transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: `calc((100% - 0.5rem) / ${options.length})`,
          transform: `translateX(${index * 100}%)`,
        }}
      />
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
          className={`relative z-10 rounded-badges px-2 py-1.5 text-[13px] font-medium transition-colors ${option.value === value ? "text-ink" : "text-stone hover:text-ink"}`}
        >
          {option.label}
        </button>
      ))}
    </fieldset>
  );
}

export function Switch({
  label,
  checked,
  onChange,
  disabled = false,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      data-silent
      className="flex w-full items-center justify-between gap-4 py-1.5 text-left text-[14px] text-ink disabled:cursor-default disabled:opacity-50"
    >
      {label}
      <span
        aria-hidden="true"
        className={`relative h-[22px] w-[38px] shrink-0 rounded-full transition-colors duration-300 ${checked ? "bg-signal" : "bg-ink/15"}`}
      >
        <span
          className={`absolute top-[2px] left-[2px] size-[18px] rounded-full bg-snow shadow-button transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${checked ? "translate-x-4" : ""}`}
        />
      </span>
    </button>
  );
}

/** Animated equalizer bars on the settings button while music plays. */
function Bars({ playing }: { playing: boolean }) {
  return (
    <span aria-hidden="true" className="flex h-3 items-end gap-[2px]">
      {[0, 1, 2].map((bar) => (
        <span
          key={bar}
          className={`w-[2px] rounded-full bg-current ${playing ? "eq-bar" : "opacity-40"}`}
          style={{
            animationDelay: `${bar * 0.18}s`,
            height: playing ? undefined : `${[5, 9, 6][bar]}px`,
          }}
        />
      ))}
    </span>
  );
}

/**
 * Preferences: language, motion level and sound. A glass popover anchored to a small button
 * beside the nav CTA. Choices are saved on this device (lib/prefs) and applied live: motion via
 * html[data-motion], sound via the SoundLayer, language by moving to the same page in the other
 * language. Escape or a click outside closes it.
 */
export function Settings({ onDark = false }: { onDark?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, path } = splitPath(pathname);
  const t = getCopy(lang).settings;
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);
  const [playing, setPlaying] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    setPrefs(readPrefs());
    const sync = () => setPlaying(audio().musicPlaying);
    const timer = window.setInterval(sync, 800);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panel.current?.contains(target) && !button.current?.contains(target)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const update = (next: Partial<Prefs>) => {
    const merged = { ...prefs, ...next };
    setPrefs(merged);
    writePrefs(merged);
  };

  const toggle = (key: "music" | "sfx", value: boolean) => {
    update({ [key]: value });
    // Play the toggle sound if interface sounds are (still) on after the change.
    const sfxOn = key === "sfx" ? value : prefs.sfx;
    if (sfxOn) audio().toggle(value);
  };

  const switchLang = (next: Lang) => {
    if (next === lang) return;
    router.push(localePath(next, path));
  };

  return (
    <div className="relative">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={t.open}
        data-silent
        onClick={() => {
          setOpen((value) => !value);
          if (prefs.sfx) {
            if (open) audio().close();
            else audio().open();
          }
        }}
        className={`inline-flex h-11 items-center gap-2 rounded-full px-3.5 transition-colors ${
          onDark ? "text-snow hover:bg-white/15" : "text-ink hover:bg-ink/[0.06]"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
          className="size-[18px]"
        >
          <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
          <circle cx="16" cy="7" r="2" />
          <circle cx="10" cy="17" r="2" />
        </svg>
        <Bars playing={playing} />
      </button>

      <div
        ref={panel}
        id={id}
        role="dialog"
        aria-label={t.title}
        hidden={!open}
        className="settings-panel glass glass-strong absolute top-[calc(100%+12px)] right-0 w-[min(320px,calc(100vw-2rem))] p-5"
      >
        <p className="mb-4 font-display text-[18px] text-ink">{t.title}</p>
        <div className="flex flex-col gap-5">
          <section className="flex flex-col gap-2">
            <p className="eyebrow">{t.language}</p>
            <Segmented
              label={t.language}
              value={lang}
              onChange={switchLang}
              options={[
                { value: "en", label: "English" },
                { value: "vi", label: "Tiếng Việt" },
              ]}
            />
          </section>
          <section className="flex flex-col gap-2">
            <p className="eyebrow">{t.motion}</p>
            <Segmented
              label={t.motion}
              value={prefs.motion}
              onChange={(motion) => update({ motion })}
              options={MOTION.map((value) => ({ value, label: t.motionLevels[value] }))}
            />
            <p className="text-[12px] text-stone">{t.motionHint[prefs.motion]}</p>
          </section>
          <section className="flex flex-col gap-1">
            <p className="eyebrow mb-1">{t.sound}</p>
            <Switch
              label={t.music}
              checked={prefs.music}
              onChange={(value) => toggle("music", value)}
            />
            <label
              className={`flex items-center gap-3 py-1 text-[13px] text-stone ${prefs.music ? "" : "opacity-40"}`}
            >
              <span className="w-[70px] shrink-0">{t.volume}</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={prefs.musicVolume}
                disabled={!prefs.music}
                onChange={(event) => update({ musicVolume: Number(event.target.value) })}
                className="range w-full"
              />
            </label>
            <Switch label={t.sfx} checked={prefs.sfx} onChange={(value) => toggle("sfx", value)} />
          </section>
          <div className="flex items-center justify-between gap-3 border-t border-ink/[0.07] pt-3 text-[11px] text-stone">
            <p>{t.saved}</p>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openConsent();
              }}
              className="font-medium text-ink underline decoration-ink/20 underline-offset-[3px] transition-colors hover:decoration-signal"
            >
              {t.privacy}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
