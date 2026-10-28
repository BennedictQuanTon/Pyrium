import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/Primitives";
import { getCopy } from "@/content/copy";
import { sources } from "@/content/sources";
import type { Lang } from "@/lib/i18n";

type Level = "full" | "partial" | "none";

/** Full: a solid disc. Partial: a half disc. None: a short dash. Each with a text label. */
function Mark({ level, label, strong }: { level: Level; label: string; strong: boolean }) {
  return (
    <span className="inline-flex items-center justify-center" title={label}>
      <span className="sr-only">{label}</span>
      {level === "none" ? (
        <span aria-hidden="true" className="block h-px w-3 bg-ink/25" />
      ) : (
        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
          <circle
            cx="8"
            cy="8"
            r="6.5"
            fill="none"
            stroke={strong ? "#d9292f" : "#111111"}
            strokeWidth="1.3"
          />
          {level === "full" ? (
            <circle cx="8" cy="8" r="4.2" fill={strong ? "#d9292f" : "#111111"} />
          ) : (
            <path d="M8 3.8a4.2 4.2 0 0 1 0 8.4z" fill="#111111" />
          )}
        </svg>
      )}
    </span>
  );
}

/**
 * How Pyrium compares with the four kinds of alternative a buyer weighs: AI chat assistants,
 * automation platforms, large integrators, and freelancers or an in-house build. Categories,
 * not named vendors; the Pyrium column is highlighted, the first column stays pinned on small
 * screens, and the category references are listed with the date they were checked.
 */
export function Compare({ lang }: { lang: Lang }) {
  const t = getCopy(lang).core.compare;
  const levels = t.legend;
  return (
    <section id="compare" className="section overflow-x-clip bg-snow">
      <div className="page-width flex flex-col gap-8 md:gap-12">
        <Reveal>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} body={t.body} />
        </Reveal>
        <Reveal pop className="md:hidden">
          <div className="sticky top-[76px] z-10 grid grid-cols-5 gap-1 rounded-[16px] bg-snow/90 py-2.5 backdrop-blur">
            {t.columns.map((column, index) => (
              <span
                key={column}
                className={`flex items-end justify-center px-0.5 text-center text-[10.5px] leading-[1.25] font-medium ${index === 0 ? "text-signal" : "text-stone"}`}
              >
                {index === 0 ? "Pyrium" : column}
              </span>
            ))}
          </div>
          <ul className="flex flex-col">
            {t.rows.map((row) => (
              <li key={row.label} className="flex flex-col gap-2 border-t border-ink/[0.07] py-3">
                <p className="text-[14px] leading-[1.4] text-ink">{row.label}</p>
                <div className="grid grid-cols-5 gap-1">
                  {row.values.map((value, index) => (
                    <span
                      // biome-ignore lint/suspicious/noArrayIndexKey: columns are fixed and ordered
                      key={index}
                      className={`flex h-8 items-center justify-center rounded-[10px] ${index === 0 ? "bg-signal/[0.07]" : ""}`}
                    >
                      <Mark
                        level={value as Level}
                        label={`${index === 0 ? "Pyrium" : t.columns[index]}: ${levels[value as Level]}`}
                        strong={index === 0}
                      />
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal pop className="hidden min-w-0 md:block">
          <div className="no-scrollbar -mx-4 w-[calc(100%+2rem)] overflow-x-auto px-4">
            <table className="compare w-full min-w-[720px] border-separate border-spacing-0 text-left">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky left-0 z-10 w-[34%] bg-snow pb-5 align-bottom"
                  />
                  {t.columns.map((column, index) => (
                    <th
                      key={column}
                      scope="col"
                      className={`px-3 pb-5 text-center align-bottom text-[13px] font-medium ${index === 0 ? "compare-us rounded-t-[20px] pt-5 text-ink" : "text-stone"}`}
                    >
                      {index === 0 ? (
                        // biome-ignore lint/performance/noImgElement: brand lockup in a table header
                        <img
                          src="/brand/pyrium-lockup-primary.svg"
                          alt="Pyrium"
                          className="mx-auto h-auto w-[92px]"
                        />
                      ) : (
                        column
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row, rowIndex) => (
                  <tr key={row.label} className="group">
                    <th
                      scope="row"
                      className="sticky left-0 z-10 border-t border-ink/[0.07] bg-snow py-4 pr-4 text-[13px] leading-[1.4] font-normal text-ink md:pr-6 md:text-[15px]"
                    >
                      {row.label}
                    </th>
                    {row.values.map((value, index) => (
                      <td
                        // biome-ignore lint/suspicious/noArrayIndexKey: columns are fixed and ordered
                        key={index}
                        className={`border-t border-ink/[0.07] px-3 py-4 text-center ${index === 0 ? `compare-us ${rowIndex === t.rows.length - 1 ? "rounded-b-[20px]" : ""}` : ""}`}
                      >
                        <Mark
                          level={value as Level}
                          label={levels[value as Level]}
                          strong={index === 0}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <div className="flex flex-col gap-4 border-t border-ink/[0.07] pt-6 md:flex-row md:items-start md:justify-between">
          <ul className="flex flex-wrap gap-5 text-[12px] text-stone" aria-label="Legend">
            {(["full", "partial", "none"] as Level[]).map((level) => (
              <li key={level} className="flex items-center gap-2">
                <Mark level={level} label={levels[level]} strong={false} />
                {levels[level]}
              </li>
            ))}
          </ul>
          <div className="flex max-w-[64ch] flex-col gap-1.5 text-[12px] text-stone">
            <p className="font-medium text-ink">{t.sourcesLabel}</p>
            {t.sources.map((id) => (
              <p key={id}>
                {sources[id].publisher},{" "}
                <a href={sources[id].url} className="underline underline-offset-2 hover:text-ink">
                  {sources[id].title}
                </a>{" "}
                · {lang === "vi" ? "truy cập" : "accessed"} {sources[id].accessed}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
