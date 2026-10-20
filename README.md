# Pyrium

Landing page for **Pyrium** — private AI systems engineering. "Private AI. Built to act."

One page, one voice: the layout language of `docs/Landing_DESIGN.md` (light showroom, light
display headings, pill CTAs) with the brand kit's single Signal Red accent. The hero keeps the
title on the left and a cluster of obsidian orbs — rims morphing red, blood and grey — on the
right over a Dialog-style red gradient; a procession of the same orbs drifts full-bleed beneath
it. The welcome curtain plays on the first visit of a session.

## Running the site

    10|You need Node 24 (see `.node-version`) and pnpm 11. The pnpm version is pinned in
`package.json`, so Corepack, which ships with Node 24, picks it up for you.

```sh
corepack enable          # once per machine; or: npm install -g pnpm@11
pnpm install
pnpm dev                 # http://localhost:3000
```

To see the page exactly as visitors would, run `pnpm build`, then `pnpm start`.

## The page

1. Hero — title, CTAs and email row on the left, obsidian orbs on the right, then the
   organizer strip (NVIDIA, Viettel, SOVICO, Google, OpenACC, AssemblyAI, lablab.ai, OpenAI,
   Devpost, AMD, Sea/Shopee) under the drifting orb band
2. Problem — cited figures and the spending chart
3. Solution — principles, system layers, audience, engagement metrics
4. Projects — the team's hackathon work as a sideways carousel
5. Testimonials
6. Contact — engagement path, packages and the form
7. Team and vision
8. Closing statement, with the numbered sources in the footer

The top navigation jumps to each section.

### Things that are expected, not bugs

- **Placeholders.** Testimonials, team roles and the Regional Codex project name are clearly
  marked placeholders until the team confirms them.
- **Contact form.** It isn't connected to anything yet, so it won't send.
- **Organizer names.** They are plain text, not their logos, because logos need each brand's
  permission. Pyrium's own logo comes from the brand kit.
- **Welcome curtain, orbs and the band.** All motion-first: the curtain plays once per
  session, the orbs need WebGL. With `prefers-reduced-motion` the curtain never plays, the
  orbs hold still in signal red and the band freezes; without WebGL the hero shows the brand
  block instead.
- **Project loops.** They are H.264 MP4 and play in Chrome, Edge and Safari. In a browser
  without that codec, such as open-source Chromium, you see the still image instead.
- **Chart estimates.** In the spending chart, the 2025 and 2027 bars are calculated from
  Gartner's growth rates, so they are dashed. Only 2026 is Gartner's published figure.

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
- `components/ui/`: shared primitives and section blocks.
- `components/motion/`: the welcome curtain, scroll reveals and the hero orbs (plus the
  drifting band under the hero).
- `content/`: all page copy and facts as typed data, with sources in `content/sources.ts`.
- `motion/`: Remotion compositions (project loops). See `motion/CREDITS.md`. The skull
  compositions are retired from the page but kept here until the team decides to delete them.
- `public/motion/`: rendered loops, committed so the site builds without a renderer.
