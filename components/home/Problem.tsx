import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Citation, SectionHeading } from "@/components/ui/Primitives";
import { getCopy } from "@/content/copy";
import type { SourceId } from "@/content/types";
import type { Lang } from "@/lib/i18n";

const RING_RADIUS = 54;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

const SOURCES = {
  funnel: "stanford-ai-index-2026",
  cio: "gartner-cio-2026-10",
  governance: "deloitte-state-of-ai-2026",
  gates: "gartner-cio-2026-10",
  chart: "gartner-spend-2026-09",
} satisfies Record<string, SourceId>;

const BARS = [
  { year: "2025", value: 1.81, derived: true },
  { year: "2026", value: 2.7, derived: false },
  { year: "2027", value: 3.68, derived: true },
];

type P = ReturnType<typeof getCopy>["problem"];

/** 88% → 70% → single digits, then the gap between the first and last drawn in red. */
function Funnel({ t }: { t: P }) {
  const rows = t.funnel.rows;
  const first = rows[0].value;
  const last = rows[rows.length - 1].value;
  return (
    <Reveal pop className="glass flex h-full flex-col gap-7 p-7 md:p-9 lg:col-span-4">
      <p className="text-[15px] font-medium text-ink">
        {t.funnel.title}
        <Citation id={SOURCES.funnel} />
      </p>
      <ul className="flex flex-col gap-6">
        {rows.map((row, index) => {
          const isLast = index === rows.length - 1;
          return (
            <li key={row.label} className="grid grid-cols-[1fr_auto] items-end gap-x-6 gap-y-2.5">
              <span className="text-[14px] text-graphite-ink">{row.label}</span>
              <span
                className={`font-display leading-none tracking-[-0.035em] ${isLast ? "text-[24px] text-signal md:text-[30px]" : "text-[38px] text-ink md:text-[52px]"}`}
              >
                {isLast ? row.display : <CountUp text={row.display} className="tabular" />}
              </span>
              <span className="col-span-2 h-3 overflow-hidden rounded-full bg-ink/[0.06]">
                <span
                  className={`grow-x block h-full rounded-full ${isLast ? "bg-[repeating-linear-gradient(135deg,#d9292f_0_3px,transparent_3px_7px)]" : index === 0 ? "bg-ink" : "bg-graphite-ink/70"}`}
                  style={{ width: `${row.value}%`, ["--d" as string]: `${index * 0.18}s` }}
                />
              </span>
            </li>
          );
        })}
      </ul>
      {/* The gap: a red span from the last bar's end to the first bar's end. */}
      <div className="relative h-8" aria-hidden="true">
        <span
          className="gap-span absolute top-1/2 h-px bg-signal"
          style={{ left: `${last}%`, width: `${first - last}%` }}
        >
          <span className="absolute -top-[3px] -left-[3px] size-[7px] rounded-full bg-signal" />
          <span className="absolute -top-[3px] -right-[3px] size-[7px] rounded-full bg-signal" />
        </span>
        <span
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-badges bg-signal px-3 py-1 text-[11px] font-medium tracking-[0.08em] whitespace-nowrap text-snow uppercase"
          style={{ left: `${(first + last) / 2}%` }}
        >
          {t.funnel.gap} · {first - last}+ pts
        </span>
      </div>
      <p className="mt-auto text-[12px] text-stone">{t.funnel.note}</p>
    </Reveal>
  );
}

