import type { Metadata } from "next";
import {
  Audience,
  ContactForm,
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

export const metadata: Metadata = { title: "Design B · Split" };

/**
 * Direction B, "Split": the doc's 2-column feature pattern carried through the whole page —
 * left-aligned copy beside a white card — with the project gallery set in one Dark Card
 * (#242433) contrast panel, the only dark surface the doc defines.
 */
export default function DesignB() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="pb-24 pt-20 md:pt-[120px]">
          <div className="page-width grid items-center gap-12 md:grid-cols-[1fr_1.1fr]">
            <div className="flex flex-col items-start gap-6">
              <Badge>{hero.label}</Badge>
              <h1 className="text-[44px] leading-[1.15] tracking-[-0.44px] md:text-display">
                {hero.title}
              </h1>
              <p className="max-w-[46ch] text-body text-stone md:text-subheading">
                {hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <PillButton href="#contact">{hero.primaryCta}</PillButton>
                <PillButton href="#solution" variant="ghost">
                  {hero.secondaryCta}
                </PillButton>
              </div>
              <div className="pt-6">
                <OrganizerRow align="left" />
              </div>
            </div>
            <div className="card p-3">
              <div className="overflow-hidden rounded-card-inner">
                <MotionLoop
                  name="hero-b"
                  label="A faceted low-poly skull turning under soft studio light"
                  aspect="1 / 1"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="problem" className="section bg-snow">
          <div className="page-width grid gap-12 md:grid-cols-2 md:items-start">
            <div className="flex flex-col gap-10">
              <SectionHeading label={problem.label} title={problem.title} body={problem.body} />
              <StatCards columns={1} />
            </div>
            <div className="md:sticky md:top-28">
              <SpendChart />
            </div>
          </div>
        </section>

        <section id="solution" className="section">
          <div className="page-width flex flex-col gap-16">
            <div className="grid gap-12 md:grid-cols-2 md:items-start">
              <div className="card flex flex-col gap-4 md:order-2">
                <h3 className="font-sans text-[16px] font-medium">How a Pyrium system is built</h3>
                <Layers />
              </div>
              <div className="flex flex-col gap-10 md:order-1">
                <SectionHeading
                  label={solution.label}
                  title={solution.title}
                  body={solution.body}
                />
                <Principles />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Audience />
              <Metrics />
            </div>
          </div>
        </section>

        <section id="projects" className="py-12">
          <div className="page-width">
            <div className="flex flex-col gap-12 rounded-overlays bg-deep-slate px-4 py-16 md:px-12">
              <SectionHeading
                onDark
                label={projectsSection.label}
                title={projectsSection.title}
                body={projectsSection.body}
              />
              <ul className="grid gap-6 md:grid-cols-2">
                {orderedProjects.map((project) => (
                  <li key={project.id}>
                    <ProjectCard project={project} theme="dark" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="page-width flex flex-col gap-10">
            <SectionHeading label={testimonialsSection.label} title={testimonialsSection.title} />
            <TestimonialCards />
          </div>
        </section>

        <section id="contact" className="section bg-snow">
          <div className="page-width grid gap-12 md:grid-cols-2 md:items-start">
            <div className="flex flex-col gap-10">
              <SectionHeading label={contact.label} title={contact.title} body={contact.body} />
              <EngagementSteps />
            </div>
            <div className="md:sticky md:top-28">
              <ContactForm />
            </div>
          </div>
        </section>

        <section id="team" className="section">
          <div className="page-width grid gap-12 md:grid-cols-[1fr_2fr]">
            <div className="flex flex-col gap-10">
              <SectionHeading label={teamSection.label} title={teamSection.title} size="md" />
              <Vision />
            </div>
            <TeamCards />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
