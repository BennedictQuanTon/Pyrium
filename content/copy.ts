import type { SourceId, Stat } from "./types";

/**
 * Page copy. Wording follows the proposal's messaging hierarchy (§10) and its claims policy:
 * no "100% private", no fixed savings percentages, no universal performance claims.
 */

export const hero = {
  label: "Private AI systems engineering",
  title: "Private AI. Built to act.",
  subtitle:
    "Agentic systems engineered for real workflows — with privacy and inference efficiency built in.",
  primaryCta: "Talk to our team",
  secondaryCta: "Explore solutions",
  emailPlaceholder: "Work email",
  trustLabel: "Events we've built at",
};

export const nav = [
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#projects", label: "Projects" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

/** Figures re-checked against each publisher's page on 2026-10-20. */
export const problemStats: Stat[] = [
  {
    value: "88%",
    label: "of surveyed organizations used AI in 2025",
    source: "stanford-ai-index-2026",
  },
  {
    value: "Single digits",
    label: "AI-agent deployment across nearly all business functions",
    source: "stanford-ai-index-2026",
  },
  {
    value: "1 in 5",
    label: "companies has a mature governance model for autonomous AI agents",
    source: "deloitte-state-of-ai-2026",
  },
];

export const problem = {
  label: "The problem",
  title: "AI adoption is broad. Value in production is not.",
  body: "Most organizations already use AI somewhere, yet agents that do real work are rare and their oversight lags behind. The hard part is no longer access to models — it's reliable workflows, governance, and cost that a business can justify.",
  chart: {
    title: "Worldwide AI spending, US$ trillions",
    source: "gartner-spend-2026-09" as SourceId,
    note: "2026 is Gartner's published forecast (US$2.7T, +49.5%). 2025 and 2027 are calculated from the growth rates in the same release (+49.5% in 2026, +36.2% in 2027). Global spending is context, not Pyrium's market.",
    bars: [
      { year: "2025", value: 1.81, derived: true },
      { year: "2026", value: 2.7, derived: false },
      { year: "2027", value: 3.68, derived: true },
    ],
  },
};

export const solution = {
  label: "What Pyrium does",
  title: "We engineer private, efficient AI systems that act on real workflows.",
  body: "Pyrium designs, integrates and operates agentic workflows that solve a defined business problem under explicit data, permission, quality and cost constraints. We start with one measurable workflow, prove it, then run it.",
  principles: [
    {
      title: "Privacy by design",
      body: "Your data. Your models. Your infrastructure. Your control.",
    },
    {
      title: "Controlled execution",
      body: "Agentic systems that reason, plan and act safely in your environment.",
    },
    {
      title: "Efficient inference",
      body: "Model routing, caching, fine-tuning and optimization to reduce cost and increase impact.",
    },
    {
      title: "Domain intelligence",
      body: "Deep-domain AI for economics, finance, FnB and real business operations.",
    },
  ],
  layers: [
    { name: "Workflow & domain", detail: "SOPs, policies, business rules, evaluation cases" },
    { name: "Agent execution", detail: "Orchestration, tool calls, validations, human handoffs" },
    { name: "Knowledge & data", detail: "Approved connectors, access-aware retrieval, provenance" },
    { name: "Model & inference", detail: "Routing, context controls, caching, fallbacks" },
    { name: "Security & governance", detail: "Least privilege, secrets, audit logs, retention" },
    { name: "Observability & economics", detail: "Task success, intervention rate, cost per task" },
  ],
  audience: {
    title: "Who it's for",
    body: "Mid-market organizations in Vietnam and Southeast Asia with a recurring, measurable workflow and a named owner — starting with multi-location FnB operators, finance and back-office operations.",
    buyers: ["COO", "CFO", "Head of Operations", "CIO / CTO"],
  },
  /** What we measure on every engagement. Values come from real pilots, never estimates. */
  metrics: [
    { name: "Successful task rate", detail: "Share of cases completed to acceptance criteria" },
    { name: "Cost per successful task", detail: "Inference, infrastructure and review cost" },
    { name: "Human intervention rate", detail: "Cases needing manual correction or escalation" },
    { name: "Cycle time", detail: "P50 / P95 latency and end-to-end time saved" },
  ],
};

export const projectsSection = {
  label: "Our work",
  title: "Built together, in public, under deadline.",
  body: "Every project below was built by the three of us at a hackathon. Results are stated as they happened.",
};

export const testimonialsSection = {
  label: "Testimonials",
  title: "What people say about working with us.",
  placeholderNote: "Placeholder — real quotes will be added once people approve them.",
};

export const contact = {
  label: "Work with us",
  title: "Start with one workflow.",
  body: "Every engagement follows the same path, and each step has a go / no-go gate before the next.",
  steps: [
    {
      name: "Paid discovery",
      detail: "Map systems, workflow steps, failure modes, privacy needs and acceptance metrics.",
    },
    {
      name: "Workflow pilot",
      detail:
        "Prove one workflow in a bounded environment with success thresholds, logging and rollback.",
    },
    {
      name: "Production deployment",
      detail: "Harden identity, monitoring, retries, auditability and support.",
    },
    {
      name: "Managed AI operations",
      detail: "Ongoing monitoring, model updates, cost reviews and regression testing.",
    },
  ],
  formNote: "We reply from a real inbox. The form isn't connected yet.",
};

export const teamSection = {
  label: "Team",
  title: "Three engineers, one way of working.",
  rolePlaceholder: "Role to be confirmed",
  vision: {
    title: "Where we're going",
    body: "Pyrium should own the work between AI capability and business value: complete the right workflow, within the right boundaries, at a cost the customer can justify. We earn product by repetition — the same workflow, controls and outcome, proven across customers — before we build a platform.",
  },
};

export const footer = {
  tagline: "Your data. Your models. Your control.",
  citationsTitle: "Sources",
};
