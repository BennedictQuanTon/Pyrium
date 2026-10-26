import type { ReactNode } from "react";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { DraftTag, PillButton, SectionHeading, SmartLink } from "@/components/ui/Primitives";
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
 * The four product lockups, each in its own brand, then three headline numbers — people
 * reached, money saved (an estimate, marked and explained), recognitions won — that count up
 * and pop in, with a red rule drawing under each.
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
      <dl className="grid gap-12 md:grid-cols-3 md:gap-8">
        {t.stats.map((stat, index) => (
          <Reveal key={stat.label} pop delay={index} className="stat flex flex-col gap-3">
            <dt className="sr-only">{stat.label}</dt>
            <dd className="flex items-start gap-1 font-display text-[72px] leading-[0.95] tracking-[-0.05em] text-ink md:text-[88px] lg:text-[104px]">
              <CountUp text={stat.value} className="tabular" />
              {"estimate" in stat && stat.estimate ? (
                <a
                  href="#estimate-note"
                  className="mt-3 text-[14px] font-medium tracking-normal text-signal underline-offset-2 hover:underline"
                >
                  {t.estimateMark}
                </a>
              ) : null}
            </dd>
            <span aria-hidden="true" className="stat-rule h-[2px] w-16 rounded-full bg-signal" />
            <dd className="max-w-[26ch] text-[16px] leading-[1.5] text-graphite-ink">
              {stat.label}
            </dd>
            {index === t.stats.length - 1 ? (
              <dd className="flex flex-wrap gap-1.5 pt-1">
                {t.awards.map((award) => (
                  <span
                    key={award}
                    className="rounded-badges border border-ink/10 bg-snow px-2.5 py-1 text-[11px] whitespace-nowrap text-graphite-ink"
                  >
                    {award}
                  </span>
                ))}
              </dd>
            ) : null}
          </Reveal>
        ))}
      </dl>
      <p id="estimate-note" className="-mt-6 max-w-[90ch] text-[12px] text-stone">
        {t.estimateNote}
      </p>
    </div>
  );
}

/** Monogram from the role's first letter, so drafts never imply a real name. */
function Monogram({ text }: { text: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-[14px] font-medium text-snow"
    >
      {text.charAt(0)}
    </span>
  );
}

/**
 * Two rows of glass quote cards drifting in opposite directions over a soft red-and-grey
 * field, pausing under the pointer. Drafts are labelled until each person approves them.
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
          <p className="text-[13px] text-stone">{t.draftNote}</p>
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
                    {row.map((item) => (
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
                        <div className="mt-auto flex items-center gap-3">
                          <Monogram text={item.name ?? item.role} />
                          <span className="flex min-w-0 flex-1 flex-col">
                            {item.name ? (
                              <span className="text-[14px] font-medium">{item.name}</span>
                            ) : null}
                            <span className="text-[13px] text-stone">{item.role}</span>
                          </span>
                          {item.draft ? <DraftTag label={copy.showcase.draft} /> : null}
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
 * Working together, as a journey: the heading stays pinned on the left while the four steps
 * run down a rail on the right, the rail filling red as each step arrives, with a go / no-go
 * gate drawn between steps. The three packages follow as cards; the pilot is featured.
 */
