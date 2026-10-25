import type { LabProject, Product, ProductSlug } from "./types";

/**
 * The four core products, newest work in the team's own words. Metrics come from each
 * project's repository and write-up (mirrored in the founders' portfolio, MyWebsite) and were
 * measured on the stated test sets at the event, not on customer workloads. Reviews are drafts
 * for a real person in the named role to approve; see the `draft` flag.
 */
const products = {
  weatherise: {
    slug: "weatherise",
    name: "Weatherise",
    category: "Weather decisions",
    tagline: "A forecast is not a decision. Weatherise makes the call.",
    oneLine:
      "Multi-agent go / no-go decisions for tourism, construction and agriculture in Da Nang, with the evidence behind every call.",
    event: "Vietnam AI Open Hackathon 2026",
    organizers: "NVIDIA · Viettel · Sovico",
    period: "Jun 2026",
    result: "Top 10 finalist",
    team: "Team of 4",
    problem:
      "Weather apps say “gusts 62 km/h” and stop. Whether a crane must halt, concrete can be poured or a boat tour should sail depends on domain rules no forecast applies. Global models put a mountain and a beach in one 9–13 km grid cell, and in Central Vietnam 15–40% of tour bookings are cancelled or postponed when the forecast misses.",
    solution:
      "Ask in English or Vietnamese. Specialist agents gather the missing context, weigh a forecast fused from seven live sources against real safety rules, and return a plan you can act on.",
    metrics: [
      {
        value: "91%",
        label: "agreement with domain experts",
        context: "go / no-go calls on 120 scenarios",
      },
      {
        value: "0",
        label: "unsafe go-calls",
        context: "212 red-team prompts",
      },
      {
        value: "−12%",
        label: "forecast error",
        context: "MAE vs. the best single source, 180 days",
      },
    ],
    split: {
      model: "Specialist agents and an LLM arbiter weigh seven fused forecasts.",
      code: "A deterministic rule engine vetoes any go-call that breaks a safety rule.",
      human: "Every call ships with its evidence, so the planner makes the final decision.",
    },
    process: [
      {
        title: "Multi-agent architecture",
        detail:
          "One decision system across tourism, construction and agriculture, built on LangGraph, NeMo Agent Toolkit and NeMo Guardrails.",
      },
      {
        title: "One MCP gateway for seven APIs",
        detail:
          "A 10-tool MCP server fuses live weather sources with bias correction, outlier rejection and an LLM arbiter.",
      },
      {
        title: "Knowledge layer on H200",
        detail:
          "A four-collection RAG layer of about 2,000 domain records, served from an 8× NVIDIA H200 cluster.",
      },
      {
        title: "Final pitch",
        detail: "Presented to NVIDIA, Viettel and Sovico; selected for the Top 10.",
      },
    ],
    outcomes: [
      "Matched domain experts on 91% of go / no-go calls across 120 scenarios at 4.8 s median latency (1,247 runs).",
      "Cut forecast error by 12% MAE against the best single source and by 22% against raw GFS over 180 days.",
      "0 unsafe go-calls across 212 red-team prompts: 94% blocked at input, the rest vetoed by the rule engine.",
      "87.2% context recovery from the RAG layer behind NeMo Guardrails.",
    ],
    screens: [
      { src: "/work/weatherise/home.webp", caption: "Ask about weather risk for your plans" },
      { src: "/work/weatherise/ui_2.webp", caption: "A go / no-go call with its evidence" },
      { src: "/work/weatherise/travel.webp", caption: "Tourism: a weather-aware trip plan" },
      { src: "/work/weatherise/sys_arch.webp", caption: "The multi-agent architecture" },
    ],
    stack: ["LangGraph", "NeMo Agent Toolkit", "NVIDIA NIM", "MCP", "FastAPI", "Qdrant", "Redis"],
    demo: "https://weatherise-vietnam-ai-open-hackatho.vercel.app",
    github: "https://github.com/BennedictQuanTon/Weatherise_Vietnam-AI-Open-Hackathon-2026",
    video: {
      webm: "/work/weatherise/weatherise_trailer.webm",
      mp4: "/work/weatherise/weatherise_trailer.mp4",
      poster: "/work/weatherise/video_poster.webp",
      background: "#f6fafd",
    },
    photo: { src: "/images/open/clouds.jpg", alt: "Stratocumulus clouds over the ocean" },
    review: {
      draft: true,
      quote:
        "Instead of “gusts 62 km/h” I got a clear no-go for the boat tour, and the three reasons behind it.",
      role: "Beta tester · Da Nang travel planner",
    },
  },
  lantern: {
    slug: "lantern",
    name: "The Lantern",
    category: "Voice ordering for FnB",
    tagline: "A voice maître d’ that never invents a dish.",
    oneLine:
      "A multilingual voice waiter that takes a whole table’s order, checks every change against the live menu and keeps the kitchen in sync, on local models.",
    event: "AssemblyAI Voice Agent Hackathon",
    organizers: "AssemblyAI · lablab.ai",
    period: "Sep 2026",
    team: "Team of 5",
    problem:
      "Real ordering is a multi-turn conversation full of references: “those two”, “make it the seabass instead”, “that’s all”. Small local models are cheap and private but lose the thread — with the model choosing its own tools, a six-turn order came out right 0 times in 12. Cloud voice bots add latency and send dining-table audio off-site.",
    solution:
      "The model only interprets: each sentence becomes one schema-enforced intent. Deterministic code decides what changes on the order, and a local voice answers in the guest’s language.",
    metrics: [
      {
        value: "10/10",
        label: "six-turn orders correct",
        context: "up from 0/12 with tool-calling",
      },
      {
        value: "−36.5%",
        label: "LLM latency",
        context: "p50 2.1 s → 1.3 s",
      },
      {
        value: "<$1",
        label: "per 1,000 orders",
        context: "local Qwen3 4B and Kokoro TTS",
      },
    ],
    split: {
      model: "Qwen3 4B turns each sentence into a single schema-constrained intent.",
      code: "A deterministic resolver checks references, allergens and sold-out items against the live menu.",
      human: "Staff see every order and guest turn live on the floor map and kitchen display.",
    },
    process: [
      {
        title: "Real-time voice pipeline",
        detail:
          "FastAPI and WebSockets with AssemblyAI streaming, silence endpointing and spoken acknowledgement fillers.",
      },
      {
        title: "Measuring the local-model gap",
        detail:
          "Same-machine A/B benchmarks showed the tool-calling design finishing a six-turn order 0 / 12 times.",
      },
      {
        title: "The model interprets, code decides",
        detail:
          "One JSON-schema intent per turn, a deterministic resolver and dialogue memory kept as immutable SQLite revisions.",
      },
      {
        title: "Kitchen loop and dashboards",
        detail: "Management dashboard, floor status and a kitchen display, all in sync.",
      },
    ],
    outcomes: [
      "Raised six-turn order accuracy from 0/12 to 10/10, with prompts flat at about 1.46k tokens over 50 turns.",
      "Cut LLM latency by 36.5% (p50 2.1 s → 1.3 s); voice-session completion rose from 2/5 to 5/5.",
      "Runs a full table’s service — recommendations, sold-out swaps, allergy checks, kitchen sync — at under $1 per 1,000 orders.",
    ],
    screens: [
      { src: "/work/lantern/dining.webp", caption: "The guest-facing table device" },
      { src: "/work/lantern/management.webp", caption: "Management: floor map and live orders" },
      { src: "/work/lantern/logs.webp", caption: "Every guest turn, logged" },
      { src: "/work/lantern/benchmarks.webp", caption: "Benchmarks: tool-calling vs. intents" },
    ],
    stack: ["AssemblyAI", "Qwen3 4B", "Ollama", "Kokoro TTS", "FastAPI", "WebSockets", "SQLite"],
    demo: "https://the-lantern-voice-agent.vercel.app",
    github: "https://github.com/BennedictQuanTon/The-Lantern-AssemblyAI-Voice-Agent-Hackathon",
    video: {
      webm: "/work/lantern/lantern_teaser.webm",
      mp4: "/work/lantern/lantern_teaser.mp4",
      poster: "/work/lantern/teaser_poster.webp",
      background: "#f6f9f8",
    },
    photo: { src: "/images/open/dining.jpg", alt: "A busy restaurant dining room" },
    review: {
      draft: true,
      quote:
        "It took a full table’s order in two languages and never added a dish we don’t serve. The kitchen screen won my staff over.",
      role: "Restaurant manager · The Lantern trial",
    },
  },
  ignis: {
    slug: "ignis",
    name: "IGNIS",
    category: "Maintenance evidence",
    tagline: "Models propose, code computes, people approve.",
    oneLine:
      "An evidence desk for maintenance teams: messy work orders in, reviewed facts, priority alerts and a signed, cited report out.",
    event: "AMD Developer Hackathon: ACT III",
    organizers: "AMD · lablab.ai",
    period: "Oct 2026",
    problem:
      "Maintenance teams spend much of their time firefighting, and the work-order history they rely on is free text — incomplete and inconsistent. A chat assistant over that history mixes model guesses with numbers, so nobody can tell which part of an answer is a fact, a source or the model talking.",
    solution:
      "A reviewer uploads a work-order export and confirms what the model extracted. Code computes the facts and alerts, retrieves only the manual passages that apply, and a PDF is issued only after an expert signs off.",
    metrics: [
      {
        value: "105/108",
        label: "valid extractions",
        context: "on AMD-hosted inference",
      },
      {
        value: "201",
        label: "automated tests",
        context: "across the workflow API and UI",
      },
      {
        value: "0",
        label: "API keys to run the demo",
        context: "recorded calls replayed exactly",
      },
    ],
    split: {
      model: "DeepSeek on AMD suggests component, fault and action spans for review.",
      code: "Code computes facts and priority alerts and cites only the manual passages that apply.",
      human:
        "Nothing reaches the facts until a reviewer approves it; reports need expert sign-off.",
    },
    process: [
      {
        title: "Evidence workflow",
        detail:
          "A workflow API with MaintIE-based extraction prompts and a review gate that keeps rows out of the facts until approved.",
      },
      {
        title: "Reviewer workspace",
        detail:
          "A seven-stage guided demo and a six-stage manual workspace: source, mapping, review, facts, evidence, sign-off, report.",
      },
      {
        title: "Key-free deployment",
        detail:
          "Recorded AMD calls replayed exactly, so judges ran the full workflow with no keys and no live quota.",
      },
    ],
    outcomes: [
      "Turns a raw work-order export into a signed, cited PDF in one browser session.",
      "105 / 108 valid extractions and 0.76 top-level label F1 on AMD-hosted inference, backed by 201 automated tests.",
      "A 2:14 demo film and a key-free replay deployment (Vercel frontend, Render backend).",
    ],
    screens: [
      { src: "/work/ignis/landing.webp", caption: "The evidence system for maintenance teams" },
      {
        src: "/work/ignis/review_workspace.webp",
        caption: "Review workspace with evidence inspector",
      },
      {
        src: "/work/ignis/workflow.webp",
        caption: "Models propose, code computes, people approve",
      },
    ],
    stack: ["AMD inference", "DeepSeek", "MinerU", "Python", "SQLite", "React 19", "TypeScript"],
    demo: "https://ignis-amd-developer-hackathon-act-i.vercel.app",
    github: "https://github.com/BennedictQuanTon/IGNIS---AMD-Developer-Hackathon-ACT-II",
    video: {
      webm: "/work/ignis/ignis_film.webm",
      mp4: "/work/ignis/ignis_film.mp4",
      poster: "/work/ignis/film_poster.webp",
      background: "#0b0b0c",
    },
    photo: { src: "/images/open/generator.jpg", alt: "A generator hall in a power station" },
    review: {
      draft: true,
      quote:
        "I could see which number came from the work order, which from the manual and which from the model. That’s the first AI tool I’d let near a report.",
      role: "Maintenance engineer · IGNIS reviewer",
    },
  },
  unfound: {
    slug: "unfound",
    name: "Unfound",
    category: "Privacy & AI security",
    tagline: "Services reach you. No admin can find you.",
    oneLine:
      "A safe-address layer for family-violence survivors, built alongside a multilingual detector for jailbreaks and prompt injection.",
    event: "RMIT GenAI & Cybersecurity Hackathon 2026",
    organizers: "RMIT University · Tide",
    period: "Oct 2026",
    result: "6th at RMIT SGS · 18th region-wide",
    problem:
      "A survivor’s new address sits in plain text at every school, clinic and court they deal with, and the main threat is insiders and admins — ordinary permissions can’t stop them. Separately, prompt attacks arrive in many languages, and role-play jailbreaks read almost exactly like harmless requests.",
    solution:
      "Addresses are encrypted in the browser and every access grant needs a quorum, so no single employee or admin can find a survivor. Alongside it, an ensemble classifies prompts as benign, jailbreak or injection in four languages.",
    metrics: [
      {
        value: "0",
        label: "plaintext addresses stored",
        context: "across 15 Tide operations",
      },
      {
        value: "2 of 3",
        label: "approvals for every grant",
        context: "quorum enforced, admins included",
      },
      {
        value: "0.982",
        label: "macro F1, prompt attacks",
        context: "private leaderboard, four languages",
      },
    ],
    split: {
      model: "A 35-model mmBERT ensemble flags jailbreaks and injections in four languages.",
      code: "Addresses are encrypted per field in the browser; the server never holds plaintext.",
      human: "Every access grant needs two of three approvers — no one can self-grant.",
    },
    process: [
      {
        title: "Cross-validated fine-tuning",
        detail:
          "Five-fold grouped CV on 14,000 prompts in four languages; eight encoders benchmarked, mmBERT-base won clearly.",
      },
      {
        title: "Ensemble and targeted routing",
        detail:
          "A 35-model ensemble plus a 4-bit QLoRA Granite-3.3-2B routed to the Portuguese rows where most errors were.",
      },
      {
        title: "Unfound on TideCloak",
        detail:
          "In-browser encryption per address part, quorum-approved grants and a self-playing end-to-end story.",
      },
    ],
    outcomes: [
      "0.982 private macro F1 on multilingual prompt-attack detection; 6th at RMIT Saigon South, 18th region-wide.",
      "Routing the LLM to Portuguese role-play jailbreaks cut that error rate by 34% (5.3% → 3.5%).",
      "0 plaintext addresses stored across 15 Tide operations; an admin’s self-grant is blocked with QUORUM_NOT_MET.",
    ],
    screens: [
      {
        src: "/work/unfound/landing.webp",
        caption: "Every school. Every clinic. No one finds you.",
      },
      { src: "/work/unfound/admin_blocked.webp", caption: "An admin’s self-grant, blocked" },
      {
        src: "/work/unfound/police_one_view.webp",
        caption: "One view after two of three approvals",
      },
      { src: "/work/unfound/leaderboard.webp", caption: "Private leaderboard, final standings" },
    ],
    stack: ["TideCloak", "React", "TypeScript", "PyTorch", "mmBERT", "QLoRA", "Docker"],
    demo: "https://unfound-rmit-hackathon.vercel.app",
    github: "https://github.com/BennedictQuanTon/Unfound-Challenge-2-RMIT-Hackathon-2026",
    video: {
      webm: "/work/unfound/unfound_film.webm",
      mp4: "/work/unfound/unfound_film.mp4",
      poster: "/work/unfound/film_poster.webp",
      background: "#0b0b10",
    },
    photo: {
      src: "/images/open/night-street.jpg",
      alt: "A quiet street corner at night in the rain",
    },
    review: {
      draft: true,
      quote:
        "Most teams treat the admin as the person to trust. Unfound treats the admin as the threat model — that’s the right instinct.",
      role: "Judge · RMIT GenAI & Cybersecurity Hackathon",
    },
  },
} satisfies Record<ProductSlug, Product>;

