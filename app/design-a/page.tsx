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
import { Badge, BrowserFrame, SectionHeading } from "@/components/ui/Primitives";
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

export const metadata: Metadata = { title: "Design A · Showroom" };

/**
 * Direction A, "Showroom": Landing_DESIGN.md taken literally. Centre-stacked hero with the email
 * row and trust row, the product frame floating below and cropped at the fold, then centred
 * section headings over fog/snow alternation.
 */
export default function DesignA() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="overflow-hidden pt-24 md:pt-[120px]">
          <div className="page-width flex flex-col items-center gap-6 text-center">
            <Badge>{hero.label}</Badge>
            <h1 className="max-w-[16ch] text-[44px] leading-[1.15] tracking-[-0.44px] md:text-display">
              {hero.title}
            </h1>
            <p className="max-w-[52ch] text-body text-stone md:text-subheading">{hero.subtitle}</p>
            <EmailCta />
            <div className="pt-4">
              <OrganizerRow />
            </div>
          </div>
          <div className="page-width mt-16 max-h-[560px] overflow-hidden">
            <BrowserFrame fade>
              <MotionLoop
                name="hero-a"
                label="A point-cloud skull settling into shape and turning slowly"
              />
            </BrowserFrame>
          </div>
        </section>

        <section id="problem" className="section bg-snow">
          <div className="page-width flex flex-col gap-12">
            <SectionHeading
              align="center"
              label={problem.label}
              title={problem.title}
              body={problem.body}
            />
            <StatCards />
            <div className="mx-auto w-full max-w-[640px]">
              <SpendChart />
            </div>
          </div>
        </section>

        <section id="solution" className="section">
          <div className="page-width flex flex-col gap-12">
            <SectionHeading
              align="center"
              label={solution.label}
              title={solution.title}
              body={solution.body}
            />
            <Principles />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="card flex flex-col gap-4">
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

        <section id="projects" className="section bg-snow">
          <div className="page-width flex flex-col gap-12">
            <SectionHeading
              align="center"
              label={projectsSection.label}
              title={projectsSection.title}
              body={projectsSection.body}
            />
            <ul className="grid gap-6 md:grid-cols-2">
              {orderedProjects.map((project) => (
                <li key={project.id}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="page-width flex flex-col gap-10">
            <SectionHeading
              align="center"
              label={testimonialsSection.label}
              title={testimonialsSection.title}
            />
            <TestimonialCards />
          </div>
        </section>

        <section id="contact" className="section bg-snow">
          <div className="page-width flex flex-col gap-12">
            <SectionHeading
              align="center"
              label={contact.label}
              title={contact.title}
              body={contact.body}
            />
            <EngagementSteps />
            <div className="mx-auto w-full max-w-[560px]">
              <ContactForm />
            </div>
          </div>
        </section>

        <section id="team" className="section">
          <div className="page-width flex flex-col gap-12">
            <SectionHeading align="center" label={teamSection.label} title={teamSection.title} />
            <TeamCards />
            <div className="mx-auto">
              <Vision />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
