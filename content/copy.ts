import type { Lang } from "@/lib/i18n";
import type { SourceId } from "./types";

/**
 * Page copy in English and Vietnamese. Wording follows the strategic proposal's messaging
 * hierarchy (§10). Product and company names stay in English in both languages. Figures marked
 * "est." are team estimates, explained in the note beside them.
 */

const en = {
  meta: {
    title: "Pyrium — Private AI, engineered for the real business.",
    description:
      "We engineer private, efficient AI systems that automate real workflows, optimize inference, and adapt to how your business operates.",
  },
  hero: {
    title: "Private AI, engineered for the real business.",
    subtitle:
      "Pyrium designs and operates private AI systems that act inside your infrastructure — under your permissions, measured on your workflows.",
    trustStat: "Built at 11 events with NVIDIA, Viettel, Google and OpenAI · 6 projects shipped",
    primaryCta: "Talk to our team",
    secondaryCta: "Explore solutions",
    navCta: "Book a discovery call",
    trustLabel: "Organizers, platforms & institutions we've built and studied with",
  },
  nav: [
    { href: "/work", label: "Products" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  menu: {
    allProducts: "All products",
    allProductsDesc: "Every product, with the numbers behind it",
    services: [
      { href: "/services", label: "Overview", desc: "What we build, for whom, and how we compare" },
      {
        href: "/services/approach",
        label: "How we work",
        desc: "From discovery to managed operations",
      },
      {
        href: "/services/security",
        label: "Architecture & security",
        desc: "The system layers and the controls we document",
      },
    ],
    about: [
      { href: "/about", label: "Company", desc: "Our numbers, our core in depth, our partners" },
      { href: "/about/team", label: "Team", desc: "Three co-founders and what each one owns" },
      {
        href: "/about/vision",
        label: "Vision & roadmap",
        desc: "Where we're going, phase by phase",
      },
    ],
  },
  intro: { tagline: "Private AI. Built to act.", meter: "Private · Agentic · Cost-efficient" },
  problem: {
    eyebrow: "The problem",
    title: "AI could carry the work operators can't staff. Most can't use it safely — yet.",
    body: "In restaurants, hotels, plants and anywhere sensitive data lives, the pressure is the same: thin margins, too few hands, and data that can't leave the building.",
    industries: [
      {
        name: "Restaurants & FnB",
        photo: "/images/open/chefs.jpg",
        alt: "Chefs at the pass in a restaurant kitchen",
        value: "42%",
        label: "of US restaurant operators were not profitable in 2025",
        source: "nra-2026-07" as SourceId,
      },
      {
        name: "Hotels & hospitality",
        photo: "/images/open/hotel.jpg",
        alt: "An empty hotel reception desk",
        value: "1 in 2",
        label: "US hotels say they are understaffed",
        source: "ahla-2026-03" as SourceId,
      },
      {
        name: "Plants & operations",
        photo: "/images/open/generator.jpg",
        alt: "A generator hall in a power station",
        value: "$1.4T",
        label: "lost each year to unplanned downtime by the 500 largest companies — 11% of revenue",
        source: "siemens-2024" as SourceId,
      },
      {
        name: "Clinics, finance & sensitive data",
        photo: "/images/solution-racks.jpg",
        alt: "Server racks in a data centre",
        value: "$4.99M",
        label: "average cost of a data breach — a record high",
        source: "ibm-2026" as SourceId,
      },
    ],
    adoption: {
      title: "AI is arriving fast",
      caption: "of US restaurant operators now use or pilot AI in the back office",
      from: { value: 25, label: "Start of 2026" },
      to: { value: 69, label: "Mid-2026" },
      source: "r365-2026" as SourceId,
    },
    barriers: {
      title: "…but three things hold the rest back",
      answerLabel: "Our answer",
      rows: [
        { value: 37, label: "Data privacy and security", answer: "Private AI" },
        { value: 34, label: "Accuracy of AI output", answer: "Agentic AI with checks" },
        { value: 29, label: "Implementation cost", answer: "Cost-efficient by design" },
      ],
      source: "r365-2026" as SourceId,
    },
    facts: [
      {
        value: "27%",
        label: "of organizations had banned GenAI over data risk",
        source: "cisco-2024" as SourceId,
      },
      {
        value: "40%+",
        label: "of agentic AI projects will be canceled by 2027",
        source: "gartner-agentic-2025-06" as SourceId,
      },
      {
        value: "280×",
        label: "cheaper to run GPT-3.5-level AI than in 2022",
        source: "stanford-ai-index-2025" as SourceId,
      },
    ],
    sourcesNote: "Sources and the date each figure was checked are listed in the footer.",
  },
  core: {
    eyebrow: "Our core",
    title: "Agentic. Private. Cost-efficient. Domain-deep. Fast to integrate.",
    body: "Five commitments define every system we build — and each one answers a reason operators hold back from AI today.",
    shiftLabel: "The shift",
    pillars: [
      {
        key: "agentic",
        name: "Agentic AI",
        promise: "AI that completes the work, not just the conversation.",
        from: "Chatbots that answer questions",
        to: "Agents that finish multi-step workflows",
        capabilities: [
          "Plans and acts across your existing systems",
          "Deterministic checks before anything changes",
          "Human approval wherever money or customers are involved",
        ],
        fact: {
          value: "40%+",
          label: "of agentic AI projects will be canceled by 2027 — control is the difference",
          source: "gartner-agentic-2025-06" as SourceId,
        },
      },
      {
        key: "private",
        name: "Private AI",
        promise: "Your data. Your models. Your infrastructure. Your control.",
        from: "Sending data out to the model",
        to: "Bringing the model in to your data",
        capabilities: [
          "Self-hosted or private-cloud deployment",
          "Least-privilege access to approved sources only",
          "A full audit trail of every action",
        ],
        fact: {
          value: "1 Jan 2026",
          label: "Vietnam's Personal Data Protection Law took effect",
          source: "vn-pdp-law-2025" as SourceId,
        },
      },
      {
        key: "efficient",
        name: "Cost-efficient",
        promise: "Built for the real business, at a cost it can justify.",
        from: "Paying for the biggest model on every task",
        to: "Paying per successful task",
        capabilities: [
          "Small, fine-tuned models where they are enough",
          "Routing and caching so large models run only when needed",
          "Cost and quality measured before and after",
        ],
        fact: {
          value: "280×",
          label: "cheaper to run GPT-3.5-level AI than two years earlier",
          source: "stanford-ai-index-2025" as SourceId,
        },
      },
      {
        key: "domain",
        name: "Deep Domain",
        promise: "Built around how your business actually runs.",
        from: "One generic assistant for every company",
        to: "A system shaped by your SOPs, data and rules",
        capabilities: [
          "Discovery of your workflows, SOPs and exceptions",
          "Bespoke design, evaluation sets and tuning for your domain",
          "Support packages: monitoring, updates and a named team",
        ],
        fact: {
          value: "69%",
          label: "of US restaurant operators now use or pilot AI in the back office",
          source: "r365-2026" as SourceId,
        },
      },
      {
        key: "integration",
        name: "Fast Integration",
        promise: "Live in weeks, not quarters — without cutting corners.",
        from: "Six-month integration projects",
        to: "A measured pilot in 6–8 weeks",
        capabilities: [
          "Connectors for the POS, ERP, chat and document tools you already use",
          "Reusable evaluators, guardrails and deployment templates",
          "Staged rollout with a rollback at every step",
        ],
        fact: {
          value: "6–8 wks",
          label: "from discovery to a measured pilot, with acceptance criteria agreed up front",
        },
      },
    ],
    meet: {
      title: "Where all five meet",
      body: "AI that does real work, inside your boundary, built around your operation, live in weeks, at a cost per task you can defend.",
      labels: ["Agentic", "Private", "Efficient", "Domain", "Fast"],
    },
    compare: {
      eyebrow: "How we compare",
      title: "What you get with Pyrium that you don't get elsewhere.",
      body: "Categories, not named vendors. Ratings are our assessment of what each category typically offers today.",
      columns: [
        "Pyrium",
        "AI chat assistants",
        "Automation platforms",
        "Large integrators",
        "Freelancers & in-house",
      ],
      legend: { full: "Yes", partial: "Partly", none: "No" },
      rows: [
        {
          label: "Fast integration with the tools you already use",
          values: ["full", "partial", "full", "none", "partial"],
        },
        {
          label: "Agentic workflows that finish the task",
          values: ["full", "partial", "partial", "full", "partial"],
        },
        {
          label: "Private deployment on your own infrastructure",
          values: ["full", "partial", "partial", "full", "partial"],
        },
        {
          label: "Cost per task optimized (routing, small models)",
          values: ["full", "none", "partial", "partial", "none"],
        },
        {
          label: "Deep domain knowledge: FnB, operations, finance",
          values: ["full", "none", "none", "partial", "partial"],
        },
        {
          label: "Bespoke design and tuning for your workflow",
          values: ["full", "none", "partial", "full", "full"],
        },
        {
          label: "Support packages and managed operations",
          values: ["full", "partial", "partial", "full", "none"],
        },
        {
          label: "Mid-market price and a 6–8 week pilot",
          values: ["full", "full", "full", "none", "partial"],
        },
      ],
      sourcesLabel: "Category references",
      sources: [
        "openai-enterprise",
        "n8n-hosting",
        "copilot-studio",
        "litellm-routing",
      ] as SourceId[],
    },
  },
  productsSection: {
    eyebrow: "Products",
    title: "Built for real operations. Tested by real people.",
    body: "Our products, grouped by the industry they serve. Each shows who it's for, what it fixes, and what changed for the people who tested it.",
    stats: [
      { value: "200+", label: "people have tested our products" },
      { value: "~80%", label: "lower AI running cost than cloud-only pipelines", note: 1 },
      { value: "10+", label: "hackathon awards and recognitions across the founding team" },
    ],
    notes: [
      "Team estimate from our benchmark runs: local and routed models vs. an equivalent cloud-API pipeline on the same tasks.",
      "Product tester counts and savings are pilot figures reported by the team; savings are estimates, to be confirmed against each customer's own baseline.",
    ],
    updated: "Last updated 26 Oct 2026",
    allProducts: "All products",
    industriesEyebrow: "By industry",
    industriesTitle: "Find the products built for your operation.",
    productCount: ["product", "products"],
    groups: {
      fnb: {
        name: "FnB & Hospitality",
        body: "Restaurants, cafés, tours and venues — faster service, fewer errors, fewer lost bookings.",
      },
      operations: {
        name: "Industrial operations",
        body: "Plants, central kitchens and factories — evidence a manager can sign.",
      },
      trust: { name: "Trust & privacy", body: "Sensitive data that insiders should never see." },
      infrastructure: {
        name: "Cost & infrastructure",
        body: "Running LLMs for less, on the hardware you already have.",
      },
    },
  },
  showcase: {
    builtFor: "Built for",
    solves: "Solves",
    recognition: "Recognition",
    testers: "Tested by",
    saving: "Expected saving",
    core: "Core result",
    pilot: "From the pilot",
    readCase: "Read the case study",
    tryLive: "View demo",
    anonymous: "Anonymous",
    est: "est.",
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "What people say after using what we built.",
  },
  services: {
    pages: {
      approach: {
        eyebrow: "How we work",
        title: "One workflow, one path, your call at every step.",
        body: "How an engagement runs from the first call to managed operations, and the promises we won't make along the way.",
      },
      security: {
        eyebrow: "Architecture & security",
        title: "Six layers, every control documented.",
        body: "What a Pyrium system is made of, and the evidence every deployment leaves behind.",
      },
    },
    eyebrow: "Services",
    title: "One workflow at a time, engineered end to end.",
    body: "Pyrium designs, integrates and operates agentic workflows that solve a defined business problem under explicit data, permission, quality and cost constraints.",
    offersEyebrow: "Offer families",
    offersTitle: "Four ways in, one delivery discipline.",
    shownIn: "Shown in",
    offers: [
      {
        name: "Pyrium Agents",
        core: "agentic",
        role: "Core implementation",
        detail:
          "Agentic workflows, orchestration, tool calls and automation — with validations and human handoffs.",
        proof: "lantern" as const,
      },
      {
        name: "Pyrium Inference",
        core: "efficient",
        role: "Efficiency",
        detail:
          "Model routing, caching, model selection, evaluation and fine-tuning to lower cost per successful task.",
        proof: "inference" as const,
      },
      {
        name: "Pyrium Private",
        core: "private",
        role: "Trust & readiness",
        detail: "Private deployment, data-access design, auditability and operational controls.",
        proof: "unfound" as const,
      },
      {
        name: "Pyrium Domain",
        core: "domain",
        role: "Repeatable IP",
        detail:
          "Reusable modules for FnB, finance and business operations, built from repeated delivery.",
        proof: "ignis" as const,
      },
    ],
    archEyebrow: "Architecture",
    archTitle: "Six layers in every system.",
    archBody:
      "Commodity capabilities are bought or adopted; we build only where workflow knowledge, cross-system execution, privacy, evaluation or cost create a lasting advantage.",
    layers: [
      { name: "Workflow & domain", detail: "SOPs, policies, business rules, evaluation cases" },
      { name: "Agent execution", detail: "Orchestration, tool calls, validations, human handoffs" },
      {
        name: "Knowledge & data",
        detail: "Approved connectors, access-aware retrieval, provenance",
      },
      { name: "Model & inference", detail: "Routing, context controls, caching, fallbacks" },
      { name: "Security & governance", detail: "Least privilege, secrets, audit logs, retention" },
      {
        name: "Observability & economics",
        detail: "Task success, intervention rate, cost per task",
      },
    ],
    controlsEyebrow: "Privacy & governance",
    controlsTitle: "Control you can inspect, not a promise.",
    controlsBody:
      "Every deployment ships with the evidence below, so you can see how data moves, what an agent may do and how it is stopped.",
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
      {
        area: "Observability",
        evidence: "Trace IDs, tool and action logs, operator interventions",
      },
      {
        area: "Incident response",
        evidence: "Stop switch, credential revocation, rollback, named owner",
      },
    ],
    audienceTitle: "Who it's for",
    audienceBody:
      "Mid-market organizations in Vietnam and Southeast Asia with 10–100 locations or repeated back-office workflows, a structured data source and a named owner.",
    buyers: ["COO", "CFO", "Head of Operations", "CIO / CTO"],
    startTitle: "Where we start",
    useCases: [
      { name: "Supplier invoice & PO exception triage", fit: "Pilot candidate" },
      { name: "Daily operations report with narrative", fit: "Early pilot" },
      { name: "Internal SOP & policy assistant", fit: "Pairs with a workflow" },
      { name: "Inventory & replenishment exceptions", fit: "Phase 2" },
    ],
    reportTitle: "What we report",
    metrics: [
      { name: "Successful task rate", detail: "Share of cases completed to acceptance criteria" },
      { name: "Cost per successful task", detail: "Inference, infrastructure and review cost" },
      { name: "Human intervention rate", detail: "Cases needing manual correction or escalation" },
      { name: "Cycle time", detail: "P50 / P95 latency and end-to-end time saved" },
    ],
    promisesEyebrow: "What we won't promise",
    promisesTitle: "Claims we can measure, or none at all.",
    promises: [
      "We publish architecture-specific facts, not “100% private”.",
      "We state savings for a named workflow and test set, never as a blanket guarantee.",
      "We automate with approval checkpoints, not open-ended autonomy.",
    ],
  },
  engagement: {
    eyebrow: "Working together",
    title: "Start with one workflow.",
    body: "One path from first call to running in production. You decide at every step whether to go on.",
    stepLabel: "Step",
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
        name: "Production",
        detail: "Harden identity, monitoring, retries, auditability and support.",
      },
      {
        name: "Managed operations",
        detail: "Ongoing monitoring, model updates, cost reviews and regression testing.",
      },
    ],
    featured: "Most teams start here",
    discuss: "Discuss scope",
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
  },
  contact: {
    eyebrow: "Contact",
    title: "Tell us about one workflow.",
    body: "A recurring task, the system it lives in and who owns it is enough to start.",
    fields: {
      name: "Name",
      email: "Work email",
      company: "Company and role",
      start: "Where would you start?",
      workflow: "The workflow you'd like to fix",
      workflowHint: "What happens today, which systems it touches, and who owns it.",
      send: "Send",
    },
    formNote: "The form isn't connected yet — it won't send.",
    proceedTitle: "We'll go ahead when…",
    pauseTitle: "…and pause when",
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
    faqEyebrow: "FAQ",
    faqTitle: "Before you write.",
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
  },
  team: {
    eyebrow: "Founders",
    title: "Three engineers, one way of working.",
    cofounder: "Co-founder",
    about: "About Pyrium",
    links: { linkedin: "LinkedIn", email: "Email", portfolio: "Portfolio", soon: "Coming soon" },
    vision: {
      title: "Where we're going",
      statement: "Own the work between AI capability and business value.",
      body: "Complete the right workflow, within the right boundaries, at a cost the customer can justify. We earn product by repetition — the same workflow, controls and outcome, proven across customers — before we build a platform.",
      horizons: [
        {
          when: "Now",
          title: "Prove it in pilots",
          detail:
            "Paid discovery and 6–8 week pilots with FnB and operations teams, measured against an agreed baseline.",
        },
        {
          when: "12 months",
          title: "Repeatable delivery",
          detail:
            "Reusable connectors, evaluators and guardrails, so each deployment ships faster without losing quality.",
        },
        {
          when: "Beyond",
          title: "A private operations copilot",
          detail:
            "A product earned by repetition: the same workflow, controls and outcome, proven across customers.",
        },
      ],
    },
  },
  about: {
    pages: {
      team: {
        eyebrow: "Team",
        title: "Three engineers, one way of working.",
        body: "Who builds Pyrium, what each of us owns, and what we've shipped together.",
        about: "About",
        strengths: "Strengths",
        awards: "Awards",
        experience: "Experience",
        pending: "Profile to be updated.",
        experiencePending: "To be updated.",
        recognisedBy: "Recognised by",
      },
      vision: {
        eyebrow: "Vision",
        title: "Where we're going, and how we'll know.",
        body: "The work we want to own, and the twelve-month path with a gate at every phase.",
      },
    },
    eyebrow: "About",
    title: "Controlled intelligence, in action.",
    body: "Pyrium is a private AI systems engineering company from Vietnam. We started as three founders building together under hackathon deadlines; we're building a company that brings the same discipline to real operations.",
    line: ["Private AI.", "Built to act."],
    numbersEyebrow: "Pyrium in numbers",
    numbersTitle: "Proof we can point to.",
    numbers: [
      { value: "200+", label: "people have tested our products" },
      { value: "10+", label: "hackathon awards and recognitions" },
      { value: "5", label: "products shipped with working demos" },
      { value: "11", label: "events built at with NVIDIA, Viettel, Google, OpenAI and AMD" },
    ],
    numbersNote:
      "Product figures come from each project's measured results; tester counts are team-reported.",
    builtEyebrow: "Built with",
    builtTitle: "Five products, each built in the room with the people who set the bar.",
    builtBody:
      "Every product began at an event run by the organizers here. Choose one to see who it was built with.",
    builtWith: "With",
    depthEyebrow: "Our core, in depth",
    depthTitle: "Five commitments, and what each one means in practice.",
    depth: [
      {
        key: "agentic",
        body: "An agent that only talks is a cost. We build agents that finish defined work — reconcile an invoice, take an order, draft a report — inside the systems you already run. The model interprets and proposes; deterministic code validates every change and computes every number; a named person approves anything that touches money, customers or records.",
        proof: "lantern" as const,
      },
      {
        key: "private",
        body: "Private means a boundary you can inspect, not a promise. We deploy on your infrastructure or a private cloud, connect only to approved sources with least-privilege identities, and keep an audit trail of every tool call and action. You can see where data goes, who can see it, and how the system is stopped.",
        proof: "unfound" as const,
      },
      {
        key: "efficient",
        body: "Most AI spend is the wrong model on the wrong task. We measure cost per successful task before we change anything, then route: small fine-tuned or local models where they are enough, caching where answers repeat, and a large model only when the task needs one.",
        proof: "inference" as const,
      },
      {
        key: "domain",
        body: "Generic assistants fail on the details that make your operation yours. We start from your SOPs, data and exceptions, write evaluation cases from them, and tune the system to pass them — then keep it passing with support packages, monitoring and a named team.",
        proof: "ignis" as const,
      },
      {
        key: "integration",
        body: "Speed comes from reuse, not shortcuts. Connectors, evaluators, guardrails and deployment templates we have already built let a measured pilot go live in six to eight weeks, rolled out in stages with a way back at every step.",
        proof: "weatherise" as const,
      },
    ],
    proofLabel: "Proof",
    principlesEyebrow: "Principles",
    principlesTitle: "Four things we hold every system to.",
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
    roadmapEyebrow: "The next twelve months",
    roadmapTitle: "From proof to repeatability.",
    roadmapBody: "Each phase has a gate. If the evidence isn't there, we don't move on.",
    gate: "Gate",
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
  },
  caseStudy: {
    tabs: { overview: "Overview", build: "How it's built" },
    allProducts: "All products",
    event: "Event",
    with: "With",
    when: "When",
    team: "Team",
    result: "Result",
    source: "Source on GitHub",
    problem: "The problem",
    built: "What we built",
    split: "How the work is split",
    splitTitle: "The model proposes. Code decides. People approve.",
    steps: { model: "Model proposes", code: "Code decides", human: "People approve" },
    log: "How we built it",
    inside: "Inside the product",
    scroll: "Scroll sideways →",
    outcomes: "Under the hood",
    outcomesNote:
      "Measured at the event on the stated test sets and workloads, not on customer data.",
    next: "Next product",
  },
  closing: {
    title: "Your data. Your models. Your control.",
    body: "That's the whole pitch. The rest is measured, workflow by workflow.",
  },
  footer: {
    tagline: "Private AI, engineered for the real business.",
    sources: "Sources",
    products: "Products",
    company: "Company",
    country: "Vietnam",
    photos:
      "Photography: open-licence images from Wikimedia Commons and StockSnap (CC0, public domain; food court photo © Martin Lewison, CC BY 2.0). Interface sounds: Kenney, CC0.",
  },
  settings: {
    open: "Preferences",
    title: "Preferences",
    language: "Language",
    motion: "Motion",
    motionLevels: { full: "Full", subtle: "Subtle", off: "Off" },
    motionHint: {
      full: "Every transition, as designed.",
      subtle: "Softer, shorter movement.",
      off: "No animation.",
    },
    sound: "Sound",
    music: "Ambient music",
    volume: "Volume",
    sfx: "Interface sounds",
    saved: "Saved on this device.",
    soundPrompt: "Tap anywhere for ambient sound",
  },
  notFound: { title: "This page doesn't exist.", back: "Back to home" },
};

