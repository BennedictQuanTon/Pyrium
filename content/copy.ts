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
  intro: { tagline: "Private AI. Built to act.", meter: "Private · Agentic · Cost-efficient" },
  problem: {
    eyebrow: "The problem",
    title: "FnB runs on thin margins. AI could help — if it were safe, accurate and affordable.",
    body: "Operators face rising costs and staff who don't stay. AI is arriving in the back office fast, but most tools ask owners to hand over their data, trust answers they can't check and pay bills they can't predict.",
    squeezeTitle: "The squeeze",
    squeeze: [
      {
        photo: "/images/open/chefs.jpg",
        alt: "Chefs at the pass in a restaurant kitchen",
        value: "42%",
        label: "of US restaurant operators were not profitable in 2025",
        detail: "Average restaurant costs rose 36% between 2019 and 2026.",
        source: "nra-2026-07" as SourceId,
      },
      {
        photo: "/images/open/workers.jpg",
        alt: "A cook at work in a steaming market kitchen",
        value: "3.5%",
        label: "of food-service staff quit every month",
        detail: "Almost double the 1.9% rate across all US industries (Aug 2026).",
        source: "bls-2026-10" as SourceId,
      },
      {
        photo: "/images/open/foodcourt.jpg",
        alt: "A food counter at a food court in Da Nang",
        value: "₫726.5T",
        label: "Vietnam's FnB market in 2025 (726,500 billion VND), up 5.5%",
        detail: "Spread across about 329,500 outlets, from street stalls to national chains.",
        source: "ipos-2025" as SourceId,
      },
    ],
    adoption: {
      title: "AI is arriving in the back office",
      caption: "of US restaurant operators use or pilot AI for back-office reporting",
      from: { value: 25, label: "Start of 2026" },
      to: { value: 69, label: "Mid-2026" },
      result: { value: "62%", label: "of operators already using AI report lower labor costs" },
      source: "r365-2026" as SourceId,
    },
    barriers: {
      title: "What holds the rest back",
      caption: "Top reasons US operators give for not adopting AI",
      answerLabel: "Our answer",
      rows: [
        { value: 37, label: "Data privacy and security", answer: "Private AI" },
        { value: 34, label: "Accuracy of AI output", answer: "Agentic AI with checks" },
        { value: 29, label: "Implementation cost", answer: "Cost-efficient by design" },
      ],
      source: "r365-2026" as SourceId,
    },
    evidence: {
      title: "Beyond restaurants",
      items: [
        {
          value: "27%",
          label: "of organizations had banned GenAI over privacy and data risk",
          source: "cisco-2024" as SourceId,
        },
        {
          value: "40%+",
          label: "of agentic AI projects will be canceled by 2027 over cost, value or risk",
          source: "gartner-agentic-2025-06" as SourceId,
        },
        {
          value: "280×",
          label: "cheaper to run GPT-3.5-level AI in late 2024 than in late 2022",
          source: "stanford-ai-index-2025" as SourceId,
        },
      ],
    },
    segments: {
      title: "From a single café to a 100-outlet chain",
      body: "The need changes with size. The answer has to fit.",
      needLabel: "The need",
      fitLabel: "What fits",
      items: [
        {
          photo: "/images/open/baristas.jpg",
          alt: "Baristas working behind a café counter",
          name: "Independent café or restaurant",
          need: "No IT team. The owner runs the books, the rota and the ordering.",
          fit: "A done-for-you automation, run and supported by us.",
        },
        {
          photo: "/images/open/host-pos.jpg",
          alt: "A restaurant host at a tablet point of sale",
          name: "Multi-outlet chain",
          need: "10–100 sites, with POS, inventory and supplier data split across systems.",
          fit: "Private workflows across outlets, with one view of the business.",
        },
        {
          photo: "/images/solution-racks.jpg",
          alt: "Server racks in a data centre",
          name: "Group & enterprise",
          need: "Data governance, its own infrastructure and LLM bills at scale.",
          fit: "Private deployment and cost control on your own stack.",
        },
      ],
    },
    sourcesNote:
      "Figures checked against each publisher's page on 26 Oct 2026. US figures describe the US market; Vietnam figures describe Vietnam.",
  },
  core: {
    eyebrow: "Our core",
    title: "Agentic. Private. Cost-efficient. Domain-deep.",
    body: "Four commitments define every system we build — and each one answers a reason operators hold back from AI today.",
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
    ],
    meet: {
      title: "Where all four meet",
      body: "AI that does real work, inside your boundary, built around your operation, at a cost per task you can defend.",
      labels: ["Agentic", "Private", "Efficient", "Domain"],
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
      { value: "~80%", label: "lower AI running cost than cloud-only pipelines", estimate: true },
      { value: "6", label: "hackathon awards & recognitions" },
    ],
    estimateMark: "est.",
    estimateNote:
      "est. — team estimates. Running cost: our benchmark runs, local and routed models vs. an equivalent cloud-API pipeline on the same tasks. Product savings: modelled from pilot results; to be confirmed with each customer's own baseline.",
    awards: [
      "Top 10 · Vietnam AI Open",
      "6th & 18th · RMIT",
      "#77 / 300+ · Viettel AI Race",
      "Silver · AI Riser",
      "Round 2 · VN Youth Start-up",
    ],
    allProducts: "All products",
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
    draft: "Draft",
    est: "est.",
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "What people say after using what we built.",
    draftNote: "Draft quotes — wording is pending approval from the people in each role.",
  },
  services: {
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
    body: "Every engagement follows the same path, and each step has a go / no-go gate before the next.",
    stepLabel: "Step",
    gate: "Go / no-go gate",
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
    eyebrow: "About",
    title: "Controlled intelligence, in action.",
    body: "Pyrium is a private AI systems engineering company from Vietnam. We started as three founders building together under hackathon deadlines; we're building a company that brings the same discipline to real operations.",
    line: ["Private AI.", "Built to act."],
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
  intro: {
    tagline: "AI riêng tư. Hành động thực tế.",
    meter: "Riêng tư · Tác tử · Tối ưu chi phí",
  },
  problem: {
    eyebrow: "Vấn đề",
    title:
      "FnB vận hành trên biên lợi nhuận mỏng. AI có thể giúp — nếu nó an toàn, chính xác và vừa túi tiền.",
    body: "Chủ kinh doanh đối mặt với chi phí tăng và nhân sự khó giữ. AI đang vào khâu back-office rất nhanh, nhưng phần lớn công cụ buộc họ giao dữ liệu ra ngoài, tin vào câu trả lời không kiểm chứng được và trả những hoá đơn không dự đoán được.",
    squeezeTitle: "Áp lực",
    squeeze: [
      {
        photo: "/images/open/chefs.jpg",
        alt: "Đầu bếp ở quầy ra món trong bếp nhà hàng",
        value: "42%",
        label: "chủ nhà hàng tại Mỹ không có lãi trong năm 2025",
        detail: "Chi phí trung bình của nhà hàng tăng 36% từ 2019 đến 2026.",
        source: "nra-2026-07" as SourceId,
      },
      {
        photo: "/images/open/workers.jpg",
        alt: "Người nấu ăn trong gian bếp chợ nghi ngút khói",
        value: "3,5%",
        label: "nhân viên ngành ăn uống nghỉ việc mỗi tháng",
        detail: "Gần gấp đôi mức 1,9% của toàn bộ các ngành tại Mỹ (tháng 8/2026).",
        source: "bls-2026-10" as SourceId,
      },
      {
        photo: "/images/open/foodcourt.jpg",
        alt: "Quầy đồ ăn tại khu ẩm thực ở Đà Nẵng",
        value: "726.500 tỷ ₫",
        label: "quy mô thị trường FnB Việt Nam năm 2025, tăng 5,5%",
        detail: "Trải trên khoảng 329.500 cửa hàng, từ quán vỉa hè đến chuỗi toàn quốc.",
        source: "ipos-2025" as SourceId,
      },
    ],
    adoption: {
      title: "AI đang vào khâu back-office",
      caption: "chủ nhà hàng tại Mỹ đang dùng hoặc thí điểm AI cho báo cáo back-office",
      from: { value: 25, label: "Đầu 2026" },
      to: { value: 69, label: "Giữa 2026" },
      result: { value: "62%", label: "chủ nhà hàng đã dùng AI cho biết chi phí nhân sự giảm" },
      source: "r365-2026" as SourceId,
    },
    barriers: {
      title: "Điều khiến số còn lại chần chừ",
      caption: "Lý do hàng đầu khiến chủ nhà hàng tại Mỹ chưa dùng AI",
      answerLabel: "Câu trả lời",
      rows: [
        { value: 37, label: "Quyền riêng tư và bảo mật dữ liệu", answer: "Private AI" },
        { value: 34, label: "Độ chính xác của AI", answer: "Agentic AI có kiểm tra" },
        { value: 29, label: "Chi phí triển khai", answer: "Tối ưu chi phí từ thiết kế" },
      ],
      source: "r365-2026" as SourceId,
    },
    evidence: {
      title: "Không chỉ nhà hàng",
      items: [
        {
          value: "27%",
          label: "tổ chức từng cấm dùng GenAI vì rủi ro quyền riêng tư và dữ liệu",
          source: "cisco-2024" as SourceId,
        },
        {
          value: "40%+",
          label: "dự án agentic AI sẽ bị huỷ trước 2027 vì chi phí, giá trị hoặc rủi ro",
          source: "gartner-agentic-2025-06" as SourceId,
        },
        {
          value: "280×",
          label: "chi phí chạy AI cấp GPT-3.5 cuối 2024 rẻ hơn cuối 2022",
          source: "stanford-ai-index-2025" as SourceId,
        },
      ],
    },
    segments: {
      title: "Từ một quán cà phê đến chuỗi 100 chi nhánh",
      body: "Nhu cầu thay đổi theo quy mô. Giải pháp phải vừa vặn.",
      needLabel: "Nhu cầu",
      fitLabel: "Phù hợp",
      items: [
        {
          photo: "/images/open/baristas.jpg",
          alt: "Nhân viên pha chế làm việc sau quầy cà phê",
          name: "Quán cà phê, nhà hàng độc lập",
          need: "Không có đội IT. Chủ quán tự lo sổ sách, ca làm và nhập hàng.",
          fit: "Tự động hoá trọn gói, do chúng tôi vận hành và hỗ trợ.",
        },
        {
          photo: "/images/open/host-pos.jpg",
          alt: "Nhân viên lễ tân nhà hàng bên máy POS",
          name: "Chuỗi nhiều chi nhánh",
          need: "10–100 điểm bán, dữ liệu POS, tồn kho, nhà cung cấp nằm rải rác nhiều hệ thống.",
          fit: "Quy trình riêng tư xuyên chi nhánh, một góc nhìn chung cho cả doanh nghiệp.",
        },
        {
          photo: "/images/solution-racks.jpg",
          alt: "Dãy máy chủ trong trung tâm dữ liệu",
          name: "Tập đoàn & doanh nghiệp lớn",
          need: "Quản trị dữ liệu, hạ tầng riêng và hoá đơn LLM ở quy mô lớn.",
          fit: "Triển khai riêng tư và kiểm soát chi phí trên chính hạ tầng của bạn.",
        },
      ],
    },
    sourcesNote:
      "Số liệu được đối chiếu với trang của từng đơn vị công bố ngày 26/10/2026. Số liệu Mỹ mô tả thị trường Mỹ; số liệu Việt Nam mô tả Việt Nam.",
  },
  core: {
    eyebrow: "Cốt lõi",
    title: "Tác tử. Riêng tư. Tối ưu chi phí. Am hiểu nghiệp vụ.",
    body: "Bốn cam kết định hình mọi hệ thống chúng tôi xây dựng — mỗi cam kết giải đúng một lý do khiến doanh nghiệp còn ngần ngại với AI.",
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
    ],
    meet: {
      title: "Nơi cả bốn gặp nhau",
      body: "AI làm việc thật, trong phạm vi của bạn, xây quanh cách bạn vận hành, với chi phí mỗi tác vụ mà bạn có thể chứng minh.",
      labels: ["Tác tử", "Riêng tư", "Tối ưu", "Nghiệp vụ"],
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
      {
        value: "~80%",
        label: "chi phí vận hành AI thấp hơn so với chỉ dùng đám mây",
        estimate: true,
      },
      { value: "6", label: "giải thưởng & ghi nhận tại hackathon" },
    ],
    estimateMark: "ước tính",
    estimateNote:
      "ước tính — số liệu ước tính của đội. Chi phí vận hành: đo kiểm của đội, mô hình cục bộ và có định tuyến so với pipeline API đám mây tương đương trên cùng tác vụ. Mức tiết kiệm của sản phẩm: mô hình hoá từ kết quả thí điểm, cần xác nhận với số liệu gốc của từng khách hàng.",
    awards: [
      "Top 10 · Vietnam AI Open",
      "Hạng 6 & 18 · RMIT",
      "#77 / 300+ · Viettel AI Race",
      "Silver · AI Riser",
      "Vòng 2 · VN Youth Start-up",
    ],
    allProducts: "Tất cả sản phẩm",
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
    draft: "Bản nháp",
    est: "ước tính",
  },
  testimonials: {
    eyebrow: "Cảm nhận",
    title: "Người dùng nói gì sau khi trải nghiệm.",
    draftNote: "Trích dẫn bản nháp — nội dung đang chờ người ở từng vai trò xác nhận.",
  },
  services: {
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
    body: "Mọi dự án đi theo cùng một lộ trình, và mỗi bước đều có điểm quyết định tiếp tục hay dừng trước khi sang bước sau.",
    stepLabel: "Bước",
    gate: "Điểm quyết định",
    steps: [
      {
        name: "Khảo sát có phí",
        time: "Phí cố định",
        detail:
          "Lập bản đồ hệ thống, các bước quy trình, rủi ro, yêu cầu bảo mật và chỉ số nghiệm thu.",
      },
      {
        name: "Thí điểm quy trình",
        time: "6–8 tuần",
        detail:
          "Chứng minh một quy trình trong môi trường giới hạn, có ngưỡng thành công, nhật ký và phương án khôi phục.",
      },
      {
        name: "Triển khai thực tế",
        time: "Theo mốc",
        detail: "Hoàn thiện định danh, giám sát, cơ chế thử lại, khả năng kiểm toán và hỗ trợ.",
      },
      {
        name: "Vận hành trọn gói",
        time: "Hằng tháng",
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
    eyebrow: "Giới thiệu",
    title: "Trí tuệ có kiểm soát, đi vào hành động.",
    body: "Pyrium là công ty kỹ thuật hệ thống AI riêng tư đến từ Việt Nam. Chúng tôi bắt đầu từ ba nhà sáng lập cùng làm việc dưới áp lực hackathon; giờ chúng tôi xây dựng một công ty mang cùng kỷ luật đó vào vận hành thực tế.",
    line: ["AI riêng tư.", "Hành động thực tế."],
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
