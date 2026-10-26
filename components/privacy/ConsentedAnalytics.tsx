"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, type Consent, readConsent } from "@/lib/consent";

/** Vercel Web Analytics and Speed Insights, mounted only once the visitor has said yes. */
export function ConsentedAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(readConsent()?.analytics ?? false);
    const onChange = (event: Event) => setAllowed((event as CustomEvent<Consent>).detail.analytics);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!allowed) return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
