import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/motion/PageTransition";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductPanel } from "@/components/work/ProductGroups";
import { getCopy } from "@/content/copy";
import { getProductGroups, groupOrder } from "@/content/products";
import type { ProductGroup } from "@/content/types";
import { isLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string; group: string }> };

export function generateStaticParams() {
  return groupOrder.map((group) => ({ group }));
}

function isGroup(value: string): value is ProductGroup {
  return groupOrder.includes(value as ProductGroup);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, group } = await params;
  if (!isLang(lang) || !isGroup(group)) return {};
  const t = getCopy(lang).productsSection.groups[group];
  return { title: t.name, description: t.body };
}

/** One industry: its promise in the header, then each of its products in full. */
export default async function IndustryPage({ params }: Props) {
  const { lang, group } = await params;
  if (!isLang(lang) || !isGroup(group)) notFound();
  const copy = getCopy(lang);
  const t = copy.productsSection;
  const products = getProductGroups(lang).find((entry) => entry.group === group)?.products ?? [];

  return (
    <PageTransition>
      <PageHeader eyebrow={t.eyebrow} title={t.groups[group].name} body={t.groups[group].body} />
      <section className="bg-fog pt-8 pb-24 md:pb-32">
        <div className="page-width flex flex-col gap-24 md:gap-32">
          {products.map((product, index) => (
            <ProductPanel
              key={product.slug}
              product={product}
              labels={copy.showcase}
              flip={index % 2 === 1}
            />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
