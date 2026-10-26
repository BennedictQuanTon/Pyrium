import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  const t = getCopy(lang).services.pages.security;
  return { title: t.eyebrow, description: t.body };
}

/** Architecture & security: the six-layer system, then the controls every deployment documents. */
export default async function SecurityPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const copy = getCopy(lang);
  const t = copy.services;
  const page = t.pages.security;

  return (
    <PageTransition>
      <PageHeader eyebrow={page.eyebrow} title={page.title} body={page.body}>
        <SubNav items={getMenus(lang)["/services"]} current="/services/security" />
      </PageHeader>

      {/* System layers */}
      <section className="section bg-snow">
        <div className="page-width grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <SectionHeading
              eyebrow={t.archEyebrow}
              title={t.archTitle}
              body={t.archBody}
              size="md"
            />
          </Reveal>
          <Reveal delay={1}>
            {/* A stacked diagram: each layer is a plate, the top one closest to the business. */}
            <ol className="flex flex-col gap-2">
              {t.layers.map((layer, index) => (
                <li
                  key={layer.name}
                  className="group grid grid-cols-[2.5rem_1fr] items-center gap-4 rounded-[20px] border border-ink/[0.06] bg-fog px-5 py-4 transition-all duration-500 hover:translate-x-1 hover:border-signal/30 hover:bg-snow md:grid-cols-[2.5rem_12rem_1fr] md:ml-[var(--indent)]"
                  style={{ ["--indent" as string]: `${index * 10}px` }}
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
              eyebrow={t.controlsEyebrow}
              title={t.controlsTitle}
              body={t.controlsBody}
              onDark
            />
          </Reveal>
          <Reveal>
            <ul className="grid gap-px overflow-hidden rounded-cards bg-white/10 md:grid-cols-3">
              {t.controls.map((control) => (
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
    </PageTransition>
  );
}
