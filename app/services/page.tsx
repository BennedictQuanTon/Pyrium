import type { Metadata } from "next";
import { Engagement } from "@/components/home/Sections";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { PillButton, SectionHeading, SmartLink } from "@/components/ui/Primitives";
import { engagement, services } from "@/content/copy";
import { getProduct } from "@/content/products";

export const metadata: Metadata = { title: "Services", description: services.body };

/**
 * Services: the four offer families (each tied to a product that proves it), the six-layer
 * system, the controls every deployment documents, who it's for and which workflows come first,
 * the metrics we report, the engagement path, and the promises we won't make.
 */
export default function ServicesPage() {
  return (
    <PageTransition>
      <PageHeader eyebrow={services.eyebrow} title={services.title} body={services.body}>
        <PillButton href="/contact">Book a discovery call</PillButton>
      </PageHeader>

      {/* Offer families */}
      <section className="section bg-fog">
        <div className="page-width flex flex-col gap-12">
          <Reveal>
            <SectionHeading
              eyebrow="Offer families"
              title="Four ways in, one delivery discipline."
            />
          </Reveal>
          <ul className="grid gap-4 md:grid-cols-2">
            {services.offers.map((offer, index) => {
              const proof = getProduct(offer.proof);
              return (
                <li key={offer.name}>
                  <Reveal
                    delay={index % 2}
                    className="glass group flex h-full flex-col gap-6 p-8 md:p-10"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="eyebrow">{offer.role}</span>
                      <span className="tabular text-[13px] text-stone">0{index + 1}</span>
                    </div>
                    <h2 className="text-heading-sm md:text-heading">{offer.name}</h2>
                    <p className="text-[16px] leading-[1.6] text-graphite-ink">{offer.detail}</p>
                    {proof ? (
                      <SmartLink
                        href={`/work/${proof.slug}`}
                        className="mt-auto flex items-center justify-between gap-4 rounded-[18px] bg-white/60 p-4 transition-colors hover:bg-white"
                      >
                        <span className="flex flex-col">
                          <span className="text-[12px] text-stone">Shown in</span>
                          <span className="text-[15px] font-medium text-ink">{proof.name}</span>
                        </span>
                        <span className="text-right text-[13px] text-graphite-ink">
                          <span className="font-display text-[22px] text-ink">
                            {proof.metrics[0].value}
                          </span>{" "}
                          {proof.metrics[0].label}
                        </span>
                      </SmartLink>
                    ) : null}
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* System layers */}
      <section className="section bg-snow">
        <div className="page-width grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Architecture"
              title="Six layers in every system."
              body="Commodity capabilities are bought or adopted; we build only where workflow knowledge, cross-system execution, privacy, evaluation or cost create a lasting advantage."
              size="md"
            />
          </Reveal>
          <Reveal delay={1}>
            {/* A stacked diagram: each layer is a plate, the top one closest to the business. */}
            <ol className="flex flex-col gap-2">
              {services.layers.map((layer, index) => (
                <li
                  key={layer.name}
                  className="group grid grid-cols-[2.5rem_1fr] items-center gap-4 rounded-[20px] border border-ink/[0.06] bg-fog px-5 py-4 transition-all duration-500 hover:translate-x-1 hover:border-signal/30 hover:bg-snow md:grid-cols-[2.5rem_12rem_1fr]"
                  style={{ marginLeft: `${index * 10}px` }}
                >
                  <span className="tabular text-[13px] text-stone group-hover:text-signal">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-medium text-ink">{layer.name}</span>
                  <span className="col-start-2 text-[14px] text-stone md:col-start-3">
                    {layer.detail}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Controls */}
      <section className="section bg-deep-slate">
        <div className="page-width flex flex-col gap-12">
          <Reveal>
            <SectionHeading
              eyebrow="Privacy & governance"
              title="Control you can inspect, not a promise."
              body="Every deployment ships with the evidence below, so you can see how data moves, what an agent may do and how it is stopped."
              onDark
            />
          </Reveal>
          <Reveal>
            <ul className="grid gap-px overflow-hidden rounded-cards bg-white/10 md:grid-cols-3">
              {services.controls.map((control) => (
                <li key={control.area} className="flex h-full flex-col gap-3 bg-deep-slate p-7">
                  <span aria-hidden="true" className="h-px w-8 bg-signal" />
                  <h3 className="font-sans text-[16px] font-medium text-snow">{control.area}</h3>
                  <p className="text-[14px] text-silver">{control.evidence}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Audience, use cases, metrics */}
      <section className="section bg-fog">
        <div className="page-width grid gap-6 lg:grid-cols-3">
          <Reveal className="glass flex flex-col gap-5 p-8 lg:col-span-1">
            <h2 className="text-heading-sm">{services.audience.title}</h2>
            <p className="text-[15px] leading-[1.6] text-graphite-ink">{services.audience.body}</p>
            <ul className="flex flex-wrap gap-2" aria-label="Typical buyers">
              {services.audience.buyers.map((buyer) => (
                <li
                  key={buyer}
                  className="rounded-badges bg-ink px-3.5 py-1.5 text-[12px] font-medium text-snow"
                >
                  {buyer}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={1} className="glass flex flex-col gap-5 p-8">
            <h2 className="text-heading-sm">Where we start</h2>
            <ul className="flex flex-col">
              {services.useCases.map((useCase) => (
                <li
                  key={useCase.name}
                  className="flex items-start justify-between gap-4 border-t border-ink/[0.07] py-3"
                >
                  <span className="text-[14px] text-ink">{useCase.name}</span>
                  <span className="shrink-0 text-[12px] text-stone">{useCase.fit}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={2} className="glass flex flex-col gap-5 p-8">
            <h2 className="text-heading-sm">What we report</h2>
            <ul className="flex flex-col gap-4">
              {services.metrics.map((metric) => (
                <li
                  key={metric.name}
                  className="flex flex-col gap-1 border-l border-signal/40 pl-4"
                >
                  <span className="text-[14px] font-medium text-ink">{metric.name}</span>
                  <span className="text-[13px] text-stone">{metric.detail}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Engagement */}
      <section className="section bg-blueprint">
        <div className="page-width flex flex-col gap-12">
          <Reveal>
            <SectionHeading
              eyebrow={engagement.eyebrow}
              title={engagement.title}
              body={engagement.body}
            />
          </Reveal>
          <Engagement />
        </div>
      </section>

      {/* Claims policy */}
      <section className="section bg-snow">
        <div className="page-width flex flex-col gap-10">
          <Reveal>
            <SectionHeading
              eyebrow="What we won't promise"
              title="Claims we can measure, or none at all."
            />
          </Reveal>
          <ul className="grid gap-4 md:grid-cols-3">
            {services.promises.map((promise, index) => (
              <li key={promise}>
                <Reveal
                  delay={index}
                  className="flex h-full flex-col gap-4 rounded-cards border border-ink/[0.07] p-7"
                >
                  <span className="tabular text-[13px] text-signal">0{index + 1}</span>
                  <p className="font-display text-[20px] leading-[1.4] text-ink">{promise}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageTransition>
  );
}
