import { footer, hero, nav } from "@/content/copy";
import { coreProducts } from "@/content/products";
import { sourceOrder, sources } from "@/content/sources";
import { PillButton, SmartLink, Wordmark } from "./Primitives";

/** Site footer on every page: sitemap, contact CTA and the numbered sources the pages cite. */
export function Footer() {
  return (
    <footer className="border-t border-ink/[0.06] bg-snow">
      <div className="page-width flex flex-col gap-14 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col items-start gap-4">
            <Wordmark width={200} variant="primary" />
            <p className="max-w-[32ch] text-[14px] text-stone">{footer.tagline}</p>
            <PillButton href="/contact" className="mt-2">
              {hero.navCta}
            </PillButton>
          </div>
          <nav aria-label="Products" className="flex flex-col gap-3">
            <p className="eyebrow">Products</p>
            {coreProducts.map((product) => (
              <SmartLink
                key={product.slug}
                href={`/work/${product.slug}`}
                className="text-[14px] text-graphite-ink hover:text-ink"
              >
                {product.name}
              </SmartLink>
            ))}
          </nav>
          <nav aria-label="Company" className="flex flex-col gap-3">
            <p className="eyebrow">Company</p>
            {nav.map((item) => (
              <SmartLink
                key={item.href}
                href={item.href}
                className="text-[14px] text-graphite-ink hover:text-ink"
              >
                {item.label}
              </SmartLink>
            ))}
          </nav>
        </div>
        <section
          aria-labelledby="sources-title"
          className="flex flex-col gap-4 border-t border-ink/[0.06] pt-10"
        >
          <h2 id="sources-title" className="font-sans text-[14px] font-medium">
            {footer.citationsTitle}
          </h2>
          <ol className="grid gap-2 md:grid-cols-2 md:gap-x-10">
            {sourceOrder.map((id, index) => {
              const source = sources[id];
              return (
                <li
                  key={id}
                  id={`source-${index + 1}`}
                  className="scroll-mt-28 text-[12px] text-stone"
                >
                  [{index + 1}] {source.publisher} ({source.date}),{" "}
                  <a href={source.url} className="underline underline-offset-2 hover:text-ink">
                    {source.title}
                  </a>
                </li>
              );
            })}
          </ol>
        </section>
        <div className="flex flex-wrap items-center justify-between gap-4 text-[12px] text-stone">
          <p>© 2026 Pyrium · Vietnam</p>
          <p>
            Photography: open-licence images from Wikimedia Commons and StockSnap (CC0 / public
            domain).
          </p>
        </div>
      </div>
    </footer>
  );
}
