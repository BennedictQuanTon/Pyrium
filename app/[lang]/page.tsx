import { notFound } from "next/navigation";
import { Compare } from "@/components/home/Compare";
import { Core } from "@/components/home/Core";
import { Problem } from "@/components/home/Problem";
import {
  Engagement,
  Founders,
  LogoMarquee,
  ProductStrip,
  Testimonials,
  Vision,
} from "@/components/home/Sections";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { PillButton, SectionHeading } from "@/components/ui/Primitives";
import { ProductGroups } from "@/components/work/ProductGroups";
import { getCopy } from "@/content/copy";
import { getProducts } from "@/content/products";
import { isLang } from "@/lib/i18n";

/**
 * The Pyrium home page: hero over the red arc with the organizer marquee; the problem told for
 * FnB operators; the core (Agentic, Private, Cost-efficient, Deep Domain) and how it compares;
 * the products grouped by industry; testimonials; working together; the founders and where
 * we're going; and the closing statement. Sources are listed, with dates, in the footer.
 */
export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const copy = getCopy(lang);
  const { hero, productsSection, team, closing } = copy;
  const products = getProducts(lang);

  return (
    <PageTransition>
      {/* 1 · Hero: display headline, sub, CTA row inside the red arc, organizer marquee below. */}
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
            <PillButton href="/contact">{hero.primaryCta}</PillButton>
            <PillButton href="#solution" variant="ghost">
              {hero.secondaryCta}
            </PillButton>
          </div>
        </div>
        <div className="hero-in relative pb-20 md:pb-28" style={{ ["--hero-i" as string]: 4 }}>
          <p className="page-width mb-7 text-center text-[12px] font-medium tracking-[0.14em] text-graphite-ink/80 uppercase">
            {hero.trustLabel}
          </p>
          <LogoMarquee label={hero.trustLabel} />
        </div>
      </section>

      {/* 2 · The problem, as cited figures on glass over concrete */}
      <Problem lang={lang} />

      {/* 3 · The core: Agentic, Private, Cost-efficient, Deep Domain — and how it compares */}
      <Core copy={copy.core} />
      <Compare lang={lang} />

      {/* 4 · Products: lockups and headline numbers, then every product grouped by industry */}
      <section id="products" className="section scroll-mt-16 bg-fog">
        <div className="flex flex-col gap-16 md:gap-24">
          <div className="page-width">
            <Reveal>
              <SectionHeading
                eyebrow={productsSection.eyebrow}
                title={productsSection.title}
                body={productsSection.body}
              />
            </Reveal>
          </div>
          <ProductStrip products={products} lang={lang} />
          <ProductGroups lang={lang} />
        </div>
      </section>

      {/* 5 · Testimonials */}
      <Testimonials lang={lang} />

      {/* 6 · Working together: the journey, its gates and the packages */}
      <section id="engagement" className="section bg-fog">
        <div className="page-width">
          <Engagement lang={lang} />
        </div>
      </section>

      {/* 7 · The three co-founders, and where we're going */}
      <section id="team" className="section bg-snow">
        <div className="page-width flex flex-col gap-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <SectionHeading eyebrow={team.eyebrow} title={team.title} />
            </Reveal>
            <PillButton href="/about/team" variant="ghost">
              {team.about}
            </PillButton>
          </div>
          <Founders lang={lang} />
          <Vision lang={lang} />
        </div>
      </section>

      {/* 8 · Closing statement inside the brand sheet's "signal frame" */}
      <section className="signal-frame relative overflow-hidden">
        <div className="page-width relative flex flex-col items-center gap-5 py-28 text-center md:py-40">
          <Reveal>
            <h2 className="max-w-[18ch] text-heading-md md:text-heading-lg">{closing.title}</h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="max-w-[44ch] text-body text-stone md:text-subheading">{closing.body}</p>
          </Reveal>
          <Reveal delay={2}>
            <PillButton href="/contact">{hero.primaryCta}</PillButton>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
