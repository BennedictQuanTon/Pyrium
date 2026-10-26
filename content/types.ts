/**
 * Schema gate for all page content. Every fact shown on the page lives in content/ as typed data;
 * components only arrange it. Nothing here may be invented: figures carry a source id, and
 * anything not yet known is an explicit placeholder that the UI labels as such.
 */

export type SourceId =
  | "nra-2026-07"
  | "ahla-2026-03"
  | "siemens-2024"
  | "ibm-2026"
  | "ipos-2025"
  | "r365-2026"
  | "cisco-2024"
  | "gartner-agentic-2025-06"
  | "stanford-ai-index-2025"
  | "gartner-agentic-2026-02"
  | "gartner-cio-2026-10"
  | "vn-pdp-law-2025"
  | "openai-enterprise"
  | "n8n-hosting"
  | "copilot-studio"
  | "litellm-routing";

export type Source = {
  id: SourceId;
  publisher: string;
  /** Publication date as the publisher states it. */
  date: string;
  title: string;
  url: string;
  /** When the team last checked the figure against the page. */
  accessed: string;
};

export type Stat = {
  value: string;
  label: string;
  source: SourceId;
};

export type ProjectId =
  | "weatherise"
  | "viettel-ai-race"
  | "lantern"
  | "architecturelab"
  | "ignis"
  | "regional-codex";

export type Project = {
  id: ProjectId;
  title: string;
  event: string;
  /** Month the team built it, e.g. "Jun 2026". */
  period: string;
  /** What actually happened at the event; omitted when there is no result to report. */
  result?: string;
  oneLine: string;
  stack: string[];
  /** Public link, only when one exists. */
  href?: string;
  /** Basename of the rendered loop in public/motion/ (without theme suffix or extension). */
  motion: `project-${ProjectId}`;
  /** Screen tours fill the frame with a greyscale screenshot, so one render serves both themes. */
  screenTour?: true;
  upcoming?: boolean;
};

export type Organizer = {
  id: string;
  name: string;
  /** Path to a normalized monochrome SVG in /brand/logos, when a public one exists. */
  logo?: string;
  /** SVG viewBox or PNG pixel size, so marks scale by height without layout shift. */
  viewBox?: string;
  /** True for marks whose identity requires their official colors (e.g. Google). */
  fullColor?: boolean;
};

export type TeamMember = {
  name: string;
  github: string;
  /** Role in each language, e.g. { en: "AI Engineer", vi: "Kỹ sư AI" }. */
  role: { en: string; vi: string };
  /** What the founder leads, in one line. */
  focus: { en: string; vi: string };
  /** Photo in /team: colour portrait on the shared studio backdrop. */
  photo: string;
  /** Contact links; a missing one renders as "coming soon". */
  links: { linkedin?: string; email?: string; portfolio?: string };
};

/**
 * A quote written by the team as a draft for a real person in the named role to approve or
 * rewrite. Drafts carry a role, never an invented name, and the UI marks them until approved.
 */
export type Quote = {
  draft: boolean;
  quote: string;
  /** Who would say it, e.g. "Mentor · Vietnam AI Open Hackathon". */
  role: string;
  /** Filled only once the person approves the wording. */
  name?: string;
};

export type ProductSlug = "lantern" | "weatherise" | "ignis" | "unfound" | "inference";

/** The industry group a product is shown under. */
export type ProductGroup = "fnb" | "operations" | "trust" | "infrastructure";

/** A plain-language number: what it means for the people using the product. */
export type ProductMetric = {
  value: string;
  label: string;
  /** True for team estimates; the UI marks them "est.". */
  estimate?: boolean;
};

/** Language-independent facts about a product. */
export type ProductBase = {
  slug: ProductSlug;
  name: string;
  group: ProductGroup;
  event: string;
  organizers: string;
  period: string;
  demo: string;
  github: string;
  video: { webm?: string; mp4: string; poster: string; background: string };
  /** Open-licence context photo from public/images (see CREDITS.md there). */
  photo: string;
  /** The product's own brand colour, used only as a soft glow behind its film. */
  accent: string;
  screens: string[];
  stack: string[];
};

/** Everything about a product that is written in a language. */
export type ProductText = {
  category: string;
  /** Who the product is for, in a few words. */
  audience: string;
  /** The business problem it optimizes, in one line. */
  solves: string;
  tagline: string;
  oneLine: string;
  result?: string;
  team?: string;
  problem: string;
  solution: string;
  /**
   * The three outputs every product reports: people who tested it, the money it is expected
   * to save, and its core result. Tester counts and savings are team-reported pilot figures;
   * savings are estimates and marked as such.
   */
  outputs: { testers: ProductMetric; saving: ProductMetric; core: ProductMetric };
  split: { model: string; code: string; human: string };
  process: { title: string; detail: string }[];
  outcomes: string[];
  /** Captions for ProductBase.screens, in the same order. */
  captions: string[];
  photoAlt: string;
  /** Two quotes from pilot testers (drafts until each person approves). */
  testimonials: [Quote, Quote];
};

export type Product = ProductBase & ProductText;
