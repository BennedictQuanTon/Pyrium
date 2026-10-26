import type { ReactNode } from "react";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Person } from "@/components/ui/Person";
import { PillButton, SectionHeading, SmartLink } from "@/components/ui/Primitives";
import { ProductLogo } from "@/components/work/ProductLogo";
import { getCopy } from "@/content/copy";
import { getTestimonials, organizers, team } from "@/content/people";
import type { Product } from "@/content/types";
import type { Lang } from "@/lib/i18n";

/**
 * Organizer marquee: two rows drifting in opposite directions with edge fades. Every mark sits
 * in the same 40px box at one tone; brands without a normalized file render as a wordmark.
 */
export function LogoMarquee({ label }: { label: string }) {
  const rows = [
    organizers.filter((_, index) => index % 2 === 0),
    organizers.filter((_, index) => index % 2 === 1),
  ];
  return (
    <section aria-label={label} className="page-width relative flex flex-col gap-8">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex === 0 ? "a" : "b"} className="marquee-fade relative overflow-hidden">
          <div
            className={`marquee flex w-max items-center ${rowIndex === 1 ? "marquee-reverse" : ""}`}
          >
            {/* Four copies looped at -50%, so the drift never shows a blank stretch. */}
            {[0, 1, 2, 3].map((copy) => (
              <ul
                key={copy === 0 ? "base" : `copy-${copy}`}
                aria-hidden={copy > 0 || undefined}
                className="flex items-center gap-16 pr-16 text-graphite-ink"
              >
                {row.map((organizer) => (
                  <li key={organizer.id} className="flex h-10 w-24 items-center justify-center">
                    {organizer.logo ? (
                      // biome-ignore lint/performance/noImgElement: normalized brand marks; next/image adds nothing to inline SVGs
                      <img
                        src={organizer.logo}
                        alt={organizer.name}
                        className="max-h-10 max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-[19px] font-medium tracking-[-0.01em] whitespace-nowrap">
                        {organizer.name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

/**
 * The product lockups, each in its own brand, then three headline numbers — people reached,
 * running cost saved, recognitions won — that count up and pop in with a red rule under each.
 * Estimates carry a numbered marker; the notes and the last-updated date sit underneath.
 */
export function ProductStrip({ products, lang }: { products: Product[]; lang: Lang }) {
  const t = getCopy(lang).productsSection;
  return (
    <div className="page-width flex flex-col gap-16">
      <Reveal>
        <ul className="grid grid-cols-2 overflow-hidden rounded-cards bg-ink/[0.07] gap-px md:grid-cols-5">
          {products.map((product) => (
            <li key={product.slug} className="bg-fog">
              <SmartLink
                href={`/work/${product.slug}`}
                aria-label={product.name}
                className="logo-cell group flex h-28 items-center justify-center px-4 md:h-36"
              >
                <ProductLogo
                  slug={product.slug}
                  size="md"
                  className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.06]"
                />
              </SmartLink>
            </li>
          ))}
        </ul>
      </Reveal>
      <div className="flex flex-col gap-8">
        <dl className="grid gap-12 md:grid-cols-3 md:gap-8">
          {t.stats.map((stat, index) => (
            <Reveal key={stat.label} pop delay={index} className="stat flex flex-col gap-3">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="flex items-start gap-1 font-display text-[72px] leading-[0.95] tracking-[-0.05em] text-ink md:text-[88px] lg:text-[104px]">
                <CountUp text={stat.value} className="tabular" />
                {"note" in stat && stat.note ? (
                  <a
                    href={`#note-${stat.note}`}
                    aria-label={`Note ${stat.note}`}
                    className="mt-2 font-sans text-[15px] font-medium tracking-normal text-signal underline-offset-2 hover:underline"
                  >
                    {stat.note}
                  </a>
                ) : null}
              </dd>
              <span aria-hidden="true" className="stat-rule h-[2px] w-16 rounded-full bg-signal" />
              <dd className="max-w-[26ch] text-[16px] leading-[1.5] text-graphite-ink">
                {stat.label}
              </dd>
            </Reveal>
          ))}
        </dl>
        <div
          id="products-notes"
          className="flex flex-col gap-3 border-t border-ink/10 pt-5 text-[12px] leading-[1.55] text-stone md:flex-row md:items-start md:justify-between md:gap-10"
        >
          <ol className="flex max-w-[92ch] flex-col gap-1.5">
            {t.notes.map((note, index) => (
              <li key={note} id={`note-${index + 1}`} className="flex gap-2 scroll-mt-32">
                <span className="tabular font-medium text-signal">{index + 1}</span>
                {note}
              </li>
            ))}
          </ol>
          <p className="shrink-0 tabular">{t.updated}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Two rows of glass quote cards drifting in opposite directions over a soft red-and-grey
 * field, pausing under the pointer. Each quote is credited to a role, with an illustration, never a name.
 */
export function Testimonials({ lang }: { lang: Lang }) {
  const copy = getCopy(lang);
  const t = copy.testimonials;
  const quotes = getTestimonials(lang);
  const rows = [quotes.slice(0, 3), quotes.slice(3)];
  return (
    <section className="section relative overflow-hidden bg-snow">
      <div className="relative flex flex-col gap-12">
        <div className="page-width flex flex-col gap-4">
          <Reveal>
            <SectionHeading eyebrow={t.eyebrow} title={t.title} />
          </Reveal>
        </div>
        <div className="flex flex-col gap-5">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex === 0 ? "a" : "b"} className="marquee-fade overflow-hidden py-2">
              <div
                className={`marquee marquee-slow flex w-max ${rowIndex === 1 ? "marquee-reverse" : ""}`}
              >
                {[0, 1, 2, 3].map((copyIndex) => (
                  <ul
                    key={copyIndex === 0 ? "base" : `copy-${copyIndex}`}
                    aria-hidden={copyIndex > 0 || undefined}
                    className="flex gap-5 pr-5"
                  >
                    {row.map((item, index) => (
                      <li
                        key={item.role}
                        className="glass flex w-[300px] flex-col gap-6 p-6 md:w-[400px] md:p-7"
                      >
                        <span
                          aria-hidden="true"
                          className="font-display text-[40px] leading-none text-signal"
                        >
                          “
                        </span>
                        <blockquote className="-mt-4 text-[16px] leading-[1.55] text-midnight">
                          {item.quote}
                        </blockquote>
                        <div className="mt-auto">
                          <Person
                            avatar={`home-${rowIndex * 3 + index}`}
                            role={item.role}
                            anonymous={copy.showcase.anonymous}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * How an engagement runs: four steps in one dark band, each with an outlined numeral and a red
 * track that fills step by step in a loop; then the three packages, the one most teams start
 * with lifted forward on a red hairline.
 */
export function Engagement({
  lang,
  compact = false,
  heading = true,
}: {
  lang: Lang;
  compact?: boolean;
  /** False on the How-we-work page, whose header already says it. */
  heading?: boolean;
}) {
  const t = getCopy(lang).engagement;
  return (
    <div className="flex flex-col gap-14 md:gap-16">
      {heading ? (
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="flex flex-col gap-4">
            <p className="eyebrow flex items-center gap-2">
              <span aria-hidden="true" className="h-px w-6 bg-signal" />
              {t.eyebrow}
            </p>
            <h2 className="max-w-[16ch] text-heading md:text-heading-lg">{t.title}</h2>
          </div>
          <p className="max-w-[40ch] text-body text-stone md:text-right">{t.body}</p>
        </Reveal>
      ) : null}

      <Reveal pop>
        <ol className="engage-steps grid overflow-hidden rounded-[32px] bg-ink text-snow sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((step, index) => (
            <li
              key={step.name}
              className={`engage-step group relative flex flex-col gap-5 p-8 md:p-9 ${index > 0 ? "border-t border-white/10 sm:border-t-0 sm:border-l" : ""} ${index === 2 ? "sm:border-t sm:border-l-0 lg:border-t-0 lg:border-l" : ""} ${index === 3 ? "sm:border-t lg:border-t-0" : ""}`}
            >
              <span
                aria-hidden="true"
                className="h-[2px] w-full overflow-hidden rounded-full bg-white/10"
              >
                <span
                  className="engage-fill block h-full w-full origin-left bg-signal"
                  style={{ animationDelay: `${index * 2}s` }}
                />
              </span>
              <span
                aria-hidden="true"
                className="engage-num font-display text-[72px] leading-none tracking-[-0.04em] md:text-[84px]"
              >
                0{index + 1}
              </span>
              <div className="mt-4 flex flex-col gap-2.5">
                <h3 className="font-sans text-[20px] font-medium text-snow">{step.name}</h3>
                <p className="text-[14px] leading-[1.6] text-silver">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      {compact ? null : (
        <ul className="grid items-stretch gap-4 lg:grid-cols-3 lg:items-center">
          {t.packages.map((pkg, index) => {
            const featured = "featured" in pkg && pkg.featured;
            return (
              <li key={pkg.name}>
                <Reveal
                  pop
                  delay={index}
                  className={`flex h-full flex-col gap-6 rounded-[28px] p-8 md:p-9 ${
                    featured
                      ? "bg-snow shadow-[0_40px_80px_-40px_rgba(17,17,17,0.35)] ring-1 ring-signal/25 lg:py-12"
                      : "border border-ink/[0.07] bg-snow/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="tabular text-[13px] text-stone">0{index + 1}</span>
                    {featured ? (
                      <span className="rounded-badges bg-signal px-3 py-1 text-[11px] font-medium text-snow">
                        {t.featured}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-heading-sm">{pkg.name}</h3>
                    <p className="text-[15px] leading-[1.55] text-stone">{pkg.detail}</p>
                  </div>
                  <ul className="flex flex-col border-t border-ink/[0.07]">
                    {pkg.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 border-b border-ink/[0.07] py-3 text-[14px] text-graphite-ink"
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className="size-4 shrink-0 text-signal"
                          aria-hidden="true"
                        >
                          <path
                            d="M3.5 8.5l3 3 6-7"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {featured ? (
                    <PillButton href="/contact" className="mt-auto self-start">
                      {t.discuss}
                    </PillButton>
                  ) : (
                    <SmartLink
                      href="/contact"
                      className="group mt-auto inline-flex items-center gap-2 text-[14px] font-medium text-ink"
                    >
                      {t.discuss}
                      <span
                        aria-hidden="true"
                        className="text-signal transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </SmartLink>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

type LinkKind = "linkedin" | "github" | "email" | "portfolio";

/** Brand marks are filled; the two utility icons are drawn in the same 1.6px line. */
const ICONS: Record<LinkKind, ReactNode> = {
  linkedin: (
    <path
      fill="currentColor"
      stroke="none"
      d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z"
    />
  ),
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57l-.02-2.04c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22l-.01 3.29c0 .32.21.69.82.57A12 12 0 0 0 12 .3"
    />
  ),
  email: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  portfolio: <path d="M8 16L16 8M9.5 8H16v6.5" />,
};

export function FounderLinks({
  member,
  lang,
  tone = "snow",
}: {
  member: (typeof team)[number];
  lang: Lang;
  /** Fill of the live buttons: snow on the grey card, fog on white. */
  tone?: "snow" | "fog";
}) {
  const t = getCopy(lang).team;
  const links: { kind: LinkKind; label: string; href?: string }[] = [
    { kind: "linkedin", label: t.links.linkedin, href: member.links.linkedin },
    { kind: "github", label: "GitHub", href: `https://github.com/${member.github}` },
    {
      kind: "email",
      label: t.links.email,
      href: member.links.email ? `mailto:${member.links.email}` : undefined,
    },
    {
      kind: "portfolio",
      label: t.links.portfolio,
      href:
        member.links.portfolio && !member.links.portfolio.includes("github.com")
          ? member.links.portfolio
          : undefined,
    },
  ];
  return (
    <ul className="flex items-center gap-2">
      {links.map(({ kind, label, href }) => {
        const icon = (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="size-[18px]"
          >
            {ICONS[kind]}
          </svg>
        );
        return (
          <li key={kind}>
            {href ? (
              <SmartLink
                href={href}
                aria-label={`${member.name} — ${label}`}
                className={`flex size-10 items-center justify-center rounded-full text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:text-snow ${tone === "snow" ? "bg-snow shadow-button" : "bg-fog"}`}
              >
                {icon}
              </SmartLink>
            ) : (
              <span
                title={`${label} · ${t.links.soon}`}
                className="flex size-10 items-center justify-center rounded-full border border-dashed border-ink/20 text-stone/70"
              >
                {icon}
                <span className="sr-only">
                  {label} · {t.links.soon}
                </span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * The three co-founders: colour portraits on one studio backdrop (the card continues the
 * photo's own ground), then number and "Co-founder", the name and the role in signal red, with
 * the same line structure on every card. Links sit in a row of round icon
 * buttons; links that aren't published yet show as dashed placeholders.
 */
export function Founders({ lang }: { lang: Lang }) {
  const t = getCopy(lang).team;
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {team.map((member, index) => (
        <li key={member.github}>
          <Reveal
            pop
            delay={index}
            className="founder group flex h-full flex-col overflow-hidden rounded-[28px] bg-[#dddbd8]"
          >
            <div className="relative overflow-hidden">
              {/* biome-ignore lint/performance/noImgElement: prepared portrait; next/image adds nothing here */}
              <img
                src={member.photo}
                alt={member.name}
                className="aspect-[3/4] w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
              />
            </div>
            <div className="relative z-10 -mt-12 flex flex-1 flex-col gap-4 px-6 pb-6 md:px-7 md:pb-7">
              <p className="eyebrow flex items-center gap-2">
                <span className="tabular text-signal">0{index + 1}</span>
                <span aria-hidden="true" className="h-px w-5 bg-signal" />
                {t.cofounder}
              </p>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-[26px] leading-[1.1] tracking-[-0.02em] text-ink">
                  {member.name}
                </h3>
                <p className="text-[14px] font-medium whitespace-nowrap text-signal">
                  {member.role[lang]}
                </p>
              </div>
              <div className="mt-auto border-t border-ink/10 pt-4">
                <FounderLinks member={member} lang={lang} />
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

/**
 * Where we're going: a full-bleed dark panel over a photograph of the work we build for, with
 * the statement in large type and three horizons — now, twelve months, beyond — on one line
 * that draws itself, the present marked in signal red.
 */
export function Vision({ lang }: { lang: Lang }) {
  const t = getCopy(lang).team.vision;
  return (
    <Reveal className="vision relative isolate overflow-hidden rounded-[32px] bg-ink text-snow">
      {/* biome-ignore lint/performance/noImgElement: open-licence editorial photo behind the statement */}
      <img
        src="/images/open/workers.jpg"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 size-full object-cover opacity-35"
      />
      <span aria-hidden="true" className="vision-wash absolute inset-0 -z-10" />
      <div className="flex flex-col gap-14 p-8 md:p-14 lg:p-16">
        <div className="flex flex-col gap-5">
          <p className="eyebrow flex items-center gap-2 text-silver">
            <span aria-hidden="true" className="h-px w-6 bg-signal" />
            {t.title}
          </p>
          <p className="max-w-[18ch] font-display text-[36px] leading-[1.08] tracking-[-1px] md:text-[60px] md:tracking-[-1.6px]">
            {t.statement}
          </p>
          <p className="max-w-[60ch] text-[16px] leading-[1.65] text-silver md:text-[17px]">
            {t.body}
          </p>
        </div>
        <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
          <span
            aria-hidden="true"
            className="absolute top-[7px] right-0 left-0 hidden h-px bg-white/15 md:block"
          >
            <span className="grow-x block h-full bg-signal" />
          </span>
          {t.horizons.map((horizon, index) => (
            <li key={horizon.when} className="relative flex flex-col gap-3 md:pt-8">
              <span
                aria-hidden="true"
                className={`hidden size-[15px] rounded-full border-2 md:absolute md:top-0 md:left-0 md:block ${index === 0 ? "border-signal bg-signal" : "border-white/40 bg-ink"}`}
              />
              <span className={`eyebrow ${index === 0 ? "text-signal" : "text-silver"}`}>
                {horizon.when}
              </span>
              <h3 className="text-[22px] leading-[1.25] text-snow">{horizon.title}</h3>
              <p className="text-[14px] leading-[1.6] text-silver">{horizon.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
