// Renders every composition in motion/ to a silent looping MP4 (H.264) and a JPEG
// poster in public/motion/. Usage: `pnpm motion:render [id-substring ...]`.
import { spawnSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";

const OUT = "public/motion";
const projects = [
  "weatherise",
  "viettel-ai-race",
  "lantern",
  "architecturelab",
  "ignis",
  "regional-codex",
];
const screens = new Set(["lantern", "architecturelab", "ignis"]);

/**
 * [composition id, poster frame, h264 crf, output scale]. H.264 alone plays in every current
 * browser and came out smaller than VP9 for these loops. Budgets: about 1.5 MB per hero
 * loop and 800 KB per project loop. Screen tours fill the frame with a greyscale screenshot, so
 * they render once (light) and serve both card themes.
 */
const jobs = [
  ["hero-a", 90, 36, 0.8],
  ["hero-b", 0, 27, 1],
  ["hero-c", 150, 31, 0.8],
  ...projects.flatMap((id) =>
    screens.has(id)
      ? [[`project-${id}-light`, 0, 33, 0.75]]
      : ["light", "dark"].map((theme) => [`project-${id}-${theme}`, 120, 28, 1]),
  ),
];

const filters = process.argv.slice(2);
const selected = filters.length ? jobs.filter(([id]) => filters.some((f) => id.includes(f))) : jobs;

function remotion(args) {
  const result = spawnSync("pnpm", ["exec", "remotion", ...args, "--log=error"], {
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    console.error(`remotion ${args.slice(0, 3).join(" ")} failed`);
    process.exit(result.status ?? 1);
  }
}

mkdirSync(OUT, { recursive: true });
for (const [id, posterFrame, h264Crf, scale] of selected) {
  remotion([
    "render",
    "motion/index.ts",
    id,
    `${OUT}/${id}.mp4`,
    "--codec=h264",
    `--crf=${h264Crf}`,
    "--muted",
    `--scale=${scale}`,
  ]);
  remotion([
    "still",
    "motion/index.ts",
    id,
    `${OUT}/${id}.jpg`,
    `--frame=${posterFrame}`,
    "--image-format=jpeg",
    "--jpeg-quality=82",
  ]);
  const size = (ext) => `${Math.round(statSync(`${OUT}/${id}.${ext}`).size / 1024)} KB`;
  console.log(`${id}: mp4 ${size("mp4")}, jpg ${size("jpg")}`);
}
