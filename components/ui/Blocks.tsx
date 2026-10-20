import type { ReactNode } from "react";
import { CountUp } from "@/components/motion/CountUp";
import {
  contact,
  footer,
  hero,
  problem,
  problemStats,
  solution,
  teamSection,
  testimonialsSection,
} from "@/content/copy";
import { organizers, team, testimonials } from "@/content/people";
import { sourceOrder, sources } from "@/content/sources";
import type { Project } from "@/content/types";
import { MotionLoop } from "./MotionLoop";
import { Nav } from "./Nav";
import { Badge, BrowserFrame, Citation, PillButton, Wordmark } from "./Primitives";

export { Nav };

/* Shared, design-neutral blocks. Each design route arranges these; none of them adds colour. */

/** Hero email row: bare 0-radius input against the pill, as in Landing_DESIGN.md. */
export function EmailCta({ align = "center" }: { align?: "center" | "left" }) {
  return (
    <div
      className={`flex w-full max-w-[440px] flex-col gap-3 sm:flex-row sm:items-end ${align === "center" ? "mx-auto" : ""}`}
    >
      <label className="flex flex-1 flex-col gap-1 text-left text-[12px] text-stone">
        {hero.emailPlaceholder}
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="name@company.com"
          className="rounded-inputs border-b border-ink bg-transparent py-2 text-[15px] text-ink outline-none focus-visible:outline-2"
        />
      </label>
      <PillButton href="#contact">{hero.primaryCta}</PillButton>
    </div>
  );
}

/**
 * Organizer marquee, two rows drifting in opposite directions inside a contained frame with
 * edge fades, like the reference's logo wall. Rows split the organizer list so the two lines
 * aren't identical; every mark renders inside the same 40px box — scaled to fit, never
 * distorted — at one stone-grey tone, with wordmarks typeset at the same optical height for
 * brands without a normalized file. Each list is duplicated with aria-hidden so the loop
 * never shows an edge.
 */

/** Deterministic half-split: both rows keep their members across renders. */
function marqueeRows(): [typeof organizers, typeof organizers] {
  const top: typeof organizers = [];
  const bottom: typeof organizers = [];
  organizers.forEach((organizer, index) => {
    (index % 2 === 0 ? top : bottom).push(organizer);
  });
  return [top, bottom];
}

