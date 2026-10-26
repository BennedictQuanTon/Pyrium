import { SubNav } from "@/components/ui/SubNav";

/** The two tabs of a case study: the overview and how the product is built. */
export function CaseTabs({
  slug,
  labels,
  current,
}: {
  slug: string;
  labels: { overview: string; build: string };
  current: "overview" | "build";
}) {
  const items = [
    { href: `/work/${slug}`, label: labels.overview },
    { href: `/work/${slug}/build`, label: labels.build },
  ];
  return <SubNav items={items} current={current === "overview" ? items[0].href : items[1].href} />;
}
