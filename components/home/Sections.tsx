import type { ReactNode } from "react";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { DraftTag, PillButton, SectionHeading, SmartLink } from "@/components/ui/Primitives";
import {
  engagement,
  hero,
  productsSection,
  teamSection,
  testimonialsSection,
} from "@/content/copy";
import { organizers, team, testimonials } from "@/content/people";
import { labProjects } from "@/content/products";
import type { Product, ProductSlug } from "@/content/types";

/**
 * Organizer marquee: two rows drifting in opposite directions with edge fades. Every mark sits
 * in the same 40px box at one tone; brands without a normalized file render as a wordmark.
 */
export function LogoMarquee() {
  const rows = [
    organizers.filter((_, index) => index % 2 === 0),
    organizers.filter((_, index) => index % 2 === 1),
  ];
  return (
    <section aria-label={hero.trustLabel} className="page-width relative flex flex-col gap-8">
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

/** Monochrome glyph per product, drawn on a 24px grid at the kit's 1.5 stroke. */
const GLYPHS: Record<ProductSlug, ReactNode> = {
  weatherise: (
    <path d="M7 17.5h9.5a3.5 3.5 0 0 0 .4-7A5 5 0 0 0 7.3 9.2 4 4 0 0 0 7 17.5zM12 20.5v1.5M8.5 20.5l-.75 1.3M15.5 20.5l.75 1.3" />
  ),
  lantern: (
    <path d="M9 4h6M12 2v2M8 7h8l1 3v6l-1 3H8l-1-3v-6l1-3zM12 11.5c1 1 1 2.5 0 3.5-1-1-1-2.5 0-3.5zM9 22h6" />
  ),
  ignis: (
    <path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.3 1.5 1 2.5 2 3 0-3.5 0-6 1-8.5z" />
  ),
  unfound: <path d="M6 21V10a6 6 0 0 1 12 0v11M10 21v-9a2 2 0 0 1 4 0v9" />,
};

/** Product wordmark strip and the headline numbers, between the method and the showcase. */
export function ProductStrip({ products }: { products: Product[] }) {
  return (
    <div className="page-width flex flex-col gap-12">
      <Reveal>
        <ul className="grid grid-cols-2 border-y border-ink/10 md:grid-cols-4">
          {products.map((product, index) => (
            <li
              key={product.slug}
              className={`border-ink/10 ${index % 2 === 1 ? "border-l" : ""} ${index === 2 ? "md:border-l" : ""} ${index > 1 ? "border-t md:border-t-0" : ""}`}
            >
              <SmartLink
                href={`/work/${product.slug}`}
                className="group flex h-28 items-center justify-center gap-3 text-graphite-ink transition-colors hover:text-ink md:h-32"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="size-6 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:text-signal"
                >
                  {GLYPHS[product.slug]}
                </svg>
                <span className="font-display text-[22px] tracking-[-0.02em] md:text-[26px]">
                  {product.name}
                </span>
              </SmartLink>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={1}>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {productsSection.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-[44px] leading-none tracking-[-0.04em] text-ink md:text-[60px]">
                <CountUp text={stat.value} className="tabular" />
              </dd>
              <dd className="max-w-[22ch] text-[14px] text-stone">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  );
}

/** Smaller shipped work, as a quiet list under the core four. */
export function LabList({ linkAll = true }: { linkAll?: boolean }) {
  return (
    <div className="page-width flex flex-col gap-6">
      <Reveal>
        <div className="flex items-end justify-between gap-6">
          <h3 className="text-heading-sm">{productsSection.moreTitle}</h3>
          {linkAll ? (
            <SmartLink
              href="/work"
              className="text-[14px] font-medium text-ink underline underline-offset-4"
            >
              All products
            </SmartLink>
          ) : null}
        </div>
      </Reveal>
      <Reveal delay={1}>
        <ul className="grid gap-px overflow-hidden rounded-cards bg-ink/[0.07] md:grid-cols-2">
          {labProjects.map((project) => (
            <li key={project.name} className="flex flex-col gap-2 bg-snow p-6 md:p-7">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[16px] font-medium text-ink">{project.name}</span>
                <span className="tabular text-[12px] text-stone">{project.period}</span>
              </div>
              <p className="text-[13px] text-stone">{project.event}</p>
              <p className="text-[14px] text-graphite-ink">{project.oneLine}</p>
              {project.result || project.href ? (
                <div className="mt-1 flex items-center gap-4 text-[13px]">
                  {project.result ? <span className="text-ink">{project.result}</span> : null}
                  {project.href ? (
                    <SmartLink
                      href={project.href}
                      className="font-medium text-ink underline underline-offset-4"
                    >
                      Live demo ↗
                    </SmartLink>
                  ) : null}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

/** Initials-free monogram: the first letter of the role, so drafts never imply a real name. */
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
export function Testimonials() {
  const rows = [testimonials.slice(0, 3), testimonials.slice(3)];
  return (
    <section className="section relative overflow-hidden bg-fog">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute top-10 left-[8%] size-[420px] rounded-full bg-signal/15 blur-[110px]" />
        <span className="absolute right-[6%] bottom-0 size-[480px] rounded-full bg-graphite-ink/20 blur-[120px]" />
      </div>
      <div className="relative flex flex-col gap-12">
        <div className="page-width flex flex-col gap-4">
          <Reveal>
            <SectionHeading
              eyebrow={testimonialsSection.eyebrow}
              title={testimonialsSection.title}
            />
          </Reveal>
          <p className="text-[13px] text-stone">{testimonialsSection.draftNote}</p>
        </div>
        <div className="flex flex-col gap-5">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex === 0 ? "a" : "b"} className="marquee-fade overflow-hidden py-2">
              <div
                className={`marquee marquee-slow flex w-max ${rowIndex === 1 ? "marquee-reverse" : ""}`}
              >
                {[0, 1, 2, 3].map((copy) => (
                  <ul
                    key={copy === 0 ? "base" : `copy-${copy}`}
                    aria-hidden={copy > 0 || undefined}
                    className="flex gap-5 pr-5"
                  >
                    {row.map((item) => (
                      <li
                        key={item.role}
                        className="glass flex w-[320px] flex-col gap-6 p-6 md:w-[400px] md:p-7"
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
                          {item.draft ? <DraftTag /> : null}
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

/** The engagement path with its gates, then the three packages; the middle one is featured. */
export function Engagement({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col gap-10">
      <Reveal>
        <ol className="grid gap-px overflow-hidden rounded-cards bg-ink/[0.07] md:grid-cols-4">
          {engagement.steps.map((step, index) => (
            <li key={step.name} className="relative flex flex-col gap-3 bg-snow p-6 md:p-7">
              <div className="flex items-center justify-between">
                <span className="tabular text-[12px] text-stone">Step {index + 1}</span>
                <span className="rounded-badges bg-fog px-2.5 py-1 text-[11px] font-medium text-graphite-ink">
                  {step.time}
                </span>
              </div>
              <h3 className="font-sans text-[17px] font-medium">{step.name}</h3>
              <p className="text-[14px] text-stone">{step.detail}</p>
              {index < engagement.steps.length - 1 ? (
                <span className="mt-auto flex items-center gap-2 pt-2 text-[12px] font-medium text-signal">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-signal" />
                  Go / no-go gate
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </Reveal>
      {compact ? null : (
        <Reveal delay={1}>
          <ul className="grid gap-4 md:grid-cols-3">
            {engagement.packages.map((pkg) => (
              <li
                key={pkg.name}
                className={`flex flex-col gap-5 p-7 md:p-8 ${pkg.featured ? "glass-dark glass-solid" : "glass"}`}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={`font-sans text-[18px] font-medium ${pkg.featured ? "text-snow" : ""}`}
                  >
                    {pkg.name}
                  </h3>
                  {pkg.featured ? (
                    <span className="rounded-badges bg-signal px-3 py-1 text-[11px] font-medium text-snow">
                      Most teams start here
                    </span>
                  ) : null}
                </div>
                <p className={`text-[14px] ${pkg.featured ? "text-silver" : "text-stone"}`}>
                  {pkg.detail}
                </p>
                <ul className="flex flex-col gap-2">
                  {pkg.includes.map((item) => (
                    <li
                      key={item}
                      className={`flex items-center gap-2.5 text-[14px] ${pkg.featured ? "text-mist" : "text-graphite-ink"}`}
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
                  variant={pkg.featured ? "primary" : "ghost"}
                  className="mt-auto self-start"
                >
                  Discuss scope
                </PillButton>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </div>
  );
}

/** The three co-founders: monochrome portraits that lift and sharpen on hover. */
export function Founders() {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {team.map((member, index) => (
        <li key={member.github}>
          <Reveal delay={index} className="group flex flex-col gap-5">
            <div className="relative overflow-hidden rounded-cards bg-deep-slate">
              {member.photo ? (
                // biome-ignore lint/performance/noImgElement: normalized monochrome brand artwork; next/image adds nothing here
                <img
                  src={member.photo}
                  alt={`Portrait of ${member.name}`}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              ) : null}
              <span className="glass-dark absolute bottom-4 left-4 rounded-badges px-3.5 py-1.5 text-[12px] font-medium">
                {member.role}
              </span>
            </div>
            <div className="flex flex-col gap-1 px-1">
              <h3 className="font-sans text-[18px] font-medium">{member.name}</h3>
              <p className="text-[13px] text-stone">{member.study}</p>
              <SmartLink
                href={`https://github.com/${member.github}`}
                className="mt-2 self-start text-[14px] text-ink underline underline-offset-4"
              >
                github.com/{member.github}
              </SmartLink>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export function Vision() {
  return (
    <Reveal className="glass-dark glass-solid flex flex-col gap-6 p-8 md:flex-row md:items-start md:gap-16 md:p-12">
      <h3 className="shrink-0 text-heading-sm text-snow md:w-[14ch]">{teamSection.vision.title}</h3>
      <p className="max-w-[62ch] text-[17px] leading-[1.6] text-silver">
        {teamSection.vision.body}
      </p>
    </Reveal>
  );
}