export type Copy = typeof en;

const vi: Copy = {
  meta: {
    title: "Pyrium — AI riêng tư, được thiết kế cho doanh nghiệp thực tế.",
    description:
      "Chúng tôi xây dựng hệ thống AI riêng tư, hiệu quả, tự động hoá quy trình thực tế, tối ưu chi phí suy luận và thích ứng với cách doanh nghiệp vận hành.",
  },
  hero: {
    title: "AI riêng tư, được thiết kế cho doanh nghiệp thực tế.",
    subtitle:
      "Pyrium thiết kế và vận hành hệ thống AI riêng tư hoạt động ngay trong hạ tầng của bạn — theo đúng phân quyền của bạn, đo lường trên chính quy trình của bạn.",
    trustStat: "Xây dựng tại 11 sự kiện cùng NVIDIA, Viettel, Google và OpenAI · 6 dự án đã ra mắt",
    primaryCta: "Trao đổi với đội ngũ",
    secondaryCta: "Khám phá giải pháp",
    navCta: "Đặt lịch tư vấn",
    trustLabel: "Ban tổ chức, nền tảng và trường đại học chúng tôi đã đồng hành",
  },
  nav: [
    { href: "/work", label: "Sản phẩm" },
    { href: "/services", label: "Dịch vụ" },
    { href: "/about", label: "Giới thiệu" },
    { href: "/contact", label: "Liên hệ" },
  ],
  menu: {
    allProducts: "Tất cả sản phẩm",
    allProductsDesc: "Mọi sản phẩm, kèm các con số phía sau",
    services: [
      {
        href: "/services",
        label: "Tổng quan",
        desc: "Chúng tôi xây gì, cho ai, và khác biệt ở đâu",
      },
      {
        href: "/services/approach",
        label: "Cách hợp tác",
        desc: "Từ khảo sát đến vận hành dài hạn",
      },
      {
        href: "/services/security",
        label: "Kiến trúc & bảo mật",
        desc: "Các lớp hệ thống và những kiểm soát được ghi nhận",
      },
    ],
    about: [
      { href: "/about", label: "Công ty", desc: "Con số, giá trị cốt lõi và đối tác" },
      {
        href: "/about/team",
        label: "Đội ngũ",
        desc: "Ba nhà đồng sáng lập và phần việc của mỗi người",
      },
      {
        href: "/about/vision",
        label: "Tầm nhìn & lộ trình",
        desc: "Chúng tôi đi đâu, từng giai đoạn",
      },
    ],
  },
  intro: {
    tagline: "AI riêng tư. Hành động thực tế.",
    meter: "Riêng tư · Tác tử · Tối ưu chi phí",
  },
  problem: {
    eyebrow: "Vấn đề",
    title:
      "AI có thể gánh phần việc thiếu người làm. Nhưng phần lớn doanh nghiệp chưa dùng nó an toàn được.",
    body: "Ở nhà hàng, khách sạn, nhà máy hay bất cứ nơi nào giữ dữ liệu nhạy cảm, áp lực đều giống nhau: biên lợi nhuận mỏng, thiếu nhân lực và dữ liệu không được phép rời khỏi doanh nghiệp.",
    industries: [
      {
        name: "Nhà hàng & FnB",
        photo: "/images/open/chefs.jpg",
        alt: "Đầu bếp ở quầy ra món trong bếp nhà hàng",
        value: "42%",
        label: "chủ nhà hàng tại Mỹ không có lãi trong năm 2025",
        source: "nra-2026-07" as SourceId,
      },
      {
        name: "Khách sạn & lưu trú",
        photo: "/images/open/hotel.jpg",
        alt: "Quầy lễ tân khách sạn không có người",
        value: "1/2",
        label: "khách sạn tại Mỹ cho biết đang thiếu nhân sự",
        source: "ahla-2026-03" as SourceId,
      },
      {
        name: "Nhà máy & vận hành",
        photo: "/images/open/generator.jpg",
        alt: "Gian máy phát điện trong nhà máy điện",
        value: "1.400 tỷ USD",
        label: "mất mỗi năm vì dừng máy ngoài kế hoạch ở 500 công ty lớn nhất — 11% doanh thu",
        source: "siemens-2024" as SourceId,
      },
      {
        name: "Y tế, tài chính & dữ liệu nhạy cảm",
        photo: "/images/solution-racks.jpg",
        alt: "Dãy máy chủ trong trung tâm dữ liệu",
        value: "4,99 triệu USD",
        label: "chi phí trung bình một vụ rò rỉ dữ liệu — cao kỷ lục",
        source: "ibm-2026" as SourceId,
      },
    ],
    adoption: {
      title: "AI đang đến rất nhanh",
      caption: "chủ nhà hàng tại Mỹ đang dùng hoặc thí điểm AI cho back-office",
      from: { value: 25, label: "Đầu 2026" },
      to: { value: 69, label: "Giữa 2026" },
      source: "r365-2026" as SourceId,
    },
    barriers: {
      title: "…nhưng ba điều khiến số còn lại chần chừ",
      answerLabel: "Câu trả lời",
      rows: [
        { value: 37, label: "Quyền riêng tư và bảo mật dữ liệu", answer: "Private AI" },
        { value: 34, label: "Độ chính xác của AI", answer: "Agentic AI có kiểm tra" },
        { value: 29, label: "Chi phí triển khai", answer: "Tối ưu chi phí từ thiết kế" },
      ],
      source: "r365-2026" as SourceId,
    },
    facts: [
      {
        value: "27%",
        label: "tổ chức từng cấm GenAI vì rủi ro dữ liệu",
        source: "cisco-2024" as SourceId,
      },
      {
        value: "40%+",
        label: "dự án agentic AI sẽ bị huỷ trước 2027",
        source: "gartner-agentic-2025-06" as SourceId,
      },
      {
        value: "280×",
        label: "chi phí chạy AI cấp GPT-3.5 rẻ hơn năm 2022",
        source: "stanford-ai-index-2025" as SourceId,
      },
    ],
    sourcesNote: "Nguồn và ngày kiểm tra từng số liệu được liệt kê ở cuối trang.",
  },
  core: {
    eyebrow: "Cốt lõi",
    title: "Tác tử. Riêng tư. Tối ưu chi phí. Am hiểu nghiệp vụ. Tích hợp nhanh.",
    body: "Năm cam kết định hình mọi hệ thống chúng tôi xây dựng — mỗi cam kết giải đúng một lý do khiến doanh nghiệp còn ngần ngại với AI.",
    shiftLabel: "Chuyển dịch",
    pillars: [
      {
        key: "agentic",
        name: "Agentic AI",
        promise: "AI hoàn thành công việc, không chỉ trò chuyện.",
        from: "Chatbot trả lời câu hỏi",
        to: "Tác tử hoàn thành quy trình nhiều bước",
        capabilities: [
          "Lập kế hoạch và hành động trên hệ thống sẵn có",
          "Kiểm tra bằng quy tắc trước khi thay đổi bất cứ điều gì",
          "Con người phê duyệt khi liên quan đến tiền hoặc khách hàng",
        ],
        fact: {
          value: "40%+",
          label: "dự án agentic AI sẽ bị huỷ trước 2027 — khả năng kiểm soát tạo nên khác biệt",
          source: "gartner-agentic-2025-06" as SourceId,
        },
      },
      {
        key: "private",
        name: "Private AI",
        promise: "Dữ liệu, mô hình, hạ tầng và quyền kiểm soát đều thuộc về bạn.",
        from: "Gửi dữ liệu ra ngoài cho mô hình",
        to: "Đưa mô hình vào nơi dữ liệu nằm",
        capabilities: [
          "Triển khai tự vận hành hoặc trên đám mây riêng",
          "Chỉ truy cập nguồn đã duyệt, với quyền tối thiểu",
          "Lưu vết đầy đủ mọi hành động",
        ],
        fact: {
          value: "01/01/2026",
          label: "Luật Bảo vệ dữ liệu cá nhân của Việt Nam có hiệu lực",
          source: "vn-pdp-law-2025" as SourceId,
        },
      },
      {
        key: "efficient",
        name: "Tối ưu chi phí",
        promise: "Dành cho doanh nghiệp thực tế, với chi phí xứng đáng.",
        from: "Trả tiền cho mô hình lớn nhất ở mọi tác vụ",
        to: "Trả tiền theo mỗi tác vụ thành công",
        capabilities: [
          "Mô hình nhỏ, tinh chỉnh riêng khi như vậy là đủ",
          "Định tuyến và bộ nhớ đệm để chỉ gọi mô hình lớn khi cần",
          "Đo lường chi phí và chất lượng trước và sau",
        ],
        fact: {
          value: "280×",
          label: "chi phí chạy AI cấp GPT-3.5 rẻ hơn so với hai năm trước",
          source: "stanford-ai-index-2025" as SourceId,
        },
      },
      {
        key: "domain",
        name: "Am hiểu nghiệp vụ",
        promise: "Xây quanh cách doanh nghiệp của bạn thực sự vận hành.",
        from: "Một trợ lý chung cho mọi công ty",
        to: "Hệ thống định hình theo SOP, dữ liệu và quy tắc của bạn",
        capabilities: [
          "Khảo sát quy trình, SOP và các ngoại lệ của bạn",
          "Thiết kế riêng, bộ đánh giá và tinh chỉnh theo nghiệp vụ",
          "Gói hỗ trợ: giám sát, cập nhật và đội ngũ phụ trách riêng",
        ],
        fact: {
          value: "69%",
          label: "chủ nhà hàng tại Mỹ đang dùng hoặc thí điểm AI cho back-office",
          source: "r365-2026" as SourceId,
        },
      },
      {
        key: "integration",
        name: "Tích hợp nhanh",
        promise: "Vận hành sau vài tuần, không phải vài quý — mà không đánh đổi chất lượng.",
        from: "Dự án tích hợp kéo dài sáu tháng",
        to: "Thí điểm có đo lường trong 6–8 tuần",
        capabilities: [
          "Kết nối sẵn với POS, ERP, chat và tài liệu bạn đang dùng",
          "Bộ đánh giá, cơ chế an toàn và mẫu triển khai dùng lại được",
          "Triển khai theo giai đoạn, có phương án khôi phục ở mọi bước",
        ],
        fact: {
          value: "6–8 tuần",
          label: "từ khảo sát đến thí điểm có đo lường, tiêu chí nghiệm thu thống nhất từ đầu",
        },
      },
    ],
    meet: {
      title: "Nơi cả năm gặp nhau",
      body: "AI làm việc thật, trong phạm vi của bạn, xây quanh cách bạn vận hành, chạy được sau vài tuần, với chi phí mỗi tác vụ mà bạn có thể chứng minh.",
      labels: ["Tác tử", "Riêng tư", "Tối ưu", "Nghiệp vụ", "Nhanh"],
    },
    compare: {
      eyebrow: "So sánh",
      title: "Điều bạn có ở Pyrium mà khó tìm ở nơi khác.",
      body: "So sánh theo nhóm, không nêu tên nhà cung cấp. Đánh giá là nhận định của chúng tôi về những gì mỗi nhóm thường cung cấp hiện nay.",
      columns: [
        "Pyrium",
        "Trợ lý AI dạng chat",
        "Nền tảng tự động hoá",
        "Đơn vị tích hợp lớn",
        "Freelancer & tự làm",
      ],
      legend: { full: "Có", partial: "Một phần", none: "Không" },
      rows: [
        {
          label: "Tích hợp nhanh với công cụ bạn đang dùng",
          values: ["full", "partial", "full", "none", "partial"],
        },
        {
          label: "Quy trình agentic hoàn thành trọn tác vụ",
          values: ["full", "partial", "partial", "full", "partial"],
        },
        {
          label: "Triển khai riêng tư trên hạ tầng của bạn",
          values: ["full", "partial", "partial", "full", "partial"],
        },
        {
          label: "Tối ưu chi phí mỗi tác vụ (định tuyến, mô hình nhỏ)",
          values: ["full", "none", "partial", "partial", "none"],
        },
        {
          label: "Am hiểu nghiệp vụ: FnB, vận hành, tài chính",
          values: ["full", "none", "none", "partial", "partial"],
        },
        {
          label: "Thiết kế và tinh chỉnh riêng cho quy trình của bạn",
          values: ["full", "none", "partial", "full", "full"],
        },
        {
          label: "Gói hỗ trợ và vận hành trọn gói",
          values: ["full", "partial", "partial", "full", "none"],
        },
        {
          label: "Giá cho doanh nghiệp vừa, thí điểm 6–8 tuần",
          values: ["full", "full", "full", "none", "partial"],
        },
      ],
      sourcesLabel: "Tham khảo theo nhóm",
      sources: [
        "openai-enterprise",
        "n8n-hosting",
        "copilot-studio",
        "litellm-routing",
      ] as SourceId[],
    },
  },
  productsSection: {
    eyebrow: "Sản phẩm",
    title: "Xây cho vận hành thực tế. Được người thật kiểm chứng.",
    body: "Các sản phẩm của chúng tôi, chia theo ngành phục vụ. Mỗi sản phẩm cho thấy dành cho ai, giải quyết gì và thay đổi gì với người đã dùng thử.",
    stats: [
      { value: "200+", label: "người đã dùng thử sản phẩm của chúng tôi" },
      { value: "~80%", label: "chi phí vận hành AI thấp hơn so với chỉ dùng đám mây", note: 1 },
      { value: "10+", label: "giải thưởng và ghi nhận tại hackathon của đội ngũ sáng lập" },
    ],
    notes: [
      "Ước tính của đội từ các lần đo kiểm: mô hình cục bộ và có định tuyến so với pipeline API đám mây tương đương trên cùng tác vụ.",
      "Số người dùng thử và mức tiết kiệm của từng sản phẩm là số liệu thí điểm do đội báo cáo; mức tiết kiệm là ước tính, cần đối chiếu với số liệu gốc của từng khách hàng.",
    ],
    updated: "Cập nhật lần cuối 26/10/2026",
    allProducts: "Tất cả sản phẩm",
    industriesEyebrow: "Theo ngành",
    industriesTitle: "Tìm sản phẩm được xây cho vận hành của bạn.",
    productCount: ["sản phẩm", "sản phẩm"],
    groups: {
      fnb: {
        name: "FnB & Dịch vụ lưu trú",
        body: "Nhà hàng, quán cà phê, tour và địa điểm sự kiện — phục vụ nhanh hơn, ít sai sót hơn, ít mất booking hơn.",
      },
      operations: {
        name: "Vận hành công nghiệp",
        body: "Nhà máy, bếp trung tâm và xưởng sản xuất — bằng chứng mà quản lý có thể ký duyệt.",
      },
      trust: {
        name: "Tin cậy & riêng tư",
        body: "Dữ liệu nhạy cảm mà người nội bộ không bao giờ được xem.",
      },
      infrastructure: {
        name: "Chi phí & hạ tầng",
        body: "Chạy LLM rẻ hơn, trên chính phần cứng bạn đang có.",
      },
    },
  },
  showcase: {
    builtFor: "Dành cho",
    solves: "Giải quyết",
    recognition: "Ghi nhận",
    testers: "Người dùng thử",
    saving: "Tiết kiệm dự kiến",
    core: "Kết quả cốt lõi",
    pilot: "Từ đợt thí điểm",
    readCase: "Xem chi tiết dự án",
    tryLive: "Xem demo",
    anonymous: "Ẩn danh",
    est: "ước tính",
  },
  testimonials: {
    eyebrow: "Cảm nhận",
    title: "Người dùng nói gì sau khi trải nghiệm.",
  },
  services: {
    pages: {
      approach: {
        eyebrow: "Cách hợp tác",
        title: "Một quy trình, một lộ trình, bạn quyết ở mỗi bước.",
        body: "Một dự án đi từ buổi trao đổi đầu tiên đến vận hành dài hạn như thế nào, và những lời hứa chúng tôi không đưa ra.",
      },
      security: {
        eyebrow: "Kiến trúc & bảo mật",
        title: "Sáu lớp, mọi kiểm soát đều được ghi nhận.",
        body: "Một hệ thống Pyrium gồm những gì, và bằng chứng mà mỗi lần triển khai để lại.",
      },
    },
    eyebrow: "Dịch vụ",
    title: "Từng quy trình một, thiết kế trọn vẹn từ đầu đến cuối.",
    body: "Pyrium thiết kế, tích hợp và vận hành các quy trình agentic giải quyết một bài toán kinh doanh cụ thể, trong giới hạn rõ ràng về dữ liệu, phân quyền, chất lượng và chi phí.",
    offersEyebrow: "Nhóm dịch vụ",
    offersTitle: "Bốn hướng tiếp cận, một chuẩn triển khai.",
    shownIn: "Thể hiện qua",
    offers: [
      {
        name: "Pyrium Agents",
        core: "agentic",
        role: "Triển khai cốt lõi",
        detail:
          "Quy trình agentic, điều phối, gọi công cụ và tự động hoá — có kiểm tra và bàn giao cho con người.",
        proof: "lantern" as const,
      },
      {
        name: "Pyrium Inference",
        core: "efficient",
        role: "Hiệu quả",
        detail:
          "Định tuyến mô hình, bộ nhớ đệm, chọn mô hình, đánh giá và tinh chỉnh để giảm chi phí mỗi tác vụ thành công.",
        proof: "inference" as const,
      },
      {
        name: "Pyrium Private",
        core: "private",
        role: "Tin cậy & sẵn sàng",
        detail:
          "Triển khai riêng tư, thiết kế quyền truy cập dữ liệu, khả năng kiểm toán và kiểm soát vận hành.",
        proof: "unfound" as const,
      },
      {
        name: "Pyrium Domain",
        core: "domain",
        role: "Tài sản tái sử dụng",
        detail:
          "Module dùng lại cho FnB, tài chính và vận hành doanh nghiệp, đúc kết từ nhiều lần triển khai.",
        proof: "ignis" as const,
      },
    ],
    archEyebrow: "Kiến trúc",
    archTitle: "Sáu lớp trong mọi hệ thống.",
    archBody:
      "Năng lực phổ thông thì mua hoặc dùng sẵn; chúng tôi chỉ tự xây ở nơi hiểu biết quy trình, thực thi liên hệ thống, quyền riêng tư, đánh giá hoặc chi phí tạo ra lợi thế bền vững.",
    layers: [
      {
        name: "Quy trình & nghiệp vụ",
        detail: "SOP, chính sách, quy tắc nghiệp vụ, bộ ca kiểm thử",
      },
      {
        name: "Thực thi tác tử",
        detail: "Điều phối, gọi công cụ, kiểm tra, bàn giao cho con người",
      },
      {
        name: "Tri thức & dữ liệu",
        detail: "Kết nối đã duyệt, truy xuất theo phân quyền, nguồn gốc",
      },
      {
        name: "Mô hình & suy luận",
        detail: "Định tuyến, kiểm soát ngữ cảnh, bộ nhớ đệm, phương án dự phòng",
      },
      {
        name: "Bảo mật & quản trị",
        detail: "Quyền tối thiểu, quản lý bí mật, nhật ký kiểm toán, lưu trữ",
      },
      {
        name: "Giám sát & kinh tế",
        detail: "Tỷ lệ thành công, tỷ lệ can thiệp, chi phí mỗi tác vụ",
      },
    ],
    controlsEyebrow: "Quyền riêng tư & quản trị",
    controlsTitle: "Kiểm soát có thể kiểm chứng, không chỉ là lời hứa.",
    controlsBody:
      "Mỗi lần triển khai đều kèm các bằng chứng dưới đây, để bạn thấy dữ liệu đi đâu, tác tử được làm gì và dừng nó bằng cách nào.",
    controls: [
      {
        area: "Ranh giới dữ liệu",
        evidence: "Sơ đồ luồng dữ liệu, danh mục nguồn, chính sách lưu trữ và xoá",
      },
      {
        area: "Danh tính & phân quyền",
        evidence: "Danh tính quyền tối thiểu, kết nối giới hạn phạm vi, xoay vòng khoá",
      },
      {
        area: "Chính sách hành động",
        evidence: "Danh sách công cụ cho phép, ngưỡng, quy tắc phê duyệt và leo thang",
      },
      {
        area: "Chất lượng & an toàn",
        evidence: "Bộ đánh giá, kiểm thử bám nguồn và chống prompt injection",
      },
      {
        area: "Khả năng quan sát",
        evidence: "Mã truy vết, nhật ký công cụ và hành động, các lần can thiệp",
      },
      {
        area: "Ứng phó sự cố",
        evidence: "Công tắc dừng, thu hồi quyền, khôi phục, người chịu trách nhiệm",
      },
    ],
    audienceTitle: "Dành cho ai",
    audienceBody:
      "Doanh nghiệp tầm trung tại Việt Nam và Đông Nam Á có 10–100 điểm kinh doanh hoặc quy trình back-office lặp lại, có nguồn dữ liệu có cấu trúc và người phụ trách rõ ràng.",
    buyers: ["COO", "CFO", "Giám đốc Vận hành", "CIO / CTO"],
    startTitle: "Bắt đầu từ đâu",
    useCases: [
      { name: "Xử lý ngoại lệ hoá đơn & đơn mua hàng", fit: "Ứng viên thí điểm" },
      { name: "Báo cáo vận hành hằng ngày kèm diễn giải", fit: "Thí điểm sớm" },
      { name: "Trợ lý SOP & chính sách nội bộ", fit: "Đi kèm một quy trình" },
      { name: "Ngoại lệ tồn kho & bổ sung hàng", fit: "Giai đoạn 2" },
    ],
    reportTitle: "Chúng tôi báo cáo gì",
    metrics: [
      { name: "Tỷ lệ tác vụ thành công", detail: "Tỷ lệ ca hoàn thành đúng tiêu chí nghiệm thu" },
      { name: "Chi phí mỗi tác vụ thành công", detail: "Chi phí suy luận, hạ tầng và kiểm duyệt" },
      { name: "Tỷ lệ can thiệp của con người", detail: "Số ca cần sửa thủ công hoặc chuyển cấp" },
      { name: "Thời gian xử lý", detail: "Độ trễ P50 / P95 và thời gian tiết kiệm toàn trình" },
    ],
    promisesEyebrow: "Điều chúng tôi không hứa",
    promisesTitle: "Chỉ cam kết những gì đo được.",
    promises: [
      "Chúng tôi công bố thông tin cụ thể theo kiến trúc, không nói “riêng tư 100%”.",
      "Chúng tôi nêu mức tiết kiệm cho từng quy trình và bộ kiểm thử cụ thể, không bao giờ hứa chung chung.",
      "Chúng tôi tự động hoá kèm điểm phê duyệt, không trao quyền tự hành vô hạn.",
    ],
  },
  engagement: {
    eyebrow: "Hợp tác",
    title: "Bắt đầu từ một quy trình.",
    body: "Một lộ trình từ buổi trao đổi đầu tiên đến khi vận hành thật. Ở mỗi bước, bạn quyết định có đi tiếp hay không.",
    stepLabel: "Bước",
    steps: [
      {
        name: "Khảo sát có phí",
        detail:
          "Lập bản đồ hệ thống, các bước quy trình, rủi ro, yêu cầu bảo mật và chỉ số nghiệm thu.",
      },
      {
        name: "Thí điểm quy trình",
        detail:
          "Chứng minh một quy trình trong môi trường giới hạn, có ngưỡng thành công, nhật ký và phương án khôi phục.",
      },
      {
        name: "Triển khai thực tế",
        detail: "Hoàn thiện định danh, giám sát, cơ chế thử lại, khả năng kiểm toán và hỗ trợ.",
      },
      {
        name: "Vận hành trọn gói",
        detail: "Giám sát liên tục, cập nhật mô hình, rà soát chi phí và kiểm thử hồi quy.",
      },
    ],
    featured: "Điểm khởi đầu phổ biến",
    discuss: "Trao đổi phạm vi",
    packages: [
      {
        name: "Gói khảo sát",
        detail: "Đánh giá dữ liệu và quy trình, giả thuyết ROI và kế hoạch thí điểm.",
        includes: ["Bản đồ quy trình", "Danh mục dữ liệu & bảo mật", "Chỉ số nghiệm thu"],
      },
      {
        name: "Gói thí điểm",
        detail: "Một quy trình giới hạn với tiêu chí nghiệm thu thống nhất từ đầu.",
        includes: ["Bộ đánh giá", "Báo cáo trước và sau thí điểm", "Quyết định triển khai"],
        featured: true,
      },
      {
        name: "Triển khai & vận hành",
        detail: "Hoàn thiện triển khai, sau đó vận hành AI trọn gói.",
        includes: ["Giám sát & nhật ký kiểm toán", "Rà soát chi phí", "Kiểm thử hồi quy"],
      },
    ],
  },
  contact: {
    eyebrow: "Liên hệ",
    title: "Hãy kể cho chúng tôi về một quy trình.",
    body: "Chỉ cần một tác vụ lặp lại, hệ thống chứa nó và người phụ trách là đủ để bắt đầu.",
    fields: {
      name: "Họ và tên",
      email: "Email công việc",
      company: "Công ty và vị trí",
      start: "Bạn muốn bắt đầu từ đâu?",
      workflow: "Quy trình bạn muốn cải thiện",
      workflowHint: "Hiện tại đang làm thế nào, liên quan hệ thống nào và ai phụ trách.",
      send: "Gửi",
    },
    formNote: "Biểu mẫu chưa được kết nối — hiện chưa gửi được.",
    proceedTitle: "Chúng tôi tiến hành khi…",
    pauseTitle: "…và tạm dừng khi",
    proceed: [
      "Có người phụ trách quy trình và chỉ số thành công.",
      "Quyền truy cập dữ liệu đã được phê duyệt.",
      "Tiêu chí nghiệm thu kiểm thử được trước khi triển khai.",
      "Quyết định triển khai được lên kế hoạch trước khi thí điểm.",
    ],
    pause: [
      "Chưa có người phụ trách hoặc mốc so sánh.",
      "Nguồn gốc hoặc quyền sử dụng dữ liệu chưa rõ.",
      "Giá trị phụ thuộc vào việc để tác tử tự hành không giới hạn.",
    ],
    faqEyebrow: "Câu hỏi thường gặp",
    faqTitle: "Trước khi bạn liên hệ.",
    faq: [
      {
        q: "Các bạn chỉ dùng mô hình tự vận hành thôi sao?",
        a: "Không. Chúng tôi trung lập với nhà cung cấp: dùng dịch vụ có sẵn hay tự vận hành được chọn theo từng quy trình, dựa trên ràng buộc dữ liệu, chất lượng, độ trễ và chi phí.",
      },
      {
        q: "Bao lâu thì thấy kết quả chạy được?",
        a: "Một đợt thí điểm giới hạn kéo dài sáu đến tám tuần, với tiêu chí nghiệm thu thống nhất trước khi bắt đầu.",
      },
      {
        q: "Nếu thí điểm không đạt tiêu chí thì sao?",
        a: "Chúng tôi dừng hoặc thiết kế lại. Điểm quyết định là một phần của mọi dự án, không phải việc làm sau.",
      },
    ],
  },
  team: {
    eyebrow: "Nhà sáng lập",
    title: "Ba kỹ sư, một cách làm việc.",
    cofounder: "Đồng sáng lập",
    about: "Về Pyrium",
    links: { linkedin: "LinkedIn", email: "Email", portfolio: "Portfolio", soon: "Sắp cập nhật" },
    vision: {
      title: "Định hướng",
      statement: "Làm chủ khoảng giữa năng lực AI và giá trị kinh doanh.",
      body: "Hoàn thành đúng quy trình, trong đúng giới hạn, với chi phí khách hàng thấy xứng đáng. Chúng tôi xây sản phẩm từ sự lặp lại — cùng một quy trình, cơ chế kiểm soát và kết quả, được chứng minh qua nhiều khách hàng — trước khi xây nền tảng.",
      horizons: [
        {
          when: "Hiện tại",
          title: "Chứng minh qua thí điểm",
          detail:
            "Khảo sát có phí và thí điểm 6–8 tuần cùng các đội FnB và vận hành, đo trên mốc so sánh đã thống nhất.",
        },
        {
          when: "12 tháng",
          title: "Triển khai lặp lại",
          detail:
            "Bộ kết nối, bộ đánh giá và cơ chế an toàn dùng lại được, để mỗi lần triển khai nhanh hơn mà không giảm chất lượng.",
        },
        {
          when: "Xa hơn",
          title: "Trợ lý vận hành riêng tư",
          detail:
            "Một sản phẩm đến từ sự lặp lại: cùng quy trình, kiểm soát và kết quả, được chứng minh qua nhiều khách hàng.",
        },
      ],
    },
  },
  about: {
    pages: {
      team: {
        eyebrow: "Đội ngũ",
        title: "Ba kỹ sư, một cách làm việc.",
        body: "Ai đang xây Pyrium, mỗi người phụ trách gì, và chúng tôi đã cùng nhau làm ra những gì.",
        about: "Giới thiệu",
        strengths: "Thế mạnh",
        awards: "Giải thưởng",
        experience: "Kinh nghiệm",
        pending: "Hồ sơ sẽ được cập nhật.",
        experiencePending: "Sẽ được cập nhật.",
        recognisedBy: "Được ghi nhận bởi",
      },
      vision: {
        eyebrow: "Tầm nhìn",
        title: "Chúng tôi đi đâu, và đo bằng gì.",
        body: "Phần việc chúng tôi muốn làm chủ, và lộ trình mười hai tháng với điều kiện ở mỗi giai đoạn.",
      },
    },
    eyebrow: "Giới thiệu",
    title: "Trí tuệ có kiểm soát, đi vào hành động.",
    body: "Pyrium là công ty kỹ thuật hệ thống AI riêng tư đến từ Việt Nam. Chúng tôi bắt đầu từ ba nhà sáng lập cùng làm việc dưới áp lực hackathon; giờ chúng tôi xây dựng một công ty mang cùng kỷ luật đó vào vận hành thực tế.",
    line: ["AI riêng tư.", "Hành động thực tế."],
    numbersEyebrow: "Pyrium qua những con số",
    numbersTitle: "Bằng chứng chúng tôi chỉ ra được.",
    numbers: [
      { value: "200+", label: "người đã dùng thử sản phẩm của chúng tôi" },
      { value: "10+", label: "giải thưởng và ghi nhận tại hackathon" },
      { value: "5", label: "sản phẩm đã ra mắt kèm demo chạy được" },
      { value: "11", label: "sự kiện cùng NVIDIA, Viettel, Google, OpenAI và AMD" },
    ],
    numbersNote:
      "Số liệu sản phẩm lấy từ kết quả đo của từng dự án; số người dùng thử do đội báo cáo.",
    builtEyebrow: "Xây cùng",
    builtTitle: "Năm sản phẩm, mỗi sản phẩm được xây ngay cạnh những đơn vị đặt ra chuẩn mực.",
    builtBody:
      "Mỗi sản phẩm bắt đầu tại một sự kiện do các đơn vị dưới đây tổ chức. Chọn một sản phẩm để xem nó được xây cùng ai.",
    builtWith: "Cùng",
    depthEyebrow: "Đi sâu vào cốt lõi",
    depthTitle: "Năm cam kết, và ý nghĩa thực tế của từng cam kết.",
    depth: [
      {
        key: "agentic",
        body: "Một tác tử chỉ biết trò chuyện là chi phí. Chúng tôi xây tác tử hoàn thành công việc cụ thể — đối soát hoá đơn, nhận order, soạn báo cáo — ngay trong hệ thống bạn đang dùng. Mô hình diễn giải và đề xuất; mã nguồn cố định kiểm tra mọi thay đổi và tính mọi con số; người phụ trách phê duyệt mọi thứ liên quan đến tiền, khách hàng hay hồ sơ.",
        proof: "lantern" as const,
      },
      {
        key: "private",
        body: "Riêng tư là một ranh giới kiểm chứng được, không phải lời hứa. Chúng tôi triển khai trên hạ tầng của bạn hoặc đám mây riêng, chỉ kết nối nguồn đã duyệt với quyền tối thiểu, và lưu vết mọi lệnh gọi công cụ, mọi hành động. Bạn thấy rõ dữ liệu đi đâu, ai được xem và dừng hệ thống bằng cách nào.",
        proof: "unfound" as const,
      },
      {
        key: "efficient",
        body: "Phần lớn chi phí AI là dùng sai mô hình cho sai tác vụ. Chúng tôi đo chi phí mỗi tác vụ thành công trước khi thay đổi gì, rồi định tuyến: mô hình nhỏ, tinh chỉnh hoặc chạy cục bộ khi như vậy là đủ, bộ nhớ đệm khi câu trả lời lặp lại, và chỉ gọi mô hình lớn khi tác vụ thật sự cần.",
        proof: "inference" as const,
      },
      {
        key: "domain",
        body: "Trợ lý chung thất bại ở chính những chi tiết làm nên cách bạn vận hành. Chúng tôi bắt đầu từ SOP, dữ liệu và các ngoại lệ của bạn, viết bộ ca kiểm thử từ đó, tinh chỉnh hệ thống để vượt qua — rồi duy trì bằng gói hỗ trợ, giám sát và đội ngũ phụ trách riêng.",
        proof: "ignis" as const,
      },
      {
        key: "integration",
        body: "Tốc độ đến từ việc dùng lại, không phải đi tắt. Bộ kết nối, bộ đánh giá, cơ chế an toàn và mẫu triển khai đã xây sẵn giúp một đợt thí điểm có đo lường chạy được sau sáu đến tám tuần, triển khai theo giai đoạn và luôn có đường lui ở mọi bước.",
        proof: "weatherise" as const,
      },
    ],
    proofLabel: "Bằng chứng",
    principlesEyebrow: "Nguyên tắc",
    principlesTitle: "Bốn chuẩn mực cho mọi hệ thống.",
    principles: [
      {
        title: "Riêng tư từ thiết kế",
        body: "Dữ liệu, mô hình, hạ tầng và quyền kiểm soát đều thuộc về bạn.",
      },
      {
        title: "Thực thi có kiểm soát",
        body: "Hệ thống agentic suy luận, lập kế hoạch và hành động an toàn trong môi trường của bạn.",
      },
      {
        title: "Suy luận hiệu quả",
        body: "Định tuyến, bộ nhớ đệm, tinh chỉnh và tối ưu để giảm chi phí, tăng hiệu quả.",
      },
      {
        title: "Am hiểu nghiệp vụ",
        body: "AI chuyên sâu cho kinh tế, tài chính, FnB và vận hành doanh nghiệp thực tế.",
      },
    ],
    roadmapEyebrow: "Mười hai tháng tới",
    roadmapTitle: "Từ chứng minh đến nhân rộng.",
    roadmapBody:
      "Mỗi giai đoạn có một điểm quyết định. Chưa đủ bằng chứng, chúng tôi chưa đi tiếp.",
    gate: "Điều kiện",
    roadmap: [
      {
        phase: "Khảo sát khách hàng",
        time: "Tuần 1–4",
        gate: "Ba khách hàng tiềm năng xác nhận quy trình cấp bách và người phụ trách.",
      },
      {
        phase: "Thí điểm có phí",
        time: "Tháng 2–4",
        gate: "Ít nhất hai dự án thí điểm đạt tiêu chí nghiệm thu đã thống nhất.",
      },
      {
        phase: "Hoàn thiện triển khai",
        time: "Tháng 4–7",
        gate: "Một hệ thống chạy khối lượng thật với chi phí hợp lý.",
      },
      {
        phase: "Triển khai lặp lại",
        time: "Tháng 7–10",
        gate: "Số giờ triển khai mỗi hệ thống giảm mà chất lượng không đổi.",
      },
      {
        phase: "Quyết định sản phẩm hoá",
        time: "Tháng 10–12",
        gate: "Nhu cầu lặp lại ở ít nhất ba khách hàng.",
      },
    ],
  },
  caseStudy: {
    tabs: { overview: "Tổng quan", build: "Cách xây dựng" },
    allProducts: "Tất cả sản phẩm",
    event: "Sự kiện",
    with: "Đơn vị",
    when: "Thời gian",
    team: "Đội",
    result: "Kết quả",
    source: "Mã nguồn trên GitHub",
    problem: "Vấn đề",
    built: "Chúng tôi xây dựng gì",
    split: "Cách phân chia công việc",
    splitTitle: "Mô hình đề xuất. Mã nguồn quyết định. Con người phê duyệt.",
    steps: { model: "Mô hình đề xuất", code: "Mã nguồn quyết định", human: "Con người phê duyệt" },
    log: "Quá trình xây dựng",
    inside: "Bên trong sản phẩm",
    scroll: "Kéo ngang để xem →",
    outcomes: "Chi tiết kỹ thuật",
    outcomesNote:
      "Đo tại sự kiện trên bộ kiểm thử và khối lượng công việc đã nêu, không phải trên dữ liệu khách hàng.",
    next: "Sản phẩm tiếp theo",
  },
  closing: {
    title: "Dữ liệu của bạn. Mô hình của bạn. Quyền kiểm soát của bạn.",
    body: "Đó là toàn bộ cam kết. Phần còn lại được đo lường, từng quy trình một.",
  },
  footer: {
    tagline: "AI riêng tư, được thiết kế cho doanh nghiệp thực tế.",
    sources: "Nguồn tham khảo",
    products: "Sản phẩm",
    company: "Công ty",
    country: "Việt Nam",
    photos:
      "Hình ảnh: ảnh giấy phép mở từ Wikimedia Commons và StockSnap (CC0, phạm vi công cộng; ảnh khu ẩm thực © Martin Lewison, CC BY 2.0). Âm thanh giao diện: Kenney, CC0.",
  },
  settings: {
    open: "Tuỳ chỉnh",
    title: "Tuỳ chỉnh",
    language: "Ngôn ngữ",
    motion: "Chuyển động",
    motionLevels: { full: "Đầy đủ", subtle: "Nhẹ", off: "Tắt" },
    motionHint: {
      full: "Mọi hiệu ứng như thiết kế.",
      subtle: "Chuyển động nhẹ và ngắn hơn.",
      off: "Không có hiệu ứng.",
    },
    sound: "Âm thanh",
    music: "Nhạc nền",
    volume: "Âm lượng",
    sfx: "Âm thanh giao diện",
    saved: "Đã lưu trên thiết bị này.",
    soundPrompt: "Chạm bất kỳ đâu để bật nhạc nền",
  },
  notFound: { title: "Trang này không tồn tại.", back: "Về trang chủ" },
};

const copies: Record<Lang, Copy> = { en, vi };

export function getCopy(lang: Lang): Copy {
  return copies[lang];
}
