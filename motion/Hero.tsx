import { ThreeCanvas } from "@remotion/three";
import { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Float32BufferAttribute } from "three";
import { gradient, skullMesh, surfacePoints } from "./skull";
import { FPS, HERO_SECONDS, palettes, smooth } from "./theme";
import { ramp, seeded } from "./time";

const TAU = Math.PI * 2;
const LOOP = HERO_SECONDS * FPS;

/** Loop phase in [0, 1); frame LOOP equals frame 0, so the render repeats seamlessly. */
function usePhase() {
  return (useCurrentFrame() % LOOP) / LOOP;
}

function Stage({ background, children }: { background: string; children: React.ReactNode }) {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background }}>
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ fov: 28, position: [0, 0.1, 6.4] }}
        gl={{ antialias: true }}
      >
        {children}
      </ThreeCanvas>
    </AbsoluteFill>
  );
}

/** A: a point cloud that settles into the skull, turns once, and loosens again at the loop seam. */
export function HeroA() {
  const phase = usePhase();
  const { cloud, normals, scatter } = useMemo(() => {
    const surface = surfacePoints(8000, 11);
    const facing = new Float32Array(surface.length);
    for (let index = 0; index < surface.length; index += 3) {
      facing.set(gradient([surface[index], surface[index + 1], surface[index + 2]]), index);
    }
    const random = seeded(23);
    const offsets = new Float32Array(surface.length);
    for (let index = 0; index < offsets.length; index += 1) offsets[index] = (random() - 0.5) * 1.6;
    return { cloud: surface, normals: facing, scatter: offsets };
  }, []);
  const seconds = phase * HERO_SECONDS;
  const loosen =
    (1 - ramp(seconds, 0, 2.2, smooth)) ** 2 +
    ramp(seconds, HERO_SECONDS - 2.2, HERO_SECONDS, smooth) ** 2;
  // One full turn per loop, facing the camera around 3 s (the poster frame).
  const turn = (phase - 0.3) * TAU;
  const positions = useMemo(() => new Float32Array(cloud.length), [cloud]);
  const colors = useMemo(() => new Float32Array(cloud.length), [cloud]);
  const [lx, ly, lz] = [0.35, 0.45, 0.82];
  const cos = Math.cos(turn);
  const sin = Math.sin(turn);
  for (let index = 0; index < cloud.length; index += 3) {
    for (let axis = 0; axis < 3; axis += 1) {
      positions[index + axis] = cloud[index + axis] + scatter[index + axis] * loosen;
    }
    // Shade each point by how its surface faces a fixed light: ink when lit, pale when turned away.
    const nx = normals[index] * cos + normals[index + 2] * sin;
    const nz = -normals[index] * sin + normals[index + 2] * cos;
    const lit = Math.max(0, nx * lx + normals[index + 1] * ly + nz * lz);
    const shade = 0.24 - 0.235 * (0.25 + 0.75 * lit) * (1 - loosen * 0.4);
    colors[index] = shade;
    colors[index + 1] = shade;
    colors[index + 2] = shade;
  }
  return (
    <Stage background={palettes.light.surface}>
      <points rotation={[0.08, turn, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={positions.length / 3}
          />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} count={colors.length / 3} />
        </bufferGeometry>
        <pointsMaterial vertexColors size={0.027} sizeAttenuation />
      </points>
    </Stage>
  );
}

/** B: a faceted low-poly skull in graphite and mist, swaying under a slowly orbiting key light. */
export function HeroB() {
  const phase = usePhase();
  const geometry = useMemo(() => skullMesh(34), []);
  const sway = Math.sin(phase * TAU) * 0.4;
  const light = phase * TAU;
  return (
    <Stage background={palettes.light.canvas}>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[Math.cos(light) * 5, 2.5, Math.sin(light) * 2 + 4]}
        intensity={2.2}
      />
      <directionalLight position={[-4, -1, 2]} intensity={0.35} />
      <mesh geometry={geometry} rotation={[0.06, sway + 0.2, 0]} scale={1.18}>
        <meshStandardMaterial color="#8a8a8a" roughness={0.85} metalness={0} flatShading />
      </mesh>
    </Stage>
  );
}

/** C: angular shards fly in and lock into the skull, hold, then drift apart at the loop seam. */
export function HeroC() {
  const phase = usePhase();
  const seconds = phase * HERO_SECONDS;
  const { base, flight, geometry } = useMemo(() => {
    const source = skullMesh(26);
    const position = source.getAttribute("position").array as Float32Array;
    const random = seeded(41);
    const offsets = new Float32Array(position.length);
    for (let triangle = 0; triangle < position.length; triangle += 9) {
      const centre = [0, 1, 2].map(
        (axis) =>
          (position[triangle + axis] +
            position[triangle + 3 + axis] +
            position[triangle + 6 + axis]) /
          3,
      );
      const push = 0.6 + random() * 2.2;
      const drift = [(random() - 0.5) * 1.2, (random() - 0.5) * 1.2, (random() - 0.5) * 1.2];
      for (let vertex = 0; vertex < 9; vertex += 3) {
        for (let axis = 0; axis < 3; axis += 1) {
          offsets[triangle + vertex + axis] = centre[axis] * push + drift[axis];
        }
      }
    }
    const working = source.clone();
    return { base: position.slice(), flight: offsets, geometry: working };
  }, []);
  const apart =
    (1 - ramp(seconds, 0.2, 3.4, smooth)) ** 1.5 +
    ramp(seconds, HERO_SECONDS - 1.8, HERO_SECONDS, smooth) ** 1.5;
  const next = new Float32Array(base.length);
  for (let index = 0; index < base.length; index += 1)
    next[index] = base[index] + flight[index] * apart;
  geometry.setAttribute("position", new Float32BufferAttribute(next, 3));
  geometry.computeVertexNormals();
  return (
    <Stage background={palettes.light.canvas}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 5]} intensity={2} />
      <directionalLight position={[-4, -2, 1]} intensity={0.4} />
      <mesh
        geometry={geometry}
        rotation={[0.05, Math.sin(phase * TAU) * 0.3 + 0.25, 0]}
        scale={1.18}
      >
        <meshStandardMaterial color="#f3f3f3" roughness={0.9} flatShading side={2} />
      </mesh>
    </Stage>
  );
}
