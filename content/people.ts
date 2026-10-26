import type { Lang } from "@/lib/i18n";
import type { Organizer, ProductSlug, Quote, TeamMember } from "./types";

/**
 * Organizers, sponsors and platforms of events the team built at together. Logos are real
 * marks pulled from public sources (simple-icons CDN, Wikimedia Commons, vendor sites) and
 * normalized to one graphite fill in public/brand/logos; brands without a public mark render
 * as a plain wordmark in the same tone, which is the trademark-safe default anyway.
 */
export const organizers: Organizer[] = [
  { id: "nvidia", name: "NVIDIA", logo: "/brand/logos/nvidia.svg", viewBox: "0 0 24 24" },
  { id: "viettel", name: "Viettel", logo: "/brand/logos/viettel.svg", viewBox: "0 0 800 170" },
  { id: "sovico", name: "SOVICO", logo: "/brand/logos/sovico.png", viewBox: "0 0 187 116" },
  {
    id: "google",
    name: "Google",
    logo: "/brand/logos/google.svg",
    viewBox: "0 0 272 92",
  },
  { id: "openacc", name: "OpenACC" },
  { id: "assemblyai", name: "AssemblyAI" },
  { id: "lablab", name: "lablab.ai" },
  { id: "openai", name: "OpenAI", logo: "/brand/logos/openai.svg", viewBox: "0 0 1180 320" },
  { id: "devpost", name: "Devpost", logo: "/brand/logos/devpost.svg", viewBox: "0 0 24 24" },
  { id: "amd", name: "AMD", logo: "/brand/logos/amd.svg", viewBox: "0 7.4 24 9.2" },
  { id: "sea", name: "Sea / Shopee", logo: "/brand/logos/shopee.svg", viewBox: "0 0 24 24" },
  {
    id: "gigabyte",
    name: "GIGABYTE",
    logo: "/brand/logos/gigabyte.svg",
    viewBox: "0 0 626.172 135.109",
  },
  { id: "rmit", name: "RMIT University", logo: "/brand/logos/rmit.svg", viewBox: "0 0 893 314" },
  // Academic institutions the team studies and collaborates with.
  { id: "uts", name: "UTS", logo: "/brand/logos/uts.svg", viewBox: "73 74 269 257" },
  { id: "bku", name: "HCMUT (Bách Khoa)", logo: "/brand/logos/bku.png", viewBox: "0 0 240 240" },
];

/**
 * Which organizers each product was built with, by organizer name; names without an entry in
 * `organizers` render as a plain wordmark.
 */
export const collaborations: { product: ProductSlug; with: string[] }[] = [
  { product: "weatherise", with: ["NVIDIA", "Viettel", "SOVICO"] },
  { product: "inference", with: ["Viettel", "AMD", "lablab.ai"] },
  { product: "lantern", with: ["AssemblyAI", "lablab.ai"] },
  { product: "ignis", with: ["AMD", "lablab.ai"] },
  { product: "unfound", with: ["RMIT University", "Tide"] },
];

/**
 * The three co-founders. Links are the ones each founder publishes; LinkedIn and email for
 * Yoshio and Tuong are pending, and their portfolios point to their GitHub profiles for now.
 */
export const team: TeamMember[] = [
  {
    name: "Long Quan Ton",
    github: "BennedictQuanTon",
    role: { en: "AI Engineer · Product Design", vi: "Kỹ sư AI · Thiết kế sản phẩm" },
    photo: "/team/quan.jpg",
    links: {
      linkedin: "https://linkedin.com/in/bennedictquanton",
      email: "tonlongquanvn@gmail.com",
      portfolio: "https://bennedictquanton.vercel.app",
    },
    experience: [
      {
        company: "AITechLab · HCMUT",
        logo: "/team/companies/hcmut.webp",
        role: { en: "AI Research Assistant", vi: "Trợ lý nghiên cứu AI" },
        period: { en: "Aug 2026 – Present", vi: "08/2026 – nay" },
      },
      {
        company: "FlyRank AI",
        logo: "/team/companies/flyrank.svg",
        role: { en: "AI Engineering Intern", vi: "Thực tập sinh kỹ sư AI" },
        period: { en: "Jul – Oct 2026", vi: "07 – 10/2026" },
      },
      {
        company: "GlobalTech SJC Vietnam",
        logo: "/team/companies/globaltech.webp",
        role: {
          en: "Data Annotator & Quality Control",
          vi: "Gán nhãn dữ liệu & Kiểm soát chất lượng",
        },
        period: { en: "May 2026 – Present", vi: "05/2026 – nay" },
      },
    ],
    // Draft profile, written for Quan to review.
    profile: {
      en: {
        about:
          "Quan leads Pyrium's AI and product work. He takes a messy operational problem, draws the boundary of what an agent may and may not do, and then designs the product people actually touch around it — so the model proposes, code decides and a person approves.",
        strengths: [
          "Agentic systems: multi-agent routing, tool gateways and human approval, including a four-layer router that cut tokens by 85%",
          "Hands-on GenAI: 60+ models fine-tuned, RAG served on 8×H200, evaluated on cost per successful task",
          "Product design, from the workflow map to the screen staff actually use",
          "Reads the business first, turning how a team operates into requirements an agent can meet",
          "Takes an idea to the team's lead prototype, as project lead on Weatherise and on stage pitching at ACE",
        ],
        recognition: {
          figures: [
            { value: "11", label: "hackathons and product competitions" },
            { value: "6", label: "awards and honours, incl. the UTS Dean's List" },
            { value: "15", label: "professional certificates" },
          ],
          by: ["GIGABYTE", "NVIDIA", "Viettel", "Google", "RMIT University", "UTS"],
        },
      },
      vi: {
        about:
          "Quân phụ trách AI và sản phẩm của Pyrium. Anh bắt đầu từ một vấn đề vận hành còn rối, vạch rõ ranh giới tác tử được và không được làm gì, rồi thiết kế sản phẩm mà người dùng thực sự chạm vào — để mô hình đề xuất, mã nguồn quyết định và con người phê duyệt.",
        strengths: [
          "Hệ thống tác tử: điều phối đa tác tử, cổng công cụ và phê duyệt của con người, gồm bộ định tuyến bốn lớp giảm 85% token",
          "GenAI thực chiến: tinh chỉnh hơn 60 mô hình, RAG chạy trên 8×H200, đo bằng chi phí trên mỗi tác vụ thành công",
          "Thiết kế sản phẩm, từ bản đồ quy trình đến màn hình nhân viên thật sự dùng",
          "Hiểu nghiệp vụ trước, biến cách một đội vận hành thành yêu cầu mà tác tử đáp ứng được",
          "Đưa ý tưởng thành prototype chính của nhóm, dẫn dắt Weatherise và trực tiếp pitch trên sân khấu ACE",
        ],
        recognition: {
          figures: [
            { value: "11", label: "hackathon và cuộc thi sản phẩm" },
            { value: "6", label: "giải thưởng và danh hiệu, gồm Dean's List UTS" },
            { value: "15", label: "chứng chỉ chuyên môn" },
          ],
          by: ["GIGABYTE", "NVIDIA", "Viettel", "Google", "RMIT University", "UTS"],
        },
      },
    },
  },
  {
    name: "Yoshio Nomura",
    github: "UniverseScripts",
    role: { en: "DevOps & LLMOps Engineer", vi: "Kỹ sư DevOps & LLMOps" },
    photo: "/team/yoshio.jpg",
    links: { portfolio: "https://github.com/UniverseScripts" },
  },
  {
    name: "Huynh Khanh Tuong",
    github: "khanhtuongnakitomo",
    role: { en: "Software Engineer · Logic & QA", vi: "Kỹ sư phần mềm · Logic & Kiểm thử" },
    photo: "/team/tuong.jpg",
    links: { portfolio: "https://github.com/khanhtuongnakitomo" },
  },
];

