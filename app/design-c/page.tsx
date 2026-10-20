import type { Metadata } from "next";
import {
  Audience,
  ContactForm,
  EmailCta,
  EngagementSteps,
  Footer,
  Layers,
  Metrics,
  Nav,
  OrganizerRow,
  Principles,
  ProjectCard,
  SpendChart,
  StatCards,
  TeamCards,
  TestimonialCards,
  Vision,
} from "@/components/ui/Blocks";
import { MotionLoop } from "@/components/ui/MotionLoop";
import { Badge, PillButton, SectionHeading } from "@/components/ui/Primitives";
import {
  contact,
  hero,
  problem,
  projectsSection,
  solution,
  teamSection,
  testimonialsSection,
} from "@/content/copy";
import { orderedProjects } from "@/content/projects";

export const metadata: Metadata = { title: "Design C · Gallery" };

/**
 * Direction C, "Gallery": a centred headline over a full-width 32px overlay card that carries the
 * motion, the organizer row as its own snow band, and the projects as the doc's horizontal
 * carousel of 24px cards. Testimonials sit in a static three-column grid.
 */
export default function DesignC() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="pt-20 md:pt-[120px]">
          <div className="page-width flex flex-col items-center gap-6 text-center">
            <Badge>{hero.label}</Badge>
            <h1 className="max-w-[16ch] text-[44px] leading-[1.15] tracking-[-0.44px] md:text-display">
              {hero.title}
            </h1>
            <p className="max-w-[52ch] text-body text-stone md:text-subheading">{hero.subtitle}</p>
          </div>
          <div className="page-width mt-12">
            <div className="overflow-hidden rounded-overlays bg-snow shadow-subtle">
              <MotionLoop
                name="hero-c"
                label="Angular shards assembling into a skull, then holding"
                aspect="16 / 9"
              />
            </div>
          </div>
          <div className="page-width flex flex-col items-center gap-4 py-12 sm:flex-row sm:items-end sm:justify-center">
            <div className="w-full max-w-[440px]">
              <EmailCta align="left" />
            </div>
            <PillButton href="#solution" variant="ghost">
              {hero.secondaryCta}
            </PillButton>
          </div>
        </section>

        <section aria-label={hero.trustLabel} className="bg-snow py-12">
          <div className="page-width">
            <OrganizerRow />
          </div>
        </section>

        <section id="problem" className="section">
          <div className="page-width flex flex-col gap-12">
            <SectionHeading label={problem.label} title={problem.title} body={problem.body} />
            <StatCards />
            <SpendChart />
          </div>
        </section>

        <section id="solution" className="section bg-snow">
          <div className="page-width flex flex-col gap-12">
            <SectionHeading label={solution.label} title={solution.title} body={solution.body} />
            <Principles />
            <div className="grid gap-12 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <h3 className="font-sans text-[16px] font-medium">How a Pyrium system is built</h3>
                <Layers />
              </div>
              <div className="flex flex-col gap-4">
                <Audience />
                <Metrics />
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="page-width flex flex-col gap-10">
            <SectionHeading
              label={projectsSection.label}
              title={projectsSection.title}
              body={projectsSection.body}
            />
            <ul className="no-scrollbar -mx-4 flex snap-x gap-6 overflow-x-auto px-4 pb-4">
              {orderedProjects.map((project) => (
                <li key={project.id} className="w-[300px] shrink-0 snap-start md:w-[440px]">
                  <ProjectCard project={project} frame={false} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section bg-snow">
          <div className="page-width flex flex-col gap-10">
            <SectionHeading label={testimonialsSection.label} title={testimonialsSection.title} />
            <TestimonialCards scroll={false} />
          </div>
        </section>

        <section id="contact" className="section">
          <div className="page-width flex flex-col gap-12">
            <SectionHeading label={contact.label} title={contact.title} body={contact.body} />
            <div className="grid gap-6 md:grid-cols-[3fr_2fr]">
              <EngagementSteps />
              <ContactForm />
            </div>
          </div>
        </section>

        <section id="team" className="section bg-snow">
          <div className="page-width flex flex-col gap-12">
            <SectionHeading label={teamSection.label} title={teamSection.title} />
            <TeamCards />
            <Vision />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
