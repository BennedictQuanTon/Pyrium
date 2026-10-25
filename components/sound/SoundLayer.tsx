"use client";

import { useEffect } from "react";
import { audio } from "@/lib/audio";
import { type Prefs, readPrefs } from "@/lib/prefs";

const INTERACTIVE = "a, button, [role='tab'], summary, label:has(input)";

/**
 * Wires sound into the page. Browsers only allow audio after a user gesture, so the engine
 * starts on the first press or key (dismissing the intro counts) and the ambient music fades in
 * then, if the visitor has it on. Afterwards every interactive element gets a soft press sound
 * and a near-silent hover tick. Preference changes from the settings panel apply live.
 */
export function SoundLayer() {
  useEffect(() => {
    let prefs: Prefs = readPrefs();
    const engine = audio();

    const begin = () => {
      engine.start();
      engine.setVolume(prefs.musicVolume);
      if (prefs.music) engine.playMusic();
      window.removeEventListener("pointerdown", begin);
      window.removeEventListener("keydown", begin);
    };
    window.addEventListener("pointerdown", begin);
    window.addEventListener("keydown", begin);

    const onPress = (event: MouseEvent) => {
      if (!prefs.sfx || !engine.ready) return;
      const target = (event.target as Element | null)?.closest(INTERACTIVE);
      if (target && !target.hasAttribute("data-silent")) engine.press();
    };

    let lastHover: Element | null = null;
    let lastAt = 0;
    const onOver = (event: PointerEvent) => {
      if (!prefs.sfx || !engine.ready || event.pointerType !== "mouse") return;
      const target = (event.target as Element | null)?.closest(INTERACTIVE) ?? null;
      if (!target || target === lastHover) {
        if (!target) lastHover = null;
        return;
      }
      lastHover = target;
      const now = performance.now();
      if (now - lastAt < 90) return;
      lastAt = now;
      engine.hover();
    };

    const onPrefs = (event: Event) => {
      const next = (event as CustomEvent<Prefs>).detail;
      const musicChanged = next.music !== prefs.music;
      prefs = next;
      if (!engine.ready) return;
      engine.setVolume(next.musicVolume);
      if (musicChanged) {
        if (next.music) engine.playMusic();
        else engine.stopMusic();
      }
    };

    // Pause the music while the tab is hidden; resume when it returns.
    const onVisibility = () => {
      if (!engine.ready || !prefs.music) return;
      if (document.hidden) engine.stopMusic();
      else engine.playMusic();
    };

    document.addEventListener("click", onPress, true);
    document.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pyrium:prefs", onPrefs);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pointerdown", begin);
      window.removeEventListener("keydown", begin);
      document.removeEventListener("click", onPress, true);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pyrium:prefs", onPrefs);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
}
