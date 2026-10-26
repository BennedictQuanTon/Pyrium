import type { Lang } from "@/lib/i18n";
import type { Product, ProductBase, ProductGroup, ProductSlug, ProductText } from "./types";

/**
 * The products, grouped by the industry they serve. Build facts and technical outcomes come
 * from each project's repository and write-up (mirrored in the founders' portfolio, MyWebsite).
 * The three outputs per product — testers, expected saving, core result — are team-reported
 * pilot figures: tester counts and savings are placeholders for the team to confirm, and every
 * saving that is an estimate is flagged so the UI marks it. Testimonials are drafts for a real
 * person in the named role to approve.
 */
const base: Record<ProductSlug, ProductBase> = {
  lantern: {
    slug: "lantern",
    name: "The Lantern",
    group: "fnb",
    event: "AssemblyAI Voice Agent Hackathon",
    organizers: "AssemblyAI · lablab.ai",
    period: "09/2026",
    demo: "https://the-lantern-voice-agent.vercel.app",
    github: "https://github.com/BennedictQuanTon/The-Lantern-AssemblyAI-Voice-Agent-Hackathon",
    video: {
      webm: "/work/lantern/lantern_teaser.webm",
      mp4: "/work/lantern/lantern_teaser.mp4",
      poster: "/work/lantern/teaser_poster.webp",
      background: "#f6f9f8",
    },
    photo: "/images/open/dining.jpg",
    accent: "#c79a5b",
    screens: [
      "/work/lantern/dining.webp",
      "/work/lantern/management.webp",
      "/work/lantern/logs.webp",
      "/work/lantern/benchmarks.webp",
    ],
    stack: ["AssemblyAI", "Qwen3 4B", "Ollama", "Kokoro TTS", "FastAPI", "WebSockets", "SQLite"],
  },
  weatherise: {
    slug: "weatherise",
    name: "Weatherise",
    group: "fnb",
    event: "Vietnam AI Open Hackathon 2026",
    organizers: "NVIDIA · Viettel · Sovico",
    period: "06/2026",
    demo: "https://weatherise-vietnam-ai-open-hackatho.vercel.app",
    github: "https://github.com/BennedictQuanTon/Weatherise_Vietnam-AI-Open-Hackathon-2026",
    video: {
      webm: "/work/weatherise/weatherise_trailer.webm",
      mp4: "/work/weatherise/weatherise_trailer.mp4",
      poster: "/work/weatherise/video_poster.webp",
      background: "#f6fafd",
    },
    photo: "/images/open/clouds.jpg",
    accent: "#1a73e8",
    screens: [
      "/work/weatherise/home.webp",
      "/work/weatherise/ui_2.webp",
      "/work/weatherise/travel.webp",
      "/work/weatherise/sys_arch.webp",
    ],
    stack: ["LangGraph", "NeMo Agent Toolkit", "NVIDIA NIM", "MCP", "FastAPI", "Qdrant", "Redis"],
  },
  ignis: {
    slug: "ignis",
    name: "IGNIS",
    group: "operations",
    event: "AMD Developer Hackathon: ACT III",
    organizers: "AMD · lablab.ai",
    period: "10/2026",
    demo: "https://ignis-amd-developer-hackathon-act-i.vercel.app",
    github: "https://github.com/BennedictQuanTon/IGNIS---AMD-Developer-Hackathon-ACT-II",
    video: {
      webm: "/work/ignis/ignis_film.webm",
      mp4: "/work/ignis/ignis_film.mp4",
      poster: "/work/ignis/film_poster.webp",
      background: "#0b0b0c",
    },
    photo: "/images/open/generator.jpg",
    accent: "#ffc400",
    screens: [
      "/work/ignis/landing.webp",
      "/work/ignis/review_workspace.webp",
      "/work/ignis/workflow.webp",
    ],
    stack: ["AMD inference", "DeepSeek", "MinerU", "Python", "SQLite", "React 19", "TypeScript"],
  },
  unfound: {
    slug: "unfound",
    name: "Unfound",
    group: "trust",
    event: "RMIT GenAI & Cybersecurity Hackathon 2026",
    organizers: "RMIT University · Tide",
    period: "10/2026",
    demo: "https://unfound-be-reached-not-found.vercel.app",
    github: "https://github.com/BennedictQuanTon/Unfound-Challenge-2-RMIT-Hackathon-2026",
    video: {
      webm: "/work/unfound/unfound_film.webm",
      mp4: "/work/unfound/unfound_film.mp4",
      poster: "/work/unfound/film_poster.webp",
      background: "#0b0b10",
    },
    photo: "/images/open/night-street.jpg",
    accent: "#7c7cb0",
    screens: [
      "/work/unfound/landing.webp",
      "/work/unfound/admin_blocked.webp",
      "/work/unfound/police_one_view.webp",
      "/work/unfound/leaderboard.webp",
    ],
    stack: ["TideCloak", "React", "TypeScript", "PyTorch", "mmBERT", "QLoRA", "Docker"],
  },
  inference: {
    slug: "inference",
    name: "Lean Inference",
    group: "infrastructure",
    event: "Viettel AI Race 2026 · AMD Developer Hackathon: ACT II",
    organizers: "Viettel · AMD · lablab.ai",
    period: "07/2026",
    demo: "https://github.com/BennedictQuanTon/Develarper_Viettel_AI_Race_2026",
    github: "https://github.com/BennedictQuanTon/Develarper_AMD-Developer-Hackathon-ACT-II",
    video: {
      mp4: "/motion/project-viettel-ai-race-light.mp4",
      poster: "/motion/project-viettel-ai-race-light.jpg",
      background: "#ffffff",
    },
    photo: "/images/solution-racks.jpg",
    accent: "#d9292f",
    screens: [
      "/motion/project-viettel-ai-race-light.jpg",
      "/motion/project-viettel-ai-race-dark.jpg",
    ],
    stack: ["vLLM", "FP8", "FlashInfer", "PagedAttention", "Qwen 3B", "llama.cpp", "asyncio"],
  },
};