export function LogoMarquee() {
  const [topRow, bottomRow] = marqueeRows();
  const rows = [topRow, bottomRow];
  return (
    <section aria-label={hero.trustLabel} className="page-width relative flex flex-col gap-8">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex === 0 ? "a" : "b"} className="marquee-fade relative overflow-hidden">
          <div
            className={`marquee flex w-max items-center ${rowIndex === 1 ? "marquee-reverse" : ""}`}
          >
            {/* Four copies of the row, looped at -50% (two copies): even a short list stays
                wider than any viewport, so the drift never reveals a blank stretch. */}
            {[0, 1, 2, 3].map((copy) => (
              <ul
                key={copy === 0 ? "base" : `copy-${copy}`}
                aria-hidden={copy > 0 || undefined}
                className="flex items-center gap-16 pr-16 text-graphite-ink"
              >
                {row.map((organizer) => (
                  <li key={organizer.id} className="flex h-10 w-24 items-center justify-center">
                    {organizer.logo ? (
                      // One optical box for every mark: square icons fill it, wide wordmarks
                      // (Viettel, Google, OpenAI) scale to the box width at natural height —
                      // same visual weight across the row, nothing dwarfed or oversized.
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

export function StatCards({ columns = 3 }: { columns?: 1 | 3 }) {
  return (
    <ul className={`grid gap-5 ${columns === 3 ? "md:grid-cols-3" : ""}`}>
      {problemStats.map((stat) => (
        <li key={stat.label} className="card flex flex-col gap-4 px-8 py-10 md:px-10 md:py-12">
          <CountUp
            text={stat.value}
            className="font-display text-[44px] leading-none font-normal tracking-[-1px] text-signal md:text-[56px]"
          />
          <span className="max-w-[30ch] text-[16px] text-stone">
            {stat.label}
            <Citation id={stat.source} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Inline-SVG bar chart in the brand's block language: the published 2026 bar is a solid
 * signal-red block, derived bars are dashed outlines so they never pass for reported data.
 */
export function SpendChart() {
  const { bars, title, note, source } = problem.chart;
  const max = 4;
  const height = 200;
  return (
    <figure className="card flex h-full flex-col gap-5 px-8 py-8 md:px-10">
      <figcaption className="text-[15px] font-medium text-ink">
        {title}
        <Citation id={source} />
      </figcaption>
      <svg
        viewBox="0 0 340 240"
        role="img"
        aria-labelledby="spend-chart-desc"
        className="w-full flex-1"
        preserveAspectRatio="xMidYMax meet"
      >
        <desc id="spend-chart-desc">
          {bars
            .map((bar) => `${bar.year}: ${bar.derived ? "about " : ""}US$${bar.value}T`)
            .join(", ")}
        </desc>
        <line x1="0" y1={height + 8} x2="340" y2={height + 8} stroke="#b2b2b2" strokeWidth="1" />
        {bars.map((bar, index) => {
          const barHeight = (bar.value / max) * height;
          const x = 36 + index * 104;
          return (
            <g key={bar.year}>
              <rect
                x={x}
                y={height + 8 - barHeight}
                width="72"
                height={barHeight}
                rx="14"
                fill={bar.derived ? "none" : "#d9292f"}
                stroke="#d9292f"
                strokeWidth="1.5"
                strokeDasharray={bar.derived ? "5 5" : undefined}
              />
              <text
                x={x + 36}
                y={height - barHeight - 8}
                textAnchor="middle"
                fontSize="15"
                fontWeight="500"
                fill={bar.derived ? "#484758" : "#d9292f"}
              >
                {bar.derived ? "≈" : ""}
                {bar.value.toFixed(bar.value < 2 ? 2 : 1)}
              </text>
              <text x={x + 36} y={height + 32} textAnchor="middle" fontSize="13" fill="#636363">
                {bar.year}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="text-[12px] leading-[1.5] text-stone">{note}</p>
    </figure>
  );
}

/**
 * Two photo panels for the solution section: one private-infrastructure shot beside one
 * domain-intelligence shot, each captioned with the principle it embodies. Unsplash images
 * (open, source-honest photography) normalized to the kit's tonal restraint.
 */
export function FeaturePanels() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <figure className="group relative overflow-hidden rounded-cards">
        {/* biome-ignore lint/performance/noImgElement: static open-license photo; next/image adds nothing here */}
        <img
          src="/images/solution-racks.jpg"
          alt="Server racks in a private data centre — the infrastructure Pyrium deploys into"
          className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight/85 to-transparent p-6 pt-16">
          <span className="text-[16px] font-medium text-snow">
            Private by design — your racks, your control.
          </span>
        </figcaption>
      </figure>
      <figure className="group relative overflow-hidden rounded-cards">
        {/* biome-ignore lint/performance/noImgElement: static open-license photo; next/image adds nothing here */}
        <img
          src="/images/solution-earth.jpg"
          alt="A networked globe — domain intelligence across Vietnam and Southeast Asia"
          className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight/85 to-transparent p-6 pt-16">
          <span className="text-[16px] font-medium text-snow">
            Domain intelligence — tuned to your market's realities.
          </span>
        </figcaption>
      </figure>
    </div>
  );
}

/** Line icons keyed to each principle, drawn on a 24px grid, stroke at 1.5 like the kit. */
const PRINCIPLE_ICONS: Record<string, ReactNode> = {
  "Privacy by design": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.4-3 8.6-7 10-4-1.4-7-5.6-7-10V6l7-3z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </svg>
  ),
  "Controlled execution": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4" />
    </svg>
  ),
  "Efficient inference": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M13 3L5 13.5h6L11 21l8-10.5h-6L13 3z" strokeLinejoin="round" />
    </svg>
  ),
  "Domain intelligence": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.4 4 5.6 4 9s-1.5 6.6-4 9c-2.5-2.4-4-5.6-4-9s1.5-6.6 4-9z" />
    </svg>
  ),
};

/** Core features: icon in a red-tinted well, name, one line — the kit's restrained emphasis. */
export function Principles() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {solution.principles.map((principle) => (
        <li key={principle.title} className="card flex flex-col gap-4 px-7 py-8">
          <span
            className="flex size-11 items-center justify-center rounded-[12px] bg-signal/8 text-signal [&>svg]:size-5"
            aria-hidden="true"
          >
            {PRINCIPLE_ICONS[principle.title]}
          </span>
          <h3 className="font-sans text-[17px] font-medium">{principle.title}</h3>
          <p className="text-[15px] text-stone">{principle.body}</p>
        </li>
      ))}
    </ul>
  );
}

export function Layers({ onDark = false }: { onDark?: boolean }) {
  return (
    <ol className="flex flex-col">
      {solution.layers.map((layer, index) => (
        <li
          key={layer.name}
          className={`grid grid-cols-[2rem_1fr] gap-x-3 border-t py-3 md:grid-cols-[2rem_14rem_1fr] ${onDark ? "border-white/15" : "border-mist"}`}
        >
          <span className={`text-[13px] ${onDark ? "text-silver" : "text-stone"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`text-[15px] font-medium ${onDark ? "text-snow" : "text-ink"}`}>
            {layer.name}
          </span>
          <span
            className={`col-start-2 text-[14px] md:col-start-3 ${onDark ? "text-silver" : "text-stone"}`}
          >
            {layer.detail}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function Audience() {
  const { audience } = solution;
  return (
    <div className="flex flex-col gap-5 rounded-cards bg-deep-slate p-8 md:p-10">
      <h3 className="text-[20px] font-medium text-snow">{audience.title}</h3>
      <p className="text-[16px] leading-[1.6] text-silver">{audience.body}</p>
      <ul className="flex flex-wrap gap-2" aria-label="Typical buyers">
        {audience.buyers.map((buyer) => (
          <li key={buyer}>
            <span className="inline-flex rounded-badges bg-white/10 px-4 py-1.5 text-[13px] font-medium text-snow">
              {buyer}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** What every engagement measures. No values: those come from real pilots only. */
export function Metrics() {
  return (
    <div className="card flex flex-col gap-4">
      <h3 className="font-sans text-[16px] font-medium">What we measure on every engagement</h3>
      <ul className="grid gap-4 sm:grid-cols-2">
        {solution.metrics.map((metric) => (
          <li key={metric.name} className="flex flex-col gap-1 border-l border-mist pl-4">
            <span className="text-[15px] font-medium text-ink">{metric.name}</span>
            <span className="text-[14px] text-stone">{metric.detail}</span>
          </li>
        ))}
      </ul>
      <p className="text-[12px] text-stone">
        Baselines are set before each pilot; results are published only with the customer's
        permission.
      </p>
    </div>
  );
}

type ProjectCardProps = { project: Project; theme?: "light" | "dark"; frame?: boolean };

export function ProjectCard({ project, theme = "light", frame = true }: ProjectCardProps) {
  const dark = theme === "dark";
  const loop = (
    <MotionLoop
      name={`${project.motion}-${project.screenTour ? "light" : theme}`}
      label={`${project.title}: motion preview`}
      aspect="16 / 10"
    />
  );
  return (
    <article
      className={`flex h-full flex-col gap-5 rounded-cards p-6 ${dark ? "bg-white/5" : "bg-snow shadow-subtle"}`}
    >
      {frame && !dark ? (
        <BrowserFrame>{loop}</BrowserFrame>
      ) : (
        <div className="overflow-hidden rounded-card-inner">{loop}</div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <Badge onDark={dark}>{project.period}</Badge>
        {project.upcoming ? <Badge onDark={dark}>Upcoming</Badge> : null}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className={`text-heading-sm ${dark ? "text-snow" : ""}`}>{project.title}</h3>
        <p className={`text-[13px] ${dark ? "text-silver" : "text-stone"}`}>{project.event}</p>
      </div>
      <p className={`text-[15px] ${dark ? "text-mist" : "text-midnight"}`}>{project.oneLine}</p>
      {project.result ? (
        <p
          className={`border-l pl-3 text-[14px] ${dark ? "border-white/20 text-silver" : "border-mist text-graphite-ink"}`}
        >
          {project.result}
        </p>
      ) : null}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
        {project.stack.length > 0 ? (
          <ul className="flex flex-wrap gap-2" aria-label="Stack">
            {project.stack.map((item) => (
              <li
                key={item}
                className={`rounded-badges px-3 py-1 text-[12px] ${dark ? "bg-white/10 text-silver" : "bg-fog text-graphite-ink"}`}
              >
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <span />
        )}
        {project.href ? (
          <a
            href={project.href}
            className={`text-[14px] font-medium underline underline-offset-4 ${dark ? "text-snow" : "text-ink"}`}
          >
            Open live site
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function TestimonialCards({ scroll = true }: { scroll?: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[13px] text-stone">{testimonialsSection.placeholderNote}</p>
      <ul
        className={
          scroll
            ? "no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2"
            : "grid gap-4 md:grid-cols-3"
        }
      >
        {testimonials.map((testimonial) => (
          <li
            key={testimonial.context}
            className={`card flex flex-col gap-6 ${scroll ? "w-[300px] shrink-0 snap-start md:w-[360px]" : ""}`}
          >
            <Badge>Placeholder</Badge>
            <blockquote className="text-[15px] text-midnight">“{testimonial.quote}”</blockquote>
            <div className="mt-auto flex items-center gap-3">
              <span className="size-9 rounded-full bg-mist" aria-hidden="true" />
              <span className="flex flex-col">
                <span className="text-[14px] font-medium">{testimonial.name}</span>
                <span className="text-[12px] text-stone">{testimonial.context}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EngagementSteps() {
  return (
    <ol className="grid gap-4 md:grid-cols-2">
      {contact.steps.map((step, index) => (
        <li key={step.name} className="card flex flex-col gap-2">
          <span className="text-[13px] text-stone">Step {index + 1}</span>
          <h3 className="font-sans text-[16px] font-medium">{step.name}</h3>
          <p className="text-[14px] text-stone">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}

/** Engagement packages, described by scope only. Pricing is a discovery-call decision. */
export function Packages() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {contact.packages.map((pkg) => (
        <li key={pkg.name} className="card flex flex-col gap-2">
          <h3 className="font-sans text-[16px] font-medium">{pkg.name}</h3>
          <p className="text-[14px] text-stone">{pkg.detail}</p>
        </li>
      ))}
    </ul>
  );
}

/** Contact form shell. Not connected to a backend yet, and it says so. */
export function ContactForm() {
  return (
    <form className="card flex flex-col gap-5" aria-describedby="contact-form-note">
      <label className="flex flex-col gap-1 text-[12px] text-stone">
        Name
        <input
          name="name"
          autoComplete="name"
          className="rounded-inputs border-b border-ink bg-transparent py-2 text-[15px] text-ink outline-none"
        />
      </label>
      <label className="flex flex-col gap-1 text-[12px] text-stone">
        Work email
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="name@company.com"
          className="rounded-inputs border-b border-ink bg-transparent py-2 text-[15px] text-ink outline-none"
        />
      </label>
      <label className="flex flex-col gap-1 text-[12px] text-stone">
        The workflow you'd like to fix
        <textarea
          name="workflow"
          rows={3}
          className="resize-none rounded-inputs border-b border-ink bg-transparent py-2 text-[15px] text-ink outline-none"
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          aria-disabled="true"
          className="inline-flex cursor-not-allowed items-center rounded-buttons bg-signal px-6 py-3 text-[15px] font-medium text-signal-ink opacity-60 shadow-button"
        >
          Send
        </button>
        <p id="contact-form-note" className="text-[12px] text-stone">
          {contact.formNote}
        </p>
      </div>
    </form>
  );
}

export function TeamCards({ onDark = false }: { onDark?: boolean }) {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {team.map((member) => (
        <li
          key={member.github}
          className={`flex flex-col gap-4 overflow-hidden rounded-cards p-6 ${onDark ? "bg-white/5" : "bg-snow shadow-subtle"}`}
        >
          {member.photo ? (
            // Full-width portrait above the identity block; the monochrome artwork carries
            // its own dark ground, so no placeholder dot is needed.
            // biome-ignore lint/performance/noImgElement: normalized monochrome brand artwork; next/image adds nothing here
            <img
              src={member.photo}
              alt={`Portrait of ${member.name}`}
              className="aspect-3/4 w-full rounded-card-inner object-cover"
            />
          ) : (
            <span
              className={`size-12 rounded-full ${onDark ? "bg-white/10" : "bg-mist"}`}
              aria-hidden="true"
            />
          )}
          <div className="flex flex-col gap-1">
            <h3 className={`font-sans text-[16px] font-medium ${onDark ? "text-snow" : ""}`}>
              {member.name}
            </h3>
            <p className={`text-[13px] ${onDark ? "text-silver" : "text-stone"}`}>
              {member.role ?? teamSection.rolePlaceholder}
            </p>
          </div>
          <a
            href={`https://github.com/${member.github}`}
            className={`text-[14px] underline underline-offset-4 ${onDark ? "text-mist" : "text-ink"}`}
          >
            github.com/{member.github}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Vision({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className="flex max-w-[60ch] flex-col gap-3">
      <h3 className={`text-heading-sm ${onDark ? "text-snow" : ""}`}>{teamSection.vision.title}</h3>
      <p className={`text-[16px] ${onDark ? "text-silver" : "text-stone"}`}>
        {teamSection.vision.body}
      </p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-snow">
      <div className="page-width flex flex-col gap-12 py-16">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex flex-col gap-2">
            <Wordmark width={240} variant="primary" />
            <p className="text-[14px] text-stone">{footer.tagline}</p>
          </div>
          <PillButton href="#contact">{hero.primaryCta}</PillButton>
        </div>
        <section aria-labelledby="sources-title" className="flex flex-col gap-4">
          <h2 id="sources-title" className="font-sans text-[14px] font-medium">
            {footer.citationsTitle}
          </h2>
          <ol className="flex flex-col gap-2">
            {sourceOrder.map((id, index) => {
              const source = sources[id];
              return (
                <li key={id} id={`source-${index + 1}`} className="text-[12px] text-stone">
                  [{index + 1}] {source.publisher} ({source.date}),{" "}
                  <a href={source.url} className="underline underline-offset-2 hover:text-ink">
                    {source.title}
                  </a>
                </li>
              );
            })}
          </ol>
        </section>
        <p className="text-[12px] text-stone">© 2026 Pyrium</p>
      </div>
    </footer>
  );
}
