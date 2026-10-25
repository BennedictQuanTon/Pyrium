/**
 * Schema gate for all page content. Every fact shown on the page lives in content/ as typed data;
 * components only arrange it. Nothing here may be invented: figures carry a source id, and
 * anything not yet known is an explicit placeholder that the UI labels as such.
 */

export type SourceId =
  | "gartner-cio-2026-10"
  | "gartner-spend-2026-09"
  | "gartner-spend-2026-05"
  | "gartner-agentic-2026-02"
  | "stanford-ai-index-2026"
  | "deloitte-state-of-ai-2026"
  | "econ-sea-2025"
  | "vn-ai-strategy-2026"
  | "vn-pdp-law-2025"
  | "eu-ai-act"
  | "nist-ai-rmf"
  | "gartner-saas-2026-07";

export type Source = {
  id: SourceId;
  publisher: string;
  date: string;
  title: string;
  url: string;
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
  role: string;
  /** Degree line, e.g. "Bachelor of AI · UTS × HCMUT". */
  study: string;
  /** Path to the member's monochrome portrait in /team, cropped from the brand trio. */
  photo?: string;
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

export type ProductSlug = "weatherise" | "lantern" | "ignis" | "unfound";

export type ProductMetric = {
  value: string;
  label: string;
  /** How and where it was measured, shown beside the number. */
  context: string;
};

export type Product = {
  slug: ProductSlug;
  name: string;
  /** Short category line, e.g. "Weather decisions". */
  category: string;
  tagline: string;
  oneLine: string;
  event: string;
  organizers: string;
  period: string;
  result?: string;
  /** Team size at the event, when known. */
  team?: string;
  problem: string;
  solution: string;
  metrics: [ProductMetric, ProductMetric, ProductMetric];
  /** How the product splits the work: what the model proposes, what code decides, what people approve. */
  split: { model: string; code: string; human: string };
  process: { title: string; detail: string }[];
  outcomes: string[];
  screens: { src: string; caption: string }[];
  stack: string[];
  demo: string;
  github: string;
  video: { webm: string; mp4: string; poster: string; background: string };
  /** Open-licence context photo from public/images/open (see CREDITS.md there). */
  photo: { src: string; alt: string };
  review: Quote;
};

export type LabProject = {
  name: string;
  event: string;
  period: string;
  oneLine: string;
  result?: string;
  href?: string;
};