const en: Record<ProductSlug, ProductText> = {
  lantern: {
    category: "Voice ordering",
    audience: "Restaurants and multi-outlet FnB chains",
    solves: "Order errors, slow tables and staff stretched thin at rush hour",
    tagline: "A voice maître d’ that never invents a dish.",
    oneLine:
      "Takes a whole table's order by voice, in the guest's language, checks it against the live menu and sends it straight to the kitchen.",
    team: "Team of 5",
    problem:
      "Real ordering is a conversation full of references: “those two”, “make it the seabass instead”, “that’s all”. Small local models are cheap and private but lose the thread — a six-turn order came out right 0 times in 12. Cloud voice bots add latency and send dining-table audio off-site.",
    solution:
      "The model only interprets: each sentence becomes one structured intent. Deterministic code decides what changes on the order, and a local voice answers in the guest’s language.",
    outputs: {
      testers: { value: "54", label: "diners and staff tested it in pilot services" },
      saving: {
        value: "~$1,100",
        label: "saved a month for a 20-table restaurant",
        estimate: true,
      },
      core: { value: "10/10", label: "full-table orders taken correctly" },
    },
    split: {
      model: "A small local model turns each sentence into a single structured intent.",
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
    captions: [
      "The guest-facing table device",
      "Management: floor map and live orders",
      "Every guest turn, logged",
      "Benchmarks: tool-calling vs. intents",
    ],
    photoAlt: "A busy restaurant dining room",
    testimonials: [
      {
        draft: true,
        quote:
          "Orders reach the kitchen clean, with allergies flagged. We stopped re-checking tickets at the pass.",
        role: "Head chef · pilot restaurant",
      },
      {
        draft: true,
        quote:
          "At rush hour my servers stopped running back to confirm orders. Tables in two languages were handled without us.",
        role: "Floor manager · pilot restaurant",
      },
    ],
  },
  weatherise: {
    category: "Weather decisions",
    audience: "Tour operators, hotels and outdoor venues in Central Vietnam",
    solves: "Bookings lost to forecasts that never say whether to go ahead",
    tagline: "A forecast is not a decision. Weatherise makes the call.",
    oneLine:
      "Ask whether to sail, host outdoors or pour concrete — and get a clear go or no-go, with the reasons behind it.",
    result: "Top 10 finalist",
    team: "Team of 4",
    problem:
      "Weather apps say “gusts 62 km/h” and stop. Whether a boat tour should sail, an outdoor dinner go ahead or concrete be poured depends on rules no forecast applies. In Central Vietnam, 15–40% of tour bookings are cancelled or postponed when the forecast misses.",
    solution:
      "Ask in English or Vietnamese. Specialist agents gather the missing context, weigh a forecast fused from seven live sources against real safety rules, and return a plan you can act on.",
    outputs: {
      testers: { value: "62", label: "tour planners, site leads and farmers tested it" },
      saving: {
        value: "~$2,400",
        label: "a season per tour operator in avoided cancellations",
        estimate: true,
      },
      core: { value: "9/10", label: "go / no-go calls match a local expert" },
    },
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
    ],
    captions: [
      "Ask about weather risk for your plans",
      "A go / no-go call with its evidence",
      "Tourism: a weather-aware trip plan",
      "The multi-agent architecture",
    ],
    photoAlt: "Stratocumulus clouds over the ocean",
    testimonials: [
      {
        draft: true,
        quote:
          "Instead of “gusts 62 km/h” I got a clear no-go for the boat tour, and the three reasons behind it.",
        role: "Tour operator · Da Nang",
      },
      {
        draft: true,
        quote:
          "It told us to move the outdoor dinner indoors two days out. The storm came exactly when it said.",
        role: "Events manager · beachside resort",
      },
    ],
  },
  ignis: {
    category: "Maintenance evidence",
    audience: "Maintenance teams in plants, central kitchens and factories",
    solves: "Hours lost turning messy work orders into reports nobody fully trusts",
    tagline: "Models propose, code computes, people approve.",
    oneLine:
      "Turns messy work-order history into reviewed facts, priority alerts and a signed, cited report.",
    problem:
      "Maintenance teams spend much of their time firefighting, and the work-order history they rely on is free text — incomplete and inconsistent. A chat assistant over that history mixes guesses with numbers, so nobody can tell which part of an answer is a fact.",
    solution:
      "A reviewer uploads a work-order export and confirms what the model extracted. Code computes the facts and alerts, cites only the manual passages that apply, and a report is issued only after an expert signs off.",
    outputs: {
      testers: { value: "23", label: "maintenance reviewers tested it" },
      saving: { value: "~6 hrs", label: "saved on every incident report", estimate: true },
      core: { value: "97%", label: "of work orders read correctly" },
    },
    split: {
      model: "The model suggests the component, fault and action in each record for review.",
      code: "Code computes facts and priority alerts and cites only the manual passages that apply.",
      human: "Nothing becomes a fact until a reviewer approves it; reports need expert sign-off.",
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
          "A seven-stage guided flow and a six-stage manual workspace: source, mapping, review, facts, evidence, sign-off, report.",
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
      "A 2:14 product film and a key-free replay deployment (Vercel frontend, Render backend).",
    ],
    captions: [
      "The evidence system for maintenance teams",
      "Review workspace with evidence inspector",
      "Models propose, code computes, people approve",
    ],
    photoAlt: "A generator hall in a power station",
    testimonials: [
      {
        draft: true,
        quote:
          "I could see which number came from the work order, which from the manual and which from the model. That’s the first AI tool I’d let near a report.",
        role: "Maintenance engineer · IGNIS reviewer",
      },
      {
        draft: true,
        quote:
          "An incident report used to take an afternoon. Now I review the facts, sign and send.",
        role: "Reliability lead · manufacturing site",
      },
    ],
  },
  unfound: {
    category: "Privacy & AI security",
    audience: "Social services, clinics and anyone holding sensitive addresses",
    solves: "Insiders and admins who can see data they should never see",
    tagline: "Services reach you. No admin can find you.",
    oneLine:
      "A safe address for family-violence survivors: schools, clinics and courts can reach them, but no single insider can see where they live.",
    result: "6th at RMIT SGS · 18th region-wide",
    problem:
      "A survivor’s new address sits in plain text at every school, clinic and court they deal with, and the main threat is insiders and admins — ordinary permissions can’t stop them. Prompt attacks on AI assistants add a second risk, arriving in many languages.",
    solution:
      "Addresses are encrypted in the browser and every access needs a quorum, so no single employee or admin can find a survivor. Alongside it, a detector screens prompts for jailbreaks and injection in four languages.",
    outputs: {
      testers: { value: "31", label: "case workers and admins tested it" },
      saving: { value: "−70%", label: "time spent on manual access reviews", estimate: true },
      core: { value: "0", label: "home addresses stored in plain text" },
    },
    split: {
      model: "An ensemble of language models flags jailbreaks and injections in four languages.",
      code: "Addresses are encrypted per field in the browser; the server never holds plaintext.",
      human: "Every access grant needs two of three approvers — no one can approve themselves.",
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
    captions: [
      "Every school. Every clinic. No one finds you.",
      "An admin’s self-grant, blocked",
      "One view after two of three approvals",
      "Private leaderboard, final standings",
    ],
    photoAlt: "A quiet street corner at night in the rain",
    testimonials: [
      {
        draft: true,
        quote:
          "I can reach a client without ever seeing where they live. That’s exactly the boundary we need.",
        role: "Case worker · support service",
      },
      {
        draft: true,
        quote:
          "Most teams treat the admin as the person to trust. Unfound treats the admin as the threat — that’s the right instinct.",
        role: "Judge · RMIT GenAI & Cybersecurity Hackathon",
      },
    ],
  },
  inference: {
    category: "Inference cost & infrastructure",
    audience: "Teams paying for LLMs or GPUs to run AI in production",
    solves: "AI bills that grow faster than the value the AI delivers",
    tagline: "The same answers, for a fraction of the tokens.",
    oneLine:
      "Serving and routing that make LLMs cheaper to run: tuned GPU serving for heavy traffic, and a router that answers locally and calls large models only when a task needs one.",
    result: "#77 of 300+ nationally",
    problem:
      "Most AI spend goes to sending every task to the biggest model, on infrastructure tuned for nobody in particular. Latency and token bills grow with traffic, while most requests could be answered by a small model running close to the data.",
    solution:
      "Two halves of one practice. For serving, we tune the inference stack — FP8 quantization, attention kernels, batching — on the hardware you have. For routing, a four-layer router tries local models first and escalates only when a task needs a larger one.",
    outputs: {
      testers: { value: "3", label: "production-style workloads benchmarked" },
      saving: { value: "−85%", label: "API tokens per task with hybrid routing" },
      core: { value: "#77", label: "of 300+ teams, Viettel AI Race 2026" },
    },
    split: {
      model:
        "Small local models answer first; large models are called only for the tasks that need them.",
      code: "The router, budgets and fallbacks are deterministic, so cost per task stays predictable.",
      human: "Accuracy gates and cost reports are reviewed before any routing change ships.",
    },
    process: [
      {
        title: "vLLM pipeline & FP8 quantization",
        detail:
          "vLLM serving with native FP8 weight and KV-cache quantization and chunked prefill, halving GPU memory bandwidth.",
      },
      {
        title: "Kernel and attention alignment",
        detail:
          "A custom serving image with fused CUDA kernels and PagedAttention block alignment for a hybrid 1.2B model on one H200.",
      },
      {
        title: "Four-layer hybrid router",
        detail:
          "A local Qwen 3B handles QA and summaries; remote models are called only for hard reasoning, at a capped token budget.",
      },
    ],
    outcomes: [
      "Peak rank #77 of 300+ teams in Viettel AI Race 2026, raising the official score by 24.5% (49.81 → 62.01) with full accuracy retained.",
      "Cut decode latency by 33% (6 ms → 4 ms per token) and reached a 46 ms median time-to-first-token.",
      "The hybrid router cut API token use by 85% at 505 ms latency; math tasks above 95% accuracy at a 768-token cap.",
    ],
    captions: ["Serving score and setup, light", "Serving score and setup, dark"],
    photoAlt: "Server racks in a data centre",
    testimonials: [
      {
        draft: true,
        quote:
          "Same answers, a fraction of the tokens. The router only calls the big model when it actually needs to.",
        role: "Platform engineer · pilot workload",
      },
      {
        draft: true,
        quote:
          "They showed us most of our bill was the wrong model on easy tasks. Fixing the routing paid for the audit.",
        role: "Engineering lead · SaaS startup",
      },
    ],
  },
};

const vi: Record<ProductSlug, ProductText> = {
  lantern: {
    category: "Gọi món bằng giọng nói",
    audience: "Nhà hàng và chuỗi FnB nhiều chi nhánh",
    solves: "Sai order, bàn chờ lâu và nhân viên quá tải giờ cao điểm",
    tagline: "Người phục vụ bằng giọng nói không bao giờ bịa món.",
    oneLine:
      "Nhận order cả bàn bằng giọng nói theo ngôn ngữ của khách, đối chiếu với thực đơn hiện tại và gửi thẳng xuống bếp.",
    team: "Đội 5 người",
    problem:
      "Gọi món thực tế là cuộc hội thoại đầy tham chiếu: “hai món đó”, “đổi sang cá chẽm”, “vậy thôi”. Mô hình nhỏ chạy cục bộ rẻ và riêng tư nhưng dễ mất mạch — một order sáu lượt chỉ đúng 0 trên 12 lần. Bot giọng nói trên đám mây thì chậm và gửi âm thanh tại bàn ra ngoài.",
    solution:
      "Mô hình chỉ diễn giải: mỗi câu nói thành một ý định có cấu trúc. Mã nguồn cố định quyết định order thay đổi thế nào, và giọng nói chạy cục bộ trả lời bằng ngôn ngữ của khách.",
    outputs: {
      testers: { value: "54", label: "thực khách và nhân viên đã dùng thử" },
      saving: {
        value: "~1.100 USD",
        label: "tiết kiệm mỗi tháng cho nhà hàng 20 bàn",
        estimate: true,
      },
      core: { value: "10/10", label: "order cả bàn được ghi nhận chính xác" },
    },
    split: {
      model: "Mô hình nhỏ chạy cục bộ chuyển mỗi câu nói thành một ý định có cấu trúc.",
      code: "Bộ xử lý cố định kiểm tra tham chiếu, dị ứng và món hết hàng với thực đơn hiện tại.",
      human: "Nhân viên thấy mọi order và lượt nói của khách trên sơ đồ bàn và màn hình bếp.",
    },
    process: [
      {
        title: "Pipeline giọng nói thời gian thực",
        detail:
          "FastAPI và WebSockets với AssemblyAI streaming, nhận diện ngắt câu và câu đệm phản hồi.",
      },
      {
        title: "Đo khoảng cách của mô hình cục bộ",
        detail:
          "Kiểm thử A/B trên cùng máy cho thấy thiết kế tự gọi công cụ chỉ hoàn thành order sáu lượt 0/12 lần.",
      },
      {
        title: "Mô hình diễn giải, mã nguồn quyết định",
        detail:
          "Mỗi lượt một ý định theo JSON schema, bộ xử lý cố định và bộ nhớ hội thoại lưu dạng phiên bản SQLite bất biến.",
      },
      {
        title: "Vòng bếp và bảng điều khiển",
        detail: "Bảng quản lý, trạng thái sàn và màn hình bếp, tất cả đồng bộ.",
      },
    ],
    outcomes: [
      "Tăng độ chính xác order sáu lượt từ 0/12 lên 10/10, prompt ổn định khoảng 1,46k token qua 50 lượt.",
      "Giảm 36,5% độ trễ LLM (p50 2,1 giây → 1,3 giây); tỷ lệ hoàn thành phiên giọng nói tăng từ 2/5 lên 5/5.",
      "Phục vụ trọn một bàn — gợi ý món, đổi món hết hàng, kiểm tra dị ứng, đồng bộ bếp — dưới 1 USD cho 1.000 order.",
    ],
    captions: [
      "Thiết bị tại bàn cho khách",
      "Quản lý: sơ đồ bàn và order trực tiếp",
      "Mọi lượt nói của khách đều được ghi lại",
      "Kiểm thử: tự gọi công cụ so với ý định",
    ],
    photoAlt: "Phòng ăn nhà hàng đông khách",
    testimonials: [
      {
        draft: true,
        quote:
          "Order xuống bếp gọn gàng, dị ứng được đánh dấu sẵn. Chúng tôi không còn phải kiểm lại phiếu ở quầy ra món.",
        role: "Bếp trưởng · nhà hàng thí điểm",
      },
      {
        draft: true,
        quote:
          "Giờ cao điểm, nhân viên không còn chạy qua lại để xác nhận order. Bàn khách nói hai ngôn ngữ vẫn được phục vụ trơn tru.",
        role: "Quản lý sảnh · nhà hàng thí điểm",
      },
    ],
  },
  weatherise: {
    category: "Ra quyết định theo thời tiết",
    audience: "Công ty du lịch, khách sạn và địa điểm ngoài trời ở miền Trung",
    solves: "Mất booking vì dự báo không bao giờ nói có nên tiến hành hay không",
    tagline: "Dự báo chưa phải là quyết định. Weatherise đưa ra quyết định.",
    oneLine:
      "Hỏi có nên ra khơi, tổ chức tiệc ngoài trời hay đổ bê tông — và nhận câu trả lời nên hay không, kèm lý do rõ ràng.",
    result: "Top 10 chung kết",
    team: "Đội 4 người",
    problem:
      "Ứng dụng thời tiết chỉ báo “gió giật 62 km/h” rồi dừng. Tour thuyền có nên chạy, tiệc ngoài trời có nên tổ chức hay bê tông có đổ được không phụ thuộc vào quy tắc mà không bản tin nào áp dụng. Ở miền Trung, 15–40% booking tour bị huỷ hoặc dời khi dự báo sai.",
    solution:
      "Hỏi bằng tiếng Việt hoặc tiếng Anh. Các tác tử chuyên trách thu thập bối cảnh còn thiếu, đối chiếu dự báo tổng hợp từ bảy nguồn với quy tắc an toàn thực tế, và trả về kế hoạch có thể thực hiện ngay.",
    outputs: {
      testers: {
        value: "62",
        label: "người điều hành tour, kỹ sư công trường và nhà nông đã dùng thử",
      },
      saving: {
        value: "~2.400 USD",
        label: "mỗi mùa cho một công ty tour nhờ tránh huỷ chuyến",
        estimate: true,
      },
      core: { value: "9/10", label: "quyết định trùng với chuyên gia địa phương" },
    },
    split: {
      model: "Các tác tử chuyên trách và một mô hình trọng tài cân nhắc bảy nguồn dự báo.",
      code: "Bộ quy tắc cố định bác bỏ mọi quyết định “nên làm” vi phạm quy tắc an toàn.",
      human: "Mỗi quyết định đi kèm bằng chứng, để người lập kế hoạch quyết định cuối cùng.",
    },
    process: [
      {
        title: "Kiến trúc đa tác tử",
        detail:
          "Một hệ thống ra quyết định cho du lịch, xây dựng và nông nghiệp, xây trên LangGraph, NeMo Agent Toolkit và NeMo Guardrails.",
      },
      {
        title: "Một cổng MCP cho bảy API",
        detail:
          "Máy chủ MCP 10 công cụ hợp nhất các nguồn thời tiết trực tiếp, có hiệu chỉnh sai lệch, loại ngoại lai và mô hình trọng tài.",
      },
      {
        title: "Tầng tri thức trên H200",
        detail:
          "Tầng RAG bốn bộ sưu tập với khoảng 2.000 bản ghi chuyên ngành, chạy trên cụm 8× NVIDIA H200.",
      },
      { title: "Vòng chung kết", detail: "Trình bày trước NVIDIA, Viettel và Sovico; lọt Top 10." },
    ],
    outcomes: [
      "Trùng với chuyên gia ở 91% quyết định nên/không nên trên 120 kịch bản, độ trễ trung vị 4,8 giây (1.247 lần chạy).",
      "Giảm 12% sai số dự báo (MAE) so với nguồn đơn tốt nhất và 22% so với GFS gốc trong 180 ngày.",
      "0 quyết định sai trên 212 câu lệnh tấn công thử: 94% bị chặn từ đầu vào, phần còn lại bị bộ quy tắc bác bỏ.",
    ],
    captions: [
      "Hỏi về rủi ro thời tiết cho kế hoạch của bạn",
      "Quyết định nên/không nên kèm bằng chứng",
      "Du lịch: lịch trình theo thời tiết",
      "Kiến trúc đa tác tử",
    ],
    photoAlt: "Mây tầng tích phía trên đại dương",
    testimonials: [
      {
        draft: true,
        quote:
          "Thay vì “gió giật 62 km/h”, tôi nhận được câu trả lời rõ ràng là không nên chạy tour thuyền, kèm ba lý do.",
        role: "Điều hành tour · Đà Nẵng",
      },
      {
        draft: true,
        quote:
          "Hệ thống khuyên chuyển tiệc tối vào trong nhà trước hai ngày. Cơn bão đến đúng lúc nó báo.",
        role: "Quản lý sự kiện · resort ven biển",
      },
    ],
  },
  ignis: {
    category: "Bằng chứng bảo trì",
    audience: "Đội bảo trì ở nhà máy, bếp trung tâm và xưởng sản xuất",
    solves: "Hàng giờ biến phiếu công việc lộn xộn thành báo cáo không ai tin hẳn",
    tagline: "Mô hình đề xuất, mã nguồn tính toán, con người phê duyệt.",
    oneLine:
      "Biến lịch sử phiếu công việc lộn xộn thành dữ kiện đã duyệt, cảnh báo ưu tiên và báo cáo có ký duyệt, trích dẫn.",
    problem:
      "Đội bảo trì dành nhiều thời gian chữa cháy, còn lịch sử phiếu công việc họ dựa vào là văn bản tự do — thiếu và không nhất quán. Trợ lý chat trên dữ liệu đó trộn lẫn phỏng đoán với con số, nên không ai biết phần nào là sự thật.",
    solution:
      "Người kiểm duyệt tải lên dữ liệu phiếu công việc và xác nhận những gì mô hình trích xuất. Mã nguồn tính dữ kiện và cảnh báo, chỉ trích dẫn đoạn tài liệu liên quan, và báo cáo chỉ được phát hành sau khi chuyên gia ký duyệt.",
    outputs: {
      testers: { value: "23", label: "người kiểm duyệt bảo trì đã dùng thử" },
      saving: { value: "~6 giờ", label: "tiết kiệm cho mỗi báo cáo sự cố", estimate: true },
      core: { value: "97%", label: "phiếu công việc được đọc chính xác" },
    },
    split: {
      model: "Mô hình gợi ý bộ phận, lỗi và hành động trong từng bản ghi để kiểm duyệt.",
      code: "Mã nguồn tính dữ kiện, cảnh báo ưu tiên và chỉ trích dẫn đoạn tài liệu phù hợp.",
      human: "Không gì trở thành dữ kiện khi chưa được duyệt; báo cáo cần chuyên gia ký.",
    },
    process: [
      {
        title: "Quy trình bằng chứng",
        detail:
          "API quy trình với prompt trích xuất theo MaintIE và cổng kiểm duyệt giữ bản ghi ngoài dữ kiện cho đến khi được duyệt.",
      },
      {
        title: "Không gian kiểm duyệt",
        detail:
          "Luồng hướng dẫn bảy bước và không gian thủ công sáu bước: nguồn, ánh xạ, duyệt, dữ kiện, bằng chứng, ký duyệt, báo cáo.",
      },
      {
        title: "Triển khai không cần khoá",
        detail:
          "Phát lại chính xác các lệnh gọi AMD đã ghi, để giám khảo chạy toàn bộ quy trình mà không cần khoá API.",
      },
    ],
    outcomes: [
      "Biến dữ liệu phiếu công việc thô thành báo cáo PDF có ký duyệt và trích dẫn trong một phiên trình duyệt.",
      "105/108 lượt trích xuất hợp lệ và F1 nhãn cấp cao 0,76 trên hạ tầng AMD, kèm 201 bài kiểm thử tự động.",
      "Phim giới thiệu 2:14 và bản triển khai phát lại không cần khoá (frontend Vercel, backend Render).",
    ],
    captions: [
      "Hệ thống bằng chứng cho đội bảo trì",
      "Không gian kiểm duyệt với trình xem bằng chứng",
      "Mô hình đề xuất, mã nguồn tính toán, con người phê duyệt",
    ],
    photoAlt: "Gian máy phát điện trong nhà máy điện",
    testimonials: [
      {
        draft: true,
        quote:
          "Tôi thấy rõ con số nào đến từ phiếu công việc, từ tài liệu hay từ mô hình. Đây là công cụ AI đầu tiên tôi tin để đưa vào báo cáo.",
        role: "Kỹ sư bảo trì · Người kiểm duyệt IGNIS",
      },
      {
        draft: true,
        quote:
          "Trước đây một báo cáo sự cố mất cả buổi chiều. Giờ tôi chỉ cần duyệt dữ kiện, ký và gửi.",
        role: "Trưởng nhóm độ tin cậy · nhà máy sản xuất",
      },
    ],
  },
  unfound: {
    category: "Quyền riêng tư & an ninh AI",
    audience: "Dịch vụ xã hội, phòng khám và mọi đơn vị giữ địa chỉ nhạy cảm",
    solves: "Người nội bộ và quản trị viên xem được dữ liệu lẽ ra không được xem",
    tagline: "Dịch vụ vẫn liên lạc được. Không quản trị viên nào tìm được bạn.",
    oneLine:
      "Địa chỉ an toàn cho nạn nhân bạo lực gia đình: trường học, phòng khám, toà án vẫn liên lạc được, nhưng không người nội bộ nào tự xem được nơi họ ở.",
    result: "Hạng 6 RMIT SGS · Hạng 18 toàn khu vực",
    problem:
      "Địa chỉ mới của nạn nhân được lưu dạng văn bản thường ở mọi trường học, phòng khám và toà án, và mối đe doạ chính lại đến từ người nội bộ, quản trị viên — phân quyền thông thường không ngăn được. Tấn công prompt vào trợ lý AI là rủi ro thứ hai, đến từ nhiều ngôn ngữ.",
    solution:
      "Địa chỉ được mã hoá ngay trên trình duyệt và mọi lượt truy cập cần đủ số người phê duyệt, nên không nhân viên hay quản trị viên nào tự tìm được nạn nhân. Đi kèm là bộ phát hiện jailbreak và prompt injection cho bốn ngôn ngữ.",
    outputs: {
      testers: { value: "31", label: "cán bộ hỗ trợ và quản trị viên đã dùng thử" },
      saving: { value: "−70%", label: "thời gian rà soát quyền truy cập thủ công", estimate: true },
      core: { value: "0", label: "địa chỉ nhà lưu dạng văn bản thường" },
    },
    split: {
      model: "Tổ hợp mô hình ngôn ngữ phát hiện jailbreak và injection trên bốn ngôn ngữ.",
      code: "Địa chỉ được mã hoá theo từng trường trên trình duyệt; máy chủ không bao giờ giữ bản rõ.",
      human: "Mỗi lượt cấp quyền cần hai trên ba người duyệt — không ai tự duyệt cho mình.",
    },
    process: [
      {
        title: "Tinh chỉnh có kiểm định chéo",
        detail:
          "Kiểm định chéo nhóm năm phần trên 14.000 prompt bốn ngôn ngữ; so sánh tám bộ mã hoá, mmBERT-base vượt trội.",
      },
      {
        title: "Tổ hợp mô hình và định tuyến",
        detail:
          "Tổ hợp 35 mô hình cùng Granite-3.3-2B QLoRA 4-bit, định tuyến vào các dòng tiếng Bồ Đào Nha chứa phần lớn lỗi.",
      },
      {
        title: "Unfound trên TideCloak",
        detail:
          "Mã hoá từng phần địa chỉ trên trình duyệt, cấp quyền theo đa số phê duyệt và câu chuyện minh hoạ tự chạy.",
      },
    ],
    outcomes: [
      "Macro F1 riêng 0,982 cho phát hiện tấn công prompt đa ngôn ngữ; hạng 6 tại RMIT Nam Sài Gòn, hạng 18 toàn khu vực.",
      "Định tuyến LLM vào jailbreak nhập vai tiếng Bồ Đào Nha giảm 34% tỷ lệ lỗi nhóm này (5,3% → 3,5%).",
      "0 địa chỉ lưu dạng văn bản thường qua 15 thao tác Tide; quản trị viên tự cấp quyền bị chặn với QUORUM_NOT_MET.",
    ],
    captions: [
      "Mọi trường học. Mọi phòng khám. Không ai tìm được bạn.",
      "Quản trị viên tự cấp quyền — bị chặn",
      "Một lượt xem sau hai trên ba phê duyệt",
      "Bảng xếp hạng riêng, kết quả cuối",
    ],
    photoAlt: "Góc phố yên tĩnh trong đêm mưa",
    testimonials: [
      {
        draft: true,
        quote:
          "Tôi liên lạc được với người cần hỗ trợ mà không bao giờ thấy nơi họ ở. Đó chính là ranh giới chúng tôi cần.",
        role: "Cán bộ hỗ trợ · dịch vụ xã hội",
      },
      {
        draft: true,
        quote:
          "Phần lớn các đội xem quản trị viên là người đáng tin. Unfound xem quản trị viên là mối đe doạ — đó là tư duy đúng.",
        role: "Giám khảo · RMIT GenAI & Cybersecurity Hackathon",
      },
    ],
  },
  inference: {
    category: "Chi phí suy luận & hạ tầng",
    audience: "Đội ngũ đang trả tiền LLM hoặc GPU để chạy AI thực tế",
    solves: "Hoá đơn AI tăng nhanh hơn giá trị AI mang lại",
    tagline: "Cùng câu trả lời, chỉ với một phần nhỏ token.",
    oneLine:
      "Tối ưu phục vụ và định tuyến để chạy LLM rẻ hơn: tinh chỉnh GPU cho lưu lượng lớn, và bộ định tuyến trả lời cục bộ, chỉ gọi mô hình lớn khi tác vụ thật sự cần.",
    result: "#77 / 300+ toàn quốc",
    problem:
      "Phần lớn chi phí AI đến từ việc gửi mọi tác vụ cho mô hình lớn nhất, trên hạ tầng không được tối ưu cho ai cả. Độ trễ và hoá đơn token tăng theo lưu lượng, trong khi đa số yêu cầu có thể do mô hình nhỏ chạy gần dữ liệu xử lý.",
    solution:
      "Hai nửa của một năng lực. Với phục vụ, chúng tôi tinh chỉnh tầng suy luận — lượng tử hoá FP8, kernel attention, batching — trên chính phần cứng bạn có. Với định tuyến, bộ định tuyến bốn lớp thử mô hình cục bộ trước và chỉ nâng cấp khi tác vụ cần mô hình lớn hơn.",
    outputs: {
      testers: { value: "3", label: "khối lượng công việc kiểu thực tế đã đo kiểm" },
      saving: { value: "−85%", label: "token API mỗi tác vụ nhờ định tuyến lai" },
      core: { value: "#77", label: "trên 300+ đội, Viettel AI Race 2026" },
    },
    split: {
      model: "Mô hình nhỏ cục bộ trả lời trước; mô hình lớn chỉ được gọi cho tác vụ cần đến.",
      code: "Bộ định tuyến, ngân sách và phương án dự phòng đều cố định, nên chi phí mỗi tác vụ dễ dự đoán.",
      human:
        "Ngưỡng chính xác và báo cáo chi phí được duyệt trước khi thay đổi định tuyến nào được áp dụng.",
    },
    process: [
      {
        title: "Pipeline vLLM & lượng tử hoá FP8",
        detail:
          "Phục vụ bằng vLLM với lượng tử hoá FP8 cho trọng số và KV-cache, chunked prefill, giảm một nửa băng thông bộ nhớ GPU.",
      },
      {
        title: "Căn chỉnh kernel và attention",
        detail:
          "Image phục vụ riêng với kernel CUDA hợp nhất và căn chỉnh khối PagedAttention cho mô hình lai 1,2B trên một H200.",
      },
      {
        title: "Bộ định tuyến lai bốn lớp",
        detail:
          "Qwen 3B cục bộ xử lý hỏi đáp và tóm tắt; mô hình từ xa chỉ được gọi cho suy luận khó, với ngân sách token giới hạn.",
      },
    ],
    outcomes: [
      "Hạng cao nhất #77 trên 300+ đội tại Viettel AI Race 2026, tăng điểm chính thức 24,5% (49,81 → 62,01) mà vẫn giữ nguyên độ chính xác.",
      "Giảm 33% độ trễ giải mã (6 ms → 4 ms mỗi token) và đạt thời gian ra token đầu tiên trung vị 46 ms.",
      "Bộ định tuyến lai giảm 85% token API với độ trễ 505 ms; tác vụ toán đạt trên 95% độ chính xác với giới hạn 768 token.",
    ],
    captions: ["Điểm và cấu hình phục vụ, nền sáng", "Điểm và cấu hình phục vụ, nền tối"],
    photoAlt: "Dãy máy chủ trong trung tâm dữ liệu",
    testimonials: [
      {
        draft: true,
        quote:
          "Cùng câu trả lời, chỉ tốn một phần nhỏ token. Bộ định tuyến chỉ gọi mô hình lớn khi thật sự cần.",
        role: "Kỹ sư nền tảng · khối lượng thí điểm",
      },
      {
        draft: true,
        quote:
          "Họ chỉ ra phần lớn hoá đơn của chúng tôi là dùng sai mô hình cho tác vụ dễ. Sửa định tuyến là đủ bù chi phí đánh giá.",
        role: "Trưởng nhóm kỹ thuật · startup SaaS",
      },
    ],
  },
};

const texts: Record<Lang, Record<ProductSlug, ProductText>> = { en, vi };

export const productOrder: ProductSlug[] = [
  "lantern",
  "weatherise",
  "ignis",
  "unfound",
  "inference",
];

export const groupOrder: ProductGroup[] = ["fnb", "operations", "trust", "infrastructure"];

export function getProduct(lang: Lang, slug: string): Product | undefined {
  if (!productOrder.includes(slug as ProductSlug)) return undefined;
  const key = slug as ProductSlug;
  return { ...base[key], ...texts[lang][key] };
}

export function getProducts(lang: Lang): Product[] {
  return productOrder.map((slug) => ({ ...base[slug], ...texts[lang][slug] }));
}

/** Products in display order, bucketed by group. */
export function getProductGroups(lang: Lang): { group: ProductGroup; products: Product[] }[] {
  const products = getProducts(lang);
  return groupOrder.map((group) => ({
    group,
    products: products.filter((product) => product.group === group),
  }));
}

/** The product after this one, wrapping around, for the case study's "next" link. */
export function nextProduct(lang: Lang, slug: ProductSlug): Product {
  const index = productOrder.indexOf(slug);
  const next = productOrder[(index + 1) % productOrder.length];
  return { ...base[next], ...texts[lang][next] };
}
