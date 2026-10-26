/**
 * The visitor's privacy choice, kept in localStorage on this device only. Strictly necessary
 * storage (lib/prefs) needs no consent; analytics loads only after an explicit yes. Bumping
 * CONSENT_VERSION asks everyone again, e.g. when a new kind of measurement is added.
 */
export type Consent = { analytics: boolean; version: number; decidedAt: string };

export const CONSENT_KEY = "pyrium-consent";
export const CONSENT_VERSION = 1;
export const CONSENT_EVENT = "pyrium:consent";
export const CONSENT_OPEN_EVENT = "pyrium:consent-open";

export function readConsent(): Consent | null {
  try {
    const stored = JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "null") as Consent | null;
    return stored?.version === CONSENT_VERSION ? stored : null;
  } catch {
    return null;
  }
}

export function writeConsent(analytics: boolean): Consent {
  const consent = { analytics, version: CONSENT_VERSION, decidedAt: new Date().toISOString() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // Storage can be unavailable (private mode); the choice then lasts for the page only.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
  return consent;
}

/** Reopens the privacy panel, e.g. from Preferences. */
export function openConsent() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