export function Engagement({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const t = getCopy(lang).engagement;
  return (
    <div className="flex flex-col gap-16">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal className="flex flex-col gap-4 self-start lg:sticky lg:top-32">
          <p className="eyebrow flex items-center gap-2">
            <span aria-hidden="true" className="h-px w-6 bg-signal" />
            {t.eyebrow}
          </p>
          <h2 className="max-w-[16ch] text-heading md:text-heading-lg">{t.title}</h2>
          <p className="max-w-[44ch] text-body text-stone md:text-subheading">{t.body}</p>
        </Reveal>
        <ol className="journey relative flex flex-col">
          {t.steps.map((step, index) => (
            <li key={step.name}>
              <Reveal className="journey-step relative grid grid-cols-[2.75rem_1fr] gap-5 pb-10 last:pb-0 md:gap-7">
                <div className="relative flex flex-col items-center">
                  <span className="journey-node relative z-10 flex size-11 items-center justify-center rounded-full border border-ink/15 bg-snow font-display text-[17px] text-ink">
                    {index + 1}
                  </span>
                  {index < t.steps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute top-11 bottom-[-2.5rem] w-px bg-ink/10"
                    >
                      <span className="journey-fill block h-full w-full origin-top bg-signal" />
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-col gap-3 pt-1.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-sans text-[20px] font-medium text-ink">{step.name}</h3>
                    <span className="rounded-badges bg-ink/[0.05] px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-graphite-ink">
                      {step.time}
                    </span>
                  </div>
                  <p className="max-w-[52ch] text-[15px] leading-[1.6] text-stone">{step.detail}</p>
                  {index < t.steps.length - 1 ? (
                    <span className="mt-1 inline-flex items-center gap-2 self-start rounded-badges border border-signal/25 px-3 py-1 text-[12px] font-medium text-signal">
                      <span aria-hidden="true" className="size-1.5 rotate-45 bg-signal" />
                      {t.gate}
                    </span>
                  ) : null}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
      {compact ? null : (
        <ul className="grid gap-4 md:grid-cols-3">
          {t.packages.map((pkg, index) => {
            const featured = "featured" in pkg && pkg.featured;
            return (
              <li key={pkg.name}>
                <Reveal
                  pop
                  delay={index}
                  className={`flex h-full flex-col gap-6 rounded-[28px] p-8 md:p-9 ${featured ? "bg-ink text-snow" : "bg-snow shadow-subtle"}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`tabular text-[13px] ${featured ? "text-silver" : "text-stone"}`}
                    >
                      0{index + 1}
                    </span>
                    {featured ? (
                      <span className="rounded-badges bg-signal px-3 py-1 text-[11px] font-medium text-snow">
                        {t.featured}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className={`text-heading-sm ${featured ? "text-snow" : ""}`}>{pkg.name}</h3>
                    <p
                      className={`text-[15px] leading-[1.55] ${featured ? "text-silver" : "text-stone"}`}
                    >
                      {pkg.detail}
                    </p>
                  </div>
                  <ul
                    className={`flex flex-col gap-2.5 border-t pt-5 ${featured ? "border-white/10" : "border-ink/[0.07]"}`}
                  >
                    {pkg.includes.map((item) => (
                      <li
                        key={item}
                        className={`flex items-center gap-2.5 text-[14px] ${featured ? "text-mist" : "text-graphite-ink"}`}
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
                            strokeWidth="1.5"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <PillButton
                    href="/contact"
                    variant={featured ? "primary" : "ghost"}
                    className="mt-auto self-start"
                  >
                    {t.discuss}
                  </PillButton>
                </Reveal>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const ICONS: Record<"linkedin" | "email" | "portfolio", ReactNode> = {
  linkedin: <path d="M6.5 9.5v8M6.5 6.5v.01M10.5 17.5v-4.5a3 3 0 0 1 6 0v4.5M10.5 9.5v8" />,
  email: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  portfolio: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5z" />
    </>
  ),
};

/**
 * The three co-founders: colour portraits on one studio backdrop (the card continues the
 * photo's own ground), name and role beneath, then LinkedIn, email and portfolio. Links that
 * aren't published yet render disabled with a "coming soon" label.
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
            <div className="relative z-10 -mt-10 flex flex-1 flex-col gap-5 px-6 pb-6">
              <div className="flex flex-col gap-1">
                <h3 className="font-sans text-[19px] font-medium text-ink">{member.name}</h3>
                <p className="text-[14px] text-graphite-ink">
                  {t.cofounder} · {member.role[lang]}
                </p>
              </div>
              <div className="mt-auto flex flex-wrap gap-2">
                {(["linkedin", "email", "portfolio"] as const).map((kind) => {
                  const value = member.links[kind];
                  const label = t.links[kind];
                  const icon = (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="size-4"
                    >
                      {ICONS[kind]}
                    </svg>
                  );
                  if (!value) {
                    return (
                      <span
                        key={kind}
                        title={t.links.soon}
                        className="inline-flex items-center gap-1.5 rounded-badges bg-white/40 px-3.5 py-2 text-[13px] text-stone"
                      >
                        {icon}
                        {label}
                      </span>
                    );
                  }
                  return (
                    <SmartLink
                      key={kind}
                      href={kind === "email" ? `mailto:${value}` : value}
                      aria-label={`${member.name} — ${label}`}
                      className="inline-flex items-center gap-1.5 rounded-badges bg-snow px-3.5 py-2 text-[13px] font-medium text-ink shadow-button transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:text-snow"
                    >
                      {icon}
                      {label}
                    </SmartLink>
                  );
                })}
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
