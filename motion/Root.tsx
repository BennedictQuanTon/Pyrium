import { Composition } from "remotion";
import { projectOrder } from "../content/projects";
import { HeroA, HeroB, HeroC } from "./Hero";
import { Project } from "./Project";
import { FPS, frames, HERO_SECONDS, PROJECT_SECONDS } from "./theme";

const themes = ["light", "dark"] as const;

export function Root() {
  return (
    <>
      <Composition
        id="hero-a"
        component={HeroA}
        durationInFrames={frames(HERO_SECONDS)}
        fps={FPS}
        width={1600}
        height={900}
      />
      <Composition
        id="hero-b"
        component={HeroB}
        durationInFrames={frames(HERO_SECONDS)}
        fps={FPS}
        width={1080}
        height={1080}
      />
      <Composition
        id="hero-c"
        component={HeroC}
        durationInFrames={frames(HERO_SECONDS)}
        fps={FPS}
        width={1600}
        height={900}
      />
      {projectOrder.flatMap((projectId) =>
        themes.map((theme) => (
          <Composition
            key={`${projectId}-${theme}`}
            id={`project-${projectId}-${theme}`}
            component={Project}
            durationInFrames={frames(PROJECT_SECONDS)}
            fps={FPS}
            width={1280}
            height={800}
            defaultProps={{ projectId, theme }}
          />
        )),
      )}
    </>
  );
}
