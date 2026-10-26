import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FounderLinks } from "@/components/home/Sections";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { SubNav } from "@/components/ui/SubNav";
import { getCopy } from "@/content/copy";
import { team } from "@/content/people";
import { isLang } from "@/lib/i18n";
import { getMenus } from "@/lib/menus";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getCopy(lang).about.pages.team;
  return { title: t.eyebrow, description: t.body };
}

/**
 * Team: one large card per co-founder, portrait on the studio backdrop with work experience
 * beneath it, beside the name, role and links, then about, strengths, awards and credentials.
 * Sides alternate; founders without a written profile show a quiet "to be updated" panel.
 */
export default async function TeamPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const copy = getCopy(lang);
  const t = copy.about.pages.team;
  const cofounder = copy.team.cofounder;

  return (
    <PageTransition>
      <PageHeader eyebrow={t.eyebrow} title={t.title} body={t.body}>
        <SubNav items={getMenus(lang)["/about"]} current="/about/team" />
      </PageHeader>

      <section className="bg-fog pt-8 pb-24 md:pb-32">
        <ol className="page-width flex flex-col gap-8 md:gap-10">
          {team.map((member, index) => {
            const profile = member.profile?.[lang];
            const flip = index % 2 === 1;
            return (
              <li key={member.github}>
                <Reveal
                  pop
                  className={`founder-profile group grid overflow-hidden rounded-[32px] bg-snow shadow-subtle ${flip ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"}`}
                >
                  <div
                    className={`relative flex flex-col overflow-hidden bg-[#dddbd8] ${flip ? "lg:order-2" : ""}`}
                  >
                    <div className="relative">
                      {/* biome-ignore lint/performance/noImgElement: prepared portrait; next/image adds nothing here */}
                      <img
                        src={member.photo}
                        alt={member.name}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover object-top transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#dddbd8] to-transparent"
                      />
                    </div>

                    <div className="relative flex flex-col gap-5 px-7 pt-2 pb-8 md:px-10 md:pb-10">
                      <p className="eyebrow flex items-center gap-2 text-graphite-ink">
                        <span aria-hidden="true" className="h-px w-5 bg-signal" />
                        {t.experience}
                      </p>
                      {member.experience?.length ? (
                        <ol className="flex flex-col">
                          {member.experience.map((job) => (
                            <li
                              key={job.company}
                              className="flex items-center gap-4 border-t border-ink/[0.08] py-4 first:border-t-0 first:pt-0"
                            >
                              <span className="flex h-12 w-[76px] shrink-0 items-center justify-center rounded-[14px] bg-snow px-2.5 py-2 shadow-subtle">
                                {/* biome-ignore lint/performance/noImgElement: company logo; next/image adds nothing here */}
                                <img
                                  src={job.logo}
                                  alt=""
                                  loading="lazy"
                                  className="max-h-full max-w-full object-contain"
                                />
                              </span>
                              <span className="flex min-w-0 flex-col gap-0.5">
                                <span className="text-[15px] font-medium text-ink">
                                  {job.company}
                                </span>
                                <span className="text-[13px] leading-[1.4] text-graphite-ink">
                                  {job.role[lang]}
                                </span>
                                <span className="tabular text-[12px] text-graphite-ink/80">
                                  {job.period[lang]}
                                </span>
                              </span>
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <p className="flex items-center gap-2.5 rounded-[18px] border border-dashed border-ink/15 px-4 py-3.5 text-[14px] text-graphite-ink">
                          <span aria-hidden="true" className="size-1.5 rounded-full bg-signal" />
                          {t.experiencePending}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-8 p-7 md:p-10 lg:p-12">
                    <div className="flex flex-col gap-5">
                      <p className="eyebrow flex items-center gap-2">
                        <span className="tabular text-signal">0{index + 1}</span>
                        <span aria-hidden="true" className="h-px w-5 bg-signal" />
                        {cofounder}
                      </p>
                      <div className="flex flex-col gap-2">
                        <h2 className="font-display text-[36px] leading-[1.05] tracking-[-1px] text-ink md:text-[48px]">
                          {member.name}
                        </h2>
                        <p className="text-[16px] font-medium text-signal">{member.role[lang]}</p>
                      </div>
                      <FounderLinks member={member} lang={lang} tone="fog" />
                    </div>

                    {profile ? (
                      <>
                        <div className="flex flex-col gap-3 border-t border-ink/[0.07] pt-8">
                          <p className="eyebrow">{t.about}</p>
                          <p className="font-display text-[19px] leading-[1.55] text-ink md:text-[21px]">
                            {profile.about}
                          </p>
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                          <div className="flex flex-col gap-4 rounded-[22px] bg-fog p-6">
                            <p className="eyebrow">{t.strengths}</p>
                            <ol className="flex flex-col gap-3">
                              {profile.strengths.map((item, position) => (
                                <li
                                  key={item}
                                  className="grid grid-cols-[1.75rem_1fr] text-[14px] leading-[1.55] text-graphite-ink"
                                >
                                  <span className="tabular pt-[1px] text-[12px] text-signal">
                                    0{position + 1}
                                  </span>
                                  {item}
                                </li>
                              ))}
                            </ol>
                          </div>
                          <div className="flex flex-col gap-4 rounded-[22px] bg-fog p-6">
                            <p className="eyebrow">{t.awards}</p>
                            <ol className="flex flex-col gap-3.5">
                              {profile.awards.map((award, position) => (
                                <li
                                  key={award.event}
                                  className="grid grid-cols-[1.75rem_1fr] text-[14px] leading-[1.45]"
                                >
                                  <span className="tabular pt-[3px] text-[12px] text-signal">
                                    0{position + 1}
                                  </span>
                                  <span className="flex flex-col gap-0.5">
                                    <span className="font-display text-[17px] leading-[1.2] text-ink">
                                      {award.result}
                                    </span>
                                    <span className="text-graphite-ink">{award.event}</span>
                                    <span className="text-[12px] text-stone">{award.detail}</span>
                                  </span>
                                </li>
                              ))}
                            </ol>
                          </div>
                          <dl className="grid gap-px overflow-hidden rounded-[22px] bg-ink/[0.07] sm:grid-cols-2 md:col-span-2">
                            {profile.credentials.map((item) => (
                              <div key={item.label} className="flex flex-col gap-2 bg-fog p-6">
                                <dt className="sr-only">{item.label}</dt>
                                <dd className="font-display text-[32px] leading-none tracking-[-0.04em] text-ink">
                                  {item.value}
                                </dd>
                                <dd className="text-[13px] leading-[1.5] text-graphite-ink">
                                  {item.label}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      </>
                    ) : (
                      <div className="mt-auto flex flex-col gap-4 rounded-[22px] border border-dashed border-ink/15 p-6">
                        <p className="eyebrow">
                          {t.about} · {t.strengths} · {t.awards}
                        </p>
                        <p className="flex items-center gap-2.5 text-[15px] text-stone">
                          <span aria-hidden="true" className="size-1.5 rounded-full bg-signal" />
                          {t.pending}
                        </p>
                        <span aria-hidden="true" className="flex flex-col gap-2">
                          <span className="h-2 w-[86%] rounded-full bg-ink/[0.05]" />
                          <span className="h-2 w-[64%] rounded-full bg-ink/[0.05]" />
                          <span className="h-2 w-[72%] rounded-full bg-ink/[0.05]" />
                        </span>
                      </div>
                    )}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>
    </PageTransition>
  );
}
