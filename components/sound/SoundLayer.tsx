"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCopy } from "@/content/copy";
import { audio } from "@/lib/audio";
import { splitPath } from "@/lib/i18n";
import { type Prefs, readPrefs } from "@/lib/prefs";

const INTERACTIVE = "a, button, [role='tab'], summary, label:has(input)";
const GESTURES = ["pointerdown", "keydown", "touchend"] as const;

/**
 * Wires sound into the site. It lives in the root layout, so it never unmounts and the music
 * plays straight through every page change and language switch.
 *
 * On load it asks the browser to start the ambient music right away. Browsers only allow that
 * for sites the visitor already engages with; otherwise the music fades in on the first press,
 * tap or key, and a small "sound" chip in the corner says so. Every interactive element gets a
 * soft press sample and a near-silent hover tick; preference changes apply live.
 */
export function SoundLayer() {
  const { lang } = splitPath(usePathname());
  const t = getCopy(lang).settings;
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    let prefs: Prefs = readPrefs();
    const engine = audio();
    engine.setVolume(prefs.musicVolume);

    const begin = async () => {
      const ok = await engine.unlock();
      if (!ok) return false;
      if (prefs.music) engine.playMusic();
      setBlocked(false);
      for (const type of GESTURES) window.removeEventListener(type, onGesture);
      return true;
    };
    const onGesture = () => {
      begin();
    };

    // Try to autoplay; if the browser holds the context suspended, wait for a gesture.
    for (const type of GESTURES) window.addEventListener(type, onGesture);
    begin().then((ok) => {
      if (!ok && prefs.music) setBlocked(true);
    });

    const onPress = (event: MouseEvent) => {
      if (!prefs.sfx) return;
      const target = (event.target as Element | null)?.closest(INTERACTIVE);
      if (target && !target.hasAttribute("data-silent")) engine.press();
    };

    let lastHover: Element | null = null;
    let lastAt = 0;
    const onOver = (event: PointerEvent) => {
      if (!prefs.sfx || event.pointerType !== "mouse") return;
      const target = (event.target as Element | null)?.closest(INTERACTIVE) ?? null;
      if (!target || target === lastHover) {
        if (!target) lastHover = null;
        return;
      }
      lastHover = target;
      const now = performance.now();
      if (now - lastAt < 120) return;
      lastAt = now;
      engine.hover();
    };

    const onPrefs = (event: Event) => {
      const next = (event as CustomEvent<Prefs>).detail;
      const musicChanged = next.music !== prefs.music;
      prefs = next;
      engine.setVolume(next.musicVolume);
      if (!musicChanged) return;
      if (next.music) {
        begin();
      } else {
        engine.stopMusic();
        setBlocked(false);
      }
    };

    // Fade out while the tab is hidden; fade back in when it returns.
    const onVisibility = () => {
      if (!prefs.music || !engine.running) return;
      if (document.hidden) engine.stopMusic();
      else engine.playMusic();
    };

    document.addEventListener("click", onPress, true);
    document.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pyrium:prefs", onPrefs);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      for (const type of GESTURES) window.removeEventListener(type, onGesture);
      document.removeEventListener("click", onPress, true);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pyrium:prefs", onPrefs);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (!blocked) return null;
  return (
    <button
      type="button"
      data-silent
      onClick={() => setBlocked(false)}
      className="sound-chip glass glass-strong fixed bottom-5 left-5 z-50 inline-flex items-center gap-2.5 rounded-badges px-4 py-2.5 text-[13px] font-medium text-ink"
    >
      <span aria-hidden="true" className="flex h-3 items-end gap-[2px]">
        {[0, 1, 2].map((bar) => (
          <span
            key={bar}
            className="eq-bar w-[2px] rounded-full bg-signal"
            style={{ animationDelay: `${bar * 0.18}s` }}
          />
        ))}
      </span>
      {t.soundPrompt}
    </button>
  );
}
