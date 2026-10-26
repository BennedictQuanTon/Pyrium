import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Citation, SectionHeading } from "@/components/ui/Primitives";
import { getCopy } from "@/content/copy";
import type { Lang } from "@/lib/i18n";

type P = ReturnType<typeof getCopy>["problem"];

/** One industry under pressure: a real scene, the figure, what it means. Nothing on the photo. */
function IndustryCard({ item, index }: { item: P["industries"][number]; index: number }) {
  return (
    <Reveal
      pop
      delay={index}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-snow shadow-subtle"
    >
      <div className="relative overflow-hidden">
        {/* biome-ignore lint/performance/noImgElement: open-licence editorial photo */}
        <img
          src={item.photo}
          alt={item.alt}
          loading="lazy"
          className="photo-soft aspect-[16/11] w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-6">
        <p className="eyebrow">{item.name}</p>
        <p
          className={`font-display leading-none tracking-[-0.04em] whitespace-nowrap text-ink ${item.value.length > 6 ? "text-[30px] md:text-[34px]" : "text-[40px] md:text-[44px]"}`}
        >
          <CountUp text={item.value} className="tabular" />
        </p>
        <p className="text-[14px] leading-[1.5] text-graphite-ink">
          {item.label}
          <Citation id={item.source} />
        </p>
      </div>
    </Reveal>
  );
}

/**
 * The problem, across the industries Pyrium serves: four pressures on real photographs, then one
 * dark panel that tells the rest — AI arriving fast, the three reasons operators hold back
 * (each matched to the core that answers it) and the wider evidence. Every figure is cited and
 * dated in the footer.
 */
export function Problem({ lang }: { lang: Lang }) {
  const t = getCopy(lang).problem;
  const rows = [t.adoption.from, t.adoption.to];
  return (
    <section id="problem" className="section bg-fog">
      <div className="page-width flex flex-col gap-12 md:gap-14">
        <Reveal>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} body={t.body} />
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.industries.map((item, index) => (
            <li key={item.name}>
              <IndustryCard item={item} index={index} />
            </li>
          ))}
        </ul>

        <Reveal pop className="overflow-hidden rounded-[32px] bg-ink text-snow">
          <div className="grid lg:grid-cols-[1fr_1.2fr]">
            {/* AI arriving */}
            <div className="flex flex-col gap-8 border-white/10 p-8 md:p-10 lg:border-r">
              <p className="eyebrow flex items-center gap-2 text-silver">
                {t.adoption.title}
                <Citation id={t.adoption.source} onDark />
              </p>
              <div className="flex items-end gap-8">
                <div className="flex h-[176px] items-end gap-4" aria-hidden="true">
                  {rows.map((row, index) => (
                    <div
                      key={row.label}
                      className="flex h-full flex-col items-center justify-end gap-2"
                    >
                      <span className="tabular text-[12px] text-silver">{row.value}%</span>
                      <span
                        className={`grow-y block w-12 rounded-[12px] ${index === 1 ? "bg-signal" : "bg-white/20"}`}
                        style={{
                          height: `${row.value * 2}px`,
                          ["--d" as string]: `${index * 0.25}s`,
                        }}
                      />
                      <span className="text-[11px] whitespace-nowrap text-silver">{row.label}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3 pb-6">
                  <p className="font-display text-[64px] leading-none tracking-[-0.045em] md:text-[80px]">
                    <CountUp text={`${t.adoption.to.value}%`} className="tabular" />
                  </p>
                  <p className="max-w-[26ch] text-[14px] leading-[1.5] text-mist">
                    {t.adoption.caption}
                  </p>
                </div>
              </div>
            </div>

            {/* What holds the rest back */}
            <div className="flex flex-col gap-6 border-t border-white/10 p-8 md:p-10 lg:border-t-0">
              <p className="eyebrow flex items-center gap-2 text-silver">
                {t.barriers.title}
                <Citation id={t.barriers.source} onDark />
              </p>
              <ul className="flex flex-col gap-5">
                {t.barriers.rows.map((row, index) => (
                  <li
                    key={row.label}
                    className="grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-2"
                  >
                    <span className="text-[15px] text-snow">{row.label}</span>
                    <span className="font-display text-[30px] leading-none tracking-[-0.03em]">
                      <CountUp text={`${row.value}%`} className="tabular" />
                    </span>
                    <span className="col-span-2 flex items-center gap-3">
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                        <span
                          className="grow-x block h-full rounded-full bg-snow"
                          style={{
                            width: `${(row.value / 40) * 100}%`,
                            ["--d" as string]: `${index * 0.15}s`,
                          }}
                        />
                      </span>
                      <span className="shrink-0 rounded-badges bg-signal px-2.5 py-0.5 text-[11px] font-medium text-snow">
                        {row.answer}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* The wider evidence */}
          <ul className="grid border-t border-white/10 md:grid-cols-3">
            {t.facts.map((fact, index) => (
              <li
                key={fact.label}
                className={`flex items-baseline gap-4 p-6 md:p-8 ${index > 0 ? "border-t border-white/10 md:border-t-0 md:border-l" : ""}`}
              >
                <span className="font-display text-[34px] leading-none tracking-[-0.04em] text-snow">
                  {fact.value}
                </span>
                <span className="text-[13px] leading-[1.45] text-silver">
                  {fact.label}
                  <Citation id={fact.source} onDark />
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <p className="text-[12px] text-stone">{t.sourcesNote}</p>
      </div>
    </section>
  );
}
