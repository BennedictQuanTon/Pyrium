import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductStrip } from "@/components/home/Sections";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading, SmartLink } from "@/components/ui/Primitives";
import { SubNav } from "@/components/ui/SubNav";
import { ProductLogo } from "@/components/work/ProductLogo";
import { getCopy } from "@/content/copy";
import { getProductGroups, getProducts } from "@/content/products";
import { isLang } from "@/lib/i18n";
import { getMenus } from "@/lib/menus";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getCopy(lang).productsSection;
  return { title: t.eyebrow, description: t.body };
}

/**
 * Products index: the lockups and headline numbers, then one card per industry leading to that
 * industry's page, where each product is shown in full.
 */
export default async function WorkPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getCopy(lang).productsSection;
  const groups = getProductGroups(lang);

  return (
    <PageTransition>
      <PageHeader eyebrow={t.eyebrow} title={t.title} body={t.body}>
        <SubNav items={getMenus(lang)["/work"]} current="/work" />
      </PageHeader>

      <section className="bg-fog pb-20 md:pb-28">
        <ProductStrip products={getProducts(lang)} lang={lang} />
      </section>

      <section className="section bg-snow">
        <div className="page-width flex flex-col gap-12">
          <Reveal>
            <SectionHeading eyebrow={t.industriesEyebrow} title={t.industriesTitle} size="md" />
          </Reveal>
          <ul className="grid gap-4 md:grid-cols-2">
            {groups.map(({ group, products }, index) => (
              <li key={group}>
                <Reveal pop delay={index % 2} className="h-full">
                  <SmartLink
                    href={`/work/industry/${group}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-fog transition-shadow duration-500 hover:shadow-subtle"
                  >
                    <div className="overflow-hidden">
                      {/* biome-ignore lint/performance/noImgElement: open-licence editorial photo */}
                      <img
                        src={products[0].photo}
                        alt=""
                        loading="lazy"
                        className="photo-soft aspect-[16/7] w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-7 md:p-8">
                      <div className="flex items-center justify-between text-[13px]">
                        <span className="tabular text-signal">0{index + 1}</span>
                        <span className="text-stone">
                          {products.length} {t.productCount[products.length === 1 ? 0 : 1]}
                        </span>
                      </div>
                      <h2 className="text-heading-sm">{t.groups[group].name}</h2>
                      <p className="text-[15px] leading-[1.55] text-stone">
                        {t.groups[group].body}
                      </p>
                      <div className="mt-auto flex items-center justify-between gap-4 border-t border-ink/[0.07] pt-5">
                        <span className="flex flex-wrap items-center gap-x-6 gap-y-3">
                          {products.map((product) => (
                            <ProductLogo key={product.slug} slug={product.slug} size="sm" />
                          ))}
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-[18px] text-signal transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </SmartLink>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageTransition>
  );
}
