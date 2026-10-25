import type { Metadata } from "next";
import { Founders, Vision } from "@/components/home/Sections";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { PillButton, SectionHeading } from "@/components/ui/Primitives";
import { about, closing, teamSection } from "@/content/copy";
import { reach } from "@/content/products";

export const metadata: Metadata = { title: "About", description: about.body };

/**
 * About: the brand essence, the founders, the four principles, the vision and the twelve-month
 * path from proof to repeatability, each phase with its gate.
 */
export default function AboutPage() {
  return (
    <PageTransition>
      <PageHeader eyebrow={about.eyebrow} title={about.title} body={about.body} />

      {/* Brand line, large */}
      <section className="bg-fog py-20 md:py-28">
        <div className="page-width grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal>
            <p className="max-w-[18ch] font-display text-[40px] leading-[1.1] tracking-[-0.8px] text-ink md:text-[64px] md:tracking-[-1.4px]">
              Private AI. <span className="text-signal">Built to act.</span>
            </p>
          </Reveal>
          <Reveal delay={1} className="flex flex-col gap-1 md:text-right">
            <span className="font-display text-[56px] leading-none tracking-[-0.04em] text-ink">
              {reach.users}
            </span>
            <span className="text-[14px] text-stone">{reach.usersLabel}</span>
          </Reveal>
        </div>
      </section>

      {/* Founders */}
      <section className="section bg-snow">
        <div className="page-width flex flex-col gap-12">
          <Reveal>
            <SectionHeading eyebrow={teamSection.eyebrow} title={teamSection.title} />
          </Reveal>
          <Founders />
        </div>
      </section>

      {/* Principles */}
      <section className="section bg-blueprint">
        <div className="page-width flex flex-col gap-12">
          <Reveal>
            <SectionHeading eyebrow="Principles" title="Four things we hold every system to." />
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.principles.map((principle, index) => (
              <li key={principle.title}>
                <Reveal delay={index} className="glass flex h-full flex-col gap-4 p-7">
                  <span className="tabular text-[13px] text-signal">0{index + 1}</span>
                  <h3 className="font-sans text-[17px] font-medium">{principle.title}</h3>
                  <p className="text-[15px] text-stone">{principle.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Vision and roadmap */}
      <section className="section bg-fog">
        <div className="page-width flex flex-col gap-14">
          <Vision />
          <div className="flex flex-col gap-8">
            <Reveal>
              <SectionHeading
                eyebrow="The next twelve months"
                title="From proof to repeatability."
                body="Each phase has a gate. If the evidence isn't there, we don't move on."
                size="md"
              />
            </Reveal>
            <ol className="relative flex flex-col">
              <span
                aria-hidden="true"
                className="absolute top-2 bottom-2 left-[7px] w-px bg-ink/10"
              />
              {about.roadmap.map((phase, index) => (
                <li key={phase.phase}>
                  <Reveal
                    delay={index}
                    className="relative grid gap-2 py-5 pl-10 md:grid-cols-[14rem_1fr_1.4fr] md:gap-8"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute top-7 left-0 size-[15px] rounded-full border-2 ${index === 0 ? "border-signal bg-signal" : "border-ink/20 bg-fog"}`}
                    />
                    <span className="tabular text-[13px] text-stone">{phase.time}</span>
                    <span className="text-[17px] font-medium text-ink">{phase.phase}</span>
                    <span className="text-[14px] text-graphite-ink">
                      <span className="text-stone">Gate · </span>
                      {phase.gate}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="signal-frame relative overflow-hidden">
        <div className="page-width relative flex flex-col items-center gap-5 py-28 text-center md:py-36">
          <Reveal>
            <h2 className="max-w-[18ch] text-heading-md md:text-heading-lg">{closing.title}</h2>
          </Reveal>
          <Reveal delay={1}>
            <PillButton href="/contact">Talk to our team</PillButton>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
