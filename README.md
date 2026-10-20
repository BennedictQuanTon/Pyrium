# Pyrium

Landing page for **Pyrium** — private AI systems engineering. "Private AI. Built to act."

This branch holds three design directions for the team to review. No direction has been chosen
yet. When the team decides, the chosen one becomes the home page `/` and the other two are removed.

## Reviewing the three designs

### 1. Run the site

You need Node 24 (see `.node-version`) and pnpm 11. The pnpm version is pinned in
`package.json`, so Corepack, which ships with Node 24, picks it up for you.

```sh
corepack enable          # once per machine; or: npm install -g pnpm@11
pnpm install
pnpm dev                 # http://localhost:3000
```

To see the page exactly as visitors would, run `pnpm build`, then `pnpm start`.

### 2. Open the pages

| Path | Design | What to look at |
| --- | --- | --- |
| [`/`](http://localhost:3000/) | Index | Links to the three designs, with a still of each hero. |
| [`/design-a`](http://localhost:3000/design-a) | **A · Showroom** | `Landing_DESIGN.md` taken literally: centred headline, email field, organizer row, then a browser frame where a point-cloud skull settles and turns. Projects are 2-column cards. |
| [`/design-b`](http://localhost:3000/design-b) | **B · Split** | Copy on the left with a low-poly skull on the right. Sections use alternating two-column rows. Projects sit in one dark panel. |
| [`/design-c`](http://localhost:3000/design-c) | **C · Gallery** | Headline above a full-width card where the skull assembles from shards. Organizers get their own band. Projects scroll sideways as a carousel. |

All three pages have the same content and the same eight sections from the brief:

1. Hero, with the organizer strip
2. Problem
3. Solution
4. Projects
5. Testimonials
6. Contact
7. Team and vision
8. Sources

The top navigation jumps to each section. Only the layout, the way the skull is drawn and the way
the projects are shown differ between designs.

### 3. Things that are expected, not bugs

- **Placeholders.** Testimonials, team roles and the Regional Codex project name are clearly
  marked placeholders until the team confirms them.
- **Contact form.** It isn't connected to anything yet, so it won't send.
- **Organizer names.** They are plain text, not their logos, because logos need each brand's
  permission. Pyrium's own logo comes from the brand kit.
- **Motion loops.** They are H.264 MP4 and play in Chrome, Edge and Safari. In a browser without
  that codec, such as open-source Chromium, you see the still image instead.
- **Reduced motion.** If your OS asks for reduced motion, every loop shows its still image. This
  is intended.
- **Chart estimates.** In the spending chart, the 2025 and 2027 bars are calculated from Gartner's
  growth rates, so they are dashed. Only 2026 is Gartner's published figure.

### 4. Give feedback

Comment on the pull request with:

- the design you prefer (A, B or C)
- anything you would borrow from the other two
- the section and screen width your note is about (desktop, or a phone at about 390px wide)

## Brand sources

The team's original documents live in `docs/`. The brief stays at the root as `CLAUDE.md`, where
coding agents load it automatically. The brand kit stays in `PYRIUM_Brand_Identity_Kit/`. It is the
newest source, so where it differs from the older documents, the kit wins. That applies to
typography (Inter Display / Inter), Mist (`#F3F3F3`) and the logo artwork.

| File | Role |
| --- | --- |
| `PYRIUM_Brand_Identity_Kit/` | Logos, icons, favicons, brand guidelines and tokens. The site copies only the logo (`public/brand/`), the favicon and the app icon (`app/`). |
| `docs/Landing_DESIGN.md` | Style reference: layout, type, surfaces, components. Followed exactly, with Signal Red replacing the orange accent. |
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
| `pnpm motion:studio` | Open the Remotion studio for the motion loops |
| `pnpm motion:render [filter]` | Render loops and posters to `public/motion/` (e.g. `pnpm motion:render hero`) |

## Layout

- `docs/`: the team's original brand documents (see above).
- `PYRIUM_Brand_Identity_Kit/`: the brand kit, kept as delivered. Biome and TypeScript skip it.
- `public/brand/`: the logo copied from the kit.
- `app/`: routes. `design-a`, `design-b` and `design-c` are the three directions.
- `components/ui/`: shared primitives and section blocks.
- `content/`: all page copy and facts as typed data, with sources in `content/sources.ts`.
- `motion/`: Remotion compositions (skull heroes, project loops). See `motion/CREDITS.md`.
- `public/motion/`: rendered loops, committed so the site builds without a renderer.
