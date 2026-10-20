# Motion sources

Every loop in `public/motion/` is rendered from this folder with Remotion (`pnpm motion:render`).
No third-party footage, music or 3D models are used, and every loop is silent.

| Asset | What it is | Source |
| --- | --- | --- |
| Skull (all three hero loops) | Procedural geometry: a signed distance field in `skull.ts`, meshed with three.js `MarchingCubes` | Our own code |
| `assets/lantern-management.png` | The Lantern management screen | Team repo `Team-Develarper---AssemblyAI---Voice-Agent-Hackathon/docs/assets/management.png` |
| `assets/architecturelab.png` | ArchitectureLab home screen | Captured from the live site https://architecturelab.vercel.app on 2026-10-20 (Playwright, 1440×900 @2x) |
| `assets/ignis-facts.png` | Ignis "Facts" workflow screen | Captured in replay mode for the Ignis film (`ignis-film/public/shots/`) |
| Motion pieces in `pieces.tsx`, `time.ts` | Word reveal, odometer, screen camera | Adapted from the Ignis film's `src/motion/` |

Screens are shown in greyscale so the page keeps a single accent colour (Landing_DESIGN.md).

## Licences

- Remotion is source-available. Its free licence covers for-profit organisations of up to three
  people; Pyrium is three people today. A fourth person would require a Remotion Company License.
  See https://remotion.dev/license.
- Font: Inter (variable, with the optical-size axis that gives Inter Display), as set by the
  brand kit. SIL Open Font License, loaded through `@remotion/google-fonts`.
- The site's logo, favicon and app icon are copied unchanged from `PYRIUM_Brand_Identity_Kit/`.
  They do not appear in any loop.
