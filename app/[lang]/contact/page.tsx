import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Engagement } from "@/components/home/Sections";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/Primitives";
import { getCopy } from "@/content/copy";
import { isLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getCopy(lang).contact;
  return { title: t.eyebrow, description: t.body };
}

const field =
  "w-full rounded-[14px] border border-ink/10 bg-white/70 px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-ink/40 focus:bg-white";

/**
 * Contact: the enquiry form on glass beside the go / no-go criteria we qualify against, then
 * the packages and a short FAQ. The form is a shell until a backend is chosen, and says so.
 */
export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const copy = getCopy(lang);
  const t = copy.contact;

  return (
    <PageTransition>
      <PageHeader eyebrow={t.eyebrow} title={t.title} body={t.body} />

      <section className="relative overflow-hidden bg-fog pb-24 md:pb-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-20 -left-40 size-[520px] rounded-full bg-signal/15 blur-[130px]"
        />
        <div className="page-width relative grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <Reveal pop>
            <form
              id="contact-form"
              className="glass flex flex-col gap-5 p-7 md:p-10"
              aria-describedby="contact-form-note"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-[13px] font-medium text-graphite-ink">
                  {t.fields.name}
                  <input name="name" autoComplete="name" className={field} />
                </label>
                <label className="flex flex-col gap-2 text-[13px] font-medium text-graphite-ink">
                  {t.fields.email}
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    className={field}
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2 text-[13px] font-medium text-graphite-ink">
                {t.fields.company}
                <input name="company" autoComplete="organization" className={field} />
              </label>
              <fieldset className="flex flex-col gap-3">
                <legend className="mb-2 text-[13px] font-medium text-graphite-ink">
                  {t.fields.start}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {copy.engagement.packages.map((pkg) => (
                    <label key={pkg.name} className="cursor-pointer">
                      <input
                        type="radio"
                        name="package"
                        value={pkg.name}
                        className="peer sr-only"
                      />
                      <span className="inline-flex rounded-badges border border-ink/10 bg-white/70 px-4 py-2 text-[13px] text-graphite-ink transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-snow peer-focus-visible:outline-2">
                        {pkg.name}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="flex flex-col gap-2 text-[13px] font-medium text-graphite-ink">
                {t.fields.workflow}
                <textarea
                  name="workflow"
                  rows={4}
                  placeholder={t.fields.workflowHint}
                  className={`${field} resize-none`}
                />
              </label>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  aria-disabled="true"
                  className="inline-flex cursor-not-allowed items-center rounded-buttons bg-signal px-6 py-3 text-[15px] font-medium text-signal-ink opacity-60 shadow-button"
                >
                  {t.fields.send}
                </button>
                <p id="contact-form-note" className="text-[12px] text-stone">
                  {t.formNote}
                </p>
              </div>
            </form>
          </Reveal>
          <Reveal pop delay={1} className="flex flex-col gap-4">
            <div className="glass flex flex-col gap-4 p-7 md:p-8">
              <h2 className="font-sans text-[16px] font-medium">{t.proceedTitle}</h2>
              <ul className="flex flex-col gap-3">
                {t.proceed.map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] text-graphite-ink">
                    <svg
                      viewBox="0 0 16 16"
                      className="mt-1 size-4 shrink-0 text-signal"
                      aria-hidden="true"
                    >
                      <path
                        d="M3.5 8.5l3 3 6-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-dark glass-solid flex flex-col gap-4 p-7 md:p-8">
              <h2 className="font-sans text-[16px] font-medium text-snow">{t.pauseTitle}</h2>
              <ul className="flex flex-col gap-3">
                {t.pause.map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] text-silver">
                    <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-silver" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-blueprint">
        <div className="page-width flex flex-col gap-12">
          <Reveal>
            <SectionHeading
              eyebrow={copy.engagement.eyebrow}
              title={copy.engagement.title}
              body={copy.engagement.body}
            />
          </Reveal>
          <Engagement lang={lang} />
        </div>
      </section>

      <section className="section bg-snow">
        <div className="page-width grid gap-10 md:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <SectionHeading eyebrow={t.faqEyebrow} title={t.faqTitle} size="md" />
          </Reveal>
          <div className="flex flex-col">
            {t.faq.map((item, index) => (
              <Reveal key={item.q} delay={index}>
                <details className="group border-t border-ink/10 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-medium text-ink">
                    {item.q}
                    <span
                      aria-hidden="true"
                      className="text-[22px] leading-none text-stone transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pt-3 text-[15px] text-stone">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
