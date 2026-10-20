import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { display, type Palette, sans, smooth } from "./theme";
import { presence, ramp, useSeconds } from "./time";

// Adapted from the Ignis film's motion pieces (video/ignis-film/src/motion/): same springs and
// camera maths, but monochrome, Inter Display / Inter, and no monospace face.

type Segment = { text: string; at: number };

/** A line revealed word by word (blur + rise on a soft spring) and blurred away at `out`. */
export function KineticLine({
  segments,
  out = Number.POSITIVE_INFINITY,
  size = 56,
  color,
}: {
  segments: Segment[];
  out?: number;
  size?: number;
  color: string;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const seconds = useSeconds();
  const words = segments
    .flatMap((segment) =>
      segment.text.split(" ").map((text, index) => ({ text, at: segment.at, index })),
    )
    .map((word, position) => ({ ...word, position, id: `${word.at}-${position}` }));
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        columnGap: size * 0.26,
        fontFamily: display,
        fontWeight: 300,
        fontSize: size,
        lineHeight: 1.15,
        letterSpacing: -size * 0.01,
        color,
      }}
    >
      {words.map(({ text, at, index, position, id }) => {
        const start = Math.round(at * fps) + index * 3;
        const rise = spring({
          frame: frame - start,
          fps,
          durationInFrames: 22,
          config: { damping: 200, mass: 0.8, stiffness: 140 },
        });
        const leave = presence(seconds, -1, out + position * 0.02);
        return (
          <span
            key={id}
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              opacity: rise * leave.opacity,
              transform: `translateY(${(1 - rise) * size * 0.4}px)`,
              filter: `blur(${(1 - rise) * 8 + (1 - leave.opacity) * 10}px)`,
            }}
          >
            {text}
          </span>
        );
      })}
    </div>
  );
}

/** Three passes of 0–9, so a column can roll past its target before settling. */
const DIGITS = Array.from({ length: 30 }, (_, slot) => ({ id: `d${slot}`, digit: slot % 10 }));

/** A number whose digits roll like an odometer, each column on its own staggered spring. */
export function Odometer({
  value,
  at,
  size = 200,
  color,
}: {
  value: string;
  at: number;
  size?: number;
  color: string;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = Math.round(at * fps);
  let column = 0;
  return (
    <div
      style={{
        display: "flex",
        fontFamily: display,
        fontWeight: 300,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: -size * 0.02,
        color,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {Array.from(value, (character, slot) => ({ character, id: `c${slot}` })).map(
        ({ character, id }) => {
          if (!/\d/.test(character)) {
            const appear = spring({
              frame: frame - start,
              fps,
              durationInFrames: 20,
              config: { damping: 200 },
            });
            return (
              <span key={id} style={{ opacity: appear }}>
                {character}
              </span>
            );
          }
          const delay = column * 3;
          column += 1;
          const progressAt = (offset: number) =>
            spring({
              frame: frame - start - delay - offset,
              fps,
              durationInFrames: 40,
              config: { damping: 200, mass: 1, stiffness: 90 },
            });
          const target = 20 + Number(character);
          const now = target * progressAt(0);
          const speed = Math.abs(now - target * progressAt(1));
          return (
            <span
              key={id}
              style={{ display: "inline-block", height: size * 1.02, overflow: "hidden" }}
            >
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  transform: `translateY(${-now * size}px)`,
                  filter: `blur(${Math.min(8, speed * size * 0.04)}px)`,
                }}
              >
                {DIGITS.map(({ id: digitId, digit }) => (
                  <span key={digitId} style={{ height: size, display: "block" }}>
                    {digit}
                  </span>
                ))}
              </span>
            </span>
          );
        },
      )}
    </div>
  );
}

/** Small caption label in Inter. */
export function Caption({
  children,
  color,
  at,
  out,
}: {
  children: string;
  color: string;
  at: number;
  out: number;
}) {
  const seconds = useSeconds();
  const shown = presence(seconds, at, out);
  return (
    <div
      style={{
        fontFamily: sans,
        fontSize: 26,
        fontWeight: 400,
        color,
        letterSpacing: -0.3,
        opacity: shown.opacity,
        transform: `translateY(${shown.shift}px)`,
        filter: `blur(${shown.blur}px)`,
      }}
    >
      {children}
    </div>
  );
}

/** Camera key: centre frame point (x, y) (fractions of the image) at `zoom` (1 = width fills). */
export type Key = { at: number; x: number; y: number; zoom: number };
/** Outline around an image region [x0, y0, x1, y1] (fractions) from `at` to `out`. */
export type Mark = { at: number; out: number; rect: [number, number, number, number] };

function camera(keys: Key[], seconds: number): Key {
  if (seconds <= keys[0].at) return keys[0];
  const next = keys.findIndex((key) => key.at > seconds);
  if (next < 0) return keys[keys.length - 1];
  const before = keys[next - 1];
  const after = keys[next];
  const progress = interpolate(seconds, [before.at, after.at], [0, 1], { easing: smooth });
  return {
    at: seconds,
    x: before.x + (after.x - before.x) * progress,
    y: before.y + (after.y - before.y) * progress,
    zoom: before.zoom + (after.zoom - before.zoom) * progress,
  };
}

/**
 * A screenshot of our own app under a smooth camera, in greyscale so the page stays monochrome,
 * with outlines drawn on in the palette's ink. The camera starts and ends on the same key.
 */
export function ScreenCamera({
  image,
  natural,
  keys,
  marks,
  palette,
}: {
  image: string;
  natural: [number, number];
  keys: Key[];
  marks: Mark[];
  palette: Palette;
}) {
  const { width: viewWidth, height: viewHeight } = useVideoConfig();
  const seconds = useSeconds();
  const view = camera(keys, seconds);
  const width = viewWidth * view.zoom;
  const height = width * (natural[1] / natural[0]);
  const left = Math.min(0, Math.max(viewWidth - width, viewWidth / 2 - view.x * width));
  const top = Math.min(0, Math.max(viewHeight - height, viewHeight / 2 - view.y * height));
  return (
    <div
      style={{ position: "absolute", inset: 0, overflow: "hidden", background: palette.surface }}
    >
      <Img
        src={staticFile(image)}
        style={{
          position: "absolute",
          left,
          top,
          width,
          height,
          filter: "grayscale(1) contrast(1.02)",
        }}
      />
      <svg width={viewWidth} height={viewHeight} style={{ position: "absolute", inset: 0 }}>
        <title>Highlighted region</title>
        {marks.map((mark) => {
          const [x0, y0, x1, y1] = mark.rect;
          const boxLeft = left + x0 * width - 10;
          const boxTop = top + y0 * height - 10;
          const boxWidth = (x1 - x0) * width + 20;
          const boxHeight = (y1 - y0) * height + 20;
          const draw = ramp(seconds, mark.at, mark.at + 0.7);
          const fade = 1 - ramp(seconds, mark.out, mark.out + 0.3);
          const perimeter = 2 * (boxWidth + boxHeight);
          return (
            <rect
              key={`${mark.at}-${mark.rect.join("-")}`}
              x={boxLeft}
              y={boxTop}
              width={boxWidth}
              height={boxHeight}
              rx={14}
              fill="none"
              stroke="#111111"
              strokeWidth={4}
              opacity={fade}
              strokeDasharray={perimeter}
              strokeDashoffset={perimeter * (1 - draw)}
            />
          );
        })}
      </svg>
    </div>
  );
}
