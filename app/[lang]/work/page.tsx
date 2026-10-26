import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductStrip } from "@/components/home/Sections";
import { PageTransition } from "@/components/motion/PageTransition";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductGroups } from "@/components/work/ProductGroups";
import { getCopy } from "@/content/copy";
import { getProducts } from "@/content/products";
import { isLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getCopy(lang).productsSection;
  return { title: t.eyebrow, description: t.body };
}

/**
 * Products index: the lockups and headline numbers, then every product grouped by the industry
 * it serves — trailer, who it's for, what it fixes, its three outputs and two pilot quotes —
 * each frame morphing into its case study.
 */
export default async function WorkPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getCopy(lang).productsSection;

  return (
    <PageTransition>
      <PageHeader eyebrow={t.eyebrow} title={t.title} body={t.body} />
      <section className="bg-fog pb-24 md:pb-32">
        <div className="flex flex-col gap-20 md:gap-28">
          <ProductStrip products={getProducts(lang)} lang={lang} />
          <ProductGroups lang={lang} />
        </div>
      </section>
    </PageTransition>
  );
}
