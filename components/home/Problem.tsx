import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Citation, SectionHeading } from "@/components/ui/Primitives";
import { getCopy } from "@/content/copy";
import type { Lang } from "@/lib/i18n";

type P = ReturnType<typeof getCopy>["problem"];

/** One pressure on the operator: a real scene, the number, what it means. Nothing on the photo. */
function SqueezeCard({ item, index }: { item: P["squeeze"][number]; index: number }) {
  return (
    <Reveal
      pop
      delay={index}
      className="squeeze-card group flex h-full flex-col overflow-hidden rounded-[28px] bg-snow shadow-subtle"
    >
      <div className="relative overflow-hidden">
        {/* biome-ignore lint/performance/noImgElement: open-licence editorial photo */}
        <img
          src={item.photo}
          alt={item.alt}
          loading="lazy"
          className="photo-soft aspect-[4/3] w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-7 md:p-8">
        <p
          className={`font-display leading-none tracking-[-0.04em] whitespace-nowrap text-ink ${item.value.length > 7 ? "text-[40px] md:text-[46px]" : "text-[48px] md:text-[56px]"}`}
        >
          <CountUp text={item.value} className="tabular" />
        </p>
        <p className="text-[16px] leading-[1.45] font-medium text-ink">
          {item.label}
          <Citation id={item.source} />
        </p>
        <p className="mt-auto text-[14px] leading-[1.55] text-stone">{item.detail}</p>
      </div>
    </Reveal>
  );
}

