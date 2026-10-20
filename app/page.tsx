import type { Metadata } from "next";
import { Badge, Wordmark } from "@/components/ui/Primitives";

export const metadata: Metadata = { title: "Choose a direction" };

const designs = [
  {
    href: "/design-a",
    name: "A · Showroom",
    poster: "/motion/hero-a.jpg",
    summary:
      "The style reference taken literally: centred hero, email row, product frame cropped at the fold.",
  },
  {
    href: "/design-b",
    name: "B · Split",
    poster: "/motion/hero-b.jpg",
    summary: "Two-column rows throughout, with the projects in a single Dark Card contrast panel.",
  },
  {
    href: "/design-c",
    name: "C · Gallery",
    poster: "/motion/hero-c.jpg",
    summary:
      "Full-width motion card under the headline, organizer band, projects as a horizontal carousel.",
  },
];

/** Temporary index for the design review. Becomes the real home page once a direction is chosen. */
export default function ChooseDirection() {
  return (
    <main id="main" className="page-width flex flex-col gap-12 py-16 md:py-24">
      <div className="flex flex-col items-start gap-4">
        <Wordmark width={240} />
        <Badge>Internal design review</Badge>
        <h1 className="text-heading md:text-heading-lg">Three directions for the landing page</h1>
        <p className="max-w-[60ch] text-stone">
          Same content, same tokens from Landing_DESIGN.md. They differ in hero composition, section
          rhythm, how the skull is drawn, and how projects are shown.
        </p>
      </div>
      <ul className="grid gap-6 md:grid-cols-3">
        {designs.map((design) => (
          <li key={design.href}>
            <a
              href={design.href}
              className="card flex h-full flex-col gap-4 transition-shadow hover:shadow-button"
            >
              {/* biome-ignore lint/performance/noImgElement: review thumbnails of rendered posters */}
              <img
                src={design.poster}
                alt=""
                className="aspect-video w-full rounded-card-inner object-cover"
              />
              <h2 className="text-heading-sm">{design.name}</h2>
              <p className="text-[15px] text-stone">{design.summary}</p>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