/** 13%: a large ring drawn around the number, the caption directly beneath. */
function CioRing({ t }: { t: P }) {
  const offset = RING_LENGTH * (1 - 13 / 100);
  return (
    <Reveal
      pop
      delay={1}
      className="glass flex h-full flex-col items-center justify-center gap-6 p-7 text-center md:p-8 lg:col-span-2"
    >
      <div className="relative size-[200px]">
        <svg viewBox="0 0 128 128" className="size-full -rotate-90" aria-hidden="true">
          <circle
            cx="64"
            cy="64"
            r={RING_RADIUS}
            fill="none"
            stroke="rgba(17,17,17,0.07)"
            strokeWidth="9"
          />
          <circle
            cx="64"
            cy="64"
            r={RING_RADIUS}
            fill="none"
            stroke="#d9292f"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={RING_LENGTH}
            className="ring"
            style={{
              ["--ring-length" as string]: RING_LENGTH,
              ["--ring-offset" as string]: offset,
            }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-[58px] tracking-[-0.04em] text-ink">
          <CountUp text="13%" className="tabular" />
        </span>
      </div>
      <p className="max-w-[30ch] text-[15px] leading-[1.5] text-graphite-ink">
        {t.cio.label}
        <Citation id={SOURCES.cio} />
      </p>
    </Reveal>
  );
}

/** One in five: five figures, the first in signal red. */
function Governance({ t }: { t: P }) {
  return (
    <Reveal
      pop
      className="glass flex h-full flex-col justify-between gap-7 p-7 md:p-8 lg:col-span-2"
    >
      <p className="font-display text-[64px] leading-none tracking-[-0.045em] text-ink">
        1<span className="mx-1 text-ink/25">/</span>5
      </p>
      <div className="flex items-end justify-between gap-2" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((figure) => (
          <svg
            key={figure}
            viewBox="0 0 24 40"
            aria-hidden="true"
            className={`person h-16 w-auto ${figure === 0 ? "text-signal" : "text-ink/12"}`}
            style={{ ["--d" as string]: `${figure * 0.08}s` }}
          >
            <circle cx="12" cy="7" r="6" fill="currentColor" />
            <path d="M2 40V24a10 10 0 0 1 20 0v16z" fill="currentColor" />
          </svg>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[15px] leading-[1.5] text-graphite-ink">
          {t.governance.label}
          <Citation id={SOURCES.governance} />
        </p>
        <p className="text-[12px] text-stone">{t.governance.detail}</p>
      </div>
    </Reveal>
  );
}

/** Gartner's total: published year solid red, derived years dashed; labels sit inside the frame. */
function Spending({ t, lang }: { t: P; lang: Lang }) {
  const max = 4;
  const top = 34;
  const base = 186;
  const height = base - top;
  const fmt = (value: number) =>
    value.toLocaleString(lang === "vi" ? "vi-VN" : "en-US", {
      minimumFractionDigits: value < 2 ? 2 : 1,
      maximumFractionDigits: 2,
    });
  return (
    <Reveal pop delay={1} className="glass flex h-full flex-col gap-4 p-7 md:p-8 lg:col-span-2">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[15px] font-medium text-ink">
          {t.chart.title}
          <Citation id={SOURCES.chart} />
        </p>
        <span className="text-[12px] text-stone">{t.chart.unit}</span>
      </div>
      <svg viewBox="0 0 300 214" role="img" aria-labelledby="spend-desc" className="w-full">
        <desc id="spend-desc">
          {BARS.map((bar) => `${bar.year}: ${bar.derived ? "≈" : ""}${bar.value}`).join(", ")}
        </desc>
        <line x1="0" y1={base} x2="300" y2={base} stroke="rgba(17,17,17,0.12)" />
        {BARS.map((bar, index) => {
          const h = (bar.value / max) * height;
          const x = 22 + index * 94;
          return (
            <g key={bar.year}>
              <rect
                x={x}
                y={base - h}
                width="68"
                height={h}
                rx="14"
                fill={bar.derived ? "rgba(255,255,255,0.55)" : "#d9292f"}
                stroke={bar.derived ? "#8a8a8a" : "#d9292f"}
                strokeWidth="1.25"
                strokeDasharray={bar.derived ? "4 4" : undefined}
                className="grow-y"
                style={{ ["--d" as string]: `${index * 0.14}s` }}
              />
              <text
                x={x + 34}
                y={base - h - 10}
                textAnchor="middle"
                fontSize="15"
                fontWeight="500"
                fill={bar.derived ? "#484758" : "#d9292f"}
                className="bar-label"
                style={{ ["--d" as string]: `${0.5 + index * 0.14}s` }}
              >
                {bar.derived ? "≈" : ""}
                {fmt(bar.value)}
              </text>
              <text x={x + 34} y={base + 22} textAnchor="middle" fontSize="12" fill="#636363">
                {bar.year}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-stone">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-signal" />
          {t.chart.published}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="size-2.5 rounded-[3px] border border-dashed border-graphite"
          />
          {t.chart.derived}
        </span>
      </div>
      <p className="text-[11px] leading-[1.5] text-stone">{t.chart.note}</p>
    </Reveal>
  );
}

function Gates({ t }: { t: P }) {
  return (
    <Reveal pop delay={2} className="glass flex h-full flex-col gap-6 p-7 md:p-8 lg:col-span-2">
      <p className="text-[15px] font-medium text-ink">
        {t.gates.title}
        <Citation id={SOURCES.gates} />
      </p>
      <ul className="flex flex-1 flex-col justify-around gap-6">
        {t.gates.rows.map((row, index) => (
          <li key={row.label} className="flex flex-col gap-2.5">
            <span className="font-display text-[48px] leading-none tracking-[-0.04em] text-ink">
              <CountUp text={`${row.value}%`} className="tabular" />
            </span>
            <span className="h-2 overflow-hidden rounded-full bg-ink/[0.06]">
              <span
                className="grow-x block h-full rounded-full bg-graphite-ink/70"
                style={{ width: `${row.value}%`, ["--d" as string]: `${index * 0.2}s` }}
              />
            </span>
            <span className="text-[13px] leading-[1.45] text-graphite-ink">{row.label}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/**
 * The problem as a liquid-glass bento over the brand board's grey concrete. Every figure sits
 * on a frosted panel, every panel pops in on a soft spring as it enters, numbers count up and
 * marks draw themselves; every figure is cited.
 */
export function Problem({ lang }: { lang: Lang }) {
  const t = getCopy(lang).problem;
  return (
    <section id="problem" className="relative overflow-hidden py-24 md:py-32">
      {/* biome-ignore lint/performance/noImgElement: decorative open-licence photo under glass */}
      <img
        src="/images/open/concrete.jpg"
        alt=""
        loading="lazy"
        className="photo-mono absolute inset-0 size-full object-cover opacity-90"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,#f7f7f7_0%,rgba(247,247,247,0.86)_22%,rgba(247,247,247,0.25)_55%,rgba(247,247,247,0.55)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-1/3 size-[520px] rounded-full bg-signal/20 blur-[120px]"
      />
      <div className="page-width relative flex flex-col gap-12">
        <Reveal>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} body={t.body} />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <Funnel t={t} />
          <CioRing t={t} />
          <Governance t={t} />
          <Spending t={t} lang={lang} />
          <Gates t={t} />
          <Reveal
            pop
            className="glass-dark glass-solid flex flex-col justify-between gap-6 p-8 md:col-span-2 md:flex-row md:items-center md:p-10 lg:col-span-6"
          >
            <p className="max-w-[34ch] font-display text-[24px] leading-[1.3] md:text-[30px]">
              {t.closer}
            </p>
            <span aria-hidden="true" className="h-px w-24 shrink-0 bg-signal md:w-40" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
