import { readConsent } from "@/lib/consent";

/**
 * What the site remembers between visits, and where. With personalization consent, preferences
 * and visit history live in localStorage and survive the session; without it, preferences live
 * in sessionStorage for this visit only and no history is kept.
 */
export const PREFS_KEY = "pyrium-prefs";
export const HISTORY_KEY = "pyrium-history";
const SESSION_KEY = "pyrium-session";
const RECENT_LIMIT = 4;

export type Visit = { path: string; title: string };
export type History = { last: Visit & { at: string }; recent: Visit[] };

export function remembers(): boolean {
  return readConsent()?.personalization ?? false;
}

/** Storage for things that persist only with consent. */
export function memoryStore(): Storage {
  return remembers() ? localStorage : sessionStorage;
}

/** Moves remembered data to match a new choice: kept on yes, forgotten on no. */
export function applyMemoryChoice(personalization: boolean) {
  try {
    const prefs = localStorage.getItem(PREFS_KEY) ?? sessionStorage.getItem(PREFS_KEY);
    if (personalization) {
      if (prefs) localStorage.setItem(PREFS_KEY, prefs);
      sessionStorage.removeItem(PREFS_KEY);
    } else {
      if (prefs) sessionStorage.setItem(PREFS_KEY, prefs);
      localStorage.removeItem(PREFS_KEY);
      localStorage.removeItem(HISTORY_KEY);
    }
  } catch {
    // Storage unavailable: nothing was persisted to move.
  }
}

export function readHistory(): History | null {
  if (!remembers()) return null;
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "null") as History | null;
  } catch {
    return null;
  }
}

export function recordVisit(visit: Visit) {
  if (!remembers()) return;
  try {
    const previous = readHistory();
    const recent = [visit, ...(previous?.recent ?? []).filter((item) => item.path !== visit.path)];
    const history: History = {
      last: { ...visit, at: new Date().toISOString() },
      recent: recent.slice(0, RECENT_LIMIT),
    };
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // Storage full or unavailable: the visit simply isn't remembered.
  }
}

/** True once per browser session: the first page view of a new visit. */
export function startsSession(): boolean {
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return false;
    sessionStorage.setItem(SESSION_KEY, "1");
    return true;
  } catch {
    return false;
  }
}
