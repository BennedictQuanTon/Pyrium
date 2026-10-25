import type { Lang } from "@/lib/i18n";
import type { Organizer, Quote, TeamMember } from "./types";

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
  { id: "amd", name: "AMD", logo: "/brand/logos/amd.svg", viewBox: "0 0 24 24" },
  { id: "sea", name: "Sea / Shopee", logo: "/brand/logos/shopee.svg", viewBox: "0 0 24 24" },
  // Academic institutions the team studies and collaborates with.
  { id: "uts", name: "UTS", logo: "/brand/logos/uts.svg", viewBox: "0 0 406.32 406.32" },
  { id: "bku", name: "HCMUT (Bách Khoa)", logo: "/brand/logos/bku.png", viewBox: "0 0 240 240" },
];

/**
 * The three co-founders. Links are the ones each founder publishes; LinkedIn and email for
 * Yoshio and Tuong are pending, and their portfolios point to their GitHub profiles for now.
 */
export const team: TeamMember[] = [
  {
    name: "Yoshio Nomura",
    github: "UniverseScripts",
    role: { en: "DevOps & LLMOps Engineer", vi: "Kỹ sư DevOps & LLMOps" },
    photo: "/team/yoshio.jpg",
    links: { portfolio: "https://github.com/UniverseScripts" },
  },
  {
    name: "Long Quan (Bennedict) Ton",
    github: "BennedictQuanTon",
    role: { en: "AI Engineer", vi: "Kỹ sư AI" },
    photo: "/team/quan.jpg",
    links: {
      linkedin: "https://linkedin.com/in/bennedictquanton",
      email: "tonlongquanvn@gmail.com",
      portfolio: "https://bennedictquanton.vercel.app",
    },
  },
  {
    name: "Huynh Khanh Tuong",
    github: "khanhtuongnakitomo",
    role: { en: "Software Engineer", vi: "Kỹ sư phần mềm" },
    photo: "/team/tuong.jpg",
    links: { portfolio: "https://github.com/khanhtuongnakitomo" },
  },
];

/**
 * Draft testimonials, written by the team for a real person in each role to approve or
 * rewrite. They carry a role, never an invented name; set `draft: false` and add `name` once
 * the person signs off on the exact wording.
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
