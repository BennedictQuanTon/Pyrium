import type { Source, SourceId } from "./types";

/**
 * Sources from the proposal's register (§16), with URLs taken from the PDF's own links.
 * Checked 2026-10-20. Gartner's May 2026 spending forecast was superseded by its September 2026
 * update, so the page cites the newer one and keeps the May release for reference.
 */
export const sources = {
  "gartner-spend-2026-09": {
    id: "gartner-spend-2026-09",
    publisher: "Gartner",
    date: "Sep 2026",
    title: "Gartner Forecasts Worldwide AI Spending to Grow 49.5% in 2026",
    url: "https://www.gartner.com/en/newsroom/press-releases/2026-09-16-gartner-forecasts-worldwide-ai-spending-to-grow-49-point-5-percent-in-2026",
  },
  "gartner-spend-2026-05": {
    id: "gartner-spend-2026-05",
    publisher: "Gartner",
    date: "May 2026",
    title: "Gartner Forecasts Worldwide AI Spending to Grow 47% in 2026",
    url: "https://www.gartner.com/en/newsroom/press-releases/2026-05-19-gartner-forecasts-worldwide-ai-spending-to-grow-47-percent-in-2026",
  },
  "gartner-agentic-2026-02": {
    id: "gartner-agentic-2026-02",
    publisher: "Gartner",
    date: "Feb 2026",
    title: "Forecast Analysis: Agentic AI Spending in Software Markets",
    url: "https://www.gartner.com/en/documents/7455226",
  },
  "stanford-ai-index-2026": {
    id: "stanford-ai-index-2026",
    publisher: "Stanford HAI",
    date: "2026",
    title: "AI Index Report 2026 — Economy",
    url: "https://hai.stanford.edu/ai-index/2026-ai-index-report/economy",
  },
  "deloitte-state-of-ai-2026": {
    id: "deloitte-state-of-ai-2026",
    publisher: "Deloitte",
    date: "2026",
    title: "The State of AI in the Enterprise",
    url: "https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html",
  },
  "econ-sea-2025": {
    id: "econ-sea-2025",
    publisher: "Google, Temasek & Bain",
    date: "Nov 2025",
    title: "e-Conomy SEA 2025",
    url: "https://www.temasek.com.sg/en/news-and-resources/news-room/news/2025/e-conomy-sea-2025-report-aseans-digital-economy-poised-to-surpass-300-billion",
  },
  "vn-ai-strategy-2026": {
    id: "vn-ai-strategy-2026",
    publisher: "Government of Viet Nam",
    date: "Aug 2026",
    title: "Gov't approves National AI Strategy",
    url: "https://en.baochinhphu.vn/govt-approves-national-ai-strategy-111260829094257423.htm",
  },
  "vn-pdp-law-2025": {
    id: "vn-pdp-law-2025",
    publisher: "Government of Viet Nam",
    date: "in force 1 Jan 2026",
    title: "Law No. 91/2025/QH15 on Personal Data Protection",
    url: "https://vanban.chinhphu.vn/?docid=214590&pageid=27160",
  },
  "eu-ai-act": {
    id: "eu-ai-act",
    publisher: "European Commission",
    date: "2026",
    title: "AI Act Service Desk — enforcement timing",
    url: "https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/when-does-enforcement-start",
  },
  "nist-ai-rmf": {
    id: "nist-ai-rmf",
    publisher: "NIST",
    date: "2024, updated 2026",
    title: "AI Risk Management Framework",
    url: "https://www.nist.gov/itl/ai-risk-management-framework",
  },
  "gartner-saas-2026-07": {
    id: "gartner-saas-2026-07",
    publisher: "Gartner",
    date: "Jul 2026",
    title: "$234 Billion in Enterprise Application Software Spend Is at Risk from Agentic AI",
    url: "https://www.gartner.com/en/newsroom/press-releases/2026-07-01-gartner-says-us-dollars-234-billion-in-enterprise-application-software-spend-is-at-risk-from-agentic-artificial-intelligence",
  },
} satisfies Record<SourceId, Source>;

/** Display order for the numbered citation list; a source's number is its position here + 1. */
export const sourceOrder: SourceId[] = [
  "gartner-spend-2026-09",
  "stanford-ai-index-2026",
  "deloitte-state-of-ai-2026",
  "econ-sea-2025",
  "vn-ai-strategy-2026",
  "vn-pdp-law-2025",
  "eu-ai-act",
  "nist-ai-rmf",
  "gartner-agentic-2026-02",
  "gartner-saas-2026-07",
  "gartner-spend-2026-05",
];

export function citationNumber(id: SourceId): number {
  return sourceOrder.indexOf(id) + 1;
}
