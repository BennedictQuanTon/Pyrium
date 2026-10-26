import type { Source, SourceId } from "./types";

/**
 * Every source the site cites, with the date the team last checked the figure on the
 * publisher's page. Survey and vendor figures keep the scope their publishers state; the page
 * text says which market each number describes.
 */
export const sources = {
  "nra-2026-07": {
    id: "nra-2026-07",
    publisher: "National Restaurant Association",
    date: "8 Jul 2026",
    title: "Elevated costs continue to pressure restaurant profitability",
    url: "https://www.restaurant.org/research-and-media/research/restaurant-economic-insights/analysis-commentary/elevated-costs-continue-to-pressure-restaurant-profitability/",
    accessed: "26 Oct 2026",
  },
  "ahla-2026-03": {
    id: "ahla-2026-03",
    publisher: "American Hotel & Lodging Association",
    date: "17 Mar 2026",
    title:
      "Rising cost, staffing challenges persist for hotels as travel demand expected to hold steady (246 hoteliers)",
    url: "https://www.ahla.com/news/rising-cost-staffing-challenges-persist-hotels-travel-demand-expected-hold-steady",
    accessed: "26 Oct 2026",
  },
  "siemens-2024": {
    id: "siemens-2024",
    publisher: "Siemens",
    date: "2024",
    title: "The True Cost of Downtime 2024",
    url: "https://assets.new.siemens.com/siemens/assets/api/uuid:1b43afb5-2d07-47f7-9eb7-893fe7d0bc59/TCOD-2024_original.pdf",
    accessed: "26 Oct 2026",
  },
  "ibm-2026": {
    id: "ibm-2026",
    publisher: "IBM & Ponemon Institute",
    date: "2026",
    title: "Cost of a Data Breach Report 2026",
    url: "https://www.ibm.com/reports/data-breach",
    accessed: "26 Oct 2026",
  },
  "ipos-2025": {
    id: "ipos-2025",
    publisher: "iPOS.vn & Nestlé Professional, via Thời báo Tài chính Việt Nam",
    date: "8 Apr 2026",
    title: "Vietnam F&B market report 2025 (Thị trường kinh doanh ẩm thực tại Việt Nam năm 2025)",
    url: "https://thoibaotaichinhvietnam.vn/nganh-fb-huong-toi-760-nghin-ty-dong-doanh-thu-mo-tam-ve-vang-cho-tang-truong-ben-vung-195278.html",
    accessed: "26 Oct 2026",
  },
  "r365-2026": {
    id: "r365-2026",
    publisher: "Restaurant365",
    date: "Mid-2026",
    title:
      "2026 State of the Restaurant Industry: Mid-Year Report (420+ operators, ~10,000 locations)",
    url: "https://www.restaurant365.com/guides/2026-state-of-the-restaurant-industry-mid-year-report/",
    accessed: "26 Oct 2026",
  },
  "cisco-2024": {
    id: "cisco-2024",
    publisher: "Cisco",
    date: "25 Jan 2024",
    title:
      "More than 1 in 4 organizations banned use of GenAI over privacy and data security risks",
    url: "https://investor.cisco.com/news/news-details/2024/More-than-1-in-4-Organizations-Banned-Use-of-GenAI-Over-Privacy-and-Data-Security-Risks---New-Cisco-Study/default.aspx",
    accessed: "26 Oct 2026",
  },
  "gartner-agentic-2025-06": {
    id: "gartner-agentic-2025-06",
    publisher: "Gartner",
    date: "25 Jun 2025",
    title: "Gartner predicts over 40% of agentic AI projects will be canceled by end of 2027",
    url: "https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027",
    accessed: "26 Oct 2026",
  },
  "stanford-ai-index-2025": {
    id: "stanford-ai-index-2025",
    publisher: "Stanford HAI",
    date: "Apr 2025",
    title: "AI Index Report 2025 — inference cost at GPT-3.5 level, Nov 2022 → Oct 2024",
    url: "https://hai.stanford.edu/ai-index/2025-ai-index-report",
    accessed: "26 Oct 2026",
  },
  "gartner-agentic-2026-02": {
    id: "gartner-agentic-2026-02",
    publisher: "Gartner",
    date: "Feb 2026",
    title: "Forecast Analysis: Agentic AI Spending in Software Markets",
    url: "https://www.gartner.com/en/documents/7455226",
    accessed: "20 Oct 2026",
  },
  "gartner-cio-2026-10": {
    id: "gartner-cio-2026-10",
    publisher: "Gartner",
    date: "19 Oct 2026",
    title:
      "Only 13% of CIOs say their enterprise has realized significant or transformational value from AI",
    url: "https://www.gartner.com/en/newsroom/press-releases/2026-10-19-gartner-survey-finds-only-13-percent-of-cios-say-their-enterprise-has-realized-significant-or-transformational-value-from-ai",
    accessed: "20 Oct 2026",
  },
  "vn-pdp-law-2025": {
    id: "vn-pdp-law-2025",
    publisher: "Government of Viet Nam",
    date: "In force 1 Jan 2026",
    title: "Law No. 91/2025/QH15 on Personal Data Protection",
    url: "https://vanban.chinhphu.vn/?docid=214590&pageid=27160",
    accessed: "20 Oct 2026",
  },
  "openai-enterprise": {
    id: "openai-enterprise",
    publisher: "OpenAI",
    date: "Current page",
    title: "Enterprise privacy at OpenAI",
    url: "https://openai.com/enterprise-privacy/",
    accessed: "26 Oct 2026",
  },
  "n8n-hosting": {
    id: "n8n-hosting",
    publisher: "n8n",
    date: "Current docs",
    title: "n8n Docs — hosting and self-hosting",
    url: "https://docs.n8n.io/hosting/",
    accessed: "26 Oct 2026",
  },
  "copilot-studio": {
    id: "copilot-studio",
    publisher: "Microsoft Learn",
    date: "Updated 2026",
    title: "Copilot Studio — security and governance guidance",
    url: "https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/sec-gov-phase2",
    accessed: "20 Oct 2026",
  },
  "litellm-routing": {
    id: "litellm-routing",
    publisher: "LiteLLM",
    date: "Current docs",
    title: "LiteLLM Docs — routing and load balancing",
    url: "https://docs.litellm.ai/docs/routing",
    accessed: "20 Oct 2026",
  },
} satisfies Record<SourceId, Source>;

/** Display order for the numbered citation list; a source's number is its position here + 1. */
export const sourceOrder: SourceId[] = [
  "nra-2026-07",
  "ahla-2026-03",
  "siemens-2024",
  "ibm-2026",
  "ipos-2025",
  "r365-2026",
  "cisco-2024",
  "gartner-agentic-2025-06",
  "stanford-ai-index-2025",
  "gartner-agentic-2026-02",
  "gartner-cio-2026-10",
  "vn-pdp-law-2025",
  "openai-enterprise",
  "n8n-hosting",
  "copilot-studio",
  "litellm-routing",
];

export function citationNumber(id: SourceId): number {
  return sourceOrder.indexOf(id) + 1;
}
