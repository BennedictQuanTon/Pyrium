import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Welcome } from "@/components/motion/Welcome";
import {
  Audience,
  ContactForm,
  EngagementSteps,
  FeaturePanels,
  Footer,
  Layers,
  LogoMarquee,
  Metrics,
  Packages,
  Principles,
  ProjectCard,
  SpendChart,
  StatCards,
  TeamCards,
  TestimonialCards,
  Vision,
} from "@/components/ui/Blocks";
import { Nav } from "@/components/ui/Nav";
import { PillButton, SectionHeading } from "@/components/ui/Primitives";
import {
  closing,
  contact,
  hero,
  problem,
  projectsSection,
  solution,
  teamSection,
  testimonialsSection,
} from "@/content/copy";
import { orderedProjects } from "@/content/projects";

export const metadata: Metadata = { title: "Private AI, engineered for the real business." };

/**
 * The Pyrium landing page: one light, quiet page in the Landing_DESIGN.md voice with the brand
 * kit's single red accent. Sections follow the agreed structure — centered hero over the red
 * gradient with the organizer marquee, problem, solution, projects, testimonials, contact,
 * team, then the closing statement and citations in the footer.
 */
export default function LandingPage() {
  return (
    <>
      <Welcome />
      <Nav />
      <main id="main">
        {/* 1 · Hero, centered like the reference: display headline, sub, CTA row inside the red
        arc; the trust line sits above the two-row organizer marquee beneath the arc's edge. */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="arc-bloom pointer-events-none absolute inset-0 bg-gradient-arc"
          />
          <div className="page-width relative flex flex-col items-center gap-7 pt-40 pb-16 text-center md:gap-8 md:pt-52 md:pb-20">
            <h1
              className="hero-in max-w-[16ch] text-[42px] leading-[1.1] tracking-[-0.8px] text-snow md:text-[64px] md:tracking-[-1.3px] lg:text-[80px] lg:tracking-[-1.6px]"
              style={{ ["--hero-i" as string]: 0 }}
            >
              {hero.title}
            </h1>
            <p
              className="hero-in max-w-[52ch] text-[17px] leading-[1.55] font-medium text-snow md:text-[20px]"
              style={{ ["--hero-i" as string]: 1 }}
            >
              {hero.subtitle}
            </p>
            <p
              className="hero-in text-[14px] font-medium text-snow/70"
              style={{ ["--hero-i" as string]: 2 }}
            >
              {hero.trustStat}
            </p>
            <div
              className="hero-in flex flex-wrap justify-center gap-3"
              style={{ ["--hero-i" as string]: 3 }}
            >
              <PillButton href="#contact">{hero.primaryCta}</PillButton>
              <PillButton href="#solution" variant="ghost">
                {hero.secondaryCta}
              </PillButton>
            </div>
          </div>
          {/* Two counter-drifting logo rows riding the arc's fade, white in the red zone. */}
          <div className="hero-in relative pb-20 md:pb-28" style={{ ["--hero-i" as string]: 4 }}>
            <p className="page-width mb-7 text-center text-[12px] font-medium tracking-[0.14em] text-graphite-ink/80 uppercase">
              {hero.trustLabel}
            </p>
            <LogoMarquee />
          </div>
        </section>

        {/* 2 · The problem, over the brand sheet's "control grid" field */}
        <section id="problem" className="section bg-blueprint overflow-hidden">
          <div className="page-width flex flex-col gap-14">
            <Reveal>
              <SectionHeading title={problem.title} body={problem.body} />
            </Reveal>
            <Reveal delay={1}>
              <StatCards />
            </Reveal>
            <div className="grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-stretch">
              <Reveal className="h-full">
                <SpendChart />
              </Reveal>
              <Reveal delay={1} className="h-full">
                <div className="flex h-full flex-col justify-center gap-6 rounded-cards bg-deep-slate p-8 md:p-12">
                  <p className="text-heading-sm text-snow md:text-heading">
                    The gap isn't adoption. It's what happens after the demo.
                  </p>
                  <p className="max-w-[48ch] text-[15px] text-silver">
                    Agents that complete real work remain rare, and governance is rarer. That
                    distance — between broad AI use and governed production systems — is where
                    Pyrium works.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 3 · The solution: what Pyrium is, its principles, and who it serves */}
        <section id="solution" className="section bg-planes">
          <div className="page-width relative flex flex-col gap-12">
            <Reveal>
              <SectionHeading title={solution.title} body={solution.body} />
            </Reveal>
            <Reveal delay={1}>
              <Principles />
            </Reveal>
            <Reveal delay={1}>
              <FeaturePanels />
            </Reveal>
            <div className="grid gap-4 md:grid-cols-2">
              <Reveal className="h-full">
                <div className="card flex h-full flex-col gap-4">
                  <h3 className="font-sans text-[16px] font-medium">
                    How a Pyrium system is built
                  </h3>
                  <Layers />
                </div>
              </Reveal>
              <div className="flex flex-col gap-4">
                <Reveal delay={1} className="h-full">
                  <div className="h-full">
                    <Audience />
                  </div>
                </Reveal>
                <Reveal delay={2}>
                  <Metrics />
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* 4 · Every project the team has shipped, as a carousel of frames */}
        <section id="projects" className="section bg-snow">
          <div className="page-width flex flex-col gap-10">
            <Reveal>
              <SectionHeading title={projectsSection.title} body={projectsSection.body} />
            </Reveal>
          </div>
          <Reveal delay={1}>
            <ul className="no-scrollbar mt-10 flex snap-x gap-6 overflow-x-auto px-4 pb-4 md:px-[max(2rem,calc((100vw-1200px)/2))]">
              {orderedProjects.map((project) => (
                <li key={project.id} className="w-[300px] shrink-0 snap-start md:w-[440px]">
                  <ProjectCard project={project} frame={false} />
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* 5 · Testimonials from the people who used or built with us */}
        <section className="section bg-snow">
          <div className="page-width flex flex-col gap-10">
            <Reveal>
              <SectionHeading title={testimonialsSection.title} />
            </Reveal>
            <Reveal delay={1}>
              <TestimonialCards scroll={false} />
            </Reveal>
          </div>
        </section>

        {/* 6 · Contact: engagement path, packages, and the form */}
        <section id="contact" className="section bg-blueprint">
          <div className="page-width flex flex-col gap-12">
            <Reveal>
              <SectionHeading title={contact.title} body={contact.body} />
            </Reveal>
            <div className="grid gap-6 md:grid-cols-[3fr_2fr] md:items-start">
              <div className="flex flex-col gap-6">
                <Reveal>
                  <EngagementSteps />
                </Reveal>
                <Reveal delay={1}>
                  <Packages />
                </Reveal>
              </div>
              <Reveal delay={2}>
                <div id="contact-form" className="scroll-mt-28">
                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 7 · The three of us, and where we're going */}
        <section id="team" className="section bg-snow">
          <div className="page-width flex flex-col gap-12">
            <Reveal>
              <SectionHeading title={teamSection.title} />
            </Reveal>
            <Reveal delay={1}>
              <TeamCards />
            </Reveal>
            <Reveal delay={2}>
              <Vision />
            </Reveal>
          </div>
        </section>

        {/* 8 · Closing statement inside the brand sheet's "signal frame"; citations in the footer */}
        <section className="signal-frame relative overflow-hidden">
          <div className="page-width relative flex flex-col items-center gap-5 py-28 text-center md:py-40">
            <Reveal>
              <h2 className="max-w-[18ch] text-heading-md md:text-heading-lg">{closing.title}</h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="max-w-[44ch] text-body text-stone md:text-subheading">{closing.body}</p>
            </Reveal>
            <Reveal delay={2}>
              <PillButton href="#contact">{hero.primaryCta}</PillButton>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
