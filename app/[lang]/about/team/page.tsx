import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Founders } from "@/components/home/Sections";
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
 * Team: the three co-founder cards with their links, then one profile per founder — about,
 * strengths and contributions. Founders without a written profile show "to be updated".
 */
export default async function TeamPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getCopy(lang).about.pages.team;

  return (
    <PageTransition>
      <PageHeader eyebrow={t.eyebrow} title={t.title} body={t.body}>
        <SubNav items={getMenus(lang)["/about"]} current="/about/team" />
      </PageHeader>

      <section className="bg-fog pt-8 pb-20 md:pb-28">
        <div className="page-width">
          <Founders lang={lang} />
        </div>
      </section>

      <section className="section bg-snow">
        <ol className="page-width flex flex-col">
          {team.map((member, index) => {
            const profile = member.profile?.[lang];
            return (
              <li key={member.github} className="border-t border-ink/10 last:border-b">
                <Reveal className="grid gap-8 py-12 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-14 md:py-16">
                  <div className="flex items-start gap-4">
                    {/* biome-ignore lint/performance/noImgElement: prepared portrait; next/image adds nothing here */}
                    <img
                      src={member.photo}
                      alt=""
                      loading="lazy"
                      className="size-16 shrink-0 rounded-full bg-[#dddbd8] object-cover object-top"
                    />
                    <div className="flex flex-col gap-1.5">
                      <span className="tabular text-[13px] text-signal">0{index + 1}</span>
                      <h2 className="font-display text-[28px] leading-[1.1] tracking-[-0.02em] text-ink">
                        {member.name}
                      </h2>
                      <p className="text-[14px] text-graphite-ink">{member.role[lang]}</p>
                    </div>
                  </div>
                  {profile ? (
                    <div className="flex flex-col gap-8">
                      <div className="flex flex-col gap-3">
                        <p className="eyebrow">{t.about}</p>
                        <p className="font-display text-[20px] leading-[1.5] text-ink md:text-[22px]">
                          {profile.about}
                        </p>
                      </div>
                      <div className="grid gap-8 sm:grid-cols-2">
                        {[
                          { label: t.strengths, items: profile.strengths },
                          { label: t.contributions, items: profile.contributions },
                        ].map((group) => (
                          <div key={group.label} className="flex flex-col gap-3">
                            <p className="eyebrow">{group.label}</p>
                            <ul className="flex flex-col gap-2.5">
                              {group.items.map((item) => (
                                <li
                                  key={item}
                                  className="flex gap-2.5 text-[15px] leading-[1.55] text-graphite-ink"
                                >
                                  <span
                                    aria-hidden="true"
                                    className="mt-[11px] h-px w-3 shrink-0 bg-signal"
                                  />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 self-start rounded-[20px] border border-dashed border-ink/15 px-6 py-5 text-[15px] text-stone">
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-signal" />
                      {member.focus[lang]} · {t.pending}
                    </div>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>
    </PageTransition>
  );
}
