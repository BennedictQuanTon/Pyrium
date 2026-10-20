import { BufferGeometry, Float32BufferAttribute, MeshBasicMaterial } from "three";
import { MarchingCubes } from "three/examples/jsm/objects/MarchingCubes.js";
import { seeded } from "./time";

/*
 * Our own procedural skull: a signed distance field built from ellipsoids (cranium, face,
 * cheekbones, jaw) with sockets and a nasal cavity carved out. No third-party model is used.
 * Units: roughly ±1.1, y up, the face looks down +z.
 */

type Vec = [number, number, number];

function ellipsoid(p: Vec, centre: Vec, radii: Vec): number {
  const x = (p[0] - centre[0]) / radii[0];
  const y = (p[1] - centre[1]) / radii[1];
  const z = (p[2] - centre[2]) / radii[2];
  const k0 = Math.hypot(x, y, z);
  const k1 = Math.hypot(x / radii[0], y / radii[1], z / radii[2]);
  return k1 === 0 ? -Math.min(...radii) : (k0 * (k0 - 1)) / k1;
}

function box(p: Vec, centre: Vec, half: Vec): number {
  const qx = Math.abs(p[0] - centre[0]) - half[0];
  const qy = Math.abs(p[1] - centre[1]) - half[1];
  const qz = Math.abs(p[2] - centre[2]) - half[2];
  const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0), Math.max(qz, 0));
  return outside + Math.min(Math.max(qx, qy, qz), 0);
}

function smoothUnion(a: number, b: number, k: number): number {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - (h * h * k) / 4;
}

function smoothCut(a: number, b: number, k: number): number {
  return -smoothUnion(-a, b, k);
}

/** Evaluates a left/right pair by mirroring x, so paired bones stay symmetric. */
function paired(p: Vec, shape: (q: Vec) => number): number {
  return shape([Math.abs(p[0]), p[1], p[2]]);
}

export function skullDistance(p: Vec): number {
  // Cranium, forehead and brow ridge.
  let d = ellipsoid(p, [0, 0.26, -0.14], [0.72, 0.74, 0.9]);
  d = smoothUnion(d, ellipsoid(p, [0, 0.1, 0.4], [0.6, 0.34, 0.42]), 0.2);
  d = smoothUnion(d, ellipsoid(p, [0, -0.02, 0.6], [0.54, 0.1, 0.2]), 0.08);
  // Cheekbones with the arches running back towards the ears, then the upper jaw.
  d = smoothUnion(
    d,
    paired(p, (q) => ellipsoid(q, [0.38, -0.26, 0.5], [0.17, 0.12, 0.18])),
    0.1,
  );
  d = smoothUnion(
    d,
    paired(p, (q) => ellipsoid(q, [0.5, -0.28, 0.22], [0.06, 0.06, 0.24])),
    0.08,
  );
  d = smoothUnion(d, ellipsoid(p, [0, -0.42, 0.56], [0.32, 0.22, 0.28]), 0.12);
  // Lower jaw: a U-shaped body open at the back, two rami rising to the skull, and a chin.
  const body = Math.max(
    ellipsoid(p, [0, -0.73, 0.42], [0.37, 0.12, 0.34]),
    -ellipsoid(p, [0, -0.73, 0.26], [0.27, 0.3, 0.3]),
  );
  let jaw = smoothUnion(
    body,
    paired(p, (q) => ellipsoid(q, [0.33, -0.5, 0.14], [0.065, 0.27, 0.12])),
    0.06,
  );
  jaw = smoothUnion(jaw, ellipsoid(p, [0, -0.8, 0.68], [0.13, 0.08, 0.08]), 0.06);
  d = smoothUnion(d, jaw, 0.08);
  // Deep eye sockets, nasal cavity, the bite line and the gaps between teeth.
  d = smoothCut(
    d,
    paired(p, (q) => ellipsoid(q, [0.24, -0.12, 0.72], [0.17, 0.15, 0.32])),
    0.04,
  );
  d = smoothCut(d, ellipsoid(p, [0, -0.34, 0.8], [0.07, 0.12, 0.26]), 0.03);
  d = smoothCut(d, box(p, [0, -0.61, 0.7], [0.28, 0.014, 0.2]), 0.015);
  for (let tooth = -3; tooth <= 3; tooth += 1) {
    d = Math.max(d, -box(p, [tooth * 0.075, -0.61, 0.78], [0.005, 0.08, 0.1]));
  }
  // Temples are flatter than an ellipsoid.
  d = smoothCut(
    d,
    paired(p, (q) => ellipsoid(q, [0.95, 0.12, 0.05], [0.3, 0.42, 0.5])),
    0.1,
  );
  return d;
}

export function gradient(p: Vec): Vec {
  const e = 0.002;
  const dx = skullDistance([p[0] + e, p[1], p[2]]) - skullDistance([p[0] - e, p[1], p[2]]);
  const dy = skullDistance([p[0], p[1] + e, p[2]]) - skullDistance([p[0], p[1] - e, p[2]]);
  const dz = skullDistance([p[0], p[1], p[2] + e]) - skullDistance([p[0], p[1], p[2] - e]);
  const length = Math.hypot(dx, dy, dz) || 1;
  return [dx / length, dy / length, dz / length];
}

/** Points on the skull surface, projected from random seeds with a few Newton steps. */
export function surfacePoints(count: number, seed = 7): Float32Array {
  const random = seeded(seed);
  const out = new Float32Array(count * 3);
  let filled = 0;
  let guard = 0;
  while (filled < count && guard < count * 60) {
    guard += 1;
    let p: Vec = [random() * 2.2 - 1.1, random() * 2.3 - 1.2, random() * 2.2 - 1.1];
    if (Math.abs(skullDistance(p)) > 0.25) continue;
    for (let step = 0; step < 5; step += 1) {
      const d = skullDistance(p);
      const n = gradient(p);
      p = [p[0] - d * n[0], p[1] - d * n[1], p[2] - d * n[2]];
    }
    if (Math.abs(skullDistance(p)) > 0.004) continue;
    out.set(p, filled * 3);
    filled += 1;
  }
  return out.subarray(0, filled * 3);
}

const GRID_SCALE = 1.25;

/**
 * Triangle mesh of the skull at a given grid resolution. Low resolutions give the faceted,
 * low-poly look; the result is non-indexed so each triangle can be shaded or moved on its own.
 */
export function skullMesh(resolution: number): BufferGeometry {
  const cubes = new MarchingCubes(resolution, new MeshBasicMaterial(), false, false, 200000);
  cubes.isolation = 0;
  const { size, size2, halfsize } = cubes;
  for (let z = 0; z < size; z += 1) {
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const p: Vec = [
          ((x - halfsize) / halfsize) * GRID_SCALE,
          ((y - halfsize) / halfsize) * GRID_SCALE,
          ((z - halfsize) / halfsize) * GRID_SCALE,
        ];
        cubes.field[z * size2 + y * size + x] = -skullDistance(p);
      }
    }
  }
  cubes.update();
  const vertexCount = cubes.count;
  const positions = new Float32Array(vertexCount * 3);
  for (let index = 0; index < vertexCount * 3; index += 1) {
    positions[index] = cubes.positionArray[index] * GRID_SCALE;
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  return geometry;
}
