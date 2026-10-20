import { AbsoluteFill, useVideoConfig } from "remotion";
import type { ProjectId } from "../content/types";
import { Caption, type Key, KineticLine, type Mark, Odometer, ScreenCamera } from "./pieces";
import { PROJECT_SECONDS, palettes, sans, type Theme } from "./theme";
import { presence, ramp, useSeconds } from "./time";

export type ProjectProps = { projectId: ProjectId; theme: Theme };

const END = PROJECT_SECONDS;

/* Screen tours: real screenshots of our own apps. First and last camera keys match for a clean loop. */
const screens: Partial<
  Record<ProjectId, { image: string; natural: [number, number]; keys: Key[]; marks: Mark[] }>
> = {
  lantern: {
    image: "lantern-management.png",
    natural: [1440, 1000],
    keys: [
      { at: 0, x: 0.5, y: 0.35, zoom: 1 },
      { at: 2.2, x: 0.5, y: 0.22, zoom: 1.45 },
      { at: 4.6, x: 0.78, y: 0.6, zoom: 1.6 },
      { at: END, x: 0.5, y: 0.35, zoom: 1 },
    ],
    marks: [
      { at: 2.3, out: 3.9, rect: [0.095, 0.17, 0.905, 0.265] },
      { at: 4.8, out: 6.6, rect: [0.64, 0.31, 0.905, 0.88] },
    ],
  },
  architecturelab: {
    image: "architecturelab.png",
    natural: [2880, 1800],
    keys: [
      { at: 0, x: 0.5, y: 0.5, zoom: 1 },
      { at: 2.4, x: 0.38, y: 0.55, zoom: 1.5 },
      { at: 4.8, x: 0.86, y: 0.35, zoom: 1.7 },
      { at: END, x: 0.5, y: 0.5, zoom: 1 },
    ],
    marks: [
      { at: 2.5, out: 4.1, rect: [0.04, 0.44, 0.72, 0.72] },
      { at: 5, out: 6.7, rect: [0.765, 0.185, 0.98, 0.505] },
    ],
  },
  ignis: {
    image: "ignis-facts.png",
    natural: [2880, 1800],
    keys: [
      { at: 0, x: 0.5, y: 0.5, zoom: 1 },
      { at: 2.4, x: 0.58, y: 0.33, zoom: 1.45 },
      { at: 4.8, x: 0.58, y: 0.8, zoom: 1.45 },
      { at: END, x: 0.5, y: 0.5, zoom: 1 },
    ],
    marks: [
      { at: 2.5, out: 4.1, rect: [0.235, 0.19, 0.945, 0.5] },
      { at: 5, out: 6.7, rect: [0.235, 0.53, 0.945, 0.98] },
    ],
  },
};

/** Weatherise: the agent pipeline from its README, drawn on and cleared within the loop. */
function Pipeline({ theme }: { theme: Theme }) {
  const palette = palettes[theme];
  const seconds = useSeconds();
  const { width, height } = useVideoConfig();
  const agents = ["Weather", "Attractions", "Route", "Local expert"];
  const out = END - 1.1;
  const node = (label: string, x: number, y: number, at: number, w = 220) => {
    const shown = presence(seconds, at, out);
    return (
      <div
        key={label}
        style={{
          position: "absolute",
          left: x - w / 2,
          top: y - 34,
          width: w,
          height: 68,
          borderRadius: 34,
          border: `2px solid ${palette.ink}`,
          background: palette.canvas,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: sans,
          fontSize: 24,
          color: palette.ink,
          opacity: shown.opacity,
          transform: `translateY(${shown.shift}px)`,
          filter: `blur(${shown.blur}px)`,
        }}
      >
        {label}
      </div>
    );
  };
  const line = (x1: number, y1: number, x2: number, y2: number, at: number) => {
    const draw = ramp(seconds, at, at + 0.6);
    const fade = 1 - ramp(seconds, out, out + 0.45);
    const length = Math.hypot(x2 - x1, y2 - y1);
    return (
      <line
        key={`${x1}-${y1}-${x2}-${y2}`}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={palette.faint}
        strokeWidth={2}
        opacity={fade}
        strokeDasharray={length}
        strokeDashoffset={length * (1 - draw)}
      />
    );
  };
  const cx = width / 2;
  const rows = [150, 330, 510, 680];
  const spread = [-450, -150, 150, 450];
  return (
    <AbsoluteFill style={{ background: palette.canvas }}>
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        <title>Agent pipeline</title>
        {line(cx, rows[0] + 34, cx, rows[1] - 34, 0.9)}
        {spread.map((dx, index) =>
          line(cx, rows[1] + 34, cx + dx, rows[2] - 34, 1.6 + index * 0.15),
        )}
        {spread.map((dx, index) => line(cx + dx, rows[2] + 34, cx, rows[3] - 34, 3 + index * 0.15))}
      </svg>
      {node("Traveller's question", cx, rows[0], 0.3, 300)}
      {node("Orchestrator", cx, rows[1], 1.1)}
      {agents.map((label, index) => node(label, cx + spread[index], rows[2], 2 + index * 0.15))}
      {node("Weather-aware plan", cx, rows[3], 3.6, 300)}
    </AbsoluteFill>
  );
}

/** Viettel AI Race: the first submission's official score, rolled in and cleared. */
function Score({ theme }: { theme: Theme }) {
  const palette = palettes[theme];
  const seconds = useSeconds();
  const out = END - 1.2;
  const shown = presence(seconds, 0.4, out);
  return (
    <AbsoluteFill
      style={{
        background: palette.canvas,
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
      }}
    >
      <div style={{ opacity: shown.opacity, filter: `blur(${shown.blur}px)` }}>
        <Odometer value="49.81" at={0.5} size={220} color={palette.ink} />
      </div>
      <Caption color={palette.muted} at={1.6} out={out}>
        Phase 1 score · Score = 100 × ERS × f(Δ)
      </Caption>
      <Caption color={palette.muted} at={2.3} out={out}>
        420 requests · vLLM · one H200 MIG slice (18 GB)
      </Caption>
    </AbsoluteFill>
  );
}

/** Regional Codex: upcoming, so text only. */
function Upcoming({ theme }: { theme: Theme }) {
  const palette = palettes[theme];
  const out = END - 1.2;
  return (
    <AbsoluteFill
      style={{
        background: palette.canvas,
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        padding: 120,
      }}
    >
      <KineticLine
        segments={[{ text: "Sea × OpenAI Regional Codex Hackathon", at: 0.4 }]}
        out={out}
        size={64}
        color={palette.ink}
      />
      <Caption color={palette.muted} at={1.6} out={out}>
        31 Oct 2026 · Ho Chi Minh City · built on the day
      </Caption>
    </AbsoluteFill>
  );
}

export function Project({ projectId, theme }: ProjectProps) {
  const screen = screens[projectId];
  if (screen) return <ScreenCamera {...screen} palette={palettes[theme]} />;
  if (projectId === "weatherise") return <Pipeline theme={theme} />;
  if (projectId === "viettel-ai-race") return <Score theme={theme} />;
  return <Upcoming theme={theme} />;
}
