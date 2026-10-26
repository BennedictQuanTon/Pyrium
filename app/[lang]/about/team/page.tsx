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
 * Team: one large card per co-founder, portrait on the studio backdrop beside the name, role,
 * focus and links, then about, strengths and contributions. Sides alternate; founders without a
 * written profile show a quiet "to be updated" panel.
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
                    className={`relative overflow-hidden bg-[#dddbd8] ${flip ? "lg:order-2" : ""}`}
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
                      <p className="max-w-[52ch] text-[16px] leading-[1.6] text-graphite-ink">
                        {member.focus[lang]}
                      </p>
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
                          {[
                            { label: t.strengths, items: profile.strengths },
                            { label: t.contributions, items: profile.contributions },
                          ].map((group) => (
                            <div
                              key={group.label}
                              className="flex flex-col gap-4 rounded-[22px] bg-fog p-6"
                            >
                              <p className="eyebrow">{group.label}</p>
                              <ol className="flex flex-col gap-3">
                                {group.items.map((item, position) => (
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
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="mt-auto flex flex-col gap-4 rounded-[22px] border border-dashed border-ink/15 p-6">
                        <p className="eyebrow">
                          {t.about} · {t.strengths} · {t.contributions}
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
