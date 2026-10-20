/**
 * Schema gate for all page content. Every fact shown on the page lives in content/ as typed data;
 * components only arrange it. Nothing here may be invented: figures carry a source id, and
 * anything not yet known is an explicit placeholder that the UI labels as such.
 */

export type SourceId =
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

export type Organizer = { id: string; name: string };

export type TeamMember = {
  name: string;
  github: string;
  /** Null until the team confirms each role; the UI shows a labelled placeholder. */
  role: string | null;
};

export type Testimonial = {
  /** Always true until real, permitted quotes arrive; the UI labels these cards. */
  placeholder: true;
  quote: string;
  name: string;
  context: string;
};