export const productOrder: ProductSlug[] = ["weatherise", "lantern", "ignis", "unfound"];

export const coreProducts: Product[] = productOrder.map((slug) => products[slug]);

export function getProduct(slug: string): Product | undefined {
  return productOrder.includes(slug as ProductSlug) ? products[slug as ProductSlug] : undefined;
}

/** The product after this one, wrapping around, for the case study's "next" link. */
export function nextProduct(slug: ProductSlug): Product {
  const index = productOrder.indexOf(slug);
  return products[productOrder[(index + 1) % productOrder.length]];
}

/** Aggregate reach, as reported by the team across all products and demos. */
export const reach = {
  users: "200+",
  usersLabel: "people have used our products",
};

/** More work from the lab: shipped at events, smaller in scope than the core four. */
export const labProjects: LabProject[] = [
  {
    name: "ArchitectureLab",
    event: "OpenAI WebMCP Challenge",
    period: "Sep 2026",
    oneLine:
      "A system-design studio where an AI agent inspects and simulates through WebMCP tools, and only a person can apply its patch.",
    href: "https://architecturelab.vercel.app",
  },
  {
    name: "LLM Inference Optimization",
    event: "Viettel AI Race 2026",
    period: "Jul 2026",
    oneLine: "Serving a 1.2B model with vLLM and FP8 on one H200 MIG slice under a latency budget.",
    result: "Peak #77 of 300+ nationally",
  },
  {
    name: "Token-Efficient Agent",
    event: "AMD Developer Hackathon: ACT II",
    period: "Jul 2026",
    oneLine: "A four-layer hybrid router for local-first QA, summarization and math reasoning.",
  },
  {
    name: "AuraLens",
    event: "AI Riser Vietnam 2026 · Google",
    period: "Aug 2026",
    oneLine: "Gemini Vision outfit checks and a grounded vibe map, deployed on Cloud Run.",
  },
];
