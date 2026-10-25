# Pyrium

Landing page for **Pyrium** — private AI systems engineering. "Private AI. Built to act."

A light, quiet site in the layout language of `docs/Landing_DESIGN.md` (light showroom, light
display headings, pill CTAs) with the brand kit's single Signal Red accent, plus liquid-glass
panels over open-licence monochrome photography. A first-visit intro wipes the lockup in and
lifts a fog curtain; route changes animate with React `<ViewTransition>`, and product films morph
from their cards into the case studies.

## Running the site

    10|You need Node 24 (see `.node-version`) and pnpm 11. The pnpm version is pinned in
`package.json`, so Corepack, which ships with Node 24, picks it up for you.

```sh
corepack enable          # once per machine; or: npm install -g pnpm@11
pnpm install
pnpm dev                 # http://localhost:3000
```

To see the page exactly as visitors would, run `pnpm build`, then `pnpm start`.

## The pages

| Route | What it holds |
| --- | --- |
| `/` | Hero and organizer marquee · the problem as a cited glass bento · the method (model proposes, code decides, people approve) · product wordmarks and numbers · the pinned product showcase · more from the lab · testimonials · engagement path and packages · founders and vision · closing |
| `/work` | The four core products as editorial rows, then the smaller lab projects |
| `/work/[slug]` | Case study per core product (Weatherise, The Lantern, IGNIS, Unfound): numbers, story, how the work is split, build log, screens, outcomes, review, next product |
| `/services` | Offer families tied to a product, six-layer architecture, governance controls, audience and first workflows, reported metrics, engagement path, claims policy |
| `/about` | Brand line and reach, founders, principles, vision and the twelve-month roadmap |
| `/contact` | Enquiry form, go / no-go criteria, packages and FAQ |

### Things that are expected, not bugs

- **Draft quotes.** Every testimonial and product review is a draft written for a real person in
  the named role to approve. Drafts carry a role, never a name, and show a "Draft" tag. Set
  `draft: false` and add `name` in `content/people.ts` or `content/products.ts` once approved.
- **Reach.** "200+ people have used our products" is the team's own aggregate figure.
- **Product numbers** were measured at each event on the stated test sets, not on customer data;
  the case studies say so.
- **Contact form.** It isn't connected to anything yet, so it won't send.
- **Intro and transitions.** The intro plays once per session; with `prefers-reduced-motion` it
  never plays and page transitions are instant. Browsers without the View Transitions API
  navigate without animation.
- **Product films** are WebM with an MP4 fallback; reduced-motion visitors see the poster.
- **Chart estimates.** In the spending chart, 2025 and 2027 are calculated from Gartner's growth
  rates, so they are dashed. Only 2026 is Gartner's published figure.

## Brand sources

The team's original documents live in `docs/`. The brief stays at the root as `CLAUDE.md`, where
coding agents load it automatically. The brand kit stays in `PYRIUM_Brand_Identity_Kit/`. It is
the newest source, so where it differs from the older documents, the kit wins. That applies to
the palette (Signal Red `#D9292F`, Mist `#F3F3F3`) and the logo artwork. Headings are DM Sans
Light — the substitute `Landing_DESIGN.md` sanctions for its PP Radio Grotesk Light display
voice — and body copy is Inter. JetBrains Mono is banned by the brief.

| File | Role |
| --- | --- |
| `PYRIUM_Brand_Identity_Kit/` | Logos, icons, favicons, brand guidelines and tokens. The site copies only the logo (`public/brand/`), the favicon and the app icon (`app/`). |
| `docs/Landing_DESIGN.md` | Style reference: layout, type, surfaces, components. Followed exactly, with Signal Red replacing the orange accent. |
| `New Landing page DESIGN.md` | Air.inc reference: the source for the hero gradient idea and the welcome load moment, re-interpreted in Pyrium's light palette. |
| `docs/Pyrium Branding.png` | Brand board: logo, palette, principles. |
| `docs/Pyrium_Strategic_Startup_Proposal_2026.pdf` | Positioning, market research and sources. |
| `CLAUDE.md` | The landing-page brief (8 sections). |

## Requirements

Node 24 (see `.node-version`) and pnpm 11 (pinned in `package.json`).

## Commands

| Command | What it does |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Run the site at http://localhost:3000 |
| `pnpm lint` | Biome lint and format check (CI) |
| `pnpm format` | Apply Biome fixes |
| `pnpm typecheck` | TypeScript, no emit |
| `pnpm build` | Production build |
| `pnpm check` | lint, typecheck and build, as CI runs them |
| `pnpm motion:studio` | Open the Remotion studio for the project loops |
| `pnpm motion:render [filter]` | Render loops and posters to `public/motion/` (e.g. `pnpm motion:render project`) |

## Layout

- `docs/`: the team's original brand documents (see above).
- `PYRIUM_Brand_Identity_Kit/`: the brand kit, kept as delivered. Biome and TypeScript skip it.
- `public/brand/`: the logo copied from the kit.
- `app/`: routes. `/` is the landing page.
- `components/ui/`: nav, footer, page header and shared primitives.
- `components/home/`: home sections (problem bento, approach, product strip, testimonials…).
- `components/work/`: product film, glass frame, metrics and the pinned showcase.
- `components/motion/`: intro, page transitions, scroll reveals, count-up and the glass
  pointer light.
- `content/`: all copy and facts as typed data — `products.ts` for the core products,
  `copy.ts` for page text, `people.ts` for founders and quotes, `sources.ts` for citations.
- `public/work/`: the products' own films, posters and screenshots.
- `public/images/open/`: CC0 / public-domain context photos, credited in `CREDITS.md` there.
- `motion/`: Remotion compositions. See `motion/CREDITS.md`. The site no longer shows these
  loops (the products use their own films); they are kept until the team decides to delete them.
- `public/motion/`: the rendered loops, currently unused by any page.
