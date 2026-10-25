import type { Lang } from "@/lib/i18n";
import type { LabProject, Product, ProductBase, ProductSlug, ProductText } from "./types";

/**
 * The four core products. Facts come from each project's repository and write-up (mirrored in
 * the founders' portfolio, MyWebsite); headline numbers are restated in plain language for the
 * people who would use the product. Reviews are drafts for a real person in the named role to
 * approve (see `draft`).
 */
const base: Record<ProductSlug, ProductBase> = {
  weatherise: {
    slug: "weatherise",
    name: "Weatherise",
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
  lantern: {
    slug: "lantern",
    name: "The Lantern",
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
  ignis: {
    slug: "ignis",
    name: "IGNIS",
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
    event: "RMIT GenAI & Cybersecurity Hackathon 2026",
    organizers: "RMIT University · Tide",
    period: "10/2026",
    demo: "https://unfound-rmit-hackathon.vercel.app",
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
};

const en: Record<ProductSlug, ProductText> = {
  weatherise: {
    category: "Weather decisions",
    audience: "Tour operators, construction sites and farms in Da Nang",
    tagline: "A forecast is not a decision. Weatherise makes the call.",
    oneLine:
      "Ask whether to sail, pour or spray — and get a clear go or no-go, with the reasons behind it.",
    result: "Top 10 finalist",
    team: "Team of 4",
    problem:
      "Weather apps say “gusts 62 km/h” and stop. Whether a crane must halt, concrete can be poured or a boat tour should sail depends on domain rules no forecast applies. In Central Vietnam, 15–40% of tour bookings are cancelled or postponed when the forecast misses.",
    solution:
      "Ask in English or Vietnamese. Specialist agents gather the missing context, weigh a forecast fused from seven live sources against real safety rules, and return a plan you can act on.",
    metrics: [
      { value: "9 in 10", label: "calls match a local expert's" },
      { value: "0", label: "unsafe go-aheads in 212 stress tests" },
      { value: "< 5 s", label: "from question to a plan" },
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
    captions: [
      "Ask about weather risk for your plans",
      "A go / no-go call with its evidence",
      "Tourism: a weather-aware trip plan",
      "The multi-agent architecture",
    ],
    photoAlt: "Stratocumulus clouds over the ocean",
    review: {
      draft: true,
      quote:
        "Instead of “gusts 62 km/h” I got a clear no-go for the boat tour, and the three reasons behind it.",
      role: "Beta tester · Da Nang travel planner",
    },
  },
  lantern: {
    category: "Voice ordering for FnB",
    audience: "Restaurants and multi-location FnB operators",
    tagline: "A voice maître d’ that never invents a dish.",
    oneLine:
      "Takes a whole table's order by voice, in the guest's language, and keeps the kitchen in sync.",
    team: "Team of 5",
    problem:
      "Real ordering is a conversation full of references: “those two”, “make it the seabass instead”, “that’s all”. Small local models are cheap and private but lose the thread — a six-turn order came out right 0 times in 12. Cloud voice bots add latency and send dining-table audio off-site.",
    solution:
      "The model only interprets: each sentence becomes one structured intent. Deterministic code decides what changes on the order, and a local voice answers in the guest’s language.",
    metrics: [
      { value: "10 / 10", label: "full-table orders taken correctly" },
      { value: "< $1", label: "to run 1,000 orders on local models" },
      { value: "36%", label: "faster replies than the first version" },
    ],
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
    review: {
      draft: true,
      quote:
        "It took a full table’s order in two languages and never added a dish we don’t serve. The kitchen screen won my staff over.",
      role: "Restaurant manager · The Lantern trial",
    },
  },
  ignis: {
    category: "Maintenance evidence",
    audience: "Maintenance and reliability teams in plants and factories",
    tagline: "Models propose, code computes, people approve.",
    oneLine:
      "Turns messy work-order history into reviewed facts, priority alerts and a signed, cited report.",
    problem:
      "Maintenance teams spend much of their time firefighting, and the work-order history they rely on is free text — incomplete and inconsistent. A chat assistant over that history mixes guesses with numbers, so nobody can tell which part of an answer is a fact.",
    solution:
      "A reviewer uploads a work-order export and confirms what the model extracted. Code computes the facts and alerts, cites only the manual passages that apply, and a report is issued only after an expert signs off.",
    metrics: [
      { value: "97%", label: "of work orders read correctly" },
      { value: "1 session", label: "from raw export to a signed report" },
      { value: "100%", label: "of reports signed off by an expert" },
    ],
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
    review: {
      draft: true,
      quote:
        "I could see which number came from the work order, which from the manual and which from the model. That’s the first AI tool I’d let near a report.",
      role: "Maintenance engineer · IGNIS reviewer",
    },
  },
  unfound: {
    category: "Privacy & AI security",
    audience: "Survivors of family violence, and the services that protect them",
    tagline: "Services reach you. No admin can find you.",
    oneLine:
      "A safe address for family-violence survivors: schools, clinics and courts can reach them, but no single insider can see where they live.",
    result: "6th at RMIT SGS · 18th region-wide",
    problem:
      "A survivor’s new address sits in plain text at every school, clinic and court they deal with, and the main threat is insiders and admins — ordinary permissions can’t stop them. Prompt attacks on AI assistants add a second risk, arriving in many languages.",
    solution:
      "Addresses are encrypted in the browser and every access needs a quorum, so no single employee or admin can find a survivor. Alongside it, a detector screens prompts for jailbreaks and injection in four languages.",
    metrics: [
      { value: "0", label: "home addresses stored in plain text" },
      { value: "2 of 3", label: "approvals before anyone sees an address" },
      { value: "98%", label: "attack-detection score, in 4 languages" },
    ],
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
    review: {
      draft: true,
      quote:
        "Most teams treat the admin as the person to trust. Unfound treats the admin as the threat — that’s the right instinct.",
      role: "Judge · RMIT GenAI & Cybersecurity Hackathon",
    },
  },
};

const vi: Record<ProductSlug, ProductText> = {
  weatherise: {
    category: "Ra quyết định theo thời tiết",
    audience: "Công ty du lịch, công trường xây dựng và nhà nông tại Đà Nẵng",
    tagline: "Dự báo chưa phải là quyết định. Weatherise đưa ra quyết định.",
    oneLine:
      "Hỏi có nên ra khơi, đổ bê tông hay phun thuốc — và nhận câu trả lời nên hay không, kèm lý do rõ ràng.",
    result: "Top 10 chung kết",
    team: "Đội 4 người",
    problem:
      "Ứng dụng thời tiết chỉ báo “gió giật 62 km/h” rồi dừng. Cần cẩu có phải ngừng, bê tông có đổ được, tour thuyền có nên chạy hay không phụ thuộc vào quy tắc chuyên ngành mà không bản tin nào áp dụng. Ở miền Trung, 15–40% booking tour bị huỷ hoặc dời khi dự báo sai.",
    solution:
      "Hỏi bằng tiếng Việt hoặc tiếng Anh. Các tác tử chuyên trách thu thập bối cảnh còn thiếu, đối chiếu dự báo tổng hợp từ bảy nguồn với quy tắc an toàn thực tế, và trả về kế hoạch có thể thực hiện ngay.",
    metrics: [
      { value: "9/10", label: "quyết định trùng với chuyên gia địa phương" },
      { value: "0", label: "lần cho phép sai trong 212 bài kiểm thử khó" },
      { value: "< 5 giây", label: "từ câu hỏi đến kế hoạch" },
    ],
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
      "Tầng RAG phía sau NeMo Guardrails khôi phục được 87,2% ngữ cảnh.",
    ],
    captions: [
      "Hỏi về rủi ro thời tiết cho kế hoạch của bạn",
      "Quyết định nên/không nên kèm bằng chứng",
      "Du lịch: lịch trình theo thời tiết",
      "Kiến trúc đa tác tử",
    ],
    photoAlt: "Mây tầng tích phía trên đại dương",
    review: {
      draft: true,
      quote:
        "Thay vì “gió giật 62 km/h”, tôi nhận được câu trả lời rõ ràng là không nên chạy tour thuyền, kèm ba lý do.",
      role: "Người dùng thử · Điều hành tour Đà Nẵng",
    },
  },
  lantern: {
    category: "Gọi món bằng giọng nói cho FnB",
    audience: "Nhà hàng và chuỗi FnB nhiều chi nhánh",
    tagline: "Người phục vụ bằng giọng nói không bao giờ bịa món.",
    oneLine: "Nhận order cả bàn bằng giọng nói, theo ngôn ngữ của khách, và đồng bộ ngay với bếp.",
    team: "Đội 5 người",
    problem:
      "Gọi món thực tế là cuộc hội thoại đầy tham chiếu: “hai món đó”, “đổi sang cá chẽm”, “vậy thôi”. Mô hình nhỏ chạy cục bộ rẻ và riêng tư nhưng dễ mất mạch — một order sáu lượt chỉ đúng 0 trên 12 lần. Bot giọng nói trên đám mây thì chậm và gửi âm thanh tại bàn ra ngoài.",
    solution:
      "Mô hình chỉ diễn giải: mỗi câu nói thành một ý định có cấu trúc. Mã nguồn cố định quyết định order thay đổi thế nào, và giọng nói chạy cục bộ trả lời bằng ngôn ngữ của khách.",
    metrics: [
      { value: "10/10", label: "order cả bàn được ghi nhận chính xác" },
      { value: "< 1 USD", label: "cho 1.000 order với mô hình cục bộ" },
      { value: "36%", label: "phản hồi nhanh hơn phiên bản đầu" },
    ],
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
    review: {
      draft: true,
      quote:
        "Hệ thống nhận order cả bàn bằng hai ngôn ngữ mà chưa từng thêm món nhà hàng không có. Màn hình bếp là thứ khiến nhân viên tin dùng.",
      role: "Quản lý nhà hàng · Dùng thử The Lantern",
    },
  },
  ignis: {
    category: "Bằng chứng bảo trì",
    audience: "Đội bảo trì và độ tin cậy tại nhà máy",
    tagline: "Mô hình đề xuất, mã nguồn tính toán, con người phê duyệt.",
    oneLine:
      "Biến lịch sử phiếu công việc lộn xộn thành dữ kiện đã duyệt, cảnh báo ưu tiên và báo cáo có ký duyệt, trích dẫn.",
    problem:
      "Đội bảo trì dành nhiều thời gian chữa cháy, còn lịch sử phiếu công việc họ dựa vào là văn bản tự do — thiếu và không nhất quán. Trợ lý chat trên dữ liệu đó trộn lẫn phỏng đoán với con số, nên không ai biết phần nào là sự thật.",
    solution:
      "Người kiểm duyệt tải lên dữ liệu phiếu công việc và xác nhận những gì mô hình trích xuất. Mã nguồn tính dữ kiện và cảnh báo, chỉ trích dẫn đoạn tài liệu liên quan, và báo cáo chỉ được phát hành sau khi chuyên gia ký duyệt.",
    metrics: [
      { value: "97%", label: "phiếu công việc được đọc chính xác" },
      { value: "1 phiên", label: "từ dữ liệu thô đến báo cáo có ký duyệt" },
      { value: "100%", label: "báo cáo đều được chuyên gia ký duyệt" },
    ],
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
    review: {
      draft: true,
      quote:
        "Tôi thấy rõ con số nào đến từ phiếu công việc, từ tài liệu hay từ mô hình. Đây là công cụ AI đầu tiên tôi tin để đưa vào báo cáo.",
      role: "Kỹ sư bảo trì · Người kiểm duyệt IGNIS",
    },
  },
  unfound: {
    category: "Quyền riêng tư & an ninh AI",
    audience: "Nạn nhân bạo lực gia đình và các đơn vị bảo vệ họ",
    tagline: "Dịch vụ vẫn liên lạc được. Không quản trị viên nào tìm được bạn.",
    oneLine:
      "Địa chỉ an toàn cho nạn nhân bạo lực gia đình: trường học, phòng khám, toà án vẫn liên lạc được, nhưng không người nội bộ nào tự xem được nơi họ ở.",
    result: "Hạng 6 RMIT SGS · Hạng 18 toàn khu vực",
    problem:
      "Địa chỉ mới của nạn nhân được lưu dạng văn bản thường ở mọi trường học, phòng khám và toà án họ làm việc cùng, và mối đe doạ chính lại đến từ người nội bộ, quản trị viên — phân quyền thông thường không ngăn được. Tấn công prompt vào trợ lý AI là rủi ro thứ hai, đến từ nhiều ngôn ngữ.",
    solution:
      "Địa chỉ được mã hoá ngay trên trình duyệt và mọi lượt truy cập cần đủ số người phê duyệt, nên không nhân viên hay quản trị viên nào tự tìm được nạn nhân. Đi kèm là bộ phát hiện jailbreak và prompt injection cho bốn ngôn ngữ.",
    metrics: [
      { value: "0", label: "địa chỉ nhà lưu dạng văn bản thường" },
      { value: "2/3", label: "người phê duyệt trước khi ai đó xem địa chỉ" },
      { value: "98%", label: "điểm phát hiện tấn công, trên 4 ngôn ngữ" },
    ],
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
    review: {
      draft: true,
      quote:
        "Phần lớn các đội xem quản trị viên là người đáng tin. Unfound xem quản trị viên là mối đe doạ — đó là tư duy đúng.",
      role: "Giám khảo · RMIT GenAI & Cybersecurity Hackathon",
    },
  },
};

const texts: Record<Lang, Record<ProductSlug, ProductText>> = { en, vi };

export const productOrder: ProductSlug[] = ["weatherise", "lantern", "ignis", "unfound"];

export function getProduct(lang: Lang, slug: string): Product | undefined {
  if (!productOrder.includes(slug as ProductSlug)) return undefined;
  const key = slug as ProductSlug;
  return { ...base[key], ...texts[lang][key] };
}

export function getProducts(lang: Lang): Product[] {
  return productOrder.map((slug) => ({ ...base[slug], ...texts[lang][slug] }));
}

/** The product after this one, wrapping around, for the case study's "next" link. */
export function nextProduct(lang: Lang, slug: ProductSlug): Product {
  const index = productOrder.indexOf(slug);
  const next = productOrder[(index + 1) % productOrder.length];
  return { ...base[next], ...texts[lang][next] };
}

const lab: Record<Lang, LabProject[]> = {
  en: [
    {
      name: "ArchitectureLab",
      event: "OpenAI WebMCP Challenge",
      period: "09/2026",
      oneLine:
        "A system-design studio where an AI agent inspects and simulates, and only a person can apply its changes.",
      href: "https://architecturelab.vercel.app",
    },
    {
      name: "LLM Inference Optimization",
      event: "Viettel AI Race 2026",
      period: "07/2026",
      oneLine: "Serving a compact language model fast and cheaply on a single GPU slice.",
      result: "Peak #77 of 300+ nationally",
    },
    {
      name: "Token-Efficient Agent",
      event: "AMD Developer Hackathon: ACT II",
      period: "07/2026",
      oneLine:
        "A hybrid router that answers locally first and calls large models only when needed.",
    },
    {
      name: "AuraLens",
      event: "AI Riser Vietnam 2026 · Google",
      period: "08/2026",
      oneLine: "Gemini Vision outfit checks and a grounded vibe map.",
      result: "Silver tier",
    },
  ],
  vi: [
    {
      name: "ArchitectureLab",
      event: "OpenAI WebMCP Challenge",
      period: "09/2026",
      oneLine:
        "Studio thiết kế hệ thống: tác tử AI kiểm tra và mô phỏng, chỉ con người mới được áp dụng thay đổi.",
      href: "https://architecturelab.vercel.app",
    },
    {
      name: "LLM Inference Optimization",
      event: "Viettel AI Race 2026",
      period: "07/2026",
      oneLine: "Phục vụ mô hình ngôn ngữ gọn nhẹ nhanh và tiết kiệm trên một phần GPU.",
      result: "Hạng cao nhất #77 / 300+ toàn quốc",
    },
    {
      name: "Token-Efficient Agent",
      event: "AMD Developer Hackathon: ACT II",
      period: "07/2026",
      oneLine: "Bộ định tuyến lai: trả lời cục bộ trước, chỉ gọi mô hình lớn khi cần.",
    },
    {
      name: "AuraLens",
      event: "AI Riser Vietnam 2026 · Google",
      period: "08/2026",
      oneLine: "Kiểm tra trang phục bằng Gemini Vision và bản đồ không khí có căn cứ.",
      result: "Hạng Silver",
    },
  ],
};

export function getLabProjects(lang: Lang): LabProject[] {
  return lab[lang];
}