/**
 * Testimonials credited to roles, never names: the site shows each as "Anonymous" with an
 * illustration. `draft` stays true until the person in that role approves the wording.
 */
const quotes: Record<Lang, Quote[]> = {
  en: [
    {
      draft: true,
      quote:
        "Most teams showed a chatbot. Pyrium showed a decision with the evidence attached — and a rule engine that refused to let the model guess.",
      role: "Mentor · Vietnam AI Open Hackathon",
    },
    {
      draft: true,
      quote:
        "It took a full table’s order in two languages and never added a dish we don’t serve. My staff trusted it by the second service.",
      role: "Restaurant manager · The Lantern trial",
    },
    {
      draft: true,
      quote:
        "They measure before they claim. Every number they showed came with the test set it was measured on.",
      role: "Research advisor · AITechLab, HCMUT",
    },
    {
      draft: true,
      quote:
        "I could tell which figure came from our records, which from the manual and which from the model. That separation is the product.",
      role: "Maintenance engineer · IGNIS reviewer",
    },
    {
      draft: true,
      quote:
        "Unfound treats the admin as the threat model, not an afterthought. Quorum approval for every grant is exactly right.",
      role: "Judge · RMIT GenAI & Cybersecurity Hackathon",
    },
    {
      draft: true,
      quote:
        "Instead of a wind speed, I got a go or no-go for the boat tour and the reasons behind it. That’s what I actually needed.",
      role: "Beta tester · Weatherise",
    },
  ],
  vi: [
    {
      draft: true,
      quote:
        "Hầu hết các đội trình bày một chatbot. Pyrium trình bày một quyết định kèm bằng chứng — và bộ quy tắc không cho mô hình đoán mò.",
      role: "Mentor · Vietnam AI Open Hackathon",
    },
    {
      draft: true,
      quote:
        "Hệ thống nhận order cả bàn bằng hai ngôn ngữ mà chưa từng thêm món nhà hàng không có. Đến ca thứ hai nhân viên đã tin dùng.",
      role: "Quản lý nhà hàng · Dùng thử The Lantern",
    },
    {
      draft: true,
      quote: "Họ đo lường trước khi tuyên bố. Mọi con số đều đi kèm bộ kiểm thử dùng để đo.",
      role: "Cố vấn nghiên cứu · AITechLab, HCMUT",
    },
    {
      draft: true,
      quote:
        "Tôi phân biệt được con số nào từ hồ sơ, từ tài liệu hay từ mô hình. Sự tách bạch đó chính là giá trị sản phẩm.",
      role: "Kỹ sư bảo trì · Người kiểm duyệt IGNIS",
    },
    {
      draft: true,
      quote:
        "Unfound xem quản trị viên là mối đe doạ ngay từ thiết kế. Yêu cầu đa số phê duyệt cho mọi lượt cấp quyền là hoàn toàn đúng.",
      role: "Giám khảo · RMIT GenAI & Cybersecurity Hackathon",
    },
    {
      draft: true,
      quote:
        "Thay vì tốc độ gió, tôi nhận được câu trả lời có nên chạy tour thuyền hay không và lý do. Đó đúng là thứ tôi cần.",
      role: "Người dùng thử · Weatherise",
    },
  ],
};

export function getTestimonials(lang: Lang): Quote[] {
  return quotes[lang];
}
