import type { Project, ProjectId } from "./types";

/**
 * The team's joint work, oldest first. Facts come from each project's own repository README;
 * solo projects stay off this list until each member adds individual highlights.
 */
const projects = {
  weatherise: {
    id: "weatherise",
    title: "Weatherise",
    event: "Vietnam AI Open Hackathon · Viettel, NVIDIA / OpenACC",
    period: "Jun 2026",
    result: "One of 10 teams selected from about 100 registrants",
    oneLine:
      "A multi-agent system that pairs weather intelligence with route optimization to plan travel in Da Nang, built on NVIDIA Earth-2 models.",
    stack: ["Multi-agent", "NVIDIA Earth-2", "Nemotron", "Qdrant", "MCP"],
    motion: "project-weatherise",
  },
  "viettel-ai-race": {
    id: "viettel-ai-race",
    title: "Viettel AI Race 2026 · Challenge 3",
    event: "Viettel AI Race 2026",
    period: "Jul 2026",
    result: "Phase 1 qualifier: first submission scored 49.81 on the official metric",
    oneLine:
      "LLM inference optimization: serving a 1.2B-parameter model with vLLM on a single H200 MIG slice under a fixed latency and accuracy budget.",
    stack: ["vLLM", "LFM2.5-1.2B", "H200 MIG", "Docker"],
    motion: "project-viettel-ai-race",
  },
  lantern: {
    id: "lantern",
    title: "The Lantern",
    event: "AssemblyAI Voice Agent Hackathon · lablab.ai",
    period: "Sep 2026",
    oneLine:
      "A multilingual voice maître d' that takes a whole table's order, checks every change against the live menu, and keeps the kitchen in sync — on local models.",
    stack: ["AssemblyAI streaming", "Local 4B model", "Local TTS"],
    motion: "project-lantern",
    screenTour: true,
  },
  architecturelab: {
    id: "architecturelab",
    title: "ArchitectureLab",
    event: "OpenAI hackathon · Devpost",
    period: "Sep 2026",
    oneLine:
      "A WebMCP-native architecture studio: a person and an AI agent share one live system model, and only the person can apply the agent's proposed patch.",
    stack: ["WebMCP", "React", "TypeScript", "Vite"],
    href: "https://architecturelab.vercel.app",
    motion: "project-architecturelab",
    screenTour: true,
  },
  ignis: {
    id: "ignis",
    title: "Ignis",
    event: "AMD Developer Hackathon ACT III · lablab.ai",
    period: "Oct 2026",
    oneLine:
      "Maintenance intelligence for power plants: monitoring, human-approved incident response, and evidence-linked work orders.",
    stack: ["AMD inference", "Python", "SQLite", "React"],
    motion: "project-ignis",
    screenTour: true,
  },
  "regional-codex": {
    id: "regional-codex",
    title: "Regional Codex project (name TBC)",
    event: "Sea × OpenAI Regional Codex Hackathon · Shopee, Ho Chi Minh City",
    period: "31 Oct 2026",
    oneLine:
      "A communication assistant between Shopee Express buyers and delivery drivers. Built on the day; rules require all building to happen at the event.",
    stack: [],
    motion: "project-regional-codex",
    upcoming: true,
  },
} satisfies Record<ProjectId, Project>;

export const projectOrder: ProjectId[] = [
  "weatherise",
  "viettel-ai-race",
  "lantern",
  "architecturelab",
  "ignis",
  "regional-codex",
];

export const orderedProjects: Project[] = projectOrder.map((id) => projects[id]);
