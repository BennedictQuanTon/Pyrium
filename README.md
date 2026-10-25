# Pyrium

Landing page for **Pyrium** — private AI systems engineering. "Private AI. Built to act."

A light, quiet site in the layout language of `docs/Landing_DESIGN.md` (light showroom, light
display headings, pill CTAs) with the brand kit's single Signal Red accent, plus liquid-glass
panels over open-licence monochrome photography. A first-visit intro wipes the lockup in and
lifts a fog curtain; route changes animate with React `<ViewTransition>`, and product films morph
from their cards into the case studies. The site is bilingual (English at `/`, Vietnamese at
`/vi`), and a preferences panel beside the nav CTA sets language, motion level and sound.

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

Every route exists in English (`/…`) and Vietnamese (`/vi/…`). Pages live in `app/[lang]/`;
`next.config.ts` rewrites un-prefixed paths to `/en` and redirects `/en/…` back to the clean URL.

| Route | What it holds |
| --- | --- |
| `/` | Hero and organizer marquee · the problem as a cited glass bento · the core (Agentic, Private, Cost-efficient) · product lockups and impact numbers · the pinned product showcase · more from the lab · testimonials · engagement path and packages · founders and vision · closing |
| `/work` | The four core products as editorial rows, then the smaller lab projects |
| `/work/[slug]` | Case study per core product (Weatherise, The Lantern, IGNIS, Unfound) |
| `/services` | Offer families, six-layer architecture, governance controls, audience, metrics, engagement path, claims policy |
| `/about` | Brand line and reach, founders, principles, vision and the twelve-month roadmap |
| `/contact` | Enquiry form, go / no-go criteria, packages and FAQ |

### Preferences, motion and sound

- **Preferences panel** (the sliders icon beside "Book a discovery call"): language, motion
  (Full / Subtle / Off) and sound (ambient music, volume, interface sounds). Saved in
  `localStorage` on the device and applied before first paint (`html[data-motion]`).
- **Sound** is synthesized live with the Web Audio API in `lib/audio.ts` — no audio files, so
  nothing to license or download. Browsers only allow audio after a user gesture, so the music
  fades in on the first click or key press (dismissing the intro counts).
- **Motion:** the intro plays once per session with full motion only; "Subtle" shortens movement
  and turns page transitions into a crossfade; "Off" (or the OS reduced-motion setting) removes
  animation and shows video posters.

### Things that are expected, not bugs

- **Hero.** Copy and layout are kept exactly as approved, including the trust line.
- **Draft quotes.** Every testimonial and product review is a draft for a real person in the
  named role to approve. Drafts carry a role, never a name, and show a "Draft" tag. Set
  `draft: false` and add `name` in `content/people.ts` or `content/products.ts` once approved.
- **Estimates.** "~80% lower AI running cost" is a team estimate, marked "est." with the method
  beside it. "200+ people" is the team's own aggregate figure.
- **Founder links.** LinkedIn and email for Yoshio and Tuong are not published yet, so those
  buttons show as "coming soon"; their portfolio buttons point to GitHub for now.
- **Contact form.** It isn't connected to anything yet, so it won't send.
- **Product films** are WebM with an MP4 fallback; nothing is ever overlaid on a product frame.
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
- `components/home/`: home sections (problem bento, core, product strip, testimonials…).
- `components/work/`: product film, glass frame, metrics and the pinned showcase.
- `components/motion/`: intro, page transitions, scroll reveals, count-up and the glass
  pointer light.
- `content/`: all copy and facts as typed data in English and Vietnamese — `copy.ts` for page
  text, `products.ts` for the core products, `people.ts` for founders and quotes, `sources.ts`
  for citations (publication titles stay in their original language).
- `lib/`: `i18n.ts` (language paths), `prefs.ts` (saved preferences), `audio.ts` (sound engine).
- `components/sound/`: the preferences panel and the sound wiring.
- `public/team/`: founder portraits — the team photos from The Lantern repo, cut out with
  macOS Vision onto one studio backdrop, with the Pyrium lockup printed on each shirt.
- `public/work/logos/`: each product's own logo, copied from its repository.
- `public/work/`: the products' own films, posters and screenshots.
- `public/images/open/`: CC0 / public-domain context photos, credited in `CREDITS.md` there.
- `motion/`: Remotion compositions. See `motion/CREDITS.md`. The site no longer shows these
  loops (the products use their own films); they are kept until the team decides to delete them.
- `public/motion/`: the rendered loops, currently unused by any page.
