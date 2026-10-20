import {
  contact,
  footer,
  hero,
  nav,
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
import { Badge, BrowserFrame, Citation, PillButton, Wordmark } from "./Primitives";

/* Shared, design-neutral blocks. Each design route arranges these; none of them adds colour. */

export function Nav() {
  return (
    <header className="sticky top-4 z-40 px-4">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-page items-center justify-between rounded-overlays bg-snow pl-6 pr-2 shadow-subtle"
      >
        <a href="#main" aria-label="Pyrium, back to top" className="shrink-0">
          {/* Narrower on phones so the CTA pill stays on one line beside it. */}
          <Wordmark className="w-[132px] md:w-[180px]" />
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-[14px] text-stone hover:text-ink">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <PillButton href="#contact">{hero.primaryCta}</PillButton>
      </nav>
    </header>
  );
}

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

export function OrganizerRow({
  align = "center",
  onDark = false,
}: {
  align?: "center" | "left";
  onDark?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-3 ${align === "center" ? "items-center" : "items-start"}`}>
      <p className={`text-[12px] ${onDark ? "text-silver" : "text-stone"}`}>{hero.trustLabel}</p>
      <ul
        className={`flex flex-wrap gap-x-6 gap-y-2 ${align === "center" ? "justify-center" : ""}`}
        aria-label={hero.trustLabel}
      >
        {organizers.map((organizer) => (
          <li
            key={organizer.id}
            className={`text-[15px] font-medium tracking-[-0.01em] ${onDark ? "text-silver" : "text-graphite-ink"}`}
          >
            {organizer.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StatCards({ columns = 3 }: { columns?: 1 | 3 }) {
  return (
    <ul className={`grid gap-4 ${columns === 3 ? "md:grid-cols-3" : ""}`}>
      {problemStats.map((stat) => (
        <li key={stat.label} className="card flex flex-col gap-3">
          <span className="font-display text-heading font-light text-ink">{stat.value}</span>
          <span className="text-[15px] text-stone">
            {stat.label}
            <Citation id={stat.source} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Inline-SVG bar chart. Derived bars are drawn as outlines so they never pass for reported data. */
export function SpendChart() {
  const { bars, title, note, source } = problem.chart;
  const max = 4;
  const height = 180;
  return (
    <figure className="card flex flex-col gap-4">
      <figcaption className="text-[14px] font-medium text-ink">
        {title}
        <Citation id={source} />
      </figcaption>
      <svg viewBox="0 0 320 220" role="img" aria-labelledby="spend-chart-desc" className="w-full">
        <desc id="spend-chart-desc">
          {bars
            .map((bar) => `${bar.year}: ${bar.derived ? "about " : ""}US$${bar.value}T`)
            .join(", ")}
        </desc>
        <line x1="0" y1={height + 4} x2="320" y2={height + 4} stroke="#b2b2b2" strokeWidth="1" />
        {bars.map((bar, index) => {
          const barHeight = (bar.value / max) * height;
          const x = 30 + index * 100;
          return (
            <g key={bar.year}>
              <rect
                x={x}
                y={height + 4 - barHeight}
                width="60"
                height={barHeight}
                rx="6"
                fill={bar.derived ? "#ffffff" : "#111111"}
                stroke="#111111"
                strokeWidth="1.5"
                strokeDasharray={bar.derived ? "4 4" : undefined}
              />
              <text
                x={x + 30}
                y={height - barHeight - 4}
                textAnchor="middle"
                fontSize="13"
                fill="#111111"
              >
                {bar.derived ? "≈" : ""}
                {bar.value.toFixed(bar.value < 2 ? 2 : 1)}
              </text>
              <text x={x + 30} y={height + 24} textAnchor="middle" fontSize="12" fill="#636363">
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

export function Principles() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {solution.principles.map((principle) => (
        <li key={principle.title} className="card flex flex-col gap-2">
          <h3 className="font-sans text-[16px] font-medium">{principle.title}</h3>
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
    <div className="card flex flex-col gap-4">
      <h3 className="font-sans text-[16px] font-medium">{audience.title}</h3>
      <p className="text-[15px] text-stone">{audience.body}</p>
      <ul className="flex flex-wrap gap-2" aria-label="Typical buyers">
        {audience.buyers.map((buyer) => (
          <li key={buyer}>
            <span className="inline-flex rounded-badges bg-fog px-3 py-1 text-[12px] font-medium text-graphite-ink">
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
          className={`flex flex-col gap-4 rounded-cards p-6 ${onDark ? "bg-white/5" : "bg-snow shadow-subtle"}`}
        >
          <span
            className={`size-12 rounded-full ${onDark ? "bg-white/10" : "bg-mist"}`}
            aria-hidden="true"
          />
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
            <Wordmark width={240} />
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
