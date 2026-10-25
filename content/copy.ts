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
    title: "AI adoption is broad. Value in production is not.",
    body: "Most organizations already use AI somewhere, yet agents that do real work are rare and oversight lags behind. The hard part is no longer access to models — it's reliable workflows, governance and a cost a business can justify.",
    funnel: {
      title: "From using AI to running agents",
      rows: [
        { label: "Used AI in 2025", value: 88, display: "88%" },
        { label: "Used generative AI in a business function", value: 70, display: "70%" },
        { label: "Run AI agents, in nearly every function", value: 8, display: "Single digits" },
      ],
      gap: "The gap",
      note: "The last bar marks “single digits”, not a measured value.",
    },
    cio: {
      label:
        "of CIOs say their enterprise has realized significant or transformational value from AI.",
    },
    governance: {
      label: "companies has mature governance for autonomous AI agents.",
      detail: "3,235 senior leaders · 24 countries",
    },
    gates: {
      title: "Few know when to stop",
      rows: [
        { value: 31, label: "of CIOs have rules for stopping pilots before production" },
        { value: 17, label: "have rules for abandoning low-value AI in production" },
      ],
    },
    chart: {
      title: "Worldwide AI spending",
      unit: "US$ trillions",
      published: "Published forecast",
      derived: "Derived from growth rate",
      note: "2026 is Gartner's published forecast (US$2.7T, +49.5%). 2025 and 2027 are calculated from the growth rates in the same release. Global spending is context, not Pyrium's market.",
    },
    closer:
      "The gap isn't adoption. It's getting AI to do real work, safely and at a sensible cost — and that's where Pyrium works.",
  },
  core: {
    eyebrow: "Our core",
    title: "Agentic. Private. Cost-efficient.",
    body: "Three commitments define every system we build. Each answers a shift already under way in how businesses adopt AI.",
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
          value: "US$985B",
          label: "forecast agentic AI software spend by 2030",
          source: "gartner-agentic-2026-02" as SourceId,
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
          value: "58%",
          label: "of CIOs face more pressure to cut AI costs",
          source: "gartner-cio-2026-10" as SourceId,
        },
      },
    ],
    meet: {
      title: "Where all three meet",
      body: "AI that does real work, inside your boundary, at a cost per task you can defend.",
    },
  },
  productsSection: {
    eyebrow: "Products",
    title: "Built under deadline. Used by real people.",
    body: "Four products the founders designed, built and shipped — each solving a real problem for a specific kind of user.",
    stats: [
      { value: "200+", label: "people have used our products" },
      { value: "~80%", label: "lower AI running cost than cloud-only pipelines", estimate: true },
      { value: "6", label: "hackathon awards & recognitions" },
    ],
    estimateMark: "est.",
    estimateNote:
      "est. — team estimate from our benchmark runs: local and routed models vs. an equivalent cloud-API pipeline on the same tasks.",
    awards: [
      "Top 10 · Vietnam AI Open",
      "6th & 18th · RMIT",
      "#77 / 300+ · Viettel AI Race",
      "Silver · AI Riser",
      "Round 2 · VN Youth Start-up",
    ],
    moreTitle: "And more from the lab",
    allProducts: "All products",
  },
  showcase: {
    builtFor: "Built for",
    recognition: "Recognition",
    readCase: "Read the case study",
    tryLive: "Try it live",
    draft: "Draft",
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
      body: "Pyrium should own the work between AI capability and business value: complete the right workflow, within the right boundaries, at a cost the customer can justify. We earn product by repetition — the same workflow, controls and outcome, proven across customers — before we build a platform.",
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
      "Photography: open-licence images from Wikimedia Commons and StockSnap (CC0 / public domain).",
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
    title: "AI được dùng rộng rãi. Giá trị thực tế thì chưa.",
    body: "Hầu hết tổ chức đã dùng AI ở đâu đó, nhưng tác tử AI thực sự làm được việc vẫn hiếm và khâu giám sát còn chậm. Khó khăn không còn là tiếp cận mô hình — mà là quy trình vận hành tin cậy, quản trị chặt chẽ và chi phí doanh nghiệp chấp nhận được.",
    funnel: {
      title: "Từ dùng AI đến vận hành tác tử",
      rows: [
        { label: "Đã dùng AI trong năm 2025", value: 88, display: "88%" },
        { label: "Dùng AI tạo sinh trong ít nhất một bộ phận", value: 70, display: "70%" },
        { label: "Vận hành tác tử AI, ở gần như mọi bộ phận", value: 8, display: "Dưới 10%" },
      ],
      gap: "Khoảng trống",
      note: "Thanh cuối thể hiện mức “dưới 10%”, không phải số đo chính xác.",
    },
    cio: {
      label:
        "CIO cho biết doanh nghiệp đã thu được giá trị đáng kể hoặc mang tính chuyển đổi từ AI.",
    },
    governance: {
      label: "doanh nghiệp có mô hình quản trị trưởng thành cho tác tử AI tự hành.",
      detail: "3.235 lãnh đạo cấp cao · 24 quốc gia",
    },
    gates: {
      title: "Ít ai biết khi nào nên dừng",
      rows: [
        { value: 31, label: "CIO có quy định dừng dự án thí điểm trước khi triển khai" },
        { value: 17, label: "có quy định loại bỏ AI kém hiệu quả đang vận hành" },
      ],
    },
    chart: {
      title: "Chi tiêu AI toàn cầu",
      unit: "nghìn tỷ USD",
      published: "Dự báo công bố",
      derived: "Tính từ tốc độ tăng trưởng",
      note: "Năm 2026 là dự báo do Gartner công bố (2,7 nghìn tỷ USD, +49,5%). Năm 2025 và 2027 được tính từ tốc độ tăng trưởng trong cùng báo cáo. Chi tiêu toàn cầu là bối cảnh, không phải thị trường của Pyrium.",
    },
    closer:
      "Khoảng trống không nằm ở việc dùng AI. Mà ở việc để AI làm việc thật, an toàn và với chi phí hợp lý — đó là nơi Pyrium hoạt động.",
  },
  core: {
    eyebrow: "Cốt lõi",
    title: "Tác tử. Riêng tư. Tối ưu chi phí.",
    body: "Ba cam kết định hình mọi hệ thống chúng tôi xây dựng. Mỗi cam kết đáp lại một chuyển dịch đang diễn ra trong cách doanh nghiệp ứng dụng AI.",
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
          value: "985 tỷ USD",
          label: "dự báo chi tiêu phần mềm agentic AI vào năm 2030",
          source: "gartner-agentic-2026-02" as SourceId,
        },
      },
      {
        key: "private",
        name: "Private AI",
        promise: "Dữ liệu của bạn. Mô hình của bạn. Hạ tầng của bạn. Quyền kiểm soát của bạn.",
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
          value: "58%",
          label: "CIO chịu áp lực lớn hơn về cắt giảm chi phí AI",
          source: "gartner-cio-2026-10" as SourceId,
        },
      },
    ],
    meet: {
      title: "Nơi cả ba gặp nhau",
      body: "AI làm việc thật, trong phạm vi của bạn, với chi phí mỗi tác vụ mà bạn có thể chứng minh.",
    },
  },
  productsSection: {
    eyebrow: "Sản phẩm",
    title: "Làm trong áp lực thời gian. Được người thật sử dụng.",
    body: "Bốn sản phẩm do các nhà sáng lập thiết kế, xây dựng và ra mắt — mỗi sản phẩm giải một bài toán thật cho một nhóm người dùng cụ thể.",
    stats: [
      { value: "200+", label: "người đã sử dụng sản phẩm của chúng tôi" },
      {
        value: "~80%",
        label: "chi phí vận hành AI thấp hơn so với chỉ dùng đám mây",
        estimate: true,
      },
      { value: "6", label: "giải thưởng & ghi nhận tại hackathon" },
    ],
    estimateMark: "ước tính",
    estimateNote:
      "ước tính — từ các lần đo kiểm của đội: mô hình chạy cục bộ và có định tuyến so với pipeline gọi API đám mây tương đương trên cùng tác vụ.",
    awards: [
      "Top 10 · Vietnam AI Open",
      "Hạng 6 & 18 · RMIT",
      "#77 / 300+ · Viettel AI Race",
      "Silver · AI Riser",
      "Vòng 2 · VN Youth Start-up",
    ],
    moreTitle: "Và nhiều dự án khác",
    allProducts: "Tất cả sản phẩm",
  },
  showcase: {
    builtFor: "Dành cho",
    recognition: "Ghi nhận",
    readCase: "Xem chi tiết dự án",
    tryLive: "Dùng thử",
    draft: "Bản nháp",
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
        role: "Triển khai cốt lõi",
        detail:
          "Quy trình agentic, điều phối, gọi công cụ và tự động hoá — có kiểm tra và bàn giao cho con người.",
        proof: "lantern" as const,
      },
      {
        name: "Pyrium Inference",
        role: "Hiệu quả",
        detail:
          "Định tuyến mô hình, bộ nhớ đệm, chọn mô hình, đánh giá và tinh chỉnh để giảm chi phí mỗi tác vụ thành công.",
        proof: "weatherise" as const,
      },
      {
        name: "Pyrium Private",
        role: "Tin cậy & sẵn sàng",
        detail:
          "Triển khai riêng tư, thiết kế quyền truy cập dữ liệu, khả năng kiểm toán và kiểm soát vận hành.",
        proof: "unfound" as const,
      },
      {
        name: "Pyrium Domain",
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
      body: "Pyrium muốn làm chủ khoảng giữa năng lực AI và giá trị kinh doanh: hoàn thành đúng quy trình, trong đúng giới hạn, với chi phí khách hàng thấy xứng đáng. Chúng tôi xây sản phẩm từ sự lặp lại — cùng một quy trình, cơ chế kiểm soát và kết quả, được chứng minh qua nhiều khách hàng — trước khi xây nền tảng.",
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
      "Hình ảnh: ảnh giấy phép mở từ Wikimedia Commons và StockSnap (CC0 / phạm vi công cộng).",
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
  },
  notFound: { title: "Trang này không tồn tại.", back: "Về trang chủ" },
};

const copies: Record<Lang, Copy> = { en, vi };

export function getCopy(lang: Lang): Copy {
  return copies[lang];
}
