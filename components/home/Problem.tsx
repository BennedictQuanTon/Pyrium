import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Citation, SectionHeading } from "@/components/ui/Primitives";
import { problem } from "@/content/copy";

const RING_RADIUS = 52;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

/** 88% → 70% → single digits: three bars that grow in sequence, the last one hatched. */
function Funnel() {
  const { funnel } = problem;
  return (
    <Reveal className="glass flex h-full flex-col gap-8 p-7 md:p-9 lg:col-span-4">
      <p className="text-[15px] font-medium text-ink">
        {funnel.title}
        <Citation id={funnel.source} />
      </p>
      <ul className="flex flex-col gap-6">
        {funnel.rows.map((row, index) => {
          const last = index === funnel.rows.length - 1;
          return (
            <li key={row.label} className="grid grid-cols-[1fr_auto] items-end gap-x-6 gap-y-2">
              <span className="text-[14px] text-graphite-ink">{row.label}</span>
              <span
                className={`font-display leading-none tracking-[-0.03em] ${last ? "text-[22px] text-signal md:text-[28px]" : "text-[34px] text-ink md:text-[44px]"}`}
              >
                {last ? row.display : <CountUp text={row.display} className="tabular" />}
              </span>
              <span className="col-span-2 h-2.5 overflow-hidden rounded-full bg-ink/[0.06]">
                <span
                  className={`grow-x block h-full rounded-full ${last ? "bg-[repeating-linear-gradient(135deg,#d9292f_0_3px,transparent_3px_7px)]" : index === 0 ? "bg-ink" : "bg-graphite-ink/70"}`}
                  style={{ width: `${row.value}%`, ["--d" as string]: `${index * 0.18}s` }}
                />
              </span>
            </li>
          );
        })}
      </ul>
      <p className="text-[12px] text-stone">{funnel.note}</p>
    </Reveal>
  );
}

function CioRing() {
  const { cio } = problem;
  const offset = RING_LENGTH * (1 - cio.value / 100);
  return (
    <Reveal
      delay={1}
      className="glass flex h-full flex-col items-start justify-between gap-6 p-7 md:p-8 lg:col-span-2"
    >
      <div className="relative size-[176px]">
        <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
          <circle
            cx="60"
            cy="60"
            r={RING_RADIUS}
            fill="none"
            stroke="rgba(17,17,17,0.08)"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r={RING_RADIUS}
            fill="none"
            stroke="#d9292f"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={RING_LENGTH}
            className="ring"
            style={{
              ["--ring-length" as string]: RING_LENGTH,
              ["--ring-offset" as string]: offset,
            }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-[46px] tracking-[-0.03em] text-ink">
          <CountUp text={`${cio.value}%`} className="tabular" />
        </span>
      </div>
      <p className="text-[15px] leading-[1.5] text-graphite-ink">
        {cio.label}
        <Citation id={cio.source} />
      </p>
    </Reveal>
  );
}

function Governance() {
  const { governance } = problem;
  return (
    <Reveal className="glass flex h-full flex-col justify-between gap-6 p-7 md:p-8 lg:col-span-2">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-[56px] leading-none tracking-[-0.04em] text-ink">1</span>
        <span className="text-[15px] text-stone">in</span>
        <span className="font-display text-[56px] leading-none tracking-[-0.04em] text-ink">5</span>
      </div>
      <div className="flex gap-2.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((dot) => (
          <span
            key={dot}
            className={`size-6 rounded-full ${dot === 0 ? "bg-signal shadow-[0_0_0_6px_rgba(217,41,47,0.12)]" : "bg-ink/10"}`}
          />
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[15px] leading-[1.5] text-graphite-ink">
          {governance.label}
          <Citation id={governance.source} />
        </p>
        <p className="text-[12px] text-stone">{governance.detail}</p>
      </div>
    </Reveal>
  );
}

/** Gartner's total in the brand's block language: published year solid red, derived years dashed. */
function Spending() {
  const { chart } = problem;
  const max = 4;
  const height = 150;
  return (
    <Reveal delay={1} className="glass flex h-full flex-col gap-5 p-7 md:p-8 lg:col-span-2">
      <p className="text-[15px] font-medium text-ink">
        {chart.title}
        <Citation id={chart.source} />
      </p>
      <svg viewBox="0 0 300 190" role="img" aria-labelledby="spend-desc" className="w-full">
        <desc id="spend-desc">
          {chart.bars
            .map((bar) => `${bar.year}: ${bar.derived ? "about " : ""}US$${bar.value}T`)
            .join(", ")}
        </desc>
        <line x1="0" y1={height + 6} x2="300" y2={height + 6} stroke="rgba(17,17,17,0.15)" />
        {chart.bars.map((bar, index) => {
          const barHeight = (bar.value / max) * height;
          const x = 18 + index * 96;
          return (
            <g key={bar.year}>
              <rect
                x={x}
                y={height + 6 - barHeight}
                width="72"
                height={barHeight}
                rx="12"
                fill={bar.derived ? "rgba(255,255,255,0.4)" : "#d9292f"}
                stroke={bar.derived ? "#8a8a8a" : "#d9292f"}
                strokeWidth="1.25"
                strokeDasharray={bar.derived ? "4 4" : undefined}
                className="grow-y"
                style={{ ["--d" as string]: `${index * 0.15}s` }}
              />
              <text
                x={x + 36}
                y={height - barHeight - 4}
                textAnchor="middle"
                fontSize="14"
                fontWeight="500"
                fill={bar.derived ? "#484758" : "#d9292f"}
              >
                {bar.derived ? "≈" : ""}
                {bar.value.toFixed(bar.value < 2 ? 2 : 1)}
              </text>
              <text x={x + 36} y={height + 26} textAnchor="middle" fontSize="12" fill="#636363">
                {bar.year}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="text-[11px] leading-[1.5] text-stone">{chart.note}</p>
    </Reveal>
  );
}

function Gates() {
  const { gates } = problem;
  return (
    <Reveal delay={2} className="glass flex h-full flex-col gap-6 p-7 md:p-8 lg:col-span-2">
      <p className="text-[15px] font-medium text-ink">
        {gates.title}
        <Citation id={gates.source} />
      </p>
      <ul className="flex flex-col gap-5">
        {gates.rows.map((row, index) => (
          <li key={row.label} className="flex flex-col gap-2">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-[36px] leading-none tracking-[-0.03em] text-ink">
                <CountUp text={`${row.value}%`} className="tabular" />
              </span>
            </div>
            <span className="h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
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
 * The problem as a liquid-glass bento over the brand board's grey concrete: an open-licence
 * photo in monochrome, faded into the fog at the top so the heading reads, with every figure
 * on a frosted panel and every figure cited.
 */
export function Problem() {
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
          <SectionHeading eyebrow={problem.eyebrow} title={problem.title} body={problem.body} />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <Funnel />
          <CioRing />
          <Governance />
          <Spending />
          <Gates />
          <Reveal className="glass-dark glass-solid flex flex-col justify-between gap-6 p-8 md:col-span-2 md:flex-row md:items-center md:p-10 lg:col-span-6">
            <p className="max-w-[30ch] font-display text-[24px] leading-[1.3] md:text-[30px]">
              {problem.closer}
            </p>
            <span aria-hidden="true" className="h-px w-24 shrink-0 bg-signal md:w-40" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
