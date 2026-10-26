import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Engagement } from "@/components/home/Sections";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/Primitives";
import { SubNav } from "@/components/ui/SubNav";
import { getCopy } from "@/content/copy";
import { isLang } from "@/lib/i18n";
import { getMenus } from "@/lib/menus";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getCopy(lang).services.pages.approach;
  return { title: t.eyebrow, description: t.body };
}

/** How we work: the engagement path and packages, then the promises we won't make. */
export default async function ApproachPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const copy = getCopy(lang);
  const t = copy.services;
  const page = t.pages.approach;

  return (
    <PageTransition>
      <PageHeader eyebrow={page.eyebrow} title={page.title} body={page.body}>
        <SubNav items={getMenus(lang)["/services"]} current="/services/approach" />
      </PageHeader>

      {/* Engagement */}
      <section className="section bg-fog">
        <div className="page-width">
          <Engagement lang={lang} heading={false} />
        </div>
      </section>

      {/* Claims policy */}
      <section className="section bg-snow">
        <div className="page-width flex flex-col gap-10">
          <Reveal>
            <SectionHeading eyebrow={t.promisesEyebrow} title={t.promisesTitle} />
          </Reveal>
          <ul className="grid gap-4 md:grid-cols-3">
            {t.promises.map((promise, index) => (
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
