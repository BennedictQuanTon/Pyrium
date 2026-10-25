import type { SourceId } from "./types";

/**
 * Page copy. Wording follows the strategic proposal's messaging hierarchy (§10) and its claims
 * policy (§13): no "100% private", no fixed savings percentages, no universal performance
 * claims. Product numbers are stated with the test set they were measured on.
 */

export const hero = {
  title: "Private AI, engineered for the real business.",
  subtitle:
    "Pyrium designs and operates private AI systems that act inside your infrastructure — under your permissions, measured on your workflows.",
  trustStat: "200+ people have used our products · 4 live demos · Top 10 nationally",
  primaryCta: "Talk to our team",
  secondaryCta: "See our products",
  navCta: "Book a discovery call",
  trustLabel: "Organizers, platforms & institutions we've built and studied with",
};

export const nav = [
  { href: "/work", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Problem section: figures re-checked against each publisher's page on 2026-10-20. */
export const problem = {
  eyebrow: "The problem",
  title: "AI adoption is broad. Value in production is not.",
  body: "Most organizations already use AI somewhere, yet agents that do real work are rare and oversight lags behind. The hard part is no longer access to models — it's reliable workflows, governance and a cost a business can justify.",
  funnel: {
    title: "From using AI to running agents",
    source: "stanford-ai-index-2026" as SourceId,
    rows: [
      { label: "Used AI in 2025", value: 88, display: "88%" },
      { label: "Used generative AI in a business function", value: 70, display: "70%" },
      { label: "Deployed AI agents, in nearly every function", value: 8, display: "Single digits" },
    ],
    note: "The last bar marks “single digits”, not a measured value.",
  },
  cio: {
    value: 13,
    label:
      "of CIOs say their enterprise has realized significant or transformational value from AI",
    source: "gartner-cio-2026-10" as SourceId,
  },
  governance: {
    label: "companies has mature governance for autonomous AI agents",
    detail: "Survey of 3,235 senior leaders in 24 countries",
    source: "deloitte-state-of-ai-2026" as SourceId,
  },
  gates: {
    title: "Few know when to stop",
    source: "gartner-cio-2026-10" as SourceId,
    rows: [
      { value: 31, label: "of CIOs have guidelines for stopping pilots before production" },
      { value: 17, label: "have guidelines for abandoning low-value production initiatives" },
    ],
  },
  chart: {
    title: "Worldwide AI spending, US$ trillions",
    source: "gartner-spend-2026-09" as SourceId,
    note: "2026 is Gartner's published forecast (US$2.7T, +49.5%). 2025 and 2027 are calculated from the growth rates in the same release. Global spending is context, not Pyrium's market.",
    bars: [
      { year: "2025", value: 1.81, derived: true },
      { year: "2026", value: 2.7, derived: false },
      { year: "2027", value: 3.68, derived: true },
    ],
  },
  closer:
    "The gap isn't adoption. It's what happens after the demo — and that's where Pyrium works.",
};

/** The one method that runs through every product. */
export const approach = {
  eyebrow: "How we build",
  title: "The model proposes. Code decides. People approve.",
  body: "Every Pyrium system splits the work the same way, so the part that can be wrong is never the part that acts alone.",
  steps: [
    {
      key: "model",
      name: "Model proposes",
      detail: "Language models interpret, extract and draft — the parts that need judgment.",
    },
    {
      key: "code",
      name: "Code decides",
      detail: "Deterministic rules validate every change, compute every number and enforce limits.",
    },
    {
      key: "human",
      name: "People approve",
      detail: "Actions that touch money, customers or records wait for a named person to sign off.",
    },
  ] as const,
};

export const productsSection = {
  eyebrow: "Products",
  title: "Built under deadline. Measured like production.",
  body: "Four products the founders designed, built and shipped — each with a live demo and numbers measured on a stated test set.",
  stats: [
    { value: "200+", label: "people have used our products" },
    { value: "4", label: "core products with live demos" },
    { value: "Top 10", label: "Vietnam AI Open Hackathon" },
    { value: "0.982", label: "macro F1, multilingual prompt attacks" },
  ],
  moreTitle: "And more from the lab",
};

export const testimonialsSection = {
  eyebrow: "Testimonials",
  title: "What people say after using what we built.",
  draftNote: "Draft quotes — wording is pending approval from the people in each role.",
};

/** Offer families from the proposal's portfolio architecture (§06). */
export const services = {
  eyebrow: "Services",
  title: "One workflow at a time, engineered end to end.",
  body: "Pyrium designs, integrates and operates agentic workflows that solve a defined business problem under explicit data, permission, quality and cost constraints.",
  offers: [
    {
      name: "Pyrium Agents",
      role: "Core implementation",
      detail:
        "Agentic workflows, orchestration, tool calls and automation — with validations and human handoffs.",
      proof: "lantern" as const,
    },
    {
      name: "Pyrium Inference",
      role: "Efficiency",
      detail:
        "Model routing, caching, model selection, evaluation and fine-tuning to lower cost per successful task.",
      proof: "weatherise" as const,
    },
    {
      name: "Pyrium Private",
      role: "Trust & readiness",
      detail: "Private deployment, data-access design, auditability and operational controls.",
      proof: "unfound" as const,
    },
    {
      name: "Pyrium Domain",
      role: "Repeatable IP",
      detail:
        "Reusable modules for FnB, finance and business operations, built from repeated delivery.",
      proof: "ignis" as const,
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
  controls: [
    {
      area: "Data boundary",
      evidence: "Data-flow diagram, source inventory, retention and deletion policy",
    },
    {
      area: "Identity & permissions",
      evidence: "Least-privilege identities, scoped connectors, secret rotation",
    },
    {
      area: "Agent action policy",
      evidence: "Allow-listed tools, thresholds, approval and escalation rules",
    },
    {
      area: "Quality & safety",
      evidence: "Evaluation sets, groundedness and prompt-injection tests",
    },
    { area: "Observability", evidence: "Trace IDs, tool and action logs, operator interventions" },
    {
      area: "Incident response",
      evidence: "Stop switch, credential revocation, rollback, named owner",
    },
  ],
  metrics: [
    { name: "Successful task rate", detail: "Share of cases completed to acceptance criteria" },
    { name: "Cost per successful task", detail: "Inference, infrastructure and review cost" },
    { name: "Human intervention rate", detail: "Cases needing manual correction or escalation" },
    { name: "Cycle time", detail: "P50 / P95 latency and end-to-end time saved" },
  ],
  audience: {
    title: "Who it's for",
    body: "Mid-market organizations in Vietnam and Southeast Asia with 10–100 locations or repeated back-office workflows, a structured data source and a named owner.",
    buyers: ["COO", "CFO", "Head of Operations", "CIO / CTO"],
  },
  useCases: [
    { name: "Supplier invoice & PO exception triage", fit: "Pilot candidate" },
    { name: "Daily operations report with narrative", fit: "Early pilot" },
    { name: "Internal SOP & policy assistant", fit: "Pairs with a workflow" },
    { name: "Inventory & replenishment exceptions", fit: "Phase 2" },
  ],
  promises: [
    "We publish architecture-specific facts, not “100% private”.",
    "We state savings for a named workflow and test set, never as a blanket percentage.",
    "We automate with approval checkpoints, not open-ended autonomy.",
  ],
};

export const engagement = {
  eyebrow: "Working together",
  title: "Start with one workflow.",
  body: "Every engagement follows the same path, and each step has a go / no-go gate before the next.",
  steps: [
    {
      name: "Paid discovery",
      time: "Fixed fee",
      detail: "Map systems, workflow steps, failure modes, privacy needs and acceptance metrics.",
    },
    {
      name: "Workflow pilot",
      time: "6–8 weeks",
      detail:
        "Prove one workflow in a bounded environment with success thresholds, logging and rollback.",
    },
    {
      name: "Production",
      time: "Milestones",
      detail: "Harden identity, monitoring, retries, auditability and support.",
    },
    {
      name: "Managed operations",
      time: "Monthly",
      detail: "Ongoing monitoring, model updates, cost reviews and regression testing.",
    },
  ],
  packages: [
    {
      name: "Discovery sprint",
      detail: "Data and workflow assessment, ROI hypothesis and a pilot plan.",
      includes: ["Workflow map", "Data & security checklist", "Acceptance metrics"],
    },
    {
      name: "Workflow pilot",
      detail: "One bounded workflow with acceptance criteria agreed upfront.",
      includes: ["Evaluation set", "Baseline vs. pilot report", "Production decision"],
      featured: true,
    },
    {
      name: "Production & operations",
      detail: "Deployment hardening, then managed AI operations.",
      includes: ["Monitoring & audit logs", "Cost reviews", "Regression testing"],
    },
  ],
};

export const contact = {
  eyebrow: "Contact",
  title: "Tell us about one workflow.",
  body: "A recurring task, the system it lives in and who owns it is enough to start.",
  formNote: "The form isn't connected yet — it won't send.",
  proceed: [
    "A named buyer owns the workflow and its success metric.",
    "Data access and permissions are approved.",
    "Acceptance criteria are testable before deployment.",
    "A production decision is planned before the pilot starts.",
  ],
  pause: [
    "No owner or no agreed baseline.",
    "Data provenance or permitted use is unclear.",
    "Value depends on open-ended agent autonomy.",
  ],
  faq: [
    {
      q: "Do you only work with self-hosted models?",
      a: "No. We are provider-neutral: hosted or self-hosted is chosen per workflow from data constraints, quality, latency and cost.",
    },
    {
      q: "How long until we see something working?",
      a: "A bounded pilot runs six to eight weeks, with acceptance criteria agreed before it starts.",
    },
    {
      q: "What happens if the pilot misses its criteria?",
      a: "We stop or redesign it. Decision gates are part of every engagement, not an afterthought.",
    },
  ],
};

export const teamSection = {
  eyebrow: "Founders",
  title: "Three engineers, one way of working.",
  vision: {
    title: "Where we're going",
    body: "Pyrium should own the work between AI capability and business value: complete the right workflow, within the right boundaries, at a cost the customer can justify. We earn product by repetition — the same workflow, controls and outcome, proven across customers — before we build a platform.",
  },
};

export const about = {
  eyebrow: "About",
  title: "Controlled intelligence, in action.",
  body: "Pyrium is a private AI systems engineering company from Vietnam. We started as three founders building together under hackathon deadlines; we're building a company that brings the same discipline to real operations.",
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
      body: "Routing, caching, fine-tuning and optimization to cut cost and raise impact.",
    },
    {
      title: "Domain intelligence",
      body: "Deep-domain AI for economics, finance, FnB and real business operations.",
    },
  ],
  roadmap: [
    {
      phase: "Customer discovery",
      time: "Weeks 1–4",
      gate: "Three qualified buyers confirm an urgent workflow and an owner.",
    },
    {
      phase: "Paid pilots",
      time: "Months 2–4",
      gate: "At least two pilots meet pre-agreed acceptance criteria.",
    },
    {
      phase: "Production hardening",
      time: "Months 4–7",
      gate: "One deployment runs real workload with acceptable economics.",
    },
    {
      phase: "Repeatable delivery",
      time: "Months 7–10",
      gate: "Delivery hours per deployment fall without losing quality.",
    },
    {
      phase: "Productization decision",
      time: "Months 10–12",
      gate: "Repeated demand across at least three customers.",
    },
  ],
};

export const closing = {
  title: "Your data. Your models. Your control.",
  body: "That's the whole pitch. The rest is measured, workflow by workflow.",
};

export const footer = {
  tagline: "Private AI, engineered for the real business.",
  citationsTitle: "Sources",
};