/** Start-of-year vs. mid-year AI use as two growing columns, with the gap called out. */
function Adoption({ t }: { t: P["adoption"] }) {
  const rows = [t.from, t.to];
  return (
    <Reveal
      pop
      className="flex h-full flex-col gap-8 rounded-[28px] bg-ink p-8 text-snow md:p-10 lg:col-span-7"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="eyebrow text-silver">{t.title}</p>
        <Citation id={t.source} onDark />
      </div>
      <div className="grid flex-1 grid-cols-[auto_1fr] items-end gap-8 md:gap-12">
        <div className="flex h-[220px] items-end gap-5" aria-hidden="true">
          {rows.map((row, index) => (
            <div key={row.label} className="flex h-full flex-col items-center justify-end gap-3">
              <span className="tabular text-[13px] text-silver">{row.value}%</span>
              <span
                className={`grow-y block w-14 rounded-[14px] md:w-16 ${index === 1 ? "bg-signal" : "bg-white/20"}`}
                style={{ height: `${row.value * 2.6}px`, ["--d" as string]: `${index * 0.25}s` }}
              />
              <span className="text-[12px] whitespace-nowrap text-silver">{row.label}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 pb-8">
          <p className="font-display text-[64px] leading-none tracking-[-0.045em] md:text-[88px]">
            <CountUp text={`${t.to.value}%`} className="tabular" />
          </p>
          <p className="max-w-[30ch] text-[15px] leading-[1.5] text-mist">{t.caption}</p>
          <p className="mt-2 flex items-baseline gap-3 border-t border-white/15 pt-4">
            <span className="font-display text-[30px] leading-none text-snow">
              {t.result.value}
            </span>
            <span className="text-[14px] leading-[1.45] text-silver">{t.result.label}</span>
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/** Why operators hold back, each reason paired with the core that answers it. */
function Barriers({ t }: { t: P["barriers"] }) {
  return (
    <Reveal
      pop
      delay={1}
      className="flex h-full flex-col gap-7 rounded-[28px] bg-snow p-8 shadow-subtle md:p-10 lg:col-span-5"
    >
      <div className="flex flex-col gap-1">
        <p className="eyebrow">{t.title}</p>
        <p className="text-[14px] text-stone">
          {t.caption}
          <Citation id={t.source} />
        </p>
      </div>
      <ul className="flex flex-1 flex-col justify-between gap-6">
        {t.rows.map((row, index) => (
          <li key={row.label} className="flex flex-col gap-2.5">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[15px] text-ink">{row.label}</span>
              <span className="font-display text-[34px] leading-none tracking-[-0.03em] text-ink">
                <CountUp text={`${row.value}%`} className="tabular" />
              </span>
            </div>
            <span className="h-2 overflow-hidden rounded-full bg-ink/[0.06]">
              <span
                className="grow-x block h-full rounded-full bg-ink"
                style={{
                  width: `${(row.value / 40) * 100}%`,
                  ["--d" as string]: `${index * 0.15}s`,
                }}
              />
            </span>
            <span className="flex items-center gap-2 text-[12px] text-stone">
              {t.answerLabel}
              <span aria-hidden="true" className="h-px w-4 bg-signal" />
              <span className="rounded-badges bg-signal/[0.08] px-2.5 py-0.5 font-medium text-signal">
                {row.answer}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/** The operator's need at three sizes, on one scale from small to large. */
function Segments({ t }: { t: P["segments"] }) {
  return (
    <div className="flex flex-col gap-10">
      <Reveal className="flex flex-col gap-3">
        <h3 className="text-heading-sm md:text-heading">{t.title}</h3>
        <p className="text-[16px] text-stone">{t.body}</p>
      </Reveal>
      <div className="relative">
        <span
          aria-hidden="true"
          className="scale-line absolute top-0 right-0 left-0 hidden h-px bg-ink/10 md:block"
        >
          <span className="grow-x block h-full bg-signal" />
        </span>
        <ol className="grid gap-6 md:grid-cols-3 md:pt-10">
          {t.items.map((item, index) => (
            <li key={item.name}>
              <Reveal pop delay={index} className="relative flex h-full flex-col gap-5">
                <span
                  aria-hidden="true"
                  className="absolute -top-[46px] left-0 hidden size-3 rounded-full border-2 border-signal bg-fog md:block"
                  style={{ transform: `scale(${1 + index * 0.35})` }}
                />
                <div className="overflow-hidden rounded-[24px]">
                  {/* biome-ignore lint/performance/noImgElement: open-licence editorial photo */}
                  <img
                    src={item.photo}
                    alt={item.alt}
                    loading="lazy"
                    className="photo-soft aspect-[16/10] w-full object-cover"
                  />
                </div>
                <h4 className="font-sans text-[18px] font-medium text-ink">{item.name}</h4>
                <dl className="flex flex-col gap-3 text-[14px] leading-[1.55]">
                  <div className="grid grid-cols-[5.5rem_1fr] gap-3">
                    <dt className="eyebrow pt-[3px]">{t.needLabel}</dt>
                    <dd className="text-stone">{item.need}</dd>
                  </div>
                  <div className="grid grid-cols-[5.5rem_1fr] gap-3">
                    <dt className="eyebrow pt-[3px] text-signal">{t.fitLabel}</dt>
                    <dd className="text-ink">{item.fit}</dd>
                  </div>
                </dl>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/**
 * The problem, told for FnB operators: three real pressures (margins, staff, a large and
 * crowded Vietnamese market) on photographs of the work itself; AI arriving fast in the back
 * office; the three reasons the rest hold back, each matched to the core that answers it; the
 * wider evidence; and how the need changes from a single café to a 100-outlet chain. Every figure
 * is cited and dated in the footer.
 */
export function Problem({ lang }: { lang: Lang }) {
  const t = getCopy(lang).problem;
  return (
    <section id="problem" className="section bg-fog">
      <div className="page-width flex flex-col gap-16 md:gap-20">
        <Reveal>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} body={t.body} />
        </Reveal>

        <div className="flex flex-col gap-6">
          <p className="eyebrow">{t.squeezeTitle}</p>
          <ul className="grid gap-5 md:grid-cols-3">
            {t.squeeze.map((item, index) => (
              <li key={item.label}>
                <SqueezeCard item={item} index={index} />
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          <Adoption t={t.adoption} />
          <Barriers t={t.barriers} />
        </div>

        <Reveal className="flex flex-col gap-6">
          <p className="eyebrow">{t.evidence.title}</p>
          <ul className="grid gap-px overflow-hidden rounded-[24px] bg-ink/[0.08] md:grid-cols-3">
            {t.evidence.items.map((item) => (
              <li key={item.label} className="flex flex-col gap-3 bg-snow p-7 md:p-8">
                <span className="font-display text-[44px] leading-none tracking-[-0.04em] text-ink">
                  {item.value}
                </span>
                <span className="text-[14px] leading-[1.5] text-graphite-ink">
                  {item.label}
                  <Citation id={item.source} />
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Segments t={t.segments} />

        <p className="max-w-[80ch] text-[12px] text-stone">{t.sourcesNote}</p>
      </div>
    </section>
  );
}
