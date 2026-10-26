"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { splitPath } from "@/lib/i18n";
import { motionLevel } from "@/lib/prefs";

const WORDS = {
  en: {
    requests: "Requests",
    router: "Router",
    local: "Small local model",
    large: "Large model",
    largeNote: "only when a task needs it",
    cloud: "Cloud-only",
    routed: "Routed",
    tokens: "API tokens per task",
  },
  vi: {
    requests: "Yêu cầu",
    router: "Bộ định tuyến",
    local: "Mô hình nhỏ cục bộ",
    large: "Mô hình lớn",
    largeNote: "chỉ khi tác vụ cần",
    cloud: "Đám mây",
    routed: "Định tuyến",
    tokens: "token API mỗi tác vụ",
  },
};

const LOCAL = "M190 470 L640 470 C 800 470, 830 330, 990 330";
const LARGE = "M190 470 L640 470 C 800 470, 830 610, 990 610";

/** Seven requests stay on the small local model; one in eight goes to the large model. */
const DOTS = [0, 1, 2, 3, 4, 5, 6, 7].map((index) => ({
  key: index,
  large: index === 5,
  begin: `${index * 0.45}s`,
}));

/**
 * Lean Inference's film, drawn in the site's own style instead of a recorded screen: requests
 * flow into a router, most are answered by a small local model and only the hard ones reach a
 * large model, while the tokens-per-task bar drops beside it. It plays only while on screen
 * and holds its final frame when motion is off.
 */
export function InferenceFilm({ label }: { label: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const w = WORDS[splitPath(usePathname()).lang];

  useEffect(() => {
    const element = svg.current;
    if (!element) return;
    const still = () => {
      element.setCurrentTime(2.4);
      element.pauseAnimations();
    };
    if (motionLevel() === "off") {
      still();
      return;
    }
    element.pauseAnimations();
    const observer = new IntersectionObserver(([entry]) => {
      if (motionLevel() === "off") still();
      else if (entry.isIntersecting) element.unpauseAnimations();
      else element.pauseAnimations();
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-snow">
      <svg
        ref={svg}
        viewBox="0 0 1600 900"
        role="img"
        aria-label={label}
        className="absolute inset-0 size-full"
      >
        <title>{label}</title>

        <text x="96" y="120" className="fill-stone" fontSize="24" letterSpacing="5">
          LEAN INFERENCE
        </text>
        <rect x="96" y="140" width="56" height="3" rx="1.5" className="fill-signal" />

        {/* Routes */}
        <path d={LOCAL} fill="none" stroke="#111" strokeOpacity="0.1" strokeWidth="3" />
        <path d={LARGE} fill="none" stroke="#111" strokeOpacity="0.1" strokeWidth="3" />

        {/* Requests in */}
        <circle cx="190" cy="470" r="12" fill="#111" fillOpacity="0.15" />
        <text x="190" y="540" textAnchor="middle" className="fill-stone" fontSize="32">
          {w.requests}
        </text>

        {DOTS.map((dot) => (
          <circle key={dot.key} r="9" fill={dot.large ? "#d9292f" : "#111"} opacity="0">
            <animateMotion
              dur="3.6s"
              begin={dot.begin}
              repeatCount="indefinite"
              path={dot.large ? LARGE : LOCAL}
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="spline"
              keySplines="0.45 0 0.25 1"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.08;0.9;1"
              dur="3.6s"
              begin={dot.begin}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Router */}
        <rect x="580" y="410" width="120" height="120" rx="32" fill="#111" />
        <circle cx="640" cy="470" r="18" fill="none" stroke="#d9292f" strokeWidth="3">
          <animate attributeName="r" values="14;22;14" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <text x="640" y="590" textAnchor="middle" className="fill-ink" fontSize="32">
          {w.router}
        </text>

        {/* Models */}
        <rect
          x="975"
          y="290"
          width="290"
          height="80"
          rx="40"
          fill="#f7f7f7"
          stroke="#111"
          strokeOpacity="0.12"
          strokeWidth="2"
        />
        <text
          x="1120"
          y="331"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-ink"
          fontSize="32"
        >
          {w.local}
        </text>
        <rect
          x="975"
          y="570"
          width="290"
          height="80"
          rx="40"
          fill="#fff"
          stroke="#d9292f"
          strokeOpacity="0.5"
          strokeWidth="2"
        />
        <text
          x="1120"
          y="611"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-ink"
          fontSize="32"
        >
          {w.large}
        </text>
        <text x="1120" y="700" textAnchor="middle" className="fill-stone" fontSize="26">
          {w.largeNote}
        </text>

        {/* Tokens per task */}
        <line
          x1="1320"
          y1="650"
          x2="1504"
          y2="650"
          stroke="#111"
          strokeOpacity="0.15"
          strokeWidth="2"
        />
        <rect x="1290" y="290" width="64" height="360" rx="12" fill="#111" fillOpacity="0.1" />
        <rect x="1430" y="290" width="64" height="360" rx="12" fill="#d9292f">
          <animate
            attributeName="height"
            values="360;54;54;360"
            keyTimes="0;0.3;0.92;1"
            dur="7.2s"
            calcMode="spline"
            keySplines="0.65 0 0.35 1;0 0 1 1;0.65 0 0.35 1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            values="290;596;596;290"
            keyTimes="0;0.3;0.92;1"
            dur="7.2s"
            calcMode="spline"
            keySplines="0.65 0 0.35 1;0 0 1 1;0.65 0 0.35 1"
            repeatCount="indefinite"
          />
        </rect>
        <text x="1322" y="696" textAnchor="middle" className="fill-stone" fontSize="24">
          {w.cloud}
        </text>
        <text x="1462" y="696" textAnchor="middle" className="fill-stone" fontSize="24">
          {w.routed}
        </text>
        <text
          x="1504"
          y="230"
          textAnchor="end"
          className="fill-ink font-display"
          fontSize="112"
          letterSpacing="-4"
        >
          −85%
        </text>
        <text x="1504" y="270" textAnchor="end" className="fill-stone" fontSize="26">
          {w.tokens}
        </text>
      </svg>
    </div>
  );
}
