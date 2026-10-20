import type { Organizer, TeamMember, Testimonial } from "./types";

/**
 * Organizers, sponsors and platforms of events the team built at together. Shown as text
 * wordmarks: using their logos needs each brand's usage terms, which is a later decision.
 */
export const organizers: Organizer[] = [
  { id: "nvidia", name: "NVIDIA" },
  { id: "viettel", name: "Viettel" },
  { id: "openacc", name: "OpenACC" },
  { id: "assemblyai", name: "AssemblyAI" },
  { id: "lablab", name: "lablab.ai" },
  { id: "openai", name: "OpenAI" },
  { id: "devpost", name: "Devpost" },
  { id: "amd", name: "AMD" },
  { id: "sea", name: "Sea / Shopee" },
];

export const team: TeamMember[] = [
  { name: "Yoshio Nomura", github: "UniverseScripts", role: null },
  { name: "Long Quan (Bennedict) Ton", github: "BennedictQuanTon", role: null },
  { name: "Huynh Khanh Tuong", github: "khanhtuongnakitomo", role: null },
];

/** No real quotes yet. These cards render with a visible "Placeholder" label. */
export const testimonials: Testimonial[] = [
  {
    placeholder: true,
    quote: "Quote from a collaborator goes here once they've approved it.",
    name: "Name pending",
    context: "Collaborator",
  },
  {
    placeholder: true,
    quote: "Quote from someone who used one of our projects goes here once approved.",
    name: "Name pending",
    context: "User",
  },
  {
    placeholder: true,
    quote: "Quote from a hackathon partner or mentor goes here once approved.",
    name: "Name pending",
    context: "Mentor",
  },
];
